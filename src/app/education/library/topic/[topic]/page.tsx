import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AuthorBio } from "@/components/AuthorBio";
import { ButtonLink } from "@/components/Button";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import { LibraryEvidencePanel } from "@/components/education/LibraryEvidencePanel";
import {
  getAllLibraryTopicKeys,
  getLibraryCategoryLabel,
  getLibraryOverlapRedirect,
  getLibraryTopic,
  getUniqueThemeAngles,
  isLibraryConditionOverlapTopic,
} from "@/lib/education-library";
import {
  getTopicEvidence,
  hasTopicEvidence,
} from "@/lib/library-evidence";
import {
  breadcrumbJsonLd,
  defaultOgImage,
  fitSerpTitle,
  trimDescription,
} from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return getAllLibraryTopicKeys().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: topicKey } = await params;
  if (isLibraryConditionOverlapTopic(topicKey)) {
    const dest = getLibraryOverlapRedirect(topicKey) ?? "/conditions";
    return {
      title: fitSerpTitle("Moved to conditions"),
      alternates: { canonical: dest },
      robots: { index: false, follow: true },
    };
  }
  const topic = getLibraryTopic(topicKey);
  if (!topic) return {};

  const hasTheme = Boolean(topic.theme);
  const title = fitSerpTitle(
    hasTheme ? `${topic.title} — clinic theme` : `${topic.title} education`,
  );
  const description = trimDescription(
    hasTheme
      ? topic.theme!.summary
      : `Dual-audience education on ${topic.title} from Nguyen's Osteopathic Clinic.`,
  );
  const path = `/education/library/topic/${topic.topicKey}`;
  const ogTitle =
    typeof title === "string"
      ? `${topic.title} | ${site.name}`
      : title.absolute;

  const robots = topic.needsReview
    ? { index: false, follow: false }
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots,
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      images: [defaultOgImage],
    },
  };
}

