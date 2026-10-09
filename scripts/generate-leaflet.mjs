#!/usr/bin/env node
/**
 * Generate Nguyen's Osteopathic Clinic A5 print leaflet (PDF)
 * with a QR code pointing at the live booking page.
 *
 * Print target: A5 (148×210mm) — UK letterbox / door-drop friendly.
 * ~300dpi raster assets, vector text via Chromium PDF.
 *
 * Layout:
 * front = brand + problem/benefit hook + practitioner trust + conditions + book CTA
 * back  = fees + first visit + testimonials + contact
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
const PHONE = "07882 843513";
const PHONE_RAW = "07882843513";

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });

const require = createRequire(import.meta.url);

const logoLockupPath = join(root, "public/images/logo-lockup.png");
const logoMarkPath = join(root, "public/images/logo-mark.png");
const logoLockupDataUri = `data:image/png;base64,${readFileSync(logoLockupPath).toString("base64")}`;
const logoDataUri = `data:image/png;base64,${readFileSync(logoMarkPath).toString("base64")}`;

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
      --navy-deep: #071e30;
      --teal: #0f766e;
      --teal-soft: #0d9488;
      --slate: #475569;
      --muted: #64748b;
      --line: #dbe4ee;
      --paper: #f4f7f8;
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
      background:
        linear-gradient(180deg, #eef5f4 0%, #ffffff 38%, #f7fafb 100%);
    }
    .front-body, .back-body { flex: 1 1 auto; }
    .page-foot { flex: 0 0 auto; }
    .page:last-child { page-break-after: auto; break-after: auto; }

    /* —— FRONT —— */
    .masthead {
      background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 55%, #0a3d4d 100%);
      color: #fff;
      padding: 6mm 8mm 5.5mm;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 4mm;
      align-items: end;
    }
    .brand-lockup {
      display: flex;
      align-items: center;
      gap: 3mm;
    }
    .brand-lockup .logo-lockup {
      height: 18mm;
      width: auto;
      max-width: 42mm;
      background: #fff;
      border-radius: 2mm;
      padding: 1.4mm 1.8mm;
      object-fit: contain;
      display: block;
      box-shadow: 0 0.8mm 2mm rgba(0,0,0,0.18);
    }
    .mast-cta { text-align: right; }
    .mast-cta .phone {
      font-size: 11pt;
      font-weight: 700;
      letter-spacing: 0.02em;
      margin: 0;
    }
    .mast-cta .hint {
      margin: 0.8mm 0 0;
      font-size: 6.5pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.72);
    }

    .front-body { padding: 4.5mm 8mm 0; }
    .back-body { padding: 3.5mm 8mm 0; }

    .eyebrow {
      margin: 0 0 1.2mm;
      font-size: 6.5pt;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
    }
    h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 17pt;
      line-height: 1.05;
      margin: 0 0 1.8mm;
      font-weight: 700;
      color: var(--navy);
      max-width: 20ch;
    }
    .lede {
      margin: 0 0 3mm;
      font-size: 8pt;
      line-height: 1.35;
      color: var(--slate);
      max-width: 52ch;
    }

    .trust-row {
      margin-bottom: 3mm;
      padding: 2.5mm 3mm;
      border: 0.25mm solid var(--line);
      border-radius: 2mm;
      background: rgba(255,255,255,0.72);
    }
    .trust-copy h2 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 11pt;
      margin: 0 0 0.6mm;
      font-weight: 700;
    }
    .trust-copy .role {
      margin: 0 0 1.2mm;
      font-size: 7.5pt;
      color: var(--teal);
      font-weight: 700;
    }
    .trust-copy p {
      margin: 0;
      font-size: 7.5pt;
      line-height: 1.35;
      color: var(--slate);
    }

    .split {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 3.5mm;
      align-items: stretch;
    }
    .section-label {
      margin: 0 0 2mm;
      font-size: 6.5pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
    }
    .conditions {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.4mm 2.5mm;
    }
    .conditions li {
      font-size: 7.5pt;
      font-weight: 600;
      line-height: 1.2;
      padding-left: 2.8mm;
      position: relative;
    }
    .conditions li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 1.2mm;
      width: 1.3mm;
      height: 1.3mm;
      border-radius: 999px;
      background: var(--teal-soft);
    }

    .book-block {
      background: var(--navy);
      color: #fff;
      border-radius: 2.5mm;
      padding: 3mm 2.5mm;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.4mm;
    }
    .book-block img {
      width: 26mm;
      height: 26mm;
      background: #fff;
      border-radius: 1.8mm;
      padding: 1.4mm;
    }
    .book-block .scan {
      margin: 0;
      font-size: 6pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 700;
      color: #99f6e4;
    }
    .book-block strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 10pt;
      font-weight: 700;
    }
    .book-block .url {
      margin: 0;
      font-size: 5.5pt;
      line-height: 1.25;
      opacity: 0.82;
      word-break: break-all;
      max-width: 22ch;
    }

    .front-meta {
      margin-top: 3mm;
      display: grid;
      grid-template-columns: 1.25fr 1fr 1fr;
      gap: 2.5mm;
      padding-top: 2.5mm;
      border-top: 0.25mm solid var(--line);
    }
    .meta-item .label {
      margin: 0 0 0.8mm;
      font-size: 6pt;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--teal);
    }
    .meta-item p {
      margin: 0;
      font-size: 7pt;
      line-height: 1.3;
    }
    .notice {
      margin-top: 2.5mm;
      margin-bottom: 0;
      font-size: 7pt;
      line-height: 1.3;
      color: var(--slate);
      padding: 1.8mm 2.2mm;
      background: rgba(15,118,110,0.07);
      border-left: 0.8mm solid var(--teal);
    }
    .notice strong { color: var(--navy); }

    .page-foot {
      position: static;
      margin: 2mm 8mm 4.5mm;
      display: flex;
      justify-content: space-between;
      gap: 2mm;
      font-size: 6pt;
      color: var(--muted);
      border-top: 0.2mm solid var(--line);
      padding-top: 1.5mm;
    }

    /* —— BACK —— */
    .back-head {
      padding: 6mm 8mm 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 3mm;
    }
    .back-head .brand-mini {
      display: flex;
      align-items: center;
      gap: 2mm;
    }
    .back-head .logo-badge {
      width: 10mm;
      height: 10mm;
      border-radius: 1.8mm;
      background: #fff;
      border: 0.2mm solid var(--line);
      display: grid;
      place-items: center;
      padding: 0.8mm;
      flex-shrink: 0;
    }
    .back-head .logo-badge img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .brand-name {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 12pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      margin: 0;
      line-height: 1;
    }
    .brand-sub {
      margin: 0.8mm 0 0;
      font-size: 6pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--teal);
      font-weight: 700;
    }
    .back-head .brand-name { font-size: 11pt; color: var(--navy); }
    .back-title { text-align: right; }
    .back-title h1 {
      font-size: 14pt;
      max-width: none;
      margin: 0;
      text-align: right;
    }
    .back-title p {
      margin: 0.8mm 0 0;
      font-size: 7pt;
      color: var(--slate);
    }

    .fees {
      width: 100%;
      border-collapse: collapse;
      font-size: 7pt;
      margin-bottom: 2.5mm;
    }
    .fees th, .fees td {
      text-align: left;
      padding: 1.4mm 1.2mm;
      border-bottom: 0.2mm solid var(--line);
      vertical-align: top;
    }
    .fees th {
      background: var(--navy);
      color: #fff;
      font-size: 6pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
    }
    .fees th:first-child { padding-left: 2.2mm; }
    .fees th:last-child { text-align: right; padding-right: 2.2mm; }
    .fees td:first-child { padding-left: 2.2mm; font-weight: 700; }
    .fees td:nth-child(2) { color: var(--slate); white-space: nowrap; }
    .fees td:last-child {
      text-align: right;
      font-weight: 700;
      color: var(--teal);
      padding-right: 2.2mm;
      white-space: nowrap;
    }
    .fees tr:nth-child(even) td { background: rgba(15,118,110,0.04); }
    .fee-note {
      margin: -1mm 0 3mm;
      font-size: 6pt;
      color: var(--muted);
      line-height: 1.3;
    }

    .back-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 3.5mm;
      margin-bottom: 3mm;
    }
    .steps {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 2mm;
    }
    .steps li {
      display: grid;
      grid-template-columns: 5mm 1fr;
      gap: 1.5mm;
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
      font-size: 6.5pt;
      line-height: 1.3;
      color: var(--slate);
    }

    .quote {
      margin: 0 0 2mm;
      padding: 0 0 0 2mm;
      border-left: 0.7mm solid var(--teal-soft);
    }
    .quote p {
      margin: 0 0 0.8mm;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 8pt;
      line-height: 1.25;
      font-weight: 600;
    }
    .quote cite {
      font-style: normal;
      font-size: 6pt;
      color: var(--muted);
      font-weight: 700;
      letter-spacing: 0.03em;
    }

    .specialist {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5mm;
      margin-bottom: 3mm;
    }
    .specialist article {
      background: var(--paper);
      padding: 2.5mm;
      border-radius: 1.8mm;
    }
    .specialist h3 {
      margin: 0 0 0.8mm;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 9pt;
    }
    .specialist p {
      margin: 0;
      font-size: 6.5pt;
      line-height: 1.3;
      color: var(--slate);
    }

    .back-cta {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 3mm;
      align-items: center;
      background: var(--navy);
      color: #fff;
      border-radius: 2.5mm;
      padding: 3mm 3.5mm;
    }
    .back-cta h2 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 12pt;
      margin: 0 0 0.8mm;
    }
    .back-cta p {
      margin: 0;
      font-size: 7pt;
      line-height: 1.3;
      opacity: 0.9;
    }
    .back-cta .phone {
      font-size: 11pt;
      font-weight: 700;
      margin-top: 1.5mm;
    }
    .back-cta img {
      width: 20mm;
      height: 20mm;
      background: #fff;
      border-radius: 1.5mm;
      padding: 1mm;
    }
  </style>
