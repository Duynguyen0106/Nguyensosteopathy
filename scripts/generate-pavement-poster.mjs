#!/usr/bin/env node
/**
 * A1 + A2 pavement / A-board posters for Nguyen's Osteopathic Clinic.
 *
 * Designed for street viewing (2–5 m): brand first, one headline,
 * one support line, giant phone + QR, place + hours.
 *
 * Print tip (A-board): A2 portrait, colour, weather sleeve/laminate if outdoors.
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
mkdirSync("/opt/cursor/artifacts", { recursive: true });
mkdirSync("/opt/cursor/artifacts/screenshots", { recursive: true });

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
    viewport: { width: 2245, height: 3179 },
    scale: makeScale(1.55),
  },
  a2: {
    label: "A2",
    widthMm: 420,
    heightMm: 594,
    viewport: { width: 1587, height: 2245 },
    // Hot type + tighter spacing so pavement type can grow without overflow
    scale: makeScale(1.62, 1.12),
  },
};

function makeScale(typeFactor, spaceFactor = typeFactor) {
  const s = (n) => `${(n * spaceFactor).toFixed(2)}mm`;
  const pt = (n) => `${(n * typeFactor).toFixed(1)}pt`;
  return { s, pt, factor: typeFactor };
}

function buildHtml(sizeKey) {
  const size = SIZES[sizeKey];
  const { s, pt } = size.scale;
  const isA1 = sizeKey === "a1";
  const isA2 = sizeKey === "a2";

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Nguyen's Osteopathic Clinic — ${size.label} A-board Poster</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --navy: #0b2c45;
      --navy-deep: #061828;
      --teal: #0f766e;
      --teal-bright: #5eead4;
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
      -webkit-font-smoothing: antialiased;
    }
    @page { size: ${size.label} portrait; margin: 0; }
    .poster {
      width: ${size.widthMm}mm;
      height: ${size.heightMm}mm;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse 85% 50% at 110% -5%, rgba(13,148,136,0.38), transparent 55%),
        radial-gradient(ellipse 65% 45% at -10% 105%, rgba(45,212,191,0.16), transparent 52%),
        linear-gradient(168deg, var(--navy-deep) 0%, var(--navy) 46%, #0a3a4a 100%);
      display: flex;
      flex-direction: column;
      padding: ${isA2 ? `${s(12)} ${s(14)} ${s(10)}` : `${s(16)} ${s(18)} ${s(14)}`};
    }
    .ribbon {
      align-self: flex-start;
      background: var(--teal);
      color: #fff;
      font-size: ${isA2 ? pt(16) : pt(14)};
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: ${s(3)} ${s(5.5)};
      border-radius: ${s(2)};
      margin-bottom: ${isA2 ? s(7) : s(10)};
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: ${s(8)};
    }
    .logo-wrap {
      background: var(--white);
      border-radius: ${s(4)};
      padding: ${s(4)} ${s(5)};
      box-shadow: 0 ${s(2)} ${s(7)} rgba(0,0,0,0.28);
    }
    .logo-wrap img {
      display: block;
      height: ${isA1 ? s(48) : s(34)};
      width: auto;
      max-width: ${isA1 ? s(112) : s(84)};
      object-fit: contain;
    }
    .lang {
      text-align: right;
      font-size: ${isA2 ? pt(14) : pt(13)};
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--teal-bright);
      line-height: 1.25;
      padding-top: ${s(2)};
    }
    .lang span {
      display: block;
      margin-top: ${s(1.2)};
      font-size: ${isA2 ? pt(12) : pt(11)};
      letter-spacing: 0.12em;
      color: rgba(255,255,255,0.72);
      font-weight: 700;
    }

    .brand-block {
      margin-top: ${isA2 ? s(8) : s(12)};
    }
    .eyebrow {
      font-size: ${isA2 ? pt(16) : pt(15)};
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--teal-bright);
      margin-bottom: ${s(3)};
    }
    .brand-name {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: ${isA1 ? pt(42) : pt(40)};
      line-height: 0.96;
      font-weight: 700;
      max-width: 14ch;
      margin-bottom: ${isA2 ? s(5) : s(8)};
    }
    h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: ${isA1 ? pt(78) : pt(74)};
      line-height: 0.92;
      font-weight: 700;
      max-width: 11ch;
      letter-spacing: -0.02em;
    }
    .lede {
      margin-top: ${isA2 ? s(5) : s(7)};
      font-size: ${isA2 ? pt(22) : pt(20)};
      line-height: 1.25;
      max-width: 24ch;
      color: rgba(255,255,255,0.92);
      font-weight: 700;
    }

    .cta-stack {
      margin-top: auto;
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: ${s(8)};
      align-items: stretch;
    }
    .phone-panel {
      background: rgba(255,255,255,0.1);
      border: 0.5mm solid rgba(255,255,255,0.24);
      border-radius: ${s(5)};
      padding: ${s(8)} ${s(9)};
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .phone-panel .label {
      font-size: ${pt(13)};
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--teal-bright);
      margin-bottom: ${s(2.5)};
    }
    .phone-panel .number {
      font-size: ${isA1 ? pt(52) : pt(54)};
      font-weight: 800;
      letter-spacing: 0.01em;
      line-height: 1;
    }
    .phone-panel .hint {
      margin-top: ${s(3)};
      font-size: ${isA2 ? pt(16) : pt(15)};
      color: rgba(255,255,255,0.82);
      font-weight: 700;
    }
    .qr-panel {
      background: var(--white);
      color: var(--navy);
      border-radius: ${s(5)};
      padding: ${s(5)};
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${s(2)};
    }
    .qr-panel img {
      width: ${isA1 ? s(82) : s(62)};
      height: ${isA1 ? s(82) : s(62)};
      display: block;
    }
    .qr-panel .scan {
      font-size: ${isA2 ? pt(13) : pt(12)};
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--teal);
    }
    .qr-panel strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: ${isA2 ? pt(24) : pt(22)};
      font-weight: 700;
    }
    .qr-panel .url {
      font-size: ${isA2 ? pt(12) : pt(11)};
      font-weight: 700;
      color: rgba(11,44,69,0.7);
      line-height: 1.2;
    }

    .meta {
      margin-top: ${isA2 ? s(6) : s(8)};
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: ${s(5)};
      padding-top: ${s(4)};
      border-top: 0.45mm solid rgba(255,255,255,0.24);
    }
    .meta .label {
      font-size: ${isA2 ? pt(13) : pt(12)};
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--teal-bright);
      margin-bottom: ${s(1.4)};
    }
    .meta .value {
      font-size: ${isA2 ? pt(20) : pt(18)};
      line-height: 1.25;
      font-weight: 800;
    }
    .foot {
      margin-top: ${s(3.5)};
      display: flex;
      justify-content: space-between;
      gap: ${s(4)};
      font-size: ${isA2 ? pt(12) : pt(11)};
      font-weight: 700;
      color: rgba(255,255,255,0.62);
    }
  </style>
</head>
<body>
  <section class="poster">
    <div class="ribbon">Inside Village Pharmacy · Charlton SE7</div>

    <div class="top">
      <div class="logo-wrap">
        <img src="${logoLockupUri}" alt="Nguyen's Osteopathic Clinic" width="1250" height="870" />
      </div>
      <p class="lang">
        English · Vietnamese
        <span>No GP referral needed</span>
      </p>
    </div>

    <div class="brand-block">
      <p class="eyebrow">Osteopathy · Charlton</p>
      <p class="brand-name">Nguyen's Osteopathic Clinic</p>
      <h1>Back pain treated properly</h1>
      <p class="lede">
        Hands-on osteopathy. Book online or call — open 9am–8pm daily.
      </p>
    </div>

    <div class="cta-stack">
      <div class="phone-panel">
        <p class="label">Call / WhatsApp</p>
        <p class="number">${PHONE}</p>
        <p class="hint">Or scan the QR to book online</p>
      </div>
      <aside class="qr-panel">
        <p class="scan">Scan to book</p>
        <img src="${qrDataUri}" alt="QR code to book online" width="1600" height="1600" />
        <strong>Book online</strong>
        <p class="url">nguyensosteopathy.com<br/>/book</p>
      </aside>
    </div>

    <div class="meta">
      <div>
        <p class="label">Visit</p>
        <p class="value">Village Pharmacy · 9 The Village<br/>Charlton, London SE7 8UG</p>
      </div>
      <div>
        <p class="label">Hours</p>
        <p class="value">Monday – Sunday<br/>9:00am – 8:00pm</p>
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

  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
    args: ["--no-sandbox"],
  });
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

  // Overflow / distance-type audit for A2 (primary A-board size)
  if (sizeKey === "a2") {
    const audit = await page.evaluate(() => {
      const poster = document.querySelector(".poster");
      const pick = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const pt = (parseFloat(getComputedStyle(el).fontSize) * 72) / 96;
        return { sel, pt: +pt.toFixed(1), text: (el.textContent || "").trim().slice(0, 48) };
      };
      return {
        overflow: poster ? poster.scrollHeight > poster.clientHeight + 1 : null,
        sizes: [
          pick(".ribbon"),
          pick(".brand-name"),
          pick("h1"),
          pick(".lede"),
          pick(".phone-panel .number"),
          pick(".meta .value"),
          pick(".foot"),
        ],
      };
    });
    console.log("A2 type audit:", JSON.stringify(audit, null, 2));
  }

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
    join("/opt/cursor/artifacts", previewName),
    readFileSync(join(artifactDir, previewName)),
  );
  writeFileSync(
    join("/opt/cursor/artifacts/screenshots", previewName),
    readFileSync(join(artifactDir, previewName)),
  );

  await browser.close();

  writeFileSync(join(artifactDir, pdfName), readFileSync(pdfPath));
  writeFileSync(join("/opt/cursor/artifacts", pdfName), readFileSync(pdfPath));

  console.log(`${size.label} PDF:`, pdfPath, readFileSync(pdfPath).length, "bytes");
}

console.log("Artifacts:", artifactDir);
console.log("Primary A-board size: A2 (420×594mm)");
