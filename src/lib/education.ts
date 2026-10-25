/**
 * Education hub SSOT — tracks for nutrition, acupuncture, and CPD.
 * Nutrition topic bodies live in src/lib/supplements.ts.
 * Optional PDFs: place files under public/education/<track>/ and set pdfPath.
 */

import { supplements } from "@/lib/supplements";

export type EducationAudience = "patients" | "practitioners";

export type EducationTrackId = "nutrition" | "acupuncture" | "cpd";

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
  relatedConditionSlugs?: string[];
};

export const educationTracks: EducationTrack[] = [
  {
    id: "nutrition",
    slug: "nutrition",
    title: "Nutrition & supplements",
    shortTitle: "Nutrition",
    summary:
      "Patient guides on vitamins, minerals, and recovery habits that often come up alongside osteopathy — educational only, not prescribing.",
    audience: "patients",
    audienceLabel: "For patients",
    ctaLabel: "Browse nutrition guides",
  },
  {
    id: "acupuncture",
    slug: "acupuncture",
    title: "Acupuncture education",
    shortTitle: "Acupuncture",
    summary:
      "Plain-English notes on medical acupuncture and electroacupuncture used at the clinic. Add handouts and topic pages here as you write them.",
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

/**
 * Acupuncture + CPD articles (nutrition uses supplements[]).
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
        body: "Future course summaries from Austin’s CPD will be published as separate pages under this track. Attach PDFs under public/education/cpd/ when you have handouts ready to share.",
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
    title: "Course notes: MSK rehab (placeholder)",
    summary:
      "Reserved slot for a future CPD course summary on musculoskeletal rehab programming. Replace this stub when you upload notes.",
    status: "coming-soon",
    sections: [
      {
        heading: "Placeholder",
        body: "Add the course title, provider, date, learning outcomes, and clinical implications here. Link a PDF via pdfPath when the file is in public/education/cpd/.",
      },
    ],
  },
  {
    slug: "course-slot-acupuncture-update",
    track: "cpd",
    title: "Course notes: acupuncture update (placeholder)",
    summary:
      "Reserved slot for acupuncture/dry-needling CPD reflection. Practitioner audience only.",
    status: "coming-soon",
    sections: [
      {
        heading: "Placeholder",
        body: "Summarise safety updates, point selection thinking, and how the course changes consent or documentation in clinic. Keep patient-facing explanations on the Acupuncture education track instead.",
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

/** Nutrition topic count for hub cards (from supplements SSOT). */
export function getNutritionTopicCount(): number {
  return supplements.length;
}

export function educationHref(
  track: EducationTrackId,
  slug?: string,
): string {
  if (!slug) return `/education/${track}`;
  if (track === "nutrition") return `/education/nutrition/${slug}`;
  return `/education/${track}/${slug}`;
}
