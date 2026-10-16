import Link from "next/link";
import { phaseLabels, type Programme } from "@/lib/exercises";

export function ProgrammeCard({ programme }: { programme: Programme }) {
  return (
    <Link
      href={`/exercises/programmes/${programme.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-teal/25 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
        Programme · {phaseLabels[programme.phase]}
      </p>
      <h3 className="mt-3 font-display text-2xl text-navy group-hover:text-teal-dark">
        {programme.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-base">
        {programme.summary}
      </p>
      <p className="mt-4 text-xs font-medium text-slate-500">
        {programme.exerciseSlugs.length} exercises
      </p>
      <span className="mt-3 text-sm font-semibold text-teal">
        Open programme →
      </span>
    </Link>
  );
}
