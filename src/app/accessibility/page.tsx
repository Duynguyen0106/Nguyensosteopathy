import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility information for Nguyen's Osteopathic Clinic website and Woolwich clinic visits — how we aim to make digital and in-person access clearer.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility Statement",
    description:
      "Website and clinic accessibility information for Woolwich SE18 patients.",
    url: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <div className="bg-slate-50 px-5 py-14 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Access
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Accessibility statement
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: 10 October 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="font-display text-2xl text-navy">Our commitment</h2>
            <p className="mt-3">
              {site.name} aims to make this website and clinic visits as usable
              as possible. We continue to improve digital clarity, booking paths,
              and practical arrival information for patients in Woolwich SE18.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Website</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Semantic headings and descriptive page titles</li>
              <li>Text alternatives for key brand imagery where practical</li>
              <li>Keyboard-reachable primary navigation and booking CTAs</li>
              <li>
                Colour contrast aimed at readable body text on light backgrounds
              </li>
              <li>
                Responsive layouts tested on common phone and desktop widths
              </li>
            </ul>
            <p className="mt-3">
              Some third-party embeds (for example maps or booking widgets) are
              outside our full control. If an embed blocks you, contact us and we
              will help another way.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Visiting the clinic
            </h2>
            <p className="mt-3">
              We are inside {site.address.venue}, {site.address.line1},{" "}
              {site.address.line2}. Ask at the pharmacy counter on arrival. For
              parking, transport, and arrival steps see{" "}
              <Link
                href="/find-us"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Find us &amp; parking
              </Link>
              .
            </p>
            <p className="mt-3">
              If you need extra time, a quieter arrival, help with forms, or
              language support (Vietnamese or English), tell us when booking or
              call{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                {site.phone}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Feedback &amp; contact
            </h2>
            <p className="mt-3">
              If you find an accessibility barrier on this site or need
              information in another format, email{" "}
              <a
                href={site.emailHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                {site.email}
              </a>{" "}
              or use our{" "}
              <Link
                href="/contact"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                contact page
              </Link>
              . Please include the page URL and what you were trying to do.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Contact us</ButtonLink>
          <ButtonLink href="/privacy" variant="secondary">
            Privacy policy
          </ButtonLink>
          <ButtonLink href="/find-us" variant="secondary">
            Find us
          </ButtonLink>
        </div>
      </article>
    </div>
  );
}
