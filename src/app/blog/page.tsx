import type { Metadata } from "next";
import Link from "next/link";
import { BlogDirectory } from "@/components/BlogDirectory";
import { ButtonLink } from "@/components/Button";
import {
  getAllPostCards,
  getPostsGroupedByCategory,
} from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopathy Blog | Woolwich Advice & Guides",
  description:
    "Osteopathy blog for Woolwich and SE18: back pain treatment, neck pain treatment, shockwave therapy, sports rehab, pregnancy, men’s health, and clinic guides from Nguyen's Osteopathic Clinic.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: `${site.websiteUrl}/blog` },
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
    url: `${site.websiteUrl}/blog`,
  },
};

export default function BlogIndexPage() {
  const groups = getPostsGroupedByCategory();
  const allPosts = getAllPostCards();
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
      itemListElement: allPosts.map((post, index) => ({
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
            <Link href="/services/focused-shockwave" className="font-semibold text-teal hover:text-teal-dark">
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

        {/* Server-rendered plain index — always in HTML for crawlers, independent of client filters */}
        <nav
          aria-label="Complete blog article index"
          className="mt-16 border-t border-slate-200 pt-12"
        >
          <h2 className="font-display text-3xl text-navy">All articles</h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600">
            Full index of every guide on this blog — grouped by topic for easy
            browsing and discovery.
          </p>
          <div className="mt-8 space-y-10">
            {groups.map((group) => (
              <section key={group.id} id={`index-${group.id}`}>
                <h3 className="text-sm font-semibold tracking-[0.16em] text-teal uppercase">
                  {group.category}
                </h3>
                <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
                  {group.posts.map((post) => (
                    <li key={post.slug} className="break-inside-avoid py-1.5">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-base font-medium text-navy underline-offset-2 hover:text-teal hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </nav>

        <noscript>
          <nav aria-label="Blog articles without JavaScript">
            <h2>All blog articles</h2>
            <ul>
              {allPosts.map((post) => (
                <li key={`noscript-${post.slug}`}>
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </noscript>

        <div className="mt-14 border border-teal/25 bg-teal/5 px-6 py-8 text-center md:px-10">
          <h2 className="font-display text-3xl text-navy">
            Ready to be assessed in clinic?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Book online or call {site.phone}. Inside St James Pharmacy, Woolwich
            — {site.booking.shortNote}
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
