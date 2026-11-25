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
    status: "published",
    relatedServiceSlug: "acupuncture-electro",
    sections: [
      {
        heading: "What it is",
        body: "Electroacupuncture uses the same fine sterile needles as medical acupuncture, then connects a small clinic device that delivers a gentle pulsed current between selected needles. The sensation is usually a soft tapping, buzzing, or warm ache — intensity is kept comfortable and can be turned down or off at any time.",
      },
      {
        heading: "When we discuss it",
        body: "It is most often considered for stubborn muscle irritability, some nerve-related pain patterns, or when manual needling alone has plateaued. It is not automatic for every acupuncture visit — suitability depends on your history, medications, and how tissues respond on the day.",
      },
      {
        heading: "What to expect",
        body: "After needles are placed and checked, clips are attached for a short timed period (often a few minutes). You remain able to talk and ask for adjustments. Afterwards the clips and needles are removed and we may still use soft-tissue or exercise advice as part of the same appointment.",
      },
      {
        heading: "Who may not be suitable",
        body: "Pacemakers or other implanted electrical devices, certain heart-rhythm problems, uncontrolled seizures, pregnancy in some regions, and marked needle phobia are common reasons we skip or modify electroacupuncture. Always tell us about devices, bleeding disorders, and medicines that affect clotting before needling.",
      },
    ],
    faqs: [
      {
        question: "Does the machine hurt?",
        answer:
          "It should stay in a tolerable range — strong enough to notice, not strong enough to make you brace or hold your breath. Say if anything feels sharp or wrong; we adjust immediately.",
      },
      {
        question: "Is it the same as TENS?",
        answer:
          "Both use electrical stimulation, but electroacupuncture runs through acupuncture needles at chosen points rather than surface pads alone. Your osteopath decides which approach fits the session.",
      },
    ],
    caveats: [
      "Screening happens before any needling or electrical stimulation.",
      "Fees follow the acupuncture / electroacupuncture service page.",
    ],
  },
  {
    slug: "acupuncture-aftercare",
    track: "acupuncture",
    title: "Aftercare after acupuncture",
    summary:
      "Simple same-day advice after needling: rest, hydration, expected soreness, and when to get in touch.",
    status: "published",
    relatedServiceSlug: "acupuncture-electro",
    sections: [
      {
        heading: "The rest of the day",
        body: "Keep the next few hours ordinary rather than extreme: drink water, eat as usual, and avoid a maximal gym session, long hot bath, or heavy drinking right after needling. Gentle walking and desk work are usually fine unless we advised otherwise in clinic.",
      },
      {
        heading: "Normal sensations",
        body: "Mild ache, heaviness, or tiredness at needle sites can linger for a day. Small bruises can appear, especially on limbs. These settle. Use your usual pain strategies if needed, and keep moving in comfortable ranges.",
      },
      {
        heading: "When to contact us or urgent care",
        body: "Get in touch or seek urgent care for spreading redness, fever, shortness of breath, chest pain, fainting, uncontrolled bleeding, or symptoms that feel clearly wrong rather than mild post-needling ache. For limb weakness, saddle numbness, or bladder/bowel change after any treatment, use urgent medical pathways — not wait for the next osteopathy slot.",
      },
      {
        heading: "Before the next visit",
        body: "Note what eased and what flared so we can refine points, dosage, or whether electroacupuncture stays useful. Continue any exercise or load advice you were given; needling supports tissue calm — it does not replace graded rehab.",
      },
    ],
    faqs: [
      {
        question: "Can I shower after acupuncture?",
        answer:
          "Yes. Keep the area clean as usual. Avoid scrubbing needle sites hard the same evening if they feel tender.",
      },
      {
        question: "Can I drive home?",
        answer:
          "Most people can. If you feel light-headed or unusually drowsy after a session, wait in clinic until you feel steady, or arrange a lift.",
      },
    ],
    caveats: [
      "Personal advice from your clinician overrides this general page.",
      "See also the clinic aftercare guide for broader post-visit tips.",
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
        heading: "How we will use this hub",
        body: "Future course summaries from Austin’s CPD will be published as separate pages under this track, with downloadable notes where useful.",
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
  {
    slug: "course-slot-msk-rehab",
    track: "cpd",
    title: "Course notes: MSK rehab",
    summary:
      "Practitioner notes from a future musculoskeletal rehab CPD activity will appear here when published.",
    status: "coming-soon",
    sections: [
      {
        heading: "Not published yet",
        body: "This page is a reserved space for a forthcoming CPD summary on MSK rehab programming. Check back after the next course update, or browse the CPD log template meanwhile.",
      },
    ],
  },
  {
    slug: "course-slot-acupuncture-update",
    track: "cpd",
    title: "Course notes: acupuncture update",
    summary:
      "Practitioner reflection from a future acupuncture CPD update will appear here when published.",
    status: "coming-soon",
    sections: [
      {
        heading: "Not published yet",
        body: "This page will hold practitioner-facing notes from an acupuncture CPD update. Patient explanations of needling stay on the Acupuncture education track.",
      },
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
