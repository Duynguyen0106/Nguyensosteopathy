import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseSafetyBanner } from "@/components/exercises/ExerciseSafetyBanner";
import { ProgrammeCard } from "@/components/exercises/ProgrammeCard";
import {
  exerciseRegions,
  exercises,
  getExercisesByRegion,
  levelLabels,
  programmes,
  type ExerciseLevel,
  type ExerciseRegion,
} from "@/lib/exercises";
import { site } from "@/lib/site";

const levelFilters: ExerciseLevel[] = ["early", "build", "return"];

export const metadata: Metadata = {
  title: "Home Exercises & Rehab Library",
  description:
    "Public rehab exercise library from Nguyen's Osteopathic Clinic in Woolwich: programmes and step-by-step drills for low back, neck, knee, heel, shoulder and…",
  alternates: { canonical: "/exercises" },
  keywords: [
    "osteopath exercises Woolwich",
    "home rehab exercises SE18",
    "sciatica exercises Woolwich",
    "desk neck exercises London",
    "plantar fasciitis exercises SE18",
  ],
  openGraph: {
    title: "Home Exercises & Rehab | Nguyen's Osteopathic Clinic",
    description:
      "Browse programmes and step-by-step home exercises from our Woolwich osteopathy clinic.",
    url: "/exercises",
  },
};

type Props = {
  searchParams: Promise<{ region?: string; level?: string }>;
};

function isRegion(value: string | undefined): value is ExerciseRegion {
  return Boolean(value && exerciseRegions.includes(value as ExerciseRegion));
}

function isLevel(value: string | undefined): value is ExerciseLevel {
  return Boolean(value && levelFilters.includes(value as ExerciseLevel));
}

function filterHref(opts: { region?: ExerciseRegion; level?: ExerciseLevel }) {
  const params = new URLSearchParams();
  if (opts.region) params.set("region", opts.region);
  if (opts.level) params.set("level", opts.level);
  const qs = params.toString();
  return qs ? `/exercises?${qs}#exercises` : "/exercises#exercises";
}

async function ExerciseGrid({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; level?: string }>;
}) {
  const params = await searchParams;
  const region = isRegion(params.region) ? params.region : undefined;
  const level = isLevel(params.level) ? params.level : undefined;
  const filtered = getExercisesByRegion(region).filter((item) =>
    level ? item.level === level : true,
  );

  return (
    <>
      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Link
            href={filterHref({ level })}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
              !region
                ? "bg-navy text-white"
                : "border border-slate-200 bg-white text-navy hover:border-teal hover:text-teal"
            }`}
          >
            All regions
          </Link>
          {exerciseRegions.map((item) => (
            <Link
              key={item}
              href={filterHref({ region: item, level })}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                region === item
                  ? "bg-navy text-white"
                  : "border border-slate-200 bg-white text-navy hover:border-teal hover:text-teal"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={filterHref({ region })}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
              !level
                ? "bg-teal text-white"
                : "border border-slate-200 bg-white text-navy hover:border-teal hover:text-teal"
            }`}
          >
            All levels
          </Link>
          {levelFilters.map((item) => (
            <Link
              key={item}
              href={filterHref({ region, level: item })}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                level === item
                  ? "bg-teal text-white"
                  : "border border-slate-200 bg-white text-navy hover:border-teal hover:text-teal"
              }`}
            >
              {levelLabels[item]}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Showing {filtered.length} of {exercises.length} exercises
        {region ? ` in ${region}` : ""}
        {level ? ` · ${levelLabels[level]}` : ""}
      </p>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((exercise) => (
          <li key={exercise.slug}>
            <ExerciseCard exercise={exercise} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? (
        <p className="mt-8 text-base text-slate-600">
          No exercises match this filter.{" "}
          <Link href="/exercises#exercises" className="font-semibold text-teal">
            Clear filters
          </Link>
        </p>
      ) : null}
    </>
  );
}

function ExerciseGridFallback() {
  return (
    <>
      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-xl bg-navy px-3 py-2 text-sm font-semibold text-white">
            All regions
          </span>
          {exerciseRegions.map((item) => (
            <span
              key={item}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-navy"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-xl bg-teal px-3 py-2 text-sm font-semibold text-white">
            All levels
          </span>
          {levelFilters.map((item) => (
            <span
              key={item}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-navy"
            >
              {levelLabels[item]}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Showing {exercises.length} of {exercises.length} exercises
      </p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <li key={exercise.slug}>
            <ExerciseCard exercise={exercise} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function ExercisesHubPage({ searchParams }: Props) {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Home exercises & rehab library",
    url: `${site.websiteUrl}/exercises`,
    description:
      "Public educational exercise library for common musculoskeletal presentations.",
    specialty: "https://schema.org/Musculoskeletal",
    audience: {
      "@type": "PeopleAudience",
      geographicArea: { "@type": "City", name: "Woolwich" },
    },
    reviewedBy: { "@id": `${site.websiteUrl}/#practitioner` },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
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
            Patient rehab · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Home exercises &amp; rehab library
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Short programmes and step-by-step drills you can use between visits —
            built with osteopathic care and NASM personal-training exercise
            programming in mind at {site.name}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#programmes">Browse programmes</ButtonLink>
            <ButtonLink href="/aftercare" variant="secondary">
              Aftercare guide
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book assessment
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <ExerciseSafetyBanner />
          <ul className="mt-6 grid gap-3 text-sm text-slate-600 md:grid-cols-3 md:text-base">
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              Stop if symptoms clearly worsen after a session.
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              New numbness, weakness, bladder/bowel change, or chest pain → urgent
              care.
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              Clinic advice for your case always overrides these public pages.
            </li>
          </ul>
        </div>
      </section>

      <section
        id="programmes"
        className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Start here
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            Programmes
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Ordered sequences for common presentations. Each programme lists
            precautions and links every exercise in order.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => (
              <li key={programme.slug}>
                <ProgrammeCard programme={programme} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="exercises"
        className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Building blocks
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            All exercises
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Filter by body region or level, then open any drill for dosage,
            steps, cues, and what to avoid.
          </p>

          <Suspense fallback={<ExerciseGridFallback />}>
            <ExerciseGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">
            Need a plan for your case?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Public pages cannot account for every flare, surgery, or sport demand.
            Book an assessment in Woolwich and we will match loading to how
            irritable your tissues are today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/services/sports-injury-rehab" variant="secondary">
              Sports injury &amp; rehab
            </ButtonLink>
            <ButtonLink href="/resources" variant="secondary">
              Patient resources
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
