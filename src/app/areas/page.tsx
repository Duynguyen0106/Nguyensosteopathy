import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { serviceAreas } from "@/lib/areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas We Serve | Osteopath Woolwich, Plumstead & SE London",
  description:
    "Osteopath serving Woolwich, Plumstead, Abbey Wood, Greenwich, Charlton, and Thamesmead from St James Pharmacy, 52 Powis Street, SE18. Book online — no GP referral needed.",
  alternates: { canonical: "/areas" },
  keywords: [
    "osteopath Woolwich",
    "osteopath Plumstead",
    "osteopath Abbey Wood",
    "osteopath Greenwich",
    "osteopath Charlton",
    "osteopath Thamesmead",
    "osteopath SE18",
    "areas we serve osteopath",
  ],
  openGraph: {
    title: "Areas We Serve | Nguyen's Osteopathic Clinic",
    description:
      "Local osteopathy for Woolwich and nearby SE London neighbourhoods.",
    url: "/areas",
  },
};

export default function AreasPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    url: `${site.websiteUrl}/areas`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Woolwich",
      addressRegion: "London",
      postalCode: "SE18 6LQ",
      addressCountry: "GB",
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.name,
    })),
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
            Local care
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Areas we serve
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Based in Woolwich SE18 — practical for patients across Plumstead,
            Abbey Wood, Greenwich, Charlton, and Thamesmead who want registered
            osteopathy without a central London trip.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book an appointment</ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us &amp; parking
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Clinic base
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            Inside {site.address.venue}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {site.address.line1}, {site.address.line2}. Ask at the pharmacy
            counter on arrival and staff will direct you to the osteopathy room.
            Online booking — no GP referral needed.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Public transport",
                body: "Woolwich Arsenal (Elizabeth line, DLR, National Rail) plus buses serving Powis Street.",
              },
              {
                title: "Parking",
                body: "Short-stay Woolwich town-centre parking nearby — check signs for limits and payment.",
              },
              {
                title: "Hours",
                body: `Pharmacy: ${site.hours.map((h) => `${h.days} ${h.time}`).join("; ")}. ${site.booking.shortNote}`,
              },
            ].map((item) => (
              <li key={item.title}>
                <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            <Link
              href="/find-us"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Find us &amp; parking →
            </Link>
            {" · "}
            <Link
              href="/blog/parking-osteopath-woolwich-powis-street"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Longer travel article
            </Link>
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Neighbourhoods nearby
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Same clinic, same practitioner — whichever SE London postcode you
            start from.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {serviceAreas.map((area) => (
              <li
                key={area.slug}
                id={area.slug}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                  {area.shortName}
                </p>
                <h3 className="mt-2 font-display text-2xl text-navy">
                  Osteopath for {area.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {area.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {area.travelNote}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-teal">
                  <Link
                    href={`/areas/${area.slug}`}
                    className="hover:text-teal-dark"
                  >
                    {area.name} page →
                  </Link>
                  <Link href="/book" className="hover:text-teal-dark">
                    Book
                  </Link>
                  {area.relatedBlogSlug ? (
                    <Link
                      href={`/blog/${area.relatedBlogSlug}`}
                      className="hover:text-teal-dark"
                    >
                      Local guide
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Ready when you are</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Book online, call {site.phone}, or browse conditions and fees before
            your first visit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/conditions" variant="secondary">
              Conditions
            </ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              New patients
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
