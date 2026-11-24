/**
 * Education hub SSOT — tracks for library, acupuncture, and CPD.
 * Former nutrition patient guides now live as blog posts (Nutrition & recovery).
 * Optional PDFs: place files under public/education/<track>/ and set pdfPath.
 *
 * CPD activities may include `gosc` metadata mapping to the GOsC scheme
 * (see src/lib/gosc-cpd.ts). Website learning is self-directed support — not
 * GOsC accreditation.
 */

import { getLibraryArticleCount } from "@/lib/education-library";
import type { GoscActivityMeta } from "@/lib/gosc-cpd";
import {
  GOSC_SCHEME_ELEMENTS,
  type GoscSchemeElementId,
  type OpsThemeId,
} from "@/lib/gosc-cpd";

export type EducationAudience = "patients" | "practitioners" | "both";

export type EducationTrackId = "library" | "acupuncture" | "cpd";

export type EducationTrack = {
  id: EducationTrackId;
  /** URL segment under /education */
  slug: EducationTrackId;
  title: string;
  shortTitle: string;
  summary: string;
  audience: EducationAudience;
  audienceLabel: string;
  /** Shown on hub cards */
  ctaLabel: string;
};

export type EducationSection = {
  heading: string;
  body: string;
};

export type EducationFaq = {
  question: string;
  answer: string;
};

export type EducationArticle = {
  slug: string;
  track: EducationTrackId;
  title: string;
  summary: string;
  /** published = full page; coming-soon = stub ready for your copy */
  status: "published" | "coming-soon";
  sections: EducationSection[];
  faqs?: EducationFaq[];
  caveats?: string[];
  /** Public path e.g. /education/cpd/my-course.pdf */
  pdfPath?: string;
  relatedServiceSlug?: string;
  /**
   * Optional link to `site.practitioner.qualifications[].id`
   * (used for CPD course summaries tied to a certificate).
   */
  relatedCredentialId?: string;
  /** Course provider when this is a CPD summary */
  provider?: string;
  /** e.g. "8 hours" */
  hoursLabel?: string;
  /** Human date label e.g. "10 October 2026" */
  completedOn?: string;
  /** GOsC scheme mapping — required for published CPD activities. */
  gosc?: GoscActivityMeta;
};

export const educationTracks: EducationTrack[] = [
  {
    id: "library",
    slug: "library",
    title: "Supplement education library",
    shortTitle: "Library",
    summary:
      "Dual-audience clinic themes organised by topic (minerals, vitamins, herbals, wellness) — not a product catalogue. Overlapping angles are combined into one clear theme per topic. Shorter patient nutrition articles are on the blog.",
    audience: "both",
    audienceLabel: "For patients & practitioners",
    ctaLabel: "Browse the full library",
  },
  {
    id: "acupuncture",
    slug: "acupuncture",
    title: "Acupuncture education",
    shortTitle: "Acupuncture",
    summary:
      "Plain-English patient notes on medical acupuncture and electroacupuncture, plus a full American Dragon reference corpus (points, herbs, formulas, conditions) published with owner permission for study.",
    audience: "patients",
    audienceLabel: "For patients",
    ctaLabel: "Browse acupuncture guides",
  },
  {
    id: "cpd",
    slug: "cpd",
    title: "CPD for osteopaths (GOsC-aligned)",
    shortTitle: "CPD",
    summary:
      "Self-directed CPD activities mapped to the GOsC three-year scheme — OPS themes, objective activity, communication & consent, reflective records, and Peer Discussion Review prep. Not patient advice; you own your hours and portfolio.",
    audience: "practitioners",
    audienceLabel: "For practitioners",
    ctaLabel: "Open the CPD scheme hub",
  },
];

/** Practitioner-facing banner copy for CPD pages. */
export const cpdPractitionerDisclaimer =
  "For osteopaths and allied practitioners. Activities are structured to help you meet GOsC CPD scheme elements when you spend real time, reflect, and keep your own records. This site does not accredit CPD, does not replace Peer Discussion Review, and is not patient treatment advice. Solo e-learning usually counts as individual CPD; learning with others needs genuine peer interaction.";

export const acupuncturePatientDisclaimer =
  "These pages are general patient education about acupuncture used at Nguyen's Osteopathic Clinic. They are not a diagnosis or a promise of outcome. Suitability is confirmed at assessment.";

