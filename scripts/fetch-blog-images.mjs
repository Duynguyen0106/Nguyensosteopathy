#!/usr/bin/env node
/**
 * Download topic-matched Unsplash photos for each blog article.
 * Images are cropped to 1200×800 JPEG via sharp and saved under public/images/blog/.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "images", "blog");
mkdirSync(outDir, { recursive: true });

const require = createRequire(import.meta.url);
const sharp = require("sharp");

/** slug → Unsplash photo id + alt text (content-matched) */
const IMAGES = {
  "sciatica-woolwich-osteopath": {
    id: "1571019614242-c5c5dee9f50b",
    alt: "Person holding their lower back, illustrating sciatica and lumbar pain",
  },
  "tension-headaches-neck-osteopath-woolwich": {
    id: "1559757175-5700ddebf814",
    alt: "Person pressing temples with a tension headache",
  },
  "pregnancy-osteopathy-woolwich": {
    id: "1544126592-807ade215a0b",
    alt: "Pregnant woman supporting her lower back",
  },
  "osteopath-vs-physiotherapist-woolwich": {
    id: "1576091160550-2173dba999ef",
    alt: "Clinician assessing a patient’s shoulder in clinic",
  },
  "hip-knee-pain-osteopath-woolwich": {
    id: "1518611012118-696072aa579a",
    alt: "Runner stretching the hip and knee outdoors",
  },
  "osteopath-greenwich-charlton-thamesmead": {
    id: "1513635269975-59663e0ac1ad",
    alt: "London street scene representing Greenwich and south-east London",
  },
  "how-many-osteopathy-sessions": {
    id: "1454165804606-c3d57bc86b40",
    alt: "Treatment plan notes and calendar for booking sessions",
  },
  "shoulder-pain-frozen-shoulder-woolwich": {
    id: "1544367567-0f2fcb009e0b",
    alt: "Person stretching a stiff shoulder",
  },
  "lumbar-disc-pain-osteopath-woolwich": {
    id: "1599058917212-d750089bc07e",
    alt: "Person with lower back discomfort sitting carefully",
  },
  "sacroiliac-joint-pain-woolwich": {
    id: "1517836357463-d25dfeac3438",
    alt: "Athlete holding the side of the pelvis and hip",
  },
  "upper-back-pain-desk-workers-woolwich": {
    id: "1498050108023-c5249f4df085",
    alt: "Desk worker at a laptop with rounded upper-back posture",
  },
  "whiplash-neck-pain-osteopath-se18": {
    id: "1612349317150-e413f6a5b16d",
    alt: "Person holding a stiff neck after injury",
  },
  "morning-back-stiffness-osteopath": {
    id: "1541781777579-6eaa1e2c0c3f",
    alt: "Person stretching stiffly after waking",
  },
  "text-neck-smartphone-osteopath-woolwich": {
    id: "1512940133406-6fa6b5c7d0b5",
    alt: "Person looking down at a smartphone, text-neck posture",
  },
  "tmj-jaw-pain-osteopath-woolwich": {
    id: "1522335789203-aabd1fc54bc9",
    alt: "Close view of jaw and face area related to TMJ discomfort",
  },
  "migraine-vs-tension-headache-osteopath": {
    id: "1559757148-5c043bdf7d66",
    alt: "Person resting with headache in a quiet room",
  },
  "ankle-sprain-rehab-osteopath-woolwich": {
    id: "1571008887538-b36bb32f4571",
    alt: "Ankle wrap and rehab for a sprained ankle",
  },
  "wrist-hand-pain-osteopath-se18": {
    id: "1587825140708-dfaf72ae4b04",
    alt: "Hands typing on a keyboard, desk-related wrist strain",
  },
  "osteoarthritis-joints-osteopath-woolwich": {
    id: "1576091160399-112ba8d25d1d",
    alt: "Older adult walking carefully with stiff joints",
  },
  "plantar-fasciitis-shockwave-woolwich": {
    id: "1517838277536-f5f2095981f5",
    alt: "Bare foot and heel area related to plantar fasciitis",
  },
  "achilles-tendinopathy-shockwave-woolwich": {
    id: "1476480862126-209bfaa8edc8",
    alt: "Runner’s lower leg and Achilles tendon region",
  },
  "tennis-elbow-shockwave-osteopath-woolwich": {
    id: "1599058947535-b8adc79b0d0e",
    alt: "Person holding the outside of the elbow, tennis elbow pain",
  },
  "golfers-elbow-osteopath-woolwich": {
    id: "1534438327276-14e5300c3a48",
    alt: "Golfer’s grip and forearm load related to medial elbow pain",
  },
  "patellar-tendinopathy-shockwave-woolwich": {
    id: "1434682881908-b08c4c5e8f3d",
    alt: "Athlete holding the front of the knee, jumper’s knee",
  },
  "what-to-expect-focused-shockwave-session": {
    id: "1581595220892-980fc90d9b9a",
    alt: "Clinical therapy device on a treatment couch",
  },
  "shockwave-vs-osteopathy-when-to-combine": {
    id: "1666214280557-f1b5022eb634",
    alt: "Hands-on physiotherapy assessment beside clinic equipment",
  },
  "li-eswt-erectile-dysfunction-woolwich": {
    id: "1559839734-2b71ea197ec2",
    alt: "Calm private consultation room for discreet men’s health care",
  },
  "mens-pelvic-health-osteopathy-woolwich": {
    id: "1576091160550-2173dba999ef",
    alt: "Professional clinician speaking privately with a patient",
  },
  "how-many-shockwave-sessions-ed": {
    id: "1454165804606-c3d57bc86b40",
    alt: "Planning notes for a course of treatment sessions",
  },
  "drug-free-ed-options-woolwich": {
    id: "1576091160399-112ba8d25d1d",
    alt: "Quiet clinic corridor suggesting private medical discussion",
  },
  "medical-acupuncture-osteopath-woolwich": {
    id: "1515377905703-c6186471f3e1",
    alt: "Fine acupuncture needles prepared for treatment",
  },
  "electroacupuncture-pain-relief-woolwich": {
    id: "1584515933487-779824d29309",
    alt: "Acupuncture treatment setup for muscle pain relief",
  },
  "acupuncture-add-on-vs-standalone": {
    id: "1631815589968-fdb09a223b1e",
    alt: "Clinic tray with acupuncture needles and sterile packs",
  },
  "cupping-therapy-add-on-woolwich": {
    id: "1519828176659-6c89f6e6f9a0",
    alt: "Cupping therapy cups used as a soft-tissue adjunct",
  },
  "deep-tissue-massage-woolwich-osteopath": {
    id: "1544161515-4ab6ce6db874",
    alt: "Deep tissue massage on the back and shoulders",
  },
  "deep-tissue-vs-osteopathy-woolwich": {
    id: "1519823551278-64ac927692bf",
    alt: "Therapist performing hands-on soft-tissue work",
  },
  "post-gym-muscle-soreness-massage-woolwich": {
    id: "1534438327276-14e5300c3a48",
    alt: "Gym training session leading to muscle soreness",
  },
  "stress-shoulder-tension-massage-woolwich": {
    id: "1544367567-0f2fcb009e0b",
    alt: "Person rubbing tense upper shoulders from stress",
  },
  "running-injuries-osteopath-woolwich": {
    id: "1461897104016-0fc49c9e3d7f",
    alt: "Runner on a path, representing running injuries",
  },
  "gym-shoulder-injury-osteopath-woolwich": {
    id: "1517838277536-f5f2095981f5",
    alt: "Weight training that can irritate the shoulder",
  },
  "football-muscle-strain-osteopath-se18": {
    id: "1574629810360-7efbbe195018",
    alt: "Football players on a pitch, muscle strain context",
  },
  "return-to-sport-after-sprain-woolwich": {
    id: "1518611012118-696072aa579a",
    alt: "Athlete preparing to return to sport after injury",
  },
  "overuse-injuries-gym-running-woolwich": {
    id: "1476480862126-209bfaa8edc8",
    alt: "Runner training hard, early overuse injury risk",
  },
  "pelvic-girdle-pain-pregnancy-woolwich": {
    id: "1493894473891-9ffa54b5b6a0",
    alt: "Pregnant woman holding her pelvis while walking",
  },
  "pregnancy-rib-pain-osteopath-woolwich": {
    id: "1488521777992-6d7e8d2c5f5f",
    alt: "Pregnant woman with hand on the side of her ribcage",
  },
  "postpartum-back-pain-osteopath-woolwich": {
    id: "1555252333-d85f0f4d4a3b",
    alt: "New parent holding a baby, postpartum back load",
  },
  "pregnancy-osteopathy-safety-woolwich": {
    id: "1544126592-807ade215a0b",
    alt: "Calm pregnant patient resting, safety-focused care",
  },
  "cranial-osteopathy-woolwich-what-is-it": {
    id: "1515377905703-c6186471f3e1",
    alt: "Quiet treatment room suited to gentle cranial care",
  },
  "cranial-osteopathy-for-stress-tension": {
    id: "1506126613408-eca07ce68773",
    alt: "Person resting peacefully to release stress-held tension",
  },
  "cranial-vs-structural-osteopathy-woolwich": {
    id: "1576091160550-2173dba999ef",
    alt: "Osteopath choosing a gentle hands-on technique",
  },
  "paediatric-osteopathy-woolwich-parents-guide": {
    id: "1503454537195-1dcabb73ffb9",
    alt: "Parent with a young child in a calm healthcare setting",
  },
  "growing-pains-osteopath-woolwich": {
    id: "1503454537195-1dcabb73ffb9",
    alt: "Child resting after activity, growing pains context",
  },
  "child-posture-backpack-osteopath-se18": {
    id: "1503676260728-1c00da094a0b",
    alt: "Schoolchild with a backpack, posture load on the spine",
  },
  "infant-osteopathy-what-parents-ask-woolwich": {
    id: "1492725760421-ead0f95e42b8",
    alt: "Infant sleeping peacefully in a parent’s care",
  },
  "book-osteopath-online-woolwich": {
    id: "1516321318423-f06f685e32d8",
    alt: "Booking an appointment on a laptop",
  },
  "osteopathy-fees-woolwich-price-list": {
    id: "1554224155-6726b3ff858f",
    alt: "Clear pricing and payment planning for clinic fees",
  },
  "osteopath-inside-st-james-pharmacy-woolwich": {
    id: "1576091160399-112ba8d25d1d",
    alt: "Pharmacy and clinic entrance area for patient arrival",
  },
  "what-to-wear-osteopathy-appointment": {
    id: "1556909114-f6e7ad7d3136",
    alt: "Comfortable stretch clothing suitable for an osteopathy visit",
  },
  "osteopath-woolwich-what-to-expect": {
    id: "1666214280557-f1b5022eb634",
    alt: "First osteopathy visit with hands-on assessment",
  },
  "back-pain-woolwich-osteopathy": {
    id: "1603287381830-4f0f5a1d7b5e",
    alt: "Adult with lower back pain standing carefully",
  },
  "desk-neck-and-shoulder-pain": {
    id: "1498050108023-c5249f4df085",
    alt: "Office worker with neck and shoulder strain at a computer",
  },
  "focused-shockwave-therapy-woolwich": {
    id: "1581595220892-980fc90d9b9a",
    alt: "Focused shockwave therapy equipment in clinic",
  },
  "do-i-need-gp-referral-osteopath": {
    id: "1584515933487-779824d29309",
    alt: "Patient speaking with a clinician about self-referral",
  },
  "sports-injury-osteopath-woolwich": {
    id: "1517836357463-d25dfeac3438",
    alt: "Sportsperson recovering from a musculoskeletal injury",
  },
  "mens-health-shockwave-woolwich": {
    id: "1559839734-2b71ea197ec2",
    alt: "Private consultation setting for men’s health care",
  },
  "nhs-student-osteopathy-discount-woolwich": {
    id: "1527613426441-4da17471b66d",
    alt: "NHS and student ID cards representing clinic discount eligibility",
  },
};

