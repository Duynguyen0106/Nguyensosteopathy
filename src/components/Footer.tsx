import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-2xl tracking-wide">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            {site.tagline}
          </p>
          <ButtonLink href={site.bookingUrl} className="mt-6" target="_blank" rel="noopener noreferrer">
            Book online
          </ButtonLink>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/services" className="hover:text-white">
                Services
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
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Visit
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
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
              {site.address.line1}, {site.address.line2}
            </li>
          </ul>
          <div className="mt-4 space-y-1 text-sm text-white/70">
            {site.hours.map((row) => (
              <p key={row.days}>
                <span className="text-white">{row.days}</span> · {row.time}
              </p>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/55">
            {site.cancellation}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © 2026 {site.name}. GOsC Reg. No. {site.practitioner.regNo}.
          </p>
          <p>Located inside {site.address.venue}, Woolwich.</p>
        </div>
      </div>
    </footer>
  );
}
