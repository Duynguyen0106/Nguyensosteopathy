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
import {
  buildAngledSheetContent,
  buildCombinedThemeContent,
  buildLongFormContent,
  countContentWords,
  getThemeAngle,
} from "./library-sheet-bodies.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CORPUS = "/tmp/adobe-guide/corpus/pages.json";
const OUT = path.join(ROOT, "src/data/education-library.json");
const MIN_WORDS = 500;

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
  "vitamin d3",
  "vitamin d2",
  "vitamin d",
  "vit d3",
  "vit d",
  "vitamin e",
  "vitamin k",
  "whey protein",
  "zinc",
  "zma",
  "krill oil",
  "krilloil",
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

/** Canonical topicKey aliases (lowercase labels → stable key). */
const TOPIC_KEY_ALIASES = {
  "b complex": "b-complex",
  "b-complex": "b-complex",
  "beta alanine": "beta-alanine",
  "beta-alanine": "beta-alanine",
  "branched chain": "bcaa",
  bcaa: "bcaa",
  "co enzyme q10": "coq10",
  "coenzyme q10": "coq10",
  coq10: "coq10",
  "devils claw": "devils-claw",
  "devil's claw": "devils-claw",
  "lions mane": "lions-mane",
  "lion's mane": "lions-mane",
  "n-acetyl cysteine": "nac",
  nac: "nac",
  "omega 3": "omega-3",
  "omega-3": "omega-3",
  "st john": "st-johns-wort",
  "st. john": "st-johns-wort",
  folate: "folic-acid",
  "folic acid": "folic-acid",
  curcumin: "turmeric",
  turmeric: "turmeric",
  glucosamine: "glucosamine",
  chondroitin: "chondroitin",
  "vitamin d3": "vitamin-d",
  "vitamin d2": "vitamin-d",
  "vitamin d": "vitamin-d",
  "vit d3": "vitamin-d",
  "vit d": "vitamin-d",
  "krill oil": "krill-oil",
  krilloil: "krill-oil",
};

