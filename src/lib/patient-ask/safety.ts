import { site } from "@/lib/site";

export type PatientAskHandoff = "whatsapp" | "phone" | "book" | "urgent";

export type SafetyResult =
  | { blocked: true; answer: string; handoff: PatientAskHandoff }
  | { blocked: false };

export const DISCLAIMER =
  "General clinic information — not a diagnosis.";

const URGENT_PATTERNS: RegExp[] = [
  /\b999\b/,
  /\b111\b/,
  /\bemergency\b/,
  /\bchest pain\b/,
  /\bchest (pressure|tightness|crushing)\b/,
  /\bcrushing (pressure|pain)\b.{0,20}\bchest\b/,
  /\bheart attack\b/,
  /\banaphylaxis\b/,
  /\ballergic reaction\b.{0,20}\b(swelling|throat|breath)/,
  /\bstroke\b/,
  /\bfacial droop(ing)?\b/,
  /\b(arm|leg) weakness\b.{0,30}\b(face|speech|droop)/,
  /\b(face|facial).{0,20}(droop|weakness).{0,30}(arm|speech)/,
  /\b(can't|cannot|cant|hard to)\b.{0,20}\b(breathe|breathing)\b/,
  /\bshort(ness)? of breath\b/,
  /\bsaddle (an(ae|e)sthesia|numbness)\b/,
  /\bnumb(ness)? between (my )?legs\b/,
  /\b(loss|lost|cannot|can't|cant|leaking)\b.{0,40}\b(bladder|bowel|urine|stool|wee|poo)\b/,
  /\b(bladder|bowel)\b.{0,40}\b(incontinence|control|accident|leaking)\b/,
  /\bcauda equina\b/,
  /\bprogressive (leg |arm )?(weakness|paralysis)\b/,
  /\bunexplained fever\b.{0,30}\b(back|spine)\b/,
  /\b(back|spine)\b.{0,30}\bunexplained fever\b/,
  /\bsudden (severe )?headache\b/,
  /\b(worst|thunderclap) headache\b/,
  /\bheadache\b.{0,20}\b(worst of (my|the) life|sudden|thunderclap)\b/,
  /\bsuicid(e|al)\b/,
  /\bself[- ]?harm\b/,
  /\b(want to|wanna|going to)\b.{0,20}\b(die|kill myself|end (it|my life))\b/,
  /\bkill myself\b/,
  /\boverdose\b/,
  // Vietnamese urgent cues
  /\bcấp cứu\b/i,
  /\bđột quỵ\b/i,
  /\bđau ngực\b/i,
  /\bkhó thở\b/i,
  /\bmất kiểm soát (tiểu|đại tiện)\b/i,
  /\bmuốn chết\b/i,
];

/** Diagnostic-sounding model output that must not reach patients. */
const DIAGNOSTIC_OUTPUT_PATTERNS: RegExp[] = [
  /\byou (likely |probably )?(have|are suffering from)\b/i,
  /\byour diagnosis\b/i,
  /\bi diagnose\b/i,
  /\bthis (is|sounds like) (definitely )?(a )?(herniated|slipped) disc\b/i,
  /\byou (should|must) (take|start|stop) (this )?(medication|drug|tablet|antibiotic)\b/i,
];

export function urgentAnswer(): string {
  return [
    "If you may be having a medical emergency, contact NHS 111 or call 999 now — do not wait for a clinic reply.",
    "",
    "Red-flag symptoms that need urgent medical advice include saddle numbness, new bladder or bowel control problems, progressive limb weakness, unexplained fever with severe back pain, sudden severe headache, chest pain, breathing difficulty, or stroke signs.",
    "",
    `For non-emergency clinic questions you can still call us on ${site.phone}, but urgent care comes first.`,
    "",
    DISCLAIMER,
  ].join("\n");
}

function matchesUrgent(text: string): boolean {
  const normalised = text.toLowerCase();
  return URGENT_PATTERNS.some((pattern) => pattern.test(normalised));
}

/**
 * Cheap pre-LLM gate for emergency / red-flag language.
 */
export function checkPatientAskSafety(text: string): SafetyResult {
  if (matchesUrgent(text)) {
    return { blocked: true, answer: urgentAnswer(), handoff: "urgent" };
  }
  return { blocked: false };
}

/** Run safety across every user turn in the conversation payload. */
export function checkMessagesSafety(
  messages: { role: string; content: string }[],
): SafetyResult {
  for (const message of messages) {
    if (message.role !== "user") continue;
    const result = checkPatientAskSafety(message.content);
    if (result.blocked) return result;
  }
  return { blocked: false };
}

/** Parse trailing HANDOFF token from model output (any trailing occurrence). */
export function extractHandoff(answer: string): {
  cleanAnswer: string;
  handoff?: PatientAskHandoff;
} {
  const match = answer.match(/\n?\s*HANDOFF:(book|whatsapp|phone|urgent)\s*$/i);
  if (!match) {
    // Also strip mid-text tokens so they never show to patients.
    const scrubbed = answer
      .replace(/\bHANDOFF:(book|whatsapp|phone|urgent)\b/gi, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    return { cleanAnswer: scrubbed };
  }
  const handoff = match[1]!.toLowerCase() as PatientAskHandoff;
  const cleanAnswer = answer
    .slice(0, match.index)
    .replace(/\bHANDOFF:(book|whatsapp|phone|urgent)\b/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { cleanAnswer, handoff };
}

export function ensureDisclaimer(answer: string): string {
  const trimmed = answer.trim();
  if (/not a diagnosis/i.test(trimmed)) return trimmed;
  return `${trimmed}\n\n${DISCLAIMER}`;
}

/**
 * Post-LLM gate: block diagnostic-sounding output and re-check red flags.
 */
export function filterModelAnswer(answer: string): {
  answer: string;
  handoff?: PatientAskHandoff;
} {
  const { cleanAnswer, handoff } = extractHandoff(answer);

  if (matchesUrgent(cleanAnswer) || DIAGNOSTIC_OUTPUT_PATTERNS.some((p) => p.test(cleanAnswer))) {
    return { answer: urgentAnswer(), handoff: "urgent" };
  }

  return {
    answer: ensureDisclaimer(cleanAnswer),
    ...(handoff ? { handoff } : {}),
  };
}

export const FALLBACK_NO_KEY_ANSWER = [
  "The clinic assistant is temporarily unavailable.",
  "",
  "You can still:",
  "- Browse FAQs at /faq",
  "- Check fees at /fees",
  "- Book online at /book",
  `- Message on WhatsApp or call ${site.phone}`,
  "",
  DISCLAIMER,
].join("\n");
