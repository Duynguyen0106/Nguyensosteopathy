import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import {
  getAllLibraryTopicKeys,
  getLibraryCategoryLabel,
  getLibraryTopic,
} from "@/lib/education-library";
import {
  breadcrumbJsonLd,
  defaultOgImage,
  fitSerpTitle,
  trimDescription,
} from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return getAllLibraryTopicKeys().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: topicKey } = await params;
  const topic = getLibraryTopic(topicKey);
  if (!topic) return {};

  const title = fitSerpTitle(`${topic.title} library topic`);
  const description = trimDescription(
    `${topic.sheetCount} dual-audience education sheet${
      topic.sheetCount === 1 ? "" : "s"
    } on ${topic.title} from Nguyen's Osteopathic Clinic.`,
  );
  const path = `/education/library/topic/${topic.topicKey}`;
  const ogTitle =
    typeof title === "string"
      ? `${topic.title} | ${site.name}`
      : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      images: [defaultOgImage],
    },
  };
}

export default async function EducationLibraryTopicPage({ params }: Props) {
  const { topic: topicKey } = await params;
  const topic = getLibraryTopic(topicKey);
  if (!topic) notFound();

  const path = `/education/library/topic/${topic.topicKey}`;
  const categoryLabel = getLibraryCategoryLabel(topic.category);
  const categoryHref = `/education/library#${topic.category}`;

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.websiteUrl}${path}#webpage`,
    name: `${topic.title} — library topic`,
    url: `${site.websiteUrl}${path}`,
    description: topic.summary,
    audience: {
      "@type": "Audience",
      audienceType: "Patients and healthcare practitioners",
    },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/education/library#webpage` },
    numberOfItems: topic.sheetCount,
  };

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Library", path: "/education/library" },
    { name: categoryLabel, path: categoryHref },
    { name: topic.title, path },
  ]);

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link href="/education" className="hover:text-teal-dark">
              Education
            </Link>
            {" · "}
            <Link href="/education/library" className="hover:text-teal-dark">
              Library
            </Link>
            {" · "}
            <Link href={categoryHref} className="hover:text-teal-dark">
              {categoryLabel}
            </Link>
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {topic.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {topic.sheetCount} dual-audience sheet
            {topic.sheetCount === 1 ? "" : "s"} on this topic
            {topic.mskRelevant ? " · often relevant in MSK conversations" : ""}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/education/library">All topics</ButtonLink>
            {topic.nutritionGuide ? (
              <ButtonLink
                href={`/education/nutrition/${topic.nutritionGuide.slug}`}
                variant="secondary"
              >
                Patient guide: {topic.nutritionGuide.title}
              </ButtonLink>
            ) : (
              <ButtonLink href="/education/nutrition" variant="secondary">
                Featured nutrition guides
              </ButtonLink>
            )}
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <EducationAudienceBanner trackId="library" audience="both" />
      </section>

      {topic.nutritionGuide ? (
        <section className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
          <div className="rounded-2xl border border-teal/30 bg-white px-5 py-6 md:px-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
              Featured patient guide
            </p>
            <h2 className="mt-2 font-display text-2xl text-navy">
              {topic.nutritionGuide.title}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              {topic.nutritionGuide.summary}
            </p>
            <Link
              href={`/education/nutrition/${topic.nutritionGuide.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-teal hover:text-teal-dark"
            >
              Read the nutrition guide →
            </Link>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <h2 className="font-display text-3xl text-navy">Library sheets</h2>
        <p className="mt-2 text-base text-slate-600">
          Each sheet is a short dual-audience education note. Sheet numbers match
          the internal library sequence.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topic.articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/education/library/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal hover:shadow-sm md:p-5"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                  {article.variantLabel}
                  {article.mskRelevant ? " · MSK-relevant" : ""}
                </p>
                <h3 className="mt-2 font-display text-xl text-navy group-hover:text-teal-dark">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {article.summary}
                </p>
                <span className="mt-3 text-sm font-semibold text-teal">
                  Read sheet →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
