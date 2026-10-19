"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { getConsentSnapshot, subscribeConsent } from "@/lib/cookie-consent";
import { site } from "@/lib/site";

const MOBILE_BOOK_PAD = "4.25rem";

/**
 * Thumb-zone Book CTA on small screens, stacked above the cookie banner pad.
 * Hidden on /book, print pages, home heroes (already have Book), desktop,
 * and while the cookie dialog is open.
 */
export function MobileBookBar() {
  const pathname = usePathname() || "/";
  // Server snapshot null → treat cookie dialog as open so the bar does not
  // SSR-flash on top of a consent banner that hydrates in a moment later.
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    () => null,
  );
  const cookieOpen = consent === null;

  const hide =
    cookieOpen ||
    pathname === "/" ||
    pathname === "/vi" ||
    pathname === "/book" ||
    pathname.startsWith("/book/") ||
    pathname.startsWith("/leaflet") ||
    pathname.startsWith("/poster");

  useEffect(() => {
    if (hide) {
      document.body.style.removeProperty("--mobile-book-pad");
      return;
    }
    document.body.style.setProperty("--mobile-book-pad", MOBILE_BOOK_PAD);
    return () => {
      document.body.style.removeProperty("--mobile-book-pad");
    };
  }, [hide]);

  if (hide) return null;

  const isVi = pathname.startsWith("/vi");
  const label = isVi ? "Đặt lịch" : "Book";

  return (
    <div
      id="mobile-book-bar"
      className="pointer-events-none fixed inset-x-0 z-[55] flex justify-center px-4 md:hidden"
      style={{ bottom: "calc(0.75rem + var(--cookie-banner-pad, 0px))" }}
    >
      <Link
        href="/book"
        className="pointer-events-auto inline-flex min-h-12 min-w-[10.5rem] items-center justify-center rounded-xl bg-teal px-6 text-base font-semibold text-white shadow-lg shadow-teal/30 ring-1 ring-teal/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        aria-label={
          isVi ? `Đặt lịch khám — ${site.name}` : `Book online — ${site.name}`
        }
      >
        {label}
      </Link>
    </div>
  );
}
