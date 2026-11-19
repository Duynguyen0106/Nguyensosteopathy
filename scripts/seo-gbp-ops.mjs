/**
 * Google Business Profile ops pack — Q&A seeds, hours, weekly posts, review ask.
 * Paste into GBP manually (API not available).
 *
 * Usage: node scripts/seo-gbp-ops.mjs
 */
const site = {
  name: "Nguyen's Osteopathic Clinic",
  phone: "07882 843513",
  websiteUrl: "https://www.nguyensosteopathy.com",
  googleReviewsUrl: "https://maps.app.goo.gl/XgHpsXAy1FmZKibn9",
  whatsappUrl: "https://wa.me/447882843513",
  address: "Village Pharmacy, 9 The Village, Charlton, London, SE7 8UG",
};

const faqs = [
  [
    "Do I need a GP referral to see an osteopath in Charlton?",
    "No. You can book Nguyen's Osteopathic Clinic directly online or by phone — a GP referral is not required.",
  ],
  [
    "Where is the clinic inside Village Pharmacy?",
    "We are inside Village Pharmacy at 9 The Village, Charlton SE7 8UG. Ask at the pharmacy counter on arrival and staff will direct you to the osteopathy room.",
  ],
  [
    "What days can I book osteopathy?",
    "The clinic is open Monday to Sunday, 9:00am – 8:00pm. Live slots are shown on the booking page.",
  ],
  [
    "Is parking available near The Village, Charlton?",
    "On-street and nearby short-stay bays serve The Village in Charlton. Allow a few extra minutes on busy days. Charlton station is a short walk.",
  ],
  [
    "Can I speak Vietnamese at the clinic?",
    "Yes. Austin Duy Nguyen can consult in Vietnamese or English so you can describe symptoms without a language barrier.",
  ],
  [
    "Do you offer home visits?",
    "Yes. Home-visit osteopathy is available locally when travel to the clinic is difficult. Initial visits are £120 for 60 minutes; follow-ups are £100 for 30 minutes. Contact us to confirm your address.",
  ],
  [
    "Do you offer shockwave therapy?",
    "Yes. Focused shockwave (LI-ESWT) is available after clinical screening for suitable tendon problems. Men's health vascular LI-ESWT is a separate confidential pathway.",
  ],
  [
    "How do I leave a Google review?",
    `After your visit, open our Google reviews link and share honest feedback — it helps Charlton neighbours choose care: ${site.googleReviewsUrl}`,
  ],
];

const posts = [
  [
    "Book online",
    `Looking for an osteopath in Charlton SE7? Book online with Austin Duy Nguyen (GOsC) inside Village Pharmacy, 9 The Village — no GP referral needed.\n\nBook: ${site.websiteUrl}/book`,
  ],
  [
    "Home visits",
    `Home-visit osteopathy near Charlton when clinic travel is hard. Initial visit £120 (60 min); follow-up £100 (30 min). Message us to confirm your address.\n\nDetails: ${site.websiteUrl}/services/home-visits`,
  ],
  [
    "Vietnamese care",
    `Cần osteopath nói tiếng Việt tại Charlton? Austin Duy Nguyen khám bằng tiếng Việt hoặc tiếng Anh — trong Village Pharmacy, The Village SE7.\n\nĐặt lịch: ${site.websiteUrl}/vi/book`,
  ],
  [
    "Shockwave",
    `Stubborn heel, elbow or Achilles pain in Charlton? Focused shockwave (LI-ESWT) is available after clinical screening — £90 per session.\n\nLearn more: ${site.websiteUrl}/services/focused-shockwave`,
  ],
];

/**
 * Paste into GBP → Edit profile → Services.
 * Mix of exact fees (appointments) + “From £75” condition names for search coverage.
 * Names mirror common Google queries (back pain near me, frozen shoulder, plantar fasciitis…).
 * Prices match src/lib/site.ts — do not invent NHS pathways or treatments you do not offer.
 */
