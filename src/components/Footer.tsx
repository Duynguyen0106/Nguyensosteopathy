import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

/** Lean footer — full catalogue remains on /site-map. */
const patientLinks = [
  { href: "/book", label: "Book online" },
  { href: "/new-patients", label: "New patients" },
  { href: "/fees", label: "Fees & prices" },
  { href: "/exercises", label: "Home exercises" },
  { href: "/find-us", label: "Find us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

const treatmentLinks = [
  { href: "/osteopathy", label: "What is osteopathy?" },
  { href: "/services", label: "All services" },
  { href: "/conditions", label: "Conditions" },
  { href: "/services/focused-shockwave", label: "Shockwave therapy" },
  { href: "/areas", label: "Areas we serve" },
  { href: "/blog", label: "Blog" },
] as const;

const aboutLinks = [
  { href: "/about", label: "About Austin" },
  { href: "/reviews", label: "Reviews" },
  { href: "/vi", label: "Tiếng Việt" },
  { href: "/nhs-discount", label: "NHS & student discount" },
  { href: "/insurance", label: "Insurance" },
  { href: "/privacy", label: "Privacy" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

const productLinks = [
  {
    href: site.products.mskTutor.url,
    label: site.products.mskTutor.name,
  },
  {
    href: site.products.treowClinic.url,
    label: site.products.treowClinic.name,
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4 md:px-8">
        <div>
          <div className="inline-block rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/10">
            <Image
              src="/images/logo-lockup.webp"
              alt="Nguyen's Osteopathic Clinic — Recover, Realign, and Restore Your Vitality"
              width={1298}
              height={926}
              className="h-28 w-auto object-contain md:h-36"
              sizes="220px"
              loading="lazy"
              decoding="async"
              quality={70}
            />
          </div>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75 md:text-lg">
            {site.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink
              href={site.whatsappUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </ButtonLink>
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white transition hover:border-teal-mist hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-mist"
              aria-label="Nguyen's Osteopathic Clinic on Facebook"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5H16.7V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H8v3.1h2.5V22h3Z" />
              </svg>
            </a>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white transition hover:border-teal-mist hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-mist"
              aria-label="Austin Duy Nguyen on LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 7.17a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34ZM20 20h-2.88v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H10.2V8.5h2.76v1.57h.04c.38-.73 1.32-1.5 2.72-1.5 2.91 0 3.45 1.91 3.45 4.4V20Z" />
              </svg>
            </a>
          </div>
          <ul className="mt-6 space-y-1 text-sm text-white/85">
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center hover:text-white"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.emailHref}
                className="inline-flex min-h-11 items-center hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li className="pt-1">
              {site.address.line1}, {site.address.line2}
            </li>
          </ul>
          <div className="mt-4 space-y-1 text-sm font-medium text-white/80">
            <p className="text-xs font-semibold tracking-[0.14em] text-teal-mist uppercase">
              Bookable osteopathy
            </p>
            {site.booking.hours.map((row) => (
              <p key={`book-${row.days}`}>
                <span className="text-white">{row.days}</span> · {row.time}
              </p>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/55">
            Closed {site.booking.closedDaysLabel}. Live slots are shown in
            online booking.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Patients
          </p>
          <ul className="mt-4 space-y-1 text-sm text-white/85">
            {patientLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Treatments
          </p>
          <ul className="mt-4 space-y-1 text-sm text-white/85">
            {treatmentLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            About
          </p>
          <ul className="mt-4 space-y-1 text-sm text-white/85">
            {aboutLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/site-map"
                className="inline-flex min-h-11 items-center hover:text-white"
              >
                Full site map
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Built by Austin
          </p>
          <ul className="mt-3 space-y-1 text-sm text-white/85">
            {productLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-white/60">
            {site.cancellation}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © 2026 {site.name}. GOsC Reg. No.{" "}
            <a
              href={site.practitioner.goscRegisterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline underline-offset-2 hover:text-teal-mist"
            >
              {site.practitioner.regNo}
            </a>
            .
          </p>
          <p>
            Located inside {site.address.venue}, Woolwich.{" "}
            <Link
              href="/privacy"
              className="font-semibold text-white underline underline-offset-2 hover:text-teal-mist"
            >
              Privacy
            </Link>
            {" · "}
            <Link
              href="/cookies"
              className="font-semibold text-white underline underline-offset-2 hover:text-teal-mist"
            >
              Cookies
            </Link>
            {" · "}
            <Link
              href="/terms"
              className="font-semibold text-white underline underline-offset-2 hover:text-teal-mist"
            >
              Terms
            </Link>
            {" · "}
            <Link
              href="/complaints"
              className="font-semibold text-white underline underline-offset-2 hover:text-teal-mist"
            >
              Complaints
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
