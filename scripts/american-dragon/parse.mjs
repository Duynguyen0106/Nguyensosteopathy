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
  enrichRecord,
  ensureDirs,
  extractTitle,
  loadManifest,
  parseSections,
  promoteFormulaName,
  tidyTitle,
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
const qualityCounts = { full: 0, partial: 0, thin: 0 };
const badTitles = [];

for (const entry of inventory.entries) {
  if (typeFilter && entry.type !== typeFilter) continue;
  const rawPath = path.join(RAW_DIR, entry.type, `${entry.slug}.html`);
  if (!fs.existsSync(rawPath)) continue;

  const html = fs.readFileSync(rawPath, "utf8");
  const known =
    entry.type === "points"
      ? manifest.pointSections
      : [
          "NAME",
          "CATEGORY",
          "PROPERTIES",
          "ACTIONS",
          "ACTIONS AND INDICATIONS",
          "INDICATIONS",
          "INGREDIENTS",
          "HERBS AND ACTIONS",
          "FORMULA ACTIONS",
          "SYNDROMES",
          "CLINICAL MANIFESTATIONS",
          "TREATS",
          "MODIFICATIONS",
          "CONTRAINDICATIONS",
          "MAJOR COMBINATIONS",
          "NOTES",
          "DIAGNOSIS",
          "TREATMENT",
          "GENERAL",
          "HERBS",
          "FORMULAS",
          "POINTS",
          "LOCATION",
          "NEEDLING",
          "COMMAND FUNCTIONS",
          "COMBINATIONS",
        ];

  let sections = parseSections(html, known);
  const title = tidyTitle(
    extractTitle(html, entry.type, entry.label || entry.slug),
  );
  if (entry.type === "formulas" || entry.type === "herbs") {
    sections = promoteFormulaName(sections, title);
  }
  const enrichment = enrichRecord(
    entry.type,
    entry.slug,
    title,
    sections,
    entry.url,
  );

  if (
    !title ||
    /^(individual herbs|herb formulas|erb formulas|point:?)$/i.test(title)
  ) {
    badTitles.push(`${entry.type}/${entry.slug}`);
  }

  qualityCounts[enrichment.quality] =
    (qualityCounts[enrichment.quality] || 0) + 1;

  const record = {
    id: `${entry.type}:${entry.slug}`,
    type: entry.type,
    slug: entry.slug,
    title: enrichment.displayTitle || title,
    rawTitle: title,
    sourceUrl: entry.url,
    source: manifest.attribution,
    gatheredAt: new Date().toISOString(),
    sections,
    displayTitle: enrichment.displayTitle,
    aliases: enrichment.aliases,
    channel: enrichment.channel,
    pinyin: enrichment.pinyin,
    latin: enrichment.latin,
    pointCode: enrichment.pointCode,
    category: enrichment.category,
    searchText: enrichment.searchText,
    wordCount: enrichment.wordCount,
    sectionCount: enrichment.sectionCount,
    quality: enrichment.quality,
    /** Clinic publishing gate — flipped true by publish step. */
    publishable: false,
  };

  const out = path.join(NORMALIZED_DIR, entry.type, `${entry.slug}.json`);
  writeJson(out, record);
  byType[entry.type] = (byType[entry.type] || 0) + 1;
}

writeJson(path.join(NORMALIZED_DIR, "parse-summary.json"), {
  parsedAt: new Date().toISOString(),
  counts: byType,
  quality: qualityCounts,
  badTitleCount: badTitles.length,
  badTitleSample: badTitles.slice(0, 40),
});
console.log("Parsed counts:", byType);
console.log("Quality:", qualityCounts);
console.log("Bad titles:", badTitles.length);
console.log(
  "Normalized records are private + publishable:false until publish step.",
);
