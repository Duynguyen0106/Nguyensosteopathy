#!/usr/bin/env node
/**
 * Rasterise free educational SVG illustrations for exercises that lack
 * pose-matched stock photos. Writes JPEG + WebP under public/images/exercises/
 * and merges into src/lib/exercise-images.ts + manifest.json.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "images", "exercises");
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const navy = "#0b2c45";
const teal = "#0f766e";

function frame(inner) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 320 220">
  <rect width="320" height="220" fill="#e8eef3"/>
  <rect x="16" y="16" width="288" height="188" rx="14" fill="#ffffff" stroke="${teal}" stroke-opacity="0.28" stroke-width="2"/>
  ${inner}
</svg>`;
}

/** Unique free illustrations for exercises without stock photos. */
const ILLUSTRATIONS = {
  "hip-hinge-practice": {
    alt: "Educational illustration of a hip hinge: torso tips forward with a long spine",
    credit: "Free educational illustration",
    svg: frame(`
      <line x1="40" y1="190" x2="280" y2="190" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="130" cy="52" r="14" fill="${navy}"/>
      <path d="M130 66 L170 115 M170 115 L150 180 M170 115 L215 170 M130 85 L105 110 M170 100 L205 90"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M200 55 L225 145" stroke="${teal}" stroke-width="3" stroke-dasharray="6 5" opacity="0.8"/>
      <path d="M95 185 L130 185" stroke="${teal}" stroke-width="4" stroke-linecap="round"/>
    `),
  },
  "chin-tuck": {
    alt: "Educational illustration of a seated chin tuck (gentle cervical retraction)",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="100" y="125" width="120" height="16" rx="4" fill="#cbd5e1"/>
      <rect x="118" y="141" width="16" height="42" rx="3" fill="#94a3b8"/>
      <rect x="186" y="141" width="16" height="42" rx="3" fill="#94a3b8"/>
      <circle cx="160" cy="58" r="14" fill="${navy}"/>
      <path d="M160 72 L160 125 M160 90 L130 115 M160 90 L190 115 M160 125 L140 125 M160 125 L180 125"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- chin tuck arrow: head draws back -->
      <path d="M185 55 H210" stroke="${teal}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M200 48 L210 55 L200 62" fill="none" stroke="${teal}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="168" cy="62" r="2.5" fill="${teal}"/>
    `),
  },
  "seated-scapular-set": {
    alt: "Educational illustration of a seated scapular set: upright posture, arms by sides, shoulder blades drawn back",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="100" y="125" width="120" height="16" rx="4" fill="#cbd5e1"/>
      <rect x="118" y="141" width="16" height="42" rx="3" fill="#94a3b8"/>
      <rect x="186" y="141" width="16" height="42" rx="3" fill="#94a3b8"/>
      <circle cx="160" cy="52" r="13" fill="${navy}"/>
      <path d="M160 65 L160 125 M160 85 L125 120 M160 85 L195 120 M160 125 L142 125 M160 125 L178 125"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- scapular set cues -->
      <path d="M125 88 C140 78, 180 78, 195 88" fill="none" stroke="${teal}" stroke-width="3.5" stroke-dasharray="4 3"/>
      <path d="M132 95 L125 88 L132 82" fill="none" stroke="${teal}" stroke-width="3" stroke-linecap="round"/>
      <path d="M188 95 L195 88 L188 82" fill="none" stroke="${teal}" stroke-width="3" stroke-linecap="round"/>
    `),
  },
  "open-book-rotation": {
    alt: "Educational illustration of a side-lying open-book thoracic rotation",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="175" rx="105" ry="10" fill="#e2e8f0"/>
      <circle cx="75" cy="120" r="13" fill="${navy}"/>
      <path d="M88 122 L155 128 L200 165 M155 128 L160 170"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- rotating top arm / open book arc -->
      <path d="M155 128 L245 75" fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round"/>
      <path d="M175 110 Q210 70 245 75" fill="none" stroke="${teal}" stroke-width="3" stroke-dasharray="5 4" opacity="0.85"/>
      <circle cx="245" cy="75" r="5" fill="${teal}"/>
    `),
  },
  "sciatic-nerve-glide": {
    alt: "Educational illustration of a seated sciatic nerve glide / slider",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="95" y="115" width="90" height="16" rx="4" fill="#cbd5e1"/>
      <rect x="108" y="131" width="16" height="48" rx="3" fill="#94a3b8"/>
      <rect x="155" y="131" width="16" height="28" rx="3" fill="#94a3b8"/>
      <circle cx="140" cy="55" r="13" fill="${navy}"/>
      <path d="M140 68 L140 115 M140 85 L115 108 M140 85 L175 95 M175 95 L210 130 L235 155"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- ankle dorsiflex / chin cue -->
      <path d="M235 155 Q250 160 245 175" fill="none" stroke="${teal}" stroke-width="4" stroke-linecap="round"/>
      <path d="M155 52 H175" stroke="${teal}" stroke-width="3" stroke-linecap="round"/>
      <path d="M168 46 L175 52 L168 58" fill="none" stroke="${teal}" stroke-width="2.5"/>
    `),
  },
  "piriformis-figure-four": {
    alt: "Educational illustration of a supine figure-four hip stretch",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="180" rx="100" ry="10" fill="#e2e8f0"/>
      <path d="M65 160 C95 115, 125 95, 165 95 C205 95, 235 115, 255 160"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="72" cy="132" r="13" fill="${navy}"/>
      <path d="M160 110 L160 145 L115 180" fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M160 145 L210 125 L230 155" fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="230" cy="155" r="5" fill="${teal}"/>
      <path d="M115 155 L145 145" stroke="${teal}" stroke-width="3" stroke-dasharray="4 3" opacity="0.7"/>
    `),
  },
  "wall-angels": {
    alt: "Educational illustration of wall angels: back to wall, arms sliding overhead",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="48" y="28" width="16" height="165" rx="3" fill="${teal}" opacity="0.35"/>
      <circle cx="105" cy="52" r="13" fill="${navy}"/>
      <path d="M105 65 L105 135 M105 85 L70 110 M105 85 L140 110 M105 135 L88 180 M105 135 L125 180"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- arms in goal-post / wall angel -->
      <path d="M70 110 L55 70 L70 45" fill="none" stroke="${teal}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M140 110 L155 70 L140 45" fill="none" stroke="${teal}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M70 45 L55 35 M140 45 L155 35" stroke="${teal}" stroke-width="3" stroke-dasharray="3 3"/>
    `),
  },
  "band-external-rotation": {
    alt: "Educational illustration of band external rotation: elbow at side, forearm rotating out",
    credit: "Free educational illustration",
    svg: frame(`
      <line x1="40" y1="190" x2="280" y2="190" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="150" cy="48" r="13" fill="${navy}"/>
      <path d="M150 61 L150 125 M150 80 L120 105 M150 125 L130 180 M150 125 L175 180"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- bent elbow ER -->
      <path d="M150 95 L185 95 L185 135" fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M185 135 Q215 150 200 170" fill="none" stroke="${teal}" stroke-width="4" stroke-dasharray="4 3"/>
      <circle cx="45" cy="110" r="7" fill="${teal}"/>
      <path d="M52 110 C100 110, 145 120, 180 130" fill="none" stroke="${teal}" stroke-width="3.5" stroke-dasharray="5 4"/>
    `),
  },
  "single-leg-balance": {
    alt: "Educational illustration of single-leg balance on a stable floor",
    credit: "Free educational illustration",
    svg: frame(`
      <line x1="40" y1="190" x2="280" y2="190" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="160" cy="45" r="13" fill="${navy}"/>
      <path d="M160 58 L160 120 M160 78 L130 100 M160 78 L190 100 M160 120 L160 185"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- lifted leg -->
      <path d="M160 120 L205 145 L225 125" fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="160" cy="188" r="7" fill="${teal}" opacity="0.45"/>
    `),
  },
  "cat-cow": {
    alt: "Educational illustration of cat–cow on hands and knees",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="185" rx="100" ry="9" fill="#e2e8f0"/>
      <circle cx="70" cy="95" r="12" fill="${navy}"/>
      <path d="M82 100 L130 120 L200 115 L250 145 M130 120 L115 175 M200 115 L215 175"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M120 105 Q160 70 210 100" fill="none" stroke="${teal}" stroke-width="4" stroke-dasharray="5 4"/>
    `),
  },
  "dead-bug": {
    alt: "Educational illustration of a dead-bug: opposite arm and leg reaching on the back",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="175" rx="105" ry="10" fill="#e2e8f0"/>
      <path d="M70 150 C100 110, 130 95, 170 95 C210 95, 240 115, 255 150"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="78" cy="125" r="12" fill="${navy}"/>
      <path d="M165 110 L165 145 L125 165" fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round"/>
      <path d="M165 145 L210 170" fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round"/>
      <path d="M150 105 L115 70" fill="none" stroke="${teal}" stroke-width="6" stroke-linecap="round"/>
      <path d="M150 105 L185 95" fill="none" stroke="${navy}" stroke-width="6" stroke-linecap="round"/>
    `),
  },
  "prone-press-up": {
    alt: "Educational illustration of a prone press-up: chest lifts while hips stay down",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="185" rx="110" ry="9" fill="#e2e8f0"/>
      <path d="M55 155 L250 155" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="70" cy="120" r="12" fill="${navy}"/>
      <path d="M82 125 L150 130 L230 150 M150 130 L145 155"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M120 145 L120 125" fill="none" stroke="${teal}" stroke-width="6" stroke-linecap="round"/>
      <path d="M110 115 L120 125 L130 115" fill="none" stroke="${teal}" stroke-width="3"/>
    `),
  },
  "knee-to-chest": {
    alt: "Educational illustration of a single knee-to-chest stretch on the back",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="180" rx="105" ry="10" fill="#e2e8f0"/>
      <path d="M65 155 C95 115, 125 100, 165 100 C205 100, 235 120, 255 155"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="72" cy="130" r="12" fill="${navy}"/>
      <path d="M160 115 L160 150 L210 170" fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round"/>
      <path d="M160 150 L130 110" fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="130" cy="110" r="5" fill="${teal}"/>
    `),
  },
  "clamshell": {
    alt: "Educational illustration of a side-lying clamshell hip exercise",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="180" rx="105" ry="10" fill="#e2e8f0"/>
      <circle cx="70" cy="120" r="12" fill="${navy}"/>
      <path d="M82 125 L150 135 L220 160" fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round"/>
      <path d="M150 135 L210 115" fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round"/>
      <path d="M175 145 Q195 125 210 115" fill="none" stroke="${teal}" stroke-width="3" stroke-dasharray="4 3"/>
    `),
  },
  "hip-flexor-stretch": {
    alt: "Educational illustration of a half-kneeling hip-flexor stretch",
    credit: "Free educational illustration",
    svg: frame(`
      <line x1="40" y1="190" x2="280" y2="190" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="145" cy="48" r="12" fill="${navy}"/>
      <path d="M145 60 L145 115 M145 80 L115 100 M145 80 L175 95 M145 115 L120 185 M145 115 L200 160 L210 185"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M130 150 L145 115" stroke="${teal}" stroke-width="3" stroke-dasharray="4 3"/>
    `),
  },
  "hamstring-slider": {
    alt: "Educational illustration of a supine hamstring slider with the knee easing straight",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="180" rx="105" ry="10" fill="#e2e8f0"/>
      <path d="M60 155 C95 115, 130 100, 170 100" fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="68" cy="128" r="12" fill="${navy}"/>
      <path d="M160 110 L160 140" fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round"/>
      <path d="M160 140 L235 145" fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round"/>
      <path d="M200 140 Q220 120 235 145" fill="none" stroke="${teal}" stroke-width="3" stroke-dasharray="4 3"/>
    `),
  },
  "sit-to-stand": {
    alt: "Educational illustration of a sit-to-stand from a chair",
    credit: "Free educational illustration",
    svg: frame(`
      <line x1="40" y1="190" x2="280" y2="190" stroke="#cbd5e1" stroke-width="4"/>
      <rect x="70" y="120" width="70" height="12" rx="3" fill="#94a3b8"/>
      <rect x="78" y="132" width="14" height="50" rx="3" fill="#94a3b8"/>
      <circle cx="175" cy="55" r="12" fill="${navy}"/>
      <path d="M175 67 L175 120 M175 85 L145 105 M175 85 L205 100 M175 120 L160 185 M175 120 L205 185"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M175 100 L155 80" stroke="${teal}" stroke-width="3" stroke-dasharray="4 3"/>
    `),
  },
  "thoracic-extension-roll": {
    alt: "Educational illustration of thoracic extension over a rolled towel",
    credit: "Free educational illustration",
    svg: frame(`
      <ellipse cx="160" cy="180" rx="105" ry="10" fill="#e2e8f0"/>
      <ellipse cx="160" cy="145" rx="28" ry="12" fill="${teal}" opacity="0.35"/>
      <path d="M70 150 C105 105, 140 85, 175 90 C210 95, 240 120, 255 150"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="78" cy="120" r="12" fill="${navy}"/>
      <path d="M165 105 L165 145 L130 175 M165 145 L205 175"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round"/>
    `),
  },
  "seated-thoracic-rotation": {
    alt: "Educational illustration of seated thoracic rotation in a chair",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="105" y="125" width="110" height="16" rx="4" fill="#cbd5e1"/>
      <rect x="120" y="141" width="16" height="42" rx="3" fill="#94a3b8"/>
      <rect x="185" y="141" width="16" height="42" rx="3" fill="#94a3b8"/>
      <circle cx="160" cy="52" r="12" fill="${navy}"/>
      <path d="M160 64 L160 125 M160 90 L130 115 M160 90 L200 100"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round"/>
      <path d="M150 70 Q185 55 210 70" fill="none" stroke="${teal}" stroke-width="3.5" stroke-dasharray="4 3"/>
    `),
  },
  "upper-trap-stretch": {
    alt: "Educational illustration of a seated upper trapezius side-bend stretch",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="105" y="130" width="110" height="16" rx="4" fill="#cbd5e1"/>
      <rect x="120" y="146" width="16" height="40" rx="3" fill="#94a3b8"/>
      <rect x="185" y="146" width="16" height="40" rx="3" fill="#94a3b8"/>
      <circle cx="175" cy="55" r="12" fill="${navy}"/>
      <path d="M168 66 L160 130 M160 90 L130 115 M160 90 L195 115"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round"/>
      <path d="M175 45 Q195 40 205 55" fill="none" stroke="${teal}" stroke-width="3.5"/>
    `),
  },
  "doorway-pec-stretch": {
    alt: "Educational illustration of a doorway pec / chest stretch",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="55" y="30" width="14" height="160" rx="3" fill="${teal}" opacity="0.35"/>
      <line x1="40" y1="190" x2="280" y2="190" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="140" cy="55" r="12" fill="${navy}"/>
      <path d="M140 67 L140 130 M140 90 L175 85 L175 55 M140 130 L120 185 M140 130 L165 185"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M175 55 L62 70" stroke="${teal}" stroke-width="3" stroke-dasharray="4 3"/>
    `),
  },
  "table-slides": {
    alt: "Educational illustration of supported table slides for the shoulder",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="40" y="110" width="200" height="14" rx="3" fill="#94a3b8"/>
      <circle cx="95" cy="60" r="12" fill="${navy}"/>
      <path d="M95 72 L95 110 M95 90 L70 100 M95 90 L160 105"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round"/>
      <path d="M160 105 L230 105" fill="none" stroke="${teal}" stroke-width="6" stroke-linecap="round"/>
      <path d="M200 95 L230 105 L200 115" fill="none" stroke="${teal}" stroke-width="3"/>
    `),
  },
  "wrist-extensor-stretch": {
    alt: "Educational illustration of a wrist extensor stretch with the elbow straight",
    credit: "Free educational illustration",
    svg: frame(`
      <line x1="40" y1="190" x2="280" y2="190" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="120" cy="55" r="12" fill="${navy}"/>
      <path d="M120 67 L120 120 M120 85 L95 105 M120 120 L105 180 M120 120 L145 180"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round"/>
      <path d="M120 95 L200 95 L230 130" fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round"/>
      <path d="M215 110 L230 130 L210 135" fill="none" stroke="${teal}" stroke-width="3"/>
    `),
  },
  "towel-grip-isometric": {
    alt: "Educational illustration of a gentle towel grip isometric hold",
    credit: "Free educational illustration",
    svg: frame(`
      <rect x="110" y="125" width="100" height="14" rx="3" fill="#cbd5e1"/>
      <circle cx="155" cy="55" r="12" fill="${navy}"/>
      <path d="M155 67 L155 125 M155 90 L125 110 M155 90 L200 105"
        fill="none" stroke="${navy}" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="215" cy="120" rx="18" ry="12" fill="${teal}" opacity="0.35"/>
      <path d="M200 105 L215 120" fill="none" stroke="${navy}" stroke-width="6" stroke-linecap="round"/>
    `),
  },
  "median-nerve-glide": {
    alt: "Educational illustration of a gentle median nerve glide for the arm and wrist",
    credit: "Free educational illustration",
    svg: frame(`
      <line x1="40" y1="190" x2="280" y2="190" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="130" cy="50" r="12" fill="${navy}"/>
      <path d="M130 62 L130 120 M130 85 L105 105 M130 120 L115 180 M130 120 L150 180"
        fill="none" stroke="${navy}" stroke-width="8" stroke-linecap="round"/>
      <path d="M130 95 L185 95 L220 130 L245 125"
        fill="none" stroke="${teal}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M235 115 L245 125 L235 132" fill="none" stroke="${teal}" stroke-width="3"/>
    `),
  },
};

