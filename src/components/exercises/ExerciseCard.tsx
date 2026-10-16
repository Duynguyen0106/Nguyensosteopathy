import Link from "next/link";
import { ExerciseIllustration } from "@/components/exercises/ExerciseIllustration";
import { levelLabels, type Exercise } from "@/lib/exercises";

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={`/exercises/${exercise.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-md"
    >
      <div className="border-b border-slate-100 bg-slate-50 p-3">
        <ExerciseIllustration name={exercise.illustration} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
          {exercise.region} · {levelLabels[exercise.level]}
        </p>
        <h3 className="mt-2 font-display text-xl text-navy group-hover:text-teal-dark">
          {exercise.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {exercise.summary}
        </p>
        <span className="mt-4 text-sm font-semibold text-teal">
          View steps →
        </span>
      </div>
    </Link>
  );
}
