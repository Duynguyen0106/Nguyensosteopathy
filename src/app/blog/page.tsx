import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopathy Blog | Woolwich Advice & Guides",
  description:
    "Practical osteopathy guides for Woolwich and SE18: back pain, desk neck, shockwave therapy, first visits, sports injury, and men’s health — from Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Osteopathy Blog | Woolwich Advice & Guides",
    description:
      "Local osteopathy articles to help Woolwich patients understand pain, treatment options, and how to book.",
    url: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-slate-50 pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Clinic blog
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Osteopathy advice for Woolwich
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Clear, practical guides from {site.practitioner.name} at {site.name}.
          Written to help local patients understand symptoms, treatment options,
          and when to book.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <ul className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                  {post.category}
                </span>
                <h2 className="mt-3 font-display text-2xl text-navy md:text-[1.65rem]">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-base">
                  {post.description}
                </p>
                <p className="mt-5 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {post.readingMinutes} min read ·{" "}
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-xl border border-teal/25 bg-teal/5 px-6 py-8 text-center md:px-10">
          <h2 className="font-display text-3xl text-navy">
            Ready to be assessed in clinic?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Book online or call {site.phone}. Inside St James Pharmacy, Woolwich
            — Mon, Tue, Thu, Fri 9:00am–6:00pm · Sat 9:00am–5:30pm · Closed Wed &
            Sun.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
