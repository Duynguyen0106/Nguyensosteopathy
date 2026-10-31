#!/usr/bin/env node
/**
 * LinkedIn profile cover / banner — 1584×396 (official recommended size).
 * Leaves a left safe margin so the circular profile photo does not cover key copy.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "linkedin");
const artifactDir = "/opt/cursor/artifacts/linkedin";

const W = 1584;
const H = 396;

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });

const require = createRequire(import.meta.url);

const logoUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-lockup.png"),
).toString("base64")}`;

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>LinkedIn cover — Nguyen's Osteopathic Clinic</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${W}px;
      height: ${H}px;
      overflow: hidden;
      font-family: "Source Sans 3", system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .frame {
      width: ${W}px;
      height: ${H}px;
      position: relative;
      color: #fff;
      background:
        radial-gradient(ellipse 55% 120% at 92% 50%, rgba(45,212,191,0.22), transparent 60%),
        radial-gradient(ellipse 40% 100% at 0% 100%, rgba(13,148,136,0.14), transparent 55%),
        linear-gradient(105deg, #061828 0%, #0b2c45 52%, #0a3a4a 100%);
      display: flex;
      align-items: center;
      /* Left inset ~380px: LinkedIn profile photo overlap zone on desktop */
      padding: 36px 56px 36px 380px;
      gap: 40px;
    }
    .logo {
      flex-shrink: 0;
      background: #fff;
      border-radius: 16px;
      padding: 12px 14px;
      box-shadow: 0 10px 28px rgba(0,0,0,0.28);
    }
    .logo img {
      display: block;
      height: 148px;
      width: auto;
      max-width: 220px;
      object-fit: contain;
    }
    .copy {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
    }
    .eyebrow {
      font-size: 15px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 700;
      color: #2dd4bf;
    }
    h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 48px;
      line-height: 1.02;
      font-weight: 700;
      max-width: 18ch;
    }
    .role {
      margin-top: 2px;
      font-size: 20px;
      font-weight: 600;
      color: rgba(255,255,255,0.92);
    }
    .tagline {
      margin-top: 4px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(255,255,255,0.78);
      font-style: italic;
    }
    .meta {
      margin-top: 14px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px 14px;
      align-items: center;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(45,212,191,0.35);
      border-radius: 999px;
      padding: 8px 14px;
      font-size: 15px;
      font-weight: 600;
      color: rgba(255,255,255,0.92);
    }
    .chip.accent {
      background: #2dd4bf;
      border-color: #2dd4bf;
      color: #061828;
    }
    .right {
      flex-shrink: 0;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      text-align: right;
      padding: 8px 0;
      min-width: 260px;
    }
    .web {
      font-size: 18px;
      font-weight: 700;
      color: #2dd4bf;
      letter-spacing: 0.02em;
    }
    .phone {
      font-size: 22px;
      font-weight: 700;
    }
    .loc {
      margin-top: 6px;
      font-size: 14px;
      line-height: 1.35;
      color: rgba(255,255,255,0.72);
      font-weight: 500;
      max-width: 28ch;
    }
  </style>
</head>
<body>
  <div class="frame">
    <div class="logo">
      <img src="${logoUri}" alt="Nguyen's Osteopathic Clinic" width="1250" height="870" />
    </div>

    <div class="copy">
      <p class="eyebrow">Woolwich · SE London</p>
      <h1>Nguyen's Osteopathic Clinic</h1>
      <p class="role">Austin Duy Nguyen · GOsC-Registered Osteopath · Reg. 12332</p>
      <p class="tagline">Recover, Realign, and Restore Your Vitality</p>
      <div class="meta">
        <span class="chip accent">Now booking</span>
        <span class="chip">English &amp; Vietnamese</span>
        <span class="chip">No GP referral needed</span>
      </div>
    </div>

    <div class="right">
      <p class="web">www.nguyensosteopathy.com</p>
      <div>
        <p class="phone">07882 843513</p>
        <p class="loc">Inside St James Pharmacy<br/>52 Powis Street, Woolwich SE18 6LQ</p>
      </div>
    </div>
  </div>
</body>
</html>`;

const htmlPath = join(outDir, "profile-cover.html");
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
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: 2,
});
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(500);

const pngPath = join(outDir, "linkedin-profile-cover.png");
const jpgPath = join(outDir, "linkedin-profile-cover.jpg");

await page.locator(".frame").screenshot({ path: pngPath, type: "png" });

// LinkedIn prefers JPG under ~8MB; export a high-quality JPEG too
const { execFileSync } = await import("node:child_process");
try {
  execFileSync(
    "convert",
    [pngPath, "-quality", "92", "-background", "white", "-alpha", "remove", jpgPath],
    { stdio: "inherit" },
  );
} catch {
  // fallback: keep PNG only
}

await browser.close();

for (const file of [pngPath, jpgPath]) {
  try {
    const buf = readFileSync(file);
    writeFileSync(join(artifactDir, file.split("/").pop()), buf);
    writeFileSync(join("/opt/cursor/artifacts", file.split("/").pop()), buf);
  } catch {
    /* jpg optional */
  }
}

console.log("PNG:", pngPath, readFileSync(pngPath).length);
try {
  console.log("JPG:", jpgPath, readFileSync(jpgPath).length);
} catch {
  console.log("JPG: skipped");
}
