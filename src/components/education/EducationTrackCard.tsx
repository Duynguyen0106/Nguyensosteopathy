import Link from "next/link";
import type { EducationTrack } from "@/lib/education";

export function EducationTrackCard({
  track,
  countLabel,
}: {
  track: EducationTrack;
  countLabel: string;
}) {
  return (
    <Link
      href={`/education/${track.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal hover:shadow-sm md:p-6"
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
        {track.audienceLabel}
      </p>
      <h2 className="mt-2 font-display text-2xl text-navy group-hover:text-teal-dark md:text-3xl">
        {track.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-base">
        {track.summary}
      </p>
      <p className="mt-4 text-sm text-slate-500">{countLabel}</p>
      <span className="mt-2 text-sm font-semibold text-teal group-hover:text-teal-dark">
        {track.ctaLabel} →
      </span>
    </Link>
  );
}
