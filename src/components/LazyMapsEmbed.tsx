"use client";

import { useEffect, useRef, useState } from "react";

/** Loads the Google Maps iframe only when near the viewport. */
export function LazyMapsEmbed({
  src,
  title,
  className = "h-[320px] w-full border-0 md:h-[420px]",
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || active) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div ref={hostRef} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
      {active ? (
        <iframe
          title={title}
          src={src}
          className={className}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div
          className={`flex items-center justify-center bg-slate-100 text-sm font-medium text-slate-500 ${className}`}
          role="status"
        >
          Loading map…
        </div>
      )}
    </div>
  );
}
