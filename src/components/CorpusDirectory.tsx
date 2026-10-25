"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { AcupunctureCorpusEntry } from "@/lib/acupuncture-corpus";

type Props = {
  type: string;
  entries: AcupunctureCorpusEntry[];
};

export function CorpusDirectory({ type, entries }: Props) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    if (!deferred) return entries;
    return entries.filter((entry) => {
      const haystack = [
        entry.title,
        entry.label,
        entry.slug,
        entry.pinyin,
        entry.latin,
        entry.pointCode,
        entry.channel,
        entry.category,
        entry.searchText,
        entry.summary,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return deferred
        .split(/\s+/)
        .every((token) => haystack.includes(token));
    });
  }, [deferred, entries]);

  return (
    <div>
      <label className="block max-w-xl">
        <span className="text-sm font-semibold text-navy">Search this list</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name, pinyin, Latin, point code…"
          className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-base text-navy outline-none focus:border-teal"
        />
      </label>
      <p className="mt-3 text-sm text-slate-500">
        Showing {filtered.length.toLocaleString()} of{" "}
        {entries.length.toLocaleString()}
      </p>
      {filtered.length === 0 ? (
        <p className="mt-6 text-base text-slate-600">
          No matches for “{query.trim()}”.
        </p>
      ) : (
        <ul className="mt-6 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {filtered.map((entry) => (
            <li key={entry.slug} className="mb-2 break-inside-avoid">
              <Link
                href={`/education/acupuncture/reference/${type}/${entry.slug}`}
                className="text-sm font-medium text-teal hover:text-teal-dark"
              >
                {entry.title || entry.label || entry.slug}
              </Link>
              {(entry.latin || entry.pointCode) && (
                <span className="ml-2 text-xs text-slate-500">
                  {entry.latin || entry.pointCode}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
