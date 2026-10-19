"use client";

import { useEffect } from "react";

/** Sets <html lang> for the current route tree (root layout stays en-GB). */
export function DocumentLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous || "en-GB";
    };
  }, [lang]);

  return null;
}