async function downloadOne(slug, meta) {
  const dest = join(outDir, `${slug}.jpg`);
  if (existsSync(dest)) {
    return { slug, status: "exists", dest };
  }
  const url = `https://images.unsplash.com/photo-${meta.id}?auto=format&fit=crop&w=1400&h=933&q=80`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "NguyensOsteopathyBlogBot/1.0",
      Accept: "image/*",
    },
  });
  if (!res.ok) {
    throw new Error(`${slug}: HTTP ${res.status} for ${meta.id}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  // Reject tiny/error payloads
  if (buf.length < 8000) {
    throw new Error(`${slug}: payload too small (${buf.length})`);
  }
  await sharp(buf)
    .rotate()
    .resize(1200, 800, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  return { slug, status: "ok", dest, bytes: buf.length };
}

const manifest = {};
const slugs = Object.keys(IMAGES);
const results = [];
for (let i = 0; i < slugs.length; i += 6) {
  const batch = slugs.slice(i, i + 6);
  const settled = await Promise.allSettled(
    batch.map((slug) => downloadOne(slug, IMAGES[slug])),
  );
  for (let j = 0; j < settled.length; j += 1) {
    const slug = batch[j];
    const item = settled[j];
    if (item.status === "fulfilled") {
      results.push(item.value);
      manifest[slug] = {
        src: `/images/blog/${slug}.jpg`,
        alt: IMAGES[slug].alt,
      };
      console.log("OK", slug);
    } else {
      console.error("FAIL", slug, item.reason?.message || item.reason);
    }
  }
}

writeFileSync(
  join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

const ok = results.filter((r) => r.status === "ok" || r.status === "exists");
console.log(`Downloaded/ready: ${ok.length}/${slugs.length}`);
if (ok.length < slugs.length) {
  process.exitCode = 1;
}
