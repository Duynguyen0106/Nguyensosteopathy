import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import {
  getLibraryArticleCount,
  getLibraryArticlesBySection,
} from "@/lib/education-library";
import { defaultOgImage, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

const description = trimDescription(
  "Supplement education library from Nguyen's Osteopathic Clinic: 230 original dual-audience sheets on common ingredients and wellness themes for patients and practitioners.",
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
  const groups = getLibraryArticlesBySection();
  const count = getLibraryArticleCount();

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
            {count} original clinic-voice sheets covering common supplement and
            wellness themes. Educational only — not a product catalogue or
            prescribing guide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/education">Education hub</ButtonLink>
            <ButtonLink href="/education/nutrition" variant="secondary">
              Featured nutrition guides
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
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
              key={group.section}
              href={`#${group.section}`}
              className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-navy transition hover:border-teal hover:text-teal"
            >
              {group.label} ({group.articles.length})
            </a>
          ))}
        </div>

        <div className="mt-12 space-y-14">
          {groups.map((group) => (
            <div key={group.section} id={group.section}>
              <h2 className="font-display text-3xl text-navy md:text-4xl">
                {group.label}
              </h2>
              <p className="mt-2 text-base text-slate-600">
                {group.articles.length} sheet
                {group.articles.length === 1 ? "" : "s"}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/education/library/${article.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal hover:shadow-sm md:p-5"
                    >
                      <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                        Sheet {article.sourcePage}
                        {article.mskRelevant ? " · MSK-relevant" : ""}
                      </p>
                      <h3 className="mt-2 font-display text-xl text-navy group-hover:text-teal-dark">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                        {article.summary}
                      </p>
                      <span className="mt-3 text-sm font-semibold text-teal">
                        Read sheet →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
