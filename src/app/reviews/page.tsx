import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import {
  GoogleReviewsFeed,
  GoogleReviewsFeedFallback,
} from "@/components/GoogleReviewsFeed";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Read Google reviews for Nguyen's Osteopathic Clinic in Woolwich. Share your experience after treatment with Austin Duy Nguyen, GOsC-registered osteopath.",
  alternates: { canonical: "/reviews" },
  keywords: [
    "osteopath Woolwich reviews",
    "Nguyen's Osteopathic Clinic Google reviews",
    "osteopath SE18 feedback",
    "Austin Duy Nguyen reviews",
  ],
  openGraph: {
    title: "Patient Reviews | Nguyen's Osteopathic Clinic",
    description:
      "Google reviews for osteopathy in Woolwich SE18.",
    url: "/reviews",
    images: [defaultOgImage],
  },
};

export default function ReviewsPage() {
  const mapsUrl = site.googleReviewsUrl;

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Patient reviews — ${site.name}`,
    url: `${site.websiteUrl}/reviews`,
    about: { "@id": `${site.websiteUrl}/#clinic` },
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="opening-hero-copy text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="opening-hero-copy opening-hero-delay-1 mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Patient reviews
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Public Google feedback for the clinic — and a warm invitation to
            leave your review after your visit.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={mapsUrl} target="_blank" rel="noopener noreferrer">
              See Google reviews
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-navy px-5 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl md:text-3xl">
              Been to the clinic? Your review helps neighbours find care.
            </p>
            <p className="mt-2 text-sm text-white/75 md:text-base">
              Honest Google feedback helps Woolwich locals choose an osteopath
              they can trust — especially the Vietnamese community looking for
              someone who understands.
            </p>
          </div>
          <ButtonLink
            href={mapsUrl}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            Leave a Google review
          </ButtonLink>
        </div>
      </section>

      <Suspense fallback={<GoogleReviewsFeedFallback />}>
        <GoogleReviewsFeed />
      </Suspense>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-navy">
              Ready for your first visit?
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Book online, or{" "}
              <Link
                href="/contact"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                contact us
              </Link>{" "}
              if you have a question before you reserve a time.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book">Book an appointment</ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              View fees
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
