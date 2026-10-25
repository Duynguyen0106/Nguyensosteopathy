#!/usr/bin/env node
/**
 * Double-sided gift voucher (148 × 105 mm, A6 landscape) for
 * Nguyen's Osteopathic Clinic — 4-session care package.
 *
 * Includes consultation & treatment covering osteopathy, acupuncture, and
 * focused shockwave. Total value £500.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import QRCode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "voucher");
const artifactDir = "/opt/cursor/artifacts/voucher";

const BOOK_URL = "https://www.nguyensosteopathy.com/book";
const SITE = "www.nguyensosteopathy.com";
const PHONE = "07882 843513";
const EMAIL = "nguyensosteopathy@gmail.com";
const ADDRESS = "St James Pharmacy · 52 Powis Street · Woolwich SE18 6LQ";

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });

const require = createRequire(import.meta.url);

const logoLockupUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-lockup.png"),
).toString("base64")}`;

const qrPng = await QRCode.toBuffer(BOOK_URL, {
  type: "png",
  errorCorrectionLevel: "H",
  margin: 1,
  width: 720,
  color: { dark: "#0b2c45", light: "#ffffff" },
});
writeFileSync(join(outDir, "booking-qr.png"), qrPng);
const qrDataUri = `data:image/png;base64,${qrPng.toString("base64")}`;

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Nguyen's Osteopathic Clinic — 4-Session Care Voucher</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --navy: #0b2c45;
      --navy-deep: #061828;
      --teal: #0f766e;
      --teal-bright: #2dd4bf;
      --teal-mist: #99f6e4;
      --slate: #475569;
      --line: #dbe4ee;
      --cream: #f4f7f9;
      --white: #ffffff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: #fff;
      font-family: "Source Sans 3", system-ui, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      text-rendering: geometricPrecision;
      color: var(--navy);
    }
    @page { size: 148mm 105mm; margin: 0; }
    .card {
      width: 148mm;
      height: 105mm;
      position: relative;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
    }
    .card:last-child { page-break-after: auto; break-after: auto; }

    /* —— FRONT —— */
    .front {
      background:
        radial-gradient(ellipse 70% 80% at 100% 0%, rgba(45,212,191,0.22), transparent 55%),
        radial-gradient(ellipse 50% 60% at 0% 100%, rgba(15,118,110,0.18), transparent 50%),
        linear-gradient(148deg, var(--navy-deep) 0%, var(--navy) 48%, #0a3a4a 100%);
      color: var(--white);
      padding: 7mm 8mm 6.5mm;
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: 3.5mm;
    }
    .front::before {
      content: "";
      position: absolute;
      inset: 3mm;
      border: 0.35mm solid rgba(153,246,228,0.35);
      border-radius: 1.5mm;
      pointer-events: none;
    }
    .front-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 4mm;
      position: relative;
      z-index: 1;
    }
    .logo-panel {
      background: var(--white);
      border-radius: 2mm;
      padding: 2mm 2.6mm;
    }
    .logo-panel img {
      display: block;
      height: 16mm;
      width: auto;
      max-width: 52mm;
      object-fit: contain;
    }
    .badge {
      text-align: right;
      padding-top: 1mm;
    }
    .badge .eyebrow {
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--teal-mist);
    }
    .badge .count {
      margin-top: 1mm;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 28pt;
      font-weight: 700;
      line-height: 0.95;
      letter-spacing: 0.02em;
    }
    .badge .count span {
      display: block;
      font-family: "Source Sans 3", system-ui, sans-serif;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--teal-bright);
      margin-top: 1.5mm;
    }
    .badge .value {
      margin-top: 2.2mm;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 16pt;
      font-weight: 700;
      line-height: 1;
      color: var(--white);
    }
    .badge .value small {
      display: block;
      margin-top: 0.8mm;
      font-family: "Source Sans 3", system-ui, sans-serif;
      font-size: 7pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.75);
    }
    .front-main {
      position: relative;
      z-index: 1;
      align-self: center;
      max-width: 118mm;
    }
    .front-main h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 22pt;
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: 0.01em;
    }
    .front-main .lead {
      margin-top: 2.5mm;
      font-size: 9.5pt;
      line-height: 1.35;
      color: rgba(255,255,255,0.9);
      max-width: 108mm;
    }
    .modalities {
      margin-top: 3.5mm;
      display: flex;
      flex-wrap: wrap;
      gap: 1.6mm;
    }
    .modalities span {
      border: 0.3mm solid rgba(153,246,228,0.45);
      border-radius: 999px;
      padding: 1.1mm 2.6mm;
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--teal-mist);
    }
    .front-foot {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 4mm;
      border-top: 0.25mm solid rgba(255,255,255,0.18);
      padding-top: 3mm;
    }
    .front-foot .note {
      font-size: 7.5pt;
      line-height: 1.35;
      color: rgba(255,255,255,0.78);
      max-width: 95mm;
    }
    .front-foot .place {
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--teal-bright);
      text-align: right;
      white-space: nowrap;
    }

    /* —— BACK —— */
    .back {
      background:
        radial-gradient(ellipse 55% 50% at 100% 100%, rgba(15,118,110,0.08), transparent 55%),
        linear-gradient(180deg, var(--cream) 0%, var(--white) 55%, #eef6f5 100%);
      padding: 6mm 7mm 5.5mm;
      display: grid;
      grid-template-columns: 1.45fr 0.9fr;
      gap: 5mm;
    }
    .back h2 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 14pt;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.1;
    }
    .back .sub {
      margin-top: 1mm;
      font-size: 7.5pt;
      color: var(--slate);
      line-height: 1.35;
    }
    .fields {
      margin-top: 3.5mm;
      display: grid;
      gap: 2.2mm;
    }
    .field {
      display: grid;
      grid-template-columns: 22mm 1fr;
      align-items: end;
      gap: 2mm;
      font-size: 7.5pt;
      color: var(--slate);
    }
    .field .label { font-weight: 700; color: var(--navy); padding-bottom: 0.6mm; }
    .field .line {
      border-bottom: 0.3mm solid var(--navy);
      min-height: 4.2mm;
    }
    .field .filled {
      border-bottom: 0.3mm solid var(--navy);
      min-height: 4.2mm;
      font-weight: 700;
      color: var(--navy);
      padding-bottom: 0.4mm;
    }
    .sessions {
      margin-top: 3.5mm;
    }
    .sessions .label {
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--teal);
      margin-bottom: 1.5mm;
    }
    .ticks {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.8mm;
    }
    .tick {
      border: 0.3mm solid var(--line);
      background: var(--white);
      border-radius: 1.2mm;
      padding: 1.6mm 1.4mm 1.4mm;
      min-height: 12mm;
    }
    .tick .n {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 11pt;
      font-weight: 700;
      color: var(--navy);
      line-height: 1;
    }
    .tick .hint {
      margin-top: 1.2mm;
      font-size: 6pt;
      color: var(--slate);
      line-height: 1.25;
    }
    .terms {
      margin-top: 3mm;
      font-size: 6.2pt;
      line-height: 1.35;
      color: var(--slate);
    }
    .terms strong { color: var(--navy); font-weight: 700; }
    .side {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-left: 0.3mm solid var(--line);
      padding-left: 4.5mm;
    }
    .includes h3 {
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--teal);
    }
    .includes ul {
      margin-top: 2mm;
      list-style: none;
      display: grid;
      gap: 1.4mm;
    }
    .includes li {
      font-size: 7.5pt;
      line-height: 1.3;
      color: var(--navy);
      padding-left: 3.2mm;
      position: relative;
    }
    .includes li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 1.5mm;
      width: 1.5mm;
      height: 1.5mm;
      border-radius: 50%;
      background: var(--teal);
    }
    .qr-block {
      text-align: center;
      margin-top: 3mm;
    }
    .qr-block img {
      width: 22mm;
      height: 22mm;
      display: block;
      margin: 0 auto;
      border: 1.2mm solid var(--white);
      box-shadow: 0 0 0 0.3mm var(--line);
      background: #fff;
    }
    .qr-block .scan {
      margin-top: 1.2mm;
      font-size: 7pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--teal);
    }
    .contact {
      margin-top: 2.5mm;
      font-size: 6.8pt;
      line-height: 1.4;
      color: var(--slate);
    }
    .contact strong {
      display: block;
      color: var(--navy);
      font-weight: 700;
      font-size: 7.5pt;
    }
  </style>
