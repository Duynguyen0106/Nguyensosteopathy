import { faqs, pricing, site } from "@/lib/site";
import type { PatientAskHandoff } from "@/lib/patient-ask/safety";

export type LocalAnswer = {
  answer: string;
  handoff?: PatientAskHandoff;
};

function includesAny(text: string, needles: string[]): boolean {
  return needles.some((needle) => text.includes(needle));
}

/**
 * Deterministic answers for the most common clinic-ops questions.
 * Used before the LLM and as a better fallback when the model is unavailable.
 */
export function matchLocalAnswer(question: string): LocalAnswer | null {
  const q = question.toLowerCase();

  if (
    includesAny(q, [
      "fee",
      "fees",
      "price",
      "prices",
      "cost",
      "how much",
      "pricing",
      "charge",
      "£",
      "initial visit",
      "initial consultation",
    ])
  ) {
    const lines = pricing
      .slice(0, 6)
      .map((row) => `• ${row.service} (${row.duration}): ${row.price}`)
      .join("\n");
    return {
      answer: [
        "Here are the main clinic fees:",
        lines,
        "",
        `${site.discount}. Full list: /fees`,
        "",
        "General clinic information — not a diagnosis.",
      ].join("\n"),
      handoff: "book",
    };
  }

  if (
    includesAny(q, [
      "hour",
      "hours",
      "open",
      "opening",
      "when are you",
      "what time",
    ])
  ) {
    const hours = site.booking.hours
      .map((row) => `${row.days}, ${row.time}`)
      .join("; ");
    return {
      answer: [
        `We are open ${hours}.`,
        site.booking.note,
        "Live slots are always shown on /book.",
        "",
        "General clinic information — not a diagnosis.",
      ].join("\n"),
      handoff: "book",
    };
  }

  if (
    includesAny(q, [
      "where are you",
      "address",
      "location",
      "find you",
      "parking",
      "charlton",
      "village pharmacy",
    ])
  ) {
    return {
      answer: [
        `We are inside ${site.address.venue} at ${site.address.line1}, ${site.address.line2}.`,
        "Ask at the pharmacy counter on arrival and they will direct you to the osteopathy room.",
        "Directions and parking: /find-us",
        "",
        "General clinic information — not a diagnosis.",
      ].join("\n"),
      handoff: "phone",
    };
  }

  if (
    includesAny(q, [
      "referral",
      "gp referral",
      "doctor referral",
      "need a gp",
      "need a doctor",
    ])
  ) {
    return {
      answer: [
        "No GP referral is required — you can book directly online or by phone.",
        "If you have relevant medical letters or imaging, bring them along.",
        "Book: /book",
        "",
        "General clinic information — not a diagnosis.",
      ].join("\n"),
      handoff: "book",
    };
  }

  if (includesAny(q, ["book", "appointment", "availability", "slot"])) {
    return {
      answer: [
        "You can book online at /book, or call/WhatsApp the clinic for help choosing a time.",
        site.booking.shortNote,
        "",
        "General clinic information — not a diagnosis.",
      ].join("\n"),
      handoff: "book",
    };
  }

  if (includesAny(q, ["nhs", "student", "discount"])) {
    return {
      answer: [
        site.discount,
        "More detail: /nhs-discount",
        "",
        "General clinic information — not a diagnosis.",
      ].join("\n"),
      handoff: "book",
    };
  }

  // Soft FAQ keyword overlap — first published FAQ that shares several words.
  const tokens = q
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 3);
  if (tokens.length >= 2) {
    let best: { score: number; question: string; answer: string } | null = null;
    for (const item of faqs) {
      const hay = `${item.question} ${item.answer}`.toLowerCase();
      const score = tokens.reduce((sum, token) => sum + (hay.includes(token) ? 1 : 0), 0);
      if (score >= 2 && (!best || score > best.score)) {
        best = { score, question: item.question, answer: item.answer };
      }
    }
    if (best && best.score >= Math.min(3, tokens.length)) {
      return {
        answer: [
          best.answer,
          "",
          `Related FAQ: ${best.question}`,
          "More answers: /faq",
          "",
          "General clinic information — not a diagnosis.",
        ].join("\n"),
      };
    }
  }

  return null;
}
