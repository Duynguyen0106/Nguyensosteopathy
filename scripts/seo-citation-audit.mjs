/**
 * Citation NAP / hours audit against the canonical clinic facts.
 * Fetches public directory pages when reachable and flags Wednesday-open mismatches.
 *
 * Usage: node scripts/seo-citation-audit.mjs
 */
const nap = {
  name: "Nguyen's Osteopathic Clinic",
  phone: "07882 843513",
  phoneE164: "+447882843513",
  email: "nguyensosteopathy@gmail.com",
  website: "https://www.nguyensosteopathy.com",
  line1: "52 Powis Street",
  line2: "Woolwich, London, SE18 6LQ",
  venue: "St James Pharmacy & Travel Clinic",
  bookable: {
    open: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    closed: ["Wednesday", "Sunday"],
    weekday: "09:00–18:00",
    saturday: "09:00–17:30",
  },
};

const directories = [
  {
    id: "yell",
    label: "Yell",
    url: "https://www.yell.com/s/osteopaths-woolwich.html",
    note: "Search listing; open clinic profile and confirm Wednesday CLOSED",
  },
  {
    id: "gosc",
    label: "GOsC Register",
    url: "https://www.osteopathy.org.uk/register-search/registrants/003WT00000T8U4XYAV/",
    note: "Registration must stay Fully Registered; link also on site About",
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/Nguyensosteopathy",
    note: "Hours + address + website button",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/austin-nguyen-do",
    note: "Location Woolwich / osteopath wording",
  },
  {
    id: "apple",
    label: "Apple Maps",
    url: "https://maps.apple.com/?q=Nguyen%27s+Osteopathic+Clinic+Woolwich",
    note: "Confirm NAP + Wednesday closed",
  },
  {
    id: "bing",
    label: "Bing Places",
    url: "https://www.bing.com/maps?q=Nguyen%27s+Osteopathic+Clinic+Woolwich",
    note: "Confirm NAP + Wednesday closed",
  },
  {
    id: "google",
    label: "Google Business Profile",
    url: "https://maps.app.goo.gl/XgHpsXAy1FmZKibn9",
    note: "Source of truth for reviews; hours = bookable osteopathy",
  },
];

console.log("=== Citation NAP audit ===\n");
console.log("Canonical NAP (from site.ts):");
console.log(`  Name:    ${nap.name}`);
console.log(`  Phone:   ${nap.phone} (${nap.phoneE164})`);
console.log(`  Email:   ${nap.email}`);
console.log(`  Website: ${nap.website}`);
console.log(`  Address: ${nap.venue}, ${nap.line1}, ${nap.line2}`);
console.log("  Bookable hours:");
console.log(
  `    ${nap.bookable.open.join(", ")} — weekdays ${nap.bookable.weekday}; Sat ${nap.bookable.saturday}`,
);
console.log(`    CLOSED: ${nap.bookable.closed.join(", ")}`);
console.log("");

console.log("Directories to verify (manual open + tick):\n");
for (const d of directories) {
  console.log(`  [ ] ${d.label}`);
  console.log(`      ${d.url}`);
  console.log(`      ${d.note}`);
  console.log("");
}

console.log("Fetch smoke (best-effort; many directories block bots):\n");
for (const d of directories) {
  try {
    const res = await fetch(d.url, {
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; NguyenOsteopathyCitationAudit/1.0)",
      },
      signal: AbortSignal.timeout(12000),
    });
    const text = (await res.text()).slice(0, 200_000);
    const lower = text.toLowerCase();
    const wedOpen =
      /wednesday[^.]{0,80}(open|9:00|09:00|9am)/i.test(text) ||
      /wed[^a-z][^.]{0,40}(9:00|09:00|9am)/i.test(text);
    const wedClosed =
      /wednesday[^.]{0,80}(closed|close)/i.test(text) ||
      /closed[^.]{0,40}wednesday/i.test(text);
    const hasPhone =
      lower.includes("07882") || lower.includes("7882843513") || lower.includes("+447882");
    const hasPowis = lower.includes("powis");
    console.log(
      `  ${d.id}: HTTP ${res.status} phone=${hasPhone ? "yes" : "?"} powis=${hasPowis ? "yes" : "?"} wedClosed=${wedClosed ? "yes" : "?"} wedOpenHint=${wedOpen ? "CHECK" : "no"}`,
    );
  } catch (err) {
    console.log(`  ${d.id}: fetch failed (${err.cause?.code ?? err.message}) — verify manually`);
  }
}

console.log(`
Fix rule: if any directory shows Wednesday open for osteopathy, update it to CLOSED.
Pharmacy building access must not be listed as osteopathy bookable hours.
`);
