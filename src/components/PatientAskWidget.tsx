"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

type Role = "user" | "assistant";

type ChatTurn = {
  role: Role;
  content: string;
};

type AskResponse = {
  answer?: string;
  handoff?: "whatsapp" | "phone" | "book" | "urgent";
  fallback?: boolean;
  error?: string;
};

const SUGGESTIONS = [
  "How much is an initial visit?",
  "Where are you and what are your hours?",
  "Do I need a GP referral?",
] as const;

function shouldHide(pathname: string): boolean {
  return (
    pathname.startsWith("/leaflet") ||
    pathname.startsWith("/poster") ||
    pathname.startsWith("/business-card") ||
    pathname.startsWith("/voucher") ||
    pathname.startsWith("/facebook") ||
    pathname.startsWith("/linkedin")
  );
}

function shouldAutoOpen(pathname: string): boolean {
  return (
    pathname === "/contact" ||
    pathname === "/faq" ||
    pathname === "/vi/contact" ||
    pathname === "/vi/faq"
  );
}

function formatAnswer(text: string) {
  // Keep paths readable; turn absolute clinic URLs into relative when possible.
  return text.replaceAll(site.websiteUrl, "");
}

export function PatientAskWidget() {
  const pathname = usePathname() || "/";
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [handoff, setHandoff] = useState<AskResponse["handoff"]>();
  const [pending, setPending] = useState(false);
  const honeypotRef = useRef("");

  useEffect(() => {
    if (shouldHide(pathname)) {
      setOpen(false);
      return;
    }
    if (shouldAutoOpen(pathname)) {
      setOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  if (shouldHide(pathname)) return null;

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || pending) return;

    const nextTurns: ChatTurn[] = [...turns, { role: "user", content }];
    setTurns(nextTurns);
    setDraft("");
    setError(null);
    setHandoff(undefined);
    setPending(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextTurns.map((turn) => ({
            role: turn.role,
            content: turn.content,
          })),
          honeypot: honeypotRef.current,
        }),
      });

      const data = (await response.json()) as AskResponse;
      if (!response.ok) {
        throw new Error(data.error || "Could not reach the clinic assistant");
      }
      const answer =
        data.answer?.trim() ||
        "Sorry — I could not answer that. Try WhatsApp or phone.";
      setTurns((prev) => [
        ...prev,
        { role: "assistant", content: formatAnswer(answer) },
      ]);
      if (data.handoff) setHandoff(data.handoff);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call or WhatsApp the clinic.",
      );
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  const bookPath = bookHref("ask-widget");

  return (
    <div
      className="pointer-events-none fixed z-[60] flex flex-col items-end gap-3"
      style={{
        right: "1rem",
        bottom:
          "calc(1rem + var(--mobile-book-pad, 0px) + var(--cookie-banner-pad, 0px))",
      }}
    >
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="pointer-events-auto flex w-[min(100vw-2rem,22.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xl shadow-navy/15"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-teal px-4 py-3 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-teal-mist/20 blur-2xl"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p id={titleId} className="font-display text-xl leading-tight">
                  Ask the clinic
                </p>
                <p className="mt-1 text-xs text-white/80">
                  Fees, hours, booking — not a diagnosis.
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-sm text-white/90 hover:bg-white/10"
                aria-label="Close ask panel"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>

          <div className="flex max-h-[min(60vh,26rem)] flex-col gap-3 overflow-y-auto px-4 py-3">
            {turns.length === 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-muted">
                  Ask a quick question, or pick a prompt:
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="rounded-xl border border-line bg-cream-mist px-3 py-2 text-left text-sm text-navy transition hover:border-teal hover:text-teal"
                      onClick={() => void sendMessage(prompt)}
                      disabled={pending}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="space-y-3" aria-live="polite">
                {turns.map((turn, index) => (
                  <li
                    key={`${turn.role}-${index}`}
                    className={
                      turn.role === "user"
                        ? "ml-6 rounded-2xl rounded-br-md bg-teal px-3 py-2 text-sm text-white"
                        : "mr-4 rounded-2xl rounded-bl-md border border-line bg-cream-mist px-3 py-2 text-sm whitespace-pre-wrap text-ink"
                    }
                  >
                    {turn.content}
                  </li>
                ))}
              </ul>
            )}

            {pending ? (
              <p className="text-xs text-muted" role="status">
                Thinking…
              </p>
            ) : null}
            {error ? (
              <p className="text-xs text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2 border-t border-line pt-3">
              <a
                href={site.phoneHref}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ${
                  handoff === "phone" || handoff === "urgent"
                    ? "bg-navy text-white ring-navy"
                    : "bg-white text-navy ring-line hover:ring-teal"
                }`}
              >
                Call
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ${
                  handoff === "whatsapp"
                    ? "bg-teal text-white ring-teal"
                    : "bg-white text-navy ring-line hover:ring-teal"
                }`}
              >
                WhatsApp
              </a>
              <Link
                href={bookPath}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ${
                  handoff === "book"
                    ? "bg-teal text-white ring-teal"
                    : "bg-white text-navy ring-line hover:ring-teal"
                }`}
              >
                Book online
              </Link>
              {handoff === "urgent" ? (
                <a
                  href="tel:999"
                  className="rounded-lg bg-red-700 px-2.5 py-1.5 text-xs font-semibold text-white ring-1 ring-red-700"
                >
                  Emergency 999
                </a>
              ) : null}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="border-t border-line bg-white px-3 py-3"
          >
            <label htmlFor="patient-ask-input" className="sr-only">
              Your question
            </label>
            {/* Honeypot — leave empty */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
              value={honeypotRef.current}
              onChange={(event) => {
                honeypotRef.current = event.target.value;
              }}
            />
            <div className="flex items-end gap-2">
              <textarea
                id="patient-ask-input"
                ref={inputRef}
                rows={2}
                maxLength={1200}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about fees, hours, booking…"
                className="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-line bg-cream-mist px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                disabled={pending}
              />
              <button
                type="submit"
                disabled={pending || !draft.trim()}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal px-4 text-sm font-semibold text-white shadow-md shadow-teal/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-[0.7rem] leading-snug text-muted">
              General clinic info only — not a diagnosis or personal medical
              advice.
            </p>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        className="pointer-events-auto inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-lg shadow-navy/30 ring-1 ring-white/10 transition hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          aria-hidden
          className="inline-flex h-2.5 w-2.5 rounded-full bg-teal-mist"
        />
        {open ? "Hide ask" : "Ask the clinic"}
      </button>
    </div>
  );
}
