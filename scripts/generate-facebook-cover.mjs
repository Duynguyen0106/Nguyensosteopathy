#!/usr/bin/env node
/**
 * Facebook Page cover / banner — 1640×624 (2× of Facebook’s 820×312 display size).
 * Left ~300px kept quieter for the circular profile photo overlap.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "facebook");
const artifactDir = "/opt/cursor/artifacts/facebook";

const W = 1640;
const H = 624;

mkdirSync(outDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });
mkdirSync("/opt/cursor/artifacts", { recursive: true });

const require = createRequire(import.meta.url);

const logoUri = `data:image/png;base64,${readFileSync(
  join(root, "public/images/logo-lockup.png"),
).toString("base64")}`;

// Prefer JPEG/PNG for Playwright file embedding; convert WebP via ImageMagick if needed.
let heroUri;
try {
  const jpgBuf = execFileSync(
    "convert",
    [
      join(root, "public/images/clinic-room.webp"),
      "-resize",
      "2000x>",
      "-quality",
      "88",
      "jpg:-",
    ],
    { maxBuffer: 20 * 1024 * 1024 },
  );
  heroUri = `data:image/jpeg;base64,${jpgBuf.toString("base64")}`;
} catch {
  heroUri = `data:image/webp;base64,${readFileSync(
    join(root, "public/images/clinic-room.webp"),
  ).toString("base64")}`;
}

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>Facebook cover — Nguyen's Osteopathic Clinic</title>
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
      overflow: hidden;
      background: #061828;
    }
    .hero {
      position: absolute;
      inset: 0;
      background:
        url("${heroUri}") center 42% / cover no-repeat;
      transform: scale(1.04);
      filter: saturate(0.92) contrast(1.05);
    }
    .wash {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(105deg,
          rgba(6,24,40,0.94) 0%,
          rgba(11,44,69,0.88) 38%,
          rgba(10,58,74,0.55) 62%,
          rgba(6,24,40,0.35) 100%),
        linear-gradient(180deg,
          rgba(6,24,40,0.25) 0%,
          transparent 35%,
          rgba(6,24,40,0.55) 100%);
    }
    .grain {
      position: absolute;
      inset: 0;
      opacity: 0.07;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      pointer-events: none;
    }
    .content {
      position: relative;
      z-index: 2;
      height: 100%;
      /* Leave left clear for Facebook profile photo overlap */
      padding: 48px 64px 44px 340px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
    }
    .logo {
      position: absolute;
      top: 36px;
      right: 56px;
      z-index: 3;
      background: #fff;
      border-radius: 14px;
      padding: 10px 12px;
      box-shadow: 0 10px 28px rgba(0,0,0,0.28);
    }
    .logo img {
      display: block;
      height: 72px;
      width: auto;
      max-width: 180px;
      object-fit: contain;
    }
    .eyebrow {
      font-size: 15px;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      font-weight: 700;
      color: #2dd4bf;
    }
    h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 64px;
      line-height: 0.98;
      font-weight: 700;
      max-width: 14ch;
      text-shadow: 0 2px 24px rgba(0,0,0,0.35);
    }
    .support {
      margin-top: 4px;
      max-width: 38ch;
      font-size: 22px;
      line-height: 1.35;
      font-weight: 500;
      color: rgba(255,255,255,0.9);
    }
    .cta-row {
      margin-top: 18px;
      display: flex;
      align-items: center;
      gap: 22px;
      flex-wrap: wrap;
    }
    .cta {
      display: inline-flex;
      align-items: center;
      background: #2dd4bf;
      color: #061828;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 14px 26px;
      border-radius: 4px;
    }
    .hours {
      font-size: 17px;
      font-weight: 600;
      color: rgba(255,255,255,0.86);
    }
    .footer {
      position: absolute;
      left: 340px;
      right: 64px;
      bottom: 28px;
      z-index: 3;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
      font-size: 15px;
      font-weight: 600;
      color: rgba(255,255,255,0.72);
    }
    .footer strong {
      color: #99f6e4;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="frame">
    <div class="hero" aria-hidden="true"></div>
    <div class="wash" aria-hidden="true"></div>
    <div class="grain" aria-hidden="true"></div>

    <div class="logo">
      <img src="${logoUri}" alt="Nguyen's Osteopathic Clinic" width="1250" height="870" />
    </div>

    <div class="content">
      <p class="eyebrow">Charlton · SE7</p>
      <h1>Nguyen's Osteopathic Clinic</h1>
      <p class="support">
        Drug-free osteopathy with Austin Duy Nguyen, GOsC-registered —
        private care inside Village Pharmacy.
      </p>
      <div class="cta-row">
        <span class="cta">Book online</span>
        <span class="hours">Open Mon–Sun · 9am–8pm</span>
      </div>
    </div>

    <div class="footer">
      <p>9 The Village, Charlton SE7 8UG · No GP referral needed</p>
      <p><strong>www.nguyensosteopathy.com</strong></p>
    </div>
  </div>
</body>
</html>`;

const htmlPath = join(outDir, "page-cover.html");
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
  deviceScaleFactor: 1,
});
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(600);

const pngPath = join(outDir, "facebook-page-cover.png");
const jpgPath = join(outDir, "facebook-page-cover.jpg");

await page.locator(".frame").screenshot({ path: pngPath, type: "png" });

await page.locator(".frame").screenshot({
  path: jpgPath,
  type: "jpeg",
  quality: 92,
});

await browser.close();

for (const file of [pngPath, jpgPath, htmlPath]) {
  try {
    const name = file.split("/").pop();
    const buf = readFileSync(file);
    writeFileSync(join(artifactDir, name), buf);
    writeFileSync(join("/opt/cursor/artifacts", name), buf);
  } catch {
    /* optional */
  }
}

console.log("HTML:", htmlPath);
console.log("PNG:", pngPath, readFileSync(pngPath).length);
try {
  console.log("JPG:", jpgPath, readFileSync(jpgPath).length);
} catch {
  console.log("JPG: skipped");
}
