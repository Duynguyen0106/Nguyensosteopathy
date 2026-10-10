import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Cancellation Policy",
  description: `Clinic terms, booking conditions, and cancellation policy for ${site.name} in Woolwich SE18.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms & Cancellation Policy",
    description:
      "Booking terms and cancellation policy for Nguyen's Osteopathic Clinic.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 px-5 py-14 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Terms &amp; cancellation
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: 10 October 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="font-display text-2xl text-navy">Who these cover</h2>
            <p className="mt-3">
              These terms apply to appointments and website bookings with{" "}
              {site.name}, operated by {site.practitioner.name},{" "}
              {site.practitioner.title} (GOsC Reg. No. {site.practitioner.regNo}
              ), at {site.address.venue}, {site.address.line1},{" "}
              {site.address.line2}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Booking</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                You can book online, by phone, WhatsApp, or email. A GP referral
                is not required.
              </li>
              <li>
                Appointment type and fee are confirmed before treatment starts.
                Current prices are listed on the{" "}
                <Link
                  href="/fees"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  fees page
                </Link>
                .
              </li>
              <li>
                Specialist pathways (for example focused shockwave or men&apos;s
                health) require clinical screening for suitability.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Cancellation &amp; lateness
            </h2>
            <p className="mt-3 font-medium text-navy">{site.cancellation}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Please cancel or reschedule as soon as you know you cannot
                attend so the slot can be offered to someone else.
              </li>
              <li>
                If you arrive late, treatment time may be shortened so later
                patients are not delayed.
              </li>
              <li>
                Repeated late cancellations or no-shows may mean future bookings
                need to be prepaid or arranged by phone.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Fees &amp; offers</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                NHS staff and student discounts require valid ID at the
                appointment. Details:{" "}
                <Link
                  href="/nhs-discount"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  NHS &amp; student discount
                </Link>
                .
              </li>
              <li>
                Opening-day and promotional offers apply only as described on
                their pages and do not automatically stack with other discounts.
              </li>
              <li>Payment is due at the appointment unless otherwise agreed.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Clinical care</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Osteopathy and adjunct therapies are provided after assessment.
                Outcomes vary; we do not guarantee results.
              </li>
              <li>
                You should share relevant medical history, medications, and
                recent imaging when asked so care can be planned safely.
              </li>
              <li>
                If red-flag symptoms suggest medical review first, we will advise
                you clearly and may pause hands-on treatment.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Website use</h2>
            <p className="mt-3">
              Website content is general information, not a personal diagnosis.
              Booking widgets and maps may be provided by third parties. See our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                privacy policy
              </Link>{" "}
              and{" "}
              <Link
                href="/accessibility"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                accessibility statement
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Concerns &amp; complaints
            </h2>
            <p className="mt-3">
              If you have a concern about your care, please see our{" "}
              <Link
                href="/complaints"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                complaints procedure
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Contact</h2>
            <p className="mt-3">
              Questions about bookings or these terms:{" "}
              <a
                href={site.emailHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                {site.email}
              </a>{" "}
              or{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                {site.phone}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/book">Book online</ButtonLink>
          <ButtonLink href="/fees" variant="secondary">
            Fees
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </article>
    </div>
  );
}