</head>
<body>
  <section class="card front" aria-label="Voucher front">
    <div class="front-top">
      <div class="logo-panel">
        <img src="${logoLockupUri}" alt="Nguyen's Osteopathic Clinic" />
      </div>
      <div class="badge">
        <p class="eyebrow">Gift voucher</p>
        <p class="count">4<span>Sessions</span></p>
        <p class="value">£500<small>Total value</small></p>
      </div>
    </div>
    <div class="front-main">
      <h1>Care package for recovery</h1>
      <p class="lead">
        Four clinic visits including consultation and treatment —
        osteopathy, acupuncture, and focused shockwave.
      </p>
      <div class="modalities" aria-label="Treatments included">
        <span>Osteopathy</span>
        <span>Acupuncture</span>
        <span>Shockwave</span>
      </div>
    </div>
    <div class="front-foot">
      <p class="note">
        Total value £500 · Redeemable at Nguyen&apos;s Osteopathic Clinic ·
        GOsC-registered care · No GP referral needed
      </p>
      <p class="place">Woolwich SE18</p>
    </div>
  </section>

  <section class="card back" aria-label="Voucher back">
    <div>
      <h2>Redeem this voucher</h2>
      <p class="sub">
        Present when booking or at your first visit. Sessions are booked around
        live clinic availability.
      </p>
      <div class="fields">
        <div class="field"><span class="label">To</span><span class="line"></span></div>
        <div class="field"><span class="label">From</span><span class="line"></span></div>
        <div class="field"><span class="label">Code</span><span class="line"></span></div>
        <div class="field"><span class="label">Issued</span><span class="filled">7th November 2026</span></div>
      </div>
      <div class="sessions">
        <p class="label">Session tracker</p>
        <div class="ticks">
          <div class="tick"><p class="n">1</p><p class="hint">Date / notes</p></div>
          <div class="tick"><p class="n">2</p><p class="hint">Date / notes</p></div>
          <div class="tick"><p class="n">3</p><p class="hint">Date / notes</p></div>
          <div class="tick"><p class="n">4</p><p class="hint">Date / notes</p></div>
        </div>
      </div>
      <p class="terms">
        <strong>Includes:</strong> 4× consultation &amp; treatment visits
        (osteopathy, acupuncture, focused shockwave).
        <strong>Total value £500.</strong>
        Non-transferable once treatment has started · Valid 12 months from issue
        unless marked otherwise · 24 hours&apos; notice for cancellations · Subject to
        practitioner availability at ${ADDRESS}.
      </p>
    </div>
    <aside class="side">
      <div class="includes">
        <h3>What&apos;s included</h3>
        <ul>
          <li>Total value £500</li>
          <li>4 consultation &amp; treatment visits</li>
          <li>Osteopathy</li>
          <li>Acupuncture</li>
          <li>Focused shockwave</li>
        </ul>
      </div>
      <div>
        <div class="qr-block">
          <img src="${qrDataUri}" alt="Book online QR code" width="720" height="720" />
          <p class="scan">Scan to book</p>
        </div>
        <p class="contact">
          <strong>${PHONE}</strong>
          ${EMAIL}<br />
          ${SITE}
        </p>
      </div>
    </aside>
  </section>
