import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import {
  getAllServiceAreaSlugs,
  getServiceArea,
  serviceAreas,
} from "@/lib/areas";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};

  const title = `Osteopath near ${area.name} | Woolwich SE18 Clinic`;
  const description = `${area.summary} Book Nguyen's Osteopathic Clinic inside St James Pharmacy, Powis Street.`;

  return {
    title,
    description,
    alternates: { canonical: `/areas/${area.slug}` },
    keywords: area.keywords,
    openGraph: {
      title,
      description,
      url: `/areas/${area.slug}`,
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  const others = serviceAreas.filter((item) => item.slug !== area.slug);

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    url: `${site.websiteUrl}/areas/${area.slug}`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Woolwich",
      addressRegion: "London",
      postalCode: "SE18 6LQ",
      addressCountry: "GB",
    },
    areaServed: {
      "@type": "City",
      name: area.name,
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
            <Link href="/areas" className="hover:text-teal-dark">
              Areas we serve
            </Link>
            {" · "}
            {area.shortName}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Osteopath near {area.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {area.heroLine}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book from {area.name}</ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us &amp; parking
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy">
              Why patients from {area.name} choose us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {area.summary}
            </p>
            <ul className="mt-6 space-y-3">
              {area.whyVisit.map((item) => (
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
            <h2 className="font-display text-3xl text-navy">Getting here</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {area.travelNote}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Clinic address: {site.address.venue}, {site.address.line1},{" "}
              {site.address.line2}. Ask at the pharmacy counter for the
              osteopathy room.
            </p>
            <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-teal uppercase">
              Pharmacy building
            </p>
            <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
              {site.hours.map((row) => (
                <li key={row.days}>
                  <span className="text-navy">{row.days}</span> · {row.time}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {site.booking.shortNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/find-us" variant="secondary">
                Directions
              </ButtonLink>
              <ButtonLink
                href={site.address.mapsUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">
            Popular next steps from {area.name}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-teal">
            <li>
              <Link href="/back-neck" className="hover:text-teal-dark">
                Back &amp; neck
              </Link>
            </li>
            <li>
              <Link href="/sports" className="hover:text-teal-dark">
                Sports injury
              </Link>
            </li>
            <li>
              <Link href="/shockwave" className="hover:text-teal-dark">
                Shockwave
              </Link>
            </li>
            <li>
              <Link href="/fees" className="hover:text-teal-dark">
                Fees
              </Link>
            </li>
            <li>
              <Link href="/new-patients" className="hover:text-teal-dark">
                New patients
              </Link>
            </li>
            {area.relatedBlogSlug ? (
              <li>
                <Link
                  href={`/blog/${area.relatedBlogSlug}`}
                  className="hover:text-teal-dark"
                >
                  Local article
                </Link>
              </li>
            ) : null}
          </ul>

          <div className="mt-14">
            <h2 className="font-display text-2xl text-navy">
              Other neighbourhoods
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-teal">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/areas/${item.slug}`}
                    className="hover:text-teal-dark"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              <Link
                href="/areas"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                View all areas →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
