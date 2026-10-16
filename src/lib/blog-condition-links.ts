import type { BlogCategory, BlogPost } from "@/lib/blog";

export type ConditionLink = {
  slug: string;
  /** Descriptive anchor text for in-body links */
  anchor: string;
};

/** Explicit 2–3 condition targets for known occupational / clinical posts. */
const EXPLICIT: Record<string, ConditionLink[]> = {
  "nail-technician-neck-wrist-pain-osteopath": [
    { slug: "neck-pain", anchor: "neck pain treatment in Woolwich" },
    { slug: "tennis-elbow", anchor: "tennis elbow" },
    { slug: "carpal-tunnel", anchor: "wrist and hand pain such as carpal tunnel" },
  ],
  "restaurant-kitchen-back-pain-osteopath-woolwich": [
    { slug: "non-specific-low-back-pain", anchor: "lower back pain treatment in Woolwich" },
    { slug: "plantar-fasciitis", anchor: "plantar fasciitis and heel pain" },
    { slug: "knee-oa", anchor: "knee pain from standing and pivoting" },
  ],
  "desk-neck-and-shoulder-pain": [
    { slug: "neck-pain", anchor: "neck pain treatment in Woolwich" },
    { slug: "non-specific-low-back-pain", anchor: "lower back pain from prolonged sitting" },
    { slug: "thoracic-joint-dysfunction", anchor: "upper-back postural strain" },
  ],
  "sciatica-woolwich-osteopath": [
    { slug: "sciatica", anchor: "sciatica treatment in Woolwich" },
    { slug: "lumbar-disc-radiculopathy", anchor: "lumbar disc-related leg pain" },
    { slug: "piriformis-syndrome", anchor: "deep gluteal / piriformis-related pain" },
  ],
  "lumbar-disc-pain-osteopath-woolwich": [
    { slug: "lumbar-disc-radiculopathy", anchor: "lumbar disc pain in Woolwich" },
    { slug: "sciatica", anchor: "sciatica symptoms" },
    { slug: "non-specific-low-back-pain", anchor: "mechanical lower back pain" },
  ],
  "plantar-fasciitis-shockwave-woolwich": [
    { slug: "plantar-fasciitis", anchor: "plantar fasciitis treatment in Woolwich" },
    { slug: "achilles-tendinopathy", anchor: "Achilles tendon pain" },
    { slug: "shin-splints", anchor: "shin splints from impact loading" },
  ],
  "tennis-elbow-shockwave-osteopath-woolwich": [
    { slug: "tennis-elbow", anchor: "tennis elbow treatment in Woolwich" },
    { slug: "medial-epicondylalgia", anchor: "golfer's elbow on the inner side" },
    { slug: "neck-pain", anchor: "neck-driven arm symptoms" },
  ],
  "shoulder-pain-frozen-shoulder-woolwich": [
    { slug: "frozen-shoulder", anchor: "frozen shoulder care in Woolwich" },
    { slug: "subacromial-pain", anchor: "subacromial shoulder pain" },
    { slug: "rotator-cuff-tear", anchor: "rotator cuff–related shoulder pain" },
  ],
  "focused-shockwave-therapy-woolwich": [
    { slug: "plantar-fasciitis", anchor: "stubborn plantar heel pain" },
    { slug: "tennis-elbow", anchor: "persistent tennis elbow" },
    { slug: "achilles-tendinopathy", anchor: "Achilles tendinopathy" },
  ],
  "back-pain-woolwich-osteopathy": [
    { slug: "non-specific-low-back-pain", anchor: "lower back pain treatment in Woolwich" },
    { slug: "sciatica", anchor: "sciatica" },
    { slug: "facet-syndrome", anchor: "facet-related back pain" },
  ],
  "tension-headaches-neck-osteopath-woolwich": [
    { slug: "cervicogenic-headache", anchor: "cervicogenic headaches" },
    { slug: "neck-pain", anchor: "neck pain treatment in Woolwich" },
    { slug: "thoracic-joint-dysfunction", anchor: "upper-back joint stiffness" },
  ],
  "morning-back-stiffness-osteopath": [
    { slug: "non-specific-low-back-pain", anchor: "morning lower back stiffness" },
    { slug: "lumbar-stenosis", anchor: "walking-related lumbar stenosis patterns" },
    { slug: "facet-syndrome", anchor: "facet-related back stiffness" },
  ],
  "sports-injury-osteopath-woolwich": [
    { slug: "hamstring-strain", anchor: "hamstring strain rehab" },
    { slug: "spondylolysis", anchor: "stress-related lumbar spondylolysis pathways" },
    { slug: "acl-rehab", anchor: "ACL rehab guidance" },
  ],
  "hip-knee-pain-osteopath-woolwich": [
    { slug: "hip-oa", anchor: "hip osteoarthritis care in Woolwich" },
    { slug: "meniscal-injury", anchor: "meniscal knee injury patterns" },
    { slug: "femoroacetabular-impingement", anchor: "hip impingement / FAI-type pain" },
  ],
  "hip-bursitis-osteopath-woolwich": [
    { slug: "greater-trochanteric-pain", anchor: "greater trochanteric pain syndrome" },
    { slug: "groin-pain", anchor: "groin and adductor-related pain" },
    { slug: "hip-oa", anchor: "hip joint osteoarthritis" },
  ],
  "gym-shoulder-injury-osteopath-woolwich": [
    { slug: "subacromial-pain", anchor: "subacromial shoulder pain" },
    { slug: "shoulder-instability", anchor: "shoulder instability and apprehension" },
    { slug: "ac-joint-injury", anchor: "AC joint sprain or OA" },
  ],
  "wrist-hand-pain-osteopath-se18": [
    { slug: "carpal-tunnel", anchor: "carpal tunnel symptoms" },
    { slug: "dequervains", anchor: "De Quervain's thumb-side wrist pain" },
    { slug: "cmc-oa", anchor: "base-of-thumb CMC osteoarthritis" },
  ],
  "osteoarthritis-joints-osteopath-woolwich": [
    { slug: "knee-oa", anchor: "knee osteoarthritis" },
    { slug: "hallux-rigidus", anchor: "stiff big-toe / hallux rigidus" },
    { slug: "osteoporosis", anchor: "bone health considerations in osteoporosis" },
  ],
  "ankle-sprain-rehab-osteopath-woolwich": [
    { slug: "lateral-ankle-sprain", anchor: "lateral ankle sprain rehab" },
    { slug: "morton-neuroma", anchor: "forefoot neuroma-type pain" },
    { slug: "achilles-tendinopathy", anchor: "Achilles tendon load pain" },
  ],
  "overuse-injuries-gym-running-woolwich": [
    { slug: "shin-splints", anchor: "shin splints from impact loading" },
    { slug: "deconditioning", anchor: "deconditioning after time off training" },
    { slug: "itb-syndrome", anchor: "IT band–related lateral knee pain" },
  ],
  "return-to-sport-after-sprain-woolwich": [
    { slug: "lateral-ankle-sprain", anchor: "ankle sprain return-to-sport" },
    { slug: "acl-rehab", anchor: "ACL and knee rehab milestones" },
    { slug: "post-surgical-general", anchor: "post-surgical return-to-activity guidance" },
  ],
  "football-muscle-strain-osteopath-se18": [
    { slug: "hamstring-strain", anchor: "hamstring muscle strain" },
    { slug: "groin-pain", anchor: "football-related groin pain" },
    { slug: "meniscal-injury", anchor: "twist-related meniscal irritation" },
  ],
};

