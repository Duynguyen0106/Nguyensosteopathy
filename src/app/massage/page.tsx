import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Deep Tissue Massage in Woolwich | Osteopath Clinic",
  description:
    "Deep tissue massage in Woolwich SE18 for chronic muscle tension, desk shoulders, and training load — progressive pressure guided by your feedback at Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/massage" },
  keywords: [
    "deep tissue massage Woolwich",
    "massage osteopath SE18",
    "desk tension massage Woolwich",
    "sports massage Woolwich",
    "muscle knot massage London",
  ],
  openGraph: {
    title: "Deep Tissue Massage | Nguyen's Osteopathic Clinic",
    description:
      "Focused deep tissue massage for muscular tightness in Woolwich SE18.",
    url: "/massage",
  },
};

const helps = [
  {
    title: "Desk & screen tension",
    detail: "Heavy shoulders, upper-back ache, and neck tightness after long days.",
  },
  {
    title: "Training load",
    detail: "Post-gym or running muscle heaviness that needs deeper soft-tissue work.",
  },
  {
    title: "Stubborn knots",
    detail: "Local areas that stay knotted despite foam rolling or light massage.",
  },
  {
    title: "Stress-held muscle tone",
    detail: "When the body holds protective tightness and needs progressive release.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Priority regions",
    detail:
      "We agree which areas matter most today — back, neck, hips, calves — rather than a generic full-body rush.",
  },
  {
    step: "02",
    title: "Progressive pressure",
    detail:
      "Depth builds with your feedback so treatment stays effective without being overwhelming.",
  },
  {
    step: "03",
    title: "Aftercare",
    detail:
      "Simple movement and hydration tips so tissues keep moving well after you leave.",
  },
] as const;

export default function MassagePage() {
  const service = getService("deep-tissue-massage");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Deep Tissue Massage in Woolwich",
    url: `${site.websiteUrl}/massage`,
    description:
      "Deep tissue massage for chronic muscle tension in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Deep tissue massage",
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
            Soft-tissue care · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Deep tissue massage
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Focused work into chronic muscle tension, training load, and
            desk-related tightness — pressure guided by your feedback.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            45 mins £60 · Cupping add-on available when useful
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book massage</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            <ButtonLink href="/sports" variant="secondary">
              Sports rehab
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Who it helps
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
              Common reasons people book
            </h2>
            <ul className="mt-6 space-y-4">
              {helps.map((item) => (
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
              href="/blog/deep-tissue-massage-woolwich-osteopath"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Deep tissue overview
            </Link>
            {" · "}
            <Link
              href="/blog/deep-tissue-vs-osteopathy-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Massage vs osteopathy
            </Link>
            {" · "}
            <Link
              href="/blog/massage-for-desk-workers-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Desk-worker massage
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/cupping" variant="secondary">
              Cupping add-on
            </ButtonLink>
            <ButtonLink href="/acupuncture" variant="secondary">
              Acupuncture
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
