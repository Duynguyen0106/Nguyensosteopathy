"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { AcupunctureCorpusEntry } from "@/lib/acupuncture-corpus";
import {
  corpusSearchPlaceholder,
  letterKey,
} from "@/lib/corpus-format";

type Props = {
  type: string;
  entries: AcupunctureCorpusEntry[];
};

const LETTERS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  "#",
] as const;

function chipLabel(type: string, value: string) {
  if (type === "points" && value === "EXTRA") return "Extra points";
  return value;
}

export function CorpusDirectory({ type, entries }: Props) {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string>("A");
  const [chip, setChip] = useState<string>("all");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const chips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of entries) {
      const value =
        type === "points"
          ? entry.channel
          : type === "herbs"
            ? entry.category?.split(":")[0]?.trim() || entry.category
            : null;
      if (!value) continue;
      counts.set(value, (counts.get(value) || 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 12)
      .map(([value, count]) => ({ value, count }));
  }, [entries, type]);

  const chipFiltered = useMemo(() => {
    if (chip === "all") return entries;
    return entries.filter((entry) => {
      if (type === "points") return entry.channel === chip;
      if (type === "herbs") {
        const cat = entry.category || "";
        return (
          cat === chip || cat.startsWith(`${chip}:`) || cat.startsWith(chip)
        );
      }
      return true;
    });
  }, [chip, entries, type]);

  const letterCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of chipFiltered) {
      const key = letterKey(entry.title || entry.label || entry.slug);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return counts;
  }, [chipFiltered]);

  const activeLetterCount = letterCounts.get(letter) || 0;
  useEffect(() => {
    if (activeLetterCount > 0) return;
    const next = LETTERS.find((item) => (letterCounts.get(item) || 0) > 0);
    if (next && next !== letter) setLetter(next);
  }, [activeLetterCount, letter, letterCounts]);

  const filtered = useMemo(() => {
    if (deferred) {
      return chipFiltered.filter((entry) => {
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
        return deferred.split(/\s+/).every((token) => haystack.includes(token));
      });
    }
    return chipFiltered.filter(
      (entry) => letterKey(entry.title || entry.label || entry.slug) === letter,
    );
  }, [chipFiltered, deferred, letter]);

  const showAlpha = !deferred && entries.length > 40;

  return (
    <div>
      <label className="block max-w-xl">
        <span className="text-sm font-semibold text-navy">Search this list</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={corpusSearchPlaceholder(type)}
          className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-base text-navy outline-none focus:border-teal"
        />
      </label>

      {chips.length > 1 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setChip("all")}
            className={`min-h-10 border px-3 py-1.5 text-sm font-semibold transition ${
              chip === "all"
                ? "border-teal bg-teal text-white"
                : "border-slate-200 bg-white text-navy hover:border-teal"
            }`}
          >
            All
          </button>
          {chips.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setChip(item.value)}
              className={`min-h-10 border px-3 py-1.5 text-sm font-semibold transition ${
                chip === item.value
                  ? "border-teal bg-teal text-white"
                  : "border-slate-200 bg-white text-navy hover:border-teal"
              }`}
            >
              {chipLabel(type, item.value)}{" "}
              <span className="opacity-70">{item.count}</span>
            </button>
          ))}
        </div>
      ) : null}

      {showAlpha ? (
        <div
          className="mt-5 flex flex-wrap gap-1"
          role="navigation"
          aria-label="Jump by letter"
        >
          {LETTERS.map((item) => {
            const count = letterCounts.get(item) || 0;
            const active = letter === item;
            return (
              <button
                key={item}
                type="button"
                disabled={count === 0}
                onClick={() => setLetter(item)}
                className={`min-h-9 min-w-9 border px-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-30 ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-slate-200 bg-white text-navy hover:border-teal"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="mt-4 text-sm text-slate-500">
        Showing {filtered.length.toLocaleString()}
        {deferred
          ? ` match${filtered.length === 1 ? "" : "es"}`
          : showAlpha
            ? ` under “${letter}”`
            : ""}{" "}
        of {entries.length.toLocaleString()}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 text-base text-slate-600">
          No matches
          {query.trim() ? ` for “${query.trim()}”` : ""}.
          {showAlpha ? " Try another letter or search." : ""}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
          {filtered.map((entry) => (
            <li key={entry.slug} className="py-2.5">
              <Link
                href={`/education/acupuncture/reference/${type}/${entry.slug}`}
                className="group flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <span className="text-base font-semibold text-teal group-hover:text-teal-dark">
                  {entry.title || entry.label || entry.slug}
                </span>
                {(entry.latin || entry.pointCode || entry.category) && (
                  <span className="text-sm text-slate-500">
                    {entry.latin ||
                      entry.pointCode ||
                      entry.category?.split(":")[0]}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
