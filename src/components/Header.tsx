"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { getServiceHref, services, site } from "@/lib/site";

const links = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/fees", label: "Fees" },
  { href: "/reviews", label: "Reviews" },
  { href: "/find-us", label: "Find us" },
  { href: "/contact", label: "Contact" },
  { href: "/vi", label: "Tiếng Việt" },
];

const serviceNav = services.map((service) => ({
  href: getServiceHref(service.slug),
  label: service.title,
}));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuId = useId();
  const panelId = `${menuId}-panel`;
  const servicesMenuId = `${menuId}-services`;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);

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
    if (!servicesOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (
        servicesWrapRef.current &&
        !servicesWrapRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5 md:px-8 md:py-3">
        <Link
          href="/"
          className="group min-w-0 shrink"
          onClick={() => setOpen(false)}
          aria-label="Nguyen's Osteopathic Clinic — Home"
        >
          <Image
            src="/images/logo-lockup.png"
            alt="Nguyen's Osteopathic Clinic — Recover, Realign, and Restore Your Vitality"
            width={1298}
            height={926}
            className="h-[4.25rem] w-auto object-contain transition group-hover:opacity-90 sm:h-[4.75rem] md:h-[5.25rem]"
            sizes="(max-width: 640px) 170px, (max-width: 768px) 190px, 210px"
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
            ref={servicesWrapRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 transition hover:text-teal"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              aria-controls={servicesMenuId}
              onClick={() => setServicesOpen((value) => !value)}
              onFocus={() => setServicesOpen(true)}
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
              className={`absolute top-full left-0 z-[60] pt-2 ${
                servicesOpen ? "visible opacity-100" : "invisible opacity-0"
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
            .filter((link) => link.href !== "/about")
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

        <div className="flex shrink-0 items-center gap-2">
          <ButtonLink
            href="/book"
            variant="navy"
            aria-label="Book an osteopathy appointment"
            className="min-h-11 min-w-[7.5rem] px-4 py-2.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-navy/30 ring-2 ring-navy/20 sm:min-w-[8.5rem] sm:px-5 sm:text-base"
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
          className="border-t border-line bg-white px-5 py-5 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            <Link
              href="/about"
              className="rounded-xl px-3 py-3 text-base text-navy hover:bg-cream-mist"
              onClick={() => setOpen(false)}
            >
              About
            </Link>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base text-navy hover:bg-cream-mist"
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((value) => !value)}
            >
              Services
              <span aria-hidden>{mobileServicesOpen ? "−" : "+"}</span>
            </button>
            {mobileServicesOpen ? (
              <div className="mb-2 ml-2 border-l border-slate-200 pl-3">
                <Link
                  href="/services"
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-cream-mist"
                  onClick={() => setOpen(false)}
                >
                  All services
                </Link>
                {serviceNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2.5 text-sm text-navy/80 hover:bg-cream-mist"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}

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
            <Link
              href="/opening"
              className="rounded-xl px-3 py-3 text-base text-navy hover:bg-cream-mist"
              onClick={() => setOpen(false)}
            >
              Opening offer
            </Link>
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
