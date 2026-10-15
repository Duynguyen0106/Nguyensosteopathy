/**
 * Validates MedicalClinic / LocalBusiness JSON-LD emitted in the document head.
 *
 * Usage (dev server on :3000, or pass a URL):
 *   node scripts/validate-jsonld.mjs
 *   node scripts/validate-jsonld.mjs http://127.0.0.1:3000/
 */
const url = process.argv[2] ?? "http://127.0.0.1:3000/";

const requiredClinicFields = [
  "name",
  "telephone",
  "address",
  "geo",
  "openingHoursSpecification",
  "availableService",
  "sameAs",
];

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

const html = await fetch(url).then((r) => {
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r.text();
});

const inHead = /<head[\s\S]*?<\/head>/i.exec(html)?.[0] ?? "";
if (!inHead) {
  fail("No <head> found in HTML");
  process.exit(1);
}

const scripts = [...inHead.matchAll(
  /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
)].map((m) => m[1].trim());

if (scripts.length === 0) {
  // Next may stream JSON-LD without wrapping in a detectable head on some renders;
  // fall back to full document scripts with our ids.
  const byId = [...html.matchAll(
    /<script[^>]*id=["']jsonld-medical-clinic["'][^>]*>([\s\S]*?)<\/script>/i,
  )].map((m) => m[1].trim());
  if (byId.length) {
    scripts.push(...byId);
    ok("Found jsonld-medical-clinic script (body/head streaming)");
  }
}

ok(`Found ${scripts.length} JSON-LD script(s) in first parse`);

let clinic;
let practitioner;
for (const raw of [
  ...scripts,
  ...[...html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )].map((m) => m[1].trim()),
]) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail(`Invalid JSON in ld+json script: ${e.message}`);
    continue;
  }
  const types = Array.isArray(data["@type"]) ? data["@type"] : [data["@type"]];
  if (types.includes("MedicalClinic") || types.includes("LocalBusiness")) {
    clinic = data;
  }
  if (types.includes("Physician")) {
    practitioner = data;
  }
}

if (!clinic) {
  fail("No MedicalClinic/LocalBusiness JSON-LD found");
  process.exit(1);
}

const types = Array.isArray(clinic["@type"]) ? clinic["@type"] : [clinic["@type"]];
if (!types.includes("MedicalClinic")) fail('@type missing MedicalClinic');
else ok(`@type includes MedicalClinic (${types.join(", ")})`);
if (!types.includes("LocalBusiness")) fail('@type missing LocalBusiness');
else ok("@type includes LocalBusiness");

if (clinic.name !== "Nguyen's Osteopathic Clinic") {
  fail(`Unexpected name: ${clinic.name}`);
} else ok(`name: ${clinic.name}`);

if (clinic.telephone !== "+447882843513") {
  fail(`Unexpected telephone: ${clinic.telephone}`);
} else ok(`telephone: ${clinic.telephone}`);

const addr = clinic.address ?? {};
const street = String(addr.streetAddress ?? "");
if (!street.includes("52 Powis Street") || !street.includes("St James Pharmacy")) {
  fail(`Full address incomplete: ${street}`);
} else ok(`address.streetAddress: ${street}`);
if (addr.addressLocality !== "Woolwich") fail("addressLocality missing Woolwich");
if (addr.postalCode !== "SE18 6LQ") fail("postalCode missing SE18 6LQ");
if (addr.addressCountry !== "GB") fail("addressCountry missing GB");
else ok("address locality/postal/country OK");

if (typeof clinic.geo?.latitude !== "number" || typeof clinic.geo?.longitude !== "number") {
  fail("geo coordinates missing");
} else ok(`geo: ${clinic.geo.latitude}, ${clinic.geo.longitude}`);

if (!Array.isArray(clinic.openingHoursSpecification) || clinic.openingHoursSpecification.length < 2) {
  fail("openingHoursSpecification incomplete");
} else {
  ok(`openingHoursSpecification: ${clinic.openingHoursSpecification.length} entries`);
  console.log(JSON.stringify(clinic.openingHoursSpecification, null, 2));
}

if (!Array.isArray(clinic.availableService) || clinic.availableService.length < 5) {
  fail("availableService (services) incomplete");
} else {
  ok(`availableService: ${clinic.availableService.length} services`);
  console.log(clinic.availableService.map((s) => s.name).join(", "));
}

const sameAs = clinic.sameAs ?? [];
const hasFb = sameAs.some((u) => String(u).includes("facebook.com"));
const hasGoogle = sameAs.some(
  (u) =>
    String(u).includes("google") ||
    String(u).includes("maps.app.goo.gl") ||
    String(u).includes("maps?cid="),
);
if (!hasFb || !hasGoogle) fail(`sameAs incomplete: ${JSON.stringify(sameAs)}`);
else ok(`sameAs: ${sameAs.join(" | ")}`);

for (const key of requiredClinicFields) {
  if (clinic[key] == null) fail(`Missing required field: ${key}`);
}

if (!practitioner) {
  fail("Practitioner Physician JSON-LD (GOsC) missing");
} else {
  const reg = practitioner.identifier?.value;
  const member = practitioner.memberOf?.name;
  if (reg !== "12332") fail(`GOsC reg expected 12332, got ${reg}`);
  else ok(`GOsC registration: ${reg}`);
  if (!String(member || "").includes("Osteopathic Council")) {
    fail(`GOsC memberOf missing: ${member}`);
  } else ok(`GOsC memberOf: ${member}`);
}

if (process.exitCode) {
  console.error("\nJSON-LD validation FAILED");
  process.exit(process.exitCode);
}

console.log("\nJSON-LD validation PASSED");
console.log(
  JSON.stringify(
    {
      "@type": types,
      name: clinic.name,
      telephone: clinic.telephone,
      address: clinic.address,
      geo: clinic.geo,
      sameAs: clinic.sameAs,
      serviceCount: clinic.availableService.length,
      goscReg: practitioner?.identifier?.value,
    },
    null,
    2,
  ),
);
