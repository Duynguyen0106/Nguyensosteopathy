import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { bookingHoursSpecification, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Osteopath in Woolwich | Call, WhatsApp & Map",
  description:
    "Contact Nguyen's Osteopathic Clinic inside St James Pharmacy, 52 Powis Street, Woolwich SE18. Call 07882843513, WhatsApp, email, or book online. Bookable osteopathy days Mon–Tue & Thu–Sat from 5 November 2026.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact osteopath Woolwich",
    "osteopath Powis Street",
    "St James Pharmacy osteopath",
    "osteopath SE18 phone",
    "Nguyen's Osteopathic Clinic contact",
  ],
  openGraph: {
    title: "Contact Nguyen's Osteopathic Clinic | Woolwich SE18",
    description:
      "Call, WhatsApp, email, or visit us inside St James Pharmacy on Powis Street.",
    url: "/contact",
  },
};

const channels = [
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    detail: site.booking.shortNote,
  },
  {
    label: "WhatsApp",
    value: "Message on WhatsApp",
    href: site.whatsappUrl,
    detail: "Quick questions & appointment help",
  },
  {
    label: "Email",
    value: site.email,
    href: site.emailHref,
    detail: "We aim to reply within one working day",
  },
] as const;

export default function ContactPage() {
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.websiteUrl}/contact`,
    mainEntity: {
      "@type": "MedicalBusiness",
      name: site.name,
      telephone: site.phone,
      email: site.email,
      url: site.websiteUrl,
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
      openingHoursSpecification: bookingHoursSpecification,
    },
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="opening-hero-copy text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="opening-hero-copy opening-hero-delay-1 mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Contact &amp; visit
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Reach Austin by phone, WhatsApp, or email — or book online for a
            time that suits you.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href={site.whatsappUrl} variant="secondary">
              WhatsApp
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy">Get in touch</h2>
            <ul className="mt-8 space-y-6">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                    {channel.label}
                  </p>
                  <a
                    href={channel.href}
                    className="mt-1 block text-lg font-semibold text-navy hover:text-teal"
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      channel.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {channel.value}
                  </a>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {channel.detail}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="font-display text-2xl text-navy">Visit us</h2>
              <p className="mt-3 text-base font-medium text-slate-700">
                {site.address.venue}
                <br />
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Ask at the pharmacy counter on arrival — they will direct you to
                the osteopathy consultation room.
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
              <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                Bookable osteopathy
              </p>
              <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                {site.booking.hours.map((row) => (
                  <li key={`book-${row.days}`}>
                    <span className="text-navy">{row.days}</span> · {row.time}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {site.booking.shortNote}
              </p>
              <p className="mt-4 text-xs text-slate-500">{site.cancellation}</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-navy">Send a message</h2>
            <p className="mt-2 text-sm text-slate-600">
              Prefer to write first? Leave a short note and we will follow up.
            </p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-navy">Find us on the map</h2>
              <p className="mt-2 text-sm text-slate-600">
                52 Powis Street, Woolwich — easy from Greenwich, Plumstead, and
                Abbey Wood.{" "}
                <Link
                  href="/find-us"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  Find us &amp; parking →
                </Link>
                {" · "}
                <Link
                  href="/areas"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  Areas we serve
                </Link>
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
        </div>
      </section>
    </div>
  );
}
