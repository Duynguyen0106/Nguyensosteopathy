import type { GoogleReview } from "@/lib/google-reviews";
import { site } from "@/lib/site";

/** Word-boundary truncation for homepage quotes. */
export function truncateReviewText(text: string, maxChars = 220): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxChars) return cleaned;
  const slice = cleaned.slice(0, maxChars - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxChars * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
}

/** Absolute date label when publishTime is available. */
export function formatReviewDate(review: Pick<GoogleReview, "publishTime" | "relativeTime">): string {
  if (review.publishTime) {
    const date = new Date(review.publishTime);
    if (!Number.isNaN(date.getTime())) {
      const absolute = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
      return review.relativeTime
        ? `${absolute} · ${review.relativeTime}`
        : absolute;
    }
  }
  return review.relativeTime || "";
}

export const GOSC_REVIEW_DISCLAIMER =
  "Quotes from Google. Austin Duy Nguyen is a GOsC-registered osteopath (Reg. No. 12332) — not a UK medical doctor. Patient wording is their own.";

export const GOSC_REVIEW_DISCLAIMER_VI =
  "Trích dẫn từ Google. Austin Duy Nguyen là osteopath đăng ký GOsC (số 12332) — không phải bác sĩ y khoa tại Anh. Lời bệnh nhân giữ nguyên cách họ viết.";

/** FAQs unique to the reviews page (avoids duplicating /find-us FAQPage). */
export const reviewPageFaqs = [
  {
    question: "How do I leave a Google review?",
    answer: `After your visit, open our Google reviews link and share honest feedback — it helps Charlton neighbours choose care: ${site.googleReviewsUrl}`,
  },
  {
    question: "Are these reviews from Google?",
    answer:
      "Yes. Written quotes are pulled from our Google Business Profile (Google may show up to five texts here). The star rating and total rating count match the public Google listing.",
  },
] as const;
