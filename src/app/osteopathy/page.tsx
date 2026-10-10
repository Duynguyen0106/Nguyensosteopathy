import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "What Is Osteopathy? | Drug-Free Care in Woolwich SE18",
  description:
    "What osteopathy is, how a GOsC-registered osteopath works, and what to expect at Nguyen's Osteopathic Clinic in Woolwich — hands-on assessment, no GP referral needed.",
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
  },
};

const pillars = [
  {
    title: "Whole-body assessment",
    body: "Pain in one place often starts somewhere else. We look at how your joints, muscles, and posture share load — not only the sore spot.",
  },
  {
    title: "Hands-on treatment",
    body: "Soft-tissue work, mobilisation, and gentle techniques aim to ease irritation and restore freer, more confident movement.",
  },
  {
    title: "Clear advice you can use",
    body: "Desk setup, training load, sleep positions, and simple exercises help protect progress between visits.",
  },
  {
    title: "Regulated UK care",
    body: `${site.practitioner.name} is a ${site.practitioner.title} (Reg. No. ${site.practitioner.regNo}), practising to GOsC professional standards.`,
  },
] as const;

const suitable = [
  {
    title: "Back, neck & sciatica",
    href: "/back-neck",
    detail: "Spinal stiffness, desk strain, and nerve-type leg symptoms.",
  },
  {
    title: "Headaches & joints",
    href: "/headaches",
    detail: "Tension headaches and stiff shoulders, hips, knees, or ankles.",
  },
  {
    title: "Sports & overuse",
    href: "/sports",
    detail: "Strains, sprains, and return-to-training plans.",
  },
  {
    title: "Pregnancy support",
    href: "/pregnancy",
    detail: "Gentle care for pelvic and postural change.",
  },
  {
    title: "Desk & hybrid workers",
    href: "/desk-pain",
    detail: "Laptop necks, upper-back ache, and RSI-type forearm load.",
  },
  {
    title: "Focused shockwave",
    href: "/shockwave",
    detail: "Adjunct LI-ESWT for stubborn tendon problems when suitable.",
  },
] as const;

const misconceptions = [
  {
    q: "Do I need a GP referral?",
    a: "No. You can book directly. Bring letters or scans if you have them.",
  },
  {
    q: "Is osteopathy only for backs?",
    a: "No. Osteopaths commonly help necks, joints, sports injuries, headaches, and more — after clinical screening.",
  },
  {
    q: "Will it be painful?",
    a: "Treatment is paced to your comfort. Some techniques feel firm; we check in and adapt. Mild next-day soreness can happen.",
  },
  {
    q: "How is this different from physiotherapy?",
    a: "Both are regulated MSK professions with overlapping skills. Approach and session style vary by practitioner — we explain our plan clearly so you can decide.",
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
    specialty: "Osteopathic",
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
            Osteopathy explained · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            What is osteopathy?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            A regulated, drug-free approach to musculoskeletal pain — assessing
            how you move, easing irritated tissues, and helping you return to
            work, sport, and daily life with clearer guidance.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Initial £75 (60 mins) · Follow-up £60 · No GP referral needed
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book an assessment</ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              New patient guide
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              Meet Austin
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            How osteopathy works here
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            At {site.name} inside {site.address.venue}, care is one-to-one,
            assessment-led, and explained in plain English — or Vietnamese if you
            prefer.
          </p>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {pillars.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Common reasons people book
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suitable.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-teal hover:shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-navy group-hover:text-teal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Straight answers
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {misconceptions.map((item) => (
              <li key={item.q}>
                <h3 className="text-lg font-semibold text-navy">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.a}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-600">
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
              FAQ
            </Link>
            {" · "}
            <Link
              href="/aftercare"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Aftercare
            </Link>
            {" · "}
            <Link
              href="/complaints"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Complaints procedure
            </Link>
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">
            Ready to be assessed in Woolwich?
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Book online from {site.booking.opensFromLabel}, or call{" "}
            {site.phone}. {site.booking.shortNote}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us
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
