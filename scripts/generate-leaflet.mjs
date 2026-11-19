#!/usr/bin/env node
/**
 * Nguyen's Osteopathic Clinic — A5 print leaflet (PDF)
 * with QR code to the live booking page.
 *
 * Print target: A5 (148×210mm) — UK letterbox / door-drop friendly.
 *
 * Front = brand + hero atmosphere + one hook + book CTA
 * Back  = fees + first visit + contact
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import QRCode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "leaflet");
const artifactDir = "/opt/cursor/artifacts/leaflet";

const BOOK_URL = "https://www.nguyensosteopathy.com/book";
const SITE_URL = "https://www.nguyensosteopathy.com";
const PHONE = "07882 843513";
const EMAIL = "nguyensosteopathy@gmail.com";

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });
mkdirSync("/opt/cursor/artifacts", { recursive: true });

const require = createRequire(import.meta.url);

const logoLockupDataUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-lockup.png"),
).toString("base64")}`;
const logoMarkDataUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-mark.png"),
).toString("base64")}`;

function webpToJpegDataUri(inputPath, maxWidth) {
  const tmp = join(
    outDir,
    `.tmp-${inputPath.split("/").pop().replace(/\W+/g, "")}.jpg`,
  );
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      inputPath,
      "-vf",
      `scale=${maxWidth}:-1`,
      "-q:v",
      "3",
      "-frames:v",
      "1",
      "-update",
      "1",
      tmp,
    ],
    { stdio: "pipe" },
  );
  const uri = `data:image/jpeg;base64,${readFileSync(tmp).toString("base64")}`;
  try {
    execFileSync("rm", ["-f", tmp]);
  } catch {
    /* ignore */
  }
  return uri;
}

let heroUri;
try {
  heroUri = webpToJpegDataUri(
    join(root, "public/images/clinic-room.webp"),
    1800,
  );
} catch {
  heroUri = `data:image/webp;base64,${readFileSync(
    join(root, "public/images/clinic-room.webp"),
  ).toString("base64")}`;
}

