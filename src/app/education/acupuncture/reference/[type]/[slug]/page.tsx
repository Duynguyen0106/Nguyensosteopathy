import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import {
  getAcupunctureCorpusAttribution,
  getAcupunctureCorpusRecord,
  getAcupunctureCorpusTypeLabel,
  getAllAcupunctureCorpusParams,
  isAcupunctureCorpusType,
} from "@/lib/acupuncture-corpus";
import {
  breadcrumbJsonLd,
  defaultOgImage,
  fitSerpTitle,
  trimDescription,
} from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ type: string; slug: string }> };

export function generateStaticParams() {
  return getAllAcupunctureCorpusParams().map(({ type, slug }) => ({
    type,
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug } = await params;
  if (!isAcupunctureCorpusType(type)) return {};
  const record = getAcupunctureCorpusRecord(type, slug);
  if (!record) return {};
  const typeLabel = getAcupunctureCorpusTypeLabel(type);
  const title = fitSerpTitle(`${record.title} | ${typeLabel}`);
  const description = trimDescription(
    Object.values(record.sections)[0] ||
      `${record.title} — American Dragon reference at Nguyen's Osteopathic Clinic.`,
  );
  const path = `/education/acupuncture/reference/${type}/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${record.title} | ${site.name}`,
      description,
      url: path,
      images: [defaultOgImage],
    },
  };
}

export default async function AcupunctureCorpusRecordPage({ params }: Props) {
  const { type, slug } = await params;
  if (!isAcupunctureCorpusType(type)) notFound();
  const record = getAcupunctureCorpusRecord(type, slug);
  if (!record) notFound();

  const typeLabel = getAcupunctureCorpusTypeLabel(type);
  const attribution =
    record.attribution || getAcupunctureCorpusAttribution();
  const path = `/education/acupuncture/reference/${type}/${slug}`;
  const sectionEntries = Object.entries(record.sections || {}).filter(
    ([key, body]) =>
      key !== "INTRO" && typeof body === "string" && body.trim().length > 0,
  );

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Acupuncture", path: "/education/acupuncture" },
    { name: "Reference", path: "/education/acupuncture/reference" },
    { name: typeLabel, path: `/education/acupuncture/reference/${type}` },
    { name: record.title, path },
  ]);

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link
              href="/education/acupuncture/reference"
              className="hover:text-teal-dark"
            >
              Reference
            </Link>
            {" · "}
            <Link
              href={`/education/acupuncture/reference/${type}`}
              className="hover:text-teal-dark"
            >
              {typeLabel}
            </Link>
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl text-navy md:text-5xl">
            {record.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            Source:{" "}
            <a
              href={record.sourceUrl}
              className="font-semibold text-teal hover:text-teal-dark"
              rel="noopener noreferrer"
              target="_blank"
            >
              {attribution.sourceName}
            </a>{" "}
            — {attribution.author}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/education/acupuncture/reference/${type}`}>
              All {typeLabel.toLowerCase()}
            </ButtonLink>
            <ButtonLink
              href="/education/acupuncture/reference"
              variant="secondary"
            >
              Corpus hub
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
        <aside
          className="rounded-2xl border border-navy/25 bg-navy/[0.04] px-5 py-4 text-sm text-slate-700"
          role="note"
        >
          <p className="font-semibold text-navy">Education use only</p>
          <p className="mt-2">
            Published on this clinic site with permission from the American
            Dragon owner/estate for education. Not personal medical advice, not
            a UK prescribing protocol, and not a substitute for osteopathic or
            medical assessment.
          </p>
        </aside>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="space-y-10">
          {sectionEntries.map(([heading, body]) => (
            <article key={heading}>
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                {heading.replace(/_/g, " ")}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-700 md:text-lg">
                {body.split(/\n+/).map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Original page:{" "}
          <a
            href={record.sourceUrl}
            className="font-semibold text-teal hover:text-teal-dark"
            rel="noopener noreferrer"
            target="_blank"
          >
            {record.sourceUrl}
          </a>
        </p>
      </section>
    </div>
  );
}
