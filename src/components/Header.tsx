"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#location", label: "Location" },
  { href: "/book", label: "Book" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled
          ? "border-b border-line/80 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt=""
            width={44}
            height={44}
            className="h-10 w-10 rounded-full object-cover object-[center_12%] ring-1 ring-navy/10"
            priority
          />
          <span className="font-display text-sm tracking-[0.14em] text-navy uppercase transition group-hover:text-teal md:text-[0.95rem]">
            Nguyen&apos;s
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm text-navy/80 md:flex"
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

        <a
          href={site.bookingUrl}
          className="inline-flex items-center rounded-full bg-teal px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-dark"
        >
          Book online
        </a>
      </div>
    </header>
  );
}
