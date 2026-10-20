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
  address: "St James Pharmacy & Travel Clinic, 52 Powis Street, Woolwich, London, SE18 6LQ",
};

const faqs = [
  [
    "Do I need a GP referral to see an osteopath in Woolwich?",
    "No. You can book Nguyen's Osteopathic Clinic directly online or by phone — a GP referral is not required.",
  ],
  [
    "Where is the clinic inside St James Pharmacy?",
    "We are inside St James Pharmacy & Travel Clinic at 52 Powis Street, Woolwich SE18 6LQ. Ask at the pharmacy counter on arrival and staff will direct you to the osteopathy room.",
  ],
  [
    "What days can I book osteopathy?",
    "Bookable osteopathy days are Monday, Tuesday, Thursday, Friday and Saturday. We are closed Wednesday and Sunday. Live slots are shown on the booking page.",
  ],
  [
    "Is parking available near Powis Street?",
    "Short-stay Woolwich town-centre car parks and nearby on-street bays serve the clinic. Allow a few extra minutes on busy days. Woolwich Arsenal station is a short walk.",
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
    `After your visit, open our Google reviews link and share honest feedback — it helps Woolwich neighbours choose care: ${site.googleReviewsUrl}`,
  ],
];

const posts = [
  [
    "Book online",
    `Looking for an osteopath in Woolwich SE18? Book online with Austin Duy Nguyen (GOsC) inside St James Pharmacy, 52 Powis Street — no GP referral needed.\n\nBook: ${site.websiteUrl}/book`,
  ],
  [
    "Home visits",
    `Home-visit osteopathy near Woolwich when clinic travel is hard. Initial visit £120 (60 min); follow-up £100 (30 min). Message us to confirm your address.\n\nDetails: ${site.websiteUrl}/services/home-visits`,
  ],
  [
    "Vietnamese care",
    `Cần osteopath nói tiếng Việt tại Woolwich? Austin Duy Nguyen khám bằng tiếng Việt hoặc tiếng Anh — trong St James Pharmacy, Powis Street SE18.\n\nĐặt lịch: ${site.websiteUrl}/vi/book`,
  ],
  [
    "Shockwave",
    `Stubborn heel, elbow or Achilles pain in Woolwich? Focused shockwave (LI-ESWT) is available after clinical screening — £90 per session.\n\nLearn more: ${site.websiteUrl}/services/focused-shockwave`,
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
2. Hours (bookable osteopathy — NOT pharmacy-only access):
   Monday     09:00–18:00
   Tuesday    09:00–18:00
   Wednesday  CLOSED
   Thursday   09:00–18:00
   Friday     09:00–18:00
   Saturday   09:00–17:30
   Sunday     CLOSED
`);

console.log("3. Q&A — seed these in GBP (copy/paste):\n");
for (const [i, [q, a]] of faqs.entries()) {
  console.log(`   Q${i + 1}. ${q}`);
  console.log(`   A${i + 1}. ${a}\n`);
}

console.log("4. Photos (refresh monthly):");
console.log("   - Pharmacy / Powis Street approach (exterior)");
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
console.log("\n7. Walk-in video (Days 61–90): 15–30s from Powis Street into pharmacy counter → osteopathy room.");
