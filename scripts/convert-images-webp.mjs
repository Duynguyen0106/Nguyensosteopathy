/**
 * Convert content images to WebP (keeps originals for OG/favicon use).
 * Skips tiny icons that should remain PNG.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/images");
const skipNames = new Set([
  "favicon-32.png",
  "apple-touch-icon.png",
  "icon-512.png",
]);

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const files = (await walk(root)).filter((f) => {
  const base = path.basename(f);
  if (skipNames.has(base)) return false;
  return /\.(jpe?g|png)$/i.test(f);
});

let saved = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const file of files) {
  const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const input = fs.readFileSync(file);
  bytesIn += input.length;
  const webp = await sharp(input)
    .webp({ quality: 78, effort: 4 })
    .toBuffer();
  fs.writeFileSync(out, webp);
  bytesOut += webp.length;
  saved += 1;
  const pct = Math.round((1 - webp.length / input.length) * 100);
  console.log(
    `${path.relative("public", file)} → ${path.basename(out)} (${pct}% smaller)`,
  );
}

console.log(
  `\nConverted ${saved} files. ${(bytesIn / 1024).toFixed(0)} KiB → ${(bytesOut / 1024).toFixed(0)} KiB`,
);
