import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import {
  getAcupunctureCorpusAttribution,
  getAcupunctureCorpusEntries,
  getAcupunctureCorpusTypeLabel,
  isAcupunctureCorpusType,
  acupunctureCorpusTypes,
} from "@/lib/acupuncture-corpus";
import { defaultOgImage, fitSerpTitle, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ type: string }> };

export function generateStaticParams() {
  return acupunctureCorpusTypes.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  if (!isAcupunctureCorpusType(type)) return {};
  const label = getAcupunctureCorpusTypeLabel(type);
  const title = fitSerpTitle(`${label} — acupuncture reference`);
  const description = trimDescription(
    `${label} from the American Dragon reference corpus, published for clinic education at Nguyen's Osteopathic Clinic.`,
  );
  const path = `/education/acupuncture/reference/${type}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${label} | ${site.name}`,
      description,
      url: path,
      images: [defaultOgImage],
    },
  };
}

export default async function AcupunctureCorpusTypePage({ params }: Props) {
  const { type } = await params;
  if (!isAcupunctureCorpusType(type)) notFound();

  const label = getAcupunctureCorpusTypeLabel(type);
  const entries = getAcupunctureCorpusEntries(type);
  const attribution = getAcupunctureCorpusAttribution();

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
            <Link
              href="/education/acupuncture/reference"
              className="hover:text-teal-dark"
            >
              Reference
            </Link>
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {label}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {entries.length.toLocaleString()} entries from {attribution.sourceName}{" "}
            ({attribution.author}). Practitioner study reference with source
            attribution on every page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/education/acupuncture/reference">
              All categories
            </ButtonLink>
            <ButtonLink href="/education/acupuncture" variant="secondary">
              Patient guides
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <aside
          className="rounded-2xl border border-navy/25 bg-navy/[0.04] px-5 py-4 text-sm text-slate-700 md:px-6"
          role="note"
        >
          <p className="font-semibold text-navy">Source attribution</p>
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
            by {attribution.author}, with permission for clinic education use.
            Not a UK diagnosis or prescribing tool.
          </p>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        {entries.length === 0 ? (
          <p className="text-base text-slate-600">
            Corpus is still ingesting. Refresh after publish completes.
          </p>
        ) : (
          <ul className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
            {entries.map((entry) => (
              <li key={entry.slug} className="mb-2 break-inside-avoid">
                <Link
                  href={`/education/acupuncture/reference/${type}/${entry.slug}`}
                  className="text-sm font-medium text-teal hover:text-teal-dark"
                >
                  {entry.title || entry.label || entry.slug}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