let austinUri;
try {
  austinUri = webpToJpegDataUri(
    join(root, "public/images/austin-nguyen.webp"),
    600,
  );
} catch {
  austinUri = null;
}

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
  <title>Nguyen's Osteopathic Clinic — A5 Leaflet</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --navy: #0b2c45;
      --navy-deep: #061828;
      --teal: #0f766e;
      --teal-soft: #14b8a6;
      --teal-mist: #99f6e4;
      --slate: #475569;
      --muted: #64748b;
      --line: #d7e3ea;
      --paper: #f3f7f8;
      --white: #ffffff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: #fff;
      color: var(--navy);
      font-family: "Source Sans 3", system-ui, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
    }
    @page { size: A5; margin: 0; }
    .page {
      width: 148mm;
      height: 210mm;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      page-break-after: always;
      break-after: page;
      background: var(--white);
    }
    .page:last-child { page-break-after: auto; break-after: auto; }

    /* ——— FRONT ——— */
    .hero {
      position: relative;
      height: 78mm;
      flex: 0 0 auto;
      overflow: hidden;
      color: #fff;
      background: var(--navy-deep);
    }
    .hero-photo {
      position: absolute;
      inset: 0;
      background: url("${heroUri}") center 40% / cover no-repeat;
      filter: saturate(0.9) contrast(1.05);
      transform: scale(1.03);
    }
    .hero-wash {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgba(6,24,40,0.35) 0%, rgba(6,24,40,0.15) 40%, rgba(6,24,40,0.92) 100%),
        linear-gradient(105deg, rgba(6,24,40,0.75) 0%, rgba(11,44,69,0.35) 55%, transparent 100%);
    }
    .hero-inner {
      position: relative;
      z-index: 2;
      height: 100%;
      padding: 5.5mm 7mm 5mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .hero-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 4mm;
    }
    .logo-badge {
      background: #fff;
      border-radius: 2mm;
      padding: 1.4mm 1.6mm;
      box-shadow: 0 1mm 2.5mm rgba(0,0,0,0.25);
    }
    .logo-badge img {
      display: block;
      height: 14mm;
      width: auto;
      max-width: 34mm;
      object-fit: contain;
    }
    .hero-phone {
      text-align: right;
    }
    .hero-phone strong {
      display: block;
      font-size: 10pt;
      font-weight: 700;
      letter-spacing: 0.01em;
    }
    .hero-phone span {
      display: block;
      margin-top: 0.8mm;
      font-size: 6pt;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.72);
      font-weight: 700;
    }
    .hero-brand {
      max-width: 34ch;
    }
    .eyebrow {
      font-size: 6.5pt;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-mist);
      margin-bottom: 1.5mm;
    }
    .hero-brand h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 18pt;
      line-height: 0.98;
      font-weight: 700;
      margin: 0;
      text-shadow: 0 0.5mm 2mm rgba(0,0,0,0.35);
    }

    .front-body {
      flex: 1 1 auto;
      padding: 5mm 7mm 0;
      display: flex;
      flex-direction: column;
      gap: 3.5mm;
      background:
        radial-gradient(ellipse 80% 50% at 100% 0%, rgba(20,184,166,0.08), transparent 55%),
        linear-gradient(180deg, #ffffff 0%, var(--paper) 100%);
    }
    .hook h2 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 14.5pt;
      line-height: 1.08;
      font-weight: 700;
      color: var(--navy);
      max-width: 18ch;
      margin-bottom: 1.8mm;
    }
    .hook p {
      font-size: 8pt;
      line-height: 1.35;
      color: var(--slate);
      max-width: 48ch;
    }

    .practitioner {
      display: grid;
      grid-template-columns: ${austinUri ? "16mm 1fr" : "1fr"};
      gap: 3mm;
      align-items: center;
      padding-bottom: 3mm;
      border-bottom: 0.25mm solid var(--line);
    }
    .practitioner img {
      width: 16mm;
      height: 16mm;
      border-radius: 50%;
      object-fit: cover;
      object-position: center top;
      border: 0.35mm solid rgba(15,118,110,0.35);
    }
    .practitioner h3 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 11pt;
      font-weight: 700;
      margin-bottom: 0.5mm;
    }
    .practitioner .role {
      font-size: 7pt;
      font-weight: 700;
      color: var(--teal);
      margin-bottom: 1mm;
    }
    .practitioner .note {
      font-size: 7pt;
      line-height: 1.3;
      color: var(--slate);
    }

    .front-split {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 3.5mm;
      align-items: stretch;
      flex: 1 1 auto;
    }
    .section-label {
      font-size: 6pt;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
      margin-bottom: 2mm;
    }
    .helps {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5mm 2.5mm;
    }
    .helps li {
      font-size: 7.5pt;
      font-weight: 600;
      line-height: 1.2;
      padding-left: 2.6mm;
      position: relative;
    }
    .helps li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 1.3mm;
      width: 1.2mm;
      height: 1.2mm;
      border-radius: 50%;
      background: var(--teal-soft);
    }

    .book {
      background: linear-gradient(160deg, var(--navy-deep) 0%, var(--navy) 55%, #0a3d4d 100%);
      color: #fff;
      border-radius: 2.5mm;
      padding: 3mm 2.5mm;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5mm;
    }
    .book .scan {
      font-size: 6pt;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal-mist);
    }
    .book img {
      width: 28mm;
      height: 28mm;
      background: #fff;
      border-radius: 1.8mm;
      padding: 1.4mm;
    }
    .book strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 11pt;
      font-weight: 700;
    }
    .book .url {
      font-size: 5.5pt;
      line-height: 1.25;
      opacity: 0.8;
      max-width: 22ch;
      word-break: break-all;
    }

    .front-foot {
      margin-top: auto;
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 3mm;
      padding: 3mm 0 4.5mm;
      border-top: 0.25mm solid var(--line);
    }
    .front-foot .label {
      font-size: 5.8pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
      margin-bottom: 0.8mm;
    }
    .front-foot p {
      font-size: 7pt;
      line-height: 1.3;
      font-weight: 600;
    }
    .front-foot strong { font-weight: 700; }

    /* ——— BACK ——— */
    .back-head {
      background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 55%, #0a3d4d 100%);
      color: #fff;
      padding: 6mm 7mm 5mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 4mm;
    }
    .back-brand {
      display: flex;
      align-items: center;
      gap: 2.5mm;
    }
    .back-brand .mark {
      width: 11mm;
      height: 11mm;
      background: #fff;
      border-radius: 1.6mm;
      padding: 1mm;
    }
    .back-brand .mark img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .back-brand .name {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 13pt;
      font-weight: 700;
      line-height: 1;
    }
    .back-brand .sub {
      margin-top: 1mm;
      font-size: 6.5pt;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.7);
      font-weight: 700;
    }
    .back-head h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 14pt;
      line-height: 1.05;
      font-weight: 700;
      text-align: right;
      max-width: 14ch;
    }

    .back-body {
      flex: 1 1 auto;
      padding: 4.5mm 7mm 0;
      display: flex;
      flex-direction: column;
      gap: 3.5mm;
      background: linear-gradient(180deg, #ffffff 0%, var(--paper) 100%);
    }

    .fees {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.2pt;
    }
    .fees th {
      text-align: left;
      font-size: 6pt;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--teal);
      font-weight: 700;
      padding: 0 0 1.5mm;
      border-bottom: 0.35mm solid var(--navy);
    }
    .fees th:last-child,
    .fees td:last-child { text-align: right; }
    .fees th:nth-child(2),
    .fees td:nth-child(2) { text-align: center; width: 18mm; }
    .fees td {
      padding: 1.6mm 0;
      border-bottom: 0.2mm solid var(--line);
      font-weight: 600;
      vertical-align: baseline;
    }
    .fees td:first-child { font-weight: 600; padding-right: 2mm; }
    .fees td:last-child {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 10pt;
      font-weight: 700;
      color: var(--navy);
    }
    .fee-note {
      font-size: 6.5pt;
      line-height: 1.35;
      color: var(--muted);
      margin-top: 1.5mm;
    }

    .back-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 3.5mm;
    }
    .steps {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2.2mm;
    }
    .steps li {
      display: grid;
      grid-template-columns: 6mm 1fr;
      gap: 2mm;
      align-items: start;
    }
    .steps .num {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 10pt;
      font-weight: 700;
      color: var(--teal);
      line-height: 1;
    }
    .steps strong {
      display: block;
      font-size: 7.5pt;
      margin-bottom: 0.4mm;
    }
    .steps span {
      display: block;
      font-size: 6.8pt;
      line-height: 1.3;
      color: var(--slate);
      font-weight: 500;
    }

    .visit-box {
      background: var(--navy);
      color: #fff;
      border-radius: 2.5mm;
      padding: 3mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 42mm;
    }
    .visit-box .section-label { color: var(--teal-mist); }
    .visit-box p {
      font-size: 7.2pt;
      line-height: 1.35;
      color: rgba(255,255,255,0.9);
    }
    .visit-box .addr {
      margin-top: 2.5mm;
      font-size: 7pt;
      font-weight: 700;
      line-height: 1.35;
    }
    .visit-box .hours {
      margin-top: 1.5mm;
      font-size: 7pt;
      color: var(--teal-mist);
      font-weight: 700;
    }

    .back-cta {
      margin-top: auto;
      margin-bottom: 4.5mm;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 3mm;
      align-items: center;
      background: linear-gradient(135deg, var(--navy-deep), #0a3d4d);
      color: #fff;
      border-radius: 2.5mm;
      padding: 3.5mm;
    }
    .back-cta h2 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 13pt;
      font-weight: 700;
      margin-bottom: 1mm;
    }
    .back-cta p {
      font-size: 7pt;
      line-height: 1.35;
      opacity: 0.9;
    }
    .back-cta .phone {
      margin-top: 1.8mm;
      font-size: 11pt;
      font-weight: 700;
      opacity: 1;
    }
    .back-cta img {
      width: 22mm;
      height: 22mm;
      background: #fff;
      border-radius: 1.6mm;
      padding: 1.2mm;
    }

    .tiny-foot {
      position: absolute;
      left: 7mm;
      right: 7mm;
      bottom: 3mm;
      display: flex;
      justify-content: space-between;
      gap: 2mm;
      font-size: 5.8pt;
      color: var(--muted);
      font-weight: 600;
    }
  </style>
