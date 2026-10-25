import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AuthorBio } from "@/components/AuthorBio";
import { ButtonLink } from "@/components/Button";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import {
  articleRedirectsToTopic,
  getAllLibrarySlugs,
  getLibraryArticle,
  getLibraryArticlesByTopic,
  getLibraryCategoryLabel,
  getRelatedBlogForTopic,
  libraryArticles,
} from "@/lib/education-library";
import { hasTopicEvidence } from "@/lib/library-evidence";
import {
  breadcrumbJsonLd,
  defaultOgImage,
  fitSerpTitle,
  trimDescription,
} from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllLibrarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getLibraryArticle(slug);
  if (!article) return {};

  if (articleRedirectsToTopic(article)) {
    const topicPath = `/education/library/topic/${article.topicKey}`;
    return {
      title: fitSerpTitle(`${article.topicTitle || article.title} theme`),
      description: trimDescription(article.summary),
      alternates: { canonical: topicPath },
      robots: { index: false, follow: true },
    };
  }

  const title = fitSerpTitle(`${article.title} education`);
  const description = trimDescription(article.summary);
  const path = `/education/library/${article.slug}`;
  const ogTitle =
    typeof title === "string"
      ? `${article.title} | ${site.name}`
      : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: article.needsReview
      ? { index: false, follow: false }
      : undefined,
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      images: [defaultOgImage],
    },
  };
}

export default async function EducationLibraryArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getLibraryArticle(slug);
  if (!article) notFound();

  if (articleRedirectsToTopic(article)) {
    permanentRedirect(`/education/library/topic/${article.topicKey}`);
  }

  const path = `/education/library/${article.slug}`;
  const categoryLabel = getLibraryCategoryLabel(article.category);
  const categoryHref = `/education/library#${article.category}`;
  const topicHref = `/education/library/topic/${article.topicKey}`;
  const topicTitle = article.topicTitle || article.title;
  const relatedBlog = getRelatedBlogForTopic(article.topicKey);
  const evidenceHref = hasTopicEvidence(article.topicKey)
    ? `${topicHref}#evidence`
    : null;

  const sameTopic = getLibraryArticlesByTopic(article.topicKey).filter(
    (item) => item.slug !== article.slug,
  );

  const related =
    sameTopic.length > 0
      ? sameTopic.slice(0, 4)
      : libraryArticles
          .filter(
            (item) =>
              item.slug !== article.slug &&
              item.topics.some((topic) => article.topics.includes(topic)),
          )
          .slice(0, 4);

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${site.websiteUrl}${path}#webpage`,
    name: article.title,
    url: `${site.websiteUrl}${path}`,
    description: article.summary,
    educationalLevel: "Patient and professional education",
    audience: {
      "@type": "Audience",
      audienceType: "Patients and healthcare practitioners",
    },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Library", path: "/education/library" },
    { name: categoryLabel, path: categoryHref },
    { name: topicTitle, path: topicHref },
    { name: article.title, path },
  ]);

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
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
            {" · "}
            <Link href={topicHref} className="hover:text-teal-dark">
              {topicTitle}
            </Link>
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {article.summary}
          </p>
          {article.topics.length > 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              Topics: {article.topics.join(" · ")}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={topicHref}>{topicTitle} theme</ButtonLink>
            {evidenceHref ? (
              <ButtonLink href={evidenceHref} variant="secondary">
                Scientific notes &amp; references for {topicTitle}
              </ButtonLink>
            ) : null}
            {relatedBlog ? (
              <ButtonLink
                href={`/blog/${relatedBlog.slug}`}
                variant="secondary"
              >
                Blog article
              </ButtonLink>
            ) : (
              <ButtonLink href="/blog" variant="secondary">
                Nutrition blog articles
              </ButtonLink>
            )}
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <EducationAudienceBanner trackId="library" audience="both" />
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-12 md:px-8">
        <div className="space-y-10">
          {article.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        {article.caveats.length > 0 ? (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6">
            <h2 className="font-display text-2xl text-navy">Important caveats</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
              {article.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12">
          <h2 className="font-display text-2xl text-navy md:text-3xl">FAQs</h2>
          <dl className="mt-6 space-y-6">
            {article.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-navy">{faq.question}</dt>
                <dd className="mt-2 text-base leading-relaxed text-slate-700">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12">
          <AuthorBio />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-slate-200 bg-white px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy">
              {sameTopic.length > 0
                ? `More on ${topicTitle}`
                : "Related library topics"}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={
                      item.redirectsToTopic
                        ? `/education/library/topic/${item.topicKey}`
                        : `/education/library/${item.slug}`
                    }
                    className="font-semibold text-teal hover:text-teal-dark"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            {sameTopic.length > 4 ? (
              <Link
                href={topicHref}
                className="mt-6 inline-flex text-sm font-semibold text-teal hover:text-teal-dark"
              >
                View {topicTitle} theme →
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
