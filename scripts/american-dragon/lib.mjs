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

/** Strip tags lightly for section body extraction. */
export function htmlToLines(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|tr|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

/**
 * Parse American Dragon accordion-style point/herb pages into section map.
 * Looks for ALL-CAPS section labels common on the site.
 */
export function parseSections(html, knownSections = []) {
  const lines = htmlToLines(html);
  const sectionSet = new Set(
    knownSections.map((s) => s.replace(/:$/, "").toUpperCase()),
  );
  const sections = {};
  let current = "INTRO";
  sections[current] = [];

  for (const line of lines) {
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
    Object.entries(sections).map(([key, value]) => [key, value.join("\n")]),
  );
}

export function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}
