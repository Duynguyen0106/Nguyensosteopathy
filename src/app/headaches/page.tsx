import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Headache & Joint Osteopath in Woolwich | Tension & Stiffness",
  description:
    "Osteopathy for tension and cervicogenic headaches, plus stiff shoulders, hips, knees, and ankles in Woolwich SE18. Assessment-led care at Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/headaches" },
  keywords: [
    "headache osteopath Woolwich",
    "tension headache SE18",
    "cervicogenic headache osteopath",
    "joint pain osteopath Woolwich",
    "stiff shoulder osteopath London",
  ],
  openGraph: {
    title: "Headaches & Joints | Nguyen's Osteopathic Clinic",
    description:
      "Osteopathy for tension headaches and joint stiffness in Woolwich.",
    url: "/headaches",
  },
};

const guides = [
  {
    title: "Cervicogenic headache",
    href: "/conditions/cervicogenic-headache",
    detail: "Headache driven by upper-neck mechanics and sustained posture.",
  },
  {
    title: "Frozen shoulder",
    href: "/conditions/frozen-shoulder",
    detail: "Stiff, painful shoulders with reduced reach and night discomfort.",
  },
  {
    title: "Subacromial / cuff-related pain",
    href: "/conditions/subacromial-pain",
    detail: "Lateral shoulder pain on elevation and reaching.",
  },
  {
    title: "Hip osteoarthritis",
    href: "/conditions/hip-oa",
    detail: "Groin ache and morning stiffness with limited rotation.",
  },
  {
    title: "Knee osteoarthritis",
    href: "/conditions/knee-oa",
    detail: "Activity-related knee pain and crepitus that needs graded loading.",
  },
  {
    title: "Whiplash-associated disorder",
    href: "/conditions/whiplash",
    detail: "Post-collision neck pain with or without headache.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Map the pattern",
    detail:
      "Neck, jaw, shoulders, and related joints are checked so we know what reproduces your symptoms.",
  },
  {
    step: "02",
    title: "Calm irritable tissue",
    detail:
      "Targeted mobilisation and soft-tissue work matched to irritability — not a one-size routine.",
  },
  {
    step: "03",
    title: "Reduce recurrence",
    detail:
      "Simple desk, sleep, and load advice so headaches and joint stiffness are less likely to bounce back.",
  },
] as const;

export default function HeadachesPage() {
  const service = getService("headaches-joints");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Headache & Joint Osteopath in Woolwich",
    url: `${site.websiteUrl}/headaches`,
    description:
      "Osteopathy for tension headaches and joint stiffness in Woolwich SE18.",
    about: {
      "@type": "MedicalCondition",
      name: "Tension headache and joint pain",
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
            Head &amp; joints · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Headaches &amp; joints
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Tension and neck-related headaches, plus stiff shoulders, hips,
            knees, and ankles — treated with clear assessment and hands-on care.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Initial £75 (60 mins) · Follow-up £60 · Private one-to-one care
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book assessment</ButtonLink>
            <ButtonLink href="/cranial" variant="secondary">
              Cranial option
            </ButtonLink>
            <ButtonLink href="/back-neck" variant="secondary">
              Back &amp; neck
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              When headaches and joints overlap
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {service?.description}
            </p>
            <ul className="mt-6 space-y-3">
              {(service?.idealFor ?? []).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-base text-slate-700"
                >
                  <span className="mt-1 text-teal" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What to expect
            </h2>
            <ol className="mt-6 space-y-6">
              {steps.map((item) => (
                <li key={item.step}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                    {item.step}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Related condition guides
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-teal/40 hover:bg-teal/5"
                >
                  <span className="font-semibold text-navy">{item.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </span>
                  <span className="mt-4 text-sm font-semibold text-teal">
                    Read guide →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-600">
            Related:{" "}
            <Link
              href="/blog/tension-headaches-neck-osteopath-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Tension headaches
            </Link>
            {" · "}
            <Link
              href="/blog/hip-knee-pain-osteopath-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Hip &amp; knee pain
            </Link>
            {" · "}
            <Link
              href="/blog/shoulder-pain-frozen-shoulder-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Shoulder pain
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
