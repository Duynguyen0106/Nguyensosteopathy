#!/usr/bin/env node
/**
 * A1 + A2 pavement / A-board posters for Nguyen's Osteopathic Clinic.
 * Distance-readable: brand, one headline, one line of support, phone, QR, place.
 * Same visual language as the A3 window poster.
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
const SITE_HOST = "www.nguyensosteopathy.com";
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
  width: 1600,
  color: { dark: "#0b2c45", light: "#ffffff" },
});
writeFileSync(join(outDir, "booking-qr.png"), qrPng);
const qrDataUri = `data:image/png;base64,${qrPng.toString("base64")}`;

/** @type {Record<string, { label: string; widthMm: number; heightMm: number; viewport: { width: number; height: number }; scale: ReturnType<typeof makeScale> }>} */
const SIZES = {
  a1: {
    label: "A1",
    widthMm: 594,
    heightMm: 841,
    // ~96dpi CSS px for A1
    viewport: { width: 2245, height: 3179 },
    scale: makeScale(1.55),
  },
  a2: {
    label: "A2",
    widthMm: 420,
    heightMm: 594,
    viewport: { width: 1587, height: 2245 },
    scale: makeScale(1.2),
  },
};

function makeScale(factor) {
  const s = (n) => `${(n * factor).toFixed(2)}mm`;
  const pt = (n) => `${(n * factor).toFixed(1)}pt`;
  return { s, pt, factor };
}

