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

console.log("3. Q&A — seed these in GBP (copy/paste):\n");
for (const [i, [q, a]] of faqs.entries()) {
  console.log(`   Q${i + 1}. ${q}`);
  console.log(`   A${i + 1}. ${a}\n`);
}

console.log("4. Photos (refresh monthly):");
console.log("   - Pharmacy / The Village approach (exterior)");
console.log("   - Treatment room");
console.log("   - Austin (practitioner)");
console.log("");

console.log("5. Weekly posts (rotate):\n");
for (const [theme, body] of posts) {
  console.log(`   — ${theme} —`);
  console.log(`   ${body.replace(/\n/g, "\n   ")}\n`);
}

console.log("6. Review engine:");
console.log(`   Google reviews URL: ${site.googleReviewsUrl}`);
console.log(`   WhatsApp clinic: ${site.whatsappUrl}`);
console.log(
  "   After suitable visits: send reviews URL via WhatsApp/SMS; reply within 48h.",
);
console.log(`   Site helper page: ${site.websiteUrl}/reviews`);
console.log("\n7. Walk-in video (Days 61–90): 15–30s from The Village into pharmacy counter → osteopathy room.");
