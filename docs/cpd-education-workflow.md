# CPD education workflow (GOsC-aligned)

How to maintain practitioner CPD activities under `/education/cpd` so osteopaths can complete self-directed learning that maps to the **General Osteopathic Council** three-year CPD scheme.

## GOsC requirements (summary)

Official scheme (see [GOsC CPD](https://www.osteopathy.org.uk/for-osteopaths/continuing-professional-development-cpd/) and [CPD Guidance PDF](https://www.osteopathy.org.uk/wp-content/uploads/2026/06/cpd-guidance.pdf)):

| Element | Requirement |
|---|---|
| Hours | ≥ **90 hours** / 3-year cycle |
| Learning with others | ≥ **45 hours** involving interaction with professionals |
| OPS themes | CPD across **A–D** (communication & partnership; knowledge & skills; safety & quality; professionalism) |
| Objective activity | ≥ **1** (patient feedback, peer observation, audit, case-based discussion) + analysis |
| Communication & consent | ≥ **1** dedicated activity |
| Records | Reflective portfolio (activity, date, hours, themes, learning, impact) |
| Peer Discussion Review | With a peer near cycle end |

## Gap analysis: previous hub vs scheme

| Scheme need | Before | Now |
|---|---|---|
| Cycle checklist | Missing | `CpdSchemePanel` on `/education/cpd` |
| OPS theme tags | Missing | `gosc.opsThemes` on each activity |
| Suggested hours | Free-text only | `gosc.suggestedHours` + reflective form |
| Individual vs with others | Unclear | `gosc.learningMode` + copy |
| Communication & consent | Missing | `/education/cpd/communication-and-consent` |
| Objective activity | Missing | `/education/cpd/objective-activity-toolkit` |
| PDR support | Missing | `/education/cpd/peer-discussion-review-prep` |
| Reflective record | Thin list | Interactive form (copy/print) on each CPD page |
| Clinical course | Shockwave notes | Tagged OPS B+C; certificate still on About |

**Honest limits:** This site does **not** accredit CPD and does **not** replace Peer Discussion Review. Solo e-learning is usually **individual** CPD. Learning-with-others hours need real peer interaction.

## SSOT files

- [`src/lib/gosc-cpd.ts`](../src/lib/gosc-cpd.ts) — OPS themes, scheme elements, labels, official URLs
- [`src/lib/education.ts`](../src/lib/education.ts) — `EducationArticle.gosc` metadata + CPD activities
- UI: `CpdSchemePanel`, `CpdReflectiveRecordForm`

## Adding a CPD activity

1. Add a published `EducationArticle` with `track: "cpd"`.
2. Set `gosc: { opsThemes, suggestedHours, learningMode, activityKind, contributesTo, badgeLabel }`.
3. Sections: learning content + how to log for GOsC + reflection prompts.
4. Optional: `relatedCredentialId`, `relatedServiceSlug`, `pdfPath` under `public/education/cpd/`.
5. Confirm the activity appears on the hub checklist for the right scheme elements.

## Do not

- Claim the clinic is a GOsC “approved provider” or that clicking pages auto-satisfies the scheme.
- Invent hours the reader did not spend.
- Treat peer discussion review as something completed only online.
- Paste third-party course manuals verbatim.
