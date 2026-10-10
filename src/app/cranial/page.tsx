import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cranial Osteopathy in Woolwich | Gentle Head & Neck Care",
  description:
    "Cranial osteopathy in Woolwich SE18 — subtle, gentle techniques for head, jaw, and upper-neck tension when you prefer a quieter treatment style at Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/cranial" },
  keywords: [
    "cranial osteopath Woolwich",
    "cranial osteopathy SE18",
    "gentle osteopath Woolwich",
    "jaw tension osteopath London",
    "headache cranial osteopathy Woolwich",
  ],
  openGraph: {
    title: "Cranial Osteopathy | Nguyen's Osteopathic Clinic",
    description:
      "Subtle cranial osteopathy for tension and structural comfort in Woolwich.",
    url: "/cranial",
  },
};

const suits = [
  {
    title: "Prefer gentler contact",
    detail:
      "Useful when firmer soft-tissue or mobilisation feels too intense right now.",
  },
  {
    title: "Head, jaw & neck patterns",
    detail:
      "Tension that sits through the upper neck, jaw, or head and softens best with a quieter approach.",
  },
  {
    title: "Stress-held tightness",
    detail:
      "When the body holds protective tone and you need space to settle, not a forceful release.",
  },
  {
    title: "Alongside structural care",
    detail:
      "Cranial work can sit within a broader osteopathic plan — we match technique to what you need that day.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Unhurried history",
    detail:
      "We discuss symptoms, sensitivity to touch, headaches, jaw habits, and what has or has not helped before.",
  },
  {
    step: "02",
    title: "Subtle hands-on care",
    detail:
      "Light, precise contact with regular check-ins. You remain clothed and can ask to pause at any time.",
  },
  {
    step: "03",
    title: "Aftercare",
    detail:
      "Simple advice on rest, hydration, and what sensations are common afterwards — plus whether further visits make sense.",
  },
] as const;

export default function CranialPage() {
  const service = getService("cranial-therapy");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Cranial Osteopathy in Woolwich",
    url: `${site.websiteUrl}/cranial`,
    description:
      "Gentle cranial osteopathy for head, jaw, and upper-neck tension in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Cranial osteopathy",
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
            Gentle care · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Cranial osteopathy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Subtle, precise techniques for head, jaw, and upper-neck tension —
            a quieter treatment style when you need one.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Initial £75 (60 mins) · Follow-up £60 · Calm private room
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book cranial visit</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            <ButtonLink href="/paediatric" variant="secondary">
              Paediatric care
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What cranial work is
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {service?.description}
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Who it may suit
            </h2>
            <ul className="mt-6 space-y-4">
              {suits.map((item) => (
                <li key={item.title}>
                  <h3 className="text-base font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            What to expect
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <li key={item.step}>
                <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                  {item.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-slate-600">
            Related:{" "}
            <Link
              href="/blog/cranial-osteopathy-woolwich-what-is-it"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              What is cranial osteopathy?
            </Link>
            {" · "}
            <Link
              href="/blog/cranial-osteopathy-headaches-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Cranial for headaches
            </Link>
            {" · "}
            <Link
              href="/blog/cranial-vs-structural-osteopathy-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Cranial vs structural
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/conditions/cervicogenic-headache" variant="secondary">
              Neck-related headache guide
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
