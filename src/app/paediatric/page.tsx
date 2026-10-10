import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Paediatric Osteopath in Woolwich | Infants & Children",
  description:
    "Gentle paediatric osteopathy in Woolwich SE18 for infants and children — calm, parent-led appointments with clear explanations at Nguyen's Osteopathic Clinic inside St James Pharmacy.",
  alternates: { canonical: "/paediatric" },
  keywords: [
    "paediatric osteopath Woolwich",
    "baby osteopath SE18",
    "children osteopath Woolwich",
    "infant osteopathy London",
    "osteopath for kids Woolwich",
  ],
  openGraph: {
    title: "Paediatric Osteopathy | Nguyen's Osteopathic Clinic",
    description:
      "Soft, age-appropriate osteopathic care for infants and children in Woolwich.",
    url: "/paediatric",
  },
};

const helps = [
  {
    title: "Calm, unhurried visits",
    detail:
      "We take time with parents, explain every step, and work at your child’s pace — never rushed.",
  },
  {
    title: "Very gentle techniques",
    detail:
      "Paediatric care uses soft, measured contact adapted to age and comfort, not adult-force treatment.",
  },
  {
    title: "Parent-led goals",
    detail:
      "Whether the concern is comfort, movement, posture, or unsettledness after a busy birth story — we start with what you have noticed.",
  },
  {
    title: "Clear home guidance",
    detail:
      "Simple ideas you can use between visits, without overwhelming routines.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Listen to the story",
    detail:
      "Pregnancy, birth, milestones, sleep, feeding posture, school bags, sport — whatever is relevant to your child’s age.",
  },
  {
    step: "02",
    title: "Gentle assessment",
    detail:
      "Observation and soft hands-on checks with you present. We stop or adapt if your child needs a break.",
  },
  {
    step: "03",
    title: "Treatment & next steps",
    detail:
      "Age-appropriate care when suitable, plus honest advice on whether further visits, GP, or midwife review makes sense.",
  },
] as const;

export default function PaediatricPage() {
  const service = getService("paediatric-care");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Paediatric Osteopath in Woolwich",
    url: `${site.websiteUrl}/paediatric`,
    description:
      "Gentle paediatric osteopathy for infants and children in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Paediatric osteopathy",
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
            Family care · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Paediatric osteopathy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Soft, gentle musculoskeletal care for infants and children — private
            appointments with clear explanations for parents.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Initial £75 (60 mins) · Follow-up £60 · Parent stays throughout
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book for your child</ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              What to expect
            </ButtonLink>
            <ButtonLink href="/pregnancy" variant="secondary">
              Pregnancy care
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Care built around families
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
            <h3 className="font-display text-2xl text-navy">When to seek medical care first</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Fever, unexplained lethargy, breathing difficulty, trauma with
              possible fracture, or sudden neurological change needs urgent medical
              review. Osteopathy supports comfort and movement — it does not replace
              paediatric or emergency care.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Book with confidence</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Prefer Vietnamese? Austin can consult with parents in Vietnamese or
            English. Parking and arrival tips are on the find-us page.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Related:{" "}
            <Link
              href="/blog/paediatric-osteopathy-woolwich-parents-guide"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Parents&apos; guide
            </Link>
            {" · "}
            <Link
              href="/blog/infant-osteopathy-what-parents-ask-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Infant FAQs
            </Link>
            {" · "}
            <Link
              href="/blog/growing-pains-osteopath-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Growing pains
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
