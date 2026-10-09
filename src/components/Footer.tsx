import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl tracking-wide md:text-4xl">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-white/75 md:text-lg">
            {site.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition hover:border-teal-mist hover:bg-white/10"
              aria-label="Nguyen's Osteopathic Clinic on Facebook"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5H16.7V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H8v3.1h2.5V22h3Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li>
              <Link href="/about" className="hover:text-white">
                About Austin
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-white">
                Book appointment
              </Link>
            </li>
            <li>
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Visit
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {site.website}
              </a>
            </li>
            <li>
              {site.address.line1}, {site.address.line2}
            </li>
          </ul>
          <div className="mt-4 space-y-1 text-sm font-medium text-white/80">
            {site.hours.map((row) => (
              <p key={row.days}>
                <span className="text-white">{row.days}</span> · {row.time}
              </p>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/60">
            {site.cancellation}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © 2026 {site.name}. GOsC Reg. No. {site.practitioner.regNo}.
          </p>
          <p>Located inside {site.address.venue}, Woolwich.</p>
        </div>
      </div>
    </footer>
  );
}