export default async function EducationLibraryTopicPage({ params }: Props) {
  const { topic: topicKey } = await params;
  if (isLibraryConditionOverlapTopic(topicKey)) {
    permanentRedirect(getLibraryOverlapRedirect(topicKey) ?? "/conditions");
  }
  const topic = getLibraryTopic(topicKey);
  if (!topic) notFound();

  const path = `/education/library/topic/${topic.topicKey}`;
  const categoryLabel = getLibraryCategoryLabel(topic.category);
  const categoryHref = `/education/library#${topic.category}`;
  const evidence =
    getTopicEvidence(topic.topicKey) ??
    ({
      topicKey: topic.topicKey,
      status: "empty" as const,
      claims: [],
      references: [],
    });
  const evidenceReady = hasTopicEvidence(topic.topicKey);
  const theme = topic.theme;
  const multi = Boolean(theme) || topic.sheetCount > 1;
  const angles = getUniqueThemeAngles(theme, topic.articles);

  const pageLd = {
    "@context": "https://schema.org",
    "@type": theme ? "LearningResource" : "CollectionPage",
    "@id": `${site.websiteUrl}${path}#webpage`,
    name: theme
      ? `${topic.title} — clinic education theme`
      : `${topic.title} — library topic`,
    url: `${site.websiteUrl}${path}`,
    description: topic.summary,
    audience: {
      "@type": "Audience",
      audienceType: "Patients and healthcare practitioners",
    },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/education/library#webpage` },
  };

  const faqLd =
    theme && theme.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: theme.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Library", path: "/education/library" },
    { name: categoryLabel, path: categoryHref },
    { name: topic.title, path },
  ]);

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link href="/education" className="hover:text-teal-dark">
              Education
            </Link>
            {" · "}
            <Link href="/education/library" className="hover:text-teal-dark">
              Library
            </Link>
            {" · "}
            <Link href={categoryHref} className="hover:text-teal-dark">
              {categoryLabel}
            </Link>
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {topic.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {topic.summary}
            {topic.mskRelevant ? " Often relevant in MSK conversations." : ""}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={theme ? "#theme" : "#notes"}>
              {theme ? "Read the theme" : "Read the note"}
            </ButtonLink>
            <ButtonLink href="/education/library" variant="secondary">
              All topics
            </ButtonLink>
          </div>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
            {evidenceReady ? (
              <a href="#evidence" className="font-semibold text-teal hover:text-teal-dark">
                Scientific notes
              </a>
            ) : null}
            {topic.relatedBlog ? (
              <Link
                href={`/blog/${topic.relatedBlog.slug}`}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Blog: {topic.relatedBlog.title}
              </Link>
            ) : (
              <Link href="/blog" className="font-semibold text-teal hover:text-teal-dark">
                Nutrition blog
              </Link>
            )}
            <Link href="/book" className="font-semibold text-teal hover:text-teal-dark">
              Book online
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <EducationAudienceBanner trackId="library" audience="both" />
      </section>

      {(theme || evidenceReady || multi) && (
        <nav
          aria-label="On this page"
          className="mx-auto max-w-6xl px-5 pb-6 md:px-8"
        >
          <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
            On this page
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {evidenceReady ? (
              <li>
                <a
                  href="#evidence"
                  className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
                >
                  Evidence
                </a>
              </li>
            ) : null}
            {theme ? (
              <li>
                <a
                  href="#theme"
                  className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
                >
                  Theme
                </a>
              </li>
            ) : null}
            {multi && angles.length > 0 ? (
              <li>
                <a
                  href="#angles"
                  className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
                >
                  Angles
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="#notes"
                  className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
                >
                  Notes
                </a>
              </li>
            )}
            {topic.relatedBlog ? (
              <li>
                <a
                  href="#related-blog"
                  className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
                >
                  Blog
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      )}

      {topic.relatedBlog ? (
        <section
          id="related-blog"
          className="mx-auto max-w-6xl px-5 pb-8 md:px-8"
        >
          <div className="rounded-2xl border border-teal/30 bg-white px-5 py-6 md:px-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
              Related blog article
            </p>
            <h2 className="mt-2 font-display text-2xl text-navy">
              {topic.relatedBlog.title}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              {topic.relatedBlog.summary}
            </p>
            <Link
              href={`/blog/${topic.relatedBlog.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-teal hover:text-teal-dark"
            >
              Read the blog article →
            </Link>
          </div>
        </section>
      ) : null}

      <LibraryEvidencePanel evidence={evidence} topicTitle={topic.title} />

      {theme ? (
        <section
          id="theme"
          className="mx-auto max-w-3xl px-5 pb-12 md:px-8"
        >
          <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
            Clinic theme
          </p>
          <h2 className="mt-2 font-display text-3xl text-navy md:text-4xl">
            {theme.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {theme.summary}
          </p>

          <div className="mt-10 space-y-10">
            {theme.sections.map((section) => (
              <article key={section.heading}>
                <h3 className="font-display text-2xl text-navy md:text-3xl">
                  {section.heading}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
                  {section.body}
                </p>
              </article>
            ))}
          </div>

          {theme.caveats.length > 0 ? (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6">
              <h3 className="font-display text-2xl text-navy">
                Important caveats
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
                {theme.caveats.map((caveat) => (
                  <li key={caveat}>{caveat}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {theme.faqs.length > 0 ? (
            <div className="mt-12">
              <h3 className="font-display text-2xl text-navy md:text-3xl">
                FAQs
              </h3>
              <dl className="mt-6 space-y-6">
                {theme.faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-semibold text-navy">{faq.question}</dt>
                    <dd className="mt-2 text-base leading-relaxed text-slate-700">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <div className="mt-12">
            <AuthorBio />
          </div>
        </section>
      ) : null}

      <section
        id={multi && angles.length > 0 ? "angles" : "notes"}
        className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24"
      >
        {multi && angles.length > 0 ? (
          <>
            <h2 className="font-display text-3xl text-navy">
              What you will find in this theme
            </h2>
            <p className="mt-2 text-base text-slate-600">
              These are the teaching angles covered above — not separate pages
              to open.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {angles.map((angle) => (
                <li
                  key={angle.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5"
                >
                  <h3 className="font-display text-xl text-navy">
                    {angle.label}
                  </h3>
                  {angle.focus ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {angle.focus}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2 className="font-display text-3xl text-navy">Education note</h2>
            <p className="mt-2 text-base text-slate-600">
              Dual-audience clinic education for patients and practitioners.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topic.articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/education/library/${article.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal hover:shadow-sm md:p-5"
                  >
                    <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                      {article.mskRelevant ? "MSK-relevant" : "Library"}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-navy group-hover:text-teal-dark">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {article.summary}
                    </p>
                    <span className="mt-3 text-sm font-semibold text-teal">
                      Read note →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
