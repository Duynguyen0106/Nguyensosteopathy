import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "NHS & Student Discount",
  description:
    "10% NHS staff and student discount at Nguyen's Osteopathic Clinic in Woolwich SE18. Valid ID required at appointment. See how it works with booking.",
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
      "10% off eligible osteopathy fees for NHS staff and students at Nguyen's Osteopathic Clinic in Woolwich SE18 — show valid ID at your appointment.",
    url: "/nhs-discount",
    images: [defaultOgImage],
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
    title: "How to book",
    body: "Book online as usual, then show ID at the pharmacy clinic. Call if you are unsure which appointment type to choose.",
  },
  {
    title: "What to bring",
    body: "Photo ID that shows your NHS role or student status — for example an NHS staff card, university ID, or enrolment letter.",
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
      seller: { "@id": `${site.websiteUrl}/#clinic` },
    },
  };
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "NHS & student discount", path: "/nhs-discount" },
  ]);
  const bookUrl = bookHref("services");

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="relative min-h-[min(88vh,820px)] overflow-hidden text-white">
        <Image
          src="/images/clinic-desk.webp"
          alt="Clinic desk at Nguyen's Osteopathic Clinic"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-deep/94 via-navy/80 to-navy/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/88 via-transparent to-navy/25"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <p className="about-rise text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            {site.name}
          </p>
          <h1 className="about-rise about-rise-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
            NHS &amp; student discount
          </h1>
          <p className="about-rise about-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            10% off eligible fees for NHS staff and students — show valid ID at
            your appointment.
          </p>
          <div className="about-rise about-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book online
            </ButtonLink>
            <ButtonLink href="/fees" variant="onDarkOutline">
              View fees
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            Clear fee, same care
          </h2>
          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {points.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-right md:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate-600">
            Online booking uses standard listed prices. Mention NHS or student
            status when you arrive so the fee is adjusted before you pay — you
            do not need a separate promo code. Optional add-ons are confirmed
            before treatment starts.
          </p>
          <p className="mt-6 text-sm text-slate-600">
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
        </div>
      </section>

      <section className="relative overflow-hidden text-white">
        <Image
          src="/images/clinic-room.webp"
          alt="Treatment room at Nguyen's Osteopathic Clinic"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-deep/88" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            {site.name}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl">
            Ready when you are
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Same registered osteopathic care — with a clearer fee if you work in
            the NHS or are studying.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book an appointment
            </ButtonLink>
            <ButtonLink href="/services" variant="onDarkOutline">
              Services
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
