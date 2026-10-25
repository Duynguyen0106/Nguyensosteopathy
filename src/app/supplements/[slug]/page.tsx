import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { SupplementSafetyBanner } from "@/components/supplements/SupplementSafetyBanner";
import { getCondition } from "@/lib/conditions";
import {
  getAllSupplementSlugs,
  getSupplement,
  supplements,
} from "@/lib/supplements";
import {
  breadcrumbJsonLd,
  defaultOgImage,
  fitSerpTitle,
  trimDescription,
} from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSupplementSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getSupplement(slug);
  if (!topic) return {};

  const title = fitSerpTitle(topic.title);
  const description = trimDescription(topic.summary);
  const ogTitle =
    typeof title === "string" ? `${topic.title} | ${site.name}` : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: `/supplements/${topic.slug}` },
    openGraph: {
      title: ogTitle,
      description,
      url: `/supplements/${topic.slug}`,
      images: [defaultOgImage],
    },
  };
}

export default async function SupplementDetailPage({ params }: Props) {
  const { slug } = await params;
  const topic = getSupplement(slug);
  if (!topic) notFound();

  const relatedConditions = topic.relatedConditionSlugs
    .map((conditionSlug) => getCondition(conditionSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedTopics = supplements
    .filter((item) => item.slug !== topic.slug && item.category === topic.category)
    .slice(0, 3);

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${site.websiteUrl}/supplements/${topic.slug}#webpage`,
    name: topic.title,
    url: `${site.websiteUrl}/supplements/${topic.slug}`,
    description: topic.summary,
    about: {
      "@type": "Thing",
      name: topic.title,
    },
    specialty: "https://schema.org/Musculoskeletal",
    audience: {
      "@type": "PeopleAudience",
      geographicArea: { "@type": "City", name: "Woolwich" },
    },
    reviewedBy: { "@id": `${site.websiteUrl}/#practitioner` },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
  };

  const faqLd =
    topic.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: topic.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Supplements", path: "/supplements" },
    { name: topic.title, path: `/supplements/${topic.slug}` },
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
            <Link href="/supplements" className="hover:text-teal-dark">
              Supplements
            </Link>
            {" · "}
            {topic.category}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {topic.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {topic.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            {topic.relatedExercisePath ? (
              <ButtonLink href={topic.relatedExercisePath} variant="secondary">
                Related exercises
              </ButtonLink>
            ) : (
              <ButtonLink href="/exercises" variant="secondary">
                Exercise library
              </ButtonLink>
            )}
            <ButtonLink href="/supplements" variant="secondary">
              All guides
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <SupplementSafetyBanner compact />
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-12 md:px-8">
        <div className="space-y-10">
          {topic.sections.map((section) => (
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

        {topic.caveats.length > 0 ? (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6">
            <h2 className="font-display text-2xl text-navy">Important caveats</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
              {topic.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {topic.faqs.length > 0 ? (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-navy md:text-3xl">FAQs</h2>
            <dl className="mt-6 space-y-6">
              {topic.faqs.map((faq) => (
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
      </section>

      {(relatedConditions.length > 0 || relatedTopics.length > 0) && (
        <section className="border-t border-slate-200 bg-white px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            {relatedConditions.length > 0 ? (
              <div>
                <h2 className="font-display text-2xl text-navy">Related conditions</h2>
                <ul className="mt-4 space-y-2">
                  {relatedConditions.map((condition) => (
                    <li key={condition.slug}>
                      <Link
                        href={`/conditions/${condition.slug}`}
                        className="font-semibold text-teal hover:text-teal-dark"
                      >
                        {condition.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {relatedTopics.length > 0 ? (
              <div>
                <h2 className="font-display text-2xl text-navy">More in {topic.category}</h2>
                <ul className="mt-4 space-y-2">
                  {relatedTopics.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/supplements/${item.slug}`}
                        className="font-semibold text-teal hover:text-teal-dark"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      )}

      <section className="px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
          <ButtonLink href="/book">Book an assessment</ButtonLink>
          <ButtonLink href="/aftercare" variant="secondary">
            Aftercare guide
          </ButtonLink>
          <ButtonLink href="/resources" variant="secondary">
            Patient resources
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
