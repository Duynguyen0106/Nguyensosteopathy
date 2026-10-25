import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import {
  getLibraryTopicsByCategory,
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
            <ButtonLink href="/education">Education hub</ButtonLink>
            <ButtonLink href="/blog" variant="secondary">
              Nutrition blog articles
            </ButtonLink>
            <ButtonLink href="#all-topics" variant="secondary">
              Browse all topics
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <EducationAudienceBanner trackId="library" audience="both" />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.category}
              href={`#${group.category}`}
              className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-navy transition hover:border-teal hover:text-teal"
            >
              {group.label} ({group.topics.length})
            </a>
          ))}
        </div>

        <div className="mt-12 space-y-14">
          {groups.map((group) => (
            <div key={group.category} id={group.category}>
              <h2 className="font-display text-3xl text-navy md:text-4xl">
                {group.label}
              </h2>
              {group.description ? (
                <p className="mt-2 max-w-2xl text-base text-slate-600">
                  {group.description}
                </p>
              ) : null}
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.topics.map((topic) => {
                  const evidenceNotes = hasTopicEvidence(topic.topicKey);
                  const combined =
                    Boolean(topic.theme) || topic.sheetCount > 1;
                  const href = topicHref(topic, evidenceNotes);
                  return (
                    <li key={topic.topicKey}>
                      <Link
                        href={href}
                        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal hover:shadow-sm md:p-5"
                      >
                        <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                          {combined ? "Combined theme" : "Topic"}
                          {topic.mskRelevant ? " · MSK-relevant" : ""}
                          {topic.relatedBlog ? " · Blog article" : ""}
                          {evidenceNotes ? " · Evidence notes" : ""}
                        </p>
                        <h3 className="mt-2 font-display text-xl text-navy group-hover:text-teal-dark">
                          {topic.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                          {topic.summary}
                        </p>
                        <span className="mt-3 text-sm font-semibold text-teal">
                          {combined
                            ? "Read theme →"
                            : evidenceNotes
                              ? "View topic →"
                              : "Read note →"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <details
          id="all-topics"
          className="mt-16 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6"
        >
          <summary className="cursor-pointer font-display text-2xl text-navy">
            Browse all {browse.length} topics
          </summary>
          <p className="mt-2 text-sm text-slate-600">
            A–Z by topic title. Combined themes open the hub; single topics open
            the education note.
          </p>
          <ul className="mt-6 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
            {browse.map((row) => (
              <li key={row.key} className="mb-2 break-inside-avoid">
                <Link
                  href={row.href}
                  className="text-sm font-medium text-teal hover:text-teal-dark"
                >
                  {row.label}
                  {row.note ? (
                    <span className="text-slate-500"> — {row.note}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </div>
  );
}
