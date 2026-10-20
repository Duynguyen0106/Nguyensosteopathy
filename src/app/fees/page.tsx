import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { bookHref } from "@/lib/seo-strategy";
import { pricing, schemaOfferId, schemaOffers, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopath Fees & Prices in Woolwich",
  description:
    "Clear osteopathy fees in Woolwich SE18: initial £75, follow-up £60, home visits £120 / £100, shockwave £90, deep tissue £60. 10% NHS & student discount.",
  alternates: {
    canonical: "/fees",
    languages: {
      "en-GB": "/fees",
      "vi-VN": "/vi/fees",
      "x-default": "/fees",
    },
  },
  keywords: [
    "osteopath Woolwich prices",
    "osteopath Woolwich fees",
    "osteopathy cost SE18",
    "home visit osteopath price Woolwich",
    "shockwave therapy price Woolwich",
    "Nguyen's Osteopathic Clinic pricing",
  ],
  openGraph: {
    title: "Osteopath Fees & Prices in Woolwich",
    description:
      "Clear osteopathy fees in Woolwich SE18: initial £75, follow-up £60, home visits £120 / £100, shockwave £90. 10% NHS & student discount.",
    url: "/fees",
    images: [defaultOgImage],
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
  /** Offer catalog only — clinic identity lives sitewide at /#clinic. */
  const offersLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${site.websiteUrl}/fees#offers`,
    name: `${site.name} fees`,
    url: `${site.websiteUrl}/fees`,
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    // Reference canonical Offer objects on #clinic — do not duplicate price nodes.
    itemListElement: schemaOffers.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@id": schemaOfferId(item.service) },
    })),
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-4 pt-12 pb-14 sm:px-5 sm:pt-14 sm:pb-16 md:px-8 md:pt-20 md:pb-20">
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
          <p className="opening-hero-copy opening-hero-delay-2 mt-3 text-sm text-slate-500">
            <Link
              href="/vi/fees"
              className="font-semibold text-teal hover:text-teal-dark"
              hrefLang="vi-VN"
            >
              Tiếng Việt
            </Link>
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={bookHref("fees")} className="w-full sm:w-auto">
              Book online
            </ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden min-w-[36rem] grid-cols-[1.6fr_0.8fr_0.5fr] bg-navy px-6 py-4 text-sm font-medium tracking-wide text-white md:grid">
              <span>Service &amp; consultation</span>
              <span>Duration</span>
              <span className="text-right">Price</span>
            </div>
            <ul className="md:min-w-[36rem]">
              {pricing.map((row, index) => (
                <li
                  key={row.service}
                  className={`grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1 px-4 py-4 sm:px-5 md:grid-cols-[1.6fr_0.8fr_0.5fr] md:items-center md:gap-4 md:px-6 ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <p className="col-span-2 min-w-0 font-medium text-navy md:col-span-1">
                    {row.service}
                  </p>
                  <p className="text-sm font-medium text-slate-600">
                    {row.duration}
                  </p>
                  <p className="text-right text-lg font-bold text-teal-dark">
                    {row.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-sm text-slate-600">
            Guides:{" "}
            <Link
              href="/services/home-visits"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Home visits
            </Link>
            {" · "}
            <Link
              href="/services/focused-shockwave"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Shockwave
            </Link>
            {" · "}
            <Link
              href="/services/mens-health-ed"
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
              Cupping add-on
            </Link>
            {" · "}
            <Link
              href="/insurance"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Insurance &amp; receipts →
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
            <ButtonLink href={bookHref("fees")}>Book an appointment</ButtonLink>
            <ButtonLink href="/nhs-discount" variant="secondary">
              NHS &amp; student discount
            </ButtonLink>
          </div>
        </div>
      </section>

      <TopicClusterNav clusterId="specialty" />
    </div>
  );
}
