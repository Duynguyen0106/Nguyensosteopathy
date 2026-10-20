/**
 * Prints the SEO / GSC hygiene checklist for Nguyen's Osteopathic Clinic.
 *
 * Usage:
 *   node scripts/seo-gsc-checklist.mjs
 *   node scripts/seo-gsc-checklist.mjs https://www.nguyensosteopathy.com
 */
const base = (process.argv[2] ?? "https://www.nguyensosteopathy.com").replace(
  /\/$/,
  "",
);

const moneyPages = [
  ["P0", "/"],
  ["P0", "/book"],
  ["P0", "/find-us"],
  ["P0", "/fees"],
  ["P0", "/services/back-neck-pain"],
  ["P0", "/services/focused-shockwave"],
  ["P0", "/services/mens-health-ed"],
  ["P1", "/services/home-visits"],
  ["P1", "/about"],
  ["P1", "/reviews"],
  ["P1", "/areas/woolwich"],
  ["P1", "/vi"],
  ["P1", "/vi/book"],
  ["P1", "/vi/about"],
  ["P1", "/vi/services/back-neck-pain"],
  ["P1", "/vi/services/home-visits"],
];

const queries = [
  "osteopath woolwich",
  "osteopath se18",
  "osteopath plumstead",
  "shockwave woolwich",
  "vietnamese osteopath",
  "osteopath home visit woolwich",
];

console.log("=== GSC hygiene checklist ===\n");
console.log(`1. Resubmit sitemap:\n   ${base}/sitemap.xml\n`);
console.log("2. URL Inspection → Request indexing (money pages):");
for (const [priority, path] of moneyPages) {
  console.log(`   [${priority}] ${base}${path === "/" ? "" : path}`);
}
console.log("\n3. Track queries monthly:");
for (const q of queries) console.log(`   - ${q}`);
console.log(`
4. GBP (manual) — full copy pack:
   npm run seo:gbp

5. Citations — NAP checklist + fetch smoke:
   npm run seo:citations

6. Live readiness after deploy:
   npm run seo:live

7. Monthly compound (Days 61–90):
   npm run seo:monthly
`);
