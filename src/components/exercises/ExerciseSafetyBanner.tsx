import Link from "next/link";
import { site } from "@/lib/site";

export function ExerciseSafetyBanner({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className="rounded-2xl border border-teal/30 bg-teal/5 px-5 py-4 text-sm leading-relaxed text-slate-700 md:px-6 md:py-5 md:text-base"
      role="note"
    >
      <p className="font-semibold text-navy">General guides — not a personal prescription</p>
      <p className="mt-2">
        These exercises are educational examples used at {site.name}. They do not
        replace assessment. Stop if symptoms clearly worsen, and seek urgent care
        for red-flag neurological change, chest pain, or unexplained severe pain.
        {!compact ? (
          <>
            {" "}
            Prefer a plan built around your case?{" "}
            <Link href="/book" className="font-semibold text-teal hover:text-teal-dark">
              Book online
            </Link>{" "}
            or call{" "}
            <a href={site.phoneHref} className="font-semibold text-teal hover:text-teal-dark">
              {site.phone}
            </a>
            .
          </>
        ) : null}
      </p>
    </aside>
  );
}
