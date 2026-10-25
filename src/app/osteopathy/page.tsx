import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import {
  breadcrumbJsonLd,
  defaultOgImage,
  faqPageJsonLd,
} from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "What Is Osteopathy?",
  description:
    "What osteopathy is, how a GOsC-registered osteopath works, and what to expect at Nguyen's Osteopathic Clinic in Woolwich — hands-on assessment, no GP…",
  alternates: { canonical: "/osteopathy" },
  keywords: [
    "what is osteopathy",
    "osteopath Woolwich",
    "osteopathy explained",
    "GOsC osteopath SE18",
    "drug free osteopathy London",
    "osteopath vs physiotherapist Woolwich",
  ],
  openGraph: {
    title: "What Is Osteopathy? | Nguyen's Osteopathic Clinic",
    description:
      "Plain-English guide to osteopathy and how care works at our Woolwich clinic.",
    url: "/osteopathy",
    images: [defaultOgImage],
  },
};

const visitSteps = [
  {
    step: "01",
    title: "Listen and map the problem",
    body: "When it started, what aggravates it, how you sit and train, and what you need to get back to — work, sport, or sleep without waking sore.",
  },
  {
    step: "02",
    title: "See how you move",
    body: "Joints, soft tissue, and posture are checked so treatment targets the driver, not only the loudest sore spot.",
  },
  {
    step: "03",
    title: "Treat and leave with a plan",
    body: "Hands-on care where it helps, then clear aftercare — desk tweaks, load advice, and whether another visit is worth it.",
  },
] as const;

const whoItHelps = [
  {
    title: "Back, neck & sciatica",
    href: "/services/back-neck-pain",
    detail: "Spinal stiffness, desk strain, and nerve-type leg symptoms.",
  },
  {
    title: "Headaches & joints",
    href: "/services/headaches-joints",
    detail: "Tension headaches and stiff shoulders, hips, knees, or ankles.",
  },
  {
    title: "Sports & overuse",
    href: "/services/sports-injury-rehab",
    detail: "Strains, sprains, and return-to-training plans.",
  },
  {
    title: "Pregnancy support",
    href: "/services/pregnancy-support",
    detail: "Gentle care for pelvic and postural change.",
  },
  {
    title: "Desk & hybrid workers",
    href: "/desk-pain",
    detail: "Laptop necks, upper-back ache, and RSI-type forearm load.",
  },
  {
    title: "Focused shockwave",
    href: "/services/focused-shockwave",
    detail: "Adjunct LI-ESWT for stubborn tendon problems when suitable.",
  },
] as const;

const straightAnswers = [
  {
    question: "Do I need a GP referral?",
    answer:
      "No. You can book directly. Bring letters or scans if you have them.",
  },
  {
    question: "Is osteopathy only for backs?",
    answer:
      "No. Osteopaths commonly help necks, joints, sports injuries, headaches, and more — after clinical screening.",
  },
  {
    question: "Will it be painful?",
    answer:
      "Treatment is paced to your comfort. Some techniques feel firm; we check in and adapt. Mild next-day soreness can happen.",
  },
  {
    question: "How is this different from physiotherapy?",
    answer:
      "Both are regulated MSK professions with overlapping skills. Approach and session style vary by practitioner — we explain our plan clearly so you can decide.",
  },
] as const;

export default function OsteopathyPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "What Is Osteopathy?",
    url: `${site.websiteUrl}/osteopathy`,
    description:
      "Explanation of osteopathy and how care works at Nguyen's Osteopathic Clinic in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Osteopathy",
    },
    specialty: "https://schema.org/Musculoskeletal",
  };
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "What is osteopathy?", path: "/osteopathy" },
  ]);
  const faqLd = faqPageJsonLd(straightAnswers);
  const bookUrl = bookHref("osteopathy");

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* One composition: brand, headline, one line, CTAs, full-bleed clinic image */}
      <section className="relative min-h-[min(88vh,820px)] overflow-hidden text-white">
        <Image
          src="/images/clinic-treatment.webp"
          alt="Treatment room at Nguyen's Osteopathic Clinic in Woolwich"
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
            What is osteopathy?
          </h1>
          <p className="about-rise about-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Regulated, drug-free care for how you move — assessed and treated
            one-to-one in Woolwich SE18.
          </p>
          <div className="about-rise about-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book an assessment
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="onDarkOutline">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              At this clinic
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-5xl">
              Hands-on care with a clear explanation
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
              <p>
                Osteopathy is a UK-regulated musculoskeletal profession. Here it
                means a private consultation with{" "}
                {site.practitioner.name}, {site.practitioner.title} (Reg. No.{" "}
                {site.practitioner.regNo}) — inside {site.address.venue} on
                Powis Street.
              </p>
              <p>
                Pain in one place often starts somewhere else. We look at how
                joints, muscles, and posture share load, then use soft-tissue
                work, mobilisation, and gentler techniques where they help —
                with advice you can actually use between visits.
              </p>
              <p>
                No GP referral needed. Sessions are in English or Vietnamese.
                Initial visits are 60 minutes (£75); follow-ups are usually 30
                minutes (£60).
              </p>
            </div>
            <p className="mt-6 text-sm text-slate-600">
              <Link
                href="/about"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Meet Austin
              </Link>
              {" · "}
              <Link
                href="/fees"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Fees
              </Link>
              {" · "}
              <a
                href={site.practitioner.goscRegisterUrl}
                className="font-semibold text-teal hover:text-teal-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                GOsC register
              </a>
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-slate-200 lg:aspect-auto lg:min-h-[420px]">
            <Image
              src="/images/austin-nguyen.webp"
              alt="Austin Duy Nguyen, GOsC-registered osteopath"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[center_18%]"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Your visit
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            What happens in the room
          </h2>
          <ol className="mt-12 max-w-3xl space-y-10">
            {visitSteps.map((item) => (
              <li key={item.step} className="flex gap-5 md:gap-8">
                <span className="font-display text-2xl text-teal md:text-3xl">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-slate-600">
            First time here?{" "}
            <Link
              href="/new-patients"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              New patient guide
            </Link>
            {" · "}
            <Link
              href="/aftercare"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Aftercare
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Who it helps
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            Common reasons people book
          </h2>
          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {whoItHelps.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="text-lg font-semibold text-navy group-hover:text-teal">
                    {item.title}
                  </span>
                  <span className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-right">
                    {item.detail}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Straight answers
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-5xl">
            Questions people ask first
          </h2>
          <dl className="mt-10 space-y-8">
            {straightAnswers.map((item) => (
              <div key={item.question}>
                <dt className="text-lg font-semibold text-navy">
                  {item.question}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-slate-600">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-sm text-slate-600">
            More detail:{" "}
            <Link
              href="/blog/osteopath-vs-physiotherapist-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Osteopath vs physiotherapist
            </Link>
            {" · "}
            <Link
              href="/faq"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Full FAQ
            </Link>
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden text-white">
        <Image
          src="/images/clinic-room.webp"
          alt="Consultation space at Nguyen's Osteopathic Clinic"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-navy-deep/88"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            {site.name}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl">
            Book osteopathy in Woolwich
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {site.booking.shortNote} Inside {site.address.venue},{" "}
            {site.address.line1}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book online
            </ButtonLink>
            <ButtonLink href="/find-us" variant="onDarkOutline">
              Find us
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="onDarkOutline">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
