import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { BookingEmbed } from "@/components/BookingEmbed";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an Osteopathy Appointment in Woolwich",
  description:
    `Book online with Nguyen's Osteopathic Clinic in Woolwich. Call ${site.phone} or reserve with Austin Duy Nguyen, GOsC osteopath.`,
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book an Osteopathy Appointment in Woolwich",
    description:
      "Online booking for osteopathy, shockwave therapy, and specialist care at Nguyen's Osteopathic Clinic.",
    url: "/book",
    images: [defaultOgImage],
  },
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
              Reserve a slot that works for you. Prefer to speak first? Call or
              WhatsApp — we will help you choose the right appointment type.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/services" variant="secondary">
              Browse services
            </ButtonLink>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-teal/30 bg-teal/5 px-5 py-5 md:px-6">
          <p className="text-sm font-semibold tracking-wide text-teal-dark uppercase">
            Bookable days
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
            {site.booking.shortNote} Live availability is always shown in the
            calendar below.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href={site.phoneHref} variant="navy">
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
            <ButtonLink
              href={site.bookingExternalUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open full calendar
            </ButtonLink>
          </div>
        </div>

        <p className="mt-5 text-sm text-slate-600">
          Before you book:{" "}
          <Link href="/new-patients" className="font-semibold text-teal hover:text-teal-dark">
            New patient guide
          </Link>
          {" · "}
          <Link href="/aftercare" className="font-semibold text-teal hover:text-teal-dark">
            Aftercare
          </Link>
          {" · "}
          <Link href="/resources" className="font-semibold text-teal hover:text-teal-dark">
            Patient resources
          </Link>
          {" · "}
          <Link href="/fees" className="font-semibold text-teal hover:text-teal-dark">
            Fees
          </Link>
          {" · "}
          <Link href="/find-us" className="font-semibold text-teal hover:text-teal-dark">
            Find us
          </Link>
          {" · "}
          <Link href="/insurance" className="font-semibold text-teal hover:text-teal-dark">
            Insurance &amp; receipts
          </Link>
          {" · "}
          <Link href="/terms" className="font-semibold text-teal hover:text-teal-dark">
            Cancellation policy
          </Link>
        </p>
      </div>

      {/* Full-bleed on phones so the widget sits flush (no floating card). */}
      <div
        id="online-booking"
        data-booking-widget="treow"
        itemScope
        itemType="https://schema.org/ReserveAction"
        className="mx-auto max-w-6xl pb-16 md:px-8 md:pb-24"
      >
        <meta itemProp="name" content="Book an osteopathy appointment online" />
        <link itemProp="target" href={site.bookingUrl} />
        <h2 className="sr-only">Online booking widget</h2>
        <BookingEmbed />
        <p className="mt-4 px-5 text-center text-sm font-medium text-slate-600 md:px-0">
          Online booking powered by{" "}
          <a
            href={site.products.treowClinic.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal hover:text-teal-dark"
          >
            {site.products.treowClinic.name}
          </a>{" "}
          · {site.cancellation}
        </p>
        <div className="mt-4 flex justify-center px-5 sm:hidden">
          <ButtonLink
            href={site.bookingExternalUrl}
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
