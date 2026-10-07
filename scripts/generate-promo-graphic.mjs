#!/usr/bin/env node
/**
 * Rebuild clinic promotional graphic:
 * - Clean studio photo (no cluttered clinic props overlapping text)
 * - Non-overlapping layout: photo left, info panels right/bottom
 * - Updated details (.com, Thu–Fri hours, current treatments)
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "images");
const artifactDir = "/opt/cursor/artifacts/promo";
const require = createRequire(import.meta.url);
const sharp = require("sharp");

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });

const WIDTH = 1600;
const HEIGHT = 1200;

// Prepare high-res assets
const photoPath = join(outDir, "austin-nguyen.jpg");
const logoPath = join(outDir, "logo.jpg");

const photoPng = await sharp(photoPath)
  .resize(1100, 1100, { fit: "cover", position: "top" })
  .png()
  .toBuffer();

// Extract just the N + spine mark from the stacked logo artwork
const logoTrimmed = await sharp(logoPath).trim().png().toBuffer();
const logoMeta = await sharp(logoTrimmed).metadata();
const markH = Math.round((logoMeta.height ?? 800) * 0.42);
const logoMarkPath = join(outDir, "logo-mark.png");
await sharp(logoTrimmed)
  .extract({ left: 0, top: 0, width: logoMeta.width ?? 800, height: markH })
  .resize(400, 400, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toFile(logoMarkPath);
const logoPng = readFileSync(logoMarkPath);

const photoUri = `data:image/png;base64,${photoPng.toString("base64")}`;
const logoUri = `data:image/png;base64,${logoPng.toString("base64")}`;

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      overflow: hidden;
      font-family: "Source Sans 3", "Segoe UI", system-ui, sans-serif;
      color: #0b2c45;
      -webkit-font-smoothing: antialiased;
    }
    .frame {
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      position: relative;
      background:
        radial-gradient(ellipse 70% 60% at 15% 40%, rgba(13,148,136,0.14), transparent 55%),
        linear-gradient(135deg, #f1f5f9 0%, #ffffff 45%, #e8f4f2 100%);
      overflow: hidden;
    }
    .accent {
      position: absolute;
      right: -40px;
      top: -40px;
      width: 420px;
      height: 420px;
      opacity: 0.35;
      background:
        radial-gradient(circle at 30% 30%, rgba(13,148,136,0.35), transparent 55%),
        repeating-linear-gradient(
          115deg,
          transparent 0 18px,
          rgba(11,44,69,0.06) 18px 19px
        );
      clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 70%);
      pointer-events: none;
    }
    .photo-wrap {
      position: absolute;
      left: 56px;
      top: 186px;
      width: 680px;
      height: 790px;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 24px 60px rgba(11,44,69,0.18);
      background: #dbe4ee;
    }
    .photo-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 12%;
      display: block;
    }
    .brand {
      position: absolute;
      left: 56px;
      right: 56px;
      top: 28px;
      height: 132px;
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 0 8px 16px 0;
      border-bottom: 1px solid rgba(11,44,69,0.1);
    }
    .brand .mark {
      width: 96px;
      height: 96px;
      border-radius: 18px;
      background: #fff;
      box-shadow: 0 8px 24px rgba(11,44,69,0.1);
      display: grid;
      place-items: center;
      overflow: hidden;
      padding: 6px;
      flex-shrink: 0;
    }
    .brand .mark img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .brand .copy {
      flex: 1;
      min-width: 0;
    }
    .brand .copy h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 36px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1;
      margin: 0 0 6px;
    }
    .brand .copy .clinic {
      font-size: 14px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #0f766e;
      font-weight: 700;
      margin: 0 0 8px;
    }
    .brand .copy .cred {
      font-size: 16px;
      color: #475569;
      line-height: 1.35;
      margin: 0;
    }
    .brand .phone-chip {
      margin-left: auto;
      text-align: right;
      flex-shrink: 0;
    }
    .brand .phone-chip strong {
      display: block;
      font-size: 28px;
      color: #0b2c45;
      letter-spacing: 0.02em;
    }
    .brand .phone-chip span {
      display: block;
      margin-top: 4px;
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #0f766e;
      font-weight: 700;
    }
    .panel {
      position: absolute;
      right: 56px;
      top: 186px;
      width: 680px;
      background: #0b2c45;
      color: #fff;
      border-radius: 28px;
      padding: 32px 36px 30px;
      box-shadow: 0 24px 50px rgba(11,44,69,0.22);
    }
    .panel .title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 22px;
      color: #99f6e4;
      letter-spacing: 0.02em;
    }
    .panel .title .dot {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: #2dd4bf;
    }
    .panel ul {
      list-style: none;
      display: grid;
      gap: 16px;
    }
    .panel li {
      display: grid;
      grid-template-columns: 42px 1fr;
      gap: 14px;
      align-items: center;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.2;
    }
    .panel li .icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(45,212,191,0.15);
      color: #99f6e4;
      display: grid;
      place-items: center;
      font-size: 20px;
      font-weight: 700;
    }
    .meta {
      position: absolute;
      right: 56px;
      top: 628px;
      width: 680px;
      display: grid;
      gap: 12px;
    }
    .meta .card {
      background: rgba(255,255,255,0.92);
      border: 1px solid rgba(11,44,69,0.08);
      border-radius: 18px;
      padding: 18px 22px;
      box-shadow: 0 10px 28px rgba(11,44,69,0.08);
    }
    .meta .label {
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
      color: #0f766e;
      margin-bottom: 4px;
    }
    .meta p {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
      margin: 0;
    }
    .footer {
      position: absolute;
      left: 56px;
      right: 56px;
      bottom: 36px;
      height: 88px;
      background: #071e30;
      color: #fff;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      gap: 20px;
    }
    .footer .left {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.25;
    }
    .footer .left span {
      display: block;
      font-size: 15px;
      font-weight: 500;
      color: rgba(255,255,255,0.72);
      margin-top: 2px;
    }
    .footer .right {
      text-align: right;
      font-size: 20px;
      font-weight: 700;
      color: #99f6e4;
    }
    .footer .right span {
      display: block;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      margin-top: 2px;
    }
  </style>
</head>
<body>
  <div class="frame">
    <div class="accent" aria-hidden="true"></div>

    <div class="brand">
      <div class="mark"><img src="${logoUri}" alt="" /></div>
      <div class="copy">
        <h1>Nguyen's</h1>
        <p class="clinic">Osteopathic Clinic</p>
        <p class="cred">Austin Duy Nguyen · GOsC-Registered Osteopath · Reg. No. 12332</p>
      </div>
      <div class="phone-chip">
        <strong>07882 843513</strong>
        <span>Call or book online</span>
      </div>
    </div>

    <div class="photo-wrap">
      <img src="${photoUri}" alt="Austin Duy Nguyen" />
    </div>

    <aside class="panel">
      <p class="title"><span class="dot"></span> Treating</p>
      <ul>
        <li><span class="icon">01</span> Back &amp; Neck Pain</li>
        <li><span class="icon">02</span> Focused Shockwave</li>
        <li><span class="icon">03</span> Men’s Health &amp; ED</li>
        <li><span class="icon">04</span> Deep Tissue Massage</li>
        <li><span class="icon">05</span> Sports Injury &amp; Rehab</li>
      </ul>
    </aside>

    <div class="meta">
      <div class="card">
        <p class="label">Hours</p>
        <p>Thursday – Friday · 9:00am – 6:00pm</p>
      </div>
      <div class="card">
        <p class="label">Visit</p>
        <p>St James Pharmacy · Woolwich SE18 6LQ</p>
      </div>
      <div class="card">
        <p class="label">Book</p>
        <p>www.nguyensosteopathy.com/book</p>
      </div>
    </div>

    <footer class="footer">
      <div class="left">
        Mr Austin Duy Nguyen · GOsC Osteopath
        <span>Private, drug-free care · No GP referral needed</span>
      </div>
      <div class="right">
        07882 843513
        <span>www.nguyensosteopathy.com</span>
      </div>
    </footer>
  </div>
</body>
</html>`;

const htmlPath = join(artifactDir, "promo.html");
writeFileSync(htmlPath, html);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = require("/tmp/node_modules/playwright"));
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
});
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);

const outJpg = join(outDir, "clinic-promo.jpg");
const shotPath = join(artifactDir, "clinic-promo.png");
await page.locator(".frame").screenshot({ path: shotPath, type: "png" });
await browser.close();

await sharp(shotPath)
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outJpg);

// Also write a web-optimized copy for artifacts
await sharp(outJpg).resize(1200).jpeg({ quality: 88 }).toFile(join(artifactDir, "clinic-promo-preview.jpg"));

console.log("Wrote", outJpg);
console.log("Preview", join(artifactDir, "clinic-promo-preview.jpg"));
