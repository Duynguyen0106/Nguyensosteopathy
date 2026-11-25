import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { ButtonLink } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Osteopath in Charlton",
  description: `Contact Nguyen's Osteopathic Clinic in Charlton SE7. Call ${site.phone}, WhatsApp, email, or send a message — book online when you are ready.`,
  alternates: { canonical: "/contact" },
  keywords: [
    "contact osteopath Charlton",
    "osteopath Charlton phone",
    "WhatsApp osteopath Charlton",
    "email osteopath SE7",
    "Nguyen's Osteopathic Clinic contact",
  ],
  openGraph: {
    title: "Contact Nguyen's Osteopathic Clinic | Charlton SE7",
    description:
      "Call, WhatsApp, email, or send a message — book online when you are ready.",
    url: "/contact",
    images: [defaultOgImage],
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
    mainEntity: { "@id": `${site.websiteUrl}/#clinic` },
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
            Contact the clinic
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Reach Austin by phone, WhatsApp, or email — or book online for a
            time that suits you. For directions and parking, see Find us.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookHref("contact")}>Book online</ButtonLink>
            <ButtonLink
              href={site.whatsappUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
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
              <h2 className="font-display text-2xl text-navy">Clinic address</h2>
              <p className="mt-3 text-base font-medium text-slate-700">
                {site.address.venue}
                <br />
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {site.booking.shortNote} For parking, rail, buses, and arrival
                steps, use the Find us guide.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/find-us" variant="secondary">
                  Find us &amp; parking
                </ButtonLink>
                <ButtonLink href="/areas" variant="secondary">
                  Areas we serve
                </ButtonLink>
              </div>
              <p className="mt-4 text-xs text-slate-500">{site.cancellation}</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-navy">Send a message</h2>
            <p className="mt-2 text-sm text-slate-600">
              Prefer to write first? Draft a note here — it opens WhatsApp (or
              your email app) so you can send it straight to the clinic. For
              quick fees, hours, or booking questions, use{" "}
              <strong className="font-semibold text-navy">Ask the clinic</strong>{" "}
              in the corner of any page.
            </p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
