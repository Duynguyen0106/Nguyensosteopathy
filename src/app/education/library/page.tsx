import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import {
  getAllLibraryArticlesSorted,
  getLibraryArticleCount,
  getLibraryTopicsByCategory,
} from "@/lib/education-library";
import { hasTopicEvidence } from "@/lib/library-evidence";
import { defaultOgImage, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

const description = trimDescription(
  "Supplement education library from Nguyen's Osteopathic Clinic: 230 original dual-audience sheets organised by topic for patients and practitioners.",
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

export default function EducationLibraryIndexPage() {
  const groups = getLibraryTopicsByCategory();
  const allSheets = getAllLibraryArticlesSorted();
  const count = getLibraryArticleCount();
  const topicCount = groups.reduce((sum, group) => sum + group.topics.length, 0);

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
    numberOfItems: count,
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
            {count} original clinic-voice sheets grouped into {topicCount}{" "}
            topics across minerals, vitamins, herbals, and wellness themes.
            Educational only — not a product catalogue or prescribing guide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/education">Education hub</ButtonLink>
            <ButtonLink href="/blog" variant="secondary">
              Nutrition blog articles
            </ButtonLink>
            <ButtonLink href="#all-sheets" variant="secondary">
              Browse all sheets
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
                  const href =
                    evidenceNotes || topic.sheetCount > 1
                      ? `/education/library/topic/${topic.topicKey}`
                      : `/education/library/${topic.articles[0].slug}`;
                  return (
                    <li key={topic.topicKey}>
                      <Link
                        href={href}
                        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal hover:shadow-sm md:p-5"
                      >
                        <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                          {topic.sheetCount} sheet
                          {topic.sheetCount === 1 ? "" : "s"}
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
                          {evidenceNotes || topic.sheetCount > 1
                            ? "View topic →"
                            : "Read sheet →"}
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
          id="all-sheets"
          className="mt-16 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6"
        >
          <summary className="cursor-pointer font-display text-2xl text-navy">
            Browse all {count} sheets
          </summary>
          <p className="mt-2 text-sm text-slate-600">
            Full sheet list by source page number, including entries still marked
            for light review.
          </p>
          <ul className="mt-6 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
            {allSheets.map((article) => (
              <li key={article.slug} className="mb-2 break-inside-avoid">
                <Link
                  href={`/education/library/${article.slug}`}
                  className="text-sm font-medium text-teal hover:text-teal-dark"
                >
                  {article.variantLabel}: {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </div>
  );
}
