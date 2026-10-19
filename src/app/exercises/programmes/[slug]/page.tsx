import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseSafetyBanner } from "@/components/exercises/ExerciseSafetyBanner";
import { getCondition } from "@/lib/conditions";
import {
  getAllProgrammeSlugs,
  getExercisesForProgramme,
  getProgramme,
  phaseLabels,
} from "@/lib/exercises";
import { breadcrumbJsonLd, trimDescription } from "@/lib/seo";
import { getService, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProgrammeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) return {};

  return {
    title: programme.title,
    description: trimDescription(programme.summary),
    alternates: { canonical: `/exercises/programmes/${programme.slug}` },
    openGraph: {
      title: `${programme.title} | ${site.name}`,
      description: trimDescription(programme.summary),
      url: `/exercises/programmes/${programme.slug}`,
    },
  };
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) notFound();

  const programmeExercises = getExercisesForProgramme(programme);
  const relatedConditions = programme.relatedConditionSlugs
    .map((conditionSlug) => getCondition(conditionSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const service = programme.relatedServiceSlug
    ? getService(programme.relatedServiceSlug)
    : undefined;

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: programme.title,
    url: `${site.websiteUrl}/exercises/programmes/${programme.slug}`,
    description: programme.summary,
    specialty: "https://schema.org/Musculoskeletal",
    reviewedBy: { "@id": `${site.websiteUrl}/#practitioner` },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: programme.title,
    description: programme.summary,
    step: programmeExercises.map((exercise, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: exercise.title,
      url: `${site.websiteUrl}/exercises/${exercise.slug}`,
      text: exercise.summary,
    })),
  };

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Exercises", path: "/exercises" },
    {
      name: programme.title,
      path: `/exercises/programmes/${programme.slug}`,
    },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            <Link href="/exercises" className="hover:text-teal-dark">
              Exercises
            </Link>
            {" · Programme · "}
            {phaseLabels[programme.phase]}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {programme.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {programme.summary}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            <span className="font-semibold text-navy">Who it is for: </span>
            {programme.audience}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#programme-exercises">See exercises</ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book assessment
            </ButtonLink>
            {service ? (
              <ButtonLink
                href={`/services/${service.slug}`}
                variant="secondary"
              >
                Related: {service.title}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-12 md:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <ExerciseSafetyBanner />
          <div>
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Precautions
            </h2>
            <ul className="mt-5 space-y-3">
              {programme.precautions.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-slate-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="programme-exercises"
        className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">
            Exercises in order
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Work through the list in sequence unless your clinician advised
            otherwise. Open each card for full steps and dosage.
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programmeExercises.map((exercise, index) => (
              <li key={exercise.slug} className="relative">
                <span className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white shadow">
                  {index + 1}
                </span>
                <ExerciseCard exercise={exercise} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {relatedConditions.length > 0 ? (
        <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy">
              Related condition guides
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {relatedConditions.map((condition) => (
                <li key={condition.slug}>
                  <Link
                    href={`/conditions/${condition.slug}`}
                    className="inline-flex rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
                  >
                    {condition.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
          <ButtonLink href="/exercises">Exercise library</ButtonLink>
          <ButtonLink href="/aftercare" variant="secondary">
            Aftercare
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