const gbpServiceGroups = [
  {
    category: "Osteopathy appointments",
    services: [
      [
        "Initial osteopathy consultation & treatment",
        "£75",
        "60-minute first visit with Austin Duy Nguyen, GOsC-registered osteopath in Charlton SE7. Full case history, movement assessment, findings explained, and hands-on treatment when appropriate. No GP referral needed.",
      ],
      [
        "Follow-up osteopathic treatment",
        "£60",
        "30-minute follow-up osteopathy. Progress review, hands-on treatment, and updated home advice after your initial consultation.",
      ],
      [
        "Private osteopath Charlton SE7",
        "From £75",
        "Private osteopathy inside Village Pharmacy, 9 The Village, Charlton. One-to-one care with online booking and evening / weekend hours.",
      ],
      [
        "Same-week osteopathy appointment",
        "From £75",
        "Book a same-week osteopathy slot when available. Live availability shown online — Mon–Sun 9am–8pm.",
      ],
    ],
  },
  {
    category: "Back & spine",
    services: [
      [
        "Lower back pain treatment",
        "From £75",
        "Osteopathy for lower back pain, morning stiffness, and mechanical lumbar irritation in Charlton / SE London.",
      ],
      [
        "Upper back & thoracic pain treatment",
        "From £75",
        "Hands-on care for mid-back ache, rib-cage stiffness, and desk-related upper-back strain.",
      ],
      [
        "Sciatica treatment",
        "From £75",
        "Assessment for sciatica-type buttock and leg pain, with red-flag screening and a clear recovery plan.",
      ],
      [
        "Slipped disc / disc bulge care",
        "From £75",
        "Careful osteopathic assessment for disc-related back pain and flare-ups, with advice you can keep between visits.",
      ],
      [
        "Sacroiliac (SI) joint pain treatment",
        "From £75",
        "Osteopathy for SI joint irritation, one-sided low-back ache, and walking-related pelvic stiffness.",
      ],
      [
        "Coccyx / tailbone pain osteopathy",
        "From £75",
        "Gentle assessment for coccyx discomfort after sitting, falls, or childbirth-related strain.",
      ],
      [
        "Spinal stiffness & mobility treatment",
        "From £75",
        "Treatment to ease spinal stiffness and restore freer movement through the neck, mid-back, and lower back.",
      ],
      [
        "Lumbago osteopathy",
        "From £75",
        "Hands-on osteopathy for acute or lingering lumbago / low-back flare-ups when clinically appropriate.",
      ],
    ],
  },
  {
    category: "Neck & headaches",
    services: [
      [
        "Neck pain osteopathy",
        "From £75",
        "Treatment for neck pain, restricted turning, and upper-spine strain from screens or sleep position.",
      ],
      [
        "Whiplash injury osteopathy",
        "From £75",
        "Assessment and gentle rehab support after road-traffic or impact-related neck strain.",
      ],
      [
        "Tension headache treatment",
        "From £75",
        "Osteopathy for tension-type headaches linked to neck and shoulder load.",
      ],
      [
        "Migraine-related neck tension care",
        "From £75",
        "Hands-on care for neck and shoulder drivers that often sit alongside migraine patterns — not a substitute for medical migraine care.",
      ],
      [
        "Cervicogenic headache osteopathy",
        "From £75",
        "Assessment for headaches that start in the neck and refer to the head or behind the eyes.",
      ],
      [
        "Text neck / phone posture strain",
        "From £75",
        "Care for forward-head posture strain, phone-related neck ache, and upper-trap tightness.",
      ],
    ],
  },
  {
    category: "Shoulders, arms & wrists",
    services: [
      [
        "Shoulder pain treatment",
        "From £75",
        "Osteopathy for shoulder stiffness, overuse irritation, and limited reach after sport or desk work.",
      ],
      [
        "Frozen shoulder osteopathy",
        "From £75",
        "Assessment and staged care for adhesive capsulitis / frozen shoulder stiffness and night pain.",
      ],
      [
        "Rotator cuff strain treatment",
        "From £75",
        "Hands-on and rehab advice for rotator cuff irritation, overhead ache, and training-related shoulder load.",
      ],
      [
        "Tennis elbow treatment",
        "From £75",
        "Osteopathy and loading advice for lateral elbow pain from gripping, racket sport, or desk work.",
      ],
      [
        "Golfer's elbow treatment",
        "From £75",
        "Care for medial elbow pain linked to gripping, lifting, or repetitive forearm load.",
      ],
      [
        "Wrist & forearm strain treatment",
        "From £75",
        "Osteopathy for RSI-type wrist and forearm strain from typing, mouse use, or training.",
      ],
      [
        "Carpal tunnel symptom support",
        "From £75",
        "Assessment for wrist and hand numbness or ache; screening advice and soft-tissue care when osteopathy is appropriate.",
      ],
    ],
  },
  {
    category: "Hips, knees, feet & ankles",
    services: [
      [
        "Hip pain osteopathy",
        "From £75",
        "Treatment for hip stiffness, walking-related ache, and peri-hip soft-tissue irritation.",
      ],
      [
        "Knee pain osteopathy",
        "From £75",
        "Care for knee irritability linked to stairs, sport, desk-to-training spikes, or prolonged sitting.",
      ],
      [
        "Ankle sprain rehab",
        "From £75",
        "Osteopathic assessment and rehab planning after ankle sprain or lingering instability.",
      ],
      [
        "Plantar fasciitis / heel pain treatment",
        "From £75",
        "Assessment for heel and arch pain on first steps; manual care plus loading advice. Shockwave available when suitable.",
      ],
      [
        "Achilles tendon pain treatment",
        "From £75",
        "Care for Achilles irritation in runners and walkers, with loading guidance and optional focused shockwave.",
      ],
      [
        "Shin splints osteopathy",
        "From £75",
        "Assessment for medial tibial stress-type shin pain in runners and new gym walkers.",
      ],
      [
        "Foot pain osteopathy",
        "From £75",
        "Hands-on care for forefoot, midfoot, or arch discomfort that affects walking or training.",
      ],
      [
        "Osteoarthritis joint support",
        "From £75",
        "Osteopathy to ease stiffness and improve comfortable movement around osteoarthritic hips, knees, or spine — alongside your medical care.",
      ],
    ],
  },
  {
    category: "Jaw, ribs & pelvis",
    services: [
      [
        "TMJ / jaw pain osteopathy",
        "From £75",
        "Gentle assessment for jaw clicking, clenching-related discomfort, and related neck contribution.",
      ],
      [
        "Rib pain & costochondral strain care",
        "From £75",
        "Osteopathy for rib-cage stiffness, breathing-related ache, and side-trunk strain after cough or twist.",
      ],
      [
        "Pelvic girdle pain treatment",
        "From £75",
        "Assessment for pelvic girdle discomfort in pregnancy or postnatal recovery, adapted to comfort and trimester.",
      ],
      [
        "Posture correction osteopathy",
        "From £75",
        "Hands-on care plus practical advice for posture-related neck, shoulder, and lower-back strain.",
      ],
    ],
  },
  {
    category: "Sports, work & rehab",
    services: [
      [
        "Sports injury osteopathy",
        "From £75",
        "Assessment and rehab planning for strains, sprains, and overuse injuries from running, gym, or team sport.",
      ],
      [
        "Running injury clinic",
        "From £75",
        "Osteopathy for runners with Achilles, shin, knee, ITB-type, or lower-back niggles — load advice included.",
      ],
      [
        "Gym & weightlifting injury care",
        "From £75",
        "Care for training-related back, shoulder, or hip irritation with return-to-lift guidance.",
      ],
      [
        "Football & pitch-sport injury support",
        "From £75",
        "Assessment for muscle strains, ankle twists, and overuse niggles common in amateur football and pitch sports.",
      ],
      [
        "Desk worker posture & RSI treatment",
        "From £75",
        "Care for hybrid and office workers with neck, upper-back, and wrist/forearm strain from long sits.",
      ],
      [
        "Workplace injury osteopathy",
        "From £75",
        "Private osteopathy after lifting, desk, or work-related musculoskeletal strain — reports not included unless agreed.",
      ],
      [
        "Return-to-sport rehab planning",
        "From £75",
        "Graduated rehab milestones after soft-tissue injury so you return to training with clearer loading rules.",
      ],
      [
        "Muscle strain & ligament sprain care",
        "From £75",
        "Hands-on care and early rehab advice for common muscle strains and ligament sprains.",
      ],
    ],
  },
  {
    category: "Shockwave & specialist therapies",
    services: [
      [
        "Focused shockwave therapy (LI-ESWT)",
        "£90",
        "30-minute focused low-intensity shockwave for stubborn tendon problems after clinical screening.",
      ],
      [
        "Shockwave for plantar fasciitis",
        "£90",
        "Focused LI-ESWT for persistent heel / plantar fascia pain when clinically suitable after screening.",
      ],
      [
        "Shockwave for tennis elbow",
        "£90",
        "Focused shockwave for stubborn lateral elbow tendinopathy after assessment.",
      ],
      [
        "Shockwave for Achilles tendinopathy",
        "£90",
        "LI-ESWT for persistent Achilles tendon pain, combined with loading advice.",
      ],
      [
        "Shockwave for shoulder calcific / tendon pain",
        "£90",
        "Focused shockwave for selected chronic shoulder tendon problems after screening.",
      ],
      [
        "Men's health & ED shockwave protocol",
        "£110",
        "Confidential 30-minute LI-ESWT men's health / ED protocol. Drug-free, non-invasive care in a private setting.",
      ],
      [
        "Erectile dysfunction LI-ESWT Charlton",
        "£110",
        "Discreet vascular LI-ESWT pathway for men seeking a non-drug, non-surgical option in Charlton SE7.",
      ],
      [
        "Deep tissue massage Charlton",
        "£60",
        "45-minute deep tissue massage for chronic muscular tightness, training load, and desk-related tension.",
      ],
      [
        "Sports massage therapy",
        "£60",
        "Firm soft-tissue massage for athletes and active people before or after heavy training blocks.",
      ],
      [
        "Medical acupuncture / dry needling",
        "+£20",
        "Western medical acupuncture or dry-needling style care for trigger points — standalone focus or +£20 add-on.",
      ],
      [
        "Electroacupuncture pain relief",
        "+£20",
        "Electroacupuncture as an adjunct for localised muscle and joint irritability when clinically useful.",
      ],
      [
        "Cupping therapy for muscle tension",
        "+£15",
        "Optional cupping add-on (+£15) for muscular tightness alongside osteopathy or massage.",
      ],
    ],
  },
  {
    category: "Pregnancy, babies & gentle care",
    services: [
      [
        "Pregnancy osteopathy",
        "From £75",
        "Gentle, trimester-aware osteopathy for pelvic girdle discomfort, lower-back and rib strain during pregnancy.",
      ],
      [
        "SPD / pelvic girdle pain in pregnancy",
        "From £75",
        "Support for pregnancy-related pelvic girdle pain (SPD-type discomfort) with positioning adapted to your trimester.",
      ],
      [
        "Postnatal osteopathy",
        "From £75",
        "Gentle postnatal musculoskeletal care for back, neck, and pelvic strain after birth — pacing adapted to recovery.",
      ],
      [
        "Cranial osteopathy",
        "From £75",
        "Subtle cranial osteopathy for people who prefer a quieter treatment style for head, jaw, and tension patterns.",
      ],
      [
        "Paediatric / baby osteopathy",
        "From £75",
        "Soft, parent-led osteopathic care for infants and children in a calm private setting.",
      ],
      [
        "Infant unsettledness & feeding-position support",
        "From £75",
        "Gentle paediatric osteopathy with parent guidance around comfort and positioning — not a medical diagnosis service.",
      ],
      [
        "Elderly / older adult osteopathy",
        "From £75",
        "Adapted osteopathy for older adults with stiffness, balance-related joint ache, or osteoarthritis discomfort.",
      ],
    ],
  },
  {
    category: "Home visits",
    services: [
      [
        "Home visit osteopathy — initial",
        "£120",
        "60-minute initial osteopathy at your home when clinic travel is difficult. Local Charlton / SE London — confirm address first.",
      ],
      [
        "Home visit osteopathy — follow-up",
        "£100",
        "30-minute follow-up home osteopathy after an initial home assessment.",
      ],
      [
        "Mobile osteopath Charlton & SE London",
        "From £100",
        "Mobile / home-visit osteopathy for limited mobility, post-injury recovery, or carers who cannot easily leave home.",
      ],
    ],
  },
];

