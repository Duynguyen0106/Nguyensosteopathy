/**
 * Education hub SSOT — tracks for library, acupuncture, and CPD.
 * Former nutrition patient guides now live as blog posts (Nutrition & recovery).
 * Optional PDFs: place files under public/education/<track>/ and set pdfPath.
 */

import { getLibraryArticleCount } from "@/lib/education-library";

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
    title: "CPD & practitioner learning",
    shortTitle: "CPD",
    summary:
      "Continuing professional development notes and course summaries for osteopaths and allied practitioners — not personalised patient advice.",
    audience: "practitioners",
    audienceLabel: "For practitioners",
    ctaLabel: "Browse CPD notes",
  },
];

/** Practitioner-facing banner copy for CPD pages. */
export const cpdPractitionerDisclaimer =
  "These pages are for osteopaths and allied health practitioners. They summarise CPD learning and clinical thinking aids — they are not patient treatment advice, prescribing guidance, or a substitute for your own clinical judgement, local protocols, or regulated scope of practice.";

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
    slug: "shockwave-therapy-clinical-practice",
    track: "cpd",
    title: "Course notes: Shockwave Therapy for Clinical Practice",
    summary:
      "Practitioner summary of an 8-hour OMT Training CPD in radial extracorporeal shockwave therapy (rESWT) — indications, contraindications, safety, and MSK integration at this clinic.",
    status: "published",
    relatedCredentialId: "shockwave-cpd",
    relatedServiceSlug: "focused-shockwave",
    provider: "OMT Training",
    hoursLabel: "8 hours",
    completedOn: "10 October 2026",
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
        heading: "Reflection prompts",
        body: "Use the CPD log template to record: which presentations you will screen more carefully; what you will change in consent language; how you will dose and review a short course; and when you will stop and refer. Revisit those notes after the next few shockwave episodes in clinic.",
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
    slug: "cpd-log-template",
    track: "cpd",
    title: "CPD log template (clinic use)",
    summary:
      "A simple structure for recording learning outcomes, reflection, and planned practice change after a course or study day.",
    status: "published",
    sections: [
      {
        heading: "Who this is for",
        body: "Osteopaths and allied practitioners who want a lightweight reflection template. Patients do not need this page for their care.",
      },
      {
        heading: "Suggested fields",
        body: "1) Activity title and provider. 2) Date and hours. 3) Learning objectives. 4) Key clinical takeaways. 5) What you will change in assessment or rehab. 6) Evidence or references to revisit. 7) Follow-up date to check whether practice changed.",
      },
      {
        heading: "How we use this hub",
        body: "Course summaries from Austin’s CPD are published as separate pages under this track (starting with Shockwave Therapy for Clinical Practice), with certificate links on About and downloadable notes where useful. Use this template after each activity.",
      },
    ],
    faqs: [
      {
        question: "Does this count as formal CPD evidence?",
        answer:
          "It is a reflection aid only. Check your regulator’s CPD scheme (for UK osteopaths, GOsC requirements) for what must be retained.",
      },
    ],
    caveats: [
      "Not patient advice.",
      "Does not replace your professional indemnity, local protocols, or course certificates.",
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
