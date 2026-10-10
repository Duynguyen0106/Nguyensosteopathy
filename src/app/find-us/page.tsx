import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find Us & Parking | Osteopath Woolwich Powis Street",
  description:
    "How to find Nguyen's Osteopathic Clinic inside St James Pharmacy, 52 Powis Street, Woolwich SE18 — parking, Elizabeth line, DLR, buses, and what to do on arrival.",
  alternates: { canonical: "/find-us" },
  keywords: [
    "osteopath Woolwich parking",
    "Powis Street osteopath directions",
    "St James Pharmacy osteopath",
    "Woolwich Arsenal osteopath",
    "how to get to osteopath SE18",
  ],
  openGraph: {
    title: "Find Us & Parking | Nguyen's Osteopathic Clinic",
    description:
      "Directions, parking tips, and arrival guide for our Woolwich SE18 clinic.",
    url: "/find-us",
  },
};

const travel = [
  {
    title: "Elizabeth line, DLR & National Rail",
    body: "Alight at Woolwich Arsenal. It is a short walk into Powis Street — follow signs toward the town-centre shops and pharmacy strip.",
  },
  {
    title: "Buses",
    body: "Local routes serve Powis Street and General Gordon Place. Check live boards for the nearest stop to Woolwich town centre.",
  },
  {
    title: "Driving & parking",
    body: "Short-stay Woolwich town-centre car parks and on-street bays are nearby. Allow a few extra minutes on busy days and always check signs for time limits and payment.",
  },
  {
    title: "Walking from the station",
    body: "From Woolwich Arsenal, head toward Powis Street. Look for St James Pharmacy & Travel Clinic at number 52 — we are inside, not a street-front osteopathy shopfront.",
  },
] as const;

const arrival = [
  {
    title: "Ask at the pharmacy counter",
    body: "Tell staff you have an osteopathy appointment with Nguyen's. They will direct you to the consultation room.",
  },
  {
    title: "Arrive a few minutes early",
    body: "Especially for your first visit — useful if you are parking or finding the pharmacy for the first time.",
  },
  {
    title: "Wear comfortable clothes",
    body: "Loose clothing that lets you move your spine, hips, and shoulders helps the assessment. See the new-patient guide for a full checklist.",
  },
] as const;

export default function FindUsPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    url: `${site.websiteUrl}/find-us`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Woolwich",
      addressRegion: "London",
      postalCode: "SE18 6LQ",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.4905,
      longitude: 0.0675,
    },
    hasMap: site.address.mapsUrl,
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
            Directions · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Find us &amp; parking
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Inside {site.address.venue} at {site.address.line1},{" "}
            {site.address.line2} — easy by Elizabeth line, DLR, bus, or short-stay
            town-centre parking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book an appointment
            </ButtonLink>
            <ButtonLink href="/areas" variant="secondary">
              Areas we serve
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            How to get here
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {travel.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <ul className="mt-10 space-y-2 text-sm font-medium text-slate-700">
            {site.hours.map((row) => (
              <li key={row.days}>
                <span className="text-navy">{row.days}</span> · {row.time}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            On arrival
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {arrival.map((item, index) => (
              <li key={item.title}>
                <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-slate-600">
            First visit?{" "}
            <Link
              href="/new-patients"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              New patient guide →
            </Link>
            {" · "}
            <Link
              href="/blog/parking-osteopath-woolwich-powis-street"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Longer parking article
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-navy">Map</h2>
              <p className="mt-2 text-sm text-slate-600">
                {site.address.line1}, Woolwich — inside the pharmacy, not a
                separate street entrance.
              </p>
            </div>
            <ButtonLink
              href={site.address.mapsUrl}
              variant="navy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </ButtonLink>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <iframe
              title="Map to Nguyen's Osteopathic Clinic, 52 Powis Street Woolwich"
              src={site.address.mapsEmbedUrl}
              className="h-[320px] w-full border-0 md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