</head>
<body>
  <!-- FRONT -->
  <section class="page">
    <div class="hero">
      <div class="hero-photo" aria-hidden="true"></div>
      <div class="hero-wash" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-top">
          <div class="logo-badge">
            <img src="${logoLockupDataUri}" alt="Nguyen's Osteopathic Clinic" width="1000" height="696" />
          </div>
          <div class="hero-phone">
            <strong>${PHONE}</strong>
            <span>Call or scan to book</span>
          </div>
        </div>
        <div class="hero-brand">
          <p class="eyebrow">Charlton · SE7</p>
          <h1>Nguyen's Osteopathic Clinic</h1>
        </div>
      </div>
    </div>

    <div class="front-body">
      <div class="hook">
        <h2>Back pain, joint strain &amp; stubborn tension — treated properly</h2>
        <p>
          Hands-on osteopathy for clear answers, private one-to-one care,
          and a plan that gets you moving again. No GP referral needed.
        </p>
      </div>

      <div class="practitioner">
        ${
          austinUri
            ? `<img src="${austinUri}" alt="Austin Duy Nguyen" width="400" height="400" />`
            : ""
        }
        <div>
          <h3>Austin Duy Nguyen</h3>
          <p class="role">GOsC-Registered Osteopath · Reg. No. 12332</p>
          <p class="note">
            Consultations in English or Vietnamese inside Village Pharmacy.
            10% NHS staff &amp; student discount with valid ID.
          </p>
        </div>
      </div>

      <div class="front-split">
        <div>
          <p class="section-label">Commonly help with</p>
          <ul class="helps">
            <li>Back &amp; neck pain</li>
            <li>Sciatica</li>
            <li>Shoulder, hip &amp; knee</li>
            <li>Sports injuries</li>
            <li>Desk &amp; posture strain</li>
            <li>Focused shockwave</li>
            <li>Pregnancy support</li>
            <li>Men’s health &amp; ED</li>
          </ul>
        </div>
        <aside class="book">
          <p class="scan">Scan to book</p>
          <img src="${qrDataUri}" alt="QR code to book online" width="1200" height="1200" />
          <strong>Book online</strong>
          <p class="url">${BOOK_URL.replace("https://", "")}</p>
        </aside>
      </div>

      <div class="front-foot">
        <div>
          <p class="label">Visit</p>
          <p><strong>Village Pharmacy</strong><br/>9 The Village, Charlton SE7 8UG</p>
        </div>
        <div>
          <p class="label">Open hours</p>
          <p><strong>Monday – Sunday</strong><br/>9:00am – 8:00pm</p>
        </div>
      </div>
    </div>
  </section>

  <!-- BACK -->
  <section class="page">
    <header class="back-head">
      <div class="back-brand">
        <div class="mark">
          <img src="${logoMarkDataUri}" alt="" width="512" height="512" />
        </div>
        <div>
          <p class="name">Nguyen's</p>
          <p class="sub">Treatments &amp; fees</p>
        </div>
      </div>
      <h1>Clear fees. Clear next steps.</h1>
    </header>

    <div class="back-body">
      <div>
        <p class="section-label">Fees</p>
        <table class="fees">
          <thead>
            <tr>
              <th>Service</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Initial consultation &amp; treatment</td><td>60 mins</td><td>£75</td></tr>
            <tr><td>Follow-up osteopathic treatment</td><td>30 mins</td><td>£60</td></tr>
            <tr><td>Focused shockwave (LI-ESWT)</td><td>30 mins</td><td>£90</td></tr>
            <tr><td>Men’s health / ED protocol</td><td>30 mins</td><td>£110</td></tr>
            <tr><td>Deep tissue massage</td><td>45 mins</td><td>£60</td></tr>
            <tr><td>Home visit — initial</td><td>60 mins</td><td>£120</td></tr>
            <tr><td>Home visit — follow-up</td><td>30 mins</td><td>£100</td></tr>
          </tbody>
        </table>
        <p class="fee-note">
          Acupuncture +£20 · Cupping +£15 as clinically useful add-ons.
          24 hours’ notice for cancellations. 10% NHS &amp; student discount with valid ID.
        </p>
      </div>

      <div class="back-grid">
        <div>
          <p class="section-label">Your first visit</p>
          <ol class="steps">
            <li>
              <span class="num">01</span>
              <div>
                <strong>Case history</strong>
                <span>Symptoms, work, sport, and what you want to get back to.</span>
              </div>
            </li>
            <li>
              <span class="num">02</span>
              <div>
                <strong>Examination</strong>
                <span>Movement and hands-on assessment to find the cause.</span>
              </div>
            </li>
            <li>
              <span class="num">03</span>
              <div>
                <strong>Treatment &amp; plan</strong>
                <span>Care starts when appropriate, with clear recovery advice.</span>
              </div>
            </li>
          </ol>
        </div>
        <aside class="visit-box">
          <div>
            <p class="section-label">Find us</p>
            <p>Ask at the pharmacy counter on arrival — we are inside, not a street shopfront.</p>
          </div>
          <div>
            <p class="addr">Village Pharmacy<br/>9 The Village<br/>Charlton SE7 8UG</p>
            <p class="hours">Mon–Sun · 9am–8pm</p>
          </div>
        </aside>
      </div>

      <div class="back-cta">
        <div>
          <h2>Ready when you are</h2>
          <p>Scan to book online, or call / WhatsApp now.<br/>${EMAIL}</p>
          <p class="phone">${PHONE}</p>
        </div>
        <img src="${qrDataUri}" alt="Book online QR" width="1200" height="1200" />
      </div>
    </div>

    <div class="tiny-foot">
      <span>GOsC Reg. No. 12332</span>
      <span>${SITE_URL.replace("https://", "")}</span>
      <span>© 2026 Nguyen’s Osteopathic Clinic</span>
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
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(800);

const pdfPath = join(outDir, "nguyens-osteopathy-leaflet.pdf");
await page.pdf({
  path: pdfPath,
  format: "A5",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  scale: 1,
});

const pages = page.locator(".page");
const pageCount = await pages.count();
for (let i = 0; i < pageCount; i += 1) {
  const name = i === 0 ? "leaflet-front.png" : "leaflet-back.png";
  const bufPath = join(artifactDir, name);
  await pages.nth(i).screenshot({
    path: bufPath,
    type: "png",
    scale: "device",
  });
  writeFileSync(join("/opt/cursor/artifacts", name), readFileSync(bufPath));
}

await browser.close();

writeFileSync(join(artifactDir, "nguyens-osteopathy-leaflet.pdf"), readFileSync(pdfPath));
writeFileSync(
  join("/opt/cursor/artifacts", "nguyens-osteopathy-leaflet.pdf"),
  readFileSync(pdfPath),
);

console.log("QR:", BOOK_URL);
console.log("PDF:", pdfPath, readFileSync(pdfPath).length);
console.log("Format: A5 (148×210mm)");
console.log("Artifacts:", artifactDir);
