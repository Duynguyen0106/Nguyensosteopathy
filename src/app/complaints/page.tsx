import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Complaints Procedure",
  description: `How to raise a concern or complaint about care at ${site.name} in Woolwich. Contact the clinic first; GOsC registration details for ${site.practitioner.name}.`,
  alternates: { canonical: "/complaints" },
  openGraph: {
    title: "Complaints Procedure | Nguyen's Osteopathic Clinic",
    description:
      "How to raise a concern about osteopathic care in Woolwich SE18.",
    url: "/complaints",
  },
};

export default function ComplaintsPage() {
  return (
    <div className="bg-slate-50 px-5 py-14 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Professional standards
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Complaints procedure
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: 10 October 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="font-display text-2xl text-navy">Our aim</h2>
            <p className="mt-3">
              We want concerns about care, communication, or clinic processes to
              be heard promptly and fairly. Most issues can be resolved directly
              with {site.practitioner.name}, {site.practitioner.title} (GOsC
              Reg. No. {site.practitioner.regNo}).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Step 1 — Contact the clinic
            </h2>
            <p className="mt-3">
              Please raise your concern as soon as practical by phone, email, or
              in writing:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Phone:{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href={site.emailHref}
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  {site.email}
                </a>
              </li>
              <li>
                Post / in person: {site.address.venue}, {site.address.line1},{" "}
                {site.address.line2}
              </li>
            </ul>
            <p className="mt-3">
              Include your name, appointment date if relevant, and a clear
              description of what happened and what outcome you are seeking.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Step 2 — Acknowledgement &amp; review
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                We aim to acknowledge written complaints within five working
                days.
              </li>
              <li>
                We will review the concern, look at relevant clinic notes where
                appropriate, and reply with our findings and any proposed next
                steps.
              </li>
              <li>
                Complex matters may take longer; we will keep you informed if a
                fuller reply needs more time.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Step 3 — External options
            </h2>
            <p className="mt-3">
              If you remain dissatisfied, or prefer an external route, you may
              contact the{" "}
              <a
                href="https://www.osteopathy.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                General Osteopathic Council (GOsC)
              </a>
              , which regulates osteopaths in the UK. You can also check
              registration details for {site.practitioner.name} (Reg. No.{" "}
              {site.practitioner.regNo}) on the GOsC register.
            </p>
            <p className="mt-3">
              For website privacy concerns, see our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                privacy policy
              </Link>
              . Booking and cancellation terms are on our{" "}
              <Link
                href="/terms"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                terms page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Feedback that is not a complaint
            </h2>
            <p className="mt-3">
              Suggestions about the website, directions, or clinic experience
              are welcome via{" "}
              <Link
                href="/contact"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                contact
              </Link>{" "}
              or our{" "}
              <Link
                href="/reviews"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                reviews
              </Link>{" "}
              page. Positive feedback helps neighbours find care; constructive
              notes help us improve.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Contact the clinic</ButtonLink>
          <ButtonLink href={site.emailHref} variant="secondary">
            Email {site.email}
          </ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            About Austin
          </ButtonLink>
        </div>
      </article>
    </div>
  );
}
