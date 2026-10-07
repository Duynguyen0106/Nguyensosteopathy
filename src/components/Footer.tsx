import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-2xl tracking-wide">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            {site.tagline}
          </p>
          <a
            href={site.bookingUrl}
            className="mt-6 inline-flex rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-dark"
          >
            Book online
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Contact
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
              <Link href="/book" className="hover:text-white">
                Book appointment
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-mist uppercase">
            Clinic hours
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {site.hours.map((row) => (
              <li key={row.days}>
                <span className="text-white">{row.days}</span>
                <br />
                {row.time}
              </li>
            ))}
          </ul>
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
