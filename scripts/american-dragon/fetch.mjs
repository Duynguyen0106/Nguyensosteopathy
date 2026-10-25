#!/usr/bin/env node
/**
 * Fetch American Dragon page bodies into private/american-dragon/raw/.
 * Requires AMERICAN_DRAGON_PERMISSION=confirmed
 *
 * Usage:
 *   AMERICAN_DRAGON_PERMISSION=confirmed node scripts/american-dragon/fetch.mjs
 *   AMERICAN_DRAGON_PERMISSION=confirmed node scripts/american-dragon/fetch.mjs --type=points --limit=20
 *   AMERICAN_DRAGON_PERMISSION=confirmed node scripts/american-dragon/fetch.mjs --concurrency=8
 */
import fs from "fs";
import path from "path";
import {
  INVENTORY_PATH,
  RAW_DIR,
  assertPermission,
  ensureDirs,
  fetchText,
  loadManifest,
  sleep,
  writeJson,
} from "./lib.mjs";

const manifest = loadManifest();
assertPermission(manifest);
ensureDirs();

if (!fs.existsSync(INVENTORY_PATH)) {
  console.error("Missing inventory. Run npm run education:acupuncture:discover first.");
  process.exit(1);
}

const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, "utf8"));
const typeFilter = process.argv
  .find((a) => a.startsWith("--type="))
  ?.split("=")[1];
const limit = Number(
  process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1] || 0,
);
const concurrency = Math.max(
  1,
  Number(
    process.argv.find((a) => a.startsWith("--concurrency="))?.split("=")[1] ||
      process.env.AD_FETCH_CONCURRENCY ||
      6,
  ),
);

let entries = inventory.entries;
if (typeFilter) entries = entries.filter((e) => e.type === typeFilter);
if (limit > 0) entries = entries.slice(0, limit);

const log = {
  fetchedAt: new Date().toISOString(),
  requested: entries.length,
  concurrency,
  ok: 0,
  skipped: 0,
  failed: [],
};

let cursor = 0;

async function worker(workerId) {
  while (true) {
    const i = cursor++;
    if (i >= entries.length) return;
    const entry = entries[i];
    const outDir = path.join(RAW_DIR, entry.type);
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, `${entry.slug}.html`);
    const label = `[${i + 1}/${entries.length} w${workerId}] ${entry.type}/${entry.slug}`;
    try {
      if (fs.existsSync(outFile) && fs.statSync(outFile).size > 500) {
        log.skipped += 1;
        log.ok += 1;
        if ((i + 1) % 50 === 0 || i < 20) console.log(label, "skip");
        continue;
      }
      const html = await fetchText(entry.url, {
        ...manifest,
        rateLimitMs: Math.min(manifest.rateLimitMs, 200),
      });
      fs.writeFileSync(outFile, html);
      log.ok += 1;
      console.log(label, "ok", html.length);
    } catch (err) {
      console.log(label, "FAIL", err.message || err);
      log.failed.push({ url: entry.url, error: String(err.message || err) });
    }
    await sleep(120);
  }
}

console.log(
  `Fetching ${entries.length} pages with concurrency=${concurrency}…`,
);
await Promise.all(
  Array.from({ length: concurrency }, (_, id) => worker(id + 1)),
);

writeJson(path.join(RAW_DIR, "fetch-log.json"), log);
console.log(
  `Done. ok=${log.ok} skipped=${log.skipped} failed=${log.failed.length}`,
);
if (log.failed.length) process.exitCode = 1;
