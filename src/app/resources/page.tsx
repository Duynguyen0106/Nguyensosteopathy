import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Resources | Guides, Fees & Practical Help",
  description:
    "Patient resources for Nguyen's Osteopathic Clinic in Woolwich: new-patient guide, fees, insurance receipts, find us, FAQ, conditions index, blog, leaflet, and booking help.",
  alternates: { canonical: "/resources" },
  keywords: [
    "osteopath Woolwich patient guide",
    "osteopathy resources SE18",
    "new patient osteopath Woolwich",
    "osteopath fees Woolwich",
    "St James Pharmacy osteopath help",
  ],
  openGraph: {
    title: "Patient Resources | Nguyen's Osteopathic Clinic",
    description:
      "Practical guides for booking, visiting, fees, and reading before your osteopathy appointment in Woolwich.",
    url: "/resources",
  },
};

const groups = [
  {
    title: "Before your visit",
    intro: "Prepare once, then arrive ready to start care.",
    links: [
      {
        href: "/new-patients",
        label: "New patient guide",
        detail: "What to wear, what to bring, and how the first hour works.",
      },
      {
        href: "/find-us",
        label: "Find us & parking",
        detail: "Powis Street directions, transport, and pharmacy arrival.",
      },
      {
        href: "/faq",
        label: "FAQ",
        detail: "Referrals, hours, Vietnamese consultations, and cancellation.",
      },
      {
        href: "/opening",
        label: "Opening offer",
        detail: `${site.openingOffer.dateLabel} — ${site.openingOffer.headline}.`,
      },
    ],
  },
  {
    title: "After your visit",
    intro: "Settle well between appointments and know when to get in touch.",
    links: [
      {
        href: "/aftercare",
        label: "Aftercare guide",
        detail: "Soreness, gentle movement, hydration, and follow-up pacing.",
      },
      {
        href: "/book",
        label: "Book a follow-up",
        detail: site.booking.shortNote,
      },
      {
        href: "/contact",
        label: "Contact the clinic",
        detail: `Call ${site.phone}, WhatsApp, or email if symptoms worry you.`,
      },
      {
        href: "/complaints",
        label: "Complaints procedure",
        detail: "How to raise a concern about care, with GOsC details.",
      },
    ],
  },
  {
    title: "Fees & paperwork",
    intro: "Clear pricing and receipt options for self-pay patients.",
    links: [
      {
        href: "/fees",
        label: "Fees & prices",
        detail: "Initial, follow-up, shockwave, massage, and add-on fees.",
      },
      {
        href: "/insurance",
        label: "Insurance & receipts",
        detail: "Self-pay first; ask for an itemised receipt if you claim back.",
      },
      {
        href: "/nhs-discount",
        label: "NHS & student discount",
        detail: "10% with valid ID shown at the appointment.",
      },
      {
        href: "/terms",
        label: "Terms & cancellation",
        detail: site.cancellation,
      },
    ],
  },
  {
    title: "Learn & explore",
    intro: "Condition guides, local reading, and clinic downloads.",
    links: [
      {
        href: "/osteopathy",
        label: "What is osteopathy?",
        detail: "Plain-English guide to regulated, drug-free MSK care.",
      },
      {
        href: "/conditions",
        label: "Conditions index",
        detail: "Musculoskeletal topics we commonly assess and treat.",
      },
      {
        href: "/blog",
        label: "Blog",
        detail: "Practical articles on pain, recovery, and clinic life in Woolwich.",
      },
      {
        href: "/leaflet",
        label: "Clinic leaflet",
        detail: "Printable overview of services, fees, and how to book.",
      },
    ],
  },
  {
    title: "Treatments & booking",
    intro: "Pick a pathway, then reserve a live slot online.",
    links: [
      {
        href: "/services",
        label: "All services",
        detail: "Osteopathy, shockwave, massage, acupuncture, and more.",
      },
      {
        href: "/desk-pain",
        label: "Desk & office pain",
        detail: "Laptop necks, mid-back ache, and RSI-type forearm load.",
      },
      {
        href: "/about",
        label: "About Austin",
        detail: "GOsC-registered osteopath practising in Woolwich SE18.",
      },
      {
        href: "/vi",
        label: "Tiếng Việt",
        detail: "Vietnamese overview of the clinic and booking path.",
      },
    ],
  },
] as const;

export default function ResourcesPage() {
  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Patient hub · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Patient resources
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Practical links for booking, visiting St James Pharmacy, fees,
            paperwork, and reading before your appointment at {site.name}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              New patient guide
            </ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Clinic hours at a glance
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            The pharmacy building and osteopathy booking days are not identical —
            use the calendar for live slots.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-navy">
                Pharmacy building
              </h3>
              <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
                {site.hours.map((row) => (
                  <li key={row.days}>
                    <span className="text-navy">{row.days}</span> · {row.time}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-navy">
                Bookable osteopathy
              </h3>
              <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
                {site.booking.hours.map((row) => (
                  <li key={row.days}>
                    <span className="text-navy">{row.days}</span> · {row.time}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {site.booking.shortNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {groups.map((group) => (
        <section
          key={group.title}
          className="border-b border-slate-200 px-5 py-16 odd:bg-slate-50 even:bg-white md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              {group.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              {group.intro}
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {group.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group block rounded-xl border border-slate-200 bg-white/80 p-5 transition hover:border-teal hover:shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-navy group-hover:text-teal">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.detail}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Need a hand?</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Call, WhatsApp, or email — or browse the full site map if you are
            looking for a specific treatment page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink href={site.whatsappUrl} variant="secondary">
              WhatsApp
            </ButtonLink>
            <ButtonLink href="/site-map" variant="secondary">
              Site map
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
