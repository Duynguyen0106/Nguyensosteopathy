#!/usr/bin/env node
/**
 * Build the public acupuncture corpus index (titles/slugs/status only).
 * Safe without full-page fetch — uses discover inventory when present,
 * otherwise embeds audit estimates so the education UI can render.
 */
import fs from "fs";
import path from "path";
import {
  INVENTORY_PATH,
  MANIFEST_PATH,
  NORMALIZED_DIR,
  PUBLIC_INDEX_PATH,
  ROOT,
  ensureDirs,
  loadManifest,
  writeJson,
} from "./lib.mjs";

ensureDirs();
const manifest = loadManifest();
const audit = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "src/data/american-dragon/audit.json"),
    "utf8",
  ),
);

const categories = [
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
];

let entries = [];
let source = "audit-estimates";

/** Public index keeps counts only — full URL inventory stays in private/. */
let counts = {
  points: 0,
  herbs: 0,
  formulas: 0,
  conditions: 0,
};
let inventoryTotal = 0;

if (fs.existsSync(INVENTORY_PATH)) {
  const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, "utf8"));
  source = "discovered-inventory";
  inventoryTotal = inventory.entries.length;
  for (const entry of inventory.entries) {
    if (counts[entry.type] !== undefined) counts[entry.type] += 1;
  }
  // Optional: include a tiny sample of discovered slugs for UI smoke tests.
  entries = inventory.entries.slice(0, 12).map((entry) => ({
    type: entry.type,
    slug: entry.slug,
    label: entry.label,
    sourceUrl: entry.url,
    status: fs.existsSync(
      path.join(NORMALIZED_DIR, entry.type, `${entry.slug}.json`),
    )
      ? "normalized"
      : "discovered",
    publishable: false,
  }));
} else {
  counts = {
    points: audit.totalsApprox?.points ?? 0,
    herbs: audit.totalsApprox?.herbs ?? 0,
    formulas: audit.totalsApprox?.formulas ?? 0,
    conditions: audit.totalsApprox?.conditions ?? 0,
  };
}

const index = {
  generatedAt: new Date().toISOString(),
  source,
  attribution: manifest.attribution,
  permissionEnv: manifest.permissionEnv,
  categories,
  counts,
  inventoryTotal,
  totalsApprox: {
    ...audit.totalsApprox,
    ...counts,
    pages: Object.values(counts).reduce((sum, n) => sum + n, 0),
  },
  /** Sample only — full inventory is private/american-dragon/inventory.json */
  entries,
  pipeline: {
    discover: "npm run education:acupuncture:discover",
    fetch:
      "AMERICAN_DRAGON_PERMISSION=confirmed npm run education:acupuncture:fetch",
    parse:
      "AMERICAN_DRAGON_PERMISSION=confirmed npm run education:acupuncture:parse",
    buildIndex: "npm run education:acupuncture:index",
  },
  publishingRules: [
    "Normalized records default to publishable:false.",
    "Patient pages must use clinic-voice rewrites, not verbatim American Dragon HTML.",
    "Cite American Dragon as a source when material informs a published note.",
    "Full URL inventory and raw HTML stay under private/american-dragon/ (gitignored).",
  ],
};

writeJson(PUBLIC_INDEX_PATH, index);
console.log("Wrote", PUBLIC_INDEX_PATH);
console.log("Counts:", counts);
console.log("Entries:", index.entries.length);