const CATEGORY_DEFAULTS: Partial<Record<BlogCategory, ConditionLink[]>> = {
  "Back & neck": [
    { slug: "non-specific-low-back-pain", anchor: "lower back pain treatment in Woolwich" },
    { slug: "neck-pain", anchor: "neck pain treatment in Woolwich" },
    { slug: "sciatica", anchor: "sciatica" },
  ],
  "Headaches & joints": [
    { slug: "cervicogenic-headache", anchor: "cervicogenic headache" },
    { slug: "neck-pain", anchor: "neck-related pain" },
    { slug: "thoracic-joint-dysfunction", anchor: "upper-back postural strain" },
  ],
  "Focused shockwave": [
    { slug: "plantar-fasciitis", anchor: "plantar fasciitis" },
    { slug: "tennis-elbow", anchor: "tennis elbow" },
    { slug: "achilles-tendinopathy", anchor: "Achilles tendinopathy" },
  ],
  "Sports rehab": [
    { slug: "hamstring-strain", anchor: "hamstring strain" },
    { slug: "lateral-ankle-sprain", anchor: "ankle sprain rehab" },
    { slug: "patellofemoral-pain", anchor: "kneecap / anterior knee pain" },
  ],
  Pregnancy: [
    { slug: "si-joint-dysfunction", anchor: "pelvic / SI joint pain" },
    { slug: "non-specific-low-back-pain", anchor: "pregnancy-related back pain patterns" },
    { slug: "sciatica", anchor: "sciatic-type leg symptoms" },
  ],
  "Getting started": [
    { slug: "non-specific-low-back-pain", anchor: "common lower back pain" },
    { slug: "neck-pain", anchor: "neck pain" },
    { slug: "sciatica", anchor: "sciatica" },
  ],
  "Clinic info": [
    { slug: "non-specific-low-back-pain", anchor: "back pain guides" },
    { slug: "neck-pain", anchor: "neck pain guides" },
  ],
  "Local guides": [
    { slug: "non-specific-low-back-pain", anchor: "lower back pain care in Woolwich" },
    { slug: "neck-pain", anchor: "neck pain care in SE18" },
  ],
  Cranial: [
    { slug: "cervicogenic-headache", anchor: "neck-related headaches" },
    { slug: "neck-pain", anchor: "neck pain and tension" },
  ],
  Paediatric: [
    { slug: "neck-pain", anchor: "neck comfort and posture" },
    { slug: "non-specific-low-back-pain", anchor: "growing musculoskeletal aches" },
  ],
  "Deep tissue": [
    { slug: "non-specific-low-back-pain", anchor: "lower back muscle tension" },
    { slug: "neck-pain", anchor: "neck and shoulder tightness" },
    { slug: "thoracic-joint-dysfunction", anchor: "upper-back stiffness" },
  ],
  "Acupuncture & cupping": [
    { slug: "non-specific-low-back-pain", anchor: "back pain" },
    { slug: "tennis-elbow", anchor: "tendon-related elbow pain" },
    { slug: "neck-pain", anchor: "neck pain" },
  ],
  "Men's health": [
    { slug: "non-specific-low-back-pain", anchor: "related lower back pain" },
    { slug: "si-joint-dysfunction", anchor: "pelvic girdle discomfort" },
  ],
};

