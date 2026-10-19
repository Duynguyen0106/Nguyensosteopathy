import { ButtonLink } from "@/components/Button";
import { StarRating } from "@/components/StarRating";
import { getGooglePlaceReviews } from "@/lib/google-reviews";
import { site } from "@/lib/site";

function Stars({ rating }: { rating: number }) {
  return <StarRating rating={rating} />;
}

export async function GoogleReviewsFeed() {
  const google = await getGooglePlaceReviews();
  const mapsUrl = google.ok ? google.place.mapsUri : site.googleReviewsUrl;

  if (!google.ok) {
    return (
      <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            From Google
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            Read us on Google
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Live review cards are temporarily unavailable. You can still open
            our Google listing to read patient feedback, leave a review after
            your visit, or book online first.
          </p>
          {process.env.NODE_ENV === "development" ? (
            <p className="mt-3 text-xs text-slate-500">{google.reason}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Google reviews
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
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
          <div className="mt-8 border-l-2 border-teal/40 bg-white px-5 py-6">
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              Your Google listing is connected, but there are no public review
              texts to show yet. After your visit, a short Google review helps
              neighbours choose care in Woolwich.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave a Google review
              </ButtonLink>
              <ButtonLink href="/book" variant="secondary">
                Book online
              </ButtonLink>
            </div>
          </div>
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
