/**
 * Format American Dragon corpus section bodies for readable clinic UI.
 */

import { trimDescription } from "@/lib/seo";

const MERIDIANS = new Set(
  [
    "heart",
    "liver",
    "spleen",
    "lung",
    "kidney",
    "pericardium",
    "gallbladder",
    "stomach",
    "small intestine",
    "large intestine",
    "bladder",
    "san jiao",
    "triple burner",
    "ren",
    "du",
    "chong",
    "dai",
  ].map((s) => s.toLowerCase()),
);

const TEMPERATURES = new Set(
  [
    "warm",
    "slightly warm",
    "cold",
    "slightly cold",
    "cool",
    "neutral",
    "hot",
    "slightly hot",
  ].map((s) => s.toLowerCase()),
);

const TASTES = new Set(
  [
    "sweet",
    "acrid",
    "bitter",
    "sour",
    "salty",
    "bland",
    "aromatic",
    "astringent",
  ].map((s) => s.toLowerCase()),
);

const SMALL_TITLE_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
  "vs",
]);

/** Readable display titles: "DANG GUI" → "Dang Gui", keep LI-4 / N-HN-54. */
export function formatCorpusTitle(title: string): string {
  const raw = title.replace(/\s+/g, " ").trim();
  if (!raw) return "";

  // Mask point codes so hyphen splitting does not break LI-4 / N-HN-54.
  const codes: string[] = [];
  const masked = raw.replace(
    /\b((?:[MN]-[A-Z]+-\d+)|(?:(?:REN|DU|UB|SJ|PC|HT|LU|LI|ST|SP|KI|LIV|GB|SI|BL|TB|CV|GV|[A-Z]{1,3})-?\d+[A-Z]?))\b/gi,
    (match) => {
      codes.push(match.toUpperCase().replace(/\s+/g, ""));
      return `__CODE${codes.length - 1}__`;
    },
  );

  const titled = masked
    .split(/(\s+|[-–—/(),#])/)
    .map((token, index, arr) => {
      if (!token || /^(\s+|[-–—/(),#])$/.test(token)) return token;
      if (/^__CODE\d+__$/.test(token)) return token;
      if (/^EXTRA$/i.test(token)) return "Extra";
      if (/^\d+[A-Z]?$/i.test(token)) return token;
      if (/[\u4e00-\u9fff]/.test(token)) return token;

      const lower = token.toLowerCase();
      const prev = arr[index - 1];
      // Capitalize the first word and words after ( or /; keep small words
      // lowercase mid-title (after spaces/hyphens).
      const forceCap =
        index === 0 || prev === "(" || prev === "/";
      if (!forceCap && SMALL_TITLE_WORDS.has(lower)) return lower;
      return lower.replace(/^[a-z]/, (c) => c.toUpperCase());
    })
    .join("");

  return titled.replace(/__CODE(\d+)__/g, (_, i) => codes[Number(i)] || "");
}

/** Section headings share the same title-case rules as corpus display titles. */
export function formatCorpusHeading(heading: string): string {
  return formatCorpusTitle(heading);
}

/** Merge soft-wrapped lines where a continuation starts lowercase or mid-clause. */
export function mergeSoftWrappedLines(lines: string[]): string[] {
  const out: string[] = [];
  for (const raw of lines) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (!line) continue;
    const prev = out[out.length - 1];
    if (
      prev &&
      !/[.!?…"”')\]]$/.test(prev) &&
      (/^[a-z]/.test(line) ||
        /^(and|or|with|from|to|of|the|a|an|in|on|for|due)\b/i.test(line))
    ) {
      out[out.length - 1] = `${prev} ${line}`;
    } else {
      out.push(line);
    }
  }
  return out;
}

export type CorpusBlock =
  | { kind: "paragraphs"; paragraphs: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "pairs"; pairs: { label: string; value: string }[] }
  | {
      kind: "split";
      groups: { title: string; items: string[] }[];
    };

function parseProperties(body: string): CorpusBlock | null {
  const lines = body
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 5) return null;

  const headerIdx = {
    taste: lines.findIndex((l) => /^taste$/i.test(l)),
    temperature: lines.findIndex((l) => /^temperature$/i.test(l)),
    meridians: lines.findIndex((l) => /^entering meridians?$/i.test(l)),
    dosage: lines.findIndex((l) => /^dosage$/i.test(l)),
  };
  if (
    headerIdx.taste < 0 ||
    headerIdx.temperature < 0 ||
    headerIdx.meridians < 0 ||
    headerIdx.dosage < 0
  ) {
    return null;
  }

  const values = lines.slice(
    Math.max(headerIdx.taste, headerIdx.temperature, headerIdx.meridians, headerIdx.dosage) +
      1,
  );

  const tastes: string[] = [];
  const temps: string[] = [];
  const meridians: string[] = [];
  const dosages: string[] = [];

  for (const value of values) {
    const lower = value.toLowerCase().replace(/[()]/g, "").trim();
    if (/^\d|tincture|g\b|ml\b|decoction|pill/i.test(value)) {
      dosages.push(value);
    } else if (
      TEMPERATURES.has(lower) ||
      (/^slightly\s+/i.test(value) && /warm|cold|cool|hot/i.test(value))
    ) {
      temps.push(value);
    } else if (MERIDIANS.has(lower) || /jiao|channel/i.test(value)) {
      meridians.push(value);
    } else if (TASTES.has(lower)) {
      tastes.push(value);
    } else if (dosages.length) {
      dosages.push(value);
    } else if (meridians.length) {
      meridians.push(value);
    } else if (temps.length) {
      temps.push(value);
    } else {
      tastes.push(value);
    }
  }

  const pairs = [
    { label: "Taste", value: tastes.join(", ") },
    { label: "Temperature", value: temps.join(", ") },
    { label: "Entering meridians", value: meridians.join(", ") },
    { label: "Dosage", value: dosages.join("; ") },
  ].filter((p) => p.value);

  return pairs.length ? { kind: "pairs", pairs } : null;
}

const ACTION_LINE =
  /^(Tonifies|Invigorates|Clears|Warms|Cools|Disperses|Regulates|Calms|Stops|Nourishes|Strengthens|Harmonizes|Releases|Expels|Drains|Dries|Moistens|Promotes|Resolves|Softens|Breaks|Moves|Activates|Sedates|Unbinds|Expands|Dispels|Relieves|Reduces|Generates|Anchors|Extinguishes|Transforms|Astringes|Stabilizes|Restrains|Kills|Expels|Opens|Benefits|Directs|Descends|Raises|Augments|Supplements|Tonify|Clear|Warm|Cool)\b/i;

function parseActionsIndications(body: string): CorpusBlock | null {
  const lines = mergeSoftWrappedLines(
    body
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean),
  );
  const actionsIdx = lines.findIndex((l) => /^actions?$/i.test(l));
  const indicIdx = lines.findIndex((l) =>
    /^indications?(\/syndromes)?$/i.test(l),
  );
  if (actionsIdx < 0 && indicIdx < 0) return null;

  const headerOnlyGap =
    actionsIdx >= 0 &&
    indicIdx === actionsIdx + 1;

  const groups: { title: string; items: string[] }[] = [];

  if (headerOnlyGap) {
    // AD tables often emit both column headers, then interleaved rows.
    const actions: string[] = [];
    const indications: string[] = [];
    for (const line of lines.slice(indicIdx + 1)) {
      if (ACTION_LINE.test(line)) actions.push(line);
      else indications.push(line);
    }
    if (actions.length) groups.push({ title: "Actions", items: actions });
    if (indications.length) {
      groups.push({ title: "Indications / syndromes", items: indications });
    }
  } else {
    if (actionsIdx >= 0) {
      const end = indicIdx > actionsIdx ? indicIdx : lines.length;
      const items = lines
        .slice(actionsIdx + 1, end)
        .filter((l) => !/^actions?$/i.test(l));
      if (items.length) groups.push({ title: "Actions", items });
    }
    if (indicIdx >= 0) {
      const items = lines
        .slice(indicIdx + 1)
        .filter((l) => !/^indications?/i.test(l));
      if (items.length) {
        groups.push({ title: "Indications / syndromes", items });
      }
    }
  }
  return groups.length ? { kind: "split", groups } : null;
}

function stripRepeatedHeading(heading: string, body: string): string {
  const key = heading.replace(/:$/, "").trim().toUpperCase();
  const lines = body
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  while (
    lines[0] &&
    (lines[0].toUpperCase() === key ||
      lines[0].toUpperCase().startsWith(`${key} `) ||
      /^(contraindications|incompatibilities|herb\/drug interactions)$/i.test(
        lines[0],
      ))
  ) {
    // Drop echoed section labels that AD often repeats in the body.
    if (
      lines[0].toUpperCase() === key ||
      /^(contraindications|incompatibilities|herb\/drug interactions)$/i.test(
        lines[0],
      )
    ) {
      lines.shift();
      continue;
    }
    break;
  }
  return lines.join("\n");
}

export function formatCorpusSection(
  heading: string,
  body: string,
): CorpusBlock {
  const key = heading.toUpperCase();
  const cleaned = stripRepeatedHeading(heading, body);
  if (key === "PROPERTIES" || key === "PROPERTY") {
    const parsed = parseProperties(cleaned);
    if (parsed) return parsed;
  }
  if (
    key === "ACTIONS AND INDICATIONS" ||
    key === "ACTIONS AND INDICATION" ||
    key === "FORMULA ACTIONS"
  ) {
    const parsed = parseActionsIndications(cleaned);
    if (parsed) return parsed;
  }

  const merged = mergeSoftWrappedLines(
    cleaned
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean),
  );

  // Promote ALL-CAPS sublabels (INCOMPATIBILITIES, etc.) into split groups.
  const sublabelIdx = merged.findIndex((l) =>
    /^(INCOMPATIBILITIES|HERB\/DRUG INTERACTIONS|NOTES|CAUTIONS)$/i.test(l),
  );
  if (sublabelIdx > 0) {
    const groups: { title: string; items: string[] }[] = [
      { title: "Notes", items: merged.slice(0, sublabelIdx) },
    ];
    let current = merged[sublabelIdx];
    let bucket: string[] = [];
    for (const line of merged.slice(sublabelIdx + 1)) {
      if (/^(INCOMPATIBILITIES|HERB\/DRUG INTERACTIONS|NOTES|CAUTIONS)$/i.test(line)) {
        if (bucket.length) {
          groups.push({
            title: formatCorpusHeading(current),
            items: bucket,
          });
        }
        current = line;
        bucket = [];
      } else {
        bucket.push(line);
      }
    }
    if (bucket.length) {
      groups.push({ title: formatCorpusHeading(current), items: bucket });
    }
    return { kind: "split", groups: groups.filter((g) => g.items.length) };
  }

  // Short label-like lines → list; longer prose → paragraphs
  const short = merged.filter((l) => l.length < 80 && !/[.]/.test(l));
  if (merged.length >= 4 && short.length >= merged.length * 0.7) {
    return { kind: "list", items: merged };
  }
  return { kind: "paragraphs", paragraphs: merged };
}

export function corpusSearchPlaceholder(type: string): string {
  switch (type) {
    case "points":
      return "Point name or code (e.g. Hegu, LI-4)…";
    case "herbs":
      return "Pinyin or Latin (e.g. Dang Gui, Angelica)…";
    case "formulas":
      return "Formula name (e.g. Xiao Yao San, Acne)…";
    case "conditions":
      return "Condition or pattern (e.g. headache, Blood Stasis)…";
    default:
      return "Search this list…";
  }
}

export function letterKey(title: string): string {
  const ch = title
    .replace(/^\(+/, "")
    .trim()
    .charAt(0)
    .toUpperCase();
  return /[A-Z]/.test(ch) ? ch : "#";
}

/**
 * SERP meta description for a corpus record — never Latin/category alone.
 * Prefer title + latin suffix + first meaningful section prose.
 */
export function corpusMetaDescription(input: {
  displayTitle: string;
  typeLabel: string;
  latin?: string | null;
  category?: string | null;
  pointCode?: string | null;
  sections?: Record<string, string>;
  summary?: string | null;
}): string {
  const display = formatCorpusTitle(input.displayTitle);
  const latin = input.latin?.trim() || "";
  const category = input.category?.split(":")[0]?.trim() || "";
  const point = input.pointCode?.trim() || "";
  const sectionProse = Object.entries(input.sections || {})
    .filter(([key]) => key !== "INTRO" && key !== "NAME" && key !== "CATEGORY")
    .map(([, body]) => body.replace(/\s+/g, " ").trim())
    .find((body) => body.length > 40);
  const summary = (input.summary || "").replace(/\s+/g, " ").trim();
  const prose = sectionProse || summary;

  const identity = [
    display,
    latin ? `(${latin})` : "",
    point && point !== "EXTRA" ? point : "",
    category,
  ]
    .filter(Boolean)
    .join(" ");

  const lead = `${identity} — American Dragon ${input.typeLabel.toLowerCase()} reference for clinic education at Nguyen's Osteopathic Clinic.`;
  const joined = prose ? `${lead} ${prose}` : lead;
  return trimDescription(joined);
}