</head>
<body>
  <!-- FRONT -->
  <section class="page">
    <header class="masthead">
      <div class="brand-lockup">
        <img
          class="logo-lockup"
          src="${logoLockupDataUri}"
          alt="Nguyen's Osteopathic Clinic — Recover, Realign, and Restore Your Vitality"
          width="1000"
          height="696"
        />
      </div>
      <div class="mast-cta">
        <p class="phone">${PHONE}</p>
        <p class="hint">Call or scan to book</p>
      </div>
    </header>

    <div class="front-body">
      <p class="eyebrow">Woolwich · Drug-free care</p>
      <h1>Back pain, joint strain &amp; stubborn tension — treated properly</h1>
      <p class="lede">
        Hands-on osteopathy and specialist therapies for clear answers,
        private one-to-one care, and a plan that gets you moving again.
      </p>

      <div class="trust-row">
        <div class="trust-copy">
          <h2>Austin Duy Nguyen</h2>
          <p class="role">GOsC-Registered Osteopath · Reg. No. 12332</p>
          <p>
            Private consultations inside St James Pharmacy &amp; Travel Clinic.
            No GP referral needed. 10% NHS staff &amp; student discount with valid ID.
          </p>
        </div>
      </div>

      <div class="split">
        <div>
          <p class="section-label">Conditions we commonly help</p>
          <ul class="conditions">
            <li>Back &amp; neck pain</li>
            <li>Headaches &amp; jaw</li>
            <li>Shoulder, hip &amp; knee</li>
            <li>Sports &amp; overuse</li>
            <li>Desk &amp; posture strain</li>
            <li>Pregnancy discomfort</li>
            <li>Focused shockwave</li>
            <li>Men’s health &amp; ED</li>
          </ul>
        </div>
        <aside class="book-block">
          <p class="scan">Scan to book</p>
          <img src="${qrDataUri}" alt="QR code to book online" width="1200" height="1200" />
          <strong>Book online</strong>
          <p class="url">${BOOK_URL}</p>
        </aside>
      </div>

      <div class="front-meta">
        <div class="meta-item">
          <p class="label">Visit</p>
          <p><strong>St James Pharmacy</strong><br/>52 Powis Street<br/>Woolwich SE18 6LQ</p>
        </div>
        <div class="meta-item">
          <p class="label">Hours</p>
          <p><strong>Mon – Fri</strong> 9:00am – 6:00pm<br/><strong>Sat</strong> 9:00am – 5:30pm</p>
        </div>
        <div class="meta-item">
          <p class="label">Contact</p>
          <p><strong>${PHONE_RAW}</strong><br/>nguyensosteopathy@gmail.com</p>
        </div>
      </div>

      <p class="notice">
        <strong>Scan to book online</strong> or call ${PHONE_RAW}.
        Private consultations inside St James Pharmacy — no GP referral needed.
      </p>
    </div>

    <div class="page-foot">
      <span>GOsC Reg. No. 12332</span>
      <span>Facebook: Nguyen’s Osteopathy</span>
      <span>${SITE_URL.replace("https://", "")}</span>
    </div>
  </section>

  <!-- BACK -->
  <section class="page">
    <header class="back-head">
      <div class="brand-mini">
        <div class="logo-badge">
          <img src="${logoDataUri}" alt="" width="512" height="512" />
        </div>
        <div>
          <p class="brand-name">Nguyen's</p>
          <p class="brand-sub">Treatments &amp; fees</p>
        </div>
      </div>
      <div class="back-title">
        <h1>Clear fees. Clear next steps.</h1>
        <p>Transparent pricing · book online in minutes</p>
      </div>
    </header>

    <div class="back-body">
      <p class="section-label">Fees</p>
      <table class="fees">
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
      <p class="fee-note">Add-on prices (+£) are extras to a treatment session. 24 hours’ notice for cancellations. 10% NHS staff &amp; student discount with valid ID.</p>

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
        <div>
          <p class="section-label">Patients say</p>
          <blockquote class="quote">
            <p>“Austin found the cause quickly and I was moving freely again within a few sessions.”</p>
            <cite>Sarah M. · Back pain</cite>
          </blockquote>
          <blockquote class="quote">
            <p>“Shockwave for my stubborn heel pain made a real difference when other approaches had stalled.”</p>
            <cite>James T. · Shockwave</cite>
          </blockquote>
        </div>
      </div>

      <div class="specialist">
        <article>
          <h3>Focused shockwave</h3>
          <p>Low-intensity focused shockwave for stubborn tendon and soft-tissue problems.</p>
        </article>
        <article>
          <h3>Men’s health &amp; ED</h3>
          <p>Discreet LI-ESWT in a private setting — drug-free, non-invasive care.</p>
        </article>
      </div>

      <div class="back-cta">
        <div>
          <h2>Ready when you are</h2>
          <p>Scan to book online, or call now.<br/>Inside St James Pharmacy, Woolwich.</p>
          <p class="phone">${PHONE}</p>
        </div>
        <img src="${qrDataUri}" alt="Book online QR" width="1200" height="1200" />
      </div>
    </div>

    <div class="page-foot">
      <span>© 2026 Nguyen’s Osteopathic Clinic</span>
      <span>${SITE_URL.replace("https://", "")}</span>
      <span>Facebook: Nguyen’s Osteopathy</span>
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
// A5 @ ~150dpi preview viewport (148mm ≈ 874px, 210mm ≈ 1240px at 150dpi)
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
  await pages.nth(i).screenshot({
    path: join(artifactDir, name),
    type: "png",
    scale: "device",
  });
}

await browser.close();

writeFileSync(join(artifactDir, "nguyens-osteopathy-leaflet.pdf"), readFileSync(pdfPath));
writeFileSync(
  join("/opt/cursor/artifacts", "leaflet-front.png"),
  readFileSync(join(artifactDir, "leaflet-front.png")),
);
writeFileSync(
  join("/opt/cursor/artifacts", "leaflet-back.png"),
  readFileSync(join(artifactDir, "leaflet-back.png")),
);

console.log("QR:", BOOK_URL);
console.log("PDF:", pdfPath);
console.log("PDF bytes:", readFileSync(pdfPath).length);
console.log("Format: A5 (148×210mm) — letterbox / door-drop");
console.log("Artifacts:", artifactDir);
