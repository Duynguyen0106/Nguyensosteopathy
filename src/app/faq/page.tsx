import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopath FAQ Woolwich | First Visit, Fees & Booking",
  description:
    "Frequently asked questions about Nguyen's Osteopathic Clinic in Woolwich: GP referrals, first visits, hours inside St James Pharmacy, Vietnamese consultations, discounts, and cancellation.",
  alternates: { canonical: "/faq" },
  keywords: [
    "osteopath Woolwich FAQ",
    "first osteopathy visit Woolwich",
    "osteopath St James Pharmacy",
    "Vietnamese osteopath questions",
  ],
  openGraph: {
    title: "FAQ | Nguyen's Osteopathic Clinic",
    description:
      "Quick answers before you book osteopathy in Woolwich SE18.",
    url: "/faq",
  },
};

export default function FaqPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="opening-hero-copy text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="opening-hero-copy opening-hero-delay-1 mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Frequently asked questions
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Clear answers before you book — referrals, first visits, finding us
            inside the pharmacy, and how care works in Woolwich SE18.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              New patient guide
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faqs} />
          <p className="mt-8 text-sm text-slate-600">
            Still unsure?{" "}
            <Link href="/contact" className="font-semibold text-teal hover:text-teal-dark">
              Contact us
            </Link>
            , WhatsApp, or call{" "}
            <a href={site.phoneHref} className="font-semibold text-teal hover:text-teal-dark">
              {site.phone}
            </a>
            . See{" "}
            <Link href="/fees" className="font-semibold text-teal hover:text-teal-dark">
              fees
            </Link>
            ,{" "}
            <Link
              href="/nhs-discount"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              NHS &amp; student discount
            </Link>
            , and the{" "}
            <Link href="/opening" className="font-semibold text-teal hover:text-teal-dark">
              opening-day offer
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
