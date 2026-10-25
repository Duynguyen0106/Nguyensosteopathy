import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import {
  acupunctureCorpusIsDiscovered,
  americanDragonAudit,
  getAcupunctureCorpusApproxTotals,
  getAcupunctureCorpusAttribution,
  getAcupunctureCorpusCategories,
  getAcupunctureCorpusCounts,
  getAcupunctureCorpusPipeline,
} from "@/lib/acupuncture-corpus";
import { defaultOgImage, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

const description = trimDescription(
  "American Dragon acupuncture, herb, formula, and condition reference corpus on the Nguyen's Osteopathic Clinic education site — published with owner permission for study use.",
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
  const approx = getAcupunctureCorpusApproxTotals();
  const attribution = getAcupunctureCorpusAttribution();
  const pipeline = getAcupunctureCorpusPipeline();
  const discovered = acupunctureCorpusIsDiscovered();
  const totals = americanDragonAudit.totalsApprox;

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
            Reference corpus
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Acupuncture reference corpus
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Structured pipeline to gather{" "}
            <a
              href={attribution.sourceUrl}
              className="font-semibold text-teal hover:text-teal-dark"
              rel="noopener noreferrer"
              target="_blank"
            >
              {attribution.sourceName}
            </a>{" "}
            (Dr Joel Penner) into a private clinic corpus for study notes —
            about {(totals.pages ?? 0).toLocaleString()} reference pages across
            points, herbs, formulas, and conditions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/education/acupuncture">
              Patient acupuncture guides
            </ButtonLink>
            <ButtonLink
              href="/services/acupuncture-electro"
              variant="secondary"
            >
              Acupuncture service
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
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
            Practitioner study corpus — not patient advice
          </p>
          <p className="mt-2">
            This framework gathers classical Chinese medicine reference material
            for clinic learning and future clinic-voice notes. It is not a UK
            medical diagnosis tool, prescribing guide, or a republication of
            American Dragon HTML on patient pages.
          </p>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <div className="rounded-2xl border border-teal/30 bg-white px-5 py-6 md:px-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
            Permission &amp; publishing
          </p>
          <h2 className="mt-2 font-display text-2xl text-navy">
            Owner permission required before full ingest
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            {attribution.licenseNote} Status:{" "}
            <span className="font-semibold text-navy">
              {discovered
                ? "Index discovered — ready for permission-gated fetch/parse"
                : "Audit complete — run discover to populate the catalog"}
            </span>
            .
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>
              Discover indexes:{" "}
              <code className="text-navy">{pipeline.discover}</code>
            </li>
            <li>
              Fetch page bodies:{" "}
              <code className="text-navy">{pipeline.fetch}</code>
            </li>
            <li>
              Parse to normalized JSON:{" "}
              <code className="text-navy">{pipeline.parse}</code>
            </li>
            <li>
              Rebuild public catalog:{" "}
              <code className="text-navy">{pipeline.buildIndex}</code>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <h2 className="font-display text-3xl text-navy">Corpus categories</h2>
        <p className="mt-2 max-w-2xl text-base text-slate-600">
          Approximate live site inventory from audit
          {discovered ? "; discovered counts shown when available" : ""}.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => {
            const discoveredCount = counts[category.id] ?? 0;
            const approxCount = approx[category.id] ?? 0;
            return (
              <li key={category.id}>
                <Link
                  href={`/education/acupuncture/reference/${category.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal hover:shadow-sm"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                    {discoveredCount > 0
                      ? `${discoveredCount.toLocaleString()} entries`
                      : `~${approxCount.toLocaleString()} on source site`}
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

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6">
          <h2 className="font-display text-2xl text-navy">Source attribution</h2>
          <p className="mt-3 text-base text-slate-600">
            Primary reference:{" "}
            <a
              href={attribution.sourceUrl}
              className="font-semibold text-teal hover:text-teal-dark"
              rel="noopener noreferrer"
              target="_blank"
            >
              {attribution.sourceName}
            </a>{" "}
            by {attribution.author}. Patient-facing acupuncture guides on this
            site remain clinic originals under{" "}
            <Link
              href="/education/acupuncture"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              /education/acupuncture
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
