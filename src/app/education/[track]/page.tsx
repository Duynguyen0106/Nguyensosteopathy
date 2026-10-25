import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { EducationArticleCard } from "@/components/education/EducationArticleCard";
import { EducationAudienceBanner } from "@/components/education/EducationAudienceBanner";
import {
  educationTracks,
  getArticlesForTrack,
  getEducationTrack,
  type EducationTrackId,
} from "@/lib/education";
import { defaultOgImage, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ track: string }> };

const trackIds = new Set<EducationTrackId>(["acupuncture", "cpd"]);

export function generateStaticParams() {
  return educationTracks
    .filter((track) => track.id === "acupuncture" || track.id === "cpd")
    .map((track) => ({ track: track.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track: trackSlug } = await params;
  if (trackSlug === "nutrition" || trackSlug === "library") {
    // nutrition redirects to blog; library has a dedicated route
    return {};
  }
  const track = getEducationTrack(trackSlug);
  if (!track || !trackIds.has(track.id)) return {};

  const description = trimDescription(track.summary);
  return {
    title: track.title,
    description,
    alternates: { canonical: `/education/${track.slug}` },
    openGraph: {
      title: `${track.title} | ${site.name}`,
      description,
      url: `/education/${track.slug}`,
      images: [defaultOgImage],
    },
  };
}

export default async function EducationTrackPage({ params }: Props) {
  const { track: trackSlug } = await params;
  if (trackSlug === "nutrition") {
    redirect("/blog");
  }
  if (trackSlug === "library") {
    redirect("/education/library");
  }

  const track = getEducationTrack(trackSlug);
  if (!track || !trackIds.has(track.id)) notFound();

  const articles = getArticlesForTrack(track.id);

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.websiteUrl}/education/${track.slug}#webpage`,
    name: track.title,
    url: `${site.websiteUrl}/education/${track.slug}`,
    description: track.summary,
    audience: {
      "@type": "Audience",
      audienceType:
        track.audience === "practitioners"
          ? "Healthcare practitioners"
          : "Patients",
    },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link href="/education" className="hover:text-teal-dark">
              Education
            </Link>
            {" · "}
            {track.audienceLabel}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {track.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {track.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/education">All education</ButtonLink>
            {track.id === "acupuncture" ? (
              <>
                <ButtonLink
                  href="/education/acupuncture/reference"
                  variant="secondary"
                >
                  Reference corpus
                </ButtonLink>
                <ButtonLink
                  href="/services/acupuncture-electro"
                  variant="secondary"
                >
                  Acupuncture service
                </ButtonLink>
              </>
            ) : (
              <ButtonLink href="/about" variant="secondary">
                About Austin
              </ButtonLink>
            )}
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <EducationAudienceBanner
          trackId={track.id}
          audience={track.audience}
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <EducationArticleCard article={article} track={track.id} />
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-slate-500">
          Looking for something else?{" "}
          <Link href="/education" className="font-semibold text-teal hover:text-teal-dark">
            Back to the education hub
          </Link>
          {track.id === "acupuncture" ? (
            <>
              {" · "}
              <Link
                href="/education/acupuncture/reference"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Reference corpus framework
              </Link>
              {" · "}
              <Link
                href="/aftercare"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                General aftercare
              </Link>
            </>
          ) : null}
          .
        </p>
      </section>
    </div>
  );
}
