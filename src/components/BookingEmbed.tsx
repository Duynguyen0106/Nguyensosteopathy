"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const MIN_HEIGHT = 980;
const MOBILE_MIN_HEIGHT = 1280;

export function BookingEmbed() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const syncHeight = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setHeight((current) =>
        Math.max(current, isMobile ? MOBILE_MIN_HEIGHT : MIN_HEIGHT),
      );
    };
    syncHeight();
    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://treow-clinic.vercel.app") return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      const next =
        typeof data.height === "number"
          ? data.height
          : typeof data.frameHeight === "number"
            ? data.frameHeight
            : null;
      if (next && next > 400) {
        setHeight(Math.max(next + 24, MIN_HEIGHT));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      className="booking-embed-shell relative overflow-hidden bg-white md:rounded-2xl md:border md:border-slate-200 md:shadow-[0_20px_50px_rgba(11,44,69,0.06)]"
      style={{ minHeight: `${height}px` }}
    >
      {!loaded ? (
        <div
          className="absolute inset-0 z-10 flex flex-col gap-4 bg-slate-50 p-6"
          aria-hidden
        >
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-4 h-40 w-full animate-pulse rounded-xl bg-slate-200" />
          <p className="text-sm font-medium text-slate-500">
            Loading booking calendar…
          </p>
        </div>
      ) : null}
      <iframe
        ref={frameRef}
        src={site.bookingEmbedUrl}
        title="Book an appointment with Nguyen's Osteopathic Clinic"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        className="relative z-20 block w-full border-0 bg-white"
        style={{ height: `${height}px`, minHeight: `${height}px` }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
