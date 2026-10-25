#!/usr/bin/env node
/**
 * Parse raw American Dragon HTML into normalized JSON records.
 * Requires AMERICAN_DRAGON_PERMISSION=confirmed (same gate as fetch).
 *
 * Usage:
 *   AMERICAN_DRAGON_PERMISSION=confirmed node scripts/american-dragon/parse.mjs
 *   AMERICAN_DRAGON_PERMISSION=confirmed node scripts/american-dragon/parse.mjs --type=points
 */
import fs from "fs";
import path from "path";
import {
  INVENTORY_PATH,
  NORMALIZED_DIR,
  RAW_DIR,
  assertPermission,
  ensureDirs,
  loadManifest,
  parseSections,
  writeJson,
} from "./lib.mjs";

const manifest = loadManifest();
assertPermission(manifest);
ensureDirs();

if (!fs.existsSync(INVENTORY_PATH)) {
  console.error("Missing inventory. Run discover first.");
  process.exit(1);
}

const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, "utf8"));
const typeFilter = process.argv
  .find((a) => a.startsWith("--type="))
  ?.split("=")[1];

const byType = {};
for (const entry of inventory.entries) {
  if (typeFilter && entry.type !== typeFilter) continue;
  const rawPath = path.join(RAW_DIR, entry.type, `${entry.slug}.html`);
  if (!fs.existsSync(rawPath)) continue;

  const html = fs.readFileSync(rawPath, "utf8");
  const sections =
    entry.type === "points"
      ? parseSections(html, manifest.pointSections)
      : parseSections(html, [
          "NAME",
          "ACTIONS",
          "INDICATIONS",
          "INGREDIENTS",
          "MODIFICATIONS",
          "CONTRAINDICATIONS",
          "NOTES",
          "DIAGNOSIS",
          "TREATMENT",
          "HERBS",
          "FORMULAS",
          "POINTS",
        ]);

  const titleMatch =
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, " ") ||
    entry.label;
  const title = titleMatch.replace(/\s+/g, " ").trim();

  const record = {
    id: `${entry.type}:${entry.slug}`,
    type: entry.type,
    slug: entry.slug,
    title,
    sourceUrl: entry.url,
    source: manifest.attribution,
    gatheredAt: new Date().toISOString(),
    sections,
    /** Clinic publishing gate — false until rewritten in clinic voice. */
    publishable: false,
  };

  const out = path.join(NORMALIZED_DIR, entry.type, `${entry.slug}.json`);
  writeJson(out, record);
  byType[entry.type] = (byType[entry.type] || 0) + 1;
}

writeJson(path.join(NORMALIZED_DIR, "parse-summary.json"), {
  parsedAt: new Date().toISOString(),
  counts: byType,
});
console.log("Parsed counts:", byType);
console.log(
  "Normalized records are private + publishable:false until clinic rewrite.",
);
