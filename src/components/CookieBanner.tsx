"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
  writeConsent,
  type Consent,
} from "@/lib/cookie-consent";

export function CookieBanner() {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() || "/";
  const isVi = pathname.startsWith("/vi");
  const compactLibrary = pathname.includes("/education/library");
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const choose = useCallback((value: Consent) => {
    writeConsent(value);
    if (value === "accepted") {
      window.dispatchEvent(new Event("nguyens:analytics-consent"));
    }
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      window.dispatchEvent(new Event("nguyens:analytics-consent"));
    }
  }, [consent]);

  const visible = consent === null;

  useEffect(() => {
    if (!visible) {
      document.body.style.removeProperty("--cookie-banner-pad");
      return;
    }

    const dialog = dialogRef.current;
    const measure = () => {
      const height = dialog?.getBoundingClientRect().height ?? 0;
      document.body.style.setProperty(
        "--cookie-banner-pad",
        `${Math.ceil(height)}px`,
      );
    };
    measure();
    const ro = dialog ? new ResizeObserver(measure) : null;
    if (dialog && ro) ro.observe(dialog);
    window.addEventListener("resize", measure);

    firstButtonRef.current?.focus();

    const main = document.getElementById("main-content");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const mobileBook = document.getElementById("mobile-book-bar");
    const inertTargets = [main, header, footer, mobileBook].filter(
      Boolean,
    ) as HTMLElement[];

    for (const el of inertTargets) {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        choose("declined");
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
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
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
      document.body.style.removeProperty("--cookie-banner-pad");
      for (const el of inertTargets) {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      }
    };
  }, [visible, choose]);

  if (!visible) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-navy/10 bg-white/95 shadow-[0_-12px_40px_rgba(11,44,69,0.12)] backdrop-blur-md ${
        compactLibrary ? "p-3 md:p-3.5" : "p-4 md:p-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl flex-col md:flex-row md:items-center md:justify-between ${
          compactLibrary ? "gap-3" : "gap-4"
        }`}
      >
        <p
          id={titleId}
          className={`max-w-3xl leading-relaxed text-slate-700 ${
            compactLibrary ? "text-xs md:text-sm" : "text-sm"
          }`}
        >
          {isVi ? (
            compactLibrary ? (
              <>
                Cookie / analytics trên trình duyệt này. Xem{" "}
                <Link
                  href="/cookies"
                  className="font-semibold text-teal underline-offset-2 hover:underline"
                >
                  chính sách cookie
                </Link>
                . Escape = chỉ thiết yếu.
              </>
            ) : (
              <>
                Chúng tôi lưu lựa chọn cookie trên trình duyệt này (local
                storage). Nếu bạn đồng ý, chúng tôi dùng analytics để cải thiện
                website. Xem{" "}
                <Link
                  href="/cookies"
                  className="inline-flex min-h-11 items-center font-semibold text-teal underline-offset-2 hover:underline"
                >
                  Chính sách cookie
                </Link>
                {" · "}
                <Link
                  href="/privacy"
                  className="inline-flex min-h-11 items-center font-semibold text-teal underline-offset-2 hover:underline"
                >
                  Quyền riêng tư
                </Link>
                . Escape hoặc “Chỉ thiết yếu” tắt analytics.
              </>
            )
          ) : compactLibrary ? (
            <>
              Cookie choice is stored in this browser. Analytics only with
              permission.{" "}
              <Link
                href="/cookies"
                className="font-semibold text-teal underline-offset-2 hover:underline"
              >
                Cookie Policy
              </Link>
              . Escape = essential only.
            </>
          ) : (
            <>
              We store your cookie choice in this browser (local storage). With
              your permission, we also use analytics to improve the website. See
              our{" "}
              <Link
                href="/cookies"
                className="inline-flex min-h-11 items-center font-semibold text-teal underline-offset-2 hover:underline"
              >
                Cookie Policy
              </Link>
              {" · "}
              <Link
                href="/privacy"
                className="inline-flex min-h-11 items-center font-semibold text-teal underline-offset-2 hover:underline"
              >
                Privacy
              </Link>
              . Escape or Essential only keeps analytics off.
            </>
          )}
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            ref={firstButtonRef}
            type="button"
            onClick={() => choose("declined")}
            className={`rounded-xl border border-slate-200 bg-white text-sm font-semibold text-navy hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
              compactLibrary ? "min-h-10 px-3 py-2" : "min-h-11 px-4 py-2.5"
            }`}
          >
            {isVi ? "Chỉ thiết yếu" : "Essential only"}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className={`rounded-xl bg-teal text-sm font-semibold text-white hover:bg-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
              compactLibrary ? "min-h-10 px-3 py-2" : "min-h-11 px-4 py-2.5"
            }`}
          >
            {isVi ? "Chấp nhận analytics" : "Accept analytics"}
          </button>
        </div>
      </div>
    </div>
  );
}
