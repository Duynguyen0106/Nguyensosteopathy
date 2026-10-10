import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pregnancy Osteopathy in Woolwich | Pelvic & Back Comfort",
  description:
    "Gentle pregnancy osteopathy in Woolwich SE18 for pelvic girdle pain, lower-back ache, and rib strain — trimester-aware care at Nguyen's Osteopathic Clinic inside St James Pharmacy.",
  alternates: { canonical: "/pregnancy" },
  keywords: [
    "pregnancy osteopath Woolwich",
    "pelvic girdle pain osteopath SE18",
    "pregnancy back pain Woolwich",
    "osteopathy pregnancy London",
    "SPD osteopath Woolwich",
  ],
  openGraph: {
    title: "Pregnancy Osteopathy | Nguyen's Osteopathic Clinic",
    description:
      "Gentle, trimester-aware osteopathy for pregnancy discomfort in Woolwich.",
    url: "/pregnancy",
  },
};

const helps = [
  {
    title: "Pelvic girdle discomfort",
    detail:
      "One-sided pelvic, pubic, or buttock ache that makes walking, turning in bed, or stairs harder.",
  },
  {
    title: "Lower-back strain",
    detail:
      "Aching or stiffness as posture and load change through the trimesters.",
  },
  {
    title: "Rib and mid-back tightness",
    detail:
      "Breathing-related rib discomfort or upper-back ache from growing bump and desk work.",
  },
  {
    title: "Postpartum follow-on",
    detail:
      "After birth, many people continue with gentle care for residual pelvic or back irritability — paced to recovery.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Trimester-aware assessment",
    detail:
      "We ask about your stage of pregnancy, how symptoms started, and what movements are hardest — then examine within comfortable positions.",
  },
  {
    step: "02",
    title: "Gentle hands-on care",
    detail:
      "Techniques are adapted for comfort and stage. The aim is freer, more confident movement — not aggressive forcing.",
  },
  {
    step: "03",
    title: "Practical day-to-day advice",
    detail:
      "Simple ideas for sitting, sleeping, and pacing walks or work so progress holds between visits.",
  },
] as const;

export default function PregnancyPage() {
  const service = getService("pregnancy-support");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Pregnancy Osteopathy in Woolwich",
    url: `${site.websiteUrl}/pregnancy`,
    description:
      "Gentle pregnancy osteopathy for pelvic girdle pain, back ache, and rib strain in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Osteopathy during pregnancy",
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
            Pregnancy osteopathy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Support for pelvic pressure, back ache, and postural change — private
            appointments adapted to your trimester inside St James Pharmacy.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Initial £75 (60 mins) · Follow-up £60 · No GP referral needed
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book pregnancy visit</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              What to expect
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            How we can help
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {helps.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
          {service ? (
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate-600">
              {service.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            What a visit involves
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
          <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 md:p-8">
            <h3 className="font-display text-2xl text-navy">Safety first</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Osteopathy during pregnancy is gentle and individually assessed.
              Sudden severe pain, vaginal bleeding, reduced baby movements, or
              neurological red flags need urgent midwife or medical review first —
              we will help you recognise when that is the right step.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Ready to book?</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Online booking is open for osteopathy appointments. Prefer Vietnamese?
            Austin can consult in Vietnamese or English.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Related reading:{" "}
            <Link
              href="/blog/pregnancy-osteopathy-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Pregnancy osteopathy guide
            </Link>
            {" · "}
            <Link
              href="/blog/pelvic-girdle-pain-pregnancy-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Pelvic girdle pain
            </Link>
            {" · "}
            <Link
              href="/blog/pregnancy-sciatica-osteopath-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Pregnancy sciatica
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/vi" variant="secondary">
              Tiếng Việt
            </ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us &amp; parking
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
