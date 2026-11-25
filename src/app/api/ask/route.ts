import { NextResponse } from "next/server";
import {
  RATE_LIMITS,
  clientIp,
  takeRateToken,
  tooManyRequestsJson,
} from "@/lib/anti-scrape";
import { completeChat, resolveAiConfig } from "@/lib/patient-ask/llm";
import { matchLocalAnswer } from "@/lib/patient-ask/local-answers";
import {
  FALLBACK_NO_KEY_ANSWER,
  checkMessagesSafety,
  filterModelAnswer,
  type PatientAskHandoff,
} from "@/lib/patient-ask/safety";
import { buildPatientAskSystemPrompt } from "@/lib/patient-ask/system-prompt";

const MAX_MESSAGES = 12;
const MAX_CONTENT_CHARS = 1_200;

const ALLOWED_ORIGIN_HOSTS = new Set([
  "www.nguyensosteopathy.com",
  "nguyensosteopathy.com",
  "localhost",
  "127.0.0.1",
]);

type IncomingMessage = {
  role?: unknown;
  content?: unknown;
};

type AskBody = {
  messages?: IncomingMessage[];
  honeypot?: unknown;
};

function isAllowedHost(host: string): boolean {
  const bare = host.toLowerCase().split(":")[0] || "";
  if (ALLOWED_ORIGIN_HOSTS.has(bare)) return true;
  // Cloudflare Workers preview hosts for this project.
  if (bare.endsWith(".nguyensosteopathy.workers.dev")) return true;
  if (bare.endsWith(".workers.dev") && bare.includes("nguyensosteopathy")) {
    return true;
  }
  return false;
}

function sameSiteOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = (request.headers.get("host") || "").toLowerCase();

  if (!origin) {
    // Browsers may omit Origin on same-origin POST; require sec-fetch-site.
    const secFetchSite = request.headers.get("sec-fetch-site");
    if (secFetchSite === "same-origin" || secFetchSite === "same-site") {
      return isAllowedHost(host);
    }
    // Reject bare requests with neither Origin nor a same-site fetch metadata
    // (blocks casual curl quota burns).
    return false;
  }

  try {
    const originHost = new URL(origin).host.toLowerCase();
    if (!host) return false;
    if (originHost === host) return isAllowedHost(host);
    return isAllowedHost(originHost) && isAllowedHost(host);
  } catch {
    return false;
  }
}

function normaliseMessages(
  raw: IncomingMessage[] | undefined,
): { role: "user" | "assistant"; content: string }[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const sliced = raw.slice(-MAX_MESSAGES);
  const out: { role: "user" | "assistant"; content: string }[] = [];

  for (const item of sliced) {
    const role =
      item.role === "assistant"
        ? "assistant"
        : item.role === "user"
          ? "user"
          : null;
    if (!role) return null;
    if (typeof item.content !== "string") return null;
    const content = item.content.trim().slice(0, MAX_CONTENT_CHARS);
    if (!content) return null;
    out.push({ role, content });
  }

  if (out[out.length - 1]?.role !== "user") return null;
  return out;
}

/**
 * Only send the latest user question to the model (plus system prompt).
 * Ignores client-supplied assistant turns to reduce prompt injection.
 */
function modelMessages(
  messages: { role: "user" | "assistant"; content: string }[],
) {
  const latestUser = messages.filter((m) => m.role === "user").at(-1);
  if (!latestUser) return null;
  return [
    { role: "system" as const, content: buildPatientAskSystemPrompt() },
    { role: "user" as const, content: latestUser.content },
  ];
}

export async function POST(request: Request) {
  if (!sameSiteOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const ip = clientIp(request);
  const { ok, retryAfterSec } = takeRateToken(
    `ask:${ip}`,
    RATE_LIMITS.ask.limit,
    RATE_LIMITS.ask.windowMs,
  );
  if (!ok) {
    return tooManyRequestsJson(retryAfterSec);
  }

  let body: AskBody;
  try {
    body = (await request.json()) as AskBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots that fill hidden fields get a benign success.
  if (typeof body.honeypot === "string" && body.honeypot.trim().length > 0) {
    return NextResponse.json({
      answer: "Thanks — someone from the clinic will be in touch.",
      handoff: "whatsapp" as PatientAskHandoff,
    });
  }

  const messages = normaliseMessages(body.messages);
  if (!messages) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  const safety = checkMessagesSafety(messages);
  if (safety.blocked) {
    return NextResponse.json({
      answer: safety.answer,
      handoff: safety.handoff,
    });
  }

  const latestUser =
    messages.filter((m) => m.role === "user").at(-1)?.content || "";

  // Grounded SSOT answers first for common ops questions (fees/hours/location).
  const local = matchLocalAnswer(latestUser);
  if (local) {
    return NextResponse.json({
      answer: local.answer,
      ...(local.handoff ? { handoff: local.handoff } : {}),
    });
  }

  const config = resolveAiConfig();
  if (!config) {
    return NextResponse.json({
      answer: FALLBACK_NO_KEY_ANSWER,
      handoff: "whatsapp" as PatientAskHandoff,
    });
  }

  const llmMessages = modelMessages(messages);
  if (!llmMessages) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  try {
    const raw = await completeChat(config, llmMessages);
    const filtered = filterModelAnswer(raw);
    return NextResponse.json({
      answer: filtered.answer,
      ...(filtered.handoff ? { handoff: filtered.handoff } : {}),
    });
  } catch {
    return NextResponse.json({
      answer: FALLBACK_NO_KEY_ANSWER,
      handoff: "whatsapp" as PatientAskHandoff,
    });
  }
}
