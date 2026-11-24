# CPD education workflow

How to add practitioner CPD course summaries under `/education/cpd`.

## Principles

- CPD pages are for **osteopaths and allied practitioners**, not patient treatment advice.
- Prefer linking a course summary to an existing About credential (`site.practitioner.qualifications[].id`) when a certificate PDF already exists.
- Hand-author entries in `src/lib/education.ts` (`educationArticles`). Do **not** invent course content without Austin’s notes or certificate details.
- Optional downloadable notes go in `public/education/cpd/` and are referenced via `pdfPath`.
- Leave library JSON generators and evidence dossiers alone — CPD stays light until volume justifies scaffolding.

## Article fields (CPD)

| Field | Use |
|---|---|
| `track: "cpd"` | Required |
| `status` | `"published"` or `"coming-soon"` (stubs stay out of browse grids) |
| `relatedCredentialId` | Match `qualifications[].id` (e.g. `shockwave-cpd`) for bidirectional About ↔ course links |
| `provider` | Course provider name |
| `hoursLabel` | e.g. `8 hours` |
| `completedOn` | Human date label aligned with the certificate |
| `relatedServiceSlug` | Optional patient service page (e.g. `focused-shockwave`) |
| `pdfPath` | Optional `/education/cpd/….pdf` notes download |

## Adding a course page

1. Confirm the certificate (if any) is listed in `src/lib/site.ts` under `practitioner.qualifications`.
2. Add a published `EducationArticle` in `src/lib/education.ts` with `track: "cpd"` and the fields above.
3. Sections should cover learning outcomes, clinic integration, safety/scope, and reflection prompts (point to `/education/cpd/cpd-log-template`).
4. Place any notes PDF under `public/education/cpd/` and set `pdfPath`.
5. Check `/education/cpd`, the article URL, and the About credential card (“Course notes →”).

## Do not

- Publish empty `course-slot-*` placeholders without a real course date and content.
- Paste third-party course manuals verbatim.
- Treat these pages as formal GOsC CPD evidence — they are summaries and reflection aids; the certificate and regulator log remain authoritative.
