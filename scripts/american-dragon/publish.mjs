#!/usr/bin/env node
/**
 * Publish normalized American Dragon records into src/data/acupuncture-corpus
 * for the clinic website (category + detail pages).
 *
 * Requires AMERICAN_DRAGON_PERMISSION=confirmed
 */
import fs from "fs";
import path from "path";
import {
  NORMALIZED_DIR,
  PUBLIC_INDEX_PATH,
  ROOT,
  assertPermission,
  ensureDirs,
  loadManifest,
  writeJson,
} from "./lib.mjs";

const manifest = loadManifest();
assertPermission(manifest);
ensureDirs();

const OUT_DIR = path.join(ROOT, "src/data/acupuncture-corpus");
const BY_TYPE_DIR = path.join(OUT_DIR, "by-type");
fs.mkdirSync(BY_TYPE_DIR, { recursive: true });

const types = ["points", "herbs", "formulas", "conditions"];
const catalog = [];
const counts = {};
const quality = { full: 0, partial: 0, thin: 0 };

const PREFERRED_SUMMARY_KEYS = [
  "ACTIONS",
  "ACTIONS AND INDICATIONS",
  "FORMULA ACTIONS",
  "INDICATIONS",
  "TREATS",
  "GENERAL",
  "LOCATION",
  "SYNDROMES",
  "CLINICAL MANIFESTATIONS",
  "PROPERTIES",
  "CATEGORY",
  "NAME",
];

function buildSummary(record) {
  const sections = record.sections || {};
  for (const key of PREFERRED_SUMMARY_KEYS) {
    const body = sections[key];
    if (typeof body === "string" && body.trim().length > 40) {
      return body.replace(/\s+/g, " ").trim().slice(0, 220);
    }
  }
  const first = Object.values(sections).find(
    (body) => typeof body === "string" && body.trim().length > 40,
  );
  return String(first || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 220);
}

for (const type of types) {
  const dir = path.join(NORMALIZED_DIR, type);
  const records = [];
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
      const record = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
      record.publishable = true;
      record.attribution = manifest.attribution;
      const title = record.displayTitle || record.title;
      record.title = title;
      const summary = buildSummary(record);
      records.push(record);
      quality[record.quality || "partial"] =
        (quality[record.quality || "partial"] || 0) + 1;
      catalog.push({
        type,
        slug: record.slug,
        title,
        sourceUrl: record.sourceUrl,
        summary,
        sectionKeys: Object.keys(record.sections || {}),
        quality: record.quality || null,
        channel: record.channel || null,
        pinyin: record.pinyin || null,
        latin: record.latin || null,
        pointCode: record.pointCode || null,
        category: record.category || null,
        wordCount: record.wordCount || null,
        searchText: (record.searchText || "").slice(0, 500),
      });
    }
  }
  records.sort((a, b) =>
    String(a.title).localeCompare(String(b.title), undefined, {
      sensitivity: "base",
    }),
  );
  counts[type] = records.length;
  writeJson(path.join(BY_TYPE_DIR, `${type}.json`), {
    type,
    generatedAt: new Date().toISOString(),
    count: records.length,
    attribution: manifest.attribution,
    records,
  });
  console.log(`Wrote ${type}: ${records.length}`);
}

catalog.sort((a, b) =>
  a.type === b.type
    ? a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    : a.type.localeCompare(b.type),
);

const index = {
  generatedAt: new Date().toISOString(),
  source: "published-corpus",
  attribution: manifest.attribution,
  permissionEnv: manifest.permissionEnv,
  categories: [
    {
      id: "points",
      label: "Acupuncture points",
      description:
        "Channel and extraordinary points with location, needling, actions, and combinations.",
    },
    {
      id: "herbs",
      label: "Individual herbs",
      description: "Single-herb monographs from the American Dragon herb index.",
    },
    {
      id: "formulas",
      label: "Herb formulas",
      description: "Classical and modern formula pages indexed A–Z.",
    },
    {
      id: "conditions",
      label: "Conditions & syndromes",
      description:
        "TCM pattern / biomedical condition reference pages (practitioner study — not UK diagnosis).",
    },
  ],
  counts,
  quality,
  inventoryTotal: catalog.length,
  totalsApprox: {
    ...counts,
    pages: catalog.length,
  },
  entries: catalog,
  pipeline: {
    discover: "npm run education:acupuncture:discover",
    fetch:
      "AMERICAN_DRAGON_PERMISSION=confirmed npm run education:acupuncture:fetch",
    parse:
      "AMERICAN_DRAGON_PERMISSION=confirmed npm run education:acupuncture:parse",
    publish:
      "AMERICAN_DRAGON_PERMISSION=confirmed npm run education:acupuncture:publish",
    buildIndex: "npm run education:acupuncture:index",
  },
  publishingRules: [
    "Corpus published with owner/estate permission for clinic education use.",
    "Every page attributes American Dragon / Dr Joel Penner.",
    "Practitioner study reference — not a substitute for UK clinical assessment.",
  ],
};

writeJson(PUBLIC_INDEX_PATH, index);
writeJson(path.join(OUT_DIR, "catalog.json"), {
  generatedAt: index.generatedAt,
  count: catalog.length,
  counts,
  quality,
  entries: catalog,
});

console.log("Published catalog entries:", catalog.length);
console.log("Counts:", counts);
console.log("Quality:", quality);
