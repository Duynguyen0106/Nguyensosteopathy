import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Desk & Office Pain Osteopath in Woolwich | Neck, Back & RSI",
  description:
    "Osteopathy for desk and hybrid workers in Woolwich SE18 — neck and shoulder tension, upper-back ache, text neck, and RSI-type wrist or forearm pain. Inside St James Pharmacy.",
  alternates: { canonical: "/desk-pain" },
  keywords: [
    "desk pain osteopath Woolwich",
    "office neck pain SE18",
    "hybrid worker osteopath London",
    "RSI wrist osteopath Woolwich",
    "text neck osteopath",
    "upper back pain desk workers",
  ],
  openGraph: {
    title: "Desk & Office Pain | Nguyen's Osteopathic Clinic",
    description:
      "Hands-on care for laptop necks, desk backs, and forearm load in Woolwich.",
    url: "/desk-pain",
  },
};

const patterns = [
  {
    title: "Neck & shoulder tension",
    body: "Low screens, soft sofas, and long video calls load the upper neck and trapezius — often felt as stiffness, headache, or “heavy” shoulders by evening.",
  },
  {
    title: "Upper & mid-back ache",
    body: "Rounded thoracic posture and limited rotation leave the mid-back tight between the shoulder blades, especially after hybrid days at home.",
  },
  {
    title: "Wrist, thumb & forearm RSI",
    body: "Mouse, keyboard, phone, and creative tablet work can irritate tendons and soft tissue in the forearm — sometimes with night-time tingling.",
  },
  {
    title: "Lower-back desk strain",
    body: "Sitting soft and still for hours reduces hip mobility and asks the lumbar spine to hang on — walking breaks and seating height matter as much as massage.",
  },
] as const;

const approach = [
  {
    step: "01",
    title: "Map your workday",
    detail:
      "We ask about screen height, commute, break pattern, and which tasks flare symptoms — nail desks, laptops, and warehouse-adjacent roles included.",
  },
  {
    step: "02",
    title: "Treat the drivers",
    detail:
      "Hands-on osteopathy eases protective muscle tone and joint stiffness through the neck, thoracic spine, shoulders, and arms as needed.",
  },
  {
    step: "03",
    title: "Change the load",
    detail:
      "Simple desk and phone habits, micro-breaks, and a short home sequence help stop the same pattern resetting by Monday.",
  },
] as const;

const reads = [
  {
    href: "/blog/desk-neck-and-shoulder-pain",
    label: "Desk neck & shoulder pain",
  },
  {
    href: "/blog/upper-back-pain-desk-workers-woolwich",
    label: "Upper back pain for desk workers",
  },
  {
    href: "/blog/text-neck-smartphone-osteopath-woolwich",
    label: "Text neck & smartphones",
  },
  {
    href: "/blog/rsi-wrist-forearm-office-osteopath",
    label: "RSI wrist & forearm pain",
  },
  {
    href: "/blog/nail-technician-neck-wrist-pain-osteopath",
    label: "Nail technician strain",
  },
  {
    href: "/blog/massage-for-desk-workers-woolwich",
    label: "Massage for desk workers",
  },
] as const;

export default function DeskPainPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Desk & Office Pain Osteopath in Woolwich",
    url: `${site.websiteUrl}/desk-pain`,
    description:
      "Osteopathy for desk and hybrid worker neck, back, and RSI-type pain in Woolwich SE18.",
    about: {
      "@type": "MedicalCondition",
      name: "Work-related musculoskeletal pain",
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
            Desk &amp; hybrid work · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Desk &amp; office pain
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Laptop necks, mid-back ache, and forearm load from long screen days —
            assessed and treated so you can work without bracing through every
            meeting.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Initial £75 (60 mins) · Follow-up £60 · No GP referral needed
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book assessment</ButtonLink>
            <ButtonLink href="/back-neck" variant="secondary">
              Back &amp; neck hub
            </ButtonLink>
            <ButtonLink href="/massage" variant="secondary">
              Deep tissue massage
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Patterns we see in SE London offices
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {patterns.map((item) => (
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
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            How we help desk-related pain
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {approach.map((item) => (
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
          <p className="mt-8 text-sm text-slate-600">
            Prefer Vietnamese?{" "}
            <Link href="/vi" className="font-semibold text-teal hover:text-teal-dark">
              Tiếng Việt page
            </Link>
            . NHS staff and students:{" "}
            <Link
              href="/nhs-discount"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              10% discount details
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Related reading
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {reads.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-600">
            Condition guides:{" "}
            <Link
              href="/conditions/neck-pain"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Neck pain
            </Link>
            {" · "}
            <Link
              href="/conditions/thoracic-joint-dysfunction"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Thoracic ache
            </Link>
            {" · "}
            <Link
              href="/conditions/carpal-tunnel"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Carpal tunnel
            </Link>
            {" · "}
            <Link
              href="/conditions"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Full index
            </Link>
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">
            Book between meetings
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Clinic inside {site.address.venue}, short walk from Woolwich Arsenal.
            {site.booking.shortNote}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us &amp; parking
            </ButtonLink>
            <ButtonLink href="/osteopathy" variant="secondary">
              What is osteopathy?
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
