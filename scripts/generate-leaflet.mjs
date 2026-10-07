#!/usr/bin/env node
/**
 * Generate Nguyen's Osteopathic Clinic A4 print leaflet (PDF)
 * with a QR code pointing at the live booking page.
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

const logoDataUri = `data:image/jpeg;base64,${readFileSync(
  join(root, "public/images/logo.jpg"),
).toString("base64")}`;

const qrDataUri = await QRCode.toDataURL(BOOK_URL, {
  errorCorrectionLevel: "M",
  margin: 1,
  width: 512,
  color: { dark: "#0b2c45", light: "#ffffff" },
});

writeFileSync(join(outDir, "booking-qr.png"), Buffer.from(qrDataUri.split(",")[1], "base64"));

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
    }
    .page {
      width: 794px;   /* A4 @ 96dpi */
      height: 1123px;
      padding: 52px 56px;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse 80% 45% at 0% 0%, rgba(13,148,136,0.12), transparent 55%),
        radial-gradient(ellipse 60% 40% at 100% 100%, rgba(11,44,69,0.08), transparent 50%),
        linear-gradient(165deg, #f1f5f9 0%, #ffffff 42%, #eef6f5 100%);
    }
    .page:last-child { page-break-after: auto; }
    .footer-bar {
      left: 56px !important;
      right: 56px !important;
      bottom: 40px !important;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand img {
      width: 64px;
      height: 64px;
      border-radius: 999px;
      object-fit: cover;
      object-position: center 12%;
      border: 1px solid rgba(11,44,69,0.12);
    }
    .brand-name {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 28px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      margin: 0;
      line-height: 1.05;
    }
    .brand-sub {
      margin: 4px 0 0;
      font-size: 12px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--teal);
      font-weight: 700;
    }
    h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 42px;
      line-height: 1.05;
      margin: 18px 0 10px;
      font-weight: 700;
      color: var(--navy);
    }
    .tagline {
      font-size: 15px;
      color: var(--slate);
      margin: 0 0 18px;
      max-width: 42ch;
      line-height: 1.45;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 18px;
      align-items: stretch;
      margin-top: 8px;
    }
    .panel {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 18px;
    }
    .panel h2 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 24px;
      margin: 0 0 10px;
    }
    .checks {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 8px;
    }
    .checks li {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      font-size: 13.5px;
      line-height: 1.35;
      color: var(--navy);
    }
    .checks li::before {
      content: "✓";
      color: var(--teal);
      font-weight: 700;
      margin-top: 1px;
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
      gap: 10px;
    }
    .qr-panel img {
      width: 148px;
      height: 148px;
      background: #fff;
      border-radius: 14px;
      padding: 10px;
    }
    .qr-panel .eyebrow {
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-size: 11px;
      font-weight: 700;
      color: #99f6e4;
      margin: 0;
    }
    .qr-panel strong {
      font-size: 18px;
      font-family: "Cormorant Garamond", Georgia, serif;
    }
    .qr-panel .url {
      font-size: 11.5px;
      opacity: 0.85;
      word-break: break-all;
      max-width: 26ch;
      line-height: 1.35;
    }
    .notice {
      margin-top: 16px;
      border: 1px solid rgba(13,148,136,0.35);
      background: rgba(13,148,136,0.08);
      border-radius: 14px;
      padding: 12px 14px;
      font-size: 13px;
      line-height: 1.4;
    }
    .notice strong { color: var(--teal-dark); }
    .contact-row {
      margin-top: 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .contact-row .panel {
      padding: 14px 16px;
    }
    .label {
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-size: 10.5px;
      font-weight: 700;
      color: var(--teal);
      margin: 0 0 6px;
    }
    .contact-row p {
      margin: 0;
      font-size: 13.5px;
      line-height: 1.4;
    }
    .footer-bar {
      position: absolute;
      left: 15mm;
      right: 15mm;
      bottom: 12mm;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-size: 11px;
      color: var(--slate);
      border-top: 1px solid var(--line);
      padding-top: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12.5px;
    }
    th, td {
      text-align: left;
      padding: 8px 6px;
      border-bottom: 1px solid var(--line);
      vertical-align: top;
    }
    th {
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #fff;
      background: var(--navy);
    }
    th:first-child { border-radius: 10px 0 0 0; padding-left: 12px; }
    th:last-child { border-radius: 0 10px 0 0; text-align: right; padding-right: 12px; }
    td:first-child { padding-left: 12px; font-weight: 600; }
    td:nth-child(2) { color: var(--slate); }
    td:last-child { text-align: right; font-weight: 700; color: var(--teal-dark); padding-right: 12px; }
    tr:nth-child(even) td { background: #f8fafc; }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 16px;
    }
    .services {
      columns: 2;
      column-gap: 18px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .services li {
      break-inside: avoid;
      margin: 0 0 8px;
      padding: 8px 10px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: #fff;
      font-size: 12.5px;
      font-weight: 600;
    }
    .badge {
      display: inline-block;
      margin-left: 6px;
      font-size: 9px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--teal-dark);
      background: rgba(13,148,136,0.12);
      border-radius: 999px;
      padding: 2px 7px;
      font-weight: 700;
    }
    @page { size: A4; margin: 0; }
  </style>
</head>
<body>
  <!-- FRONT -->
  <section class="page">
    <header class="brand">
      <img src="${logoDataUri}" alt="Nguyen's Osteopathic Clinic logo" />
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
        <img src="${qrDataUri}" alt="QR code to book online at nguyensosteopathy.com/book" />
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
      <img src="${logoDataUri}" alt="" />
      <div>
        <p class="brand-name">Nguyen's</p>
        <p class="brand-sub">Treatments &amp; fees</p>
      </div>
    </header>

    <h1 style="font-size:34px;margin-top:16px;">Clinical care tailored<br/>to how you move</h1>
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
          <tr><td>Specialist ED Treatment &amp; Pelvic Protocol</td><td>45 mins</td><td>£110</td></tr>
          <tr><td>Acupuncture / Electroacupuncture</td><td>30 mins / add-on</td><td>£20</td></tr>
          <tr><td>Deep Tissue Massage Therapy</td><td>45 mins</td><td>£60</td></tr>
          <tr><td>Cupping Therapy Add-on</td><td>In clinic</td><td>£15</td></tr>
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
        <p style="margin:0 0 12px;font-size:14px;line-height:1.5;">
          <strong>Monday – Friday</strong><br/>9:00am – 6:00pm<br/><br/>
          <strong>Saturday</strong><br/>9:00am – 5:30pm
        </p>
        <p class="label">Book</p>
        <p style="margin:0;font-size:13.5px;line-height:1.45;">
          Scan the front QR code or visit<br/>
          <strong>${BOOK_URL}</strong><br/><br/>
          Call <strong>07882843513</strong><br/>
          24 hours’ notice for cancellations.
        </p>
        <div style="margin-top:14px;text-align:center;">
          <img src="${qrDataUri}" alt="Book online QR" style="width:110px;height:110px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:8px;" />
          <p style="margin:8px 0 0;font-size:11px;color:var(--slate);">Scan to book · ${SITE_URL.replace("https://","")}</p>
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

// Prefer local playwright from /tmp if available, else try workspace
const require = createRequire(import.meta.url);
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
const page = await browser.newPage({ viewport: { width: 820, height: 1200 } });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const pdfPath = join(outDir, "nguyens-osteopathy-leaflet.pdf");
await page.pdf({
  path: pdfPath,
  width: "210mm",
  height: "297mm",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  preferCSSPageSize: false,
});

// Preview PNGs for walkthrough (one screenshot per A4 page)
const pages = page.locator(".page");
const pageCount = await pages.count();
for (let i = 0; i < pageCount; i += 1) {
  const name = i === 0 ? "leaflet-front.png" : "leaflet-back.png";
  const box = await pages.nth(i).boundingBox();
  if (!box) throw new Error(`Missing bounds for page ${i}`);
  await page.screenshot({
    path: join(artifactDir, name),
    type: "png",
    clip: {
      x: Math.max(0, box.x),
      y: Math.max(0, box.y),
      width: box.width,
      height: box.height,
    },
  });
}

await browser.close();

// Copy PDF into artifacts too
writeFileSync(join(artifactDir, "nguyens-osteopathy-leaflet.pdf"), readFileSync(pdfPath));

console.log("QR:", BOOK_URL);
console.log("PDF:", pdfPath);
console.log("Artifacts:", artifactDir);
