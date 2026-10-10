import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "NHS & Student Discount | Osteopath Woolwich",
  description:
    "10% NHS staff and student discount at Nguyen's Osteopathic Clinic in Woolwich SE18. Valid ID required at appointment. See how it works with opening-day offers and booking.",
  alternates: { canonical: "/nhs-discount" },
  keywords: [
    "NHS discount osteopath Woolwich",
    "student discount osteopathy SE18",
    "cheap osteopath Woolwich",
    "NHS staff osteopath London",
    "student osteopath discount",
  ],
  openGraph: {
    title: "NHS & Student Discount | Nguyen's Osteopathic Clinic",
    description:
      "10% off for NHS staff and students with valid ID in Woolwich SE18.",
    url: "/nhs-discount",
  },
};

const points = [
  {
    title: "Who qualifies",
    body: "NHS staff and students. Bring valid ID to the appointment so we can apply the discount.",
  },
  {
    title: "How much",
    body: "10% off eligible clinic fees listed on our fees page — confirmed when you attend.",
  },
  {
    title: "Opening-day note",
    body: `The ${site.openingOffer.discountPercent}% opening offer on ${site.openingOffer.dateLabel} does not stack with the NHS/student discount.`,
  },
  {
    title: "How to book",
    body: "Book online as usual, then show ID at the pharmacy clinic. Call if you are unsure which appointment type to choose.",
  },
] as const;

export default function NhsDiscountPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "NHS & Student Discount",
    url: `${site.websiteUrl}/nhs-discount`,
    description:
      "10% NHS staff and student discount at Nguyen's Osteopathic Clinic in Woolwich.",
    mainEntity: {
      "@type": "Offer",
      name: "NHS staff & student discount",
      description: site.discount,
      seller: {
        "@type": "MedicalBusiness",
        name: site.name,
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
            Community pricing · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            NHS &amp; student discount
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {site.discount}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              View fees
            </ButtonLink>
            <ButtonLink href="/opening" variant="secondary">
              Opening offer
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            How it works
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {points.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Ready when you are</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Same registered osteopathic care — with a clearer fee if you work in
            the NHS or are studying. Explore treatments, then book a time that
            fits.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Related:{" "}
            <Link
              href="/blog/nhs-student-osteopathy-discount-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Discount article
            </Link>
            {" · "}
            <Link
              href="/faq"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              FAQ
            </Link>
            {" · "}
            <Link
              href="/new-patients"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              New patient guide
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book an appointment</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Services
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
