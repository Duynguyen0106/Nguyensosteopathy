import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import {
  conditionRegions,
  getConditionsByRegion,
  getFeaturedConditions,
} from "@/lib/conditions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions We Treat | Osteopath Woolwich",
  description:
    "Musculoskeletal conditions we help with at Nguyen's Osteopathic Clinic in Woolwich — neck, back, hip, knee, shoulder, elbow, wrist, and foot — with clear next steps to book.",
  alternates: { canonical: "/conditions" },
  openGraph: {
    title: "Conditions We Treat | Nguyen's Osteopathic Clinic",
    description:
      "Explore the MSK conditions catalogue we treat in Woolwich SE18, organised by body region.",
    url: "/conditions",
  },
};

export default function ConditionsIndexPage() {
  const featured = getFeaturedConditions();

  return (
    <div className="bg-slate-50 pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Clinical focus
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Conditions we help with
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Browse by body region or open a popular guide. Assessment with{" "}
          {site.practitioner.name} at {site.name} — no GP referral needed.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <h2 className="font-display text-2xl text-navy">Popular guides</h2>
        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((condition) => (
            <li key={condition.slug}>
              <Link
                href={`/conditions/${condition.slug}`}
                className="group inline-flex flex-col py-1"
              >
                <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                  {condition.region}
                </span>
                <span className="mt-0.5 text-lg font-semibold text-navy group-hover:text-teal">
                  {condition.shortTitle}
                  <span aria-hidden className="ml-1 text-slate-400">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-5 pb-12 md:px-8">
        {conditionRegions.map((region) => {
          const list = getConditionsByRegion(region);
          if (list.length === 0) return null;
          return (
            <section key={region} id={region.toLowerCase().replace(/\s+/g, "-")}>
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                {region}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {list.length} condition{list.length === 1 ? "" : "s"}
              </p>
              <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200 sm:columns-2 sm:gap-x-10 sm:divide-y-0 sm:border-0 lg:columns-3">
                {list.map((condition) => (
                  <li key={condition.slug} className="break-inside-avoid sm:mb-2">
                    <Link
                      href={`/conditions/${condition.slug}`}
                      className="flex flex-col py-3 transition-colors hover:text-teal sm:py-1.5"
                    >
                      <span className="font-semibold text-navy hover:text-teal">
                        {condition.shortTitle}
                      </span>
                      <span className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {condition.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              How we treat
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Looking for osteopathic treatment in Woolwich for pain that will
              not settle? We assess and treat common musculoskeletal
              presentations at {site.address.venue} — clear diagnosis of what is
              driving your symptoms, then a practical plan for work, commuting,
              or sport. People visit from Woolwich, Plumstead, Abbey Wood,
              Thamesmead, Charlton, and Greenwich. You do not need a GP referral.
            </p>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal" aria-hidden>
                  ✓
                </span>
                Thorough history and hands-on assessment — with red-flag
                screening when needed.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal" aria-hidden>
                  ✓
                </span>
                Gentle osteopathic techniques matched to irritability, never
                forced into sharp pain.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal" aria-hidden>
                  ✓
                </span>
                Clear advice on pacing and what to do between visits.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal" aria-hidden>
                  ✓
                </span>
                Honest next steps — including when GP review or urgent care comes
                first.
              </li>
            </ul>
          </div>

          <div className="mt-10 rounded-xl border border-teal/25 bg-teal/5 px-5 py-8 md:px-8">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Ready for assessment?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Book online with {site.practitioner.name} at {site.name} — no GP
              referral needed. Prefer to talk first? Call {site.phone}.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="/book"
                variant="navy"
                className="min-h-12 px-6 py-3 text-base font-bold tracking-wide"
              >
                Book Now
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="secondary">
                Call {site.phone}
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                View all services
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
