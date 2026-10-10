import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getService, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Back & Neck Pain Osteopath in Woolwich | Sciatica & Desk Strain",
  description:
    "Osteopathy for back and neck pain in Woolwich SE18 — sciatica, desk strain, disc-related stiffness, and morning ache. Assessment-led care at Nguyen's Osteopathic Clinic inside St James Pharmacy.",
  alternates: { canonical: "/back-neck" },
  keywords: [
    "back pain osteopath Woolwich",
    "neck pain osteopath SE18",
    "sciatica osteopath Woolwich",
    "desk neck pain London",
    "disc pain osteopath Woolwich",
  ],
  openGraph: {
    title: "Back & Neck Pain | Nguyen's Osteopathic Clinic",
    description:
      "Osteopathy for sciatica, postural strain, and spinal stiffness in Woolwich.",
    url: "/back-neck",
  },
};

const guides = [
  {
    title: "Sciatica",
    href: "/conditions/sciatica",
    detail: "Leg pain, buttock ache, or nerve-type referral from the lower back.",
  },
  {
    title: "Neck pain",
    href: "/conditions/neck-pain",
    detail: "Stiff, desk-related, or work-strained necks common in SE London.",
  },
  {
    title: "Non-specific low back pain",
    href: "/conditions/non-specific-low-back-pain",
    detail: "Activity-related backache without clear radicular features.",
  },
  {
    title: "Lumbar disc / radiculopathy",
    href: "/conditions/lumbar-disc-radiculopathy",
    detail: "Disc-related back pain with or without leg symptoms.",
  },
  {
    title: "Cervical radiculopathy",
    href: "/conditions/cervical-radiculopathy",
    detail: "Neck-driven arm pain, pins and needles, or weakness patterns.",
  },
  {
    title: "Thoracic / postural ache",
    href: "/conditions/thoracic-joint-dysfunction",
    detail: "Interscapular stiffness from desk and screen postures.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Find the driver",
    detail:
      "History and movement testing across spine, pelvis, and soft tissue — not only the sore spot.",
  },
  {
    step: "02",
    title: "Hands-on treatment",
    detail:
      "Gentle osteopathic techniques to ease protective spasm and restore freer movement.",
  },
  {
    step: "03",
    title: "Protect the progress",
    detail:
      "Clear advice for sitting, lifting, sleep, and return to work or training between visits.",
  },
] as const;

export default function BackNeckPage() {
  const service = getService("back-neck-pain");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Back & Neck Pain Osteopath in Woolwich",
    url: `${site.websiteUrl}/back-neck`,
    description:
      "Osteopathy for back and neck pain, sciatica, and desk strain in Woolwich SE18.",
    about: {
      "@type": "MedicalCondition",
      name: "Back and neck pain",
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
            Spine care · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Back &amp; neck pain
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Relief for sciatica, postural strain, disc-related stiffness, and
            morning ache — starting with why symptoms began.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Initial £75 (60 mins) · Follow-up £60 · No GP referral needed
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book assessment</ButtonLink>
            <ButtonLink href="/conditions" variant="secondary">
              All conditions
            </ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How we approach spinal pain
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {service?.description}
            </p>
            <ul className="mt-6 space-y-3">
              {(service?.idealFor ?? []).map((item) => (
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
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What to expect
            </h2>
            <ol className="mt-6 space-y-6">
              {steps.map((item) => (
                <li key={item.step}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                    {item.step}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Related condition guides
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-teal/40 hover:bg-teal/5"
                >
                  <span className="font-semibold text-navy">{item.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </span>
                  <span className="mt-4 text-sm font-semibold text-teal">
                    Read guide →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-600">
            Related:{" "}
            <Link
              href="/desk-pain"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Desk &amp; office pain
            </Link>
            {" · "}
            <Link
              href="/blog/back-pain-woolwich-osteopathy"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Back pain guide
            </Link>
            {" · "}
            <Link
              href="/blog/desk-neck-and-shoulder-pain"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Desk neck
            </Link>
            {" · "}
            <Link
              href="/blog/sciatica-woolwich-osteopath"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Sciatica article
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/desk-pain" variant="secondary">
              Desk &amp; office pain
            </ButtonLink>
            <ButtonLink href="/headaches" variant="secondary">
              Headaches &amp; joints
            </ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
