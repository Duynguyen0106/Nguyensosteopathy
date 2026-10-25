import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import {
  acupunctureCorpusIsPublished,
  getAcupunctureCorpusAttribution,
  getAcupunctureCorpusCategories,
  getAcupunctureCorpusCounts,
} from "@/lib/acupuncture-corpus";
import { defaultOgImage, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

const description = trimDescription(
  "Browse acupuncture points, herbs, formulas, and conditions from the American Dragon reference corpus — published with permission for clinic education at Nguyen's Osteopathic Clinic.",
);

export const metadata: Metadata = {
  title: "Acupuncture reference corpus",
  description,
  alternates: { canonical: "/education/acupuncture/reference" },
  openGraph: {
    title: `Acupuncture reference corpus | ${site.name}`,
    description,
    url: "/education/acupuncture/reference",
    images: [defaultOgImage],
  },
};

export default function AcupunctureReferenceCorpusPage() {
  const categories = getAcupunctureCorpusCategories();
  const counts = getAcupunctureCorpusCounts();
  const attribution = getAcupunctureCorpusAttribution();
  const published = acupunctureCorpusIsPublished();
  const total = Object.values(counts).reduce(
    (sum, n) => sum + (Number(n) || 0),
    0,
  );

  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link href="/education" className="hover:text-teal-dark">
              Education
            </Link>
            {" · "}
            <Link
              href="/education/acupuncture"
              className="hover:text-teal-dark"
            >
              Acupuncture
            </Link>
            {" · "}
            Reference
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Acupuncture reference
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {published
              ? `${total.toLocaleString()} practitioner study entries from ${attribution.sourceName} (${attribution.author}) — points, herbs, formulas, and conditions.`
              : `Practitioner study reference from ${attribution.sourceName}.`}{" "}
            Education only — not a UK diagnosis or prescribing tool.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/education/acupuncture/reference/points">
              Browse points
            </ButtonLink>
            <ButtonLink
              href="/education/acupuncture/reference/herbs"
              variant="secondary"
            >
              Browse herbs
            </ButtonLink>
            <ButtonLink href="/education/acupuncture" variant="secondary">
              Patient guides
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <aside
          className="rounded-2xl border border-navy/25 bg-navy/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-700 md:px-6 md:py-5 md:text-base"
          role="note"
        >
          <p className="font-semibold text-navy">
            Practitioner study — not patient advice
          </p>
          <p className="mt-2">
            Material adapted from{" "}
            <a
              href={attribution.sourceUrl}
              className="font-semibold text-teal hover:text-teal-dark"
              rel="noopener noreferrer"
              target="_blank"
            >
              {attribution.sourceName}
            </a>{" "}
            by {attribution.author}, published here with owner/estate permission
            for clinic education. Not personal medical advice and not a
            substitute for osteopathic or medical assessment.
          </p>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <h2 className="font-display text-3xl text-navy">Browse by category</h2>
        <p className="mt-2 max-w-2xl text-base text-slate-600">
          Searchable indexes with source attribution on every entry.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => {
            const count = counts[category.id] ?? 0;
            return (
              <li key={category.id}>
                <Link
                  href={`/education/acupuncture/reference/${category.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal hover:shadow-sm"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                    {count.toLocaleString()} entries
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-navy group-hover:text-teal-dark">
                    {category.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {category.description}
                  </p>
                  <span className="mt-3 text-sm font-semibold text-teal">
                    Browse {category.label.toLowerCase()} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
