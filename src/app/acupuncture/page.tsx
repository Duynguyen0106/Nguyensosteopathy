import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medical Acupuncture in Woolwich | Osteopath Needling",
  description:
    "Western medical acupuncture and electroacupuncture in Woolwich SE18 — targeted needling for muscle pain and rehab support, standalone or as an osteopathy add-on at Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/acupuncture" },
  keywords: [
    "medical acupuncture Woolwich",
    "electroacupuncture SE18",
    "osteopath acupuncture Woolwich",
    "dry needling Woolwich",
    "acupuncture for muscle pain London",
  ],
  openGraph: {
    title: "Medical Acupuncture | Nguyen's Osteopathic Clinic",
    description:
      "Clinical acupuncture and electroacupuncture for pain relief in Woolwich.",
    url: "/acupuncture",
  },
};

const uses = [
  {
    title: "Trigger-point irritability",
    detail: "Local muscle knots that stay sore despite stretching or massage alone.",
  },
  {
    title: "Persistent localised pain",
    detail: "Stubborn spots in the neck, shoulder girdle, back, or limbs during rehab.",
  },
  {
    title: "Adjunct to osteopathy",
    detail: "Often used within a hands-on session when needling will help settle tissue tone.",
  },
  {
    title: "Electroacupuncture option",
    detail: "Gentle microcurrent through needles when clinically useful for pain modulation.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Suitability check",
    detail:
      "We discuss medical history, needle comfort, and whether acupuncture fits your goals today.",
  },
  {
    step: "02",
    title: "Precise needling",
    detail:
      "Fine needles are placed with clinical intent. Electroacupuncture may be added when appropriate.",
  },
  {
    step: "03",
    title: "Integrated plan",
    detail:
      "Needling sits alongside osteopathic advice and loading — not as a random add-on.",
  },
] as const;

export default function AcupuncturePage() {
  const service = getService("acupuncture-electro");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Medical Acupuncture in Woolwich",
    url: `${site.websiteUrl}/acupuncture`,
    description:
      "Western medical acupuncture and electroacupuncture for muscle pain in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Medical acupuncture",
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
            Clinical needling · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Medical acupuncture
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Western medical acupuncture and electroacupuncture for irritable
            muscle pain — standalone or as an osteopathy add-on.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Standalone session or add-on +£20 · Suitability discussed first
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            <ButtonLink href="/shockwave" variant="secondary">
              Shockwave options
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What we offer
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
              Common uses
            </h2>
            <ul className="mt-6 space-y-4">
              {uses.map((item) => (
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
              href="/blog/medical-acupuncture-osteopath-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Medical acupuncture guide
            </Link>
            {" · "}
            <Link
              href="/blog/electroacupuncture-pain-relief-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Electroacupuncture
            </Link>
            {" · "}
            <Link
              href="/blog/acupuncture-add-on-vs-standalone"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Add-on vs standalone
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              New patients
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
