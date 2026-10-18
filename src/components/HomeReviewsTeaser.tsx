import { ButtonLink } from "@/components/Button";
import { StarRating } from "@/components/StarRating";
import { getGooglePlaceReviews } from "@/lib/google-reviews";
import { site } from "@/lib/site";

/** Compact homepage social proof — rating + up to two Google quotes. */
export async function HomeReviewsTeaser() {
  const google = await getGooglePlaceReviews();
  const mapsUrl = google.ok ? google.place.mapsUri : site.googleReviewsUrl;

  if (!google.ok) {
    return (
      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy px-5 py-6 text-white md:flex-row md:items-center md:px-8">
        <div>
          <p className="font-display text-2xl">Find us on Google</p>
          <p className="mt-1 text-sm text-white/75">
            Read public ratings, or share your visit to help neighbours find care
            in Woolwich.
          </p>
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
            Reviews page
          </ButtonLink>
        </div>
      </div>
    );
  }

  const quotes = google.place.reviews.slice(0, 2);

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {google.place.rating ? (
            <>
              <StarRating rating={google.place.rating} />
              <p className="text-sm font-semibold text-navy">
                {google.place.rating.toFixed(1)} / 5
                {google.place.userRatingCount
                  ? ` · ${google.place.userRatingCount} Google ratings`
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
          {quotes.map((review) => (
            <li
              key={`${review.authorName}-${review.publishTime || review.relativeTime}-${review.text.slice(0, 24)}`}
              className="flex h-full flex-col border-l-2 border-teal/40 pl-5"
            >
              <StarRating rating={review.rating} />
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-slate-700">
                “{review.text.length > 220
                  ? `${review.text.slice(0, 217).trimEnd()}…`
                  : review.text}
                ”
              </blockquote>
              <footer className="mt-4">
                <p className="text-sm font-semibold text-navy">
                  {review.authorName}
                </p>
                {review.relativeTime ? (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {review.relativeTime}
                  </p>
                ) : null}
              </footer>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-6 text-xs text-slate-500">
        Reviews from Google.{" "}
        <a
          href="https://developers.google.com/maps/documentation/places/web-service/policies"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline"
        >
          Google Maps Platform attribution
        </a>
        .
      </p>
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