const VALID_CONDITION_SLUGS = new Set([
  "sciatica",
  "neck-pain",
  "cervical-radiculopathy",
  "cervicogenic-headache",
  "whiplash",
  "thoracic-joint-dysfunction",
  "costochondritis",
  "scheuermanns",
  "non-specific-low-back-pain",
  "lumbar-disc-radiculopathy",
  "lumbar-stenosis",
  "spondylolysis",
  "facet-syndrome",
  "si-joint-dysfunction",
  "coccydynia",
  "hip-oa",
  "greater-trochanteric-pain",
  "femoroacetabular-impingement",
  "piriformis-syndrome",
  "hamstring-strain",
  "groin-pain",
  "knee-oa",
  "patellofemoral-pain",
  "patellar-tendinopathy",
  "acl-rehab",
  "meniscal-injury",
  "itb-syndrome",
  "lateral-ankle-sprain",
  "achilles-tendinopathy",
  "plantar-fasciitis",
  "shin-splints",
  "hallux-rigidus",
  "morton-neuroma",
  "subacromial-pain",
  "rotator-cuff-tear",
  "frozen-shoulder",
  "shoulder-instability",
  "ac-joint-injury",
  "tennis-elbow",
  "medial-epicondylalgia",
  "cubital-tunnel",
  "carpal-tunnel",
  "dequervains",
  "cmc-oa",
  "fibromyalgia",
  "deconditioning",
  "osteoporosis",
  "post-surgical-general",
]);

export function getBlogConditionLinks(
  slug: string,
  category: BlogCategory,
): ConditionLink[] {
  const raw = EXPLICIT[slug] ?? CATEGORY_DEFAULTS[category] ?? [
    { slug: "non-specific-low-back-pain", anchor: "lower back pain treatment in Woolwich" },
    { slug: "neck-pain", anchor: "neck pain treatment in Woolwich" },
    { slug: "sciatica", anchor: "sciatica" },
  ];
  return raw
    .filter((item) => item.anchor && VALID_CONDITION_SLUGS.has(item.slug))
    .slice(0, 3);
}

function countConditionLinks(text: string) {
  return [...text.matchAll(/\]\(\/conditions\/[a-z0-9-]+\)/g)].length;
}