function buildHtml(sizeKey) {
  const size = SIZES[sizeKey];
  const { s, pt } = size.scale;
  const isA1 = sizeKey === "a1";

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Nguyen's Osteopathic Clinic — ${size.label} Pavement Poster</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --navy: #0b2c45;
      --navy-deep: #061828;
      --teal: #0f766e;
      --teal-bright: #2dd4bf;
      --white: #ffffff;
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
    @page { size: ${size.label} portrait; margin: 0; }
    .poster {
      width: ${size.widthMm}mm;
      height: ${size.heightMm}mm;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse 90% 55% at 100% 0%, rgba(13,148,136,0.30), transparent 55%),
        radial-gradient(ellipse 70% 50% at 0% 100%, rgba(45,212,191,0.14), transparent 50%),
        linear-gradient(165deg, var(--navy-deep) 0%, var(--navy) 48%, #0a3a4a 100%);
      display: flex;
      flex-direction: column;
      padding: ${s(18)} ${s(20)} ${s(16)};
    }
    .logo-wrap {
      align-self: flex-start;
      background: var(--white);
      border-radius: ${s(4.5)};
      padding: ${s(4.5)} ${s(5.5)};
      box-shadow: 0 ${s(2)} ${s(8)} rgba(0,0,0,0.28);
    }
    .logo-wrap img {
      display: block;
      height: ${isA1 ? s(52) : s(44)};
      width: auto;
      max-width: ${isA1 ? s(120) : s(100)};
      object-fit: contain;
    }
    .eyebrow {
      margin-top: ${s(14)};
      font-size: ${pt(13)};
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
    }
    h1 {
      margin-top: ${s(5)};
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: ${isA1 ? pt(72) : pt(58)};
      line-height: 0.96;
      font-weight: 700;
      max-width: 12ch;
      letter-spacing: -0.015em;
    }
    .lede {
      margin-top: ${s(7)};
      font-size: ${pt(17)};
      line-height: 1.35;
      max-width: 28ch;
      color: rgba(255,255,255,0.9);
      font-weight: 600;
    }

    .cta-stack {
      margin-top: auto;
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: ${s(9)};
      align-items: stretch;
    }
    .phone-panel {
      background: rgba(255,255,255,0.09);
      border: 0.45mm solid rgba(255,255,255,0.2);
      border-radius: ${s(5.5)};
      padding: ${s(9)} ${s(9)};
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .phone-panel .label {
      font-size: ${pt(11)};
      letter-spacing: 0.24em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
      margin-bottom: ${s(3)};
    }
    .phone-panel .number {
      font-size: ${isA1 ? pt(48) : pt(38)};
      font-weight: 700;
      letter-spacing: 0.01em;
      line-height: 1.02;
    }
    .phone-panel .hint {
      margin-top: ${s(3.5)};
      font-size: ${pt(13)};
      color: rgba(255,255,255,0.78);
      font-weight: 600;
    }
    .qr-panel {
      background: var(--white);
      color: var(--navy);
      border-radius: ${s(5.5)};
      padding: ${s(6.5)};
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${s(3)};
    }
    .qr-panel img {
      width: ${isA1 ? s(78) : s(64)};
      height: ${isA1 ? s(78) : s(64)};
      display: block;
    }
    .qr-panel .scan {
      font-size: ${pt(11)};
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
    }
    .qr-panel strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: ${pt(20)};
    }

    .meta {
      margin-top: ${s(9)};
      display: grid;
      grid-template-columns: 1.35fr 1fr;
      gap: ${s(6)};
      padding-top: ${s(5.5)};
      border-top: 0.4mm solid rgba(255,255,255,0.22);
    }
    .meta .label {
      font-size: ${pt(10)};
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
      margin-bottom: ${s(1.8)};
    }
    .meta p {
      font-size: ${pt(13.5)};
      line-height: 1.35;
      font-weight: 700;
    }
    .foot {
      margin-top: ${s(5)};
      display: flex;
      justify-content: space-between;
      gap: ${s(4)};
      font-size: ${pt(10)};
      font-weight: 600;
      color: rgba(255,255,255,0.58);
    }
  </style>
</head>
<body>
  <section class="poster">
    <div class="logo-wrap">
      <img src="${logoLockupUri}" alt="Nguyen's Osteopathic Clinic" width="1250" height="870" />
    </div>

    <p class="eyebrow">Inside St James Pharmacy · Woolwich</p>
    <h1>Back pain treated properly</h1>
    <p class="lede">
      Drug-free osteopathy. Book online or call — no GP referral needed.
    </p>

    <div class="cta-stack">
      <div class="phone-panel">
        <p class="label">Call to book</p>
        <p class="number">${PHONE}</p>
        <p class="hint">Or scan to book online</p>
      </div>
      <aside class="qr-panel">
        <p class="scan">Scan to book</p>
        <img src="${qrDataUri}" alt="QR code to book online" width="1600" height="1600" />
        <strong>Book online</strong>
      </aside>
    </div>

    <div class="meta">
      <div>
        <p class="label">Visit</p>
        <p>St James Pharmacy · 52 Powis Street<br/>Woolwich, London SE18 6LQ</p>
      </div>
      <div>
        <p class="label">Hours</p>
        <p>Mon–Fri 9:00am–6:00pm<br/>Sat 9:00am–5:30pm</p>
      </div>
    </div>

    <div class="foot">
      <span>GOsC Reg. No. 12332 · Austin Duy Nguyen</span>
      <span>${SITE_HOST}</span>
    </div>
  </section>
</body>
</html>`;
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = require("/tmp/node_modules/playwright"));
}

for (const sizeKey of /** @type {const} */ (["a1", "a2"])) {
  const size = SIZES[sizeKey];
  const html = buildHtml(sizeKey);
  const htmlPath = join(outDir, `poster-${sizeKey}.html`);
  writeFileSync(htmlPath, html);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: size.viewport,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.emulateMedia({ media: "print" });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(800);

  const pdfName = `nguyens-osteopathy-poster-${sizeKey}.pdf`;
  const pdfPath = join(outDir, pdfName);
  await page.pdf({
    path: pdfPath,
    format: size.label,
    landscape: false,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    scale: 1,
  });

  const previewName = `pavement-poster-${sizeKey}-preview.png`;
  await page.locator(".poster").screenshot({
    path: join(artifactDir, previewName),
    type: "png",
    scale: "device",
  });
  writeFileSync(
    join("/opt/cursor/artifacts/screenshots", previewName),
    readFileSync(join(artifactDir, previewName)),
  );

  await browser.close();

  writeFileSync(join(artifactDir, pdfName), readFileSync(pdfPath));
  writeFileSync(
    join("/opt/cursor/artifacts", pdfName),
    readFileSync(pdfPath),
  );

  console.log(`${size.label} PDF:`, pdfPath, readFileSync(pdfPath).length, "bytes");
}

console.log("Artifacts:", artifactDir);
