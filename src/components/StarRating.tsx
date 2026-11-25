/** Accessible star rating with half-star fill (matches toFixed(1) labels). */
export function StarRating({
  rating,
  className = "flex gap-0.5 text-teal",
}: {
  rating: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, rating));
  const label = `${clamped.toFixed(1)} out of 5 stars`;

  return (
    <p className={className} role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, star) => {
        const fill = Math.max(0, Math.min(1, clamped - star));
        return (
          <span key={star} className="relative inline-block h-4 w-4">
            <svg
              viewBox="0 0 20 20"
              className="absolute inset-0 h-4 w-4 fill-slate-200"
              aria-hidden={true}
            >
              <path d="M10 1.5 12.6 7l6 .5-4.5 4 1.4 5.8L10 14.8 4.5 17.3l1.4-5.8L1.4 7.5l6-.5L10 1.5Z" />
            </svg>
            {fill > 0 ? (
              <svg
                viewBox="0 0 20 20"
                className="absolute inset-0 h-4 w-4 fill-current"
                aria-hidden={true}
                style={{
                  clipPath:
                    fill >= 1
                      ? undefined
                      : `inset(0 ${Math.round((1 - fill) * 100)}% 0 0)`,
                }}
              >
                <path d="M10 1.5 12.6 7l6 .5-4.5 4 1.4 5.8L10 14.8 4.5 17.3l1.4-5.8L1.4 7.5l6-.5L10 1.5Z" />
              </svg>
            ) : null}
          </span>
        );
      })}
    </p>
  );
}
