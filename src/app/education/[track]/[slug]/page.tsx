import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AuthorBio } from "@/components/AuthorBio";
import { ButtonLink } from "@/components/Button";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import {
  educationHref,
  getAllEducationArticleParams,
  getEducationArticle,
  getEducationTrack,
  type EducationTrackId,
} from "@/lib/education";
import {
  breadcrumbJsonLd,
  defaultOgImage,
  fitSerpTitle,
  trimDescription,
} from "@/lib/seo";
import { getService, site } from "@/lib/site";

type Props = { params: Promise<{ track: string; slug: string }> };

const articleTracks = new Set<EducationTrackId>(["acupuncture", "cpd"]);

export function generateStaticParams() {
  return getAllEducationArticleParams().filter((item) =>
    articleTracks.has(item.track),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track: trackSlug, slug } = await params;
  if (trackSlug === "nutrition") return {};
  const track = getEducationTrack(trackSlug);
  if (!track || !articleTracks.has(track.id)) return {};
  const article = getEducationArticle(track.id, slug);
  if (!article) return {};

  const title = fitSerpTitle(article.title);
  const description = trimDescription(article.summary);
  const path = educationHref(track.id, article.slug);
  const ogTitle =
    typeof title === "string"
      ? `${article.title} | ${site.name}`
      : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      images: [defaultOgImage],
    },
  };
}

export default async function EducationArticlePage({ params }: Props) {
  const { track: trackSlug, slug } = await params;
  if (trackSlug === "nutrition") {
    redirect(`/education/nutrition/${slug}`);
  }

  const track = getEducationTrack(trackSlug);
  if (!track || !articleTracks.has(track.id)) notFound();

  const article = getEducationArticle(track.id, slug);
  if (!article) notFound();

  const service = article.relatedServiceSlug
    ? getService(article.relatedServiceSlug)
    : undefined;

  const path = educationHref(track.id, article.slug);

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${site.websiteUrl}${path}#webpage`,
    name: article.title,
    url: `${site.websiteUrl}${path}`,
    description: article.summary,
    audience: {
      "@type": "Audience",
      audienceType:
        track.audience === "practitioners"
          ? "Healthcare practitioners"
          : "Patients",
    },
    reviewedBy: { "@id": `${site.websiteUrl}/#practitioner` },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
  };

  const faqLd =
    article.faqs && article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: track.shortTitle, path: `/education/${track.slug}` },
    { name: article.title, path },
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
            <Link
              href={`/education/${track.slug}`}
              className="hover:text-teal-dark"
            >
              {track.shortTitle}
            </Link>
            {" · "}
            {track.audienceLabel}
            {article.status === "coming-soon" ? " · Coming soon" : null}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {article.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/education/${track.slug}`}>
              All {track.shortTitle.toLowerCase()}
            </ButtonLink>
            {service ? (
              <ButtonLink href={`/services/${service.slug}`} variant="secondary">
                {service.title}
              </ButtonLink>
            ) : null}
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <EducationAudienceBanner
          trackId={track.id}
          audience={track.audience}
        />
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

        {article.pdfPath ? (
          <p className="mt-10">
            <a
              href={article.pdfPath}
              className="font-semibold text-teal hover:text-teal-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF →
            </a>
          </p>
        ) : null}

        {article.caveats && article.caveats.length > 0 ? (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6">
            <h2 className="font-display text-2xl text-navy">Important caveats</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
              {article.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {article.faqs && article.faqs.length > 0 ? (
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
        ) : null}

        <div className="mt-12">
          <AuthorBio />
        </div>
      </section>
    </div>
  );
}
