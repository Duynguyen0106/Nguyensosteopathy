import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { SupplementCard } from "@/components/supplements/SupplementCard";
import { SupplementSafetyBanner } from "@/components/supplements/SupplementSafetyBanner";
import { defaultOgImage } from "@/lib/seo";
import {
  supplementCategories,
  supplements,
} from "@/lib/supplements";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Supplements & Recovery Guides",
  description:
    "Patient education on supplements and recovery habits from Nguyen's Osteopathic Clinic in Woolwich: magnesium, vitamin D, omega-3, collagen, and when pills will not fix back pain.",
  alternates: { canonical: "/supplements" },
  keywords: [
    "osteopath supplements Woolwich",
    "vitamin D musculoskeletal",
    "magnesium muscle tension",
    "collagen tendons",
    "supplements back pain SE18",
  ],
  openGraph: {
    title: `Supplements & Recovery | ${site.name}`,
    description:
      "Original patient guides on supplements and recovery — educational only, not product sales.",
    url: "/supplements",
    images: [defaultOgImage],
  },
};

export default function SupplementsIndexPage() {
  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Patient education · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Supplements & recovery guides
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Plain-English notes on vitamins, minerals, and recovery habits that
            patients often ask about alongside osteopathy — written for{" "}
            {site.name}, not copied from retail training manuals.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/exercises" variant="secondary">
              Exercise library
            </ButtonLink>
            <ButtonLink href="/resources" variant="secondary">
              Patient resources
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <SupplementSafetyBanner />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="flex flex-wrap gap-2">
          {supplementCategories.map((category) => {
            const count = supplements.filter((t) => t.category === category).length;
            if (!count) return null;
            return (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-navy transition hover:border-teal hover:text-teal"
              >
                {category}
              </a>
            );
          })}
        </div>

        <div className="mt-12 space-y-14">
          {supplementCategories.map((category) => {
            const items = supplements.filter((t) => t.category === category);
            if (!items.length) return null;
            const id = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <div key={category} id={id}>
                <h2 className="font-display text-3xl text-navy md:text-4xl">
                  {category}
                </h2>
                <p className="mt-2 max-w-2xl text-base text-slate-600">
                  {items.length} guide{items.length === 1 ? "" : "s"}
                </p>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((topic) => (
                    <li key={topic.slug}>
                      <SupplementCard topic={topic} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-14 text-sm text-slate-500">
          Looking for condition-specific care instead?{" "}
          <Link href="/conditions" className="font-semibold text-teal hover:text-teal-dark">
            Browse conditions
          </Link>{" "}
          or{" "}
          <Link href="/aftercare" className="font-semibold text-teal hover:text-teal-dark">
            aftercare
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
