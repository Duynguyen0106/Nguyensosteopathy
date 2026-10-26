"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { letterKey } from "@/lib/corpus-format";

export type LibraryBrowseTopic = {
  topicKey: string;
  title: string;
  summary: string;
  href: string;
  category: string;
  categoryLabel: string;
  categoryDescription?: string;
  combined: boolean;
  mskRelevant: boolean;
  hasEvidence: boolean;
  hasBlog: boolean;
  ctaLabel: string;
};

type CategoryGroup = {
  category: string;
  label: string;
  description?: string;
  topics: LibraryBrowseTopic[];
};

type Props = {
  groups: CategoryGroup[];
  browse: {
    key: string;
    href: string;
    label: string;
    note?: string;
  }[];
};

const LARGE_CATEGORY = 12;

function topicBadge(topic: LibraryBrowseTopic): string {
  return topic.combined ? "Theme" : "Note";
}

export function LibraryBrowse({ groups, browse }: Props) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());
  const [letterByCategory, setLetterByCategory] = useState<
    Record<string, string>
  >({});

  const allTopics = useMemo(
    () => groups.flatMap((group) => group.topics),
    [groups],
  );

  const searchHits = useMemo(() => {
    if (!deferred) return null;
    const tokens = deferred.split(/\s+/).filter(Boolean);
    return allTopics.filter((topic) => {
      const haystack = [
        topic.title,
        topic.summary,
        topic.categoryLabel,
        topic.topicKey,
        topic.combined ? "theme combined" : "note",
        topic.mskRelevant ? "msk" : "",
        topic.hasEvidence ? "evidence" : "",
        topic.hasBlog ? "blog" : "",
      ]
        .join(" ")
        .toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    });
  }, [allTopics, deferred]);

  return (
    <div>
      <label className="block max-w-xl" id="library-search">
        <span className="text-sm font-semibold text-navy">
          Filter by name
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Magnesium, zinc, ashwagandha…"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-navy outline-none focus:border-teal"
        />
      </label>

      {searchHits ? (
        <div className="mt-10">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Search results
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {searchHits.length} topic{searchHits.length === 1 ? "" : "s"} match
            “{query.trim()}”.
          </p>
          {searchHits.length === 0 ? (
            <p className="mt-6 text-base text-slate-600">
              No topics matched. Try a shorter name, or{" "}
              <button
                type="button"
                className="font-semibold text-teal hover:text-teal-dark"
                onClick={() => setQuery("")}
              >
                clear search
              </button>
              .
            </p>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {searchHits.map((topic) => (
                <TopicCard key={topic.topicKey} topic={topic} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-2">
            {groups.map((group) => (
              <a
                key={group.category}
                href={`#${group.category}`}
                className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-navy transition hover:border-teal hover:text-teal"
              >
                {group.label} ({group.topics.length})
              </a>
            ))}
          </div>

          <div className="mt-12 space-y-14">
            {groups.map((group) => {
              const large = group.topics.length >= LARGE_CATEGORY;
              const letters = large
                ? [
                    ...new Set(
                      group.topics.map((topic) => letterKey(topic.title)),
                    ),
                  ].sort((a, b) => a.localeCompare(b))
                : [];
              const activeLetter =
                letterByCategory[group.category] || letters[0] || "A";
              const visibleTopics = large
                ? group.topics.filter(
                    (topic) => letterKey(topic.title) === activeLetter,
                  )
                : group.topics;

              return (
                <div key={group.category} id={group.category}>
                  <h2 className="font-display text-3xl text-navy md:text-4xl">
                    {group.label}
                  </h2>
                  {group.description ? (
                    <p className="mt-2 max-w-2xl text-base text-slate-600">
                      {group.description}
                    </p>
                  ) : null}
                  {large ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {letters.map((letter) => (
                        <button
                          key={letter}
                          type="button"
                          onClick={() =>
                            setLetterByCategory((prev) => ({
                              ...prev,
                              [group.category]: letter,
                            }))
                          }
                          className={`min-h-9 min-w-9 rounded-lg border px-2 text-sm font-semibold transition ${
                            activeLetter === letter
                              ? "border-teal bg-teal text-white"
                              : "border-slate-200 bg-white text-navy hover:border-teal hover:text-teal"
                          }`}
                          aria-pressed={activeLetter === letter}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleTopics.map((topic) => (
                      <TopicCard key={topic.topicKey} topic={topic} />
                    ))}
                  </ul>
                  {large ? (
                    <p className="mt-3 text-sm text-slate-500">
                      Showing {visibleTopics.length} of {group.topics.length} in{" "}
                      {group.label} · letter {activeLetter}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      )}

      <details
        id="all-topics"
        className="mt-16 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6"
      >
        <summary className="cursor-pointer font-display text-2xl text-navy">
          Browse all {browse.length} topics
        </summary>
        <p className="mt-2 text-sm text-slate-600">
          A–Z by topic title. Combined themes open the hub; single topics open
          the education note.
        </p>
        <ul className="mt-6 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {browse.map((row) => (
            <li key={row.key} className="mb-2 break-inside-avoid">
              <Link
                href={row.href}
                className="text-sm font-medium text-teal hover:text-teal-dark"
              >
                {row.label}
                {row.note ? (
                  <span className="text-slate-500"> — {row.note}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function TopicCard({ topic }: { topic: LibraryBrowseTopic }) {
  return (
    <li>
      <Link
        href={topic.href}
        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal hover:shadow-sm md:p-5"
      >
        <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
          {topicBadge(topic)}
          {topic.mskRelevant ? (
            <span className="font-medium normal-case tracking-normal text-slate-500">
              {" "}
              · MSK
            </span>
          ) : null}
        </p>
        <h3 className="mt-2 font-display text-xl text-navy group-hover:text-teal-dark">
          {topic.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {topic.summary}
        </p>
        <span className="mt-3 text-sm font-semibold text-teal">
          {topic.ctaLabel}
        </span>
      </Link>
    </li>
  );
}
