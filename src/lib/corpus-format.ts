/**
 * Format American Dragon corpus section bodies for readable clinic UI.
 */

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

export function formatCorpusHeading(heading: string): string {
  return String(heading || "")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAnd\b/g, "and")
    .replace(/\bOf\b/g, "of")
    .replace(/\bThe\b/g, "the")
    .replace(/\bWith\b/g, "with")
    .replace(/\bIn\b/g, "in")
    .replace(/\bFor\b/g, "for");
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
  const lines = String(body || "")
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
  const ch = String(title || "")
    .replace(/^\(+/, "")
    .trim()
    .charAt(0)
    .toUpperCase();
  return /[A-Z]/.test(ch) ? ch : "#";
}