mkdirSync(outDir, { recursive: true });

const manifestPath = join(outDir, "manifest.json");
const imagesTsPath = join(root, "src/lib/exercise-images.ts");
const existingManifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : {};

for (const [slug, meta] of Object.entries(ILLUSTRATIONS)) {
  const svgBuf = Buffer.from(meta.svg);
  const jpgPath = join(outDir, `${slug}.jpg`);
  const webpPath = join(outDir, `${slug}.webp`);
  await sharp(svgBuf)
    .resize(1200, 800, { fit: "fill" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(jpgPath);
  await sharp(jpgPath).webp({ quality: 82, effort: 4 }).toFile(webpPath);
  existingManifest[slug] = {
    src: `/images/exercises/${slug}.webp`,
    alt: meta.alt,
    credit: meta.credit,
  };
  console.log("OK", slug);
}

writeFileSync(manifestPath, JSON.stringify(existingManifest, null, 2) + "\n");

// Rebuild exercise-images.ts from manifest (preserve objectPosition if present in old file)
let oldObjectPositions = {};
try {
  const old = readFileSync(imagesTsPath, "utf8");
  const posMatches = [
    ...old.matchAll(
      /"([^"]+)":\s*\{[\s\S]*?objectPosition:\s*"([^"]+)"/g,
    ),
  ];
  for (const m of posMatches) oldObjectPositions[m[1]] = m[2];
} catch {
  /* first write */
}

const lines = [
  "/** Curated free Pexels / Wikimedia photos and educational SVG illustrations. */",
  "export type ExerciseImage = {",
  "  src: string;",
  "  alt: string;",
  "  credit?: string;",
  "  /** CSS object-position for better framing in 16:10 crops */",
  "  objectPosition?: string;",
  "};",
  "",
  "export const exerciseImages: Record<string, ExerciseImage> = {",
];

const slugs = Object.keys(existingManifest).sort();
for (const slug of slugs) {
  const m = existingManifest[slug];
  lines.push(`  "${slug}": {`);
  lines.push(`    src: "${m.src}",`);
  lines.push(`    alt: ${JSON.stringify(m.alt)},`);
  lines.push(`    credit: ${JSON.stringify(m.credit)},`);
  if (oldObjectPositions[slug]) {
    lines.push(`    objectPosition: "${oldObjectPositions[slug]}",`);
  }
  lines.push(`  },`);
}
lines.push("};");
lines.push("");
lines.push(
  "export function getExerciseImage(slug: string): ExerciseImage | undefined {",
);
lines.push("  return exerciseImages[slug];");
lines.push("}");
lines.push("");

writeFileSync(imagesTsPath, lines.join("\n"));
console.log(`Manifest entries: ${slugs.length}`);
