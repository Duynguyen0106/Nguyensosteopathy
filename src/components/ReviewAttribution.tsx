import {
  GOSC_REVIEW_DISCLAIMER,
  GOSC_REVIEW_DISCLAIMER_VI,
} from "@/lib/review-display";

/** Short compliance line beside republished Google quotes. */
export function ReviewAttribution({
  locale = "en",
  className = "mt-6 text-xs leading-relaxed text-slate-500",
}: {
  locale?: "en" | "vi";
  className?: string;
}) {
  const text =
    locale === "vi" ? GOSC_REVIEW_DISCLAIMER_VI : GOSC_REVIEW_DISCLAIMER;

  return (
    <p className={className}>
      {text}{" "}
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
  );
}
