import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility information for Nguyen's Osteopathic Clinic website and Charlton clinic visits — known limits, alternatives, and how to get help.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility Statement",
    description:
      "Website and clinic accessibility information for Charlton SE7 patients.",
    url: "/accessibility",
    images: [defaultOgImage],
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
          Last updated: 19 November 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="font-display text-2xl text-navy">Our commitment</h2>
            <p className="mt-3">
              {site.name} aims to make this website and clinic visits usable for
              as many people as possible. We work toward WCAG 2.2 AA on pages we
              fully control, and we provide phone and WhatsApp alternatives when
              third-party tools get in the way.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Website</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Semantic headings and descriptive page titles</li>
              <li>Skip link to main content and visible keyboard focus styles</li>
              <li>Text alternatives for key brand imagery where practical</li>
              <li>Keyboard-reachable primary navigation and booking CTAs</li>
              <li>
                Colour contrast aimed at readable body text on light backgrounds
              </li>
              <li>
                Responsive layouts tested on common phone and desktop widths
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">
              Known limits (not fully WCAG AA)
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-semibold text-navy">
                  Treow booking iframe
                </strong>{" "}
                on{" "}
                <Link
                  href="/book"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  /book
                </Link>{" "}
                — third-party calendar embed; keyboard, screen-reader, and zoom
                behaviour can differ from the rest of the site.
              </li>
              <li>
                <strong className="font-semibold text-navy">
                  Google Maps embeds
                </strong>{" "}
                on Find us and related pages — map controls and iframe content
                are outside our full control.
              </li>
              <li>
                <strong className="font-semibold text-navy">
                  Cookie banner + mobile Book bar
                </strong>{" "}
                — on small screens both can stack near the bottom of the
                viewport until consent is set; we hide the Book bar while the
                cookie dialog is open.
              </li>
            </ul>
            <p className="mt-3">
              If an embed blocks you, call{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                {site.phone}
              </a>
              , message{" "}
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                WhatsApp
              </a>
              , or open the{" "}
              <a
                href={site.bookingExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                full booking page
              </a>{" "}
              instead of the embed.
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
          <ButtonLink href={site.phoneHref} variant="secondary">
            Call {site.phone}
          </ButtonLink>
          <ButtonLink href="/find-us" variant="secondary">
            Find us
          </ButtonLink>
        </div>
      </article>
    </div>
  );
}