const gbpMinimumSet = [
  "Initial osteopathy consultation & treatment — £75",
  "Follow-up osteopathic treatment — £60",
  "Lower back pain treatment — From £75",
  "Neck pain osteopathy — From £75",
  "Sciatica treatment — From £75",
  "Frozen shoulder osteopathy — From £75",
  "Plantar fasciitis / heel pain treatment — From £75",
  "Sports injury osteopathy — From £75",
  "Focused shockwave therapy (LI-ESWT) — £90",
  "Deep tissue massage Charlton — £60",
  "Men's health & ED shockwave protocol — £110",
  "Home visit osteopathy — initial — £120",
  "Pregnancy osteopathy — From £75",
  "Running injury clinic — From £75",
  "TMJ / jaw pain osteopathy — From £75",
];

console.log("=== GBP ops pack ===\n");
console.log("1. Profile basics");
console.log(`   Name: ${site.name}`);
console.log("   Primary category: Osteopath");
console.log(`   Phone: ${site.phone}`);
console.log(`   Website: ${site.websiteUrl}`);
console.log(`   Address: ${site.address}`);
console.log(`
2. Hours (clinic open hours):
   Monday     09:00–20:00
   Tuesday    09:00–20:00
   Wednesday  09:00–20:00
   Thursday   09:00–20:00
   Friday     09:00–20:00
   Saturday   09:00–20:00
   Sunday     09:00–20:00
`);

