import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { ReviewAttribution } from "@/components/ReviewAttribution";
import { StarRating } from "@/components/StarRating";
import { getGooglePlaceReviews } from "@/lib/google-reviews";
import { formatReviewDate, truncateReviewText } from "@/lib/review-display";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

/** Compact homepage social proof — rating count + up to two Google quotes. */
export async function HomeReviewsTeaser() {
  const google = await getGooglePlaceReviews();
  const mapsUrl = google.ok ? google.place.mapsUri : site.googleReviewsUrl;

  if (!google.ok) {
    return (
      <div className="mt-10">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy px-5 py-6 text-white md:flex-row md:items-center md:px-8">
          <div>
            <p className="font-display text-2xl">Find us on Google</p>
            <p className="mt-1 text-sm text-white/75">
              Live review cards are temporarily unavailable. You can still open
              our Google listing to read public ratings, or book online first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={bookHref("reviews")}>Book online</ButtonLink>
            <ButtonLink
              href={mapsUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              See Google reviews
            </ButtonLink>
            <ButtonLink href="/reviews" variant="secondary">
              Reviews page
            </ButtonLink>
          </div>
        </div>
        <ReviewAttribution />
      </div>
    );
  }

  const quotes = google.place.reviews.slice(0, 2);
  const hasRating = typeof google.place.rating === "number";
  const count = google.place.userRatingCount;

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {hasRating ? (
            <>
              <StarRating rating={google.place.rating!} />
              <p className="text-sm font-semibold text-navy">
                {google.place.rating!.toFixed(1)} / 5
                {count
                  ? ` · ${count.toLocaleString("en-GB")} Google ratings`
                  : " on Google"}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold text-navy">Google reviews</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={mapsUrl}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            See Google reviews
          </ButtonLink>
          <ButtonLink href="/reviews" variant="secondary">
            All reviews
          </ButtonLink>
        </div>
      </div>

      {quotes.length > 0 ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {quotes.map((review) => {
            const dateLabel = formatReviewDate(review);
            const body = truncateReviewText(review.text);
            return (
              <li
                key={`${review.authorName}-${review.publishTime || review.relativeTime}-${review.text.slice(0, 24)}`}
                className="flex h-full flex-col border-l-2 border-teal/40 pl-5"
              >
                <StarRating rating={review.rating} />
                <blockquote
                  cite={review.authorUri || mapsUrl}
                  className="mt-3 flex-1 text-base leading-relaxed text-slate-700"
                >
                  “{body}”
                </blockquote>
                {body.endsWith("…") ? (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-sm font-semibold text-teal hover:text-teal-dark"
                  >
                    Read more on Google
                  </a>
                ) : null}
                <footer className="mt-4 flex items-center gap-3">
                  {review.profilePhotoUri ? (
                    <Image
                      src={review.profilePhotoUri}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                      unoptimized
                    />
                  ) : null}
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {review.authorUri ? (
                        <a
                          href={review.authorUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-teal"
                        >
                          {review.authorName}
                        </a>
                      ) : (
                        review.authorName
                      )}
                    </p>
                    {dateLabel ? (
                      <p className="mt-0.5 text-xs text-slate-500">{dateLabel}</p>
                    ) : null}
                  </div>
                </footer>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-8 flex flex-col gap-4 border-l-2 border-teal/40 pl-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-slate-600">
            {hasRating && count
              ? `Google shows ${google.place.rating!.toFixed(1)} / 5 from ${count.toLocaleString("en-GB")} ratings. Written quotes are not available to display yet — open Google to read the full listing.`
              : "No public Google quotes to show yet. Book a visit, then leave a review to help neighbours find care in Charlton."}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={bookHref("reviews")}>Book online</ButtonLink>
            <ButtonLink
              href={mapsUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a Google review
            </ButtonLink>
          </div>
        </div>
      )}

      <ReviewAttribution />
    </div>
  );
}

export function HomeReviewsTeaserFallback() {
  return (
    <div className="mt-10 animate-pulse">
      <div className="h-5 w-48 rounded bg-slate-200" />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="h-36 rounded-lg bg-slate-100" />
        <div className="h-36 rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}
