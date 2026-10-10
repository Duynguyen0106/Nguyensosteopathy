import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${site.name} uses essential and analytics cookies on the Woolwich clinic website, and how to change your choice.`,
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: "Cookie Policy",
    description: "Cookie choices for Nguyen's Osteopathic Clinic website.",
    url: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <div className="bg-slate-50 px-5 py-14 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Cookie policy
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: 10 October 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="font-display text-2xl text-navy">What we use</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-navy">Essential cookies</span>{" "}
                — needed for security, basic site operation, and remembering your
                cookie choice.
              </li>
              <li>
                <span className="font-semibold text-navy">Analytics cookies</span>{" "}
                — only if you choose “Accept analytics”. These help us understand
                which pages are useful (for example via Google Analytics / related
                tools).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">Your choice</h2>
            <p className="mt-3">
              On your first visit, a banner lets you accept analytics or continue
              with essential cookies only. Your choice is stored in your browser
              (local storage key{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
                nguyens-cookie-consent
              </code>
              ).
            </p>
            <p className="mt-3">
              To change your mind later, clear site data for{" "}
              {site.website} in your browser settings, then reload the site to see
              the banner again.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy">More detail</h2>
            <p className="mt-3">
              How we handle personal data more broadly is explained in our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                privacy policy
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/privacy" variant="secondary">
            Privacy policy
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </article>
    </div>
  );
}
