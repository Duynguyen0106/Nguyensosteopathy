#!/usr/bin/env node
/**
 * Fetch American Dragon page bodies into private/american-dragon/raw/.
 * Requires AMERICAN_DRAGON_PERMISSION=confirmed
 *
 * Usage:
 *   AMERICAN_DRAGON_PERMISSION=confirmed node scripts/american-dragon/fetch.mjs
 *   AMERICAN_DRAGON_PERMISSION=confirmed node scripts/american-dragon/fetch.mjs --type=points --limit=20
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

let entries = inventory.entries;
if (typeFilter) entries = entries.filter((e) => e.type === typeFilter);
if (limit > 0) entries = entries.slice(0, limit);

const log = {
  fetchedAt: new Date().toISOString(),
  requested: entries.length,
  ok: 0,
  failed: [],
};

for (let i = 0; i < entries.length; i++) {
  const entry = entries[i];
  const outDir = path.join(RAW_DIR, entry.type);
  const outFile = path.join(outDir, `${entry.slug}.html`);
  process.stdout.write(`[${i + 1}/${entries.length}] ${entry.type} ${entry.slug} `);
  try {
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 500) {
      console.log("skip");
      log.ok += 1;
      continue;
    }
    const html = await fetchText(entry.url, manifest);
    fs.writeFileSync(outFile, html);
    console.log("ok", html.length);
    log.ok += 1;
  } catch (err) {
    console.log("FAIL", err.message || err);
    log.failed.push({ url: entry.url, error: String(err.message || err) });
  }
  await sleep(manifest.rateLimitMs);
}

writeJson(path.join(RAW_DIR, "fetch-log.json"), log);
console.log(`Done. ok=${log.ok} failed=${log.failed.length}`);
if (log.failed.length) process.exitCode = 1;
