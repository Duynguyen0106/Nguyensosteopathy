#!/usr/bin/env node
/**
 * Double-sided UK business card — 85 × 55 mm
 * Nguyen's Osteopathic Clinic / Austin Duy Nguyen
 *
 * Expert hierarchy (pocket skim):
 *   Front = brand lockup + who you meet (memory face)
 *   Back  = phone + QR + where/when (action face)
 *
 * Print: colour, 350–400gsm silk or soft-touch; optional 3mm bleed
 * outside the trim if your printer requires it (artboard is trim size).
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import QRCode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "business-card");
const artifactDir = "/opt/cursor/artifacts/business-card";

const BOOK_URL = "https://www.nguyensosteopathy.com/book";
const SITE = "www.nguyensosteopathy.com";
const PHONE = "07882 843513";
const EMAIL = "nguyensosteopathy@gmail.com";

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });
mkdirSync("/opt/cursor/artifacts", { recursive: true });

const require = createRequire(import.meta.url);

function pngMeta(buf) {
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

function fontDataUri(fileName) {
  const buf = readFileSync(join(root, "public/fonts", fileName));
  return `data:font/ttf;base64,${buf.toString("base64")}`;
}

const logoOnDarkBuf = readFileSync(
  join(root, "public/images/logo-lockup-on-dark-compact.png"),
);
const logoOnDarkUri = `data:image/png;base64,${logoOnDarkBuf.toString("base64")}`;
const logoOnDark = pngMeta(logoOnDarkBuf);

const logoPrintBuf = readFileSync(
  join(root, "public/images/logo-lockup-print.png"),
);
const logoPrintUri = `data:image/png;base64,${logoPrintBuf.toString("base64")}`;
const logoPrint = pngMeta(logoPrintBuf);

const qrPng = await QRCode.toBuffer(BOOK_URL, {
  type: "png",
  errorCorrectionLevel: "H",
  margin: 1,
  width: 1200,
  color: { dark: "#0b2c45", light: "#ffffff" },
});
writeFileSync(join(outDir, "booking-qr.png"), qrPng);
const qrDataUri = `data:image/png;base64,${qrPng.toString("base64")}`;

const fontFaceCss = `
    @font-face {
      font-family: "Source Sans 3";
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url("${fontDataUri("SourceSans3-Regular.ttf")}") format("truetype");
    }
    @font-face {
      font-family: "Source Sans 3";
      font-style: normal;
      font-weight: 600;
      font-display: block;
      src: url("${fontDataUri("SourceSans3-SemiBold.ttf")}") format("truetype");
    }
    @font-face {
      font-family: "Source Sans 3";
      font-style: normal;
      font-weight: 700;
      font-display: block;
      src: url("${fontDataUri("SourceSans3-Bold.ttf")}") format("truetype");
    }
    @font-face {
      font-family: "Cormorant Garamond";
      font-style: normal;
      font-weight: 700;
      font-display: block;
      src: url("${fontDataUri("CormorantGaramond-Bold.ttf")}") format("truetype");
    }
`;

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Nguyen's Osteopathic Clinic — Business Card</title>
  <style>
${fontFaceCss}
    :root {
      --navy: #0b2c45;
      --navy-deep: #061828;
      --teal: #0f766e;
      --teal-bright: #5eead4;
      --slate: #475569;
      --line: #d5e2e8;
      --paper: #f4f8f9;
      --white: #ffffff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: #fff;
      font-family: "Source Sans 3", sans-serif;
      color: var(--navy);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
    }
    @page { size: 85mm 55mm; margin: 0; }
    .card {
      width: 85mm;
      height: 55mm;
      position: relative;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
    }
    .card:last-child { page-break-after: auto; break-after: auto; }

    /* ——— FRONT: brand memory ——— */
    .front {
      background:
        radial-gradient(ellipse 90% 80% at 108% -8%, rgba(15,118,110,0.42), transparent 58%),
        radial-gradient(ellipse 55% 50% at -12% 110%, rgba(45,212,191,0.14), transparent 55%),
        linear-gradient(152deg, var(--navy-deep) 0%, var(--navy) 52%, #0a3a4a 100%);
      color: var(--white);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4.5mm 5.5mm 4mm;
      gap: 0;
    }
    .front .eyebrow {
      font-size: 5.5pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
      margin-bottom: 2mm;
    }
    .front .lockup {
      display: block;
      width: 42mm;
      height: auto;
      max-height: 22mm;
      object-fit: contain;
      margin: 0 0 2mm;
    }
    .front .rule {
      width: 12mm;
      height: 0.3mm;
      background: var(--teal);
      border: 0;
      margin: 0 auto 1.8mm;
    }
    .front .name {
      font-family: "Cormorant Garamond", serif;
      font-size: 11pt;
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: 0.01em;
    }
    .front .role {
      margin-top: 0.7mm;
      font-size: 6pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      color: rgba(255,255,255,0.86);
    }
    .front .reg {
      margin-top: 0.55mm;
      font-size: 5.5pt;
      font-weight: 600;
      color: rgba(255,255,255,0.62);
    }
    .front .place {
      margin-top: 1.8mm;
      font-size: 5.5pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      color: rgba(255,255,255,0.7);
    }

    /* ——— BACK: action ——— */
    .back {
      background:
        radial-gradient(ellipse 70% 60% at 100% 0%, rgba(15,118,110,0.07), transparent 55%),
        linear-gradient(180deg, #ffffff 0%, var(--paper) 100%);
      padding: 4.2mm 4.5mm 3.8mm;
      display: grid;
      grid-template-columns: 1fr 20mm;
      gap: 3mm;
      align-items: stretch;
    }
    .back-main {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .back .brand-row {
      display: flex;
      align-items: center;
      gap: 2mm;
      margin-bottom: 2.2mm;
    }
    .back .brand-row img {
      display: block;
      height: 9.5mm;
      width: auto;
      max-width: 22mm;
      object-fit: contain;
    }
    .back .brand-row .tag {
      font-size: 5.5pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
      line-height: 1.25;
    }
    .back .label {
      font-size: 5.5pt;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
      margin-bottom: 0.5mm;
    }
    .back .phone {
      font-size: 12pt;
      font-weight: 700;
      letter-spacing: 0.01em;
      line-height: 1;
      margin-bottom: 0.6mm;
    }
    .back .phone-hint {
      font-size: 6pt;
      font-weight: 600;
      color: var(--slate);
      margin-bottom: 2mm;
    }
    .back .rows {
      display: flex;
      flex-direction: column;
      gap: 1.4mm;
      margin-top: auto;
    }
    .back .row strong {
      display: block;
      font-size: 7pt;
      font-weight: 700;
      line-height: 1.2;
      color: var(--navy);
    }
    .back .row span {
      display: block;
      font-size: 6pt;
      font-weight: 600;
      color: var(--slate);
      line-height: 1.25;
      margin-top: 0.2mm;
    }
    .qr-col {
      background: var(--navy);
      border-radius: 2mm;
      padding: 2mm 1.6mm 1.8mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.2mm;
      text-align: center;
      color: var(--white);
    }
    .qr-col .scan {
      font-size: 5pt;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
    }
    .qr-col img {
      width: 14.5mm;
      height: 14.5mm;
      display: block;
      background: #fff;
      border-radius: 1mm;
      padding: 0.8mm;
    }
    .qr-col strong {
      font-family: "Cormorant Garamond", serif;
      font-size: 7.5pt;
      font-weight: 700;
      line-height: 1.05;
    }
  </style>
</head>
<body>
  <!-- FRONT -->
  <section class="card front">
    <p class="eyebrow">Osteopathy · Charlton</p>
    <img
      class="lockup"
      src="${logoOnDarkUri}"
      alt="Nguyen's Osteopathic Clinic"
      width="${logoOnDark.width}"
      height="${logoOnDark.height}"
    />
    <div>
      <hr class="rule" />
      <p class="name">Austin Duy Nguyen</p>
      <p class="role">GOsC-registered osteopath</p>
      <p class="reg">Reg. No. 12332 · English · Vietnamese</p>
      <p class="place">Inside Village Pharmacy · SE7</p>
    </div>
  </section>

  <!-- BACK -->
  <section class="card back">
    <div class="back-main">
      <div class="brand-row">
        <img
          src="${logoPrintUri}"
          alt=""
          width="${logoPrint.width}"
          height="${logoPrint.height}"
        />
        <p class="tag">Call · WhatsApp<br/>to book</p>
      </div>
      <p class="label">Phone</p>
      <p class="phone">${PHONE}</p>
      <p class="phone-hint">Call or WhatsApp anytime</p>
      <div class="rows">
        <div class="row">
          <strong>Village Pharmacy</strong>
          <span>9 The Village, Charlton SE7 8UG</span>
        </div>
        <div class="row">
          <strong>Monday – Sunday · 9am – 8pm</strong>
          <span>${EMAIL}</span>
        </div>
        <div class="row">
          <strong>${SITE}</strong>
          <span>GOsC Reg. No. 12332</span>
        </div>
      </div>
    </div>
    <aside class="qr-col">
      <p class="scan">Scan</p>
      <img src="${qrDataUri}" alt="Book online QR" width="1200" height="1200" />
      <strong>Book<br/>online</strong>
    </aside>
  </section>
</body>
</html>`;

const htmlPath = join(outDir, "business-card.html");
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
const context = await browser.newContext({
  viewport: { width: 480, height: 640 },
  deviceScaleFactor: 4,
});
const page = await context.newPage();
await page.emulateMedia({ media: "print" });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });

const fontStatus = await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
  const need = [
    { family: "Source Sans 3", weight: "400" },
    { family: "Source Sans 3", weight: "600" },
    { family: "Source Sans 3", weight: "700" },
    { family: "Cormorant Garamond", weight: "700" },
  ];
  const loaded = [];
  for (const f of need) {
    const faces = await document.fonts.load(`${f.weight} 16px "${f.family}"`);
    loaded.push({
      ...f,
      faces: faces.length,
      check: document.fonts.check(`${f.weight} 16px "${f.family}"`),
    });
  }
  return loaded;
});
if (!fontStatus.every((f) => f.check && f.faces > 0)) {
  console.error("Font load failed:", JSON.stringify(fontStatus, null, 2));
  process.exit(1);
}
console.log(
  "Fonts ready:",
  fontStatus.map((f) => `${f.family} ${f.weight}`).join(", "),
);
await page.waitForTimeout(300);

const audit = await page.evaluate(() => {
  const cards = [...document.querySelectorAll(".card")];
  function overflow(el) {
    const r = el.getBoundingClientRect();
    for (const c of el.querySelectorAll("*")) {
      if (c.getBoundingClientRect().bottom > r.bottom + 0.5) return true;
    }
    return false;
  }
  const pt = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    return Math.round((parseFloat(getComputedStyle(el).fontSize) * 72) / 96 * 10) / 10;
  };
  return {
    frontOverflow: overflow(cards[0]),
    backOverflow: overflow(cards[1]),
    namePt: pt(".front .name"),
    phonePt: pt(".back .phone"),
    hours: document.body.innerText.includes("Monday – Sunday"),
  };
});
console.log("Audit:", audit);
if (audit.frontOverflow || audit.backOverflow) {
  console.error("Card overflow detected");
  process.exit(1);
}

const pdfPath = join(outDir, "nguyens-osteopathy-business-card.pdf");
await page.pdf({
  path: pdfPath,
  width: "85mm",
  height: "55mm",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  scale: 1,
});

const cards = page.locator(".card");
const count = await cards.count();
for (let i = 0; i < count; i += 1) {
  const name = i === 0 ? "business-card-front.png" : "business-card-back.png";
  const bufPath = join(artifactDir, name);
  await cards.nth(i).screenshot({
    path: bufPath,
    type: "png",
    scale: "device",
  });
  writeFileSync(join("/opt/cursor/artifacts", name), readFileSync(bufPath));
}

await browser.close();

writeFileSync(join(artifactDir, "nguyens-osteopathy-business-card.pdf"), readFileSync(pdfPath));
writeFileSync(
  join("/opt/cursor/artifacts", "nguyens-osteopathy-business-card.pdf"),
  readFileSync(pdfPath),
);

console.log("PDF:", pdfPath, readFileSync(pdfPath).length);
console.log("Format: UK standard 85 × 55 mm — double-sided");
console.log("Artifacts:", artifactDir);
