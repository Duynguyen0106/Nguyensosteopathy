"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AcupunctureCorpusBrowseEntry } from "@/lib/acupuncture-corpus";
import { formatCorpusTitle, letterKey } from "@/lib/corpus-format";

type Props = {
  type: string;
  entries: AcupunctureCorpusBrowseEntry[];
};

const LETTERS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  "#",
] as const;

/**
 * Client letter hub for large corpus categories (e.g. formulas).
 * Receives slim browse entries only (no searchText) to stay under Worker CPU limits.
 */
export function CorpusLetterDirectory({ type, entries }: Props) {
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of entries) {
      const key = letterKey(entry.title || entry.label || entry.slug);
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map;
  }, [entries]);

  const defaultLetter =
    LETTERS.find((item) => (counts.get(item) || 0) > 0) || "A";
  const [letter, setLetter] = useState<string>(defaultLetter);

  const group = useMemo(() => {
    return entries
      .filter(
        (entry) =>
          letterKey(entry.title || entry.label || entry.slug) === letter,
      )
      .sort((a, b) =>
        (a.title || a.label || a.slug).localeCompare(
          b.title || b.label || b.slug,
          "en",
          { sensitivity: "base" },
        ),
      );
  }, [entries, letter]);

  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-600">
        This category is large ({entries.length.toLocaleString()} entries) —
        browse one letter at a time to keep the page light.
      </p>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="navigation"
        aria-label="Browse by letter"
      >
        {LETTERS.map((item) => {
          const count = counts.get(item) || 0;
          const active = item === letter;
          return (
            <button
              key={item}
              type="button"
              disabled={count === 0}
              onClick={() => setLetter(item)}
              className={
                active
                  ? "inline-flex min-w-9 items-center justify-center bg-navy px-2 py-1.5 text-sm font-semibold text-white disabled:opacity-30"
                  : "inline-flex min-w-9 items-center justify-center border border-slate-300 bg-white px-2 py-1.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-30"
              }
              aria-current={active ? "page" : undefined}
            >
              {item}
              <span className="sr-only"> ({count} entries)</span>
            </button>
          );
        })}
      </div>

      <h2 className="mt-10 font-display text-2xl text-navy md:text-3xl">
        {letter === "#" ? "Other" : letter}
        <span className="ml-3 font-sans text-base font-normal text-slate-500">
          {group.length.toLocaleString()}{" "}
          {group.length === 1 ? "entry" : "entries"}
        </span>
      </h2>

      <ul className="mt-5 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
        {group.map((entry) => (
          <li key={entry.slug} className="mb-1.5 break-inside-avoid">
            <Link
              href={`/education/acupuncture/reference/${type}/${entry.slug}`}
              className="text-sm font-medium text-teal hover:text-teal-dark"
            >
              {formatCorpusTitle(entry.title || entry.label || entry.slug)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
