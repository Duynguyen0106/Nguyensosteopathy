import Link from "next/link";
import type { EducationArticle, EducationTrackId } from "@/lib/education";
import { educationHref } from "@/lib/education";

export function EducationArticleCard({
  article,
  track,
}: {
  article: EducationArticle;
  track: EducationTrackId;
}) {
  return (
    <Link
      href={educationHref(track, article.slug)}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal hover:shadow-sm md:p-6"
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
        {article.status === "coming-soon"
          ? "Coming soon"
          : article.relatedCredentialId
            ? "Course notes"
            : track === "cpd"
              ? "CPD"
              : "Guide"}
      </p>
      <h2 className="mt-2 font-display text-2xl text-navy group-hover:text-teal-dark">
        {article.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-base">
        {article.summary}
      </p>
      {article.provider || article.hoursLabel ? (
        <p className="mt-3 text-xs font-medium text-slate-500">
          {[article.provider, article.hoursLabel].filter(Boolean).join(" · ")}
        </p>
      ) : null}
      <span className="mt-4 text-sm font-semibold text-teal group-hover:text-teal-dark">
        {article.status === "coming-soon"
          ? "View placeholder →"
          : article.relatedCredentialId
            ? "Read course notes →"
            : "Read guide →"}
      </span>
    </Link>
  );
}
