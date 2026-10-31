#!/usr/bin/env node
/**
 * Facebook feed poster (1080×1080) — night numbness / pins & needles / TOS awareness.
 * Educational + booking CTA; does not claim every night symptom is TOS.
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
  <title>Night numbness &amp; TOS — Facebook poster</title>
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
        radial-gradient(ellipse 90% 55% at 100% 0%, rgba(45,212,191,0.26), transparent 55%),
        radial-gradient(ellipse 65% 45% at 0% 100%, rgba(13,148,136,0.16), transparent 50%),
        linear-gradient(160deg, #061828 0%, #0b2c45 48%, #0a3a4a 100%);
      padding: 44px 52px 40px;
      display: flex;
      flex-direction: column;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
    }
    .logo {
      background: #fff;
      border-radius: 16px;
      padding: 10px 12px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.25);
      flex-shrink: 0;
    }
    .logo img {
      display: block;
      height: 92px;
      width: auto;
      max-width: 220px;
      object-fit: contain;
    }
    .badge {
      margin-top: 8px;
      font-size: 14px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-weight: 700;
      color: #061828;
      background: #2dd4bf;
      border-radius: 999px;
      padding: 10px 16px;
      align-self: flex-start;
    }
    .eyebrow {
      margin-top: 28px;
      font-size: 17px;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      font-weight: 700;
      color: #2dd4bf;
    }
    h1 {
      margin-top: 10px;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 58px;
      line-height: 0.98;
      font-weight: 700;
      max-width: 16ch;
    }
    .lead {
      margin-top: 16px;
      font-size: 23px;
      line-height: 1.35;
      color: rgba(255,255,255,0.92);
      font-weight: 500;
      max-width: 34ch;
    }
    .symptoms {
      margin-top: 26px;
      display: grid;
      gap: 12px;
    }
    .symptom {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(45,212,191,0.28);
      border-radius: 14px;
      padding: 14px 16px;
    }
    .symptom .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #2dd4bf;
      margin-top: 7px;
      flex-shrink: 0;
    }
    .symptom p {
      font-size: 22px;
      font-weight: 600;
      line-height: 1.25;
    }
    .symptom span {
      display: block;
      margin-top: 3px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(255,255,255,0.72);
    }
    .note {
      margin-top: 18px;
      font-size: 16px;
      line-height: 1.4;
      color: rgba(255,255,255,0.78);
      max-width: 42ch;
    }
    .cta {
      margin-top: 20px;
      display: inline-flex;
      align-items: center;
      gap: 14px;
      background: #2dd4bf;
      color: #061828;
      border-radius: 16px;
      padding: 14px 22px;
      align-self: flex-start;
      box-shadow: 0 14px 36px rgba(45,212,191,0.28);
    }
    .cta strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 34px;
      font-weight: 700;
      line-height: 1;
    }
    .cta span {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.2;
    }
    .foot {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      padding-top: 18px;
      border-top: 1px solid rgba(255,255,255,0.18);
    }
    .foot .phone {
      font-size: 26px;
      font-weight: 700;
    }
    .foot .meta {
      margin-top: 4px;
      font-size: 15px;
      color: rgba(255,255,255,0.75);
      line-height: 1.35;
    }
    .foot .web {
      text-align: right;
      font-size: 17px;
      font-weight: 700;
      color: #2dd4bf;
    }
    .foot .web span {
      display: block;
      margin-top: 4px;
      font-size: 13px;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
    }
  </style>
</head>
<body>
  <div class="frame">
    <div class="top">
      <div class="logo">
        <img src="${logoUri}" alt="Nguyen's Osteopathic Clinic" width="1250" height="870" />
      </div>
      <p class="badge">TOS screen</p>
    </div>

    <p class="eyebrow">Arm &amp; hand nerves</p>
    <h1>Numbness &amp; pins and needles at night?</h1>
    <p class="lead">
      Evening tingling when you sleep can relate to thoracic outlet syndrome (TOS) —
      or another nerve pathway in the neck, shoulder, or arm.
    </p>

    <div class="symptoms">
      <div class="symptom">
        <span class="dot" aria-hidden="true"></span>
        <p>Hands go numb as you drift off<span>Or wake you with pins and needles</span></p>
      </div>
      <div class="symptom">
        <span class="dot" aria-hidden="true"></span>
        <p>Symptoms into the arm or fingers<span>Often with neck, shoulder, or desk strain</span></p>
      </div>
      <div class="symptom">
        <span class="dot" aria-hidden="true"></span>
        <p>Not every case is TOS<span>We screen carefully before naming the cause</span></p>
      </div>
    </div>

    <p class="note">
      Progressive weakness, chest pain, or sudden severe neurological change needs
      urgent medical care — not a routine MSK visit alone.
    </p>

    <div class="cta">
      <strong>Book</strong>
      <span>Osteopathy assessment<br/>in Woolwich</span>
    </div>

    <div class="foot">
      <div>
        <p class="phone">07882 843513</p>
        <p class="meta">Austin Duy Nguyen · GOsC Reg. 12332<br/>St James Pharmacy · Woolwich SE18</p>
      </div>
      <div class="web">
        www.nguyensosteopathy.com/book
        <span>No GP referral needed</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const htmlPath = join(outDir, "tos-night-numbness.html");
writeFileSync(htmlPath, html);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = require("/tmp/node_modules/playwright"));
}

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: SIZE, height: SIZE },
  deviceScaleFactor: 2,
});
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(600);

const pngPath = join(outDir, "tos-night-numbness-facebook.png");
const pdfPath = join(outDir, "tos-night-numbness-facebook.pdf");

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

const preview = join(artifactDir, "tos-night-numbness-facebook.png");
writeFileSync(preview, readFileSync(pngPath));
writeFileSync(
  join("/opt/cursor/artifacts", "tos-night-numbness-facebook.png"),
  readFileSync(pngPath),
);
writeFileSync(
  join(artifactDir, "tos-night-numbness-facebook.pdf"),
  readFileSync(pdfPath),
);
writeFileSync(
  join("/opt/cursor/artifacts", "tos-night-numbness-facebook.pdf"),
  readFileSync(pdfPath),
);

console.log("PNG:", pngPath, readFileSync(pngPath).length);
console.log("PDF:", pdfPath, readFileSync(pdfPath).length);
