#!/usr/bin/env node
/**
 * Printable itemised receipt (A5) for Nguyen's Osteopathic Clinic.
 * Practitioner name + GOsC registration are fixed for insurance claims;
 * patient / date / service / fee fields are left blank for handwriting.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "receipt");
const artifactDir = "/opt/cursor/artifacts/receipt";

const CLINIC = "Nguyen's Osteopathic Clinic";
const PRACTITIONER = "Austin Duy Nguyen";
const LEGAL_NAME = "Ba-duy Nguyen";
const REG_NO = "12332";
const PHONE = "07882 843513";
const EMAIL = "nguyensosteopathy@gmail.com";
const SITE = "www.nguyensosteopathy.com";
const ADDRESS_1 = "Inside Village Pharmacy";
const ADDRESS_2 = "9 The Village, Charlton, London SE7 8UG";

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });
mkdirSync("/opt/cursor/artifacts", { recursive: true });

const require = createRequire(import.meta.url);

function fontDataUri(fileName) {
  const buf = readFileSync(join(root, "public/fonts", fileName));
  return `data:font/ttf;base64,${buf.toString("base64")}`;
}

const logoBuf = readFileSync(join(root, "public/images/logo-lockup-print.png"));
const logoUri = `data:image/png;base64,${logoBuf.toString("base64")}`;
const logoW = logoBuf.readUInt32BE(16);
const logoH = logoBuf.readUInt32BE(20);

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
  <title>${CLINIC} — Itemised receipt</title>
  <style>
${fontFaceCss}
    :root {
      --navy: #0b2c45;
      --teal: #0f766e;
      --slate: #475569;
      --line: #d5e2e8;
      --paper: #f7fafb;
      --white: #ffffff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: #fff;
      color: var(--navy);
      font-family: "Source Sans 3", sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      text-rendering: geometricPrecision;
    }
    @page { size: A5; margin: 0; }
    .page {
      width: 148mm;
      height: 210mm;
      padding: 10mm 11mm 9mm;
      display: flex;
      flex-direction: column;
      background:
        radial-gradient(ellipse 70% 40% at 100% 0%, rgba(15,118,110,0.06), transparent 55%),
        linear-gradient(180deg, #ffffff 0%, var(--paper) 100%);
    }
    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 4mm;
      padding-bottom: 4mm;
      border-bottom: 0.35mm solid var(--navy);
    }
    .head img {
      display: block;
      height: 18mm;
      width: auto;
      max-width: 42mm;
      object-fit: contain;
    }
    .head-meta {
      text-align: right;
    }
    .head-meta .doc {
      font-family: "Cormorant Garamond", serif;
      font-size: 16pt;
      font-weight: 700;
      line-height: 1;
    }
    .head-meta .sub {
      margin-top: 1.2mm;
      font-size: 8pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--teal);
    }
    .practitioner {
      margin-top: 4.5mm;
      padding: 3.2mm 3.5mm;
      background: rgba(15,118,110,0.07);
      border: 0.25mm solid rgba(15,118,110,0.2);
      border-radius: 2mm;
    }
    .practitioner .label {
      font-size: 7pt;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
      margin-bottom: 1.4mm;
    }
    .practitioner .name {
      font-family: "Cormorant Garamond", serif;
      font-size: 14pt;
      font-weight: 700;
      line-height: 1.1;
    }
    .practitioner .legal {
      margin-top: 0.8mm;
      font-size: 8.5pt;
      font-weight: 600;
      color: var(--slate);
    }
    .practitioner .reg {
      margin-top: 1.6mm;
      font-size: 10pt;
      font-weight: 700;
    }
    .clinic {
      margin-top: 3.5mm;
      font-size: 8.5pt;
      line-height: 1.4;
      font-weight: 600;
      color: var(--slate);
    }
    .clinic strong {
      color: var(--navy);
      font-weight: 700;
    }
    .fields {
      margin-top: 5mm;
      flex: 1 1 auto;
    }
    .fields .section {
      font-size: 7.5pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
      margin-bottom: 2mm;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      text-align: left;
      padding: 2.4mm 0;
      border-bottom: 0.2mm solid var(--line);
      vertical-align: bottom;
    }
    th {
      font-size: 7.5pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--teal);
      font-weight: 700;
      width: 32%;
    }
    td {
      font-size: 9.5pt;
      font-weight: 600;
      height: 8mm;
    }
    .blank {
      border-bottom: 0.25mm solid var(--navy);
      min-height: 5mm;
      display: block;
    }
    .note {
      margin-top: 4mm;
      font-size: 7.5pt;
      line-height: 1.35;
      color: var(--slate);
      font-weight: 600;
    }
    .sign {
      margin-top: auto;
      padding-top: 5mm;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6mm;
    }
    .sign .box .label {
      font-size: 7pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
      margin-bottom: 8mm;
    }
    .sign .line {
      border-top: 0.25mm solid var(--navy);
      padding-top: 1.2mm;
      font-size: 7.5pt;
      font-weight: 600;
      color: var(--slate);
    }
    .foot {
      margin-top: 4mm;
      padding-top: 2.5mm;
      border-top: 0.2mm solid var(--line);
      display: flex;
      justify-content: space-between;
      gap: 3mm;
      font-size: 7pt;
      font-weight: 600;
      color: var(--slate);
    }
  </style>
</head>
<body>
  <section class="page">
    <header class="head">
      <img src="${logoUri}" alt="${CLINIC}" width="${logoW}" height="${logoH}" />
      <div class="head-meta">
        <p class="doc">Itemised receipt</p>
        <p class="sub">Patient copy</p>
      </div>
    </header>

    <div class="practitioner">
      <p class="label">Practitioner</p>
      <p class="name">${PRACTITIONER}</p>
      <p class="legal">GOsC register name: ${LEGAL_NAME}</p>
      <p class="reg">GOsC Reg. No. ${REG_NO}</p>
    </div>

    <p class="clinic">
      <strong>${CLINIC}</strong><br/>
      ${ADDRESS_1}<br/>
      ${ADDRESS_2}<br/>
      ${PHONE} · ${EMAIL}<br/>
      ${SITE}
    </p>

    <div class="fields">
      <p class="section">Treatment details</p>
      <table>
        <tr>
          <th>Patient name</th>
          <td><span class="blank">&nbsp;</span></td>
        </tr>
        <tr>
          <th>Date of treatment</th>
          <td><span class="blank">&nbsp;</span></td>
        </tr>
        <tr>
          <th>Service</th>
          <td><span class="blank">&nbsp;</span></td>
        </tr>
        <tr>
          <th>Duration</th>
          <td><span class="blank">&nbsp;</span></td>
        </tr>
        <tr>
          <th>Fee paid</th>
          <td><span class="blank">&nbsp;</span></td>
        </tr>
        <tr>
          <th>Payment method</th>
          <td><span class="blank">&nbsp;</span></td>
        </tr>
        <tr>
          <th>Receipt / ref no.</th>
          <td><span class="blank">&nbsp;</span></td>
        </tr>
      </table>
      <p class="note">
        This receipt confirms payment for osteopathic / related clinical care.
        For insurance or cash-plan claims, quote the practitioner name and
        GOsC registration number above. No GP referral is required by the clinic.
      </p>
    </div>

    <div class="sign">
      <div class="box">
        <p class="label">Practitioner signature</p>
        <p class="line">Date</p>
      </div>
      <div class="box">
        <p class="label">Patient acknowledgement</p>
        <p class="line">Date</p>
      </div>
    </div>

    <div class="foot">
      <span>GOsC Reg. No. ${REG_NO}</span>
      <span>${SITE}</span>
    </div>
  </section>
</body>
</html>`;

writeFileSync(join(outDir, "receipt.html"), html);

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
  viewport: { width: 874, height: 1240 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.emulateMedia({ media: "print" });
await page.goto(`file://${join(outDir, "receipt.html")}`, {
  waitUntil: "networkidle",
});
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
  await document.fonts.load('700 16px "Cormorant Garamond"');
  await document.fonts.load('700 16px "Source Sans 3"');
});
await page.waitForTimeout(400);

const pdfPath = join(outDir, "nguyens-osteopathy-receipt.pdf");
await page.pdf({
  path: pdfPath,
  format: "A5",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  scale: 1,
});

const preview = join(artifactDir, "receipt-preview.png");
await page.locator(".page").screenshot({
  path: preview,
  type: "png",
  scale: "device",
});
writeFileSync(join("/opt/cursor/artifacts", "receipt-preview.png"), readFileSync(preview));
writeFileSync(join(artifactDir, "nguyens-osteopathy-receipt.pdf"), readFileSync(pdfPath));
writeFileSync(
  join("/opt/cursor/artifacts", "nguyens-osteopathy-receipt.pdf"),
  readFileSync(pdfPath),
);

await browser.close();
console.log("PDF:", pdfPath, readFileSync(pdfPath).length);
console.log("Practitioner:", PRACTITIONER, "| GOsC:", LEGAL_NAME, "| Reg.", REG_NO);
