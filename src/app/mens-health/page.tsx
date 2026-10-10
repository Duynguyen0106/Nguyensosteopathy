import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Men's Health & ED Shockwave in Woolwich | Private LI-ESWT",
  description:
    "Confidential men's health and vascular-related ED care in Woolwich SE18 using low-intensity focused shockwave (LI-ESWT). Private one-to-one appointments — £110 protocol fee after screening.",
  alternates: { canonical: "/mens-health" },
  keywords: [
    "men's health osteopath Woolwich",
    "ED shockwave Woolwich",
    "LI-ESWT erectile dysfunction SE18",
    "private ED treatment Woolwich",
    "drug free ED options London",
  ],
  openGraph: {
    title: "Men's Health & ED | Nguyen's Osteopathic Clinic",
    description:
      "Discreet LI-ESWT men's health pathway in Woolwich SE18.",
    url: "/mens-health",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const points = [
  {
    title: "Private appointments",
    body: "One-to-one care in a closed consultation room inside the pharmacy — paced so you can ask questions without rush.",
  },
  {
    title: "Drug-free pathway",
    body: "Low-intensity focused shockwave (LI-ESWT) is non-invasive. Suitability is confirmed after clinical screening; it is not suitable for everyone.",
  },
  {
    title: "Clear pricing",
    body: "Specialist ED treatment & pelvic protocol is £110 for 30 minutes. We confirm fees before you start a course of care.",
  },
] as const;

const expect = [
  {
    step: "01",
    title: "Confidential consultation",
    detail:
      "We discuss goals, medical background, and whether a vascular LI-ESWT protocol is appropriate — or whether GP/urology review should come first.",
  },
  {
    step: "02",
    title: "Protocol-based sessions",
    detail:
      "Treatment follows a structured plan rather than a one-off gadget session. Progress and next steps are reviewed openly.",
  },
  {
    step: "03",
    title: "Respectful follow-up",
    detail:
      "You leave with a clear understanding of what was done, what to expect afterwards, and when further sessions may help.",
  },
] as const;

const faqs = [
  {
    q: "Is this the same as tendon shockwave?",
    a: "Related technology, different clinical pathway. Tendon / plantar LI-ESWT is listed under focused shockwave (£90). Men's health uses a specialist protocol and fee.",
  },
  {
    q: "Will anyone at the pharmacy know why I am here?",
    a: "You can simply say you have an osteopathy appointment. Clinical details stay in the private consultation.",
  },
  {
    q: "Do I need a GP referral?",
    a: "No referral is required to book. If your history suggests medical review first, we will say so clearly.",
  },
  {
    q: "Is it guaranteed to work?",
    a: "No honest clinic can guarantee outcomes. We explain expected response ranges and only continue when the plan remains clinically useful.",
  },
] as const;

export default function MensHealthPage() {
  const service = getService("mens-health-ed");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Men's Health & ED Shockwave in Woolwich",
    url: `${site.websiteUrl}/mens-health`,
    description:
      "Confidential men's health and vascular-related ED care using LI-ESWT in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Low-intensity focused shockwave therapy for men's health",
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
            Private care · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Men&apos;s health &amp; ED
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Discreet, drug-free LI-ESWT for selected vascular-related erectile
            difficulties — private appointments with clear screening and fees.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Specialist protocol £110 (30 mins) · Suitability confirmed first
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book privately</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            A respectful clinic setting
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {points.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          {service ? (
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl text-navy">Ideal for</h3>
                <ul className="mt-4 space-y-3">
                  {service.idealFor.map((item) => (
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
                <h3 className="font-display text-2xl text-navy">
                  What this pathway is
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            What to expect
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {expect.map((item) => (
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
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy">Common questions</h2>
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
            Related:{" "}
            <Link
              href="/blog/mens-health-shockwave-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Men&apos;s health article
            </Link>
            {" · "}
            <Link
              href="/blog/li-eswt-erectile-dysfunction-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              LI-ESWT for ED
            </Link>
            {" · "}
            <Link
              href="/shockwave"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Tendon shockwave guide
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book privately</ButtonLink>
            <ButtonLink href="/shockwave" variant="secondary">
              Tendon shockwave
            </ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              New patients
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
