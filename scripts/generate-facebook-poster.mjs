#!/usr/bin/env node
/**
 * Facebook feed poster (1080×1080) — opening day 50% off offer (5 November).
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "facebook");
const artifactDir = "/opt/cursor/artifacts/facebook";

const SIZE = 1080;

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });

const require = createRequire(import.meta.url);

const logoUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-lockup.png"),
).toString("base64")}`;

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Opening day offer — Facebook poster</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${SIZE}px;
      height: ${SIZE}px;
      overflow: hidden;
      font-family: "Source Sans 3", system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .frame {
      width: ${SIZE}px;
      height: ${SIZE}px;
      position: relative;
      color: #fff;
      background:
        radial-gradient(ellipse 90% 60% at 100% 0%, rgba(45,212,191,0.28), transparent 55%),
        radial-gradient(ellipse 70% 50% at 0% 100%, rgba(13,148,136,0.18), transparent 50%),
        linear-gradient(160deg, #061828 0%, #0b2c45 48%, #0a3a4a 100%);
      padding: 52px 56px 48px;
      display: flex;
      flex-direction: column;
    }
    .logo {
      align-self: flex-start;
      background: #fff;
      border-radius: 18px;
      padding: 14px 16px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.25);
    }
    .logo img {
      display: block;
      height: 118px;
      width: auto;
      max-width: 280px;
      object-fit: contain;
    }
    .eyebrow {
      margin-top: 36px;
      font-size: 18px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 700;
      color: #2dd4bf;
    }
    h1 {
      margin-top: 14px;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 72px;
      line-height: 0.98;
      font-weight: 700;
      max-width: 11ch;
    }
    .offer {
      margin-top: 28px;
      display: inline-flex;
      align-items: center;
      gap: 18px;
      background: #2dd4bf;
      color: #061828;
      border-radius: 18px;
      padding: 18px 26px;
      align-self: flex-start;
      box-shadow: 0 14px 36px rgba(45,212,191,0.28);
    }
    .offer .pct {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 64px;
      font-weight: 700;
      line-height: 1;
    }
    .offer .copy {
      font-size: 22px;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: 0.01em;
    }
    .date-block {
      margin-top: 28px;
    }
    .date-block .label {
      font-size: 16px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 700;
      color: #99f6e4;
    }
    .date-block .date {
      margin-top: 6px;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 42px;
      font-weight: 700;
    }
    .details {
      margin-top: 16px;
      font-size: 22px;
      line-height: 1.4;
      color: rgba(255,255,255,0.9);
      max-width: 28ch;
      font-weight: 500;
    }
    .foot {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 20px;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.18);
    }
    .foot .phone {
      font-size: 28px;
      font-weight: 700;
    }
    .foot .meta {
      margin-top: 6px;
      font-size: 16px;
      color: rgba(255,255,255,0.75);
      line-height: 1.35;
    }
    .foot .web {
      text-align: right;
      font-size: 18px;
      font-weight: 700;
      color: #2dd4bf;
    }
    .foot .web span {
      display: block;
      margin-top: 4px;
      font-size: 14px;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
    }
  </style>
</head>
<body>
  <div class="frame">
    <div class="logo">
      <img src="${logoUri}" alt="Nguyen's Osteopathic Clinic" width="1250" height="870" />
    </div>

    <p class="eyebrow">Official opening day</p>
    <h1>Half-price care for every patient</h1>

    <div class="offer">
      <span class="pct">50%</span>
      <span class="copy">OFF<br/>all service fees</span>
    </div>

    <div class="date-block">
      <p class="label">One day only</p>
      <p class="date">Wednesday 5 November 2026</p>
    </div>
    <p class="details">
      Celebrate our official opening at St James Pharmacy, Woolwich.
      All clinic service fees reduced by 50% for every patient on this day.
    </p>

    <div class="foot">
      <div>
        <p class="phone">07882 843513</p>
        <p class="meta">Book online · Inside St James Pharmacy<br/>52 Powis Street, Woolwich SE18 6LQ</p>
      </div>
      <div class="web">
        www.nguyensosteopathy.com/book
        <span>Facebook: Nguyen’s Osteopathy</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const htmlPath = join(outDir, "opening-offer.html");
writeFileSync(htmlPath, html);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = require("/tmp/node_modules/playwright"));
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: SIZE, height: SIZE },
  deviceScaleFactor: 2,
});
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(500);

const pngPath = join(outDir, "opening-day-50-off-facebook.png");
const pdfPath = join(outDir, "opening-day-50-off-facebook.pdf");

await page.locator(".frame").screenshot({ path: pngPath, type: "png" });

await page.pdf({
  path: pdfPath,
  width: "1080px",
  height: "1080px",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  scale: 1,
});

await browser.close();

const preview = join(artifactDir, "opening-day-50-off-facebook.png");
const previewRoot = join("/opt/cursor/artifacts", "opening-day-50-off-facebook.png");
writeFileSync(preview, readFileSync(pngPath));
writeFileSync(previewRoot, readFileSync(pngPath));
writeFileSync(join(artifactDir, "opening-day-50-off-facebook.pdf"), readFileSync(pdfPath));
writeFileSync(
  join("/opt/cursor/artifacts", "opening-day-50-off-facebook.pdf"),
  readFileSync(pdfPath),
);

console.log("PNG:", pngPath, readFileSync(pngPath).length);
console.log("PDF:", pdfPath, readFileSync(pdfPath).length);
