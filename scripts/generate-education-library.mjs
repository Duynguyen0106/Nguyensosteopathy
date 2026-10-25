/**
 * Build original paraphrased education-library articles from the private
 * Adobe QRG corpus. Does NOT copy OCR prose — matches known topic labels
 * inside noisy OCR and writes clinic-voice copy.
 *
 * Input:  /tmp/adobe-guide/corpus/pages.json
 * Output: src/data/education-library.json
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CORPUS = "/tmp/adobe-guide/corpus/pages.json";
const OUT = path.join(ROOT, "src/data/education-library.json");

/** Common ingredients / themes to detect in OCR (longest first). */
const KNOWN_TOPICS = [
  "5-HTP",
  "acetyl-l-carnitine",
  "alpha lipoic acid",
  "amino acid",
  "ashwagandha",
  "astragalus",
  "b-complex",
  "b complex",
  "beta alanine",
  "beta-alanine",
  "black cohosh",
  "boswellia",
  "branched chain",
  "bcaa",
  "bromelain",
  "calcium",
  "cbd",
  "chondroitin",
  "chromium",
  "cinnamon",
  "citicoline",
  "citrulline",
  "CLA",
  "co enzyme q10",
  "coenzyme q10",
  "coq10",
  "cod liver oil",
  "collagen",
  "cordyceps",
  "cranberry",
  "creatine",
  "curcumin",
  "dandelion",
  "devil's claw",
  "devils claw",
  "digestive enzyme",
  "echinacea",
  "elderberry",
  "electrolyte",
  "evening primrose",
  "fenugreek",
  "feverfew",
  "fish oil",
  "flaxseed",
  "folic acid",
  "folate",
  "garlic",
  "ginger",
  "ginkgo",
  "ginseng",
  "glucosamine",
  "glutamine",
  "gotu kola",
  "grape seed",
  "green tea",
  "guarana",
  "hawthorn",
  "holy basil",
  "hyaluronic acid",
  "iodine",
  "iron",
  "krill oil",
  "l-arginine",
  "l-carnitine",
  "l-glutamine",
  "l-lysine",
  "l-theanine",
  "l-tryptophan",
  "l-tyrosine",
  "lecithin",
  "lion's mane",
  "lions mane",
  "lutein",
  "lycopene",
  "maca",
  "magnesium",
  "manuka honey",
  "melatonin",
  "milk thistle",
  "msm",
  "multivitamin",
  "nac",
  "n-acetyl cysteine",
  "nettle",
  "niacin",
  "omega-3",
  "omega 3",
  "oregano oil",
  "peppermint",
  "phosphatidylserine",
  "potassium",
  "probiotic",
  "protein",
  "psyllium",
  "quercetin",
  "red clover",
  "reishi",
  "resveratrol",
  "rhodiola",
  "riboflavin",
  "rosehip",
  "saw palmetto",
  "selenium",
  "slippery elm",
  "spirulina",
  "st john",
  "st. john",
  "taurine",
  "tea tree",
  "tissue salt",
  "turmeric",
  "valerian",
  "vitamin a",
  "vitamin b1",
  "vitamin b12",
  "vitamin b6",
  "vitamin c",
  "vitamin d",
  "vitamin e",
  "vitamin k",
  "whey protein",
  "zinc",
  "zma",
  // ailments / themes
  "acid reflux",
  "anxiety",
  "arthritis",
  "athlete",
  "bad breath",
  "bloating",
  "blood pressure",
  "bone health",
  "cholesterol",
  "colds",
  "constipation",
  "cramp",
  "depression",
  "diabetes",
  "diarrhoea",
  "eczema",
  "energy",
  "fatigue",
  "flu",
  "gout",
  "hair",
  "hay fever",
  "headache",
  "heartburn",
  "hives",
  "immunity",
  "indigestion",
  "inflammation",
  "insomnia",
  "joint pain",
  "menopause",
  "migraine",
  "muscle",
  "osteoporosis",
  "pms",
  "pregnancy",
  "sciatica",
  "sinus",
  "sleep",
  "sports",
  "stress",
  "tendon",
  "thyroid",
  "uti",
  "varicose",
  "weight loss",
  "wound",
].sort((a, b) => b.length - a.length);

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function titleCaseTopic(label) {
  const special = {
    "5-htp": "5-HTP",
    cbd: "CBD",
    cla: "CLA",
    coq10: "CoQ10",
    bcaa: "BCAAs",
    msm: "MSM",
    nac: "NAC",
    zma: "ZMA",
    pms: "PMS",
    uti: "UTI",
    "omega-3": "Omega-3",
    "omega 3": "Omega-3",
    "co enzyme q10": "Coenzyme Q10",
    "coenzyme q10": "Coenzyme Q10",
    "n-acetyl cysteine": "N-acetyl cysteine",
    "l-arginine": "L-arginine",
    "l-carnitine": "L-carnitine",
    "l-glutamine": "L-glutamine",
    "l-lysine": "L-lysine",
    "l-theanine": "L-theanine",
    "l-tryptophan": "L-tryptophan",
    "l-tyrosine": "L-tyrosine",
    "vitamin b12": "Vitamin B12",
    "vitamin b6": "Vitamin B6",
    "vitamin b1": "Vitamin B1",
    "vitamin d": "Vitamin D",
    "vitamin c": "Vitamin C",
    "vitamin e": "Vitamin E",
    "vitamin k": "Vitamin K",
    "vitamin a": "Vitamin A",
  };
  const key = label.toLowerCase();
  if (special[key]) return special[key];
  return label
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function extractTopics(page) {
  const hay = `${(page.headings || []).join(" ")} ${page.text || ""}`.toLowerCase();
  const found = [];
  for (const topic of KNOWN_TOPICS) {
    const re = new RegExp(
      `(^|[^a-z0-9])${topic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`,
      "i",
    );
    if (re.test(hay)) found.push(topic);
    if (found.length >= 5) break;
  }
  return found;
}

function sectionKind(section) {
  if (section === "products-a-z") return "product";
  if (section === "ailments") return "ailment";
  if (section?.includes("sports") || section?.includes("weight")) return "sports";
  if (["forms", "reference", "glossary", "nrv", "excipients"].includes(section))
    return "reference";
  if (section === "front-matter" || section === "contents") return "front";
  return "general";
}

function buildArticle(page) {
  const kind = sectionKind(page.section);
  const topics = extractTopics(page).map(titleCaseTopic);
  const pageNo = page.page;

  let primary;
  if (kind === "front" && pageNo === 1) {
    primary = "How to use this supplement library";
  } else if (kind === "front") {
    primary = "Library contents map";
  } else if (topics[0]) {
    primary = topics[0];
    if (topics.length > 1) {
      // keep primary as first; mention others in summary
    }
  } else if (kind === "ailment") {
    primary = `Wellness themes (sheet ${pageNo})`;
  } else if (kind === "product") {
    primary = `Supplement themes (sheet ${pageNo})`;
  } else if (kind === "sports") {
    primary = `Sports & recovery themes (sheet ${pageNo})`;
  } else if (kind === "reference") {
    primary = `Label & forms themes (sheet ${pageNo})`;
  } else {
    primary = `Education notes (sheet ${pageNo})`;
  }

  const others = topics.slice(1, 4);
  const topicList =
    topics.length > 0 ? topics.join(", ") : "general nutrition and recovery themes";

  const slug = `p${String(pageNo).padStart(3, "0")}-${slugify(primary)}`;

  let summary;
  let sections;
  let caveats;

  if (kind === "front" && pageNo === 1) {
    summary =
      "Orientation for patients and practitioners using this clinic education library — how entries are framed and what they are not.";
    sections = [
      {
        heading: "What this library is",
        body: "These pages are original clinic education notes inspired by common supplement and wellness questions that arise in osteopathic practice. They are written for both patients and practitioners. They are not a pharmacy training manual, product catalogue, or prescribing protocol.",
      },
      {
        heading: "How to read an entry",
        body: "Each page introduces topics in plain English, notes why they come up in MSK or recovery conversations, and lists safety caveats. Patients should treat them as background reading before speaking with a clinician. Practitioners should treat them as conversation prompts — not as clinical directives.",
      },
      {
        heading: "What we do not do here",
        body: "We do not endorse brands, quote retail scripts, or replace GP, pharmacist, or dietitian advice. Food supplements are not medicines and are not a substitute for assessment, rehab, or prescribed care.",
      },
    ];
    caveats = [
      "Educational only for patients and practitioners.",
      "Check medicines, pregnancy, and long-term conditions with a pharmacist or GP before starting supplements.",
    ];
  } else if (kind === "front") {
    summary =
      "A map of how this education library is organised for patients and practitioners browsing nutrition and recovery topics.";
    sections = [
      {
        heading: "Library map",
        body: "Entries cover common supplement ingredients, general wellness themes, sports recovery questions, and label-reading notes. Browse from the library index or related nutrition guides.",
      },
      {
        heading: "Dual audience",
        body: "Patients can use these pages to prepare questions for clinic. Practitioners can use them as teaching aids and consent/discussion prompts. Neither use replaces individual clinical judgement.",
      },
    ];
    caveats = ["Not a product price list or stock guide."];
  } else if (kind === "product") {
    summary = `Clinic education notes on ${primary}${
      others.length ? ` (also touching ${others.join(", ")})` : ""
    } — for patients and practitioners, not a product recommendation.`;
    sections = [
      {
        heading: "In plain English",
        body: `${primary} often appears in conversations about diet quality, recovery, or general wellness. At Nguyen's Osteopathic Clinic we discuss supplements only as optional adjuncts after understanding load, sleep, and medical context — never as a stand-alone fix for back, neck, or joint pain.`,
      },
      {
        heading: "Why it comes up in clinic",
        body: `People may ask about ${primary} because of marketing claims, pharmacy advice, or something a friend suggested. Useful questions include: What problem are you hoping to change? Have bloods or a GP already reviewed diet? Are you on medicines that interact with concentrates?`,
      },
      {
        heading: "Patient takeaway",
        body: `If you are curious about ${primary}, bring the product label or a photo to your appointment or speak with a pharmacist. Food-first approaches and rehab loading usually matter more for musculoskeletal recovery than any single capsule.`,
      },
      {
        heading: "Practitioner note",
        body: `Use this entry as a discussion scaffold around ${topicList}. Confirm medical history, allergy, pregnancy/breastfeeding, and concurrent medicines before any patient self-supplements. Document advice boundaries clearly — osteopaths do not prescribe medicines.`,
      },
    ];
    caveats = [
      "Not a recommendation to buy or dose any product.",
      "Evidence quality varies widely by ingredient and claim.",
      "Seek urgent care for red-flag neurological or systemic symptoms.",
    ];
  } else if (kind === "ailment") {
    summary = `Education notes linked to ${primary} and related wellness themes — for patients seeking context and practitioners preparing explanations.`;
    sections = [
      {
        heading: "Context first",
        body: `Topics such as ${topicList} may sit beside musculoskeletal care, but many need medical diagnosis before supplement talk. Persistent, severe, or unexplained symptoms belong with your GP or urgent care — not a bottle from the shelf.`,
      },
      {
        heading: "Where osteopathy fits",
        body: "We assess joints, soft tissue, and load patterns. Nutrition questions can support recovery planning, yet they do not replace hands-on care, graded exercise, or medical treatment when those are indicated.",
      },
      {
        heading: "Patient takeaway",
        body: `If ${primary} is part of your concern, describe timing, aggravating factors, and any medicines you already take. Ask whether rehab, pacing, or onward referral should come before experimenting with supplements.`,
      },
      {
        heading: "Practitioner note",
        body: "Screen for red flags and scope boundaries. Prefer evidence-humble language. Signpost pharmacy/GP for interactions and pathology. Keep MSK rehab goals explicit so supplements do not become a distraction from loading plans.",
      },
    ];
    caveats = [
      "Not a diagnostic pathway.",
      "Supplements are not a substitute for indicated medical care.",
    ];
  } else if (kind === "sports") {
    summary = `Sports, training, and recovery education notes covering ${topicList} — for active patients and practitioners coaching load.`;
    sections = [
      {
        heading: "Training load before powders",
        body: "Most sports discomfort improves with smarter volume, recovery days, sleep, and progressive strength. Products discussed in gym culture are optional extras after those basics are honest.",
      },
      {
        heading: `Notes on ${primary}`,
        body: `${primary} may appear in athlete conversations. We keep claims modest: understand the training goal, injury status, and medical history first. Hydration and protein from food cover many everyday needs.`,
      },
      {
        heading: "Practitioner note",
        body: "Tie any supplement discussion to return-to-play criteria and tissue irritability. Avoid implying performance products heal tendons or discs.",
      },
    ];
    caveats = [
      "Not anti-doping or sports-medicine clearance advice.",
      "Check competition rules before using concentrated products.",
    ];
  } else if (kind === "reference") {
    summary = `Label-reading and formulation education (${primary}) for patients and practitioners who want calmer conversations about ingredient lists.`;
    sections = [
      {
        heading: "Why labels look alarming",
        body: "Inactive ingredients (fillers, coatings, acidity regulators) sound chemical but often have ordinary food-tech roles. That does not make every product suitable — it means names alone are a poor scare test.",
      },
      {
        heading: `Focus for this sheet: ${primary}`,
        body: `When reviewing labels that mention ${topicList}, ask what the active dose is, whether you need it, and whether your pharmacist is happy with interactions. Form (tablet, powder, oil) changes absorption and convenience more than marketing does.`,
      },
      {
        heading: "Practitioner note",
        body: "Help patients prioritise actives and evidence over proprietary blends. Flag allergies (for example lactose, gelatine, or shellfish-derived ingredients) and renal or hepatic cautions where relevant.",
      },
    ];
    caveats = ["Not a full pharmacopoeia.", "When unsure, defer to a pharmacist."];
  } else {
    summary = `Clinic education notes (sheet ${pageNo}) on ${topicList} for patients and practitioners.`;
    sections = [
      {
        heading: "Overview",
        body: `This entry covers ${topicList} in the context of osteopathic clinic education. Use it to prepare questions, not to self-prescribe.`,
      },
      {
        heading: "Shared caution",
        body: "Patients and practitioners should keep MSK assessment and medical advice at the centre. Supplements remain optional adjuncts.",
      },
    ];
    caveats = ["Educational only."];
  }

  const tags = page.tags || [];
  return {
    slug,
    sourcePage: pageNo,
    section: page.section,
    title: primary,
    summary,
    status: "published",
    topics,
    mskRelevant: tags.includes("msk-relevant"),
    sections,
    caveats,
    faqs: [
      {
        question: "Is this medical advice?",
        answer:
          "No. It is dual-audience education for patients and practitioners at Nguyen's Osteopathic Clinic. Personal advice requires assessment.",
      },
      {
        question: "Can practitioners use this in CPD reflection?",
        answer:
          "Yes as a teaching prompt. It is not a formal CPD certificate or a substitute for regulated learning requirements.",
      },
    ],
  };
}

if (!fs.existsSync(CORPUS)) {
  console.error("Missing corpus at", CORPUS);
  process.exit(1);
}

const pages = JSON.parse(fs.readFileSync(CORPUS, "utf8"));
const articles = pages.map(buildArticle);

const seen = new Set();
for (const article of articles) {
  let slug = article.slug;
  let n = 2;
  while (seen.has(slug)) {
    slug = `${article.slug}-${n++}`;
  }
  article.slug = slug;
  seen.add(slug);
}

const payload = {
  generatedAt: new Date().toISOString(),
  source: "private-paraphrase-from-adobe-qrg-corpus",
  note: "Original clinic-voice articles. OCR prose is not included.",
  count: articles.length,
  articles,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
console.log(`Wrote ${articles.length} articles → ${OUT}`);
const withTopics = articles.filter((a) => a.topics.length).length;
console.log(`With detected topics: ${withTopics}/${articles.length}`);
console.log(
  "Sample:",
  articles
    .filter((a) => a.topics.length)
    .slice(0, 8)
    .map((a) => `${a.sourcePage}:${a.title}`)
    .join(" | "),
);
