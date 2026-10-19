"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ButtonLink } from "@/components/Button";
import { getServiceHref, services, site } from "@/lib/site";

function pathMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean) {
  return active
    ? "font-semibold text-navy"
    : "text-navy/75 transition hover:text-teal";
}

/** Primary lg row — care paths first; NHS/Insurance/Reviews/Contact/VI in mobile + footer. */
const links = [
  { href: "/about", label: "About", desktop: true },
  { href: "/conditions", label: "Conditions", desktop: true },
  { href: "/exercises", label: "Exercises", desktop: true },
  { href: "/blog", label: "Blog", desktop: true },
  { href: "/fees", label: "Fees", desktop: true },
  { href: "/nhs-discount", label: "NHS 10%", desktop: false },
  { href: "/insurance", label: "Insurance", desktop: false },
  { href: "/reviews", label: "Reviews", desktop: false },
  { href: "/find-us", label: "Find us", desktop: true },
  { href: "/contact", label: "Contact", desktop: false },
  { href: "/vi", label: "Tiếng Việt", desktop: false },
];

const serviceNav = services.map((service) => ({
  href: getServiceHref(service.slug),
  label: service.title,
}));

export function Header() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const servicesActive =
    pathMatches(pathname, "/services") ||
    pathMatches(pathname, "/osteopathy") ||
    pathMatches(pathname, "/massage") ||
    pathMatches(pathname, "/desk-pain");
  const menuId = useId();
  const panelId = `${menuId}-panel`;
  const servicesMenuId = `${menuId}-services`;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    if (open) {
      main?.setAttribute("inert", "");
      main?.setAttribute("aria-hidden", "true");
      footer?.setAttribute("inert", "");
      footer?.setAttribute("aria-hidden", "true");
    } else {
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
    };
  }, [open]);

  useEffect(() => {
    if (!servicesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setServicesOpen(false);
      servicesButtonRef.current?.focus();
    };

    const onPointerDown = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (servicesWrapRef.current?.contains(target)) return;
      setServicesOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
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

  function closeMenu() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

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
          className="hidden items-center gap-5 text-[0.92rem] lg:flex xl:gap-7"
        >
          <Link
            href="/about"
            className={navLinkClass(pathMatches(pathname, "/about"))}
            aria-current={pathMatches(pathname, "/about") ? "page" : undefined}
          >
            About
          </Link>

          <div
            ref={servicesWrapRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              ref={servicesButtonRef}
              type="button"
              className={`inline-flex items-center gap-1 ${navLinkClass(servicesActive)}`}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              aria-controls={servicesMenuId}
              aria-current={servicesActive ? "true" : undefined}
              onClick={() => setServicesOpen((value) => !value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" && !servicesOpen) {
                  event.preventDefault();
                  setServicesOpen(true);
                }
              }}
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
                servicesOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="w-[22rem] rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                <Link
                  href="/services"
                  role="menuitem"
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-navy hover:bg-slate-50 hover:text-teal"
                  onClick={() => setServicesOpen(false)}
                  aria-current={
                    pathname === "/services" ? "page" : undefined
                  }
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
                        aria-current={
                          pathMatches(pathname, item.href) ? "page" : undefined
                        }
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
            .map((link) => {
              const active = pathMatches(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navLinkClass(active)}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={site.phoneHref}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy shadow-sm transition hover:border-teal hover:text-teal sm:w-auto sm:px-4 sm:py-2.5"
            aria-label={`Call ${site.phone}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 sm:hidden"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" />
            </svg>
            <span className="hidden text-sm font-semibold sm:inline">Call</span>
          </a>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy shadow-sm transition hover:border-teal hover:text-teal"
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
            className="min-h-11 px-3 py-2 sm:px-5 sm:py-2.5"
          >
            Book Now
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy/10 text-navy lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-haspopup="dialog"
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

      {/* Portal outside header: backdrop-blur creates a containing block that
          collapses position:fixed descendants to the sticky header height. */}
      {portalReady && open
        ? createPortal(
            <div className="lg:hidden">
              <button
                type="button"
                className="fixed inset-0 z-[70] bg-navy/40"
                aria-label="Close menu"
                onClick={closeMenu}
              />
              <div
                id={panelId}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                className="fixed inset-x-0 bottom-0 top-[4.25rem] z-[80] flex h-[calc(100dvh-4.25rem)] flex-col border-t border-line bg-white shadow-2xl sm:top-[4.75rem] sm:h-[calc(100dvh-4.75rem)]"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5">
                  <p className="text-sm font-semibold text-navy">Menu</p>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy/10 text-navy"
                    aria-label="Close menu"
                    onClick={closeMenu}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden
                    >
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>
                <nav
                  aria-label="Mobile"
                  className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
                >
                  <div className="mb-2 grid grid-cols-2 gap-2">
                    <a
                      href={site.phoneHref}
                      className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-semibold text-navy"
                      onClick={closeMenu}
                    >
                      Call
                    </a>
                    <a
                      href={site.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-semibold text-navy"
                      onClick={closeMenu}
                    >
                      WhatsApp
                    </a>
                  </div>
                  <Link
                    href="/book"
                    className="mb-3 block min-h-11 rounded-xl bg-teal px-3 py-3 text-center text-base font-semibold text-white hover:bg-teal-dark"
                    onClick={closeMenu}
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/about"
                    className={`block rounded-xl px-3 py-3 text-base hover:bg-cream-mist ${
                      pathMatches(pathname, "/about")
                        ? "bg-cream-mist font-semibold text-navy"
                        : "text-navy"
                    }`}
                    onClick={closeMenu}
                    aria-current={
                      pathMatches(pathname, "/about") ? "page" : undefined
                    }
                  >
                    About
                  </Link>

                  <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                    Services
                  </p>
                  <Link
                    href="/services"
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-cream-mist"
                    onClick={closeMenu}
                  >
                    All services
                  </Link>
                  {serviceNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block min-h-11 rounded-xl px-3 py-3 text-base text-navy hover:bg-cream-mist"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-slate-100" />

                  {links
                    .filter((link) => link.href !== "/about")
                    .map((link) => {
                      const active = pathMatches(pathname, link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block rounded-xl px-3 py-3 text-base hover:bg-cream-mist ${
                            active
                              ? "bg-cream-mist font-semibold text-navy"
                              : "text-navy"
                          }`}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
