#!/usr/bin/env node
/**
 * Content-density warnings for condition long-form fields.
 * Soft lint: exits 0 with warnings by default; set STRICT=1 to fail.
 *
 * Flags:
 * - causes / whoAffected / whatToExpect / recoveryTimeline over length budget
 * - repeated locality names inside a single long field
 * - very large TypeScript blog body blobs (prefer MD/MDX/JSON for new long-form)
 *
 * Process note: do not add new long-form patient copy as TypeScript string
 * constants (e.g. expanding blog-expanded-bodies.ts). Prefer MD/MDX or JSON.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/lib/conditions.ts"), "utf8");
const BLOG_BLOB = join(root, "src/lib/blog-expanded-bodies.ts");
/** Soft ceiling — existing file is large; warn if it grows further without migration. */
const BLOG_BLOB_BUDGET_BYTES = 320_000;

const FIELD_BUDGET = {
  causes: 550,
  whoAffected: 420,
  whatToExpect: 420,
  recoveryTimeline: 360,
};

const LOCALITY =
  /\b(?:Woolwich|SE18|Elizabeth(?:\s+line)?|Greenwich\s+borough|Powis\s+Street|Woolwich\s+Arsenal)\b/gi;

const FIELDS = Object.keys(FIELD_BUDGET);

/** @type {{ slug: string, fields: Record<string, string> }[]} */
const conditions = [];
const blockRe = /\n  \{\n    slug: "([^"]+)"([\s\S]*?)(?=\n  \{\n    slug: |\n\];)/g;
let match;
while ((match = blockRe.exec(source))) {
  const slug = match[1];
  const body = match[2];
  /** @type {Record<string, string>} */
  const fields = {};
  for (const field of FIELDS) {
    const dq = body.match(
      new RegExp(`${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`),
    );
    if (dq) {
      fields[field] = dq[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
      continue;
    }
    const tq = body.match(new RegExp(`${field}:\\s*\`([\\s\\S]*?)\``));
    if (tq) fields[field] = tq[1];
  }
  conditions.push({ slug, fields });
}

const warnings = [];
for (const { slug, fields } of conditions) {
  for (const field of FIELDS) {
    const value = fields[field];
    if (!value) continue;
    const budget = FIELD_BUDGET[field];
    if (value.length > budget) {
      warnings.push(
        `${slug}.${field}: ${value.length} chars (budget ${budget})`,
      );
    }
    const hits = value.match(LOCALITY) || [];
    if (hits.length > 1) {
      warnings.push(
        `${slug}.${field}: ${hits.length} locality mentions (${[...new Set(hits)].join(", ")})`,
      );
    }
  }
}

if (existsSync(BLOG_BLOB)) {
  const bytes = statSync(BLOG_BLOB).size;
  if (bytes > BLOG_BLOB_BUDGET_BYTES) {
    warnings.push(
      `blog-expanded-bodies.ts: ${bytes} bytes (budget ${BLOG_BLOB_BUDGET_BYTES}) — prefer MD/MDX/JSON for new long-form posts`,
    );
  }
}

if (warnings.length === 0) {
  console.log(
    `lint-condition-density: ${conditions.length} conditions OK (no density warnings).`,
  );
  process.exit(0);
}

console.log(
  `lint-condition-density: ${warnings.length} warning(s) across ${conditions.length} conditions`,
);
for (const line of warnings) console.log(` - ${line}`);

if (process.env.STRICT === "1") {
  process.exit(1);
}
process.exit(0);
