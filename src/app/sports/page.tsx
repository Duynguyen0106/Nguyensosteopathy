import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sports Injury Osteopath in Woolwich | Rehab & Return to Play",
  description:
    "Sports injury and rehab osteopathy in Woolwich SE18 for strains, sprains, running and gym overuse — assessment, hands-on care, and clear return-to-sport milestones at Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/sports" },
  keywords: [
    "sports injury osteopath Woolwich",
    "running injury osteopath SE18",
    "gym injury osteopath Woolwich",
    "sprain rehab Woolwich",
    "return to sport osteopath London",
  ],
  openGraph: {
    title: "Sports Injury & Rehab | Nguyen's Osteopathic Clinic",
    description:
      "Targeted osteopathy for athletic strains, sprains, and overuse in Woolwich.",
    url: "/sports",
  },
};

const injuries = [
  {
    title: "Muscle strains",
    href: "/conditions/hamstring-strain",
    detail: "Hamstring, calf, or groin pulls from sprinting, football, or gym work.",
  },
  {
    title: "Ankle sprains",
    href: "/conditions/lateral-ankle-sprain",
    detail: "Twisted ankles that need early loading and balance work, not just rest.",
  },
  {
    title: "Shin splints",
    href: "/conditions/shin-splints",
    detail: "Medial tibial ache after mileage jumps or hard training surfaces.",
  },
  {
    title: "Knee overload",
    href: "/conditions/patellofemoral-pain",
    detail: "Front-of-knee pain with running, squats, or hills.",
  },
  {
    title: "Shoulder training pain",
    href: "/conditions/subacromial-pain",
    detail: "Pressing, pulling, or overhead work that keeps irritating the cuff.",
  },
  {
    title: "IT band / lateral knee",
    href: "/conditions/itb-syndrome",
    detail: "Side-of-knee ache common in runners and cyclists.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Assess the injury and the athlete",
    detail:
      "History, sport demands, and movement testing so we know what tissue is irritable and what load it can take now.",
  },
  {
    step: "02",
    title: "Hands-on care + loading plan",
    detail:
      "Manual therapy where useful, plus progressive rehab that matches your training calendar — not generic printouts.",
  },
  {
    step: "03",
    title: "Return-to-sport milestones",
    detail:
      "Clear markers for walking, jogging, gym, and match play so you are not guessing when to push on.",
  },
] as const;

export default function SportsPage() {
  const service = getService("sports-injury-rehab");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Sports Injury Osteopath in Woolwich",
    url: `${site.websiteUrl}/sports`,
    description:
      "Sports injury and rehab osteopathy for strains, sprains, and overuse in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Osteopathic sports injury rehabilitation",
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
            Performance care · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Sports injury &amp; rehab
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Recovery plans for strains, sprains, and training overload — so you
            return to sport with better mechanics, not just less pain for a week.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Initial £75 (60 mins) · Follow-up £60 · Shockwave when suitable
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book sports assessment</ButtonLink>
            <ButtonLink href="/shockwave" variant="secondary">
              Shockwave options
            </ButtonLink>
            <ButtonLink href="/conditions" variant="secondary">
              Conditions index
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Built for how you train
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
            Common sports presentations
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Jump into a condition guide, or book if you are unsure which label
            fits.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {injuries.map((item) => (
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
            More reading:{" "}
            <Link
              href="/blog/sports-injury-osteopath-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Sports injury overview
            </Link>
            {" · "}
            <Link
              href="/blog/running-injuries-osteopath-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Running injuries
            </Link>
            {" · "}
            <Link
              href="/blog/return-to-sport-after-sprain-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Return after sprain
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