/** Browse category for a canonical topic key. */
const TOPIC_CATEGORY = {
  // minerals
  calcium: "minerals",
  chromium: "minerals",
  iodine: "minerals",
  iron: "minerals",
  magnesium: "minerals",
  potassium: "minerals",
  selenium: "minerals",
  zinc: "minerals",
  zma: "minerals",
  // vitamins
  "b-complex": "vitamins",
  "folic-acid": "vitamins",
  lutein: "vitamins",
  lycopene: "vitamins",
  multivitamin: "vitamins",
  niacin: "vitamins",
  riboflavin: "vitamins",
  "vitamin-a": "vitamins",
  "vitamin-b1": "vitamins",
  "vitamin-b12": "vitamins",
  "vitamin-b6": "vitamins",
  "vitamin-c": "vitamins",
  "vitamin-d": "vitamins",
  "vitamin-e": "vitamins",
  "vitamin-k": "vitamins",
  // amino acids / protein
  "5-htp": "amino-acids-protein",
  "acetyl-l-carnitine": "amino-acids-protein",
  "amino-acid": "amino-acids-protein",
  bcaa: "amino-acids-protein",
  "beta-alanine": "amino-acids-protein",
  collagen: "amino-acids-protein",
  creatine: "amino-acids-protein",
  glutamine: "amino-acids-protein",
  "l-arginine": "amino-acids-protein",
  "l-carnitine": "amino-acids-protein",
  "l-glutamine": "amino-acids-protein",
  "l-lysine": "amino-acids-protein",
  "l-theanine": "amino-acids-protein",
  "l-tryptophan": "amino-acids-protein",
  "l-tyrosine": "amino-acids-protein",
  protein: "amino-acids-protein",
  taurine: "amino-acids-protein",
  "whey-protein": "amino-acids-protein",
  // fatty acids
  "cod-liver-oil": "fatty-acids",
  "evening-primrose": "fatty-acids",
  "fish-oil": "fatty-acids",
  flaxseed: "fatty-acids",
  "krill-oil": "fatty-acids",
  "omega-3": "fatty-acids",
  cla: "fatty-acids",
  lecithin: "fatty-acids",
  // herbal / botanicals / other actives
  "alpha-lipoic-acid": "herbal",
  ashwagandha: "herbal",
  astragalus: "herbal",
  "black-cohosh": "herbal",
  boswellia: "herbal",
  bromelain: "herbal",
  cbd: "herbal",
  cinnamon: "herbal",
  citicoline: "herbal",
  citrulline: "herbal",
  coq10: "herbal",
  cordyceps: "herbal",
  cranberry: "herbal",
  dandelion: "herbal",
  "devils-claw": "herbal",
  "digestive-enzyme": "herbal",
  echinacea: "herbal",
  elderberry: "herbal",
  fenugreek: "herbal",
  feverfew: "herbal",
  garlic: "herbal",
  ginger: "herbal",
  ginkgo: "herbal",
  ginseng: "herbal",
  glucosamine: "herbal",
  chondroitin: "herbal",
  "gotu-kola": "herbal",
  "grape-seed": "herbal",
  "green-tea": "herbal",
  guarana: "herbal",
  hawthorn: "herbal",
  "holy-basil": "herbal",
  "hyaluronic-acid": "herbal",
  "lions-mane": "herbal",
  maca: "herbal",
  "manuka-honey": "herbal",
  melatonin: "herbal",
  "milk-thistle": "herbal",
  msm: "herbal",
  nac: "herbal",
  nettle: "herbal",
  "oregano-oil": "herbal",
  peppermint: "herbal",
  phosphatidylserine: "herbal",
  probiotic: "herbal",
  psyllium: "herbal",
  quercetin: "herbal",
  "red-clover": "herbal",
  reishi: "herbal",
  resveratrol: "herbal",
  rhodiola: "herbal",
  rosehip: "herbal",
  "saw-palmetto": "herbal",
  "slippery-elm": "herbal",
  spirulina: "herbal",
  "st-johns-wort": "herbal",
  "tea-tree": "herbal",
  "tissue-salt": "herbal",
  turmeric: "herbal",
  valerian: "herbal",
  // wellness themes
  "acid-reflux": "wellness-themes",
  anxiety: "wellness-themes",
  arthritis: "wellness-themes",
  "bad-breath": "wellness-themes",
  bloating: "wellness-themes",
  "blood-pressure": "wellness-themes",
  "bone-health": "wellness-themes",
  cholesterol: "wellness-themes",
  colds: "wellness-themes",
  constipation: "wellness-themes",
  cramp: "wellness-themes",
  depression: "wellness-themes",
  diabetes: "wellness-themes",
  diarrhoea: "wellness-themes",
  eczema: "wellness-themes",
  energy: "wellness-themes",
  fatigue: "wellness-themes",
  flu: "wellness-themes",
  gout: "wellness-themes",
  hair: "wellness-themes",
  "hay-fever": "wellness-themes",
  headache: "wellness-themes",
  heartburn: "wellness-themes",
  hives: "wellness-themes",
  immunity: "wellness-themes",
  indigestion: "wellness-themes",
  inflammation: "wellness-themes",
  insomnia: "wellness-themes",
  "joint-pain": "wellness-themes",
  menopause: "wellness-themes",
  migraine: "wellness-themes",
  muscle: "wellness-themes",
  osteoporosis: "wellness-themes",
  pms: "wellness-themes",
  pregnancy: "wellness-themes",
  sciatica: "wellness-themes",
  sinus: "wellness-themes",
  sleep: "wellness-themes",
  stress: "wellness-themes",
  tendon: "wellness-themes",
  thyroid: "wellness-themes",
  uti: "wellness-themes",
  varicose: "wellness-themes",
  wound: "wellness-themes",
  // sports / weight
  athlete: "sports-weight",
  electrolyte: "sports-weight",
  sports: "sports-weight",
  "weight-loss": "sports-weight",
};

function canonicalTopicKey(label) {
  const lower = label.toLowerCase().trim();
  if (TOPIC_KEY_ALIASES[lower]) return TOPIC_KEY_ALIASES[lower];
  return slugify(lower);
}

function categoryForTopicKey(topicKey, section) {
  if (TOPIC_CATEGORY[topicKey]) return TOPIC_CATEGORY[topicKey];
  const kind = sectionKind(section);
  if (kind === "front") return "start-here";
  if (kind === "ailment") return "wellness-themes";
  if (kind === "sports") return "sports-weight";
  if (kind === "reference") return "reference-forms";
  if (kind === "product") return "herbal";
  return "wellness-themes";
}

