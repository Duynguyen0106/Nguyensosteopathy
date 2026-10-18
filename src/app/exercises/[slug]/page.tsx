import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { ExercisePhoto } from "@/components/exercises/ExercisePhoto";
import { ExerciseSafetyBanner } from "@/components/exercises/ExerciseSafetyBanner";
import { ExerciseSteps } from "@/components/exercises/ExerciseSteps";
import { ProgrammeCard } from "@/components/exercises/ProgrammeCard";
import { getCondition } from "@/lib/conditions";
import {
  getAllExerciseSlugs,
  getExercise,
  getProgrammesForExercise,
  levelLabels,
} from "@/lib/exercises";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllExerciseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exercise = getExercise(slug);
  if (!exercise) return {};

  return {
    title: `${exercise.title} | Home Exercise`,
    description: exercise.summary,
    alternates: { canonical: `/exercises/${exercise.slug}` },
    openGraph: {
      title: `${exercise.title} | Nguyen's Osteopathic Clinic`,
      description: exercise.summary,
      url: `/exercises/${exercise.slug}`,
    },
  };
}

export default async function ExerciseDetailPage({ params }: Props) {
  const { slug } = await params;
  const exercise = getExercise(slug);
  if (!exercise) notFound();

  const relatedProgrammes = getProgrammesForExercise(exercise);
  const relatedConditions = exercise.relatedConditionSlugs
    .map((conditionSlug) => getCondition(conditionSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: exercise.title,
    url: `${site.websiteUrl}/exercises/${exercise.slug}`,
    description: exercise.summary,
    specialty: "https://schema.org/Musculoskeletal",
    reviewedBy: { "@id": `${site.websiteUrl}/#practitioner` },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: exercise.title,
    description: exercise.summary,
    totalTime: "PT5M",
    tool: exercise.equipment,
    step: exercise.steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text,
    })),
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link href="/exercises" className="hover:text-teal-dark">
              Exercises
            </Link>
            {" · "}
            {exercise.region}
            {" · "}
            {levelLabels[exercise.level]}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {exercise.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {exercise.summary}
          </p>
          <dl className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3">
              <dt className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                Dosage
              </dt>
              <dd className="mt-1 text-sm font-medium text-navy md:text-base">
                {exercise.dosage}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3">
              <dt className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                Equipment
              </dt>
              <dd className="mt-1 text-sm font-medium text-navy md:text-base">
                {exercise.equipment}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <ExercisePhoto
              slug={exercise.slug}
              illustration={exercise.illustration}
              title={exercise.title}
              size="detail"
              priority
            />
            <div className="mt-6">
              <ExerciseSafetyBanner compact />
            </div>
          </div>
          <ExerciseSteps
            steps={exercise.steps}
            cues={exercise.cues}
            avoid={exercise.avoid}
          />
        </div>
      </section>

      {relatedProgrammes.length > 0 ? (
        <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy">In programmes</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProgrammes.map((programme) => (
                <li key={programme.slug}>
                  <ProgrammeCard programme={programme} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {relatedConditions.length > 0 ? (
        <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy">Related conditions</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedConditions.map((condition) => (
                <li key={condition.slug}>
                  <Link
                    href={`/conditions/${condition.slug}`}
                    className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-teal/40"
                  >
                    <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                      {condition.region}
                    </span>
                    <span className="mt-2 font-semibold text-navy">
                      {condition.shortTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
          <ButtonLink href="/exercises">All exercises</ButtonLink>
          <ButtonLink href="/book" variant="secondary">
            Book assessment
          </ButtonLink>
          <ButtonLink href="/aftercare" variant="secondary">
            Aftercare
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
