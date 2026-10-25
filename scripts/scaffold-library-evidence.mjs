/**
 * Ensure every library topicKey has an evidence stub in
 * src/data/library-evidence.json. Never overwrites non-empty topics.
 *
 * Usage: node scripts/scaffold-library-evidence.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIBRARY = path.join(ROOT, "src/data/education-library.json");
const EVIDENCE = path.join(ROOT, "src/data/library-evidence.json");

if (!fs.existsSync(LIBRARY)) {
  console.error("Missing", LIBRARY);
  process.exit(1);
}

const library = JSON.parse(fs.readFileSync(LIBRARY, "utf8"));
const topicKeys = [
  ...new Set(
    (library.articles || []).map((article) => article.topicKey).filter(Boolean),
  ),
].sort((a, b) => a.localeCompare(b));

let payload = {
  generatedAt: new Date().toISOString(),
  note: "Topic-level scientific evidence dossiers. Hand-curated; OCR/QRG prose is not included.",
  topics: [],
};

if (fs.existsSync(EVIDENCE)) {
  payload = JSON.parse(fs.readFileSync(EVIDENCE, "utf8"));
  if (!Array.isArray(payload.topics)) payload.topics = [];
}

const existing = new Map(payload.topics.map((topic) => [topic.topicKey, topic]));
let added = 0;

for (const topicKey of topicKeys) {
  if (existing.has(topicKey)) continue;
  existing.set(topicKey, {
    topicKey,
    status: "empty",
    claims: [],
    references: [],
  });
  added += 1;
}

payload.topics = [...existing.values()].sort((a, b) =>
  a.topicKey.localeCompare(b.topicKey),
);
payload.generatedAt = new Date().toISOString();
payload.note =
  payload.note ||
  "Topic-level scientific evidence dossiers. Hand-curated; OCR/QRG prose is not included.";

fs.mkdirSync(path.dirname(EVIDENCE), { recursive: true });
fs.writeFileSync(EVIDENCE, JSON.stringify(payload, null, 2) + "\n");

const filled = payload.topics.filter((t) => t.status !== "empty").length;
console.log(
  `Evidence topics: ${payload.topics.length} (filled/draft/reviewed: ${filled}, empty stubs added this run: ${added})`,
);
