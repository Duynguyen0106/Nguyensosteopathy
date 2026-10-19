"use client";

import Link from "next/link";
import { FormEvent, MouseEvent, useState } from "react";
import { site } from "@/lib/site";

function buildEnquiryText(data: FormData) {
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  return [
    name ? `Hi, I'm ${name}.` : "Hi,",
    "",
    message || "I'd like to enquire about an appointment.",
    "",
    email ? `Email: ${email}` : null,
    phone ? `Phone: ${phone}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function ContactForm() {
  const [hint, setHint] = useState<"idle" | "whatsapp" | "email">("idle");

  function openWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = encodeURIComponent(buildEnquiryText(new FormData(event.currentTarget)));
    setHint("whatsapp");
    const anchor = document.createElement("a");
    anchor.href = `${site.whatsappUrl}?text=${text}`;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.click();
  }

  function openEmail(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const form = event.currentTarget.form;
    if (!form) return;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const subject = encodeURIComponent(
      `Enquiry from ${name || "website visitor"} — ${site.name}`,
    );
    const body = encodeURIComponent(
      `${buildEnquiryText(data)}\n\n— Sent from ${site.websiteUrl}/contact`,
    );
    setHint("email");
    const anchor = document.createElement("a");
    anchor.href = `${site.emailHref}?subject=${subject}&body=${body}`;
    anchor.rel = "noopener noreferrer";
    anchor.click();
  }

  return (
    <form
      onSubmit={openWhatsApp}
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

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal/25 ring-1 ring-teal/20 transition hover:bg-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          Send on WhatsApp
        </button>
        <button
          type="button"
          onClick={openEmail}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          Or email instead
        </button>
      </div>

      <div aria-live="polite">
        {hint === "whatsapp" ? (
          <p className="text-sm text-slate-600">
            WhatsApp should open with your message. Prefer email? Use{" "}
            <a href={site.emailHref} className="prose-link">
              {site.email}
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
        ) : hint === "email" ? (
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
            , or{" "}
            <Link href="/book" className="prose-link">
              book online
            </Link>
            .
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            WhatsApp is the quickest way to reach us on a phone. Email opens your
            mail app as a backup — or{" "}
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
