import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import { LibraryBrowse } from "@/components/education/LibraryBrowse";
import {
  getLibraryTopicsByCategory,
  libraryDisplaySummary,
  type LibraryTopic,
} from "@/lib/education-library";
import { hasTopicEvidence } from "@/lib/library-evidence";
import { defaultOgImage, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

const description = trimDescription(
  "Supplement education library from Nguyen's Osteopathic Clinic: original dual-audience themes organised by topic for patients and practitioners.",
);

export const metadata: Metadata = {
  title: "Supplement Education Library",
  description,
  alternates: { canonical: "/education/library" },
  keywords: [
    "supplement education Woolwich",
    "osteopath nutrition library",
    "practitioner supplement notes",
    "patient supplement guides SE18",
  ],
  openGraph: {
    title: `Supplement Education Library | ${site.name}`,
    description,
    url: "/education/library",
    images: [defaultOgImage],
  },
};

function topicHref(topic: LibraryTopic, evidenceNotes: boolean): string {
  const combined = Boolean(topic.theme) || topic.sheetCount > 1;
  if (combined || evidenceNotes) {
    return `/education/library/topic/${topic.topicKey}`;
  }
  return `/education/library/${topic.articles[0].slug}`;
}

/** One browse row per topic — no internal sheet numbering. */
function browseEntries(groups: ReturnType<typeof getLibraryTopicsByCategory>): {
  key: string;
  href: string;
  label: string;
  note?: string;
}[] {
  const seen = new Set<string>();
  const rows: {
    key: string;
    href: string;
    label: string;
    note?: string;
  }[] = [];

  for (const group of groups) {
    for (const topic of group.topics) {
      if (seen.has(topic.topicKey)) continue;
      seen.add(topic.topicKey);
      const evidenceNotes = hasTopicEvidence(topic.topicKey);
      const combined = Boolean(topic.theme) || topic.sheetCount > 1;
      rows.push({
        key: topic.topicKey,
        href: topicHref(topic, evidenceNotes),
        label: topic.title,
        note: combined
          ? "Combined theme"
          : evidenceNotes
            ? "Topic with evidence notes"
            : undefined,
      });
    }
  }

  return rows.sort((a, b) => a.label.localeCompare(b.label));
}

export default function EducationLibraryIndexPage() {
  const groups = getLibraryTopicsByCategory();
  const topicCount = groups.reduce((sum, group) => sum + group.topics.length, 0);
  const browse = browseEntries(groups);

  const browseGroups = groups.map((group) => ({
    category: group.category,
    label: group.label,
    description: group.description,
    topics: group.topics.map((topic) => {
      const evidenceNotes = hasTopicEvidence(topic.topicKey);
      const combined = Boolean(topic.theme) || topic.sheetCount > 1;
      return {
        topicKey: topic.topicKey,
        title: topic.title,
        summary: libraryDisplaySummary({
          title: topic.title,
          summary: topic.summary,
          mskRelevant: topic.mskRelevant,
          isTheme: combined,
        }),
        href: topicHref(topic, evidenceNotes),
        category: group.category,
        categoryLabel: group.label,
        categoryDescription: group.description,
        combined,
        mskRelevant: topic.mskRelevant,
        hasEvidence: evidenceNotes,
        hasBlog: Boolean(topic.relatedBlog),
        ctaLabel: combined
          ? "Read theme →"
          : evidenceNotes
            ? "View topic →"
            : "Read note →",
      };
    }),
  }));

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.websiteUrl}/education/library#webpage`,
    name: "Supplement education library",
    url: `${site.websiteUrl}/education/library`,
    description,
    audience: {
      "@type": "Audience",
      audienceType: "Patients and healthcare practitioners",
    },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
    numberOfItems: topicCount,
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link href="/education" className="hover:text-teal-dark">
              Education
            </Link>
            {" · "}
            For patients &amp; practitioners
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Supplement education library
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {topicCount} clinic-voice topics across minerals, vitamins, herbals,
            and wellness themes. Where angles overlapped, they are combined into
            one clear theme. Educational only — not a product catalogue or
            prescribing guide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#library-search">Search topics</ButtonLink>
            <ButtonLink href="#all-topics" variant="secondary">
              Browse A–Z
            </ButtonLink>
            <ButtonLink href="/blog" variant="secondary">
              Nutrition blog
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            <Link href="/education" className="font-semibold text-teal hover:text-teal-dark">
              ← Education hub
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <EducationAudienceBanner trackId="library" audience="both" />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <LibraryBrowse groups={browseGroups} browse={browse} />
      </section>
    </div>
  );
}
