import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Book your osteopathy appointment online with Nguyen's Osteopathic Clinic in Woolwich.",
};

export default function BookPage() {
  return (
    <div className="bg-background pt-24">
      <div className="mx-auto max-w-4xl px-5 pb-8 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Online booking
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Book your appointment
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Choose a time that works for you. Prefer to speak with us? Call{" "}
          <a href={site.phoneHref} className="font-medium text-teal hover:text-teal-dark">
            {site.phone}
          </a>{" "}
          or email{" "}
          <a href={site.emailHref} className="font-medium text-teal hover:text-teal-dark">
            {site.email}
          </a>
          .
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-5 pb-20 md:px-8">
        <iframe
          src={site.bookingEmbedUrl}
          title="Book an appointment with Nguyen's Osteopathic Clinic"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-[780px] w-full rounded-2xl border border-line bg-white"
        />
        <p className="mt-4 text-center text-sm text-muted">
          Having trouble with the form?{" "}
          <a
            href={site.bookingUrl}
            className="font-medium text-teal hover:text-teal-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the full booking page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
