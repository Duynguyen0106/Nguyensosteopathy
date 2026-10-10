import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Focused Shockwave Therapy in Woolwich | LI-ESWT",
  description:
    "Focused shockwave therapy (LI-ESWT) in Woolwich SE18 for plantar fasciitis, tennis elbow, Achilles and stubborn tendinopathy. £90 per session after clinical screening at Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/shockwave" },
  keywords: [
    "shockwave therapy Woolwich",
    "focused shockwave SE18",
    "LI-ESWT Woolwich",
    "shockwave plantar fasciitis Woolwich",
    "shockwave tennis elbow London",
    "osteopath shockwave therapy",
  ],
  openGraph: {
    title: "Focused Shockwave Therapy | Nguyen's Osteopathic Clinic",
    description:
      "Drug-free focused shockwave for stubborn tendon pain in Woolwich SE18.",
    url: "/shockwave",
  },
};

const indications = [
  {
    title: "Heel pain / plantar fasciitis",
    href: "/conditions/plantar-fasciitis",
    detail: "First-step morning pain that keeps returning after rest alone.",
  },
  {
    title: "Achilles tendinopathy",
    href: "/conditions/achilles-tendinopathy",
    detail: "Stiff, load-reactive Achilles that plateaus with stretching only.",
  },
  {
    title: "Tennis elbow",
    href: "/conditions/tennis-elbow",
    detail: "Outer-elbow pain from grip, tools, mouse work, or racquet sports.",
  },
  {
    title: "Golfer’s elbow",
    href: "/conditions/medial-epicondylalgia",
    detail: "Inner-elbow pain on wrist flexion and forearm loading.",
  },
  {
    title: "Patellar tendinopathy",
    href: "/conditions/patellar-tendinopathy",
    detail: "Front-of-knee tendon pain with jumping, squatting, or stairs.",
  },
  {
    title: "Shoulder / rotator-cuff related pain",
    href: "/conditions/subacromial-pain",
    detail: "Stubborn shoulder tendon irritation after conservative care.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Screening first",
    detail:
      "We confirm the diagnosis fits a shockwave-responsive pattern and rule out reasons to delay or refer.",
  },
  {
    step: "02",
    title: "Focused treatment",
    detail:
      "Acoustic energy is delivered precisely to the irritable tendon or fascia — sessions are short and targeted.",
  },
  {
    step: "03",
    title: "Load plan alongside",
    detail:
      "Shockwave works best with graded loading and osteopathic care for the joints and mechanics that keep symptoms going.",
  },
] as const;

const faqs = [
  {
    q: "Is focused shockwave the same as a massage gun?",
    a: "No. Focused LI-ESWT delivers controlled acoustic energy to a specific tissue depth after clinical screening — it is a medical device pathway, not a wellness gadget.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on the condition and how long symptoms have been present. Many tendon pathways use a short course rather than a single visit; we review progress and only continue when it is clinically useful.",
  },
  {
    q: "Does it hurt?",
    a: "You may feel strong pulsing or local tenderness during treatment. Intensity is adjusted for tolerance, and residual ache for a day or two can occur.",
  },
  {
    q: "Is men’s health / ED shockwave included here?",
    a: "Vascular LI-ESWT for men’s health is a separate confidential pathway with its own protocol and fee. See our Men’s Health & ED service for details.",
  },
] as const;

export default function ShockwavePage() {
  const service = getService("focused-shockwave");
  const mensHealth = getService("mens-health-ed");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Focused Shockwave Therapy in Woolwich",
    url: `${site.websiteUrl}/shockwave`,
    description:
      "Focused shockwave therapy (LI-ESWT) in Woolwich SE18 for plantar fasciitis, tennis elbow, Achilles and stubborn tendinopathy.",
    about: {
      "@type": "MedicalTherapy",
      name: "Focused extracorporeal shockwave therapy (LI-ESWT)",
    },
    specialty: "Osteopathic",
    audience: {
      "@type": "PeopleAudience",
      geographicArea: {
        "@type": "City",
        name: "Woolwich",
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
            Specialist care · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Focused shockwave therapy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Drug-free LI-ESWT for stubborn heel, elbow, Achilles, and tendon
            pain — after clinical screening, inside St James Pharmacy.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            £90 per session · Suitability confirmed before treatment
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book assessment</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              See all fees
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What focused shockwave is
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Focused extracorporeal shockwave therapy (LI-ESWT) delivers precise
              acoustic pulses to irritable tendon or fascia. The aim is to
              stimulate a local healing response in problems that have stalled
              with rest, stretches, or massage alone.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              At Nguyen&apos;s it sits alongside osteopathic assessment — so we
              treat the sore tissue and the loading pattern that keeps
              re-irritating it.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Who it may help
            </h2>
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
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Common conditions
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Explore patient guides for problems we often assess for focused
            shockwave in Woolwich.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indications.map((item) => (
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
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
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
          <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
              Fees
            </p>
            <p className="mt-2 font-display text-2xl text-navy">
              Focused shockwave — £90 per session
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Confirmed before treatment starts. Opening-day and NHS/student
              terms are listed on the fees page. Men&apos;s health LI-ESWT uses a
              separate protocol fee.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/book">Book online</ButtonLink>
              <ButtonLink href="/fees" variant="secondary">
                Full price list
              </ButtonLink>
              {mensHealth ? (
                <ButtonLink href="/mens-health" variant="secondary">
                  Men&apos;s health pathway
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy">Quick answers</h2>
          <dl className="mt-8 space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="text-base font-semibold text-navy">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-slate-600">
            More reading:{" "}
            <Link
              href="/blog/focused-shockwave-therapy-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              What is focused shockwave?
            </Link>
            {" · "}
            <Link
              href="/blog/shockwave-therapy-cost-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Cost guide
            </Link>
            {" · "}
            <Link
              href="/services/focused-shockwave"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Service overview
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
