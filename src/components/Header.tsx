"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#location", label: "Location" },
  { href: "/book", label: "Book" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled || open
          ? "border-b border-line/80 bg-white/95 shadow-[0_8px_30px_rgba(11,44,69,0.07)] backdrop-blur-md"
          : "border-b border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5 md:px-8 md:py-4">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 sm:gap-3.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={64}
            height={64}
            className="h-12 w-12 shrink-0 rounded-full bg-white object-contain p-0.5 ring-1 ring-navy/10 sm:h-14 sm:w-14"
            priority
          />
          <span className="font-display truncate text-lg tracking-[0.12em] text-navy uppercase transition group-hover:text-teal sm:text-xl md:text-[1.35rem]">
            Nguyen&apos;s
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-[0.95rem] text-navy/75 md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ButtonLink
            href="/book"
            className="px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Book online
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy/10 text-navy md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-white px-5 py-5 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base text-navy hover:bg-cream-mist"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="rounded-xl px-3 py-3 text-base text-navy hover:bg-cream-mist"
              onClick={() => setOpen(false)}
            >
              Call {site.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
