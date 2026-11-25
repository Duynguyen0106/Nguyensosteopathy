import { faqs, pricing, site } from "@/lib/site";
import { DISCLAIMER, type PatientAskHandoff } from "@/lib/patient-ask/safety";

export type LocalAnswer = {
  answer: string;
  handoff?: PatientAskHandoff;
};

function hasWord(text: string, word: string): boolean {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

function hasAnyWord(text: string, words: string[]): boolean {
  return words.some((word) => hasWord(text, word));
}

function hasPhrase(text: string, phrase: string): boolean {
  return text.includes(phrase.toLowerCase());
}

function hasAnyPhrase(text: string, phrases: string[]): boolean {
  return phrases.some((phrase) => hasPhrase(text, phrase));
}

/**
 * Deterministic answers for the most common clinic-ops questions.
 * Uses word boundaries / intent phrases to avoid false positives
 * (e.g. "open to trying" must not match opening hours).
 */
export function matchLocalAnswer(question: string): LocalAnswer | null {
  const q = question.toLowerCase().trim();

  if (
    hasAnyPhrase(q, [
      "how much",
      "initial visit",
      "initial consultation",
    ]) ||
    hasAnyWord(q, ["fee", "fees", "price", "prices", "cost", "pricing", "charge"]) ||
    q.includes("£")
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
        DISCLAIMER,
      ].join("\n"),
      handoff: "book",
    };
  }

  // Cancellation before generic "book" intent.
  if (
    hasAnyWord(q, ["cancel", "cancellation", "reschedule", "postpone"]) ||
    hasAnyPhrase(q, ["cancel my", "change my booking", "change my appointment"])
  ) {
    return {
      answer: [
        site.cancellation,
        "Please call or WhatsApp as soon as you know, or use the options in your booking confirmation.",
        `Phone: ${site.phone}`,
        "",
        DISCLAIMER,
      ].join("\n"),
      handoff: "whatsapp",
    };
  }

  if (
    hasAnyWord(q, ["hour", "hours", "opening"]) ||
    hasAnyPhrase(q, [
      "when are you open",
      "what time are you",
      "are you open",
      "opening times",
      "opening hours",
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
        DISCLAIMER,
      ].join("\n"),
      handoff: "book",
    };
  }

  if (
    hasAnyPhrase(q, [
      "where are you",
      "find you",
      "your address",
      "clinic address",
      "village pharmacy",
      "how do i get",
    ]) ||
    hasAnyWord(q, ["address", "location", "parking", "directions"])
  ) {
    return {
      answer: [
        `We are inside ${site.address.venue} at ${site.address.line1}, ${site.address.line2}.`,
        "Ask at the pharmacy counter on arrival and they will direct you to the osteopathy room.",
        "Directions and parking: /find-us",
        "",
        DISCLAIMER,
      ].join("\n"),
      handoff: "phone",
    };
  }

  if (
    hasAnyPhrase(q, [
      "gp referral",
      "doctor referral",
      "need a gp",
      "need a doctor",
      "need referral",
    ]) ||
    (hasWord(q, "referral") && !hasWord(q, "prefer"))
  ) {
    return {
      answer: [
        "No GP referral is required — you can book directly online or by phone.",
        "If you have relevant medical letters or imaging, bring them along.",
        "Book: /book",
        "",
        DISCLAIMER,
      ].join("\n"),
      handoff: "book",
    };
  }

  if (
    hasAnyPhrase(q, [
      "book online",
      "book an appointment",
      "make an appointment",
      "availability",
      "available slots",
      "want to book",
      "like to book",
    ]) ||
    (hasWord(q, "appointment") &&
      hasAnyWord(q, ["book", "booking", "schedule", "arrange"])) ||
    (hasWord(q, "slot") && hasAnyWord(q, ["book", "available", "free"]))
  ) {
    return {
      answer: [
        "You can book online at /book, or call/WhatsApp the clinic for help choosing a time.",
        site.booking.shortNote,
        "",
        DISCLAIMER,
      ].join("\n"),
      handoff: "book",
    };
  }

  if (
    hasAnyWord(q, ["nhs", "student", "discount"]) ||
    hasAnyPhrase(q, ["10%", "ten percent"])
  ) {
    return {
      answer: [
        site.discount,
        "More detail: /nhs-discount",
        "",
        DISCLAIMER,
      ].join("\n"),
      handoff: "book",
    };
  }

  // Soft FAQ overlap — prefer question-side tokens; require stronger score.
  const stop = new Set([
    "what",
    "when",
    "where",
    "which",
    "with",
    "have",
    "does",
    "about",
    "your",
    "from",
    "this",
    "that",
    "they",
    "them",
    "will",
    "would",
    "could",
    "should",
    "into",
    "than",
    "then",
    "just",
    "like",
    "some",
    "more",
    "also",
    "very",
  ]);
  const tokens = q
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 3 && !stop.has(t));

  if (tokens.length >= 2) {
    let best: {
      score: number;
      questionScore: number;
      question: string;
      answer: string;
    } | null = null;

    for (const item of faqs) {
      const questionHay = item.question.toLowerCase();
      const answerHay = item.answer.toLowerCase();
      let questionScore = 0;
      let answerScore = 0;
      for (const token of tokens) {
        if (questionHay.includes(token)) questionScore += 1;
        else if (answerHay.includes(token)) answerScore += 1;
      }
      // Weight question matches higher than answer-body matches.
      const score = questionScore * 2 + answerScore;
      if (
        questionScore >= 3 &&
        score >= 5 &&
        (!best || score > best.score)
      ) {
        best = {
          score,
          questionScore,
          question: item.question,
          answer: item.answer,
        };
      }
    }

    if (best && best.questionScore >= 3 && best.score >= 5) {
      return {
        answer: [
          best.answer,
          "",
          `Related FAQ: ${best.question}`,
          "More answers: /faq",
          "",
          DISCLAIMER,
        ].join("\n"),
      };
    }
  }

  return null;
}
