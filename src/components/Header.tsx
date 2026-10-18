"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { getServiceHref, services, site } from "@/lib/site";

/** Primary lg row — trust/local CTAs first; Blog/Exercises/VI in mobile + footer. */
const links = [
  { href: "/about", label: "About", desktop: true },
  { href: "/conditions", label: "Conditions", desktop: true },
  { href: "/exercises", label: "Exercises", desktop: false },
  { href: "/blog", label: "Blog", desktop: false },
  { href: "/fees", label: "Fees", desktop: true },
  { href: "/reviews", label: "Reviews", desktop: true },
  { href: "/find-us", label: "Find us", desktop: true },
  { href: "/contact", label: "Contact", desktop: true },
  { href: "/vi", label: "Tiếng Việt", desktop: false },
];

const serviceNav = services.map((service) => ({
  href: getServiceHref(service.slug),
  label: service.title,
}));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuId = useId();
  const panelId = `${menuId}-panel`;
  const servicesMenuId = `${menuId}-services`;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (servicesOpen) {
        event.preventDefault();
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const firstLink = panel?.querySelector<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = [
        ...panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled"));
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled || open
          ? "border-b border-line/80 bg-white/95 shadow-[0_8px_30px_rgba(11,44,69,0.07)] backdrop-blur-md"
          : "border-b border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:px-5 sm:py-2.5 md:px-8 md:py-3">
        <Link
          href="/"
          className="group min-w-0 shrink"
          onClick={() => setOpen(false)}
          aria-label="Nguyen's Osteopathic Clinic — Home"
        >
          <Image
            src="/images/logo-lockup.webp"
            alt="Nguyen's Osteopathic Clinic — Recover, Realign, and Restore Your Vitality"
            width={1298}
            height={926}
            className="h-12 w-auto max-w-[9.5rem] object-contain object-left transition group-hover:opacity-90 sm:h-14 sm:max-w-[11rem] md:h-[5.25rem] md:max-w-none"
            sizes="(max-width: 640px) 152px, (max-width: 768px) 176px, 210px"
            priority
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 text-[0.92rem] text-navy/75 lg:flex xl:gap-7"
        >
          <Link href="/about" className="transition hover:text-teal">
            About
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              ref={servicesButtonRef}
              type="button"
              className="inline-flex items-center gap-1 transition hover:text-teal"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              aria-controls={servicesMenuId}
              onClick={() => setServicesOpen((value) => !value)}
            >
              Services
              <svg
                viewBox="0 0 20 20"
                className={`h-3.5 w-3.5 transition ${servicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M5 7.5 10 12.5 15 7.5" />
              </svg>
            </button>
            <div
              id={servicesMenuId}
              role="menu"
              hidden={!servicesOpen}
              className={`absolute top-full left-0 z-[60] pt-2 transition ${
                servicesOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <div className="w-[22rem] rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                <Link
                  href="/services"
                  role="menuitem"
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-navy hover:bg-slate-50 hover:text-teal"
                  onClick={() => setServicesOpen(false)}
                >
                  All services
                </Link>
                <ul className="mt-1 max-h-[70vh] overflow-y-auto">
                  {serviceNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2 text-sm text-navy/80 hover:bg-slate-50 hover:text-teal"
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {links
            .filter((link) => link.href !== "/about" && link.desktop)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={site.phoneHref}
            className="hidden min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-navy shadow-sm transition hover:border-teal hover:text-teal sm:inline-flex sm:px-4 sm:py-2.5 sm:text-sm"
            aria-label={`Call ${site.phone}`}
          >
            Call
          </a>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy shadow-sm transition hover:border-teal hover:text-teal sm:hidden"
            aria-label="WhatsApp the clinic"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
              <path d="M12.04 2C6.5 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.87L2 22l5.27-1.25A9.95 9.95 0 0 0 12.04 22C17.58 22 22 17.52 22 12S17.58 2 12.04 2Zm0 18.15c-1.62 0-3.13-.44-4.43-1.2l-.32-.19-3.13.74.74-3.05-.2-.33A8.1 8.1 0 0 1 3.9 12c0-4.48 3.66-8.12 8.14-8.12 4.48 0 8.12 3.64 8.12 8.12 0 4.48-3.64 8.15-8.12 8.15Z" />
            </svg>
          </a>
          <ButtonLink
            href="/book"
            className="min-h-11 px-3 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Book Now
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy/10 text-navy lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
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
          id={panelId}
          ref={panelRef}
          className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-line bg-white px-4 py-4 sm:px-5 sm:py-5 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            <div className="mb-2 grid grid-cols-2 gap-2">
              <a
                href={site.phoneHref}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-semibold text-navy"
                onClick={() => setOpen(false)}
              >
                Call
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-semibold text-navy"
                onClick={() => setOpen(false)}
              >
                WhatsApp
              </a>
            </div>
            <Link
              href="/book"
              className="mb-3 min-h-11 rounded-xl bg-teal px-3 py-3 text-center text-base font-semibold text-white hover:bg-teal-dark"
              onClick={() => setOpen(false)}
            >
              Book Now
            </Link>
            <Link
              href="/about"
              className="rounded-xl px-3 py-3 text-base text-navy hover:bg-cream-mist"
              onClick={() => setOpen(false)}
            >
              About
            </Link>

            <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-[0.16em] text-teal uppercase">
              Services
            </p>
            <Link
              href="/services"
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-cream-mist"
              onClick={() => setOpen(false)}
            >
              All services
            </Link>
            {serviceNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 rounded-xl px-3 py-3 text-base text-navy hover:bg-cream-mist"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 border-t border-slate-100" />

            {links
              .filter((link) => link.href !== "/about")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-base text-navy hover:bg-cream-mist"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
