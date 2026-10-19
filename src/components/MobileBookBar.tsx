"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/**
 * Thumb-zone Book CTA on small screens, stacked above the cookie banner pad.
 * Hidden on /book and desktop (header Book is enough there).
 */
export function MobileBookBar() {
  const pathname = usePathname() || "/";
  if (pathname === "/book" || pathname.startsWith("/book/")) return null;
  if (pathname.startsWith("/leaflet") || pathname.startsWith("/poster")) {
    return null;
  }

  const isVi = pathname.startsWith("/vi");
  const label = isVi ? "Đặt lịch" : "Book";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[55] flex justify-center px-4 md:hidden"
      style={{ bottom: "calc(0.75rem + var(--cookie-banner-pad, 0px))" }}
    >
      <Link
        href="/book"
        className="pointer-events-auto inline-flex min-h-12 min-w-[10.5rem] items-center justify-center rounded-xl bg-teal px-6 text-base font-semibold text-white shadow-lg shadow-teal/30 ring-1 ring-teal/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        aria-label={isVi ? `Đặt lịch khám — ${site.name}` : `Book online — ${site.name}`}
      >
        {label}
      </Link>
    </div>
  );
}
