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

for (const type of types) {
  const dir = path.join(NORMALIZED_DIR, type);
  const records = [];
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
      const record = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
      record.publishable = true;
      record.attribution = manifest.attribution;
      // Compact section preview for listings
      const firstSection = Object.values(record.sections || {}).find(
        (body) => typeof body === "string" && body.trim().length > 40,
      );
      const summary = String(firstSection || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 220);
      records.push(record);
      catalog.push({
        type,
        slug: record.slug,
        title: record.title,
        sourceUrl: record.sourceUrl,
        summary,
        sectionKeys: Object.keys(record.sections || {}),
      });
    }
  }
  records.sort((a, b) => a.title.localeCompare(b.title));
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
    ? a.title.localeCompare(b.title)
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
  entries: catalog,
});

console.log("Published catalog entries:", catalog.length);
console.log("Counts:", counts);
