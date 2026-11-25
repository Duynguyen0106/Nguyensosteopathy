#!/usr/bin/env node
/**
 * Copy OpenNext ISR/SSG cache into Workers static assets for
 * `static-assets-incremental-cache`. Must run after `opennextjs-cloudflare build`
 * and before `wrangler deploy` uploads `.open-next/assets`.
 */
import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const src = join(root, ".open-next/cache");
const dest = join(root, ".open-next/assets/cdn-cgi/_next_cache");

if (!existsSync(src)) {
  console.error("Missing OpenNext cache at", src);
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log("Populated Workers static assets cache →", dest);
