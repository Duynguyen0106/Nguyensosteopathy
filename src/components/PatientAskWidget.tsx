"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { bookHref, viBookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

type Role = "user" | "assistant";

type ChatTurn = {
  role: Role;
  content: string;
};

type AskResponse = {
  answer?: string;
  handoff?: "whatsapp" | "phone" | "book" | "urgent";
  error?: string;
  retryAfterSec?: number;
};

const AUTO_OPEN_KEY = "nguyens-ask-auto-opened";

const SUGGESTIONS_EN = [
  "How much is an initial visit?",
  "Where are you and what are your hours?",
  "Do I need a GP referral?",
] as const;

const SUGGESTIONS_VI = [
  "Lần khám đầu bao nhiêu tiền?",
  "Phòng khám ở đâu và giờ mở cửa?",
  "Tôi có cần giấy giới thiệu bác sĩ không?",
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
  return text.replaceAll(site.websiteUrl, "");
}

function renderAnswer(text: string) {
  const parts = text.split(/(\/[a-z0-9][\w-]*(?:\/[\w-]*)*)/g);
  return parts.map((part, index) => {
    if (/^\/[a-z0-9][\w-]*(?:\/[\w-]*)*$/i.test(part)) {
      return (
        <Link
          key={`${part}-${index}`}
          href={part}
          className="font-semibold text-teal underline-offset-2 hover:underline"
        >
          {part}
        </Link>
      );
    }
    return <span key={`t-${index}`}>{part}</span>;
  });
}

