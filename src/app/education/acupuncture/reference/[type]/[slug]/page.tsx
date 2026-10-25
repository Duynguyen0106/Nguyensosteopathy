import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import {
  CorpusSectionBody,
  slugifyHeading,
} from "@/components/CorpusSectionBody";
import {
  getAcupunctureCorpusAttribution,
  getAcupunctureCorpusRecord,
  getAcupunctureCorpusTypeLabel,
  getAllAcupunctureCorpusParams,
  isAcupunctureCorpusType,
} from "@/lib/acupuncture-corpus";
import {
  corpusMetaDescription,
  formatCorpusHeading,
  formatCorpusTitle,
} from "@/lib/corpus-format";
import {
  breadcrumbJsonLd,
  defaultOgImage,
  fitSerpTitle,
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
  const display = formatCorpusTitle(record.displayTitle || record.title);
  const title = fitSerpTitle(`${display} | ${typeLabel}`);
  const description = corpusMetaDescription({
    displayTitle: display,
    typeLabel,
    latin: record.latin,
    category: record.category,
    pointCode: record.pointCode,
    sections: record.sections,
  });
  const path = `/education/acupuncture/reference/${type}/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${display} | ${site.name}`,
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
  const display = formatCorpusTitle(record.displayTitle || record.title);

  const sectionEntries = Object.entries(record.sections || {}).filter(
    ([key, body]) => {
      if (key === "INTRO" || key === "NAME") return false;
      // Avoid repeating category already shown in the hero subtitle.
      if (key === "CATEGORY" && record.category) return false;
      return typeof body === "string" && body.trim().length > 0;
    },
  );

  const showToc = type === "conditions" && sectionEntries.length >= 4;
  const metaBits = [
    record.latin,
    record.category,
    record.pointCode && record.channel && record.pointCode !== "EXTRA"
      ? `${record.channel} channel`
      : record.channel === "EXTRA"
        ? "Extra point"
        : record.channel,
  ].filter(Boolean);

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Acupuncture", path: "/education/acupuncture" },
    { name: "Reference", path: "/education/acupuncture/reference" },
    { name: typeLabel, path: `/education/acupuncture/reference/${type}` },
    { name: display, path },
  ]);

  const description = corpusMetaDescription({
    displayTitle: display,
    typeLabel,
    latin: record.latin,
    category: record.category,
    pointCode: record.pointCode,
    sections: record.sections,
  });
  const learningLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: display,
    description,
    url: `${site.websiteUrl}${path}`,
    learningResourceType: typeLabel,
    isAccessibleForFree: true,
    inLanguage: "en",
    about: record.latin || record.category || display,
    isPartOf: {
      "@type": "CollectionPage",
      name: `${typeLabel} — acupuncture reference`,
      url: `${site.websiteUrl}/education/acupuncture/reference/${type}`,
    },
    author: {
      "@type": "Person",
      name: attribution.author,
      url: attribution.sourceUrl,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.websiteUrl,
    },
    citation: record.sourceUrl,
    educationalUse: "professional development",
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningLd) }}
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
            {display}
          </h1>
          {metaBits.length > 0 && (
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              {metaBits.join(" · ")}
            </p>
          )}
          <p className="mt-4 max-w-2xl text-sm text-slate-600">
            Source:{" "}
            <a
              href={record.sourceUrl}
              className="font-semibold text-teal hover:text-teal-dark"
              rel="noopener noreferrer"
              target="_blank"
            >
              {attribution.sourceName}
            </a>{" "}
            — {attribution.author}. Education use only.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/education/acupuncture/reference/${type}`}>
              All {typeLabel.toLowerCase()}
            </ButtonLink>
            <ButtonLink
              href="/education/acupuncture/reference"
              variant="secondary"
            >
              All categories
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:pb-24">
        {showToc ? (
          <nav
            aria-label="On this page"
            className="mb-10 border border-slate-200 bg-white px-5 py-4"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
              On this page
            </p>
            <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
              {sectionEntries.map(([heading]) => (
                <li key={heading} className="mb-1.5 break-inside-avoid">
                  <a
                    href={`#${slugifyHeading(heading)}`}
                    className="text-sm font-medium text-teal hover:text-teal-dark"
                  >
                    {formatCorpusHeading(heading)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="space-y-10">
          {sectionEntries.map(([heading, body]) => (
            <CorpusSectionBody key={heading} heading={heading} body={body} />
          ))}
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Original American Dragon page:{" "}
          <a
            href={record.sourceUrl}
            className="font-semibold text-teal hover:text-teal-dark"
            rel="noopener noreferrer"
            target="_blank"
          >
            view source
          </a>
        </p>
      </section>
    </div>
  );
}
