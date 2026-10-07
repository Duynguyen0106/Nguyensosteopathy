#!/usr/bin/env node
/**
 * Generate Nguyen's Osteopathic Clinic A4 print leaflet (PDF)
 * with a QR code pointing at the live booking page.
 *
 * Print target: A4 (210×297mm), ~300dpi raster assets, vector text via Chromium PDF.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import QRCode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "leaflet");
const artifactDir = "/opt/cursor/artifacts/leaflet";

const BOOK_URL = "https://www.nguyensosteopathy.com/book";
const SITE_URL = "https://www.nguyensosteopathy.com";

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });

const require = createRequire(import.meta.url);
const sharp = require("sharp");

// Square headshot crop at 512px (~300dpi for ~18mm print, with headroom)
const logoSrc = join(root, "public/images/logo.jpg");
const logoPngPath = join(outDir, "logo-print.png");
const logoMeta = await sharp(logoSrc).metadata();
const side = Math.min(logoMeta.width ?? 1024, logoMeta.height ?? 1024);
const left = Math.max(0, Math.floor(((logoMeta.width ?? side) - side) / 2));
const top = Math.max(0, Math.floor(((logoMeta.height ?? side) - side) * 0.08));
await sharp(logoSrc)
  .extract({ left, top: Math.min(top, (logoMeta.height ?? side) - side), width: side, height: side })
  .resize(512, 512, { kernel: "lanczos3" })
  .png({ compressionLevel: 6 })
  .toFile(logoPngPath);

const logoDataUri = `data:image/png;base64,${readFileSync(logoPngPath).toString("base64")}`;

// QR at 1200px ≈ 300dpi for ~40mm printed module (scannable + sharp on print)
const qrPng = await QRCode.toBuffer(BOOK_URL, {
  type: "png",
  errorCorrectionLevel: "H",
  margin: 2,
  width: 1200,
  color: { dark: "#0b2c45", light: "#ffffff" },
});
writeFileSync(join(outDir, "booking-qr.png"), qrPng);
const qrDataUri = `data:image/png;base64,${qrPng.toString("base64")}`;

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Nguyen's Osteopathic Clinic — Leaflet</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --navy: #0b2c45;
      --navy-deep: #071e30;
      --teal: #0d9488;
      --teal-dark: #0f766e;
      --slate: #475569;
      --line: #e2e8f0;
      --paper: #f8fafc;
      --white: #ffffff;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: #fff;
      color: var(--navy);
      font-family: "Source Sans 3", system-ui, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
    }
    @page {
      size: A4;
      margin: 0;
    }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 14mm 15mm;
      page-break-after: always;
      break-after: page;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse 80% 45% at 0% 0%, rgba(13,148,136,0.12), transparent 55%),
        radial-gradient(ellipse 60% 40% at 100% 100%, rgba(11,44,69,0.08), transparent 50%),
        linear-gradient(165deg, #f1f5f9 0%, #ffffff 42%, #eef6f5 100%);
    }
    .page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    .footer-bar {
      left: 15mm !important;
      right: 15mm !important;
      bottom: 10mm !important;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 3.5mm;
    }
    .brand img {
      width: 18mm;
      height: 18mm;
      border-radius: 999px;
      object-fit: cover;
      object-position: center 12%;
      border: 0.3mm solid rgba(11,44,69,0.12);
      image-rendering: auto;
    }
    .brand-name {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 22pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      margin: 0;
      line-height: 1.05;
    }
    .brand-sub {
      margin: 1mm 0 0;
      font-size: 8.5pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--teal);
      font-weight: 700;
    }
    h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 32pt;
      line-height: 1.05;
      margin: 5mm 0 3mm;
      font-weight: 700;
      color: var(--navy);
    }
    .tagline {
      font-size: 11pt;
      color: var(--slate);
      margin: 0 0 5mm;
      max-width: 42ch;
      line-height: 1.45;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 5mm;
      align-items: stretch;
      margin-top: 2mm;
    }
    .panel {
      background: var(--white);
      border: 0.3mm solid var(--line);
      border-radius: 4.5mm;
      padding: 5mm;
    }
    .panel h2 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 18pt;
      margin: 0 0 3mm;
    }
    .checks {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 2.2mm;
    }
    .checks li {
      display: flex;
      gap: 2mm;
      align-items: flex-start;
      font-size: 10pt;
      line-height: 1.35;
      color: var(--navy);
    }
    .checks li::before {
      content: "✓";
      color: var(--teal);
      font-weight: 700;
      margin-top: 0.2mm;
    }
    .qr-panel {
      text-align: center;
      background: var(--navy);
      color: #fff;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2.5mm;
    }
    .qr-panel img {
      width: 42mm;
      height: 42mm;
      background: #fff;
      border-radius: 3.5mm;
      padding: 2.5mm;
    }
    .qr-panel .eyebrow {
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-size: 8pt;
      font-weight: 700;
      color: #99f6e4;
      margin: 0;
    }
    .qr-panel strong {
      font-size: 14pt;
      font-family: "Cormorant Garamond", Georgia, serif;
    }
    .qr-panel .url {
      font-size: 8.5pt;
      opacity: 0.85;
      word-break: break-all;
      max-width: 26ch;
      line-height: 1.35;
    }
    .notice {
      margin-top: 4.5mm;
      border: 0.3mm solid rgba(13,148,136,0.35);
      background: rgba(13,148,136,0.08);
      border-radius: 3.5mm;
      padding: 3.5mm 4mm;
      font-size: 10pt;
      line-height: 1.4;
    }
    .notice strong { color: var(--teal-dark); }
    .contact-row {
      margin-top: 4.5mm;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5mm;
    }
    .contact-row .panel {
      padding: 4mm 4.5mm;
    }
    .label {
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-size: 7.5pt;
      font-weight: 700;
      color: var(--teal);
      margin: 0 0 1.5mm;
    }
    .contact-row p {
      margin: 0;
      font-size: 10pt;
      line-height: 1.4;
    }
    .footer-bar {
      position: absolute;
      left: 15mm;
      right: 15mm;
      bottom: 10mm;
      display: flex;
      justify-content: space-between;
      gap: 3mm;
      font-size: 8pt;
      color: var(--slate);
      border-top: 0.3mm solid var(--line);
      padding-top: 2.5mm;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
    }
    th, td {
      text-align: left;
      padding: 2.2mm 1.5mm;
      border-bottom: 0.3mm solid var(--line);
      vertical-align: top;
    }
    th {
      font-size: 8pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #fff;
      background: var(--navy);
    }
    th:first-child { border-radius: 2.5mm 0 0 0; padding-left: 3.5mm; }
    th:last-child { border-radius: 0 2.5mm 0 0; text-align: right; padding-right: 3.5mm; }
    td:first-child { padding-left: 3.5mm; font-weight: 600; }
    td:nth-child(2) { color: var(--slate); }
    td:last-child { text-align: right; font-weight: 700; color: var(--teal-dark); padding-right: 3.5mm; }
    tr:nth-child(even) td { background: #f8fafc; }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4mm;
      margin-top: 4.5mm;
    }
    .services {
      columns: 2;
      column-gap: 5mm;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .services li {
      break-inside: avoid;
      margin: 0 0 2.2mm;
      padding: 2.2mm 2.8mm;
      border: 0.3mm solid var(--line);
      border-radius: 3mm;
      background: #fff;
      font-size: 9.5pt;
      font-weight: 600;
    }
    .badge {
      display: inline-block;
      margin-left: 1.5mm;
      font-size: 6.5pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--teal-dark);
      background: rgba(13,148,136,0.12);
      border-radius: 999px;
      padding: 0.5mm 1.8mm;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <!-- FRONT -->
  <section class="page">
    <header class="brand">
      <img src="${logoDataUri}" alt="Nguyen's Osteopathic Clinic logo" width="512" height="512" />
      <div>
        <p class="brand-name">Nguyen's</p>
        <p class="brand-sub">Osteopathic Clinic</p>
      </div>
    </header>

    <h1>Recover, Realign &amp;<br/>Restore Your Vitality</h1>
    <p class="tagline">
      High-quality, drug-free osteopathic care in Woolwich with
      Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332).
    </p>

    <div class="hero-grid">
      <div class="panel">
        <h2>Why patients choose us</h2>
        <ul class="checks">
          <li>100% drug-free &amp; non-invasive treatment</li>
          <li>No GP referral necessary</li>
          <li>Private one-to-one consultations</li>
          <li>Focused shockwave &amp; men’s health specialist care</li>
          <li>10% NHS staff &amp; student discount (valid ID)</li>
          <li>Conveniently inside St James Pharmacy, Woolwich</li>
        </ul>
      </div>

      <div class="panel qr-panel">
        <p class="eyebrow">Scan to book</p>
        <img src="${qrDataUri}" alt="QR code to book online at nguyensosteopathy.com/book" width="1200" height="1200" />
        <strong>Book online</strong>
        <p class="url">${BOOK_URL}</p>
      </div>
    </div>

    <div class="notice">
      <strong>Online appointments open from 5 November 2026.</strong>
      Scan the QR code or visit the website to reserve a time from that date.
    </div>

    <div class="contact-row">
      <div class="panel">
        <p class="label">Visit</p>
        <p><strong>St James Pharmacy &amp; Travel Clinic</strong><br/>
        52 Powis Street<br/>
        Woolwich, London SE18 6LQ</p>
      </div>
      <div class="panel">
        <p class="label">Contact</p>
        <p>
          <strong>07882843513</strong><br/>
          nguyensosteopathy@gmail.com<br/>
          ${SITE_URL.replace("https://", "")}
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>GOsC Reg. No. 12332</span>
      <span>Facebook: Nguyen’s Osteopathy</span>
      <span>${SITE_URL.replace("https://", "")}</span>
    </div>
  </section>

  <!-- BACK -->
  <section class="page">
    <header class="brand">
      <img src="${logoDataUri}" alt="" width="512" height="512" />
      <div>
        <p class="brand-name">Nguyen's</p>
        <p class="brand-sub">Treatments &amp; fees</p>
      </div>
    </header>

    <h1 style="font-size:26pt;margin-top:4mm;">Clinical care tailored<br/>to how you move</h1>
    <p class="tagline">Transparent pricing. Book online in minutes.</p>

    <div class="panel" style="padding:0; overflow:hidden;">
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Duration</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Initial Consultation &amp; Treatment</td><td>60 mins</td><td>£75</td></tr>
          <tr><td>Follow-up Osteopathic Treatment</td><td>30 mins</td><td>£60</td></tr>
          <tr><td>Focused Shockwave Therapy (LI-ESWT)</td><td>30 mins</td><td>£90</td></tr>
          <tr><td>Specialist ED Treatment &amp; Pelvic Protocol</td><td>30 mins</td><td>£110</td></tr>
          <tr><td>Acupuncture / Electroacupuncture</td><td>30 mins / add-on</td><td>+£20</td></tr>
          <tr><td>Deep Tissue Massage Therapy</td><td>45 mins</td><td>£60</td></tr>
          <tr><td>Cupping Therapy Add-on</td><td>45 mins</td><td>+£15</td></tr>
        </tbody>
      </table>
    </div>

    <div class="two-col">
      <div class="panel">
        <p class="label">Services</p>
        <ul class="services" style="columns:1;">
          <li>Back &amp; Neck Pain</li>
          <li>Headaches &amp; Joints</li>
          <li>Focused Shockwave <span class="badge">Specialist</span></li>
          <li>Men’s Health &amp; ED <span class="badge">Specialist</span></li>
          <li>Acupuncture / Electro</li>
          <li>Deep Tissue Massage</li>
          <li>Sports Injury Rehab</li>
          <li>Pregnancy Support</li>
          <li>Cranial &amp; Paediatric Care</li>
        </ul>
      </div>
      <div class="panel">
        <p class="label">Opening hours</p>
        <p style="margin:0 0 3.5mm;font-size:10.5pt;line-height:1.5;">
          <strong>Thursday – Friday</strong><br/>9:00am – 6:00pm
        </p>
        <p class="label">Book</p>
        <p style="margin:0;font-size:10pt;line-height:1.45;">
          Scan the front QR code or visit<br/>
          <strong>${BOOK_URL}</strong><br/><br/>
          Call <strong>07882843513</strong><br/>
          24 hours’ notice for cancellations.
        </p>
        <div style="margin-top:4mm;text-align:center;">
          <img src="${qrDataUri}" alt="Book online QR" width="1200" height="1200" style="width:32mm;height:32mm;background:#fff;border:0.3mm solid var(--line);border-radius:3mm;padding:2mm;" />
          <p style="margin:2mm 0 0;font-size:8pt;color:var(--slate);">Scan to book · ${SITE_URL.replace("https://","")}</p>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>© 2026 Nguyen’s Osteopathic Clinic</span>
      <span>Inside St James Pharmacy &amp; Travel Clinic, Woolwich</span>
    </div>
  </section>
</body>
</html>`;

const htmlPath = join(outDir, "leaflet.html");
writeFileSync(htmlPath, html);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  try {
    ({ chromium } = require("/tmp/node_modules/playwright"));
  } catch {
    ({ chromium } = await import("/tmp/node_modules/playwright/index.mjs"));
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1240, height: 1754 }, // A4 @ ~150 CSS px/inch preview
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.emulateMedia({ media: "print" });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(800);

const pdfPath = join(outDir, "nguyens-osteopathy-leaflet.pdf");
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  scale: 1,
});

// High-res preview PNGs (~300dpi A4 ≈ 2480×3508)
const pages = page.locator(".page");
const pageCount = await pages.count();
for (let i = 0; i < pageCount; i += 1) {
  const name = i === 0 ? "leaflet-front.png" : "leaflet-back.png";
  const el = pages.nth(i);
  await el.screenshot({
    path: join(artifactDir, name),
    type: "png",
    scale: "device",
  });
}

await browser.close();

writeFileSync(join(artifactDir, "nguyens-osteopathy-leaflet.pdf"), readFileSync(pdfPath));

console.log("QR:", BOOK_URL);
console.log("PDF:", pdfPath);
console.log("PDF bytes:", readFileSync(pdfPath).length);
console.log("QR px:", 1200);
console.log("Artifacts:", artifactDir);
