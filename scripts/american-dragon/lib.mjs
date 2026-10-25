/**
 * Shared helpers for American Dragon corpus discovery / fetch / parse.
 * Permission-gated: fetch requires AMERICAN_DRAGON_PERMISSION=confirmed.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "../..");
export const MANIFEST_PATH = path.join(
  ROOT,
  "src/data/american-dragon/manifest.json",
);
export const PRIVATE_ROOT = path.join(ROOT, "private/american-dragon");
export const RAW_DIR = path.join(PRIVATE_ROOT, "raw");
export const NORMALIZED_DIR = path.join(PRIVATE_ROOT, "normalized");
export const INVENTORY_PATH = path.join(PRIVATE_ROOT, "inventory.json");
export const PUBLIC_INDEX_PATH = path.join(
  ROOT,
  "src/data/acupuncture-corpus/index.json",
);

export function loadManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
}

export function assertPermission(manifest = loadManifest()) {
  const envName = manifest.permissionEnv || "AMERICAN_DRAGON_PERMISSION";
  const expected = manifest.permissionValue || "confirmed";
  if (process.env[envName] !== expected) {
    console.error(
      `Refusing to fetch/parse live American Dragon pages.\n` +
        `Set ${envName}=${expected} only after written owner/estate permission.\n` +
        `Discovery of public index URLs (no page bodies) can still run with --indexes-only.`,
    );
    process.exit(2);
  }
}

export function ensureDirs() {
  for (const dir of [
    RAW_DIR,
    path.join(RAW_DIR, "points"),
    path.join(RAW_DIR, "herbs"),
    path.join(RAW_DIR, "formulas"),
    path.join(RAW_DIR, "conditions"),
    path.join(RAW_DIR, "indexes"),
    path.join(NORMALIZED_DIR, "points"),
    path.join(NORMALIZED_DIR, "herbs"),
    path.join(NORMALIZED_DIR, "formulas"),
    path.join(NORMALIZED_DIR, "conditions"),
    path.dirname(PUBLIC_INDEX_PATH),
  ]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function absolutize(baseUrl, href) {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return null;
  }
}

export function slugFromUrl(url) {
  const pathname = new URL(url).pathname;
  const base = path.basename(pathname, path.extname(pathname));
  return decodeURIComponent(base)
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function contentTypeForUrl(url, manifest) {
  const decoded = decodeURIComponent(url);
  for (const [type, needles] of Object.entries(manifest.linkMatchers)) {
    if (needles.some((n) => decoded.includes(n) || url.includes(n))) {
      return type;
    }
  }
  return null;
}

export async function fetchText(url, manifest, { retries } = {}) {
  const max = retries ?? manifest.maxRetries ?? 3;
  let lastErr;
  for (let attempt = 1; attempt <= max; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": manifest.userAgent,
          Accept: "text/html,application/xhtml+xml",
        },
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await res.text();
    } catch (err) {
      lastErr = err;
      await sleep(manifest.rateLimitMs * attempt);
    }
  }
  throw lastErr;
}

/** Decode common HTML entities including numeric Chinese codepoints. */
export function decodeEntities(text) {
  return String(text || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
    // Preserve newlines for section body parsing; collapse other whitespace.
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .trim();
}

export function stripTags(html) {
  return decodeEntities(
    String(html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|tr|h\d|td|th)>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  );
}

/** Strip tags lightly for section body extraction. */
export function htmlToLines(html) {
  return stripTags(html)
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

/** Short chrome-only lines to drop (must match the whole line, not body prose). */
const NAV_NOISE_LINE =
  /^(jump to main content|only search american dragon\.?com?|treatment protocols|individual herbs \(pin yin\)|herb formulas|chinese herbs|acupuncture relaxation technique|ask the doctor|donate|home joel penner|lone wolf press|search this site|©.*american dragon|&copy;.*american dragon)$/i;

const CHROME_TITLES =
  /^(individual herbs|herb formulas|erb formulas|point:?|conditions?|chinese herbs.*american dragon|chinese medicine|american dragon)$/i;

const TITLE_CHROME_SUFFIX =
  /\s*[-–—|]\s*(Chinese Herbs|Chinese Medicine|Acupuncture|American Dragon|Dr Joel Penner|OMD|LAc|Lone Wolf Press|Los Angeles).*$/i;

function cleanBody(text) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line && line.length > 1 && !NAV_NOISE_LINE.test(line))
    .join("\n")
    .trim();
}

