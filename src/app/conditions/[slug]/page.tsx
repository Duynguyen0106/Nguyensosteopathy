import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import {
  conditions,
  getAllConditionSlugs,
  getCondition,
} from "@/lib/conditions";
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
  const others = conditions.filter((item) => item.slug !== condition.slug);

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
    specialty: "Osteopathic",
    audience: {
      "@type": "PeopleAudience",
      geographicArea: {
        "@type": "City",
        name: "Woolwich",
      },
    },
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
            <Link href="/conditions" className="hover:text-teal-dark">
              Conditions
            </Link>
            {" · "}
            Woolwich SE18
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

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {condition.summary} Care is with {site.practitioner.name},{" "}
            {site.practitioner.title}, inside {site.address.venue}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
          </div>

          <div className="mt-14">
            <h2 className="font-display text-2xl text-navy">
              Other condition guides
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-teal">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/conditions/${item.slug}`}
                    className="hover:text-teal-dark"
                  >
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
