#!/usr/bin/env node
/**
 * Double-sided UK business card (85 × 55 mm) for Nguyen's Osteopathic Clinic.
 * Front = brand. Back = contact + QR.
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

const require = createRequire(import.meta.url);

const logoLockupUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-lockup.png"),
).toString("base64")}`;
const logoMarkUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-mark.png"),
).toString("base64")}`;

const qrPng = await QRCode.toBuffer(BOOK_URL, {
  type: "png",
  errorCorrectionLevel: "H",
  margin: 1,
  width: 600,
  color: { dark: "#0b2c45", light: "#ffffff" },
});
writeFileSync(join(outDir, "booking-qr.png"), qrPng);
const qrDataUri = `data:image/png;base64,${qrPng.toString("base64")}`;

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Nguyen's Osteopathic Clinic — Business Card</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --navy: #0b2c45;
      --navy-deep: #061828;
      --teal: #0f766e;
      --teal-bright: #2dd4bf;
      --slate: #475569;
      --line: #dbe4ee;
      --white: #ffffff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: #fff;
      font-family: "Source Sans 3", system-ui, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      text-rendering: geometricPrecision;
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

    /* —— FRONT —— */
    .front {
      background:
        radial-gradient(ellipse 80% 70% at 100% 0%, rgba(13,148,136,0.28), transparent 55%),
        linear-gradient(145deg, var(--navy-deep) 0%, var(--navy) 55%, #0a3a4a 100%);
      color: var(--white);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5mm 5.5mm 4.5mm;
    }
    .front .logo-panel {
      align-self: flex-start;
      background: var(--white);
      border-radius: 2mm;
      padding: 2mm 2.4mm;
    }
    .front .logo-panel img {
      display: block;
      height: 22mm;
      width: auto;
      max-width: 48mm;
      object-fit: contain;
    }
    .front .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 3mm;
    }
    .front .role {
      font-size: 7pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-bright);
      margin-bottom: 1mm;
    }
    .front .name {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 12pt;
      font-weight: 700;
      line-height: 1.1;
    }
    .front .reg {
      margin-top: 0.8mm;
      font-size: 6.5pt;
      color: rgba(255,255,255,0.72);
    }
    .front .place {
      text-align: right;
      font-size: 6.5pt;
      line-height: 1.3;
      color: rgba(255,255,255,0.78);
      font-weight: 600;
    }

    /* —— BACK —— */
    .back {
      background: #f7fafb;
      color: var(--navy);
      padding: 4.5mm 5mm;
      display: grid;
      grid-template-columns: 1fr 18mm;
      gap: 3.5mm;
      align-items: stretch;
    }
    .back .mark {
      width: 8mm;
      height: 8mm;
      object-fit: contain;
      margin-bottom: 2mm;
    }
    .back .label {
      font-size: 5.5pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
      margin: 0 0 0.6mm;
    }
    .back .phone {
      font-size: 11pt;
      font-weight: 700;
      letter-spacing: 0.01em;
      margin-bottom: 2.2mm;
    }
    .back .line {
      font-size: 7pt;
      line-height: 1.35;
      color: var(--slate);
      font-weight: 600;
      margin-bottom: 2mm;
    }
    .back .line strong {
      color: var(--navy);
      font-weight: 700;
    }
    .qr-col {
      background: var(--white);
      border: 0.25mm solid var(--line);
      border-radius: 2mm;
      padding: 1.8mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1mm;
      text-align: center;
    }
    .qr-col img {
      width: 13.5mm;
      height: 13.5mm;
      display: block;
    }
    .qr-col span {
      font-size: 5pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
    }
  </style>
</head>
<body>
  <!-- FRONT -->
  <section class="card front">
    <div class="logo-panel">
      <img src="${logoLockupUri}" alt="Nguyen's Osteopathic Clinic" width="1250" height="870" />
    </div>
    <div class="bottom">
      <div>
        <p class="role">GOsC-Registered Osteopath</p>
        <p class="name">Austin Duy Nguyen</p>
        <p class="reg">Reg. No. 12332</p>
      </div>
      <div class="place">
        Inside St James Pharmacy<br/>
        Woolwich · SE18 6LQ
      </div>
    </div>
  </section>

  <!-- BACK -->
  <section class="card back">
    <div>
      <img class="mark" src="${logoMarkUri}" alt="" width="512" height="512" />
      <p class="label">Call / book</p>
      <p class="phone">${PHONE}</p>
      <p class="line"><strong>${EMAIL}</strong></p>
      <p class="line"><strong>${SITE}</strong></p>
      <p class="line">Mon/Tue/Thu/Fri 9–6 · Sat 9–5:30</p>
      <p class="line">Closed Wed &amp; Sun</p>
      <p class="line">52 Powis Street, Woolwich</p>
    </div>
    <aside class="qr-col">
      <img src="${qrDataUri}" alt="Book online QR" width="600" height="600" />
      <span>Scan to book</span>
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

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 400, height: 560 },
  deviceScaleFactor: 3,
});
const page = await context.newPage();
await page.emulateMedia({ media: "print" });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(600);

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
  await cards.nth(i).screenshot({
    path: join(artifactDir, name),
    type: "png",
    scale: "device",
  });
}

await browser.close();

writeFileSync(join(artifactDir, "nguyens-osteopathy-business-card.pdf"), readFileSync(pdfPath));
writeFileSync(
  join("/opt/cursor/artifacts", "nguyens-osteopathy-business-card.pdf"),
  readFileSync(pdfPath),
);

console.log("PDF:", pdfPath);
console.log("Bytes:", readFileSync(pdfPath).length);
console.log("Artifacts:", artifactDir);