export const libraryDualAudienceDisclaimer =
  "These library pages are written for both patients and practitioners. They are original clinic education notes — not prescribing protocols, brand endorsements, or a copy of any third-party training guide. Patients: check with your GP, pharmacist, or osteopath before starting supplements. Practitioners: use as discussion prompts within your regulated scope only.";

/** Shorter banner copy for library browse/read chrome. */
export const libraryDualAudienceDisclaimerShort =
  "Original clinic education for patients and practitioners — not prescribing advice or product endorsements. Check with a GP, pharmacist, or osteopath before starting supplements.";

/**
 * Acupuncture + CPD articles.
 * Add new entries here; optional PDFs go in public/education/<track>/.
 */
export const educationArticles: EducationArticle[] = [
  {
    slug: "what-is-medical-acupuncture",
    track: "acupuncture",
    title: "What is medical acupuncture?",
    summary:
      "How Western medical acupuncture is used alongside osteopathy for muscle and joint pain — what to expect in a session.",
    status: "published",
    relatedServiceSlug: "acupuncture-electro",
    sections: [
      {
        heading: "In plain English",
        body: "Medical acupuncture uses fine sterile needles at carefully chosen points to influence pain and muscle tone. At this clinic it is offered as an add-on or pathway after clinical screening — not as a stand-alone mystical cure.",
      },
      {
        heading: "What a session feels like",
        body: "You remain clothed where practical. Needles are typically left for a short period. Some people feel a dull ache or warmth; others barely notice. Tell us about needle phobia, bleeding disorders, or pregnancy before we start.",
      },
      {
        heading: "How it sits with osteopathy",
        body: "Needling can settle irritable soft tissue while we still address load, joint mechanics, and rehab. It does not replace graded exercise or medical red-flag screening.",
      },
    ],
    faqs: [
      {
        question: "Is this the same as traditional Chinese acupuncture?",
        answer:
          "We practise Western medical acupuncture within an osteopathic MSK assessment. Traditional Chinese medicine frameworks are a different training pathway; ask if you want a referral elsewhere.",
      },
    ],
    caveats: [
      "Not everyone is suitable — we screen first.",
      "Fees for acupuncture add-ons are listed on the fees page.",
    ],
  },
  {
    slug: "electroacupuncture-overview",
    track: "acupuncture",
    title: "Electroacupuncture overview",
    summary:
      "When gentle electrical stimulation is added to acupuncture needles for stubborn muscle or nerve-related pain patterns.",
    status: "coming-soon",
    relatedServiceSlug: "acupuncture-electro",
    sections: [
      {
        heading: "Coming soon",
        body: "A patient-facing overview of electroacupuncture — indications we commonly discuss, what the machine does, and aftercare — will be published here. Until then, see the medical acupuncture service page or ask in clinic.",
      },
    ],
  },
  {
    slug: "acupuncture-aftercare",
    track: "acupuncture",
    title: "Aftercare after acupuncture",
    summary:
      "Simple same-day advice after needling: rest, hydration, expected soreness, and when to get in touch.",
    status: "coming-soon",
    relatedServiceSlug: "acupuncture-electro",
    sections: [
      {
        heading: "Coming soon",
        body: "A short aftercare handout will live here. You can also follow the general clinic aftercare guide until this page is filled in.",
      },
    ],
  },
  {
    slug: "gosc-cpd-scheme-overview",
    track: "cpd",
    title: "GOsC CPD scheme overview (how to use this hub)",
    summary:
      "Map the official three-year GOsC CPD requirements to website activities: hours, learning with others, OPS themes A–D, objective activity, communication & consent, records, and Peer Discussion Review.",
    status: "published",
    provider: "Nguyen's Osteopathic Clinic (education hub)",
    hoursLabel: "1–1.5 hours",
    gosc: {
      opsThemes: ["D", "B"],
      suggestedHours: 1.5,
      learningMode: "either-with-peer-followup",
      activityKind: "scheme-guide",
      contributesTo: [
        "hours-cycle",
        "ops-themes",
        "reflective-records",
        "learning-with-others",
      ],
      badgeLabel: "Scheme guide",
    },
    sections: [
      {
        heading: "What GOsC requires",
        body: "Over each three-year cycle: at least 90 CPD hours (minimum 45 learning with others); CPD across all four Osteopathic Practice Standards themes (A–D); at least one objective activity; at least one communication and consent activity; up-to-date reflective records; and a Peer Discussion Review toward the end of the cycle. Declare hours annually when you renew registration.",
      },
      {
        heading: "What this website can (and cannot) do",
        body: "You can complete structured e-learning and course summaries here, tag OPS themes, and generate reflective records to keep in your portfolio. This hub does not accredit CPD, does not replace GOsC resources or the Peer Discussion Review meeting, and does not automatically submit hours. Claim only hours you actually spent.",
      },
      {
        heading: "Individual vs learning with others",
        body: "Reading and reflecting alone usually counts as individual CPD. Learning with others needs interaction — for example discussing a case or this module with a peer, study group, or mentor. After an e-learning activity, schedule a short peer discussion if you need hours toward the 45-hour learning-with-others element.",
      },
      {
        heading: "Suggested path through this hub",
        body: "1) Scheme overview (this page). 2) Communication & consent. 3) Objective activity toolkit (run one in clinic). 4) Clinical course notes (e.g. shockwave). 5) Keep reflective records after each activity. 6) Peer Discussion Review prep before cycle end. Use the coverage checklist on the CPD hub to see which scheme elements you have addressed via site activities.",
      },
    ],
    faqs: [
      {
        question: "Is Nguyen’s an approved GOsC CPD provider?",
        answer:
          "GOsC’s scheme is primarily self-directed; it does not work like a single approved-provider list for all CPD. You choose relevant activities, reflect, and keep records. Always follow current GOsC guidance.",
      },
      {
        question: "Where is the official guidance?",
        answer:
          "Start at the GOsC CPD pages and the Continuing Professional Development Guidance PDF linked from the CPD hub on this site.",
      },
    ],
    caveats: [
      "Not patient advice.",
      "You remain responsible for honest hours and a complete portfolio.",
    ],
  },
  {
    slug: "communication-and-consent",
    track: "cpd",
    title: "Communication and consent (OPS Theme A)",
    summary:
      "Self-directed CPD activity reviewing communication, shared decision-making, and consent in osteopathic practice — mapped to the GOsC communication & consent scheme element.",
    status: "published",
    provider: "Nguyen's Osteopathic Clinic (education hub)",
    hoursLabel: "1.5–2 hours",
    gosc: {
      opsThemes: ["A", "D"],
      suggestedHours: 2,
      learningMode: "either-with-peer-followup",
      activityKind: "communication-consent",
      contributesTo: [
        "communication-consent",
        "ops-themes",
        "hours-cycle",
        "reflective-records",
        "learning-with-others",
      ],
      badgeLabel: "Consent CPD",
    },
    sections: [
      {
        heading: "Why this activity exists",
        body: "GOsC asks every osteopath to complete at least one CPD activity in communication and consent each three-year cycle, reviewing relevant Osteopathic Practice Standards guidance and showing how learning benefits patients. This page structures that review for clinic use.",
      },
      {
        heading: "Core learning points",
        body: "Consent is ongoing, not a one-off signature. Explain findings, options (including doing less or referring), risks, and likely timeframes in language the patient understands. Check understanding; invite questions; document discussions. Adapt for language needs, anxiety, and capacity. Revisit consent when the plan changes (new modality, home advice, or escalation).",
      },
      {
        heading: "Clinic application exercises",
        body: "1) Rewrite your first-visit consent script in plain English (include shockwave/needling if you offer them). 2) Audit three recent notes: is the discussion of options and agreement clear? 3) Practise a “teach-back” question (“What will you do before we meet again?”). 4) Identify one communication habit to improve this month (pauses, jargon, time to decide).",
      },
      {
        heading: "Link to OPS and patients",
        body: "Theme A (communication and patient partnership) and Theme D (professionalism) sit behind this work. Patient benefit shows up as clearer expectations, safer shared decisions, and notes that support continuity. If you also gather patient feedback on communication, that objective activity can reinforce this element — record both carefully.",
      },
    ],
    faqs: [
      {
        question: "Does reading this alone satisfy the communication & consent element?",
        answer:
          "It can form your communication & consent CPD activity if you engage seriously, reflect, apply changes in practice, and keep a record. Pair with peer discussion if you also need learning-with-others hours.",
      },
    ],
    caveats: [
      "Not legal advice — follow current OPS guidance and local requirements.",
      "Not patient-facing copy; adapt language for each consultation.",
    ],
  },
  {
    slug: "objective-activity-toolkit",
    track: "cpd",
    title: "Objective activity toolkit",
    summary:
      "Plan and record a GOsC objective activity — patient feedback, peer observation, clinical audit, or case-based discussion — with reflection prompts that show impact on practice.",
    status: "published",
    provider: "Nguyen's Osteopathic Clinic (education hub)",
    hoursLabel: "2–4 hours (including clinic activity)",
    gosc: {
      opsThemes: ["B", "C", "A"],
      suggestedHours: 3,
      learningMode: "either-with-peer-followup",
      activityKind: "objective",
      contributesTo: [
        "objective-activity",
        "ops-themes",
        "hours-cycle",
        "reflective-records",
        "learning-with-others",
      ],
      badgeLabel: "Objective activity",
    },
    sections: [
      {
        heading: "What counts as an objective activity",
        body: "GOsC expects at least one activity where you seek external objective feedback about your practice, then analyse and reflect on how it informs practice or CPD. Common options: patient feedback, peer observation, clinical audit, or case-based discussion with a colleague.",
      },
      {
        heading: "Choose one method this cycle",
        body: "Patient feedback: short questionnaire after a block of care (communication, explanation, outcome). Peer observation: a trusted colleague observes a session (with patient consent) or reviews a recording/notes where appropriate. Clinical audit: e.g. documentation of consent, red-flag screening, or outcome measures over 10 cases. Case-based discussion: structured case review with a peer — this also supports learning with others.",
      },
      {
        heading: "Analysis and impact (required)",
        body: "Do not stop at collecting data. Write: what the feedback showed; what you will keep; what you will change; how this shapes further CPD. That reflection is what makes the activity meet the scheme — not the survey alone.",
      },
      {
        heading: "Privacy and consent",
        body: "Obtain appropriate consent for observation or use of patient information. Anonymise cases in written records. Store feedback securely. Follow GDPR and professional confidentiality standards.",
      },
    ],
    faqs: [
      {
        question: "Can patient feedback also cover communication & consent?",
        answer:
          "Yes — GOsC notes that reflecting on communication in response to patient feedback can support the communication and consent element. Record clearly how both elements were met.",
      },
    ],
    caveats: [
      "You must run the objective activity in real practice — this page is the planning and recording scaffold.",
      "Case discussion with a peer is the clearest way to claim learning-with-others hours from this toolkit.",
    ],
  },
  {
    slug: "shockwave-therapy-clinical-practice",
    track: "cpd",
    title: "Course notes: Shockwave Therapy for Clinical Practice",
    summary:
      "Practitioner summary of an 8-hour OMT Training CPD in radial extracorporeal shockwave therapy (rESWT) — indications, contraindications, safety, and MSK integration at this clinic.",
    status: "published",
    relatedCredentialId: "shockwave-cpd",
    relatedServiceSlug: "focused-shockwave",
    provider: "OMT Training",
    hoursLabel: "8 hours (certificate) · 1–2 hours site review",
    completedOn: "10 October 2026",
    gosc: {
      opsThemes: ["B", "C"],
      suggestedHours: 1.5,
      learningMode: "either-with-peer-followup",
      activityKind: "course",
      contributesTo: [
        "hours-cycle",
        "ops-themes",
        "reflective-records",
        "learning-with-others",
      ],
      badgeLabel: "Clinical course",
    },
    sections: [
      {
        heading: "Learning outcomes",
        body: "Recognise when radial shockwave is a reasonable adjunct for stubborn tendon and soft-tissue presentations; screen contraindications and red flags before treatment; explain expected sensation, dosing logic, and aftercare in plain language; and document consent, device settings, and review points within osteopathic MSK care.",
      },
      {
        heading: "Clinical integration at this clinic",
        body: "Shockwave is offered after clinical screening as an adjunctive tool — not a stand-alone gadget pathway. Sessions sit alongside load management, soft-tissue and joint work, and graded rehab. Suitability is confirmed first; not every sore tendon is a shockwave candidate. Patient-facing service detail lives on the focused shockwave page; this note is for practitioner reflection and CPD logging.",
      },
      {
        heading: "Safety and scope reminders",
        body: "Respect manufacturer guidance, infection control, and device maintenance. Exclude or refer when history suggests medical review should lead (for example unexplained progressive neurological change, suspected fracture, or presentations outside osteopathic scope). Keep CPD certificates and local protocols with your regulator file — this page summarises learning; it does not replace the certificate or insurer wording.",
      },
      {
        heading: "How to log this for GOsC",
        body: "If you attended the OMT course, keep the certificate and log the course hours separately as your primary evidence. Use this page for a short refresher and reflective record (suggested 1–1.5 hours). OPS themes: B (knowledge & skills) and C (safety & quality). Discuss a complex tendon case with a peer to add learning-with-others time.",
      },
    ],
    faqs: [
      {
        question: "Is this the same as the certificate PDF?",
        answer:
          "No. The certificate proves course completion. This page is a practitioner summary and reflection aid linked to that credential.",
      },
      {
        question: "Where do patients read about shockwave?",
        answer:
          "Send patients to the focused shockwave service page and fees list. Keep this CPD note for colleagues and your own log.",
      },
    ],
    caveats: [
      "Practitioner education only — not patient treatment instructions.",
      "Does not replace the course certificate, device training records, or professional indemnity terms.",
      "Practise within GOsC scope and your own competence.",
    ],
  },
  {
    slug: "peer-discussion-review-prep",
    track: "cpd",
    title: "Peer Discussion Review prep",
    summary:
      "Prepare evidence for your end-of-cycle Peer Discussion Review: checklist of scheme elements, documents to bring, and discussion prompts with a peer.",
    status: "published",
    provider: "Nguyen's Osteopathic Clinic (education hub)",
    hoursLabel: "1–2 hours prep (+ meeting with peer)",
    gosc: {
      opsThemes: ["D", "B"],
      suggestedHours: 1.5,
      learningMode: "learning-with-others",
      activityKind: "peer-discussion",
      contributesTo: [
        "peer-discussion-review",
        "learning-with-others",
        "reflective-records",
        "hours-cycle",
        "ops-themes",
      ],
      badgeLabel: "PDR prep",
    },
    sections: [
      {
        heading: "What the Peer Discussion Review is for",
        body: "Toward the end of your three-year CPD cycle, discuss your practice and CPD with an osteopath or other health professional to confirm you have completed the scheme elements. The review is a professional conversation — not an exam — but you should bring organised evidence.",
      },
      {
        heading: "Evidence checklist",
        body: "Bring: CPD record covering ≥90 hours (≥45 learning with others); examples across OPS themes A–D; notes from your objective activity and analysis; communication & consent activity record; certificates where relevant; and a short summary of how CPD changed your practice. Website reflective records and this hub’s coverage matrix can help you organise — they do not replace your portfolio.",
      },
      {
        heading: "Discussion prompts",
        body: "What activity most changed your practice? Where are you still uncertain? How did patient feedback or peer input alter your plan? How do you keep consent and safety current? What is your CPD focus for the next cycle?",
      },
      {
        heading: "After the review",
        body: "Keep a note of the date, peer’s name/role, and outcomes. File it with your cycle evidence. Start the next cycle with any gaps you identified.",
      },
    ],
    faqs: [
      {
        question: "Can the Peer Discussion Review happen on this website?",
        answer:
          "No. Prep here; hold the review with a real peer. Log the meeting time as learning with others.",
      },
    ],
    caveats: [
      "Follow current GOsC Peer Discussion Review guidance for format and confirmation.",
    ],
  },
  {
    slug: "cpd-log-template",
    track: "cpd",
    title: "GOsC reflective CPD record template",
    summary:
      "Reflective record fields aligned with GOsC keeping-records guidance: activity, date, hours, OPS themes, learning, reflection, impact, and further actions.",
    status: "published",
    provider: "Nguyen's Osteopathic Clinic (education hub)",
    hoursLabel: "0.25–0.5 hours per entry",
    gosc: {
      opsThemes: ["D"],
      suggestedHours: 0.5,
      learningMode: "individual",
      activityKind: "template",
      contributesTo: ["reflective-records", "hours-cycle", "ops-themes"],
      badgeLabel: "Record template",
    },
    sections: [
      {
        heading: "Who this is for",
        body: "Osteopaths keeping a GOsC-compliant portfolio. Patients do not need this page. Use the interactive form on activity pages to fill, print, or copy a record after each CPD activity.",
      },
      {
        heading: "Fields to capture (every activity)",
        body: "1) Activity title and method (course, e-learning, peer discussion, audit, etc.). 2) Date. 3) Hours (honest). 4) Individual vs learning with others. 5) OPS themes A–D supported. 6) Key learning points. 7) Reflection — what changed in your thinking. 8) Impact on practice — what you will do differently. 9) Further learning or actions. 10) Evidence attached (certificate, feedback summary, notes).",
      },
      {
        heading: "Tips from GOsC-style good practice",
        body: "Record little and often. Do not only list attendance — show impact. Everyday learning (reading, podcasts, in-house discussion) can count when relevant and reflected. Keep records ready for verification or Peer Discussion Review.",
      },
    ],
    faqs: [
      {
        question: "Does this template itself count as CPD?",
        answer:
          "Learning how to structure records can be a short professionalism activity. The main value is documenting other activities properly.",
      },
    ],
    caveats: [
      "Not a substitute for the official GOsC diary or your chosen portfolio system.",
      "Not patient advice.",
    ],
  },
];

