import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorBio } from "@/components/AuthorBio";
import { ButtonLink } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ProgrammeCard } from "@/components/exercises/ProgrammeCard";
import {
  getAllConditionSlugs,
  getCondition,
  getConditionFaqs,
  getRelatedConditions,
} from "@/lib/conditions";
import { getProgrammesForCondition } from "@/lib/exercises";
import { getService, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllConditionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) return {};

  return {
    title: condition.title,
    description: condition.summary,
    alternates: { canonical: `/conditions/${condition.slug}` },
    keywords: condition.keywords,
    openGraph: {
      title: condition.title,
      description: condition.summary,
      url: `/conditions/${condition.slug}`,
    },
  };
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) notFound();

  const service = getService(condition.relatedServiceSlug);
  const related = getRelatedConditions(condition, 4);
  const relatedProgrammes = getProgrammesForCondition(condition.slug);
  const faqs = getConditionFaqs(condition);
  const expanded =
    Boolean(condition.causes) ||
    Boolean(condition.whoAffected) ||
    Boolean(condition.whatToExpect) ||
    Boolean(condition.recoveryTimeline);

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: condition.title,
    url: `${site.websiteUrl}/conditions/${condition.slug}`,
    description: condition.summary,
    about: {
      "@type": "MedicalCondition",
      name: condition.shortTitle,
    },
    specialty: "https://schema.org/Musculoskeletal",
    audience: {
      "@type": "PeopleAudience",
      geographicArea: {
        "@type": "City",
        name: "Woolwich",
      },
    },
    reviewedBy: { "@id": `${site.websiteUrl}/#practitioner` },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

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

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link href="/conditions" className="hover:text-teal-dark">
              Conditions
            </Link>
            {" · "}
            {condition.region}
            {" · "}
            Woolwich SE18
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Reviewed by{" "}
            <Link
              href="/about"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              {site.practitioner.name}
            </Link>
            , {site.practitioner.title} (Reg. No.{" "}
            <a
              href={site.practitioner.goscRegisterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              {site.practitioner.regNo}
            </a>
            )
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {condition.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {condition.heroLine}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book assessment</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
          <div className="mt-10 max-w-3xl">
            <AuthorBio />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy">Common signs</h2>
            <ul className="mt-6 space-y-3">
              {condition.symptoms.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-base text-slate-700"
                >
                  <span className="mt-1 text-teal" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl text-navy">
              How we help at Nguyen&apos;s
            </h2>
            <ul className="mt-6 space-y-3">
              {condition.howWeHelp.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-base text-slate-700"
                >
                  <span className="mt-1 text-teal" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {expanded ? (
        <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl space-y-12">
            {condition.causes ? (
              <div>
                <h2 className="font-display text-3xl text-navy">
                  What causes {condition.shortTitle.toLowerCase()}?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
                  {condition.causes}
                </p>
              </div>
            ) : null}
            {condition.whoAffected ? (
              <div>
                <h2 className="font-display text-3xl text-navy">
                  Who is most affected?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
                  {condition.whoAffected}
                </p>
              </div>
            ) : null}
            {condition.whatToExpect ? (
              <div>
                <h2 className="font-display text-3xl text-navy">
                  What to expect during treatment
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
                  {condition.whatToExpect}
                </p>
              </div>
            ) : null}
            {condition.recoveryTimeline ? (
              <div>
                <h2 className="font-display text-3xl text-navy">
                  Recovery timeline
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
                  {condition.recoveryTimeline}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="border-b border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy">
            FAQs about {condition.shortTitle.toLowerCase()}
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {relatedProgrammes.length > 0 ? (
        <section className="border-b border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy">
              Home exercise programmes
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Educational sequences that often pair with{" "}
              {condition.shortTitle.toLowerCase()} care. They are general guides
              — your clinic plan always comes first.
            </p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProgrammes.map((programme) => (
                <li key={programme.slug}>
                  <ProgrammeCard programme={programme} />
                </li>
              ))}
            </ul>
            <Link
              href="/exercises"
              className="mt-8 inline-flex text-sm font-semibold text-teal hover:text-teal-dark"
            >
              Browse the full exercise library →
            </Link>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy">
              Related conditions
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Presentations that often overlap with{" "}
              {condition.shortTitle.toLowerCase()} — useful if your symptoms sit
              across more than one pattern.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/conditions/${item.slug}`}
                    className="service-tile flex h-full flex-col rounded-xl border border-teal/30 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                      {item.region}
                    </span>
                    <span className="mt-2 font-semibold text-navy">
                      {item.shortTitle}
                    </span>
                    <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {item.summary}
                    </span>
                    <span className="mt-4 text-sm font-semibold text-teal">
                      Read guide →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {condition.summary} Care is with {site.practitioner.name},{" "}
            {site.practitioner.title}, inside {site.address.venue}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book assessment</ButtonLink>
            {service ? (
              <ButtonLink href={`/services/${service.slug}`} variant="secondary">
                Related: {service.title}
              </ButtonLink>
            ) : null}
            {condition.relatedBlogSlug ? (
              <ButtonLink
                href={`/blog/${condition.relatedBlogSlug}`}
                variant="secondary"
              >
                Related article
              </ButtonLink>
            ) : null}
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            <ButtonLink href="/conditions" variant="secondary">
              All conditions
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
