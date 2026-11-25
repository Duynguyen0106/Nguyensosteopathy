import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { ReviewAttribution } from "@/components/ReviewAttribution";
import { StarRating } from "@/components/StarRating";
import { getGooglePlaceReviews } from "@/lib/google-reviews";
import { formatReviewDate } from "@/lib/review-display";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export async function GoogleReviewsFeed({
  locale = "en",
}: {
  locale?: "en" | "vi";
}) {
  const google = await getGooglePlaceReviews();
  const mapsUrl = google.ok ? google.place.mapsUri : site.googleReviewsUrl;
  const isVi = locale === "vi";

  if (!google.ok) {
    return (
      <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            {isVi ? "Từ Google" : "From Google"}
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            {isVi ? "Đọc đánh giá trên Google" : "Read us on Google"}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {isVi
              ? "Thẻ đánh giá trực tiếp tạm thời không khả dụng. Bạn vẫn có thể mở trang Google để đọc phản hồi, để lại đánh giá sau buổi khám, hoặc đặt lịch trước."
              : "Live review cards are temporarily unavailable. You can still open our Google listing to read patient feedback, leave a review after your visit, or book online first."}
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
              {isVi ? "Mở Google reviews" : "Open Google reviews"}
            </ButtonLink>
            <ButtonLink href={bookHref("reviews")} variant="secondary">
              {isVi ? "Đặt lịch" : "Book online"}
            </ButtonLink>
          </div>
          <ReviewAttribution locale={locale} />
        </div>
      </section>
    );
  }

  const hasRating = typeof google.place.rating === "number";
  const count = google.place.userRatingCount;

  return (
    <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              {isVi ? "Từ Google" : "From Google"}
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              {isVi ? "Đánh giá Google gần đây" : "Latest Google reviews"}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              {isVi
                ? `Lấy từ Google Maps cho ${google.place.name}. Google có thể hiển thị tối đa năm bài viết ở đây — tổng số sao và số lượt đánh giá khớp listing công khai.`
                : `Pulled from Google Maps for ${google.place.name}. Google may show up to five written reviews here — the star rating and total count match the public listing.`}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            {hasRating ? (
              <>
                <StarRating rating={google.place.rating!} />
                <p className="text-sm font-semibold text-navy">
                  {google.place.rating!.toFixed(1)} / 5
                  {count
                    ? ` · ${count.toLocaleString("en-GB")} ${isVi ? "lượt đánh giá" : "ratings"}`
                    : ""}
                </p>
              </>
            ) : null}
            <ButtonLink
              href={mapsUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isVi ? "Mở trên Google" : "Open on Google"}
            </ButtonLink>
          </div>
        </div>

        {google.place.reviews.length > 0 ? (
          <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {google.place.reviews.map((review) => {
              const dateLabel = formatReviewDate(review);
              return (
                <li
                  key={`${review.authorName}-${review.publishTime || review.relativeTime}-${review.text.slice(0, 24)}`}
                  className="flex h-full flex-col border-l-2 border-teal/40 pl-5"
                >
                  <StarRating rating={review.rating} />
                  <blockquote
                    cite={review.authorUri || mapsUrl}
                    className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 md:text-base"
                  >
                    “{review.text}”
                  </blockquote>
                  <footer className="mt-5 flex items-center gap-3">
                    {review.profilePhotoUri ? (
                      <Image
                        src={review.profilePhotoUri}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                        unoptimized
                      />
                    ) : null}
                    <div>
                      <p className="font-semibold text-navy">
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
                        <p className="mt-1 text-xs text-slate-500">
                          {dateLabel}
                        </p>
                      ) : null}
                    </div>
                  </footer>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-8 border-l-2 border-teal/40 bg-white px-5 py-6">
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              {hasRating && count
                ? isVi
                  ? `Google ghi ${google.place.rating!.toFixed(1)} / 5 từ ${count.toLocaleString("en-GB")} lượt đánh giá. Chưa có đoạn chữ công khai để hiển thị — mở Google để xem listing đầy đủ.`
                  : `Google shows ${google.place.rating!.toFixed(1)} / 5 from ${count.toLocaleString("en-GB")} ratings. Written quotes are not available to display yet — open Google for the full listing.`
                : isVi
                  ? "Listing Google đã kết nối nhưng chưa có đoạn đánh giá chữ để hiển thị. Sau buổi khám, một đánh giá ngắn giúp hàng xóm chọn dịch vụ tại Charlton."
                  : "Your Google listing is connected, but there are no public review texts to show yet. After your visit, a short Google review helps neighbours choose care in Charlton."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isVi ? "Để lại đánh giá Google" : "Leave a Google review"}
              </ButtonLink>
              <ButtonLink href={bookHref("reviews")} variant="secondary">
                {isVi ? "Đặt lịch" : "Book online"}
              </ButtonLink>
            </div>
          </div>
        )}

        <ReviewAttribution locale={locale} />
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
            <div key={item} className="h-48 border-l-2 border-slate-200 pl-5" />
          ))}
        </div>
      </div>
    </section>
  );
}