console.log("3. Services — paste into GBP → Edit profile → Services:\n");
console.log(
  "   Tip: add priced appointment types first, then condition names for search.\n",
);
console.log("   Show standard fees only; put the 10% NHS/student discount in the business description or a Google post.\n");
for (const group of gbpServiceGroups) {
  console.log(`   ### ${group.category}`);
  for (const [name, price, description] of group.services) {
    console.log(`   Service: ${name}`);
    console.log(`   Price:   ${price}`);
    console.log(`   Desc:    ${description}`);
    console.log("");
  }
}
console.log("   --- Minimum 10-service starter set ---");
for (const [i, line] of gbpMinimumSet.entries()) {
  console.log(`   ${i + 1}. ${line}`);
}
console.log("");

console.log("4. Q&A — seed these in GBP (copy/paste):\n");
for (const [i, [q, a]] of faqs.entries()) {
  console.log(`   Q${i + 1}. ${q}`);
  console.log(`   A${i + 1}. ${a}\n`);
}

console.log("5. Photos (refresh monthly):");
console.log("   - Pharmacy / The Village approach (exterior)");
console.log("   - Treatment room");
console.log("   - Austin (practitioner)");
console.log("");

console.log("6. Weekly posts (rotate):\n");
for (const [theme, body] of posts) {
  console.log(`   — ${theme} —`);
  console.log(`   ${body.replace(/\n/g, "\n   ")}\n`);
}

console.log("7. Review engine:");
console.log(`   Google reviews URL: ${site.googleReviewsUrl}`);
console.log(`   WhatsApp clinic: ${site.whatsappUrl}`);
console.log(
  "   After suitable visits: send reviews URL via WhatsApp/SMS; reply within 48h.",
);
console.log(`   Site helper page: ${site.websiteUrl}/reviews`);
console.log("\n8. Walk-in video (Days 61–90): 15–30s from The Village into pharmacy counter → osteopathy room.");
