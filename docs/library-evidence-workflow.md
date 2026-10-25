# Library evidence workflow

How to gather and record scientific notes for supplement education **topics** (`topicKey` hubs under `/education/library/topic/[topic]`).

## Principles

- Evidence lives **once per topic**, not on every sheet variant.
- Educational synthesis only — not a formal GRADE product review, product endorsement, or prescribing protocol.
- Prefer **open, official sources** patients and practitioners can open without a paywall.
- Never paste Adobe QRG / OCR corpus text into evidence JSON.
- Dual audience: plain English for patients; enough precision for practitioners to verify primary sources.

## Source hierarchy (prefer earlier)

1. UK / major clinical **guidelines** (NICE, SIGN, SACN, relevant royal colleges)
2. **Systematic reviews / meta-analyses** (Cochrane first when available)
3. High-quality **RCTs** only when they change a clear claim
4. Trusted **patient information** (NHS, NIH ODS) for background safety language
5. Avoid single small industry-funded trials as the sole support for a claim

## Grades

| Grade | Meaning |
|---|---|
| `high` | Consistent support from strong sources |
| `moderate` | Useful signal with remaining uncertainty |
| `low` | Limited / indirect — discussion prompt only |
| `very-low` | Very uncertain |
| `mixed` | Conflicting or highly context-dependent findings |
| `insufficient` | Not enough reliable evidence for a claim |

Use `mixed` or `insufficient` freely — honesty beats marketing language.

## Adding or updating a topic

1. Confirm `topicKey` exists in `src/data/education-library.json`.
2. Run `node scripts/scaffold-library-evidence.mjs` if the topic stub is missing.
3. Edit `src/data/library-evidence.json`:
   - Set `status` to `draft` while writing, `reviewed` after a clinician pass.
   - Write a short `overview` (2–4 sentences).
   - Add 1–4 `claims` with `grade`, `summary`, `referenceIds`, optional `caveats`.
   - Add matching `references` with `url` and/or `doi`/`pmid`.
   - Set `lastReviewed` to `YYYY-MM-DD`.
4. Spot-check the topic hub page and that sheet pages show the evidence CTA.
5. Prefer updating the **topic hub** over rewriting sheet bodies.

## Reference rules

- Include a stable `id` (`ref-nhs-vitamin-d`).
- Prefer canonical URLs (NHS, NICE, Cochrane, PubMed, DOI).
- Record `accessed` when you relied on a web page that may change.
- Do not invent citations. If unsure, leave `status: "empty"` or mark the claim `insufficient`.

## Scaffold command

```bash
node scripts/scaffold-library-evidence.mjs
```

Creates `empty` stubs for any library `topicKey` not already present. Does not overwrite seeded or reviewed topics.
