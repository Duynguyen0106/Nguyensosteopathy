#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "images", "blog");
mkdirSync(outDir, { recursive: true });
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

/** Content-matched Pexels photos for articles that Unsplash missed */
const MISSING = {
  "tension-headaches-neck-osteopath-charlton": {
    url: pexels(3822622),
    alt: "Person holding their head with a tension headache",
  },
  "morning-back-stiffness-osteopath": {
    url: pexels(4506109),
    alt: "Person stretching a stiff back after waking",
  },
  "text-neck-smartphone-osteopath-charlton": {
    url: pexels(6111616),
    alt: "Person looking down at a phone, text-neck posture",
  },
  "migraine-vs-tension-headache-osteopath": {
    url: pexels(3807738),
    alt: "Person resting in a darkened room with a migraine",
  },
  "plantar-fasciitis-shockwave-charlton": {
    url: pexels(4502152),
    alt: "Close-up of a heel and foot related to plantar fasciitis",
  },
  "tennis-elbow-shockwave-osteopath-charlton": {
    url: pexels(3822843),
    alt: "Person holding the outside of the elbow in pain",
  },
  "patellar-tendinopathy-shockwave-charlton": {
    url: pexels(5473182),
    alt: "Athlete holding the front of the knee after jumping load",
  },
  "what-to-expect-focused-shockwave-session": {
    url: pexels(3764011),
    alt: "Clinical treatment room prepared for therapy",
  },
  "medical-acupuncture-osteopath-charlton": {
    url: pexels(3822864),
    alt: "Acupuncture needles used in medical needling treatment",
  },
  "cupping-therapy-add-on-charlton": {
    url: pexels(4386466),
    alt: "Cupping therapy cups on a treatment tray",
  },
  "deep-tissue-vs-osteopathy-charlton": {
    url: pexels(6111474),
    alt: "Hands-on soft-tissue therapy during a clinic session",
  },
  "running-injuries-osteopath-charlton": {
    url: pexels(3823039),
    alt: "Runner on a path representing running injuries",
  },
  "gym-shoulder-injury-osteopath-charlton": {
    url: pexels(6456209),
    alt: "Gym training that can irritate the shoulder joint",
  },
  "pelvic-girdle-pain-pregnancy-charlton": {
    url: pexels(6456179),
    alt: "Pregnant woman supporting her pelvis while standing",
  },
  "pregnancy-rib-pain-osteopath-charlton": {
    url: pexels(6551144),
    alt: "Pregnant woman with hand on her side and ribcage",
  },
  "postpartum-back-pain-osteopath-charlton": {
    url: pexels(3768916),
    alt: "New parent holding a baby, postpartum back strain",
  },
  "cranial-osteopathy-charlton-what-is-it": {
    url: pexels(3768911),
    alt: "Calm treatment setting for gentle cranial osteopathy",
  },
  "infant-osteopathy-what-parents-ask-charlton": {
    url: pexels(4498151),
    alt: "Infant resting peacefully with a parent nearby",
  },
  "book-osteopath-online-charlton": {
    url: pexels(6111596),
    alt: "Booking a clinic appointment on a laptop",
  },
  "back-pain-charlton-osteopathy": {
    url: pexels(3822906),
    alt: "Adult holding the lower back due to back pain",
  },
  "focused-shockwave-therapy-charlton": {
    url: pexels(4506108),
    alt: "Specialist musculoskeletal therapy equipment in clinic",
  },
};

