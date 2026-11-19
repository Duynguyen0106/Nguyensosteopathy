#!/usr/bin/env node
/**
 * Render Nguyen's Osteopathic Clinic logo intro video.
 *
 * Timeline lives in scripts/clinic-intro/intro.html (JS seek API).
 * Captures frames with Playwright, encodes H.264 with ffmpeg.
 *
 * Usage:
 *   npm run intro
 *   INTRO_WIDTH=3840 INTRO_HEIGHT=2160 npm run intro   # native 4K frames
 */
import { mkdirSync, rmSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const htmlPath = join(__dirname, "clinic-intro", "intro.html");
const framesDir = join("/tmp", "clinic-intro-frames");
const artifactDir = "/opt/cursor/artifacts/clinic-intro";
const publicVideoDir = join(root, "public", "video");

const WIDTH = Number(process.env.INTRO_WIDTH || 1920);
const HEIGHT = Number(process.env.INTRO_HEIGHT || 1080);
const FPS = Number(process.env.INTRO_FPS || 30);
const DURATION = 11;
const TOTAL_FRAMES = Math.round(DURATION * FPS);

mkdirSync(artifactDir, { recursive: true });
mkdirSync(publicVideoDir, { recursive: true });
rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });

function runFfmpeg(args) {
  const res = spawnSync("ffmpeg", ["-y", ...args], {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
  if (res.status !== 0) {
    console.error(res.stderr || res.stdout);
    throw new Error(`ffmpeg failed (${res.status})`);
  }
}

console.log(
  `Rendering intro ${WIDTH}x${HEIGHT} @ ${FPS}fps, ${TOTAL_FRAMES} frames…`,
);

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/local/bin/google-chrome",
  headless: true,
  args: [
    "--font-render-hinting=none",
    "--disable-lcd-text",
    "--hide-scrollbars",
  ],
});

const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.documentElement.dataset.ready === "1", {
  timeout: 30_000,
});
await page.evaluate(async () => {
  if (window.__INTRO__?.ready) await window.__INTRO__.ready;
});

const previewTimes = [0.2, 1.5, 3.8, 5.2, 6.8, 8.5, 10.5];
const previewPaths = [];

for (let i = 0; i < TOTAL_FRAMES; i++) {
  const t = i / FPS;
  await page.evaluate((time) => window.__INTRO__.seek(time), t);
  // Let layout/paint settle
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const framePath = join(framesDir, `frame_${String(i).padStart(4, "0")}.jpg`);
  await page.screenshot({
    path: framePath,
    type: "jpeg",
    quality: 92,
  });

  for (const pt of previewTimes) {
    if (Math.abs(t - pt) < 0.5 / FPS) {
      const still = join(artifactDir, `preview-${String(pt).replace(".", "_")}s.png`);
      await page.screenshot({ path: still, type: "png" });
      previewPaths.push(still);
    }
  }

  if (i % 30 === 0 || i === TOTAL_FRAMES - 1) {
    console.log(`  frame ${i + 1}/${TOTAL_FRAMES} (t=${t.toFixed(2)}s)`);
  }
}

await browser.close();

const masterMp4 = join(artifactDir, `clinic-intro-${WIDTH}x${HEIGHT}.mp4`);
const public1080 = join(publicVideoDir, "clinic-intro.mp4");
const artifact4k = join(artifactDir, "clinic-intro-4k.mp4");
const artifact1080 = join(artifactDir, "clinic-intro-1080.mp4");

console.log("Encoding H.264…");
runFfmpeg([
  "-framerate",
  String(FPS),
  "-i",
  join(framesDir, "frame_%04d.jpg"),
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "18",
  "-preset",
  "medium",
  "-movflags",
  "+faststart",
  masterMp4,
]);

// Always publish a 1080p web file
if (WIDTH === 1920 && HEIGHT === 1080) {
  copyFileSync(masterMp4, public1080);
  copyFileSync(masterMp4, artifact1080);
} else {
  runFfmpeg([
    "-i",
    masterMp4,
    "-vf",
    "scale=1920:1080:flags=lanczos",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "18",
    "-movflags",
    "+faststart",
    public1080,
  ]);
  copyFileSync(public1080, artifact1080);
}

// 4K artifact: native if already 4K, else lanczos upscale for delivery master
if (WIDTH >= 3840 && HEIGHT >= 2160) {
  copyFileSync(masterMp4, artifact4k);
} else {
  console.log("Building 4K delivery master (lanczos upscale)…");
  runFfmpeg([
    "-i",
    masterMp4,
    "-vf",
    "scale=3840:2160:flags=lanczos",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "17",
    "-preset",
    "medium",
    "-movflags",
    "+faststart",
    artifact4k,
  ]);
}

// Manifest for the PR / walkthrough
writeFileSync(
  join(artifactDir, "manifest.json"),
  JSON.stringify(
    {
      durationSec: DURATION,
      fps: FPS,
      capture: { width: WIDTH, height: HEIGHT },
      outputs: {
        public1080,
        artifact1080,
        artifact4k,
        masterMp4,
      },
      previews: previewPaths,
    },
    null,
    2,
  ),
);

console.log("Done.");
console.log("  public:", public1080, existsSync(public1080));
console.log("  1080 artifact:", artifact1080);
console.log("  4K artifact:", artifact4k);
console.log("  previews:", previewPaths.length);
