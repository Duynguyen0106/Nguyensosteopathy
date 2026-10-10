import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "New Patients | What to Expect at Your First Osteopathy Visit",
  description:
    "Preparing for your first visit to Nguyen's Osteopathic Clinic in Woolwich: what to wear, what to bring, arrival at St James Pharmacy, appointment length, and cancellation policy.",
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
      "How to prepare for your first osteopathy visit in Woolwich SE18.",
    url: "/new-patients",
  },
};

const prep = [
  {
    title: "Book a time that works",
    body: "Reserve online or call us. Initial consultations are 60 minutes. Follow-ups are usually 30 minutes once a plan is underway.",
  },
  {
    title: "Wear comfortable clothes",
    body: "Loose clothing that lets you move your spine, hips, and shoulders is ideal. You may be asked to demonstrate simple movements — shorts or stretchy trousers help.",
  },
  {
    title: "Bring useful details",
    body: "Medication list, recent scan or clinic letters if you have them, and any questions you want answered. NHS/student ID if claiming the 10% discount.",
  },
  {
    title: "Arrive via the pharmacy",
    body: `Find ${site.address.venue} at ${site.address.line1}. Ask at the counter — they will direct you to the osteopathy room. Parking and transport tips are on the find-us page.`,
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
  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="opening-hero-copy text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="opening-hero-copy opening-hero-delay-1 mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            New patient guide
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Everything you need before your first visit — so you arrive calm,
            prepared, and ready to start recovery.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book your first visit</ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us &amp; parking
            </ButtonLink>
            <ButtonLink href="/faq" variant="secondary">
              Read FAQs
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Before you arrive
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            How to prepare
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {prep.map((item) => (
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
            Your first session
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            What happens in clinic
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {visitFlow.map((item) => (
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
            <h2 className="font-display text-3xl text-navy">Fees &amp; policies</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Initial consultation &amp; treatment is £75 (60 mins). Follow-up
              osteopathic treatment is £60 (30 mins). Full list on the{" "}
              <Link href="/fees" className="font-semibold text-teal hover:text-teal-dark">
                fees page
              </Link>
              .
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {site.discount}
            </p>
            <p className="mt-4 text-sm text-slate-500">{site.cancellation}</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-navy">Language &amp; community</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Prefer Vietnamese? Austin can consult in Vietnamese or English.
              Read more on our{" "}
              <Link href="/vi" className="font-semibold text-teal hover:text-teal-dark">
                Tiếng Việt page
              </Link>{" "}
              and{" "}
              <Link href="/about" className="font-semibold text-teal hover:text-teal-dark">
                Austin&apos;s story
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book">Book online</ButtonLink>
              <ButtonLink href="/resources" variant="secondary">
                Patient resources
              </ButtonLink>
              <ButtonLink href={site.whatsappUrl} variant="secondary">
                WhatsApp
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
