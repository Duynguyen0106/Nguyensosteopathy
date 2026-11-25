/**
 * GOsC CPD scheme SSOT — maps website CPD activities to Osteopathic Practice
 * Standards themes and scheme elements.
 *
 * Official scheme (GOsC): 90 hours / 3-year cycle (min 45 learning with others);
 * CPD across OPS themes A–D; ≥1 objective activity; ≥1 communication & consent
 * activity; reflective records; Peer Discussion Review near cycle end.
 *
 * This site does not accredit CPD and does not replace the osteopath’s own
 * record, annual declaration, or Peer Discussion Review. Self-directed
 * e-learning can count as individual CPD when honestly timed and reflected.
 * “Learning with others” needs real interaction (peer discussion, courses with
 * peers, etc.) — solo reading alone does not satisfy that 45-hour element.
 *
 * Sources:
 * https://www.osteopathy.org.uk/for-osteopaths/continuing-professional-development-cpd/
 * https://www.osteopathy.org.uk/wp-content/uploads/2026/06/cpd-guidance.pdf
 */

export type OpsThemeId = "A" | "B" | "C" | "D";

export type CpdLearningMode =
  | "individual"
  | "learning-with-others"
  | "either-with-peer-followup";

export type CpdActivityKind =
  | "scheme-guide"
  | "course"
  | "elearning"
  | "objective"
  | "communication-consent"
  | "peer-discussion"
  | "template";

export type GoscSchemeElementId =
  | "hours-cycle"
  | "learning-with-others"
  | "ops-themes"
  | "objective-activity"
  | "communication-consent"
  | "reflective-records"
  | "peer-discussion-review";

export const OPS_THEMES: Record<
  OpsThemeId,
  { id: OpsThemeId; title: string; shortTitle: string; summary: string }
> = {
  A: {
    id: "A",
    title: "Communication and patient partnership",
    shortTitle: "Communication & partnership",
    summary:
      "Listening, shared decisions, consent, and working with patients as partners in care.",
  },
  B: {
    id: "B",
    title: "Knowledge, skills and performance",
    shortTitle: "Knowledge & skills",
    summary:
      "Maintaining and developing clinical knowledge, techniques, and professional performance.",
  },
  C: {
    id: "C",
    title: "Safety and quality in practice",
    shortTitle: "Safety & quality",
    summary:
      "Safe practice, quality improvement, risk management, and protecting patients.",
  },
  D: {
    id: "D",
    title: "Professionalism",
    shortTitle: "Professionalism",
    summary:
      "Honesty, integrity, boundaries, confidentiality, and professional responsibilities.",
  },
};

export const GOSC_SCHEME_ELEMENTS: {
  id: GoscSchemeElementId;
  title: string;
  requirement: string;
  websiteRole: string;
}[] = [
  {
    id: "hours-cycle",
    title: "90 hours over three years",
    requirement:
      "Complete a minimum of 90 CPD hours across each three-year cycle (typically ~30 hours per year). First cycle after registering on/after 1 Oct 2018 may be 85 hours in 2 years 10 months.",
    websiteRole:
      "Each activity suggests honest hours. Claim only time you actually spent reading, reflecting, and applying.",
  },
  {
    id: "learning-with-others",
    title: "At least 45 hours learning with others",
    requirement:
      "At least 45 of the 90 hours must involve interaction with osteopaths or other professionals (giving and receiving information).",
    websiteRole:
      "Solo e-learning on this site is individual CPD. Pair an activity with peer case discussion or a study group to contribute toward learning with others.",
  },
  {
    id: "ops-themes",
    title: "All four Osteopathic Practice Standards themes",
    requirement:
      "Undertake CPD linked to themes A–D: Communication & patient partnership; Knowledge, skills & performance; Safety & quality; Professionalism.",
    websiteRole:
      "Every published activity is tagged with OPS themes. Use the coverage matrix on /education/cpd to close gaps in your cycle.",
  },
  {
    id: "objective-activity",
    title: "At least one objective activity",
    requirement:
      "Seek external objective feedback (e.g. patient feedback, peer observation, clinical audit, case-based discussion), then analyse and reflect on how it informs practice or CPD.",
    websiteRole:
      "Use the Objective activity toolkit to plan and record one (or more) objective activities in your own clinic.",
  },
  {
    id: "communication-consent",
    title: "Communication and consent CPD",
    requirement:
      "At least one activity focused on communication and consent, reviewing relevant OPS guidance and showing how learning was applied for patient benefit.",
    websiteRole:
      "Complete the Communication & consent e-learning activity and keep a reflective record.",
  },
  {
    id: "reflective-records",
    title: "Keep reflective CPD records",
    requirement:
      "Record activity, date, hours, OPS themes, learning points, reflection, impact on practice, and further actions. Declare hours annually at renewal.",
    websiteRole:
      "Use the reflective record form on each activity page (print or copy into your portfolio / GOsC resources).",
  },
  {
    id: "peer-discussion-review",
    title: "Peer Discussion Review",
    requirement:
      "Toward the end of the three-year cycle, complete a Peer Discussion Review with an osteopath or other health professional confirming scheme elements are met.",
    websiteRole:
      "Use the Peer Discussion Review prep guide to organise evidence before your review meeting. The review itself is with a peer — not on this website.",
  },
];

/** Official GOsC CPD hub — keep for outbound links. */
export const GOSC_CPD_URL =
  "https://www.osteopathy.org.uk/for-osteopaths/continuing-professional-development-cpd/";

export const GOSC_OPS_URL =
  "https://www.osteopathy.org.uk/standards/osteopathic-practice-standards/";

export const GOSC_CPD_GUIDANCE_PDF =
  "https://www.osteopathy.org.uk/wp-content/uploads/2026/06/cpd-guidance.pdf";

export type GoscActivityMeta = {
  opsThemes: OpsThemeId[];
  /** Suggested hours for honest self-declaration (actual time may differ). */
  suggestedHours: number;
  learningMode: CpdLearningMode;
  activityKind: CpdActivityKind;
  /** Scheme elements this activity helps the practitioner address. */
  contributesTo: GoscSchemeElementId[];
  /** Short label for cards */
  badgeLabel: string;
};

export function formatOpsThemes(themes: OpsThemeId[]): string {
  return themes
    .map((id) => `${id} · ${OPS_THEMES[id].shortTitle}`)
    .join("; ");
}

export function learningModeLabel(mode: CpdLearningMode): string {
  switch (mode) {
    case "individual":
      return "Individual CPD (self-directed)";
    case "learning-with-others":
      return "Learning with others";
    case "either-with-peer-followup":
      return "Individual — or learning with others if discussed with a peer";
    default:
      return mode;
  }
}
