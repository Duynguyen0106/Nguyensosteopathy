import Link from "next/link";
import type { SupplementTopic } from "@/lib/supplements";

export function SupplementCard({ topic }: { topic: SupplementTopic }) {
  return (
    <Link
      href={`/supplements/${topic.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal hover:shadow-sm md:p-6"
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
        {topic.category}
      </p>
      <h2 className="mt-2 font-display text-2xl text-navy group-hover:text-teal-dark">
        {topic.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-base">
        {topic.summary}
      </p>
      <span className="mt-4 text-sm font-semibold text-teal group-hover:text-teal-dark">
        Read guide →
      </span>
    </Link>
  );
}
