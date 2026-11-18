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

/** Paste into GBP → Edit profile → Services. Prices match src/lib/site.ts. */
const gbpServiceGroups = [
  {
    category: "Osteopathy appointments",
    services: [
      [
        "Initial osteopathy consultation & treatment",
        "£75",
        "60-minute first visit with Austin Duy Nguyen, GOsC-registered osteopath. Full case history, movement assessment, explanation of findings, and hands-on treatment when appropriate. No GP referral needed.",
      ],
      [
        "Follow-up osteopathic treatment",
        "£60",
        "30-minute follow-up for ongoing osteopathic care. Progress review, hands-on treatment, and updated home advice.",
      ],
    ],
  },
  {
    category: "Back, neck & spine",
    services: [
      [
        "Back pain osteopathy",
        "From £75",
        "Assessment and hands-on care for lower-back pain, stiffness, and mechanical spinal irritation in Charlton SE7.",
      ],
      [
        "Neck pain osteopathy",
        "From £75",
        "Treatment for neck pain, desk strain, and restricted upper-spine movement. Private one-to-one care inside Village Pharmacy.",
      ],
      [
        "Sciatica treatment",
        "From £75",
        "Osteopathic assessment for sciatica-type leg pain, including screening for red flags and a clear plan for recovery.",
      ],
      [
        "Disc-related back pain care",
        "From £75",
        "Careful assessment and hands-on treatment for disc-related stiffness and flare-ups, with advice you can keep between visits.",
      ],
    ],
  },
  {
    category: "Headaches & joints",
    services: [
      [
        "Tension headache osteopathy",
        "From £75",
        "Osteopathy for tension-type and neck-related headaches, focusing on upper-neck mechanics and shoulder load.",
      ],
      [
        "Shoulder pain treatment",
        "From £75",
        "Hands-on osteopathy for shoulder stiffness, overuse irritation, and movement restriction after sport or desk work.",
      ],
      [
        "Hip pain osteopathy",
        "From £75",
        "Assessment and treatment for hip stiffness, walking-related ache, and peri-hip soft-tissue irritation.",
      ],
      [
        "Knee pain osteopathy",
        "From £75",
        "Osteopathic care for knee irritability linked to load, stairs, sport, or desk-to-training spikes.",
      ],
      [
        "Jaw / TMJ osteopathy",
        "From £75",
        "Gentle assessment for jaw tension, clenching-related discomfort, and related neck contribution.",
      ],
    ],
  },
  {
    category: "Sports & rehab",
    services: [
      [
        "Sports injury osteopathy",
        "From £75",
        "Assessment and rehab planning for strains, sprains, and overuse injuries from running, gym, or team sport.",
      ],
      [
        "Running injury assessment",
        "From £75",
        "Osteopathy for runners with Achilles, shin, knee, or lower-back niggles — load advice included.",
      ],
      [
        "Desk & posture strain treatment",
        "From £75",
        "Care for hybrid and office workers with neck, upper-back, and wrist/forearm strain from long sits.",
      ],
    ],
  },
  {
    category: "Specialist therapies",
    services: [
      [
        "Focused shockwave therapy (LI-ESWT)",
        "£90",
        "30-minute focused low-intensity shockwave for stubborn tendon problems after clinical screening — heel, elbow, Achilles, and selected shoulder tendons.",
      ],
      [
        "Men's health & ED shockwave protocol",
        "£110",
        "Confidential 30-minute LI-ESWT men's health / ED protocol in a private setting. Drug-free, non-invasive care with clear screening first.",
      ],
      [
        "Deep tissue massage",
        "£60",
        "45-minute deep tissue massage for chronic muscular tightness, training load, and desk-related tension.",
      ],
      [
        "Medical acupuncture / electroacupuncture",
        "+£20",
        "Western medical acupuncture or electroacupuncture as a standalone focus or +£20 add-on when clinically useful for trigger points and localised pain.",
      ],
      [
        "Cupping therapy add-on",
        "+£15",
        "Optional cupping add-on (+£15) for muscular tightness when clinically useful alongside osteopathy or massage.",
      ],
    ],
  },
  {
    category: "Pregnancy, cranial & paediatric",
    services: [
      [
        "Pregnancy osteopathy",
        "From £75",
        "Gentle, trimester-aware osteopathy for pelvic girdle discomfort, lower-back and rib strain during pregnancy.",
      ],
      [
        "Cranial osteopathy",
        "From £75",
        "Subtle, gentle cranial osteopathy for people who prefer a quieter treatment style for head, jaw, and tension patterns.",
      ],
      [
        "Paediatric osteopathy",
        "From £75",
        "Soft, parent-led osteopathic care for infants and children in a calm private setting.",
      ],
    ],
  },
  {
    category: "Home visits",
    services: [
      [
        "Home visit osteopathy — initial",
        "£120",
        "60-minute initial osteopathy at your home when clinic travel is difficult. Local Charlton / SE London coverage — confirm address first.",
      ],
      [
        "Home visit osteopathy — follow-up",
        "£100",
        "30-minute follow-up home osteopathy visit after an initial home assessment.",
      ],
    ],
  },
];

const gbpMinimumSet = [
  "Initial osteopathy consultation & treatment — £75",
  "Follow-up osteopathic treatment — £60",
  "Focused shockwave therapy (LI-ESWT) — £90",
  "Deep tissue massage — £60",
  "Home visit osteopathy — initial — £120",
  "Back pain osteopathy — From £75",
  "Neck pain osteopathy — From £75",
  "Sciatica treatment — From £75",
  "Sports injury osteopathy — From £75",
  "Men's health & ED shockwave protocol — £110",
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