/** Full alt catalogue for every article (used in manifest) */
const ALTS = {
  ...Object.fromEntries(
    Object.entries(MISSING).map(([slug, meta]) => [slug, meta.alt]),
  ),
  "sciatica-charlton-osteopath":
    "Person holding their lower back, illustrating sciatica and lumbar pain",
  "pregnancy-osteopathy-charlton":
    "Pregnant woman supporting her lower back",
  "osteopath-vs-physiotherapist-charlton":
    "Clinician assessing a patient’s shoulder in clinic",
  "hip-knee-pain-osteopath-charlton":
    "Runner stretching the hip and knee outdoors",
  "osteopath-greenwich-charlton-thamesmead":
    "London street scene representing Greenwich and south-east London",
  "how-many-osteopathy-sessions":
    "Treatment plan notes and calendar for booking sessions",
  "shoulder-pain-frozen-shoulder-charlton":
    "Person stretching a stiff shoulder",
  "lumbar-disc-pain-osteopath-charlton":
    "Person with lower back discomfort sitting carefully",
  "sacroiliac-joint-pain-charlton":
    "Athlete holding the side of the pelvis and hip",
  "upper-back-pain-desk-workers-charlton":
    "Desk worker at a laptop with rounded upper-back posture",
  "whiplash-neck-pain-osteopath-se18":
    "Person holding a stiff neck after injury",
  "tmj-jaw-pain-osteopath-charlton":
    "Close view of jaw and face area related to TMJ discomfort",
  "ankle-sprain-rehab-osteopath-charlton":
    "Ankle wrap and rehab for a sprained ankle",
  "wrist-hand-pain-osteopath-se18":
    "Hands typing on a keyboard, desk-related wrist strain",
  "osteoarthritis-joints-osteopath-charlton":
    "Older adult walking carefully with stiff joints",
  "achilles-tendinopathy-shockwave-charlton":
    "Runner’s lower leg and Achilles tendon region",
  "golfers-elbow-osteopath-charlton":
    "Golfer’s grip and forearm load related to medial elbow pain",
  "shockwave-vs-osteopathy-when-to-combine":
    "Hands-on physiotherapy assessment beside clinic equipment",
  "li-eswt-erectile-dysfunction-charlton":
    "Calm private consultation room for discreet men’s health care",
  "mens-pelvic-health-osteopathy-charlton":
    "Professional clinician speaking privately with a patient",
  "how-many-shockwave-sessions-ed":
    "Planning notes for a course of treatment sessions",
  "drug-free-ed-options-charlton":
    "Quiet clinic corridor suggesting private medical discussion",
  "electroacupuncture-pain-relief-charlton":
    "Acupuncture treatment setup for muscle pain relief",
  "acupuncture-add-on-vs-standalone":
    "Clinic tray with acupuncture needles and sterile packs",
  "deep-tissue-massage-charlton-osteopath":
    "Deep tissue massage on the back and shoulders",
  "post-gym-muscle-soreness-massage-charlton":
    "Gym training session leading to muscle soreness",
  "stress-shoulder-tension-massage-charlton":
    "Person rubbing tense upper shoulders from stress",
  "football-muscle-strain-osteopath-se18":
    "Football players on a pitch, muscle strain context",
  "return-to-sport-after-sprain-charlton":
    "Athlete preparing to return to sport after injury",
  "overuse-injuries-gym-running-charlton":
    "Runner training hard, early overuse injury risk",
  "pregnancy-osteopathy-safety-charlton":
    "Calm pregnant patient resting, safety-focused care",
  "cranial-osteopathy-for-stress-tension":
    "Person resting peacefully to release stress-held tension",
  "cranial-vs-structural-osteopathy-charlton":
    "Osteopath choosing a gentle hands-on technique",
  "paediatric-osteopathy-charlton-parents-guide":
    "Parent with a young child in a calm healthcare setting",
  "growing-pains-osteopath-charlton":
    "Child resting after activity, growing pains context",
  "child-posture-backpack-osteopath-se18":
    "Schoolchild with a backpack, posture load on the spine",
  "osteopathy-fees-charlton-price-list":
    "Clear pricing and payment planning for clinic fees",
  "osteopath-inside-village-pharmacy-charlton":
    "Pharmacy and clinic entrance area for patient arrival",
  "what-to-wear-osteopathy-appointment":
    "Comfortable stretch clothing suitable for an osteopathy visit",
  "osteopath-charlton-what-to-expect":
    "First osteopathy visit with hands-on assessment",
  "desk-neck-and-shoulder-pain":
    "Office worker with neck and shoulder strain at a computer",
  "do-i-need-gp-referral-osteopath":
    "Patient speaking with a clinician about self-referral",
  "sports-injury-osteopath-charlton":
    "Sportsperson recovering from a musculoskeletal injury",
  "mens-health-shockwave-charlton":
    "Private consultation setting for men’s health care",
  "nhs-student-osteopathy-discount-charlton":
    "NHS and student ID cards representing clinic discount eligibility",
};

async function download(slug, url) {
  const dest = join(outDir, `${slug}.jpg`);
  if (existsSync(dest)) return "exists";
  const res = await fetch(url, {
    headers: { "User-Agent": "NguyensOsteopathyBlogBot/1.0", Accept: "image/*" },
  });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`${slug}: too small`);
  await sharp(buf)
    .rotate()
    .resize(1200, 800, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  return "ok";
}

for (const [slug, meta] of Object.entries(MISSING)) {
  try {
    const status = await download(slug, meta.url);
    console.log(status, slug);
  } catch (err) {
    console.error("FAIL", slug, err.message);
  }
}

const files = readdirSync(outDir).filter((f) => f.endsWith(".jpg"));
const manifest = {};
for (const file of files) {
  const slug = file.replace(/\.jpg$/, "");
  manifest[slug] = {
    src: `/images/blog/${file}`,
    alt: ALTS[slug] ?? `Illustration for ${slug.replace(/-/g, " ")}`,
  };
}
writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Manifest entries: ${Object.keys(manifest).length}`);
