import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Desk pain osteopath Woolwich",
  description:
    "Osteopathy for desk and hybrid workers in Woolwich SE18 — neck and shoulder tension, upper-back ache, text neck, and RSI-type wrist or forearm pain. Inside…",
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
    images: [defaultOgImage],
  },
};

const patterns = [
  {
    title: "Neck & shoulder tension",
    body: "Low screens, soft sofas, and long video calls load the upper neck and trapezius — often felt as stiffness, headache, or heavy shoulders by evening.",
  },
  {
    title: "Upper & mid-back ache",
    body: "Rounded thoracic posture and limited rotation leave the mid-back tight between the shoulder blades, especially after hybrid days at home.",
  },
  {
    title: "Wrist, thumb & forearm RSI",
    body: "Mouse, keyboard, phone, and tablet work can irritate tendons and soft tissue in the forearm — sometimes with night-time tingling.",
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
      "Screen height, commute, break pattern, and which tasks flare symptoms — nail desks, laptops, and warehouse-adjacent roles included.",
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
    specialty: "https://schema.org/Musculoskeletal",
  };
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Desk & office pain", path: "/desk-pain" },
  ]);
  const bookUrl = bookHref("services");

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="relative min-h-[min(88vh,820px)] overflow-hidden text-white">
        <Image
          src="/images/clinic-desk.webp"
          alt="Desk and consultation space at Nguyen's Osteopathic Clinic"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-[center_30%]"
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
            Desk &amp; office pain
          </h1>
          <p className="about-rise about-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Laptop necks, mid-back ache, and forearm load — assessed so you can
            work without bracing through every meeting.
          </p>
          <div className="about-rise about-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book assessment
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="onDarkOutline">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Patterns we see
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            How desk days load the body
          </h2>
          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {patterns.map((item) => (
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
            Your visit
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            How we help desk-related pain
          </h2>
          <ol className="mt-12 max-w-3xl space-y-10">
            {approach.map((item) => (
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
          <p className="mt-10 text-sm text-slate-600">
            Prefer Vietnamese?{" "}
            <Link href="/vi" className="font-semibold text-teal hover:text-teal-dark">
              Tiếng Việt
            </Link>
            {" · "}
            <Link
              href="/nhs-discount"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              NHS &amp; student 10%
            </Link>
            {" · "}
            <Link
              href="/services/back-neck-pain"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Back &amp; neck care
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Related reading
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-5xl">
            Guides for desk workers
          </h2>
          <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {reads.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-4 font-semibold text-teal hover:text-teal-dark"
                >
                  {item.label}
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
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden text-white">
        <Image
          src="/images/clinic-room.webp"
          alt="Treatment room at Nguyen's Osteopathic Clinic"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-deep/88" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            {site.name}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl">
            Book between meetings
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Inside {site.address.venue}, short walk from Woolwich Arsenal.{" "}
            {site.booking.shortNote}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book online
            </ButtonLink>
            <ButtonLink href="/find-us" variant="onDarkOutline">
              Find us
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
