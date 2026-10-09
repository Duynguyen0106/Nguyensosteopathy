import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name} — how we collect, use, and protect your personal data under UK GDPR.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 px-5 py-14 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: 9 October 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="font-display text-2xl text-navy">Who we are</h2>
            <p className="mt-3">
              {site.name} (“we”, “us”) is operated by {site.practitioner.name},{" "}
              {site.practitioner.title} (GOsC Reg. No. {site.practitioner.regNo}
              ). Clinic address: {site.address.venue}, {site.address.line1},{" "}
              {site.address.line2}. Contact:{" "}
              <a href={site.emailHref} className="font-medium text-teal hover:text-teal-dark">
                {site.email}
              </a>{" "}
              or{" "}
              <a href={site.phoneHref} className="font-medium text-teal hover:text-teal-dark">
                {site.phone}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              What data we collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Contact and booking details you submit (name, email, phone,
                appointment preferences, and any notes you share).
              </li>
              <li>
                Clinical information gathered during assessment and treatment,
                kept as part of your confidential patient record.
              </li>
              <li>
                Technical data such as IP address, device/browser type, and pages
                visited when you use our website (via hosting and analytics
                tools).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              How we use your data
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To book, confirm, remind, and manage appointments.</li>
              <li>To provide safe osteopathic care and keep clinical records.</li>
              <li>To respond to enquiries by phone, email, or website forms.</li>
              <li>
                To improve our website and understand how visitors use it
                (analytics).
              </li>
              <li>To meet legal and professional obligations (including GOsC).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Legal bases</h2>
            <p className="mt-3">
              We process personal data under UK GDPR on the bases of contract
              (booking and treatment), legitimate interests (running and improving
              the clinic website), consent (non-essential cookies/analytics where
              required), and legal obligation (clinical record-keeping and
              regulation).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Cookies and analytics
            </h2>
            <p className="mt-3">
              Our site uses essential cookies needed for security and basic
              operation. With your consent, we may also use analytics cookies
              (for example Google Analytics) to understand site performance. You
              can accept or decline analytics cookies via the cookie banner, and
              change your mind by clearing site data in your browser.
            </p>
            <p className="mt-3">
              Website hosting is provided by Vercel. Online booking is powered by
              Treow Clinic; booking data you enter there is processed so we can
              schedule your visit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Sharing your data
            </h2>
            <p className="mt-3">
              We do not sell your personal data. We share information only with
              service providers who help us operate (hosting, booking, email, or
              analytics), or when required by law. Clinical information is
              treated as confidential and shared only with your consent or where
              legally required for your safety or care.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Retention</h2>
            <p className="mt-3">
              Clinical records are retained in line with professional guidance
              for osteopaths. Booking and enquiry data are kept for as long as
              needed to manage your care and our legal obligations, then securely
              deleted or anonymised.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Your rights</h2>
            <p className="mt-3">
              Under UK GDPR you may request access, correction, deletion,
              restriction, or portability of your personal data, and you may
              object to certain processing. To exercise these rights, email{" "}
              <a href={site.emailHref} className="font-medium text-teal hover:text-teal-dark">
                {site.email}
              </a>
              . You can also complain to the Information Commissioner’s Office
              (ICO) at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal hover:text-teal-dark"
              >
                ico.org.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Contact</h2>
            <p className="mt-3">
              Questions about this policy:{" "}
              <a href={site.emailHref} className="font-medium text-teal hover:text-teal-dark">
                {site.email}
              </a>
              . Return to the{" "}
              <Link href="/" className="font-medium text-teal hover:text-teal-dark">
                homepage
              </Link>{" "}
              or{" "}
              <Link href="/book" className="font-medium text-teal hover:text-teal-dark">
                book an appointment
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
