import type { Metadata } from "next";
import Link from "next/link";
import { BlogDirectory } from "@/components/BlogDirectory";
import { ButtonLink } from "@/components/Button";
import {
  getAllPosts,
  getPostsGroupedByCategory,
} from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopathy Blog | Woolwich Advice & Guides",
  description:
    "Osteopathy blog for Woolwich and SE18: back pain treatment, neck pain treatment, shockwave therapy, sports rehab, pregnancy, men’s health, and clinic guides from Nguyen's Osteopathic Clinic.",
  alternates: { canonical: "/blog" },
  keywords: [
    "osteopathy blog Woolwich",
    "back pain treatment Woolwich",
    "neck pain treatment SE18",
    "shockwave therapy London",
    "osteopath advice Greenwich",
    "drug free pain relief",
  ],
  openGraph: {
    title: "Osteopathy Blog | Woolwich Advice & Guides",
    description:
      "Local osteopathy articles organised by topic — practical guides for pain, treatment options, and booking at Nguyen's Osteopathic Clinic.",
    url: "/blog",
  },
};

export default function BlogIndexPage() {
  const groups = getPostsGroupedByCategory();
  const allPosts = getAllPosts();
  const featured = allPosts.slice(0, 4);
  const total = allPosts.length;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Osteopathy Blog | Woolwich Advice & Guides",
    description:
      "Practical osteopathy guides for Woolwich and South East London, organised by clinic service topics.",
    url: `${site.websiteUrl}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.websiteUrl,
    },
    about: {
      "@type": "MedicalBusiness",
      name: site.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${site.address.venue}, ${site.address.line1}`,
        addressLocality: "Woolwich",
        postalCode: "SE18 6LQ",
        addressCountry: "GB",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total,
      itemListElement: allPosts.slice(0, 20).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${site.websiteUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <section className="hero-wash border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Clinic blog · {total} articles
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Osteopathy advice for Woolwich and SE18
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Clear guides from {site.practitioner.name} at {site.name} — covering
            osteopathy, back pain treatment, neck pain treatment, shockwave
            therapy, sports rehab, pregnancy support, and how to book inside St
            James Pharmacy.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              View services
            </ButtonLink>
            <ButtonLink href="/feed.xml" variant="secondary">
              RSS feed
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-slate-600">
            Also explore:{" "}
            <Link href="/conditions" className="font-semibold text-teal hover:text-teal-dark">
              Conditions
            </Link>
            {" · "}
            <Link href="/shockwave" className="font-semibold text-teal hover:text-teal-dark">
              Shockwave
            </Link>
            {" · "}
            <Link href="/areas" className="font-semibold text-teal hover:text-teal-dark">
              Areas we serve
            </Link>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <BlogDirectory groups={groups} featured={featured} />

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
