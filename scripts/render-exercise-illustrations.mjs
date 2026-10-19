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
