"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";

const MIN_HEIGHT = 900;
const MOBILE_MIN_HEIGHT = 960;
const LOAD_TIMEOUT_MS = 20000;

function embedOrigin(url: string) {
  try {
    return new URL(url).origin;
  } catch {
    return "https://treow-clinic.vercel.app";
  }
}

function floorHeight(next: number) {
  if (typeof window === "undefined") return Math.max(next, MIN_HEIGHT);
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  return Math.max(next, isMobile ? MOBILE_MIN_HEIGHT : MIN_HEIGHT);
}

export function BookingEmbed() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const allowedOrigin = useMemo(
    () => embedOrigin(site.bookingEmbedUrl),
    [],
  );

  useEffect(() => {
    const syncHeight = () => {
      setHeight((current) => floorHeight(current));
    };
    syncHeight();
    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== allowedOrigin) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      const next =
        typeof data.height === "number"
          ? data.height
          : typeof data.frameHeight === "number"
            ? data.frameHeight
            : null;
      if (next && next > 400) {
        setHeight(floorHeight(next + 24));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [allowedOrigin]);

  useEffect(() => {
    if (loaded || failed) return;
    const timer = window.setTimeout(() => {
      setFailed(true);
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [loaded, failed]);

  return (
    <div
      className="booking-embed-shell relative overflow-hidden bg-white md:rounded-2xl md:border md:border-slate-200 md:shadow-[0_20px_50px_rgba(11,44,69,0.06)]"
      style={{ minHeight: `${height}px` }}
      aria-busy={!loaded && !failed}
    >
      {!loaded && !failed ? (
        <div className="absolute inset-0 z-10 flex flex-col gap-4 bg-slate-50 p-6">
          <div className="h-8 w-48 rounded-lg bg-slate-200 motion-safe:animate-pulse" aria-hidden />
          <div className="h-12 w-full rounded-xl bg-slate-200 motion-safe:animate-pulse" aria-hidden />
          <div className="h-12 w-full rounded-xl bg-slate-200 motion-safe:animate-pulse" aria-hidden />
          <div className="mt-4 h-40 w-full rounded-xl bg-slate-200 motion-safe:animate-pulse" aria-hidden />
          <p className="text-sm font-medium text-slate-500" role="status">
            Loading booking calendar…
          </p>
        </div>
      ) : null}

      {failed && !loaded ? (
        <div className="absolute inset-x-0 top-0 z-30 flex flex-col items-center justify-center gap-4 bg-slate-50/95 px-6 py-10 text-center backdrop-blur-sm md:rounded-t-2xl">
          <p className="max-w-md text-base text-slate-700">
            The booking calendar could not load. Open the full Treow booking page,
            or call us on {site.phone}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={site.bookingExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Open full booking page
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      ) : null}

      <iframe
        ref={frameRef}
        src={site.bookingEmbedUrl}
        title="Book an appointment with Nguyen's Osteopathic Clinic"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals"
        className="relative z-20 block w-full border-0 bg-white"
        style={{ height: `${height}px`, minHeight: `${height}px` }}
        onLoad={() => {
          setLoaded(true);
          setFailed(false);
        }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
