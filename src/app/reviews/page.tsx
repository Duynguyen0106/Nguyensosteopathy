import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import {
  GoogleReviewsFeed,
  GoogleReviewsFeedFallback,
} from "@/components/GoogleReviewsFeed";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import {
  bookHref,
  localPackFaqs,
  reviewAskWhatsAppHref,
} from "@/lib/seo-strategy";
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
      "Read Google reviews for Nguyen's Osteopathic Clinic in Woolwich SE18, and share your visit after treatment with Austin Duy Nguyen.",
    url: "/reviews",
    images: [defaultOgImage],
  },
};

export default function ReviewsPage() {
  const mapsUrl = site.googleReviewsUrl;
  const reviewAsk = reviewAskWhatsAppHref();

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Patient reviews — ${site.name}`,
    url: `${site.websiteUrl}/reviews`,
    about: { "@id": `${site.websiteUrl}/#clinic` },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localPackFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
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
            <ButtonLink href={bookHref("reviews")} variant="secondary">
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
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={mapsUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a Google review
            </ButtonLink>
            <ButtonLink
              href={reviewAsk}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share ask on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            How to leave a review
          </h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            <li>
              <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                01
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                Open our{" "}
                <a
                  href={mapsUrl}
                  className="font-semibold text-teal hover:text-teal-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google reviews
                </a>{" "}
                link after your visit.
              </p>
            </li>
            <li>
              <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                02
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                Share what helped — back pain, desk neck, shockwave, or simply
                being heard in Vietnamese or English.
              </p>
            </li>
            <li>
              <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                03
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                Prefer to send the link to yourself? Use{" "}
                <a
                  href={reviewAsk}
                  className="font-semibold text-teal hover:text-teal-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>{" "}
                with a prefilled message.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <Suspense fallback={<GoogleReviewsFeedFallback />}>
        <GoogleReviewsFeed />
      </Suspense>

      <section className="border-t border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Questions locals ask before booking
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {localPackFaqs.slice(0, 6).map((item) => (
              <li key={item.question}>
                <h3 className="text-lg font-semibold text-navy">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.answer}
                </p>
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
            <ButtonLink href={bookHref("reviews")}>
              Book an appointment
            </ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              View fees
            </ButtonLink>
          </div>
        </div>
      </section>

      <TopicClusterNav clusterId="access" />
    </div>
  );
}
