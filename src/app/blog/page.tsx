import type { Metadata } from "next";
import { BlogDirectory } from "@/components/BlogDirectory";
import { ButtonLink } from "@/components/Button";
import { getPostsGroupedByCategory } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopathy Blog | Woolwich Advice & Guides",
  description:
    "Practical osteopathy guides for Woolwich and SE18 organised by topic: back & neck, shockwave, sports rehab, pregnancy, men’s health, and more — from Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Osteopathy Blog | Woolwich Advice & Guides",
    description:
      "Local osteopathy articles organised by service topic to help Woolwich patients understand pain, treatment options, and how to book.",
    url: "/blog",
  },
};

export default function BlogIndexPage() {
  const groups = getPostsGroupedByCategory();

  return (
    <div className="bg-slate-50 pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Clinic blog
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Osteopathy advice for Woolwich
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Clear guides from {site.practitioner.name} at {site.name}, organised
          by the care we offer — from first visits and back pain to shockwave,
          pregnancy support, and specialist pathways.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <BlogDirectory groups={groups} />

        <div className="mt-14 border border-teal/25 bg-teal/5 px-6 py-8 text-center md:px-10">
          <h2 className="font-display text-3xl text-navy">
            Ready to be assessed in clinic?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Book online or call {site.phone}. Inside St James Pharmacy, Woolwich
            — Mon–Fri 9:00am–6:00pm, Sat 9:00am–5:30pm.
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
