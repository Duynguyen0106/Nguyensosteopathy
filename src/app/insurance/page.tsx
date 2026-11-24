import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insurance & self-pay",
  description:
    "Professional malpractice cover and self-pay receipts at Nguyen's Osteopathic Clinic, Charlton: £5m iO indemnity, itemised receipts for private insurance claims.",
  alternates: { canonical: "/insurance" },
  keywords: [
    "osteopath insurance Charlton",
    "osteopath professional indemnity Charlton",
    "private health insurance osteopathy Charlton",
    "osteopath receipt London",
    "self pay osteopath Charlton",
    "Bupa osteopath Charlton",
  ],
  openGraph: {
    title: "Insurance & Self-Pay | Nguyen's Osteopathic Clinic",
    description:
      "iO medical malpractice & public liability cover, plus self-pay fees and itemised receipts for private insurance or cash-plan claims in Charlton SE7.",
    url: "/insurance",
    images: [defaultOgImage],
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
            Fees &amp; paperwork · Charlton SE7
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Insurance &amp; self-pay
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Professional indemnity for your care, clear self-pay fees, and
            itemised receipts when you need to claim with a private insurer or
            cash plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={site.practitioner.insurance.certificateHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              View malpractice certificate
            </ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              View fees
            </ButtonLink>
            <ButtonLink href={bookHref("insurance")} variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Clinic cover · GOsC practice
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            Professional malpractice insurance
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            Austin practises under Institute of Osteopathy member cover for
            Medical Malpractice and Public &amp; Products Liability, arranged via
            James Hallam Ltd and underwritten by Intact Insurance. Patients can
            download the current certificate of insurance below.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <dt className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                Limit of indemnity
              </dt>
              <dd className="mt-2 font-display text-2xl text-navy">
                {site.practitioner.insurance.limitAnyOneEvent}
              </dd>
              <p className="mt-2 text-sm text-slate-600">Any one event</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <dt className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                Period of cover
              </dt>
              <dd className="mt-2 text-lg font-semibold text-navy">
                {site.practitioner.insurance.periodFrom}
                <span className="font-normal text-slate-500"> – </span>
                {site.practitioner.insurance.periodTo}
              </dd>
              <p className="mt-2 text-sm text-slate-600">
                Renewal {site.practitioner.insurance.renewalDate}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <dt className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                Master policy
              </dt>
              <dd className="mt-2 text-lg font-semibold text-navy">
                {site.practitioner.insurance.masterPolicyNo}
              </dd>
              <p className="mt-2 text-sm text-slate-600">
                {site.practitioner.insurance.insurers}
              </p>
            </div>
          </dl>
          <div className="mt-8 max-w-3xl">
            <h3 className="text-lg font-semibold text-navy">
              Treatments included on the certificate
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Cover applies to osteopathy and the adjunct therapies listed on
              the certificate when practised within qualification and GOsC
              rules — including{" "}
              {site.practitioner.insurance.treatmentsCovered
                .slice(0, 8)
                .join(", ")}
              , and others shown on the PDF.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink
                href={site.practitioner.insurance.certificateHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download 2026–2027 certificate (PDF)
              </ButtonLink>
              <ButtonLink
                href={site.practitioner.insurance.bridgeCertificateHref}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bridge cover{" "}
                {site.practitioner.insurance.bridgePeriodLabel} (PDF)
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                Qualifications
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-20">
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

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Common insurance questions
          </h2>
          <dl className="mt-8 space-y-6">
            <div>
              <dt className="text-lg font-semibold text-navy">
                Do you bill Bupa, AXA, Aviva, or Vitality directly?
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-slate-600">
                Not as a default panel clinic. Most patients pay at the visit,
                then claim reimbursement with their insurer using our itemised
                receipt. Always confirm cover, excess, and any referral rules
                with your provider first.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-navy">
                What appears on the receipt?
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-slate-600">
                Practitioner name, GOsC registration, clinic address, date of
                treatment, service type, and fee paid. Tell us before you leave
                if your claim form needs a specific wording or diagnosis code
                field.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-navy">
                Is osteopathy covered without a GP letter?
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-slate-600">
                The clinic does not require a GP referral. Some insurers still
                do — that is a policy rule, not ours. Check before you claim so
                you are not left with an unexpected shortfall.
              </dd>
            </div>
          </dl>
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
            <ButtonLink href={bookHref("insurance")}>Book online</ButtonLink>
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
