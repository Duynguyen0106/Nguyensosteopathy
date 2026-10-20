/**
 * Post-merge live check: money + VI URLs return 200 and appear in sitemap.
 * Does NOT submit to GSC (manual) — prints the exact indexing queue.
 *
 * Usage:
 *   node scripts/seo-live-index-check.mjs
 *   node scripts/seo-live-index-check.mjs https://www.nguyensosteopathy.com
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
  ["P1", "/vi/fees"],
  ["P1", "/vi/find-us"],
  ["P1", "/vi/services/back-neck-pain"],
  ["P1", "/vi/services/home-visits"],
];

async function headOrGet(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "NguyensOsteopathy-seo-live-check/1.0" },
    });
    return res.status;
  } catch (err) {
    return `ERR:${err.cause?.code ?? err.message}`;
  }
}

const sitemapUrl = `${base}/sitemap.xml`;
console.log("=== Live index readiness (post-merge) ===\n");
console.log(`Sitemap: ${sitemapUrl}`);

const sitemapStatus = await headOrGet(sitemapUrl);
let sitemapBody = "";
if (sitemapStatus === 200) {
  sitemapBody = await fetch(sitemapUrl).then((r) => r.text());
}
console.log(`Sitemap HTTP: ${sitemapStatus}\n`);

console.log("URL checks + GSC Request indexing queue:");
let failures = 0;
for (const [priority, path] of moneyPages) {
  const url = `${base}${path === "/" ? "" : path}`;
  const status = await headOrGet(url);
  const inSitemap =
    path === "/"
      ? sitemapBody.includes(`${base}</loc>`) ||
        sitemapBody.includes(`${base}/</loc>`)
      : sitemapBody.includes(`${base}${path}`);
  const ok = status === 200 && inSitemap;
  if (!ok) failures += 1;
  console.log(
    `  [${priority}] ${status} sitemap=${inSitemap ? "yes" : "NO"}  ${url}`,
  );
}

console.log(`
Manual GSC steps (cannot automate):
  1. Open Google Search Console → Sitemaps → submit/resubmit:
     ${sitemapUrl}
  2. URL Inspection → Request indexing for each P0 URL above (then P1).
  3. Track queries monthly: osteopath woolwich | osteopath se18 |
     osteopath plumstead | shockwave woolwich | vietnamese osteopath |
     osteopath home visit woolwich
`);

if (failures > 0) {
  console.error(`FAILED: ${failures} URL(s) not live or missing from sitemap.`);
  process.exit(1);
}
console.log("OK: all money/VI URLs are live and listed in sitemap.");
console.log("Complete the manual GSC steps above after this check.");
