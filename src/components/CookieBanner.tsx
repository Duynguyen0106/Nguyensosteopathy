"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "nguyens-cookie-consent";

type Consent = "accepted" | "declined";

let consentVersion = 0;
const listeners = new Set<() => void>();

function emitConsentChange() {
  consentVersion += 1;
  listeners.forEach((listener) => listener());
}

function subscribeConsent(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function readConsent(): Consent | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "declined") return saved;
    return null;
  } catch {
    return null;
  }
}

function getConsentSnapshot() {
  void consentVersion;
  return readConsent();
}

function getServerConsentSnapshot(): Consent | null {
  return "declined";
}

export function CookieBanner() {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const choose = useCallback((value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    if (value === "accepted") {
      window.dispatchEvent(new Event("nguyens:analytics-consent"));
    }
    emitConsentChange();
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      window.dispatchEvent(new Event("nguyens:analytics-consent"));
    }
  }, [consent]);

  const visible = consent === null;

  useEffect(() => {
    if (!visible) return;
    const dialog = dialogRef.current;
    firstButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        choose("declined");
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [visible, choose]);

  if (!visible) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-navy/10 bg-white/95 p-4 shadow-[0_-12px_40px_rgba(11,44,69,0.12)] backdrop-blur-md md:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p
          id={titleId}
          className="max-w-3xl text-sm leading-relaxed text-slate-700"
        >
          We store your cookie choice in this browser (local storage). With your
          permission, we also use analytics to improve the website. See our{" "}
          <Link href="/cookies" className="prose-link">
            Cookie Policy
          </Link>
          {" · "}
          <Link href="/privacy" className="prose-link">
            Privacy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            ref={firstButtonRef}
            type="button"
            onClick={() => choose("declined")}
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="min-h-11 rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
