"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { BlogCategory, BlogPost } from "@/lib/blog";
import { categoryToId } from "@/lib/blog";

type Group = {
  category: BlogCategory;
  id: string;
  posts: BlogPost[];
};

type Props = {
  groups: Group[];
  featured: BlogPost[];
};

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden border-b border-slate-200 pb-5 transition-colors hover:border-teal md:border md:border-slate-200 md:bg-white md:pb-0 md:hover:border-teal"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100 md:aspect-[16/10]">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col md:p-5">
        <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-teal uppercase md:mt-0">
          {post.category}
        </p>
        <h3 className="mt-2 font-display text-xl text-navy md:text-[1.35rem]">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {post.description}
        </p>
        <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          {post.readingMinutes} min read ·{" "}
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden border border-slate-200 bg-white transition hover:border-teal md:grid-cols-[1.15fr_1fr]"
    >
      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px]">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-col justify-center p-6 md:p-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">
          Featured · {post.category}
        </p>
        <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
          {post.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {post.description}
        </p>
        <p className="mt-5 text-sm font-semibold text-teal group-hover:text-teal-dark">
          Read article →
        </p>
      </div>
    </Link>
  );
}

export function BlogDirectory({ groups, featured }: Props) {
  const [active, setActive] = useState<"all" | BlogCategory>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const match = groups.find((group) => group.id === hash);
    if (!match) return;
    setActive(match.category);
    requestAnimationFrame(() => {
      document.getElementById(match.id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [groups]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    const base = active === "all" ? groups : groups.filter((g) => g.category === active);
    if (!normalizedQuery) return base;

    return base
      .map((group) => ({
        ...group,
        posts: group.posts.filter((post) => {
          const haystack = [
            post.title,
            post.description,
            post.category,
            ...post.keywords,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        }),
      }))
      .filter((group) => group.posts.length > 0);
  }, [active, groups, normalizedQuery]);

  const total = groups.reduce((sum, group) => sum + group.posts.length, 0);
  const visibleCount = filteredGroups.reduce(
    (sum, group) => sum + group.posts.length,
    0,
  );

  const selectCategory = (category: "all" | BlogCategory) => {
    setActive(category);
    if (category === "all") {
      window.history.replaceState(null, "", "/blog");
      return;
    }
    const id = categoryToId(category);
    window.history.replaceState(null, "", `/blog#${id}`);
  };

  return (
    <div>
      {featured.length > 0 && active === "all" && !normalizedQuery ? (
        <div className="mb-12 space-y-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Start here
          </p>
          <FeaturedCard post={featured[0]} />
          {featured.length > 1 ? (
            <ul className="grid gap-6 md:grid-cols-3">
              {featured.slice(1, 4).map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="sticky top-[4.5rem] z-10 -mx-5 border-y border-slate-200 bg-slate-50/95 px-5 py-3 backdrop-blur md:top-[5.25rem] md:mx-0 md:rounded-xl md:border md:px-4">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Browse by topic · {total} articles
            {normalizedQuery || active !== "all"
              ? ` · showing ${visibleCount}`
              : ""}
          </p>
          <label className="block w-full sm:max-w-xs">
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none ring-teal/30 placeholder:text-slate-400 focus:ring-2"
            />
          </label>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => selectCategory("all")}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              active === "all"
                ? "bg-navy text-white"
                : "bg-white text-navy ring-1 ring-slate-200 hover:ring-teal"
            }`}
          >
            All
          </button>
          {groups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => selectCategory(group.category)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                active === group.category
                  ? "bg-navy text-white"
                  : "bg-white text-navy ring-1 ring-slate-200 hover:ring-teal"
              }`}
            >
              {group.category}
              <span className="ml-1.5 text-xs font-medium opacity-70">
                {group.posts.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-14">
        {filteredGroups.length === 0 ? (
          <div className="border border-slate-200 bg-white px-6 py-10 text-center">
            <p className="font-display text-2xl text-navy">No articles found</p>
            <p className="mt-2 text-slate-600">
              Try another search term, or browse all topics.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                selectCategory("all");
              }}
              className="mt-5 text-sm font-semibold text-teal hover:text-teal-dark"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-36">
              <div className="flex items-end justify-between gap-4 border-b border-navy/15 pb-3">
                <div>
                  <h2 className="font-display text-3xl text-navy md:text-4xl">
                    {group.category}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {group.posts.length}{" "}
                    {group.posts.length === 1 ? "article" : "articles"}
                  </p>
                </div>
                {active === "all" ? (
                  <button
                    type="button"
                    onClick={() => selectCategory(group.category)}
                    className="text-sm font-semibold text-teal hover:text-teal-dark"
                  >
                    View only
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => selectCategory("all")}
                    className="text-sm font-semibold text-teal hover:text-teal-dark"
                  >
                    Show all topics
                  </button>
                )}
              </div>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.posts.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      {active !== "all" || normalizedQuery ? null : (
        <nav className="sr-only" aria-label="Blog categories">
          {groups.map((group) => (
            <a key={group.id} href={`#${categoryToId(group.category)}`}>
              {group.category}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
