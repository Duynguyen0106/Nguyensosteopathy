import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { EducationTrackCard } from "@/components/education/EducationTrackCard";
import {
  educationTracks,
  getArticlesForTrack,
} from "@/lib/education";
import { defaultOgImage, trimDescription } from "@/lib/seo";
import { site } from "@/lib/site";

const description = trimDescription(
  "Education hub at Nguyen's Osteopathic Clinic in Woolwich: a dual-audience supplement library organised by topic, acupuncture notes, and practitioner CPD. Patient nutrition articles are on the blog.",
);

export const metadata: Metadata = {
  title: "Education Hub",
  description,
  alternates: { canonical: "/education" },
  keywords: [
    "osteopath education Woolwich",
    "supplement education library SE18",
    "acupuncture education London",
    "osteopathy CPD notes",
  ],
  openGraph: {
    title: `Education Hub | ${site.name}`,
    description,
    url: "/education",
    images: [defaultOgImage],
  },
};

function countLabelFor(trackId: (typeof educationTracks)[number]["id"]) {
  if (trackId === "library") {
    return "Topic themes for patients & practitioners";
  }
  const articles = getArticlesForTrack(trackId);
  const live = articles.filter((a) => a.status === "published").length;
  const soon = articles.length - live;
  if (soon > 0) {
    return `${live} published · ${soon} coming soon`;
  }
  return `${live} guide${live === 1 ? "" : "s"}`;
}

export default function EducationHubPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.websiteUrl}/education#webpage`,
    name: "Education hub",
    url: `${site.websiteUrl}/education`,
    description,
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    hasPart: educationTracks.map((track) => ({
      "@type": "CollectionPage",
      name: track.title,
      url: `${site.websiteUrl}/education/${track.slug}`,
    })),
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
            Learn with the clinic · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Education hub
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            A full dual-audience supplement library, acupuncture notes, and CPD
            for practitioners — hosted by {site.name}. Shorter patient nutrition
            articles live on the{" "}
            <Link href="/blog" className="font-semibold text-teal hover:text-teal-dark">
              blog
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/education/library">Supplement library</ButtonLink>
            <ButtonLink href="/blog" variant="secondary">
              Nutrition blog articles
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <ul className="grid gap-6 md:grid-cols-3">
          {educationTracks.map((track) => (
            <li key={track.id}>
              <EducationTrackCard
                track={track}
                countLabel={countLabelFor(track.id)}
              />
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-slate-500">
          CPD pages are public but written for practitioners. Patient care
          questions still belong in a booked assessment —{" "}
          <Link href="/book" className="font-semibold text-teal hover:text-teal-dark">
            book online
          </Link>{" "}
          or see{" "}
          <Link href="/exercises" className="font-semibold text-teal hover:text-teal-dark">
            home exercises
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
