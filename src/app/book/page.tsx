import type { Metadata } from "next";
import { BookingEmbed } from "@/components/BookingEmbed";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Book your osteopathy appointment online with Nguyen's Osteopathic Clinic in Woolwich.",
};

export default function BookPage() {
  return (
    <div className="bg-slate-50 pt-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-5 pb-6 md:px-8 md:pb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Online booking
        </p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl text-navy md:text-5xl">
              Book your appointment
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
              Choose a time that works for you. Prefer to speak with us? Call{" "}
              <a
                href={site.phoneHref}
                className="font-medium text-teal hover:text-teal-dark"
              >
                {site.phone}
              </a>{" "}
              or email{" "}
              <a
                href={site.emailHref}
                className="font-medium text-teal hover:text-teal-dark"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-200 hover:border-teal hover:text-teal sm:inline-flex"
            >
              Open full booking page
            </a>
            <ButtonLink href="/services" variant="secondary">
              Browse services
            </ButtonLink>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-teal/30 bg-teal/5 px-4 py-3 text-sm leading-relaxed text-navy md:px-5 md:py-4 md:text-base">
          <p className="font-semibold">
            Online appointments open from {site.bookingOpensLabel}
          </p>
          <p className="mt-1 text-slate-600">
            The diary is closed before this date. You can book now for times on
            or after {site.bookingOpensLabel}.
          </p>
        </div>
      </div>

      {/* Full-bleed on phones so the widget sits flush (no floating card). */}
      <div className="mx-auto max-w-6xl pb-16 md:px-8 md:pb-24">
        <BookingEmbed />
        <p className="mt-4 px-5 text-center text-sm font-medium text-slate-600 md:px-0">
          Booking powered by Treow Clinic · Earliest online date{" "}
          {site.bookingOpensLabel} · {site.cancellation}
        </p>
        <div className="mt-4 flex justify-center px-5 sm:hidden">
          <ButtonLink
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="w-full max-w-sm"
          >
            Open full booking page
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
