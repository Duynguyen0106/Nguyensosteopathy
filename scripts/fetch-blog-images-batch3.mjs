#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "images", "blog");
const manifestPath = join(root, "src/lib/blog-image-manifest.json");
mkdirSync(outDir, { recursive: true });
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

const IMAGES = {
  "vietnamese-osteopath-woolwich-uk": {
    url: pexels(3184418),
    alt: "Clinician speaking warmly with a patient in consultation",
  },
  "nail-technician-neck-wrist-pain-osteopath": {
    url: pexels(3997379),
    alt: "Nail technician working at a salon desk with bent neck posture",
  },
  "restaurant-kitchen-back-pain-osteopath-woolwich": {
    url: pexels(2253643),
    alt: "Kitchen chef at work representing hospitality physical strain",
  },
  "osteopath-plumstead-abbey-wood-se18": {
    url: pexels(460672),
    alt: "London neighbourhood street representing SE18 local travel",
  },
  "parking-osteopath-woolwich-powis-street": {
    url: pexels(164634),
    alt: "Town centre street and parking context for clinic arrival",
  },
  "chronic-pain-osteopath-woolwich": {
    url: pexels(4506105),
    alt: "Person holding a persistently painful lower back",
  },
  "osteopathy-for-older-adults-woolwich": {
    url: pexels(3768131),
    alt: "Older adult walking outdoors with joint stiffness concern",
  },
  "first-osteopathy-visit-checklist-woolwich": {
    url: pexels(4226256),
    alt: "Checklist and preparation notes for a clinic appointment",
  },
  "coccyx-tailbone-pain-osteopath-woolwich": {
    url: pexels(4502143),
    alt: "Person sitting carefully due to tailbone discomfort",
  },
  "lifting-back-pain-warehouse-trades-woolwich": {
    url: pexels(4246120),
    alt: "Warehouse worker lifting boxes, manual handling strain",
  },
  "rib-pain-breathing-osteopath-woolwich": {
    url: pexels(3822688),
    alt: "Person holding their side ribs while breathing carefully",
  },
  "hip-bursitis-osteopath-woolwich": {
    url: pexels(6111613),
    alt: "Person holding the outer hip after side-lying pain",
  },
  "rsi-wrist-forearm-office-osteopath": {
    url: pexels(4050315),
    alt: "Office worker with wrist and forearm strain at a laptop",
  },
  "calcific-tendonitis-shoulder-shockwave-woolwich": {
    url: pexels(4502147),
    alt: "Person with shoulder pain reaching overhead carefully",
  },
  "shockwave-therapy-cost-woolwich": {
    url: pexels(4386467),
    alt: "Clinic pricing and payment planning for treatment fees",
  },
  "shin-splints-osteopath-woolwich": {
    url: pexels(3764013),
    alt: "Runner holding the shin after training load pain",
  },
  "cycling-lower-back-pain-osteopath-woolwich": {
    url: pexels(100582),
    alt: "Cyclist on a road bike representing lower back ride strain",
  },
  "yoga-pilates-injury-osteopath-woolwich": {
    url: pexels(3822906),
    alt: "Person stretching in a yoga pose related to flexibility strain",
  },
  "massage-for-desk-workers-woolwich": {
    url: pexels(3757952),
    alt: "Deep tissue massage for desk-related shoulder tension",
  },
  "cupping-vs-massage-woolwich": {
    url: pexels(3738377),
    alt: "Soft-tissue therapy tools comparing massage and cupping care",
  },
  "pregnancy-sciatica-osteopath-woolwich": {
    url: pexels(6843310),
    alt: "Pregnant woman supporting her lower back and hip",
  },
  "baby-preferential-head-turn-osteopath": {
    url: pexels(149164),
    alt: "Parent holding a baby during gentle paediatric care discussion",
  },
  "cranial-osteopathy-headaches-woolwich": {
    url: pexels(3822621),
    alt: "Calm resting position suited to gentle cranial osteopathy",
  },
  "opening-day-osteopath-woolwich-5-november": {
    url: pexels(3184292),
    alt: "Clinic team celebrating a professional opening milestone",
  },
};

async function download(slug, url) {
  const dest = join(outDir, `${slug}.jpg`);
  if (existsSync(dest)) return "exists";
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; NguyenOsteopathyBlogBot/1.0; +https://www.nguyensosteopathy.com)",
      Accept: "image/*",
    },
  });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`${slug}: too small (${buf.length})`);
  await sharp(buf)
    .rotate()
    .resize(1200, 800, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  return "ok";
}

for (const [slug, meta] of Object.entries(IMAGES)) {
  try {
    const status = await download(slug, meta.url);
    console.log(status, slug);
  } catch (err) {
    console.error("FAIL", slug, err.message);
  }
}

const existing = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : {};
const files = readdirSync(outDir).filter((f) => f.endsWith(".jpg"));
const manifest = { ...existing };
for (const file of files) {
  const slug = file.replace(/\.jpg$/, "");
  const alt =
    IMAGES[slug]?.alt ??
    existing[slug]?.alt ??
    `Illustration for ${slug.replace(/-/g, " ")}`;
  manifest[slug] = { src: `/images/blog/${file}`, alt };
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Manifest entries: ${Object.keys(manifest).length}`);
