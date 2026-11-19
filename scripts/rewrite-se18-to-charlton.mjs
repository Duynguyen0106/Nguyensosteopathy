/**
 * Rewrite leftover SE18 clinic-location language to Charlton / SE7.
 * Keeps intentional Plumstead SE18 keyword + GSC tracked query "osteopath se18".
 *
 * Usage: node scripts/rewrite-se18-to-charlton.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src");

const skipFiles = new Set([
  // Intentionally tracks Woolwich/SE18 search demand in GSC.
  path.join(root, "lib/seo-strategy.ts"),
]);

function rewrite(content, filePath) {
  let out = content;
  const rel = path.relative(root, filePath);

  // Plumstead area page legitimately targets SE18 postcode searches.
  if (rel === "lib/areas.ts") {
    return out;
  }

  const replacements = [
    [/our SE18 clinic/gi, "our Charlton clinic"],
    [/at SE18\b/g, "in Charlton"],
    [/in SE18\b/g, "in Charlton"],
    [/for SE18\b/g, "for Charlton"],
    [/and SE18\b/g, "and nearby SE London"],
    [/SE18 patients/g, "Charlton patients"],
    [/SE18 players/g, "Charlton players"],
    [/SE18 offices/g, "Charlton offices"],
    [/SE18 desk/g, "Charlton desk"],
    [/SE18 feedback/g, "Charlton feedback"],
    [/SE18 phone/g, "Charlton phone"],
    [/osteopathy in SE18/gi, "osteopathy in Charlton"],
    [/osteopath tips for SE18/gi, "osteopath tips for Charlton"],
    [/osteopath for children SE18/gi, "osteopath for children Charlton"],
    [/Charlton and SE18/g, "Charlton and nearby SE London"],
    [/Charlton \/ SE18/g, "Charlton / SE7"],
    [/Charlton\/SE18/g, "Charlton/SE7"],
  ];

  for (const [pattern, replacement] of replacements) {
    out = out.replace(pattern, replacement);
  }

  // Keyword / meta tails: "... SE18" → "... Charlton" (and lowercase variants).
  out = out.replace(/(\b[\w/-]+ )SE18\b/g, "$1Charlton");
  out = out.replace(/(\b[\w/-]+ )se18\b/g, "$1charlton");

  // Any remaining bare SE18 tokens in copy → Charlton (not postcode SE7 in prose titles).
  out = out.replace(/\bSE18\b/g, "Charlton");
  out = out.replace(/\bse18\b/g, "charlton");

  return out;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx|js|mjs|md|json)$/.test(entry.name)) files.push(full);
  }
  return files;
}

let changed = 0;
let totalHitsBefore = 0;
let totalHitsAfter = 0;

for (const file of walk(root)) {
  if (skipFiles.has(file)) continue;
  const before = fs.readFileSync(file, "utf8");
  const beforeHits = (before.match(/SE18|se18/g) || []).length;
  totalHitsBefore += beforeHits;
  if (!beforeHits) continue;
  const after = rewrite(before, file);
  const afterHits = (after.match(/SE18|se18/g) || []).length;
  totalHitsAfter += afterHits;
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
    console.log(
      `updated ${path.relative(process.cwd(), file)} (${beforeHits} → ${afterHits})`,
    );
  }
}

// Count remaining including skipped files
let remaining = 0;
for (const file of walk(root)) {
  const text = fs.readFileSync(file, "utf8");
  remaining += (text.match(/SE18|se18/g) || []).length;
}

console.log(
  `\nFiles changed: ${changed}\nHits in rewritten files before: ${totalHitsBefore}\nRemaining SE18/se18 in src/: ${remaining}`,
);
