import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insurance, Receipts & Self-Pay | Osteopath Woolwich",
  description:
    "How payment works at Nguyen's Osteopathic Clinic in Woolwich: self-pay fees, receipts for insurance claims, and what to bring if your policy may reimburse private osteopathy.",
  alternates: { canonical: "/insurance" },
  keywords: [
    "osteopath insurance Woolwich",
    "private health insurance osteopathy SE18",
    "osteopath receipt London",
    "self pay osteopath Woolwich",
    "Bupa osteopath Woolwich",
  ],
  openGraph: {
    title: "Insurance & Self-Pay | Nguyen's Osteopathic Clinic",
    description:
      "Self-pay fees and receipt guidance for private osteopathy in Woolwich.",
    url: "/insurance",
  },
};

const points = [
  {
    title: "Self-pay is straightforward",
    body: "Most patients pay at the appointment. Current fees are listed on our fees page, including NHS/student discount terms when ID is shown.",
  },
  {
    title: "Receipts for claims",
    body: "If your private medical insurance or health cash plan may reimburse osteopathy, ask for an itemised receipt. Policies differ — check your insurer’s rules before you claim.",
  },
  {
    title: "We are not an insurer panel clinic by default",
    body: "We do not process insurer billing as a hospital out-patient department. You usually pay us directly, then claim back if your policy allows.",
  },
  {
    title: "What helps a claim",
    body: "Bring policy details if you have them, keep referral letters when your insurer requires one, and share any claim form fields we need to complete on the receipt.",
  },
] as const;

export default function InsurancePage() {
  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Fees &amp; paperwork · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Insurance &amp; self-pay
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Clear payment at the clinic, with receipts available when you need
            them for private insurance or cash-plan reimbursement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/fees">View fees</ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Ask a question
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            How payment usually works
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {points.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Before you book</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Confirm with your insurer whether osteopathy is covered, whether a
            GP referral is required, and any session limits. Then book as usual —
            no GP referral is required by the clinic itself.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Related:{" "}
            <Link
              href="/fees"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Fees
            </Link>
            {" · "}
            <Link
              href="/nhs-discount"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              NHS &amp; student discount
            </Link>
            {" · "}
            <Link
              href="/terms"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Terms &amp; cancellation
            </Link>
            {" · "}
            <Link
              href="/faq"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              FAQ
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink href="/new-patients" variant="secondary">
              New patient guide
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
