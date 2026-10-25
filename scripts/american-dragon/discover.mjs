#!/usr/bin/env node
/**
 * Discover American Dragon page URLs from public indexes.
 * Does not store page bodies — only an inventory of URLs + labels.
 *
 * Usage:
 *   node scripts/american-dragon/discover.mjs
 *   node scripts/american-dragon/discover.mjs --indexes-only
 */
import fs from "fs";
import path from "path";
import {
  INVENTORY_PATH,
  RAW_DIR,
  absolutize,
  contentTypeForUrl,
  ensureDirs,
  fetchText,
  loadManifest,
  sleep,
  slugFromUrl,
  writeJson,
} from "./lib.mjs";

const indexesOnly = process.argv.includes("--indexes-only");
const manifest = loadManifest();
ensureDirs();

const inventory = {
  discoveredAt: new Date().toISOString(),
  baseUrl: manifest.baseUrl,
  counts: { points: 0, herbs: 0, formulas: 0, conditions: 0, other: 0 },
  entries: [],
};

const seen = new Set();

function addEntry(type, url, label) {
  const key = `${type}:${url}`;
  if (seen.has(key)) return;
  seen.add(key);
  inventory.entries.push({
    type,
    url,
    slug: slugFromUrl(url),
    label: label || slugFromUrl(url),
  });
  inventory.counts[type] = (inventory.counts[type] || 0) + 1;
}

for (const [type, urls] of Object.entries(manifest.indexes)) {
  for (const indexUrl of urls) {
    console.log(`Index ${type}: ${indexUrl}`);
    const html = await fetchText(indexUrl, manifest);
    const indexSlug = slugFromUrl(indexUrl) || type;
    fs.writeFileSync(
      path.join(RAW_DIR, "indexes", `${type}-${indexSlug}.html`),
      html,
    );

    const hrefRe = /href\s*=\s*"([^"]+)"/gi;
    let match;
    while ((match = hrefRe.exec(html))) {
      const abs = absolutize(indexUrl, match[1]);
      if (!abs || !abs.startsWith(manifest.baseUrl)) continue;
      if (!/\.html?$/i.test(abs)) continue;
      const detected = contentTypeForUrl(abs, manifest);
      if (!detected) continue;
      // Prefer the declared type when crawling that index family.
      const entryType =
        detected === type || type === "formulas" || type === "herbs"
          ? detected
          : detected;
      const labelGuess = decodeURIComponent(
        abs.split("/").pop().replace(/\.html?$/i, ""),
      );
      addEntry(entryType, abs.split("#")[0], labelGuess);
    }
    await sleep(manifest.rateLimitMs);
  }
}

inventory.entries.sort((a, b) =>
  a.type === b.type
    ? a.slug.localeCompare(b.slug)
    : a.type.localeCompare(b.type),
);

writeJson(INVENTORY_PATH, inventory);
console.log("Wrote", INVENTORY_PATH);
console.log("Counts:", inventory.counts);
console.log("Total entries:", inventory.entries.length);

if (!indexesOnly) {
  console.log(
    "Next: AMERICAN_DRAGON_PERMISSION=confirmed npm run education:acupuncture:fetch",
  );
}
