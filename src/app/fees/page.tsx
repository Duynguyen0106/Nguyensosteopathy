import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { pricing, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopath Fees & Prices in Woolwich | Transparent Pricing",
  description:
    "Clear osteopathy fees in Woolwich SE18: initial consultation £75, follow-up £60, focused shockwave £90, deep tissue massage £60. 10% NHS & student discount. Opening day 50% off on 5 November 2026.",
  alternates: { canonical: "/fees" },
  keywords: [
    "osteopath Woolwich prices",
    "osteopath Woolwich fees",
    "osteopathy cost SE18",
    "shockwave therapy price Woolwich",
    "Nguyen's Osteopathic Clinic pricing",
  ],
  openGraph: {
    title: "Osteopath Fees & Prices in Woolwich",
    description:
      "Transparent treatment fees at Nguyen's Osteopathic Clinic inside St James Pharmacy, Woolwich.",
    url: "/fees",
  },
};

const feeNotes = [
  {
    title: "No hidden extras",
    body: "We confirm your appointment type and fee before treatment starts. Optional add-ons (acupuncture, cupping) are only used when clinically useful and agreed with you.",
  },
  {
    title: "NHS & student discount",
    body: site.discount,
  },
  {
    title: "Cancellation",
    body: site.cancellation,
  },
] as const;

export default function FeesPage() {
  const offer = site.openingOffer;

  const offersLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    url: `${site.websiteUrl}/fees`,
    telephone: site.phone,
    priceRange: "£15–£110",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Woolwich",
      addressRegion: "London",
      postalCode: "SE18 6LQ",
      addressCountry: "GB",
    },
    makesOffer: pricing.map((item) => ({
      "@type": "Offer",
      name: item.service,
      description: `${item.service} (${item.duration})`,
      price: item.price.replace(/^\+?£/, ""),
      priceCurrency: "GBP",
    })),
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="opening-hero-copy text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="opening-hero-copy opening-hero-delay-1 mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Treatments &amp; fees
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Clear prices for osteopathy and clinic services in Woolwich SE18 —
            so you can book with confidence.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-teal/20 bg-teal px-5 py-4 text-white md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">
            <span className="font-semibold">Opening {offer.dateLabel}</span>
            {" — "}
            {offer.headline} for patients seen that day.
          </p>
          <Link
            href={offer.path}
            className="shrink-0 font-semibold underline-offset-2 hover:underline"
          >
            View opening offer →
          </Link>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.6fr_0.8fr_0.5fr] bg-navy px-6 py-4 text-sm font-medium tracking-wide text-white md:grid">
              <span>Service &amp; consultation</span>
              <span>Duration</span>
              <span className="text-right">Price</span>
            </div>
            <ul>
              {pricing.map((row, index) => (
                <li
                  key={row.service}
                  className={`grid gap-1 px-5 py-4 md:grid-cols-[1.6fr_0.8fr_0.5fr] md:items-center md:gap-4 md:px-6 ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <p className="font-medium text-navy">{row.service}</p>
                  <p className="text-sm font-medium text-slate-600">
                    {row.duration}
                  </p>
                  <p className="text-lg font-bold text-teal-dark md:text-right">
                    {row.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-sm text-slate-600">
            Guides:{" "}
            <Link
              href="/shockwave"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Shockwave
            </Link>
            {" · "}
            <Link
              href="/mens-health"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Men&apos;s health
            </Link>
            {" · "}
            <Link
              href="/nhs-discount"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              NHS &amp; student discount
            </Link>
            {" · "}
            <Link
              href="/cupping"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Cupping add-on →
            </Link>
          </p>

          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {feeNotes.map((note) => (
              <li key={note.title}>
                <h2 className="text-lg font-semibold text-navy">{note.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {note.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Ready to book?
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Choose a time online, or call if you are unsure which appointment
              fits. Explore{" "}
              <Link href="/services" className="font-semibold text-teal hover:text-teal-dark">
                services
              </Link>{" "}
              for what each treatment involves.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book">Book an appointment</ButtonLink>
            <ButtonLink href="/opening" variant="secondary">
              Opening day offer
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
