"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sentHint, setSentHint] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `Enquiry from ${name || "website visitor"} — ${site.name}`,
    );
    const body = encodeURIComponent(
      [
        name ? `Name: ${name}` : null,
        phone ? `Phone: ${phone}` : null,
        "",
        message || "(No message provided)",
        "",
        `— Sent from ${site.websiteUrl}/contact`,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    );

    setSentHint(true);
    window.location.href = `${site.emailHref}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      aria-label="Send an enquiry"
    >
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-navy">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy outline-none ring-teal/30 transition focus:border-teal focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="contact-phone"
          className="text-sm font-medium text-navy"
        >
          Phone
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy outline-none ring-teal/30 transition focus:border-teal focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-navy"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy outline-none ring-teal/30 transition focus:border-teal focus:ring-2"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal/25 ring-1 ring-teal/20 transition hover:bg-teal-dark"
      >
        Email your enquiry
      </button>
      {sentHint ? (
        <p className="text-sm text-slate-600">
          Your email app should open with the message ready to send. Prefer a
          faster reply?{" "}
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal hover:text-teal-dark"
          >
            WhatsApp us
          </a>
          .
        </p>
      ) : (
        <p className="text-xs text-slate-500">
          Opens your email app to message {site.email}. For bookings, use{" "}
          <a href="/book" className="font-semibold text-teal hover:text-teal-dark">
            online booking
          </a>
          .
        </p>
      )}
    </form>
  );
}
