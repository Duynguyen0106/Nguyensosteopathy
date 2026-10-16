"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sentHint, setSentHint] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `Enquiry from ${name || "website visitor"} — ${site.name}`,
    );
    const body = encodeURIComponent(
      [
        name ? `Name: ${name}` : null,
        email ? `Email: ${email}` : null,
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
    // mailto: is external to Next routing — open via anchor to avoid location lint.
    const anchor = document.createElement("a");
    anchor.href = `${site.emailHref}?subject=${subject}&body=${body}`;
    anchor.rel = "noopener noreferrer";
    anchor.click();
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
          className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy outline-none ring-teal/30 transition focus:border-teal focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-navy"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy outline-none ring-teal/30 transition focus:border-teal focus:ring-2"
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
          className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy outline-none ring-teal/30 transition focus:border-teal focus:ring-2"
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
          className="mt-1.5 min-h-11 w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy outline-none ring-teal/30 transition focus:border-teal focus:ring-2"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal/25 ring-1 ring-teal/20 transition hover:bg-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        Email your enquiry
      </button>
      <div aria-live="polite">
        {sentHint ? (
          <p className="text-sm text-slate-600">
            If your email app did not open, message us on{" "}
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              WhatsApp
            </a>
            , email{" "}
            <a href={site.emailHref} className="prose-link">
              {site.email}
            </a>
            , or{" "}
            <Link href="/book" className="prose-link">
              book online
            </Link>
            .
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            This form opens your email app to message {site.email}. On phones
            without email set up, use{" "}
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              WhatsApp
            </a>
            , call{" "}
            <a href={site.phoneHref} className="prose-link">
              {site.phone}
            </a>
            , or{" "}
            <Link href="/book" className="prose-link">
              book online
            </Link>
            .
          </p>
        )}
      </div>
    </form>
  );
}
