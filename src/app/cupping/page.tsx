import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cupping add-on in Woolwich",
  description:
    "Cupping therapy add-on (+£15) in Woolwich SE18 for muscular tightness — used when clinically useful alongside osteopathy or deep tissue massage at Nguyen's…",
  alternates: { canonical: "/cupping" },
  keywords: [
    "cupping Woolwich",
    "cupping therapy SE18",
    "cupping add-on osteopath",
    "cupping vs massage Woolwich",
    "myofascial cupping London",
  ],
  openGraph: {
    title: "Cupping Therapy Add-on | Nguyen's Osteopathic Clinic",
    description:
      "Optional cupping add-on (+£15) for muscular tightness in Woolwich SE18 — used only when clinically useful alongside osteopathy or deep tissue massage.",
    url: "/cupping",
    images: [defaultOgImage],
  },
};

const points = [
  {
    title: "What it is",
    body: "Cupping uses suction to lift soft tissue. It can help local muscular tightness and is offered only when it fits your presentation.",
  },
  {
    title: "Marks are temporary",
    body: "Circular marks can appear and usually fade over several days. We explain this before treatment so there are no surprises.",
  },
  {
    title: "Add-on, not a spa ritual",
    body: "At Nguyen's, cupping supports osteopathy or deep tissue work — it is not sold as a wellness package without assessment.",
  },
  {
    title: "Fee",
    body: "Cupping therapy add-on is +£15 when agreed. Main session fees are listed on the fees page.",
  },
] as const;

const dayOf = [
  {
    title: "Agreed before cups go on",
    body: "After history and examination, Austin explains whether cupping is likely to help. The +£15 fee is confirmed before treatment continues — never billed as a surprise.",
  },
  {
    title: "Short, focused placement",
    body: "Cups sit for a short period. You may feel a pulling sensation rather than sharp pain. Prefer osteopathy or massage alone? That is always fine.",
  },
  {
    title: "Clothing and work plans",
    body: "We check whether temporary circular marks would be a problem for work or events before we proceed.",
  },
] as const;

export default function CuppingPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Cupping Therapy Add-on in Woolwich",
    url: `${site.websiteUrl}/cupping`,
    description:
      "Cupping therapy add-on for muscular tightness in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Cupping therapy",
    },
  };
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cupping", path: "/cupping" },
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
          src="/images/clinic-treatment.webp"
          alt="Treatment room at Nguyen's Osteopathic Clinic"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-[center_35%]"
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
            Cupping therapy
          </h1>
          <p className="about-rise about-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Optional suction-based soft-tissue care — added only when clinically
            useful alongside osteopathy or deep tissue massage.
          </p>
          <div className="about-rise about-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book online
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="onDarkOutline">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Soft-tissue add-on
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            When we consider cupping
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
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            On the day
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            What to expect
          </h2>
          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {dayOf.map((item) => (
              <li key={item.title} className="py-5">
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-slate-600">
            Related:{" "}
            <Link
              href="/blog/cupping-therapy-add-on-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Cupping add-on guide
            </Link>
            {" · "}
            <Link
              href="/blog/cupping-vs-massage-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Cupping vs massage
            </Link>
            {" · "}
            <Link
              href="/services/deep-tissue-massage"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Deep tissue massage
            </Link>
            {" · "}
            <Link
              href="/fees"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Fees
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
            Book osteopathy or massage
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            We discuss whether cupping is useful on the day — clinical judgement,
            never pressure. Inside {site.address.venue}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book online
            </ButtonLink>
            <ButtonLink href="/find-us" variant="onDarkOutline">
              Find us
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
