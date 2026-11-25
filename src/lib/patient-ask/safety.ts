import { site } from "@/lib/site";

export type PatientAskHandoff = "whatsapp" | "phone" | "book" | "urgent";

export type SafetyResult =
  | { blocked: true; answer: string; handoff: PatientAskHandoff }
  | { blocked: false };

const URGENT_PATTERNS: RegExp[] = [
  /\b999\b/,
  /\b111\b/,
  /\bemergency\b/,
  /\bchest pain\b/,
  /\bheart attack\b/,
  /\bstroke\b/,
  /\bfacial droop\b/,
  /\bsaddle (an(ae|e)sthesia|numbness)\b/,
  /\b(loss|lost|cannot|can't|cant)\b.{0,40}\b(bladder|bowel|urine|stool)\b/,
  /\b(bladder|bowel)\b.{0,40}\b(incontinence|control|accident)\b/,
  /\bcauda equina\b/,
  /\bprogressive (leg |arm )?(weakness|paralysis)\b/,
  /\bunexplained fever\b.{0,30}\b(back|spine)\b/,
  /\b(back|spine)\b.{0,30}\bunexplained fever\b/,
  /\bsudden (severe )?headache\b/,
  /\bsuicid(e|al)\b/,
  /\bself[- ]?harm\b/,
  // Vietnamese urgent cues
  /\bcấp cứu\b/i,
  /\bđột quỵ\b/i,
  /\bđau ngực\b/i,
  /\bmất kiểm soát (tiểu|đại tiện)\b/i,
];

function urgentAnswer(): string {
  return [
    "If you may be having a medical emergency, contact NHS 111 or call 999 now — do not wait for a clinic reply.",
    "",
    "Red-flag symptoms that need urgent medical advice include saddle numbness, new bladder or bowel control problems, progressive limb weakness, unexplained fever with severe back pain, sudden severe headache, chest pain, or stroke signs.",
    "",
    `For non-emergency clinic questions you can still call us on ${site.phone}, but urgent care comes first.`,
    "",
    "This assistant gives general clinic information only — not a diagnosis.",
  ].join("\n");
}

/**
 * Cheap pre-LLM gate for emergency / red-flag language.
 */
export function checkPatientAskSafety(text: string): SafetyResult {
  const normalised = text.toLowerCase();
  for (const pattern of URGENT_PATTERNS) {
    if (pattern.test(normalised)) {
      return { blocked: true, answer: urgentAnswer(), handoff: "urgent" };
    }
  }
  return { blocked: false };
}

/** Parse trailing HANDOFF token from model output. */
export function extractHandoff(answer: string): {
  cleanAnswer: string;
  handoff?: PatientAskHandoff;
} {
  const match = answer.match(/\n?\s*HANDOFF:(book|whatsapp|phone|urgent)\s*$/i);
  if (!match) return { cleanAnswer: answer.trim() };
  const handoff = match[1]!.toLowerCase() as PatientAskHandoff;
  const cleanAnswer = answer.slice(0, match.index).trim();
  return { cleanAnswer, handoff };
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
  "This is general clinic information — not a diagnosis.",
].join("\n");
