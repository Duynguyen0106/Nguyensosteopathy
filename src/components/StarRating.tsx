/** Accessible star rating display (WCAG: role=img + accessible name). */
export function StarRating({
  rating,
  className = "flex gap-0.5 text-teal",
}: {
  rating: number;
  className?: string;
}) {
  const rounded = Math.round(rating);

  return (
    <p className={className} role="img" aria-label={`${rating} out of 5 stars`}>
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