function categoryFromSectionOnly(section) {
  const kind = sectionKind(section);
  if (kind === "front") return "start-here";
  if (kind === "ailment") return "wellness-themes";
  if (kind === "sports") return "sports-weight";
  if (kind === "reference") return "reference-forms";
  return "wellness-themes";
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
    "vitamin d3": "Vitamin D",
    "vitamin d2": "Vitamin D",
    "vit d": "Vitamin D",
    "vit d3": "Vitamin D",
    "vitamin c": "Vitamin C",
    "vitamin e": "Vitamin E",
    "vitamin k": "Vitamin K",
    "vitamin a": "Vitamin A",
    "krill oil": "Krill Oil",
    krilloil: "Krill Oil",
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
    const escaped = topic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Vitamin D OCR often glues the next token ("vitamin dsis", "vitamin d5ug").
    const trailing =
      topic === "vitamin d" || topic === "vit d"
        ? "(?:[^a-z0-9]|$|[a-z0-9])"
        : "([^a-z0-9]|$)";
    const re = new RegExp(`(^|[^a-z0-9])${escaped}${trailing}`, "i");
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

function isIngredientCategory(category) {
  return [
    "minerals",
    "vitamins",
    "amino-acids-protein",
    "fatty-acids",
    "herbal",
  ].includes(category);
}

/** Prefer ingredient topics over wellness themes for product-sheet titles. */
function pickPrimaryTopicLabel(topicLabels, kind) {
  if (!topicLabels.length) return null;
  if (kind !== "product") return topicLabels[0];
  const ingredient = topicLabels.find((label) => {
    const key = canonicalTopicKey(label);
    return isIngredientCategory(categoryForTopicKey(key, "products-a-z"));
  });
  return ingredient || topicLabels[0];
}

function buildArticle(page) {
  const kind = sectionKind(page.section);
  const topics = extractTopics(page).map(titleCaseTopic);
  const pageNo = page.page;
  const primaryTopic = pickPrimaryTopicLabel(topics, kind);

  let primary;
  if (kind === "front" && pageNo === 1) {
    primary = "How to use this supplement library";
  } else if (kind === "front") {
    primary = "Library contents map";
  } else if (primaryTopic) {
    primary = primaryTopic;
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

  const slug = `p${String(pageNo).padStart(3, "0")}-${slugify(primary)}`;
  const tags = page.tags || [];
  const mskRelevant = tags.includes("msk-relevant");
  const longForm = buildLongFormContent({
    kind,
    primary,
    topics,
    pageNo,
    mskRelevant,
  });
  const { summary, sections, caveats, faqs } = longForm;
  const isPlaceholder = /\(sheet \d+\)$/i.test(primary);

  let topicKey;
  let topicTitle;
  let category;
  if (kind === "front") {
    topicKey = pageNo === 1 ? "how-to-use" : "contents-map";
    topicTitle = primary;
    category = "start-here";
  } else if (kind === "reference") {
    // Namespace so reference/forms sheets do not collide with ingredient hubs.
    const baseKey = primaryTopic
      ? canonicalTopicKey(primaryTopic)
      : `sheet-${String(pageNo).padStart(3, "0")}`;
    topicKey = `reference-${baseKey}`;
    topicTitle = primaryTopic
      ? `${primaryTopic} (label notes)`
      : primary;
    category = "reference-forms";
  } else if (primaryTopic) {
    topicKey = canonicalTopicKey(primaryTopic);
    topicTitle =
      canonicalTopicKey(primary) === topicKey ? primary : primaryTopic;
    category = categoryForTopicKey(topicKey, page.section);
  } else {
    topicKey = `sheet-${String(pageNo).padStart(3, "0")}`;
    topicTitle = primary;
    category = categoryFromSectionOnly(page.section);
  }

  const needsReview =
    kind !== "front" && (isPlaceholder || topics.length === 0);
  const variantLabel = `Sheet ${pageNo}`;

  return {
    slug,
    sourcePage: pageNo,
    section: page.section,
    kind,
    category,
    topicKey,
    topicTitle,
    variantLabel,
    needsReview,
    title: primary,
    summary,
    status: "published",
    topics,
    mskRelevant,
    wordCount: countContentWords(longForm),
    sections,
    caveats,
    faqs,
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

/** Group by topicKey, combine multi-sheet themes, angle-differentiate variants. */
const byTopic = new Map();
for (const article of articles) {
  const list = byTopic.get(article.topicKey) ?? [];
  list.push(article);
  byTopic.set(article.topicKey, list);
}

const themes = [];
for (const [topicKey, group] of byTopic) {
  group.sort((a, b) => a.sourcePage - b.sourcePage);
  const multi = group.length > 1;
  const lead = group.find((a) => !a.needsReview) ?? group[0];
  const angles = group.map((article) => {
    const angle = getThemeAngle(article.sourcePage);
    return {
      ...angle,
      sourcePage: article.sourcePage,
      slug: article.slug,
    };
  });

  for (let i = 0; i < group.length; i++) {
    const article = group[i];
    const angle = angles[i];
    article.themeRole = angle.label;
    article.themeAngleId = angle.id;
    article.isCanonical = !multi;
    article.redirectsToTopic = multi;

    if (multi && !article.needsReview) {
      const angled = buildAngledSheetContent({
        kind: article.kind || sectionKind(article.section),
        primary: article.title,
        topics: article.topics,
        pageNo: article.sourcePage,
        mskRelevant: article.mskRelevant,
        angle,
      });
      article.summary = angled.summary;
      article.sections = angled.sections;
      article.caveats = angled.caveats;
      article.faqs = angled.faqs;
      article.wordCount = countContentWords(angled);
      article.variantLabel = `${angle.label} · sheet ${article.sourcePage}`;
    }
  }

  if (multi) {
    const theme = buildCombinedThemeContent({
      topicKey,
      title: lead.topicTitle || lead.title,
      kind: lead.kind || sectionKind(lead.section),
      primary: lead.topicTitle || lead.title,
      topics: [...new Set(group.flatMap((a) => a.topics))],
      mskRelevant: group.some((a) => a.mskRelevant),
      sheetCount: group.length,
      sheetSlugs: group.map((a) => a.slug),
      angles,
    });
    themes.push(theme);
  }
}

themes.sort((a, b) => a.topicKey.localeCompare(b.topicKey));

const payload = {
  generatedAt: new Date().toISOString(),
  source: "private-paraphrase-from-adobe-qrg-corpus",
  note: "Original clinic-voice articles. Multi-sheet topics expose a combined theme; variant sheet URLs redirect to the topic hub. OCR prose is not included.",
  count: articles.length,
  themeCount: themes.length,
  themes,
  articles,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
console.log(`Wrote ${articles.length} articles + ${themes.length} themes → ${OUT}`);
const withTopics = articles.filter((a) => a.topics.length).length;
const needsReview = articles.filter((a) => a.needsReview).length;
const redirected = articles.filter((a) => a.redirectsToTopic).length;
const underMin = articles.filter((a) => (a.wordCount || 0) < MIN_WORDS);
const themeUnder = themes.filter((t) => (t.wordCount || 0) < MIN_WORDS);
const byCat = {};
for (const a of articles) {
  byCat[a.category] = (byCat[a.category] || 0) + 1;
}
const topicKeys = new Set(articles.map((a) => a.topicKey));
const words = articles.map((a) => a.wordCount || 0).sort((a, b) => a - b);
console.log(`With detected topics: ${withTopics}/${articles.length}`);
console.log(`Needs review: ${needsReview}`);
console.log(`Redirected multi-sheet variants: ${redirected}`);
console.log(`Combined themes: ${themes.length}`);
console.log(`Unique topicKeys: ${topicKeys.size}`);
console.log("Categories:", byCat);
console.log(
  `Word counts — min ${words[0]}, median ${words[Math.floor(words.length / 2)]}, max ${words[words.length - 1]}`,
);
console.log(`Under ${MIN_WORDS} words (sheets): ${underMin.length}`);
console.log(`Under ${MIN_WORDS} words (themes): ${themeUnder.length}`);
if (underMin.length) {
  console.log(
    "Short samples:",
    underMin
      .slice(0, 8)
      .map((a) => `${a.slug}:${a.wordCount}`)
      .join(" | "),
  );
}
console.log(
  "Sample:",
  articles
    .filter((a) => a.topics.length)
    .slice(0, 8)
    .map((a) => `${a.sourcePage}:${a.category}/${a.topicKey}:${a.wordCount}w`)
    .join(" | "),
);
if (underMin.length || themeUnder.length) process.exitCode = 1;
