"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nguyens-cookie-consent";

type Consent = "accepted" | "declined";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
      else if (saved === "accepted") {
        window.dispatchEvent(new Event("nguyens:analytics-consent"));
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    if (value === "accepted") {
      window.dispatchEvent(new Event("nguyens:analytics-consent"));
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-navy/10 bg-white/95 p-4 shadow-[0_-12px_40px_rgba(11,44,69,0.12)] backdrop-blur-md md:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
          We use essential cookies to run this site. With your permission, we
          also use analytics cookies to improve the website. See our{" "}
          <Link href="/privacy" className="font-semibold text-teal hover:text-teal-dark">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
