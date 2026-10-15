"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nguyens-cookie-consent";

function hasConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

/** Vercel Analytics only after cookie consent (aligned with GA gating). */
export function ConsentAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(hasConsent());
    sync();
    window.addEventListener("nguyens:analytics-consent", sync);
    return () => window.removeEventListener("nguyens:analytics-consent", sync);
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}
