import { NextResponse } from "next/server";
import {
  clientIp,
  takeRateToken,
  tooManyRequestsResponse,
} from "@/lib/anti-scrape";
import { completeChat, resolveAiConfig } from "@/lib/patient-ask/llm";
import { matchLocalAnswer } from "@/lib/patient-ask/local-answers";
import {
  FALLBACK_NO_KEY_ANSWER,
  checkPatientAskSafety,
  extractHandoff,
  type PatientAskHandoff,
} from "@/lib/patient-ask/safety";
import { buildPatientAskSystemPrompt } from "@/lib/patient-ask/system-prompt";

const MAX_MESSAGES = 12;
const MAX_CONTENT_CHARS = 1_200;
const ASK_RATE = { limit: 10, windowMs: 10 * 60_000 } as const;

type IncomingMessage = {
  role?: unknown;
  content?: unknown;
};

type AskBody = {
  messages?: IncomingMessage[];
  honeypot?: unknown;
};

function sameSiteOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Same-origin navigations / some browsers omit Origin on POST from same site.
    const secFetchSite = request.headers.get("sec-fetch-site");
    if (!secFetchSite || secFetchSite === "same-origin" || secFetchSite === "same-site") {
      return true;
    }
    return false;
  }

  try {
    const host = request.headers.get("host") || "";
    const originHost = new URL(origin).host;
    if (!host) return false;
    return originHost === host || originHost.endsWith(".nguyensosteopathy.com");
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
    const role = item.role === "assistant" ? "assistant" : item.role === "user" ? "user" : null;
    if (!role) return null;
    if (typeof item.content !== "string") return null;
    const content = item.content.trim().slice(0, MAX_CONTENT_CHARS);
    if (!content) return null;
    out.push({ role, content });
  }

  if (out[out.length - 1]?.role !== "user") return null;
  return out;
}

export async function POST(request: Request) {
  if (!sameSiteOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const ip = clientIp(request);
  const { ok, retryAfterSec } = takeRateToken(
    `ask:${ip}`,
    ASK_RATE.limit,
    ASK_RATE.windowMs,
  );
  if (!ok) {
    return tooManyRequestsResponse(retryAfterSec);
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

  const latestUser = messages.filter((m) => m.role === "user").at(-1)?.content || "";
  const safety = checkPatientAskSafety(latestUser);
  if (safety.blocked) {
    return NextResponse.json({
      answer: safety.answer,
      handoff: safety.handoff,
    });
  }

  // Grounded SSOT answers first for common ops questions (fees/hours/location).
  const local = matchLocalAnswer(latestUser);
  if (local) {
    return NextResponse.json({
      answer: local.answer,
      ...(local.handoff ? { handoff: local.handoff } : {}),
      local: true,
    });
  }

  const config = resolveAiConfig();
  if (!config) {
    return NextResponse.json({
      answer: FALLBACK_NO_KEY_ANSWER,
      handoff: "whatsapp" as PatientAskHandoff,
      fallback: true,
    });
  }

  try {
    const raw = await completeChat(config, [
      { role: "system", content: buildPatientAskSystemPrompt() },
      ...messages,
    ]);
    const { cleanAnswer, handoff } = extractHandoff(raw);
    return NextResponse.json({
      answer: cleanAnswer,
      ...(handoff ? { handoff } : {}),
    });
  } catch {
    return NextResponse.json({
      answer: FALLBACK_NO_KEY_ANSWER,
      handoff: "whatsapp" as PatientAskHandoff,
      fallback: true,
    });
  }
}
