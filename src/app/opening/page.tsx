import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { pricing, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Opening Day Offer — 50% Off | 5 November 2026",
  description:
    "Nguyen's Osteopathic Clinic opens Wednesday 5 November 2026 inside St James Pharmacy, Woolwich. Book that day for 50% off all service fees — osteopathy, shockwave, massage and more.",
  alternates: { canonical: "/opening" },
  keywords: [
    "osteopath Woolwich opening",
    "50% off osteopath Woolwich",
    "Nguyen's Osteopathic Clinic opening day",
    "osteopath SE18 offer",
    "St James Pharmacy osteopath",
  ],
  openGraph: {
    title: "Opening Day — 50% Off All Services | 5 November 2026",
    description: site.openingOffer.summary,
    url: "/opening",
    images: [
      {
        url: "/facebook/opening-day-50-off-facebook.png",
        width: 1080,
        height: 1080,
        alt: "Opening day 50% off all service fees — Nguyen's Osteopathic Clinic",
      },
    ],
  },
};

function halfPrice(price: string): string {
  const match = price.match(/^(\+?)£(\d+(?:\.\d+)?)$/);
  if (!match) return price;
  const prefix = match[1];
  const amount = Number(match[2]);
  const halved = amount / 2;
  const formatted =
    Number.isInteger(halved) ? String(halved) : halved.toFixed(2);
  return `${prefix}£${formatted}`;
}

const steps = [
  {
    title: "Book for 5 November",
    detail:
      "Use online booking and choose Wednesday 5 November 2026, or call us to reserve your slot.",
  },
  {
    title: "Arrive at St James Pharmacy",
    detail: `Find us at ${site.address.line1}, Woolwich. Ask at the pharmacy counter — they will direct you to the consultation room.`,
  },
  {
    title: "Pay half the listed fee",
    detail:
      "The 50% reduction applies to all clinic service fees for patients seen on opening day. We confirm your appointment type before treatment.",
  },
] as const;

export default function OpeningPage() {
  const offer = site.openingOffer;

  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `${offer.headline} — Opening Day`,
    description: offer.summary,
    url: `${site.websiteUrl}${offer.path}`,
    priceCurrency: "GBP",
    availability: "https://schema.org/LimitedAvailability",
    validFrom: `${offer.dateIso}T00:00:00+00:00`,
    validThrough: `${offer.dateIso}T23:59:59+00:00`,
    seller: {
      "@type": "MedicalBusiness",
      name: site.name,
      url: site.websiteUrl,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: "Woolwich",
        addressRegion: "London",
        postalCode: "SE18 6LQ",
        addressCountry: "GB",
      },
    },
  };

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${site.name} Official Opening`,
    description: offer.summary,
    startDate: `${offer.dateIso}T09:00:00+00:00`,
    endDate: `${offer.dateIso}T18:00:00+00:00`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: site.address.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: "Woolwich",
        addressRegion: "London",
        postalCode: "SE18 6LQ",
        addressCountry: "GB",
      },
    },
    organizer: {
      "@type": "Organization",
      name: site.name,
      url: site.websiteUrl,
    },
    offers: {
      "@type": "Offer",
      url: `${site.websiteUrl}/book`,
      availability: "https://schema.org/LimitedAvailability",
      validFrom: `${offer.dateIso}`,
      description: offer.headline,
    },
    image: [`${site.websiteUrl}/facebook/opening-day-50-off-facebook.png`],
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
      />

      <section className="relative min-h-[88vh] overflow-hidden text-white">
        <Image
          src="/images/austin-clinic.jpg"
          alt="Nguyen's Osteopathic Clinic inside St James Pharmacy, Woolwich"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-deep/94 via-navy/80 to-navy/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/92 via-transparent to-navy/35"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <p className="about-rise text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="about-rise about-rise-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
            {offer.headline}
          </h1>
          <p className="about-rise about-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Official opening {offer.dateLabel} — one day only, all clinic
            service fees halved.
          </p>
          <div className="about-rise about-rise-delay-3 mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/book">Book opening day</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Claim your opening-day rate
            </h2>
            <ol className="mt-10 space-y-8">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/10 font-display text-lg font-semibold text-teal"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 md:text-base">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="rounded-2xl bg-navy px-6 py-8 text-white md:px-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-mist uppercase">
              Opening day
            </p>
            <p className="mt-3 font-display text-3xl leading-tight">
              {offer.dateLabel}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {site.address.venue}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <p className="mt-4 text-sm text-white/70">
              Pharmacy hours that day: Monday–Friday pattern applies (9:00am –
              6:00pm). Book early — slots are limited.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href="/book">Reserve your time</ButtonLink>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-teal-mist underline-offset-2 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Example savings
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Listed fees vs opening-day price
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Half-price applies to the clinic fee for the appointment you book.
              NHS/student 10% does not stack with this opening-day offer.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold md:px-6">Service</th>
                  <th className="px-4 py-3 font-semibold md:px-6">Usual</th>
                  <th className="px-4 py-3 font-semibold text-teal-dark md:px-6">
                    5 Nov
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((row) => (
                  <tr
                    key={row.service}
                    className="border-t border-slate-100 text-navy"
                  >
                    <td className="px-4 py-3.5 md:px-6">
                      <span className="font-medium">{row.service}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {row.duration}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 line-through md:px-6">
                      {row.price}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-teal-dark md:px-6">
                      {halfPrice(row.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Ready for opening day?
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Book online now, or explore{" "}
              <Link href="/services" className="font-semibold text-teal hover:text-teal-dark">
                our services
              </Link>{" "}
              and{" "}
              <Link href="/about" className="font-semibold text-teal hover:text-teal-dark">
                Austin&apos;s story
              </Link>{" "}
              first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
