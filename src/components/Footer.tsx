import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div>
          <div className="inline-block rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/10">
            <Image
              src="/images/logo-lockup.png"
              alt="Nguyen's Osteopathic Clinic — Recover, Realign, and Restore Your Vitality"
              width={1298}
              height={926}
              className="h-28 w-auto object-contain md:h-36"
            />
          </div>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75 md:text-lg">
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
              <Link href="/opening" className="hover:text-white">
                Opening offer — 50% off
              </Link>
            </li>
            <li>
              <Link href="/vi" className="hover:text-white">
                Tiếng Việt
              </Link>
            </li>
            <li>
              <Link href="/fees" className="hover:text-white">
                Fees &amp; prices
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/new-patients" className="hover:text-white">
                New patients
              </Link>
            </li>
            <li>
              <Link href="/conditions" className="hover:text-white">
                Conditions
              </Link>
            </li>
            <li>
              <Link href="/areas" className="hover:text-white">
                Areas we serve
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
            <li>
              <Link href="/reviews" className="hover:text-white">
                Reviews
              </Link>
            </li>
            <li>
              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Google reviews
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
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
          <p>
            Located inside {site.address.venue}, Woolwich.{" "}
            <Link href="/privacy" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
              Privacy policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
