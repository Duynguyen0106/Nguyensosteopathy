import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "New Patients",
  description:
    "Preparing for your first visit to Nguyen's Osteopathic Clinic in Woolwich: what to wear, what to bring, arrival at St James Pharmacy, appointment length…",
  alternates: { canonical: "/new-patients" },
  keywords: [
    "first osteopathy appointment Woolwich",
    "what to wear osteopath",
    "new patient osteopath SE18",
    "St James Pharmacy osteopath arrival",
  ],
  openGraph: {
    title: "New patient guide | Nguyen's Osteopathic Clinic",
    description:
      "First-visit guide for Nguyen's Osteopathic Clinic: what to wear, what to bring, arrival at St James Pharmacy, and how long appointments last in Woolwich SE18.",
    url: "/new-patients",
    images: [defaultOgImage],
  },
};

const prep = [
  {
    title: "Book a time that works",
    body: "Reserve online or call us. Initial consultations are 60 minutes. Follow-ups are usually 30 minutes once a plan is underway.",
  },
  {
    title: "Wear comfortable clothes",
    body: "Loose clothing that lets you move your spine, hips, and shoulders is ideal. Shorts or stretchy trousers help for simple movement checks.",
  },
  {
    title: "Bring useful details",
    body: "Medication list, recent scan or clinic letters if you have them, and any questions. NHS/student ID if claiming the 10% discount.",
  },
  {
    title: "Arrive via the pharmacy",
    body: `Find ${site.address.venue} at ${site.address.line1}. Ask at the counter — they will direct you to the osteopathy room.`,
  },
] as const;

const visitFlow = [
  {
    step: "01",
    title: "History & goals",
    detail:
      "We listen to when pain started, what aggravates it, your work posture, and what you want to get back to doing.",
  },
  {
    step: "02",
    title: "Movement assessment",
    detail:
      "Posture, joint mobility, and soft-tissue tone are checked so treatment targets the driver — not only the sore spot.",
  },
  {
    step: "03",
    title: "Hands-on care & plan",
    detail:
      "Treatment begins where appropriate, with clear aftercare and an honest view on whether further sessions would help.",
  },
] as const;

export default function NewPatientsPage() {
  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "New patients", path: "/new-patients" },
  ]);
  const bookUrl = bookHref("services");

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="relative min-h-[min(88vh,820px)] overflow-hidden text-white">
        <Image
          src="/images/clinic-desk.webp"
          alt="Reception desk at Nguyen's Osteopathic Clinic"
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
            New patient guide
          </h1>
          <p className="about-rise about-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            What to wear, what to bring, and how your first visit works — so you
            arrive prepared.
          </p>
          <div className="about-rise about-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book your first visit
            </ButtonLink>
            <ButtonLink href="/find-us" variant="onDarkOutline">
              Find us &amp; parking
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Before you arrive
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            How to prepare
          </h2>
          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {prep.map((item) => (
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
            Your first session
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            What happens in clinic
          </h2>
          <ol className="mt-12 max-w-3xl space-y-10">
            {visitFlow.map((item) => (
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
            Consent &amp; fees
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy md:text-5xl">
            Informed care, explained plainly
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Before hands-on treatment we explain the likely working diagnosis,
            what we propose to do, and sensible alternatives — including when
            rest, GP review, or imaging is the better next step. You can ask
            questions, decline any technique, or pause at any time.
          </p>
          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            <li className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="text-lg font-semibold text-navy">Fees</h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-right md:text-base">
                Initial consultation &amp; treatment £75 (60 mins). Follow-up
                £60 (30 mins). Full list on the{" "}
                <Link
                  href="/fees"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  fees page
                </Link>
                .
              </p>
            </li>
            <li className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="text-lg font-semibold text-navy">Discount</h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-right md:text-base">
                {site.discount}{" "}
                <Link
                  href="/nhs-discount"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  How it works
                </Link>
              </p>
            </li>
            <li className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="text-lg font-semibold text-navy">Language</h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-right md:text-base">
                Prefer Vietnamese? Consult in Vietnamese or English —{" "}
                <Link
                  href="/vi"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  Tiếng Việt
                </Link>
                {" · "}
                <Link
                  href="/about"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  Austin&apos;s story
                </Link>
              </p>
            </li>
            <li className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="text-lg font-semibold text-navy">Cancellation</h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-right md:text-base">
                {site.cancellation}
              </p>
            </li>
          </ul>
          <p className="mt-8 text-sm text-slate-600">
            Also useful:{" "}
            <Link
              href="/aftercare"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Aftercare
            </Link>
            {" · "}
            <Link
              href="/faq"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              FAQ
            </Link>
            {" · "}
            <Link
              href="/resources"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Patient resources
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
            Ready for your first visit?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Inside {site.address.venue}, short walk from Woolwich Arsenal.{" "}
            {site.booking.shortNote}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book online
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="onDarkOutline">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
