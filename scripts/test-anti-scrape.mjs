/**
 * Quick sanity checks for UA classification + rate tokens.
 * Run: node scripts/test-anti-scrape.mjs
 */
import assert from "node:assert/strict";

// Dynamic import of compiled TS via tsx is heavy; mirror the regexes here for CI-less smoke.
// Prefer: npx tsx scripts/test-anti-scrape.ts when available — this file imports the source via tsx.
const { classifyUserAgent, takeRateToken, isCorpusPath, RATE_LIMITS } =
  await import("../src/lib/anti-scrape.ts");

assert.equal(classifyUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1)"), "allowed-bot");
assert.equal(classifyUserAgent("Mozilla/5.0 GPTBot"), "blocked");
assert.equal(classifyUserAgent("python-requests/2.31.0"), "blocked");
assert.equal(classifyUserAgent(null), "blocked");
assert.equal(
  classifyUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  ),
  "humanish",
);

assert.equal(isCorpusPath("/education/acupuncture/reference/points/li4"), true);
assert.equal(isCorpusPath("/services/back-neck-pain"), false);

const key = `test:${Date.now()}`;
for (let i = 0; i < RATE_LIMITS.general.limit; i++) {
  assert.equal(takeRateToken(key, RATE_LIMITS.general.limit, 60_000).ok, true);
}
assert.equal(takeRateToken(key, RATE_LIMITS.general.limit, 60_000).ok, false);

console.log("anti-scrape checks passed");
