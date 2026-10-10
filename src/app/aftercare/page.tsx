import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aftercare | What to Do After Osteopathy Treatment",
  description:
    "Aftercare advice following osteopathy at Nguyen's Osteopathic Clinic in Woolwich: soreness, rest, movement, hydration, when to contact us, and how follow-up visits work.",
  alternates: { canonical: "/aftercare" },
  keywords: [
    "osteopathy aftercare Woolwich",
    "after osteopath treatment advice",
    "osteopath recovery tips SE18",
    "post treatment osteopathy London",
  ],
  openGraph: {
    title: "Aftercare | Nguyen's Osteopathic Clinic",
    description:
      "Practical aftercare guidance after your osteopathy appointment in Woolwich SE18.",
    url: "/aftercare",
  },
};

const firstDay = [
  {
    title: "Expect temporary change",
    body: "Mild soreness, fatigue, or a temporary flare of familiar symptoms can happen as tissues settle. It usually eases within 24–48 hours. Unusual severe pain, numbness, chest pain, or neurological red flags should prompt urgent medical advice — not a wait-and-see approach.",
  },
  {
    title: "Keep moving gently",
    body: "Light walking and the simple movements we showed you in clinic usually help more than lying still all day. Avoid suddenly testing a “personal best” in the gym or garden on the same evening.",
  },
  {
    title: "Hydrate and rest well",
    body: "Drink water as you normally would through the day, and aim for a normal night’s sleep. Heat or a cool pack can be used for comfort if that suits you — we will say which is more useful for your case.",
  },
  {
    title: "Follow the plan you left with",
    body: "If you were given posture tips, loading advice, or a short exercise sequence, start them as agreed. Small consistent steps beat one intense session.",
  },
] as const;

const followUp = [
  {
    step: "01",
    title: "Review how you felt",
    detail:
      "At your next visit we ask what improved, what flared, and how work or sport loaded the area — so treatment can adapt.",
  },
  {
    step: "02",
    title: "Progress loading carefully",
    detail:
      "Return to training, desk hours, or heavier tasks is paced around tissue irritability, not a fixed calendar alone.",
  },
  {
    step: "03",
    title: "Stop when goals are met",
    detail:
      "We only recommend further sessions when they are clinically useful. Many people need a short course, not open-ended care.",
  },
] as const;

const whenToCall = [
  "Symptoms are clearly worse after 48 hours rather than settling",
  "New numbness, weakness, dizziness, chest pain, or bladder/bowel change",
  "You are unsure whether a flare is normal for your plan",
  "You need to reschedule — please give 24 hours’ notice where possible",
] as const;

export default function AftercarePage() {
  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            After your visit · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Aftercare guide
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Simple steps for the hours and days after osteopathy — so recovery
            stays on track between appointments at {site.name}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book a follow-up</ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              New patient guide
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact the clinic
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            First 24–48 hours
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            What usually helps
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {firstDay.map((item) => (
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
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Between sessions
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            How follow-up care works
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {followUp.map((item) => (
              <li key={item.step}>
                <p className="text-xs font-semibold tracking-[0.18em] text-teal">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-navy">
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

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy">When to get in touch</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {whenToCall.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              Call{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                {site.phone}
              </a>
              , WhatsApp, or email{" "}
              <a
                href={site.emailHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                {site.email}
              </a>
              . For emergencies, use NHS 111 or 999 as appropriate.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-navy">Specialist pathways</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Focused shockwave, men&apos;s health protocols, pregnancy care, and
              paediatric visits may have pathway-specific advice given in clinic.
              If anything on this page conflicts with what you were told for your
              case, follow the personal plan.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Related reading:{" "}
              <Link
                href="/shockwave"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Shockwave
              </Link>
              {" · "}
              <Link
                href="/mens-health"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Men&apos;s health
              </Link>
              {" · "}
              <Link
                href="/pregnancy"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Pregnancy
              </Link>
              {" · "}
              <Link
                href="/resources"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Patient resources
              </Link>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book">Book online</ButtonLink>
              <ButtonLink href={site.whatsappUrl} variant="secondary">
                WhatsApp
              </ButtonLink>
              <ButtonLink href="/faq" variant="secondary">
                FAQ
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
