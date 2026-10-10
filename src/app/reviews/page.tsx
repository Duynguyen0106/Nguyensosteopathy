import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import {
  GoogleReviewsFeed,
  GoogleReviewsFeedFallback,
} from "@/components/GoogleReviewsFeed";
import { site, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Reviews | Osteopath Woolwich Google Feedback",
  description:
    "Read Google reviews and patient stories from Nguyen's Osteopathic Clinic in Woolwich. Share your experience after treatment with Austin Duy Nguyen, GOsC-registered osteopath.",
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
      "Google reviews and patient stories for osteopathy in Woolwich SE18.",
    url: "/reviews",
  },
};

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <p
      className="flex gap-0.5 text-teal"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${star < rounded ? "fill-current" : "fill-slate-200"}`}
          aria-hidden
        >
          <path d="M10 1.5 12.6 7l6 .5-4.5 4 1.4 5.8L10 14.8 4.5 17.3l1.4-5.8L1.4 7.5l6-.5L10 1.5Z" />
        </svg>
      ))}
    </p>
  );
}

export default function ReviewsPage() {
  const mapsUrl = site.googleReviewsUrl;

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Patient reviews — ${site.name}`,
    url: `${site.websiteUrl}/reviews`,
    about: {
      "@type": "MedicalBusiness",
      name: site.name,
      url: site.websiteUrl,
      telephone: site.phone,
    },
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
            Stories from people who sought clearer movement — and a warm
            invitation to leave your Google review after your visit.
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

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            What patients say
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            A sample of feedback shared with the clinic. For the latest public
            ratings, visit our{" "}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Google listing
            </a>
            .
          </p>

          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <li key={review.name} className="flex h-full flex-col">
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700">
                  “{review.quote}”
                </blockquote>
                <footer className="mt-5 border-t border-slate-200 pt-4">
                  <p className="font-semibold text-navy">{review.name}</p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-teal-dark uppercase">
                    {review.treatment}
                  </p>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
            <ButtonLink href="/opening" variant="secondary">
              Opening day offer
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