/** Canonical section keys for consistent UI / search. */
const SECTION_ALIASES = [
  [/^\*?CONTRAINDICATIO\w*.*(HERB\/?DRUG|INCOMPATIBILIT)/i, "CONTRAINDICATIONS"],
  [/^\*?CONTRAINDICATIO\w*$/i, "CONTRAINDICATIONS"],
  [/^ACTIONS AND INDICATIONS?$/i, "ACTIONS AND INDICATIONS"],
  [/^HERBS AND ACTIONS$/i, "HERBS AND ACTIONS"],
  [/^FORMULA ACTIONS$/i, "FORMULA ACTIONS"],
  [/^CLINICAL MANIFESTATIONS$/i, "CLINICAL MANIFESTATIONS"],
  [/^MAJOR COMBINATIONS$/i, "MAJOR COMBINATIONS"],
  [/^COMMAND FUNCTIONS$/i, "COMMAND FUNCTIONS"],
  [/^CATEGOR(?:Y|IES)?$/i, "CATEGORY"],
];

const KNOWN_SECTION_HEADINGS =
  /^(NAME|CATEGORY|PROPERTIES|ACTIONS|ACTIONS AND INDICATIONS|INDICATIONS|LOCATION|NEEDLING|COMMAND FUNCTIONS|COMBINATIONS|CONTRAINDICATIONS|NOTES|HERBS AND ACTIONS|FORMULA ACTIONS|SYNDROMES|CLINICAL MANIFESTATIONS|TREATS|MODIFICATIONS|MAJOR COMBINATIONS|INGREDIENTS|DIAGNOSIS|TREATMENT|GENERAL|HERBS|FORMULAS|POINTS|ALSO KNOWN AS)$/i;

function canonicalizeSectionKey(raw) {
  let key = stripTags(raw)
    .replace(/^[*★]+\s*/, "")
    .replace(/:$/, "")
    .trim()
    .replace(/\s+/g, " ");
  if (!key || /^(&nbsp;|\u00a0|\s)*$/i.test(key)) {
    return { key: "", headingValue: null };
  }

  if (/^NAME\b/i.test(key)) {
    const value = key.replace(/^NAME:\s*/i, "").trim();
    return { key: "NAME", headingValue: value || null };
  }

  for (const [re, canon] of SECTION_ALIASES) {
    if (re.test(key)) return { key: canon, headingValue: null };
  }

  // Formula/herb pages sometimes put the title in the first h3 without NAME:
  if (!KNOWN_SECTION_HEADINGS.test(key) && key.length < 120) {
    return { key: key.toUpperCase(), headingValue: null, maybeTitle: true };
  }

  // Keep pattern-style condition headings (e.g. LIVER QI STAGNATION) as-is
  return { key: key.toUpperCase(), headingValue: null };
}

