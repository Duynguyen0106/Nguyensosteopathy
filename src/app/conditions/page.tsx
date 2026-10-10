import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import {
  conditionRegions,
  getConditionsByRegion,
  getFeaturedConditions,
} from "@/lib/conditions";

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
      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Clinical focus
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Conditions we help with
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          A full musculoskeletal conditions index for Woolwich — grouped by
          body region — then book online when you are ready for assessment and
          treatment.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <h2 className="font-display text-2xl text-navy">Popular guides</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((condition) => (
            <li key={condition.slug}>
              <Link
                href={`/conditions/${condition.slug}`}
                className="service-tile flex h-full flex-col rounded-xl border border-teal/30 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                  {condition.region}
                </span>
                <span className="mt-2 text-lg font-semibold text-navy">
                  {condition.shortTitle}
                </span>
                <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {condition.summary}
                </span>
                <span className="mt-4 text-sm font-semibold text-teal">
                  Read guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-5 pb-20 md:px-8">
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
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((condition) => (
                  <li key={condition.slug}>
                    <Link
                      href={`/conditions/${condition.slug}`}
                      className="flex h-full flex-col rounded-lg border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-teal/40 hover:bg-teal/5"
                    >
                      <span className="font-semibold text-navy">
                        {condition.shortTitle}
                      </span>
                      <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {condition.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <div className="flex flex-wrap items-center gap-3 pt-4">
          <ButtonLink href="/book">Book an appointment</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            View all services
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
