"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";

const MIN_HEIGHT = 900;
const MOBILE_MIN_HEIGHT = 960;
const MAX_HEIGHT = 2800;
const LOAD_TIMEOUT_MS = 45000;

function embedOrigin(url: string) {
  try {
    return new URL(url).origin;
  } catch {
    return site.treowAppOrigin;
  }
}

function floorHeight(next: number) {
  if (typeof window === "undefined") return Math.max(next, MIN_HEIGHT);
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  return Math.max(next, isMobile ? MOBILE_MIN_HEIGHT : MIN_HEIGHT);
}

function cappedHeight(next: number) {
  return Math.min(floorHeight(next), MAX_HEIGHT);
}

function isTreowEmbedPayload(data: unknown): data is {
  type?: string;
  event?: string;
  height?: number;
  frameHeight?: number;
} {
  return Boolean(data && typeof data === "object");
}

type BookingEmbedProps = {
  /** Absolute Treow embed URL, already including forwarded UTMs when present. */
  embedSrc?: string;
  /** Absolute Treow full-page booking URL (fallback / open full calendar). */
  externalHref?: string;
};

export function BookingEmbed({
  embedSrc = site.bookingEmbedUrl,
  externalHref = site.bookingExternalUrl,
}: BookingEmbedProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // Always mount immediately — BookingEmbed only sits on /book and /vi/book.
  const [shouldLoad] = useState(true);
  const [frameKey, setFrameKey] = useState(0);
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  /** Bumped on any Treow postMessage so the load timeout restarts. */
  const [loadHeartbeat, setLoadHeartbeat] = useState(0);
  const allowedOrigin = useMemo(() => embedOrigin(embedSrc), [embedSrc]);

  useEffect(() => {
    const syncHeight = () => {
      setHeight((current) => cappedHeight(current));
    };
    syncHeight();
    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);

  useEffect(() => {
    const markLoaded = () => {
      setLoaded(true);
      setFailed(false);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== allowedOrigin) return;
      const data = event.data;
      if (!isTreowEmbedPayload(data)) return;

      const typedTreow = data.type === "treow-booking-embed";
      const heightValue =
        typeof data.height === "number"
          ? data.height
          : typeof data.frameHeight === "number"
            ? data.frameHeight
            : null;
      const usableHeight =
        heightValue !== null && Number.isFinite(heightValue) && heightValue > 400;
      const isReady = data.event === "ready";

      if (!typedTreow && !usableHeight && !isReady) return;

      // ready + usable height from the allowed origin count as loaded success.
      if (isReady || usableHeight) {
        markLoaded();
      } else {
        // Other treow-booking-embed events only reset the load timeout.
        setLoadHeartbeat((n) => n + 1);
      }

      if (usableHeight && heightValue !== null) {
        setHeight(cappedHeight(heightValue + 24));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [allowedOrigin]);

  useEffect(() => {
    if (!shouldLoad || loaded || failed) return;
    const timer = window.setTimeout(() => {
      setFailed(true);
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [shouldLoad, loaded, failed, frameKey, loadHeartbeat]);

  const retry = () => {
    setFailed(false);
    setLoaded(false);
    setHeight(MIN_HEIGHT);
    setLoadHeartbeat(0);
    setFrameKey((key) => key + 1);
  };

  const showFailure = failed && !loaded;

  return (
    <div
      ref={shellRef}
      className="booking-embed-shell relative overflow-hidden bg-white md:rounded-2xl md:border md:border-slate-200 md:shadow-[0_20px_50px_rgba(11,44,69,0.06)]"
      style={{ minHeight: `${height}px` }}
      aria-busy={shouldLoad && !loaded && !failed}
    >
      {(!shouldLoad || (!loaded && !failed)) && !showFailure ? (
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

      {showFailure ? (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-slate-50 px-6 py-10 text-center md:rounded-2xl">
          <p className="max-w-md text-base text-slate-700">
            The booking calendar could not load. Retry the embed, open the full
            booking page, message us on WhatsApp, or call {site.phone}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={retry}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Retry
            </button>
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
            >
              Open full booking page
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
            >
              WhatsApp
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

      {shouldLoad ? (
        <iframe
          key={frameKey}
          ref={frameRef}
          src={embedSrc}
          title="Book an appointment with Nguyen's Osteopathic Clinic"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals"
          className={`relative block w-full border-0 bg-white ${
            showFailure
              ? "pointer-events-none z-0 opacity-0"
              : "z-20"
          }`}
          style={{ height: `${height}px`, minHeight: `${height}px` }}
          aria-hidden={showFailure}
          tabIndex={showFailure ? -1 : undefined}
          onLoad={() => {
            setLoaded(true);
            setFailed(false);
          }}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
