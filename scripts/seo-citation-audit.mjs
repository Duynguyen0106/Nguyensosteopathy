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
  line1: "9 The Village",
  line2: "Charlton, London, SE7 8UG",
  venue: "Village Pharmacy",
  bookable: {
    open: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    closed: [],
    weekday: "09:00–20:00",
    saturday: "09:00–20:00",
  },
};

const directories = [
  {
    id: "yell",
    label: "Yell",
    url: "https://www.yell.com/s/osteopaths-charlton.html",
    note: "Search listing; open clinic profile and confirm Mon–Sun 09:00–20:00",
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
    note: "Location Charlton / osteopath wording",
  },
  {
    id: "apple",
    label: "Apple Maps",
    url: "https://maps.apple.com/?q=Nguyen%27s+Osteopathic+Clinic+Charlton",
    note: "Confirm NAP + Mon–Sun 09:00–20:00",
  },
  {
    id: "bing",
    label: "Bing Places",
    url: "https://www.bing.com/maps?q=Nguyen%27s+Osteopathic+Clinic+Charlton",
    note: "Confirm NAP + Mon–Sun 09:00–20:00",
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
  `    ${nap.bookable.open.join(", ")} — ${nap.bookable.weekday}`,
);
console.log(
  nap.bookable.closed.length
    ? `    CLOSED: ${nap.bookable.closed.join(", ")}`
    : "    CLOSED: (none — open every day)",
);
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
    const hasVillage = lower.includes("village") || lower.includes("charlton");
    console.log(
      `  ${d.id}: HTTP ${res.status} phone=${hasPhone ? "yes" : "?"} village=${hasVillage ? "yes" : "?"} wedClosed=${wedClosed ? "yes" : "?"} wedOpenHint=${wedOpen ? "CHECK" : "no"}`,
    );
  } catch (err) {
    console.log(`  ${d.id}: fetch failed (${err.cause?.code ?? err.message}) — verify manually`);
  }
}

console.log(`
Fix rule: directories should show Monday–Sunday 09:00–20:00 for clinic hours.
`);
