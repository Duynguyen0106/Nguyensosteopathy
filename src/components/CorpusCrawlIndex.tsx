import Link from "next/link";
import type { AcupunctureCorpusEntry } from "@/lib/acupuncture-corpus";
import { formatCorpusTitle, letterKey } from "@/lib/corpus-format";

type Props = {
  type: string;
  entries: AcupunctureCorpusEntry[];
};

const LETTERS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  "#",
] as const;

/**
 * Server-rendered A–Z link list so crawlers can discover corpus detail URLs
 * even when the interactive CorpusDirectory only shows one letter at a time.
 */
export function CorpusCrawlIndex({ type, entries }: Props) {
  if (entries.length === 0) return null;

  const byLetter = new Map<string, AcupunctureCorpusEntry[]>();
  for (const entry of entries) {
    const key = letterKey(entry.title || entry.label || entry.slug);
    const bucket = byLetter.get(key) ?? [];
    bucket.push(entry);
    byLetter.set(key, bucket);
  }
  for (const bucket of byLetter.values()) {
    bucket.sort((a, b) =>
      (a.title || a.label || a.slug).localeCompare(
        b.title || b.label || b.slug,
        "en",
        { sensitivity: "base" },
      ),
    );
  }

  const letters = LETTERS.filter((letter) => (byLetter.get(letter) || []).length);

  return (
    <nav
      aria-label="Full A to Z index"
      className="mt-14 border-t border-slate-200 pt-10"
    >
      <h2 className="font-display text-2xl text-navy md:text-3xl">
        Full A–Z index
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
        Every published entry in this category — use search above for a quick
        filter, or browse by letter here.
      </p>
      <div className="mt-6 space-y-3">
        {letters.map((letter) => {
          const group = byLetter.get(letter) || [];
          return (
            <details
              key={letter}
              className="border border-slate-200 bg-white open:border-teal/40"
              open={letter === letters[0]}
            >
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="inline-flex min-w-8 items-center justify-center bg-navy px-2 py-0.5 text-white">
                  {letter}
                </span>
                <span className="ml-3 text-slate-600">
                  {group.length.toLocaleString()}{" "}
                  {group.length === 1 ? "entry" : "entries"}
                </span>
              </summary>
              <ul className="columns-1 gap-x-8 border-t border-slate-100 px-4 py-3 sm:columns-2 lg:columns-3">
                {group.map((entry) => (
                  <li key={entry.slug} className="mb-1.5 break-inside-avoid">
                    <Link
                      href={`/education/acupuncture/reference/${type}/${entry.slug}`}
                      className="text-sm font-medium text-teal hover:text-teal-dark"
                    >
                      {formatCorpusTitle(
                        entry.title || entry.label || entry.slug,
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </nav>
  );
}
