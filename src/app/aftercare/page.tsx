import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aftercare",
  description:
    "Aftercare advice following osteopathy at Nguyen's Osteopathic Clinic in Woolwich: soreness, rest, movement, hydration, when to contact us, and how follow-up…",
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
    images: [defaultOgImage],
  },
};

const firstDay = [
  {
    title: "Expect temporary change",
    body: "Mild soreness, fatigue, or a temporary flare of familiar symptoms can happen as tissues settle. It usually eases within 24–48 hours. Unusual severe pain, numbness, chest pain, or neurological red flags need urgent medical advice.",
  },
  {
    title: "Keep moving gently",
    body: "Light walking and the simple movements we showed you usually help more than lying still all day. Avoid testing a personal best in the gym or garden the same evening.",
  },
  {
    title: "Hydrate and rest well",
    body: "Drink water as you normally would, and aim for a normal night's sleep. Heat or a cool pack can help if that suits your case.",
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
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Aftercare", path: "/aftercare" },
  ]);
  const bookUrl = bookHref("aftercare");

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="relative min-h-[min(88vh,820px)] overflow-hidden text-white">
        <Image
          src="/images/clinic-room.webp"
          alt="Treatment room at Nguyen's Osteopathic Clinic"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-deep/94 via-navy/80 to-navy/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/88 via-transparent to-navy/25"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <p className="about-rise text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            {site.name}
          </p>
          <h1 className="about-rise about-rise-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
            Aftercare guide
          </h1>
          <p className="about-rise about-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Simple steps for the hours and days after osteopathy — so recovery
            stays on track between visits.
          </p>
          <div className="about-rise about-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book a follow-up
            </ButtonLink>
            <ButtonLink
              href="/exercises/programmes/post-visit-gentle-move"
              variant="onDarkOutline"
            >
              Post-visit gentle moves
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            First 24–48 hours
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            What usually helps
          </h2>
          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {firstDay.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-right md:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Between sessions
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            How follow-up care works
          </h2>
          <ol className="mt-12 max-w-3xl space-y-10">
            {followUp.map((item) => (
              <li key={item.step} className="flex gap-5 md:gap-8">
                <span className="font-display text-2xl text-teal md:text-3xl">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Stay in touch
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            When to get in touch
          </h2>
          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {whenToCall.map((item) => (
              <li key={item} className="py-4 text-base leading-relaxed text-slate-600">
                {item}
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
          <p className="mt-8 text-sm text-slate-600">
            Pathway-specific advice (shockwave, men&apos;s health, pregnancy,
            paediatric) given in clinic overrides this page if they differ.{" "}
            <Link
              href="/exercises"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Exercise library
            </Link>
            {" · "}
            <Link
              href="/resources"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Patient resources
            </Link>
            {" · "}
            <Link
              href="/blog"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Blog
            </Link>
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden text-white">
        <Image
          src="/images/clinic-treatment.webp"
          alt="Treatment room at Nguyen's Osteopathic Clinic"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-navy-deep/88" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            {site.name}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl">
            Need a follow-up?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Book when symptoms settle into a pattern you want reviewed — or call
            if you are unsure what is normal for your plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book follow-up
            </ButtonLink>
            <ButtonLink href={site.whatsappUrl} variant="onDarkOutline">
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
