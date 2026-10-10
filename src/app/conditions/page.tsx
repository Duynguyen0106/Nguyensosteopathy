import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { conditions } from "@/lib/conditions";

export const metadata: Metadata = {
  title: "Conditions We Treat | Osteopath Woolwich",
  description:
    "Condition guides from Nguyen's Osteopathic Clinic in Woolwich: sciatica, neck pain, frozen shoulder, plantar fasciitis, and tennis elbow — with clear next steps to book.",
  alternates: { canonical: "/conditions" },
  openGraph: {
    title: "Conditions We Treat | Nguyen's Osteopathic Clinic",
    description:
      "Explore common musculoskeletal conditions we help with in Woolwich SE18.",
    url: "/conditions",
  },
};

export default function ConditionsIndexPage() {
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
          Practical guides for common problems we see in Woolwich — then book
          online when you are ready for assessment and treatment.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {conditions.map((condition) => (
            <li key={condition.slug}>
              <Link
                href={`/conditions/${condition.slug}`}
                className="service-tile flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xl font-semibold text-navy">
                  {condition.shortTitle}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-slate-600">
                  {condition.summary}
                </span>
                <span className="mt-5 text-sm font-semibold text-teal">
                  Read guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <ButtonLink href="/book">Book an appointment</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            View all services
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
