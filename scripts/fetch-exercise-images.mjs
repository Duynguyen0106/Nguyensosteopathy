#!/usr/bin/env node
/**
 * Download free stock photos for each rehab exercise (pose-matched).
 * Sources: Pexels (free licence) + Wikimedia Commons (CC).
 * Saves JPEG + WebP under public/images/exercises/ and regenerates
 * src/lib/exercise-images.ts
 */
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "images", "exercises");
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const UA = "NguyensOsteopathyExerciseFetcher/1.1 (educational clinic site)";

const pexelsUrl = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

async function wikimediaUrl(filename) {
  const title = `File:${filename}`;
  const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(api, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Commons API ${res.status} for ${filename}`);
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  const url = page?.imageinfo?.[0]?.url?.split("?")[0];
  if (!url) throw new Error(`No Commons URL for ${filename}`);
  return url;
}

/**
 * slug → curated free image (verified pose match where possible)
 * crop: sharp extract region { left, top, width, height } in source pixels
 *   or relative 0–1 fractions via cropRel
 */
const IMAGES = {
  "pelvic-tilts": {
    kind: "pexels",
    id: 7592443,
    alt: "Person lying on a yoga mat with knees bent — start position for pelvic tilts",
    credit: "Photo via Pexels (#7592443)",
  },
  "knee-rolls": {
    kind: "pexels",
    id: 7592443,
    alt: "Person lying on a yoga mat with knees bent — position used for gentle knee rolls",
    credit: "Photo via Pexels (#7592443)",
  },
  "supine-marching": {
    kind: "pexels",
    id: 5037400,
    alt: "Person on their back with one leg raised — similar to a controlled supine march",
    credit: "Photo via Pexels (#5037400)",
  },
  "glute-bridge": {
    kind: "pexels",
    id: 4534632,
    alt: "Person performing a glute bridge on a yoga mat with hips lifted",
    credit: "Photo via Pexels (#4534632)",
  },
  "hip-hinge-practice": {
    kind: "pexels",
    id: 841130,
    alt: "Person in a hip-hinge / deadlift set-up gripping a barbell",
    credit: "Photo via Pexels (#841130)",
  },
  "chin-tuck": {
    kind: "pexels",
    id: 7900670,
    alt: "Person performing a gentle neck mobility stretch with hand support at the jaw",
    credit: "Photo via Pexels (#7900670)",
  },
  "seated-scapular-set": {
    kind: "pexels",
    id: 8244383,
    alt: "Person seated upright with arms reaching overhead — tall posture and scapular set cue",
    credit: "Photo via Pexels (#8244383)",
  },
  "open-book-rotation": {
    kind: "pexels",
    id: 4534584,
    alt: "Person in a lunging twist, rotating the torso for thoracic mobility",
    credit: "Photo via Pexels (#4534584)",
  },
  "sciatic-nerve-glide": {
    kind: "pexels",
    id: 373891,
    alt: "Seated person reaching toward the feet in a hamstring / nerve-mobility stretch",
    credit: "Photo via Pexels (#373891)",
  },
  "piriformis-figure-four": {
    kind: "pexels",
    id: 6453897,
    position: "south",
    alt: "Person in a 90/90 hip stretch on the floor — hip / figure-four style mobility",
    credit: "Photo via Pexels (#6453897)",
  },
  "quad-set-short-arc": {
    kind: "wikimedia",
    file: "Quad setting exercise.png",
    alt: "Instructional illustration of a quad set / short-arc knee extension",
    credit: "Illustration via Wikimedia Commons (BruceBlaus, CC BY-SA 4.0)",
  },
  "side-lying-hip-abduction": {
    kind: "wikimedia",
    file: "Acetabular Labrum Exercises.jpg",
    // Bottom-right panel: side-lying top-leg raise
    cropRel: { left: 0.48, top: 0.42, width: 0.5, height: 0.55 },
    alt: "Person lying on their side lifting the top leg for hip abduction strength",
    credit: "Photo via Wikimedia Commons (Acetabular Labrum Exercises, CC licensed)",
  },
  "step-down-control": {
    kind: "wikimedia",
    file: "Step exercise.JPG",
    alt: "Person standing on a step box practicing controlled step-down knee control",
    credit: "Photo via Wikimedia Commons (CC licensed)",
  },
  "plantar-fascia-roll": {
    kind: "pexels",
    id: 20890283,
    alt: "Bare foot resting on a foam roller for plantar fascia / sole mobility",
    credit: "Photo via Pexels (#20890283)",
  },
  "calf-wall-stretch": {
    kind: "pexels",
    id: 36429567,
    alt: "Athlete stretching the calf with the forefoot against a brick wall",
    credit: "Photo via Pexels (#36429567)",
  },
  "isometric-heel-raise": {
    kind: "pexels",
    id: 8436714,
    alt: "Bare feet rising onto the balls of the feet in a heel-raise hold",
    credit: "Photo via Pexels (#8436714)",
  },
  "shoulder-pendulum": {
    kind: "wikimedia",
    file: "Pendulum exercise (passive exercise).jpg",
    alt: "Illustration of a shoulder pendulum: leaning forward with the arm hanging to swing gently",
    credit: "Illustration via Wikimedia Commons (CC licensed)",
  },
  "wall-angels": {
    kind: "pexels",
    id: 7593045,
    alt: "Person standing with arms reaching overhead against a plain wall — wall-angel style reach",
    credit: "Photo via Pexels (#7593045)",
  },
  "band-external-rotation": {
    kind: "pexels",
    id: 8846512,
    alt: "Person using a resistance band for shoulder and upper-back activation",
    credit: "Photo via Pexels (#8846512)",
  },
  "ankle-alphabet": {
    kind: "wikimedia",
    file: "Exercise Ankle Rotation.png",
    alt: "Instructional illustration of seated ankle rotation / alphabet mobility",
    credit: "Illustration via Wikimedia Commons (BruceBlaus, CC BY-SA 4.0)",
  },
  "single-leg-balance": {
    kind: "wikimedia",
    file: "Balance with one leg.JPG",
    alt: "Person balancing on one leg on a balance disc for stability training",
    credit: "Photo via Wikimedia Commons (CC licensed)",
  },
  "bird-dog": {
    kind: "wikimedia",
    file: "Bird dog exercise.jpg",
    alt: "Person on hands and knees extending opposite arm and leg (bird-dog)",
    credit: "Photo via Wikimedia Commons (PTPioneer, CC BY 2.0)",
  },
  "diaphragmatic-breathing": {
    kind: "pexels",
    id: 6958060,
    alt: "Person lying calmly on a mat with eyes closed practising relaxed breathing",
    credit: "Photo via Pexels (#6958060)",
  },
};

async function resolveUrl(meta) {
  if (meta.kind === "pexels") return pexelsUrl(meta.id);
  if (meta.kind === "wikimedia") return wikimediaUrl(meta.file);
  throw new Error(`Unknown kind ${meta.kind}`);
}

async function downloadBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`Payload too small (${buf.length}) for ${url}`);
  return buf;
}

async function processOne(slug, meta) {
  const url = await resolveUrl(meta);
  const buf = await downloadBuffer(url);
  let pipeline = sharp(buf).rotate();

  if (meta.cropRel) {
    const metaInfo = await sharp(buf).metadata();
    const w = metaInfo.width || 1000;
    const h = metaInfo.height || 1000;
    const { left, top, width, height } = meta.cropRel;
    pipeline = pipeline.extract({
      left: Math.round(left * w),
      top: Math.round(top * h),
      width: Math.round(width * w),
      height: Math.round(height * h),
    });
  } else if (meta.crop) {
    pipeline = pipeline.extract(meta.crop);
  }

  const jpgPath = join(outDir, `${slug}.jpg`);
  const webpPath = join(outDir, `${slug}.webp`);

  const fit = meta.fit === "contain" ? "contain" : "cover";
  await pipeline
    .resize(1200, 800, {
      fit,
      position: meta.position || "centre",
      background: { r: 248, g: 250, b: 252 },
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(jpgPath);

  await sharp(jpgPath).webp({ quality: 78, effort: 4 }).toFile(webpPath);

  return { slug, bytes: buf.length };
}

mkdirSync(outDir, { recursive: true });

// Clear previous mismatched assets (keep directory)
for (const slug of Object.keys(IMAGES)) {
  for (const ext of ["jpg", "webp"]) {
    const p = join(outDir, `${slug}.${ext}`);
    if (existsSync(p)) rmSync(p);
  }
}

const manifest = {};
const slugs = Object.keys(IMAGES);
let failed = 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Sequential with short delay — Wikimedia rate-limits parallel bursts
for (const slug of slugs) {
  try {
    const value = await processOne(slug, IMAGES[slug]);
    manifest[slug] = {
      src: `/images/exercises/${slug}.webp`,
      alt: IMAGES[slug].alt,
      credit: IMAGES[slug].credit,
    };
    console.log("OK", slug, value.bytes);
  } catch (err) {
    failed += 1;
    console.error("FAIL", slug, err?.message || err);
  }
  if (IMAGES[slug].kind === "wikimedia") await sleep(800);
}

writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));

const tsLines = [
  "/** Auto-generated by scripts/fetch-exercise-images.mjs — free Pexels / Wikimedia photos. */",
  "export type ExerciseImage = { src: string; alt: string; credit?: string };",
  "",
  "export const exerciseImages: Record<string, ExerciseImage> = {",
];
for (const slug of Object.keys(manifest)) {
  const m = manifest[slug];
  tsLines.push(`  "${slug}": {`);
  tsLines.push(`    src: "${m.src}",`);
  tsLines.push(`    alt: ${JSON.stringify(m.alt)},`);
  tsLines.push(`    credit: ${JSON.stringify(m.credit)},`);
  tsLines.push(`  },`);
}
tsLines.push("};");
tsLines.push("");
tsLines.push(
  "export function getExerciseImage(slug: string): ExerciseImage | undefined {",
);
tsLines.push("  return exerciseImages[slug];");
tsLines.push("}");
tsLines.push("");

writeFileSync(join(root, "src/lib/exercise-images.ts"), tsLines.join("\n"));

console.log(
  `Ready: ${Object.keys(manifest).length}/${slugs.length} (failed ${failed})`,
);
if (failed) process.exitCode = 1;
