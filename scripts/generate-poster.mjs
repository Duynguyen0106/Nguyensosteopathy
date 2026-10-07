#!/usr/bin/env node
/**
 * A3 pharmacy-window poster for Nguyen's Osteopathic Clinic.
 * Readable from a few metres: brand, one headline, phone, QR, hours, place.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import QRCode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "poster");
const artifactDir = "/opt/cursor/artifacts/poster";

const BOOK_URL = "https://www.nguyensosteopathy.com/book";
const SITE_URL = "https://www.nguyensosteopathy.com";
const PHONE = "07882 843513";

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });

const require = createRequire(import.meta.url);

const logoLockupUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-lockup.png"),
).toString("base64")}`;

const qrPng = await QRCode.toBuffer(BOOK_URL, {
  type: "png",
  errorCorrectionLevel: "H",
  margin: 2,
  width: 1400,
  color: { dark: "#0b2c45", light: "#ffffff" },
});
writeFileSync(join(outDir, "booking-qr.png"), qrPng);
const qrDataUri = `data:image/png;base64,${qrPng.toString("base64")}`;

// A3 portrait CSS pixels @ 96dpi ≈ 1123 × 1587; we design in mm via @page
const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Nguyen's Osteopathic Clinic — Window Poster</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --navy: #0b2c45;
      --navy-deep: #061828;
      --teal: #0f766e;
      --teal-bright: #2dd4bf;
      --white: #ffffff;
      --mist: #e8f4f2;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: #fff;
      color: var(--white);
      font-family: "Source Sans 3", system-ui, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      text-rendering: geometricPrecision;
    }
    @page { size: A3 portrait; margin: 0; }
    .poster {
      width: 297mm;
      height: 420mm;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse 90% 55% at 100% 0%, rgba(13,148,136,0.28), transparent 55%),
        radial-gradient(ellipse 70% 50% at 0% 100%, rgba(45,212,191,0.12), transparent 50%),
        linear-gradient(165deg, var(--navy-deep) 0%, var(--navy) 48%, #0a3a4a 100%);
      display: flex;
      flex-direction: column;
      padding: 16mm 18mm 14mm;
    }
    .logo-wrap {
      align-self: flex-start;
      background: var(--white);
      border-radius: 4mm;
      padding: 4mm 5mm;
      box-shadow: 0 2mm 8mm rgba(0,0,0,0.25);
    }
    .logo-wrap img {
      display: block;
      height: 42mm;
      width: auto;
      max-width: 92mm;
      object-fit: contain;
    }
    .eyebrow {
      margin-top: 12mm;
      font-size: 12pt;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
    }
    h1 {
      margin-top: 5mm;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 54pt;
      line-height: 0.98;
      font-weight: 700;
      max-width: 14ch;
      letter-spacing: -0.01em;
    }
    .lede {
      margin-top: 6mm;
      font-size: 15pt;
      line-height: 1.4;
      max-width: 34ch;
      color: rgba(255,255,255,0.88);
      font-weight: 500;
    }
    .bullets {
      margin-top: 8mm;
      list-style: none;
      display: grid;
      gap: 3mm;
    }
    .bullets li {
      display: flex;
      align-items: center;
      gap: 3mm;
      font-size: 14pt;
      font-weight: 600;
    }
    .bullets li::before {
      content: "";
      width: 2.4mm;
      height: 2.4mm;
      border-radius: 999px;
      background: var(--teal-bright);
      flex-shrink: 0;
    }

    .cta-row {
      margin-top: auto;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 8mm;
      align-items: stretch;
    }
    .phone-panel {
      background: rgba(255,255,255,0.08);
      border: 0.4mm solid rgba(255,255,255,0.18);
      border-radius: 5mm;
      padding: 8mm 8mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .phone-panel .label {
      font-size: 10pt;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
      margin-bottom: 3mm;
    }
    .phone-panel .number {
      font-size: 36pt;
      font-weight: 700;
      letter-spacing: 0.01em;
      line-height: 1.05;
    }
    .phone-panel .hint {
      margin-top: 3mm;
      font-size: 12pt;
      color: rgba(255,255,255,0.75);
    }
    .qr-panel {
      background: var(--white);
      color: var(--navy);
      border-radius: 5mm;
      padding: 6mm;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3mm;
    }
    .qr-panel img {
      width: 58mm;
      height: 58mm;
      display: block;
    }
    .qr-panel .scan {
      font-size: 10pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
    }
    .qr-panel strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 18pt;
    }
    .qr-panel .url {
      font-size: 8.5pt;
      color: #475569;
      word-break: break-all;
      max-width: 28ch;
      line-height: 1.3;
    }

    .meta {
      margin-top: 8mm;
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      gap: 5mm;
      padding-top: 5mm;
      border-top: 0.35mm solid rgba(255,255,255,0.2);
    }
    .meta .label {
      font-size: 9pt;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
      margin-bottom: 1.5mm;
    }
    .meta p {
      font-size: 11.5pt;
      line-height: 1.35;
      font-weight: 600;
    }
    .notice {
      margin-top: 5mm;
      font-size: 10.5pt;
      line-height: 1.35;
      color: rgba(255,255,255,0.82);
    }
    .notice strong { color: var(--teal-bright); }
    .foot {
      margin-top: 4mm;
      display: flex;
      justify-content: space-between;
      gap: 4mm;
      font-size: 9pt;
      color: rgba(255,255,255,0.55);
    }
  </style>
</head>
<body>
  <section class="poster">
    <div class="logo-wrap">
      <img src="${logoLockupUri}" alt="Nguyen's Osteopathic Clinic" width="1250" height="870" />
    </div>

    <p class="eyebrow">Inside St James Pharmacy · Woolwich</p>
    <h1>Back pain &amp; joint strain — treated properly</h1>
    <p class="lede">
      Drug-free osteopathy with Austin Duy Nguyen, GOsC-registered osteopath.
      No GP referral needed.
    </p>
    <ul class="bullets">
      <li>Private one-to-one consultations</li>
      <li>Focused shockwave &amp; men’s health care</li>
      <li>10% NHS staff &amp; student discount</li>
    </ul>

    <div class="cta-row">
      <div class="phone-panel">
        <p class="label">Call to book</p>
        <p class="number">${PHONE}</p>
        <p class="hint">Or scan the QR code to book online</p>
      </div>
      <aside class="qr-panel">
        <p class="scan">Scan to book</p>
        <img src="${qrDataUri}" alt="QR code to book online" width="1400" height="1400" />
        <strong>Book online</strong>
        <p class="url">${BOOK_URL}</p>
      </aside>
    </div>

    <div class="meta">
      <div>
        <p class="label">Visit</p>
        <p>St James Pharmacy<br/>52 Powis Street<br/>Woolwich SE18 6LQ</p>
      </div>
      <div>
        <p class="label">Hours</p>
        <p>Thursday – Friday<br/>9:00am – 6:00pm</p>
      </div>
      <div>
        <p class="label">Online</p>
        <p>${SITE_URL.replace("https://", "")}</p>
      </div>
    </div>

    <p class="notice">
      <strong>Online booking opens 5 November 2026.</strong>
      Scan now to reserve from that date.
    </p>
    <div class="foot">
      <span>GOsC Reg. No. 12332</span>
      <span>Facebook: Nguyen’s Osteopathy</span>
      <span>nguyensosteopathy@gmail.com</span>
    </div>
  </section>
</body>
</html>`;

const htmlPath = join(outDir, "poster.html");
writeFileSync(htmlPath, html);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = require("/tmp/node_modules/playwright"));
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1123, height: 1588 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.emulateMedia({ media: "print" });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(700);

const pdfPath = join(outDir, "nguyens-osteopathy-poster-a3.pdf");
await page.pdf({
  path: pdfPath,
  format: "A3",
  landscape: false,
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  scale: 1,
});

await page.locator(".poster").screenshot({
  path: join(artifactDir, "poster-preview.png"),
  type: "png",
  scale: "device",
});

await browser.close();

writeFileSync(join(artifactDir, "nguyens-osteopathy-poster-a3.pdf"), readFileSync(pdfPath));
writeFileSync(
  join("/opt/cursor/artifacts", "nguyens-osteopathy-poster-a3.pdf"),
  readFileSync(pdfPath),
);

console.log("PDF:", pdfPath);
console.log("Bytes:", readFileSync(pdfPath).length);
console.log("Artifacts:", artifactDir);