export function getEducationTrack(
  slug: string,
): EducationTrack | undefined {
  return educationTracks.find((track) => track.slug === slug);
}

export function getArticlesForTrack(
  track: EducationTrackId,
): EducationArticle[] {
  return educationArticles.filter((article) => article.track === track);
}

/** Browse lists only — coming-soon stubs stay out of hub/track grids (F10). */
export function getBrowsableArticlesForTrack(
  track: EducationTrackId,
): EducationArticle[] {
  return getArticlesForTrack(track).filter(
    (article) => article.status === "published",
  );
}

export function getEducationArticle(
  track: EducationTrackId,
  slug: string,
): EducationArticle | undefined {
  return educationArticles.find(
    (article) => article.track === track && article.slug === slug,
  );
}

/** CPD course summary tied to a qualifications[].id, if published. */
export function getEducationArticleByCredentialId(
  credentialId: string,
): EducationArticle | undefined {
  return educationArticles.find(
    (article) =>
      article.relatedCredentialId === credentialId &&
      article.status === "published",
  );
}

export function getAllEducationArticleParams(): {
  track: EducationTrackId;
  slug: string;
}[] {
  return educationArticles.map((article) => ({
    track: article.track,
    slug: article.slug,
  }));
}

export function getEducationTrackCount(trackId: EducationTrackId): number {
  if (trackId === "library") return getLibraryArticleCount();
  return getBrowsableArticlesForTrack(trackId).length;
}

export function educationHref(
  track: EducationTrackId,
  slug?: string,
): string {
  if (!slug) return `/education/${track}`;
  if (track === "library") return `/education/library/${slug}`;
  return `/education/${track}/${slug}`;
}

/** Published CPD activities that include GOsC metadata. */
export function getGoscCpdActivities(): EducationArticle[] {
  return getBrowsableArticlesForTrack("cpd").filter((article) => article.gosc);
}

/** Which OPS themes are covered by at least one published CPD activity. */
export function getCoveredOpsThemes(): OpsThemeId[] {
  const set = new Set<OpsThemeId>();
  for (const article of getGoscCpdActivities()) {
    for (const theme of article.gosc?.opsThemes ?? []) set.add(theme);
  }
  return (["A", "B", "C", "D"] as OpsThemeId[]).filter((id) => set.has(id));
}

/** Which scheme elements have at least one contributing published activity. */
export function getCoveredSchemeElements(): GoscSchemeElementId[] {
  const set = new Set<GoscSchemeElementId>();
  for (const article of getGoscCpdActivities()) {
    for (const id of article.gosc?.contributesTo ?? []) set.add(id);
  }
  return GOSC_SCHEME_ELEMENTS.map((el) => el.id).filter((id) => set.has(id));
}