</body>
</html>`;

const htmlPath = join(outDir, "voucher.html");
writeFileSync(htmlPath, html);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = require("/tmp/node_modules/playwright"));
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 900, height: 700 },
  deviceScaleFactor: 3,
});
const page = await context.newPage();
await page.emulateMedia({ media: "print" });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(700);

const pdfPath = join(outDir, "nguyens-osteopathy-4-session-voucher.pdf");
await page.pdf({
  path: pdfPath,
  width: "148mm",
  height: "105mm",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  scale: 1,
});

const cards = page.locator(".card");
const count = await cards.count();
for (let i = 0; i < count; i += 1) {
  const name = i === 0 ? "voucher-front.png" : "voucher-back.png";
  await cards.nth(i).screenshot({
    path: join(artifactDir, name),
    type: "png",
    scale: "device",
  });
}

await browser.close();

const pdfBytes = readFileSync(pdfPath);
writeFileSync(join(artifactDir, "nguyens-osteopathy-4-session-voucher.pdf"), pdfBytes);
writeFileSync(
  join("/opt/cursor/artifacts", "nguyens-osteopathy-4-session-voucher.pdf"),
  pdfBytes,
);

console.log("PDF:", pdfPath);
console.log("Bytes:", pdfBytes.length);
console.log("Artifacts:", artifactDir);
