import { ButtonLink } from "@/components/Button";
import { getGooglePlaceReviews } from "@/lib/google-reviews";
import { site } from "@/lib/site";

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

export async function GoogleReviewsFeed() {
  const google = await getGooglePlaceReviews();
  const mapsUrl = google.ok ? google.place.mapsUri : site.googleReviewsUrl;

  if (!google.ok) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <section className="border-b border-slate-200 px-5 py-10 md:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-5 text-sm text-amber-950">
          <p className="font-semibold">Google reviews feed not live yet</p>
          <p className="mt-2 leading-relaxed">
            API key is saved, but Google is rejecting Places requests. Enable{" "}
            <strong>Places API (New)</strong>, turn on billing, and restrict
            this server key by <strong>API only</strong> (not HTTP referrers).
          </p>
          <p className="mt-2 text-xs text-amber-900/80">{google.reason}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              From Google
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Latest Google reviews
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Pulled from Google Maps for {google.place.name}. Google may show
              up to five reviews here.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            {google.place.rating ? (
              <p className="text-sm font-semibold text-navy">
                {google.place.rating.toFixed(1)} / 5
                {google.place.userRatingCount
                  ? ` · ${google.place.userRatingCount} ratings`
                  : ""}
              </p>
            ) : null}
            <ButtonLink
              href={mapsUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open on Google
            </ButtonLink>
          </div>
        </div>

        {google.place.reviews.length > 0 ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {google.place.reviews.map((review) => (
              <li
                key={`${review.authorName}-${review.publishTime || review.relativeTime}-${review.text.slice(0, 24)}`}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 md:text-base">
                  “{review.text}”
                </blockquote>
                <footer className="mt-5 border-t border-slate-100 pt-4">
                  <p className="font-semibold text-navy">{review.authorName}</p>
                  {review.relativeTime ? (
                    <p className="mt-1 text-xs text-slate-500">
                      {review.relativeTime}
                    </p>
                  ) : null}
                </footer>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-xl border border-dashed border-slate-200 bg-white px-5 py-6 text-sm text-slate-600">
            Your Google listing is connected, but there are no public review
            texts to show yet.{" "}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Open the listing on Google
            </a>{" "}
            once patients start leaving feedback.
          </p>
        )}

        <p className="mt-8 text-xs text-slate-500">
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
    </section>
  );
}

export function GoogleReviewsFeedFallback() {
  return (
    <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-28 rounded bg-slate-200" />
        <div className="mt-4 h-9 w-72 max-w-full rounded bg-slate-200" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-48 rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
