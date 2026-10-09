"use client";

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
};

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col border-b border-slate-200 pb-5 transition-colors hover:border-teal md:border md:border-slate-200 md:bg-white md:p-5 md:pb-5 md:hover:border-teal"
    >
      <h3 className="font-display text-xl text-navy md:text-[1.35rem]">
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
    </Link>
  );
}

export function BlogDirectory({ groups }: Props) {
  const [active, setActive] = useState<"all" | BlogCategory>("all");

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

  const visible = useMemo(() => {
    if (active === "all") return groups;
    return groups.filter((group) => group.category === active);
  }, [active, groups]);

  const total = groups.reduce((sum, group) => sum + group.posts.length, 0);

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-5 border-y border-slate-200 bg-slate-50/95 px-5 py-3 backdrop-blur md:mx-0 md:rounded-xl md:border md:px-4">
        <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Browse by topic · {total} articles
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`shrink-0 px-3 py-1.5 text-sm font-semibold transition-colors ${
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
              onClick={() => setActive(group.category)}
              className={`shrink-0 px-3 py-1.5 text-sm font-semibold transition-colors ${
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
        {visible.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-28">
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
                  onClick={() => setActive(group.category)}
                  className="text-sm font-semibold text-teal hover:text-teal-dark"
                >
                  View only
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActive("all")}
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
        ))}
      </div>

      {/* Keep category anchors usable when filtering */}
      {active !== "all" ? null : (
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