export function PatientAskWidget() {
  const pathname = usePathname() || "/";
  const isVi = pathname.startsWith("/vi");
  const titleId = useId();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [handoff, setHandoff] = useState<AskResponse["handoff"]>();
  const [pending, setPending] = useState(false);
  const honeypotRef = useRef("");

  const suggestions = isVi ? SUGGESTIONS_VI : SUGGESTIONS_EN;
  const title = isVi ? "Hỏi phòng khám" : "Ask the clinic";
  const subtitle = isVi
    ? "Phí, giờ mở cửa, đặt lịch — không phải chẩn đoán."
    : "Fees, hours, booking — not a diagnosis.";
  const privacyNote = isVi
    ? "Chỉ thông tin phòng khám chung — không gửi chi tiết y tế cá nhân nhận dạng được. Không phải chẩn đoán."
    : "General clinic info only — do not paste identifiable medical details. Not a diagnosis or personal medical advice.";
  const placeholder = isVi
    ? "Hỏi về phí, giờ mở cửa, đặt lịch…"
    : "Ask about fees, hours, booking…";
  const hideLabel = isVi ? "Ẩn hỏi đáp" : "Hide ask";
  const openLabel = isVi ? "Hỏi phòng khám" : "Ask the clinic";

  useEffect(() => {
    if (shouldHide(pathname)) {
      setOpen(false);
      return;
    }
    if (!shouldAutoOpen(pathname)) return;
    try {
      if (sessionStorage.getItem(AUTO_OPEN_KEY) === "1") return;
      sessionStorage.setItem(AUTO_OPEN_KEY, "1");
      setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [open, turns, pending, error]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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

      let data: AskResponse = {};
      try {
        data = (await response.json()) as AskResponse;
      } catch {
        if (response.status === 429) {
          throw new Error(
            isVi
              ? "Bạn hỏi hơi nhanh — vui lòng thử lại sau."
              : "Too many questions — please try again shortly.",
          );
        }
        throw new Error(
          isVi
            ? "Không kết nối được trợ lý phòng khám."
            : "Could not reach the clinic assistant",
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            (isVi
              ? "Không kết nối được trợ lý phòng khám."
              : "Could not reach the clinic assistant"),
        );
      }
      const answer =
        data.answer?.trim() ||
        (isVi
          ? "Xin lỗi — chưa trả lời được. Hãy dùng WhatsApp hoặc gọi điện."
          : "Sorry — I could not answer that. Try WhatsApp or phone.");
      setTurns((prev) => [
        ...prev,
        { role: "assistant", content: formatAnswer(answer) },
      ]);
      if (data.handoff) setHandoff(data.handoff);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isVi
            ? "Có lỗi xảy ra. Vui lòng gọi hoặc nhắn WhatsApp."
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

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  }

  const bookPath = isVi ? viBookHref("ask") : bookHref("ask");

  return (
    <div
      className="pointer-events-none fixed z-[70] flex flex-col items-end gap-3"
      style={{
        right: "1rem",
        bottom:
          "calc(1rem + var(--mobile-book-pad, 0px) + var(--cookie-banner-pad, 0px))",
      }}
    >
      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-busy={pending}
          className="pointer-events-auto flex w-[min(100vw-2rem,22.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xl shadow-navy/15"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-teal px-4 py-3 text-white">
            <div
              aria-hidden={true}
              className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-teal-mist/20 blur-2xl"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p id={titleId} className="font-display text-xl leading-tight">
                  {title}
                </p>
                <p className="mt-1 text-xs text-white/80">{subtitle}</p>
              </div>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-sm text-white/90 hover:bg-white/10"
                aria-label={isVi ? "Đóng hỏi đáp" : "Close ask panel"}
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
              >
                {isVi ? "Đóng" : "Close"}
              </button>
            </div>
          </div>

          <div
            ref={listRef}
            className="flex max-h-[min(52vh,22rem)] flex-col gap-3 overflow-y-auto px-4 py-3"
          >
            {turns.length === 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-muted">
                  {isVi
                    ? "Hỏi nhanh, hoặc chọn gợi ý:"
                    : "Ask a quick question, or pick a prompt:"}
                </p>
                <div className="flex flex-col gap-2">
                  {suggestions.map((prompt) => (
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
                    {turn.role === "assistant"
                      ? renderAnswer(turn.content)
                      : turn.content}
                  </li>
                ))}
              </ul>
            )}

            {pending ? (
              <p className="text-xs text-muted" role="status">
                {isVi ? "Đang suy nghĩ…" : "Thinking…"}
              </p>
            ) : null}
            {error ? (
              <p className="text-xs text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-line px-4 py-2.5">
            <a
              href={site.phoneHref}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ${
                handoff === "phone" || handoff === "urgent"
                  ? "bg-navy text-white ring-navy"
                  : "bg-white text-navy ring-line hover:ring-teal"
              }`}
            >
              {isVi ? "Gọi" : "Call"}
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
              {isVi ? "Đặt lịch" : "Book online"}
            </Link>
            {handoff === "urgent" ? (
              <a
                href="tel:999"
                className="rounded-lg bg-red-700 px-2.5 py-1.5 text-xs font-semibold text-white ring-1 ring-red-700"
              >
                {isVi ? "Cấp cứu 999" : "Emergency 999"}
              </a>
            ) : null}
          </div>

          <form
            onSubmit={onSubmit}
            className="border-t border-line bg-white px-3 py-3"
          >
            <label htmlFor="patient-ask-input" className="sr-only">
              {isVi ? "Câu hỏi của bạn" : "Your question"}
            </label>
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden={true}
              className="absolute -left-[9999px] h-px w-px opacity-0"
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
                onKeyDown={onComposerKeyDown}
                placeholder={placeholder}
                className="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-line bg-cream-mist px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                disabled={pending}
              />
              <button
                type="submit"
                disabled={pending || !draft.trim()}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal px-4 text-sm font-semibold text-white shadow-md shadow-teal/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isVi ? "Gửi" : "Send"}
              </button>
            </div>
            <p className="mt-2 text-[0.7rem] leading-snug text-muted">
              {privacyNote}
            </p>
          </form>
        </div>
      ) : null}

      <button
        ref={launcherRef}
        type="button"
        className="pointer-events-auto inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-lg shadow-navy/30 ring-1 ring-white/10 transition hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          aria-hidden={true}
          className="inline-flex h-2.5 w-2.5 rounded-full bg-teal-mist"
        />
        {open ? hideLabel : openLabel}
      </button>
    </div>
  );
}