function improveWeakAnchors(paragraph: string, wanted: ConditionLink[]) {
  return paragraph
    .replace(
      /\[conditions → ([a-z0-9-]+)\]\(\/conditions\/\1\)/gi,
      (_m, slug: string) => {
        const match = wanted.find((item) => item.slug === slug);
        return match
          ? `[${match.anchor}](/conditions/${slug})`
          : `[${slug.replace(/-/g, " ")}](/conditions/${slug})`;
      },
    )
    .replace(
      /\[a related clinical pathway\]\(\/conditions\/([a-z0-9-]+)\)/gi,
      (_m, slug: string) => {
        const match = wanted.find((item) => item.slug === slug);
        return match
          ? `[${match.anchor}](/conditions/${slug})`
          : `[related ${slug.replace(/-/g, " ")} guide](/conditions/${slug})`;
      },
    );
}

function buildLinkSentence(links: ConditionLink[]): string {
  if (links.length === 0) return "";
  if (links.length === 1) {
    return `If this sounds familiar, our guide to [${links[0].anchor}](/conditions/${links[0].slug}) explains common signs and how osteopathy may help.`;
  }
  if (links.length === 2) {
    return `Related clinical guides that often sit beside this topic include [${links[0].anchor}](/conditions/${links[0].slug}) and [${links[1].anchor}](/conditions/${links[1].slug}) — useful reading before or after your assessment.`;
  }
  return `Symptoms from this kind of work often overlap with [${links[0].anchor}](/conditions/${links[0].slug}), [${links[1].anchor}](/conditions/${links[1].slug}), and [${links[2].anchor}](/conditions/${links[2].slug}) — see those guides when more than one area is irritable.`;
}

function cloneSections(post: BlogPost) {
  return post.sections.map((section) => ({
    ...section,
    paragraphs: section.paragraphs.map((paragraph) => paragraph),
  }));
}

function conditionSlugsInText(text: string): Set<string> {
  return new Set(
    [...text.matchAll(/\]\(\/conditions\/([a-z0-9-]+)\)/g)].map(
      (match) => match[1],
    ),
  );
}

/**
 * Ensures each post surfaces its EXPLICIT/category condition targets (up to 3).
 * Rewrites weak auto-anchors first. If wanted slugs are still missing — even
 * when the post already has ≥2 condition URLs — replace boilerplate or an
 * existing condition-link paragraph, otherwise insert a mid-body sentence.
 */
export function withRelatedConditionLinks(post: BlogPost): BlogPost {
  const wanted = getBlogConditionLinks(post.slug, post.category);
  if (wanted.length === 0) return post;

  const sections = cloneSections(post);
  for (const section of sections) {
    section.paragraphs = section.paragraphs.map((paragraph) =>
      improveWeakAnchors(paragraph, wanted),
    );
  }

  const fullText = sections
    .flatMap((section) => section.paragraphs ?? [])
    .join("\n");
  const present = conditionSlugsInText(fullText);
  const missing = wanted.filter((item) => !present.has(item.slug));
  if (missing.length === 0 && countConditionLinks(fullText) >= 2) {
    return { ...post, sections };
  }

  const sentence = buildLinkSentence(wanted);
  if (!sentence) return { ...post, sections };

  // Prefer replacing known boilerplate paragraphs (mid-body, not a footer list).
  for (const section of sections) {
    const localIdx = section.paragraphs.findIndex((paragraph) =>
      paragraph.includes("Local life loads the body in specific ways"),
    );
    if (localIdx >= 0) {
      section.paragraphs[localIdx] = sentence;
      return { ...post, sections };
    }
  }
  for (const section of sections) {
    const guidesIdx = section.paragraphs.findIndex((paragraph) =>
      paragraph.includes("Internal guides that pair well with this article"),
    );
    if (guidesIdx >= 0) {
      section.paragraphs[guidesIdx] = sentence;
      return { ...post, sections };
    }
  }

  // If the body already has condition links but misses EXPLICIT targets,
  // replace the first paragraph that contains a /conditions/ URL so we stay
  // at ≤3 links without stacking another sentence.
  if (missing.length > 0 && countConditionLinks(fullText) >= 2) {
    for (const section of sections) {
      const linkIdx = section.paragraphs.findIndex((paragraph) =>
        /\]\(\/conditions\/[a-z0-9-]+\)/.test(paragraph),
      );
      if (linkIdx >= 0) {
        section.paragraphs[linkIdx] = sentence;
        return { ...post, sections };
      }
    }
  }

  // Otherwise insert into a mid section (not the intro, not the last CTA-ish block).
  const mid =
    sections.length >= 3 ? 1 : Math.min(1, Math.max(0, sections.length - 1));
  if (!sections[mid]) return { ...post, sections };
  sections[mid].paragraphs.splice(
    Math.min(1, sections[mid].paragraphs.length),
    0,
    sentence,
  );
  return { ...post, sections };
}