/** Move a lone title section key into NAME (formulas + some herbs). */
export function promoteFormulaName(sections, title) {
  if (sections.NAME) return sections;
  const keys = Object.keys(sections);
  const normTitle = String(title || "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
  const titleKey = keys.find((k) => {
    if (KNOWN_SECTION_HEADINGS.test(k)) return false;
    const nk = k.replace(/\s+/g, " ").trim();
    return (
      nk === normTitle ||
      normTitle.startsWith(nk) ||
      nk.startsWith(normTitle.slice(0, 12)) ||
      // Herb name headings often include Latin / Chinese after dashes
      nk.startsWith(normTitle.split(/\s+-\s+/)[0])
    );
  });
  if (!titleKey) return sections;
  const next = { ...sections };
  const body = next[titleKey];
  delete next[titleKey];
  next.NAME = [title, body].filter(Boolean).join("\n").trim();
  return next;
}

/** Normalize display titles: collapse odd spacing around parentheses. */
export function tidyTitle(title) {
  return String(title || "")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parse American Dragon pages by accordion <h3> blocks (preferred).
 * Falls back to known section labels in plaintext when h3s are missing.
 */
export function parseAccordionSections(html) {
  const sections = {};
  const h3Re = /<h3\b[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3\b|<h1\b|$)/gi;
  let match;
  let count = 0;
  while ((match = h3Re.exec(html))) {
    const { key, headingValue } = canonicalizeSectionKey(match[1]);
    if (!key || key.length > 160) continue;
    if (/^(HOME|CONTACT|BOOK|VIDEOS|NEWSLETTER|DONATE)$/i.test(key)) continue;

    const body = cleanBody(stripTags(match[2] || "").replace(/\n+/g, "\n"));

    if (key === "NAME") {
      if (headingValue) {
        const cleaned = tidyTitle(headingValue.replace(/\(\s*$/, ""));
        sections.NAME = sections.NAME
          ? `${sections.NAME}\n${cleaned}`
          : cleaned;
      }
      if (body) {
        sections.NAME = sections.NAME
          ? `${sections.NAME}\n${body}`
          : body;
      }
      count += 1;
      continue;
    }

    if (body) {
      sections[key] = sections[key] ? `${sections[key]}\n${body}` : body;
    }
    count += 1;
  }
  return { sections, h3Count: count };
}

/**
 * Legacy plaintext section parser (fallback when accordion h3s are sparse).
 */
export function parseSections(html, knownSections = []) {
  const accordion = parseAccordionSections(html);
  if (accordion.h3Count >= 2) {
    return Object.fromEntries(
      Object.entries(accordion.sections).filter(
        ([, body]) => String(body || "").trim().length > 0,
      ),
    );
  }

  const lines = htmlToLines(html);
  const sectionSet = new Set(
    knownSections.map((s) => s.replace(/:$/, "").toUpperCase()),
  );
  const sections = {};
  let current = "INTRO";
  sections[current] = [];

  for (const line of lines) {
    if (NAV_NOISE_LINE.test(line)) continue;
    const compact = line.replace(/:$/, "").toUpperCase();
    const matched = [...sectionSet].find(
      (label) => compact === label || compact.startsWith(`${label} `),
    );
    if (matched) {
      current = matched;
      if (!sections[current]) sections[current] = [];
      continue;
    }
    sections[current].push(line);
  }

  return Object.fromEntries(
    Object.entries(sections)
      .map(([key, value]) => [
        key,
        Array.isArray(value) ? cleanBody(value.join("\n")) : cleanBody(value),
      ])
      .filter(([key, body]) => body.length > 0 && (key !== "INTRO" || body.length > 80)),
  );
}

function documentTitle(html) {
  const raw = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  let title = stripTags(raw);
  // Strip repeated chrome suffixes
  for (let i = 0; i < 8; i++) {
    const next = title.replace(TITLE_CHROME_SUFFIX, "").trim();
    if (next === title) break;
    title = next;
  }
  title = title.replace(/\s*[-–—|]\s*$/, "").trim();
  if (!title || CHROME_TITLES.test(title)) return "";
  return title;
}

function extractPointCode(text) {
  const raw =
    String(text || "").match(/\b((?:M|N)-[A-Z]+-\d+)\b/i)?.[1] ||
    String(text || "").match(
      /\b((?:REN|DU|UB|SJ|PC|HT|LU|LI|ST|SP|KI|LIV|GB|SI|BL|TB|CV|GV)[- ]?\d+[A-Z]?)\b/i,
    )?.[1] ||
    String(text || "").match(/\b([A-Z]{1,3}-\d+[A-Z]?)\b/i)?.[1] ||
    null;
  return raw ? raw.toUpperCase().replace(/\s+/g, "-") : null;
}

export function extractTitle(html, type, fallback = "") {
  const h1 = stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "")
    .replace(/\s+/g, " ")
    .trim();
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) =>
    stripTags(m[1]).replace(/\s+/g, " ").trim(),
  );
  const docTitle = documentTitle(html);

  if (type === "points") {
    const nameH = h3s.find((h) => /^NAME:/i.test(h));
    let name = nameH
      ? tidyTitle(nameH.replace(/^NAME:\s*/i, "").replace(/\(\s*$/, ""))
      : "";
    const code =
      extractPointCode(h1) ||
      extractPointCode(docTitle) ||
      extractPointCode(name) ||
      extractPointCode(fallback);
    if (name && code) {
      name = name.replace(new RegExp(`\\(?\\s*${code}\\s*\\)?`, "i"), "").trim();
      return tidyTitle(`${name} (${code})`);
    }
    if (name) return name;
    if (h1 && !CHROME_TITLES.test(h1) && !/^POINT:?$/i.test(h1)) {
      return tidyTitle(h1.replace(/^POINT:\s*/i, ""));
    }
    if (docTitle && !CHROME_TITLES.test(docTitle)) return tidyTitle(docTitle);
    return tidyTitle(fallback);
  }

  if (type === "herbs") {
    const nameH = h3s.find((h) => /^NAME:/i.test(h));
    if (nameH) {
      return tidyTitle(nameH.replace(/^NAME:\s*/i, ""));
    }
    // Some herb pages omit the NAME: label and put the name in the first h3.
    const firstSubstantive = h3s.find(
      (h) =>
        h &&
        !KNOWN_SECTION_HEADINGS.test(h) &&
        !CHROME_TITLES.test(h) &&
        h.length > 1,
    );
    if (firstSubstantive) return tidyTitle(firstSubstantive);
    if (docTitle) return tidyTitle(docTitle);
    return tidyTitle(fallback || h1);
  }

  if (type === "formulas") {
    const nameH = h3s.find(
      (h) =>
        h &&
        !/^(HERBS AND ACTIONS|FORMULA ACTIONS|SYNDROMES|CLINICAL|TREATS|CONTRAINDICATIONS|NOTES|MODIFICATIONS|INGREDIENTS)$/i.test(
          h,
        ),
    );
    if (nameH && !CHROME_TITLES.test(nameH)) return tidyTitle(nameH);
    if (docTitle) return tidyTitle(docTitle);
    if (h1 && !CHROME_TITLES.test(h1)) return tidyTitle(h1);
    return tidyTitle(fallback);
  }

  // conditions — h1 is usually the real condition name
  if (h1 && !CHROME_TITLES.test(h1)) return tidyTitle(h1);
  if (docTitle && !/chinese herbs/i.test(docTitle)) return tidyTitle(docTitle);
  return tidyTitle(fallback || h1);
}

export function enrichRecord(type, slug, title, sections, sourceUrl) {
  const meta = {
    displayTitle: title,
    aliases: [],
    channel: null,
    pinyin: null,
    latin: null,
    pointCode: null,
    category: null,
    searchText: "",
  };

  if (type === "points") {
    const extraCode = title.match(/\b(M|N)-[A-Z]+-\d+\b/i);
    const channelCode = title.match(
      /\b((?:REN|DU|UB|SJ|PC|HT|LU|LI|ST|SP|KI|LIV|GB|SI|BL|TB|CV|GV)[- ]?\d+[A-Z]?)\b/i,
    );
    meta.pointCode = (
      extraCode?.[0] ||
      channelCode?.[1] ||
      title.match(/\b([A-Z]{1,3}-\d+[A-Z]?)\b/i)?.[1] ||
      ""
    )
      .toUpperCase()
      .replace(/\s+/g, "-") || null;
    if (
      !meta.pointCode ||
      meta.pointCode.startsWith("N-") ||
      meta.pointCode.startsWith("M-")
    ) {
      meta.channel = "EXTRA";
    } else {
      meta.channel = meta.pointCode.match(/^([A-Z]+)/)?.[1] || null;
    }
    const name = sections.NAME || "";
    const primaryName = tidyTitle(
      (name
        .split(/\n/)
        .map((s) => s.trim())
        .find((s) => s && !/^(english|also known as)/i.test(s)) || "")
        .replace(/\(\s*$/, "")
        .replace(new RegExp(`\\(?\\s*${meta.pointCode || "___"}\\s*\\)?`, "i"), "")
        .trim(),
    );
    if (name) {
      meta.aliases = name
        .split(/\n|\/|,/)
        .map((s) => tidyTitle(s.replace(/\(\s*$/, "")))
        .filter((s) => s && !/^(english|also known as):?$/i.test(s))
        .slice(0, 8);
    }
    if (primaryName && meta.pointCode) {
      meta.displayTitle = `${primaryName} (${meta.pointCode})`;
    } else if (primaryName) {
      meta.displayTitle = primaryName;
    } else if (meta.pointCode) {
      meta.displayTitle = meta.pointCode;
    } else {
      meta.displayTitle = tidyTitle(title);
    }
  }

  if (type === "herbs") {
    const name = sections.NAME || title;
    const nameLines = name
      .split(/\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    const headingLine = nameLines[0] || title;
    const parts = headingLine
      .split(/\s+-\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    meta.pinyin = tidyTitle(parts[0] || title.split(/\s+-\s+/)[0]);

    const labeledLatin = (() => {
      const idx = nameLines.findIndex((l) =>
        /^pharmaceutical latin:?$/i.test(l),
      );
      if (idx >= 0 && nameLines[idx + 1]) return nameLines[idx + 1];
      const inline = nameLines.find((l) => /^pharmaceutical latin:/i.test(l));
      return inline ? inline.replace(/^pharmaceutical latin:\s*/i, "").trim() : null;
    })();
    const LATIN_RE =
      /^(radix|rhizoma|fructus|folium|herba|cortex|flos|semen|tuber|ramulus|pericarpium|massa|gelatinum|carapax|concha|squama|calyx|caulis|lignum|bulbus|sclerotium|plasma|excrementum|bombyx|alumen|halloysitum|magnetitum|ochra|os |corn[u]?)\b/i;
    meta.latin =
      labeledLatin ||
      parts.find((p) => LATIN_RE.test(p)) ||
      null;

    const labeledEnglish = (() => {
      const idx = nameLines.findIndex((l) => /^common english:?$/i.test(l));
      if (idx >= 0 && nameLines[idx + 1]) return nameLines[idx + 1];
      return null;
    })();
    const english =
      labeledEnglish ||
      parts.find(
        (p, i) =>
          i > 0 &&
          p !== meta.latin &&
          !/[\u4e00-\u9fff]/.test(p) &&
          !LATIN_RE.test(p),
      );
    meta.displayTitle = tidyTitle(meta.pinyin);
    meta.aliases = [tidyTitle(headingLine), meta.latin, english].filter(Boolean);
    if (sections.CATEGORY) {
      meta.category = sections.CATEGORY.split("\n")[0]
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 120);
    }
  }

  if (type === "formulas") {
    meta.displayTitle = title.split(/\s+-\s+/)[0].trim() || title;
    if (title.includes(" - ")) meta.aliases = [title];
  }

  if (type === "conditions") {
    meta.displayTitle = title
      .replace(/\s*,\s*/g, ", ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const searchBits = [
    meta.displayTitle,
    title,
    slug,
    meta.pointCode,
    meta.channel,
    meta.pinyin,
    meta.latin,
    meta.category,
    sourceUrl,
    ...(meta.aliases || []),
    sections.ACTIONS,
    sections["ACTIONS AND INDICATIONS"],
    sections["FORMULA ACTIONS"],
    sections["HERBS AND ACTIONS"],
    sections.INDICATIONS,
    sections.TREATS,
    sections.LOCATION,
    sections.SYNDROMES,
    sections.GENERAL,
  ];
  meta.searchText = searchBits
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .slice(0, 4000);

  const wordCount = Object.values(sections)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    ...meta,
    wordCount,
    sectionCount: Object.keys(sections).length,
    quality:
      wordCount >= 120 && Object.keys(sections).length >= 3
        ? "full"
        : wordCount >= 40
          ? "partial"
          : "thin",
  };
}

export function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}
