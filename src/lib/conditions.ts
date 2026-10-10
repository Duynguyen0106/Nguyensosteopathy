export type Condition = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  heroLine: string;
  symptoms: string[];
  howWeHelp: string[];
  relatedServiceSlug: string;
  relatedBlogSlug?: string;
  keywords: string[];
};

export const conditions: Condition[] = [
  {
    slug: "sciatica",
    title: "Sciatica Treatment in Woolwich",
    shortTitle: "Sciatica",
    summary:
      "Osteopathic care for sciatic-type leg pain, buttock ache, and lower-back referral — assessment first, then hands-on treatment and clear advice.",
    heroLine:
      "Leg pain, tingling, or buttock ache that travels from the lower back deserves a clear plan — not guesswork.",
    symptoms: [
      "Sharp or burning pain down one leg",
      "Buttock or hamstring tightness with sitting",
      "Pins and needles or numbness in the foot",
      "Pain worse with bending, coughing, or long drives",
    ],
    howWeHelp: [
      "Assess lumbar, pelvis, and nerve tension patterns",
      "Ease protective muscle spasm with osteopathic techniques",
      "Guide pacing, sitting, and return-to-movement advice",
      "Discuss imaging or GP referral only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "vietnamese-osteopath-woolwich-uk",
    keywords: [
      "sciatica Woolwich",
      "sciatica osteopath SE18",
      "leg pain osteopath Woolwich",
    ],
  },
  {
    slug: "neck-pain",
    title: "Neck Pain Osteopath in Woolwich",
    shortTitle: "Neck pain",
    summary:
      "Relief for stiff, desk-related, or work-strained necks — including nail-technician and screen postures common in SE London.",
    heroLine:
      "A stiff or aching neck often comes from how you work and sleep — we find the pattern and free movement again.",
    symptoms: [
      "Morning stiffness or limited turning",
      "Pain between the shoulder blades",
      "Tension headaches starting from the neck",
      "Ache after long phone, screen, or nail-desk work",
    ],
    howWeHelp: [
      "Assess cervical and upper-thoracic joints and soft tissue",
      "Hands-on treatment to reduce protective tension",
      "Simple desk and sleep-position coaching",
      "Link care to your real work demands",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "nail-technician-neck-wrist-pain-osteopath",
    keywords: [
      "neck pain Woolwich",
      "neck osteopath SE18",
      "desk neck pain osteopath",
    ],
  },
  {
    slug: "frozen-shoulder",
    title: "Frozen Shoulder Help in Woolwich",
    shortTitle: "Frozen shoulder",
    summary:
      "Support for stiff, painful shoulders with reduced reach — careful assessment, graded mobility work, and adjunct options when suitable.",
    heroLine:
      "When the shoulder refuses to lift or rotate, early guidance can make daily tasks feel possible again.",
    symptoms: [
      "Pain reaching behind your back or overhead",
      "Night pain when lying on the shoulder",
      "Gradual loss of movement over weeks or months",
      "Difficulty dressing, washing hair, or fastening a bra",
    ],
    howWeHelp: [
      "Confirm whether stiffness fits an adhesive capsulitis pattern",
      "Gentle osteopathic techniques within a comfortable range",
      "Home mobility and pacing that respect irritability",
      "Discuss shockwave or referral pathways when appropriate",
    ],
    relatedServiceSlug: "headaches-joints",
    keywords: [
      "frozen shoulder Woolwich",
      "stiff shoulder osteopath SE18",
      "adhesive capsulitis Woolwich",
    ],
  },
  {
    slug: "plantar-fasciitis",
    title: "Plantar Fasciitis & Heel Pain in Woolwich",
    shortTitle: "Heel pain",
    summary:
      "First-step heel pain and plantar fascia irritation — load advice, hands-on care, and focused shockwave when clinically suitable.",
    heroLine:
      "That sharp first-step heel pain does not have to run your mornings.",
    symptoms: [
      "Sharp heel pain with the first steps of the day",
      "Ache after standing or walking shifts",
      "Tenderness under the inner heel",
      "Stiffness after sitting that eases then returns",
    ],
    howWeHelp: [
      "Assess foot, calf, and kinetic-chain loading",
      "Hands-on soft-tissue and joint work where useful",
      "Footwear and load-management advice",
      "Consider focused shockwave for stubborn cases",
    ],
    relatedServiceSlug: "focused-shockwave",
    keywords: [
      "plantar fasciitis Woolwich",
      "heel pain osteopath SE18",
      "shockwave heel pain Woolwich",
    ],
  },
  {
    slug: "tennis-elbow",
    title: "Tennis Elbow Treatment in Woolwich",
    shortTitle: "Tennis elbow",
    summary:
      "Lateral elbow pain from gripping, lifting, or desk/mouse work — tendon loading advice and osteopathic care for forearm and shoulder drivers.",
    heroLine:
      "Elbow pain from tools, sports, or repetitive grip often needs more than rest alone.",
    symptoms: [
      "Pain on the outer elbow with gripping",
      "Ache lifting a kettle, bag, or tools",
      "Tenderness over the lateral epicondyle",
      "Symptoms linked to mouse use or racquet sports",
    ],
    howWeHelp: [
      "Assess elbow, wrist, and shoulder contribution",
      "Reduce irritable tissue load with graded plans",
      "Hands-on treatment for forearm and related joints",
      "Discuss shockwave for persistent tendinopathy",
    ],
    relatedServiceSlug: "focused-shockwave",
    keywords: [
      "tennis elbow Woolwich",
      "lateral epicondylitis osteopath",
      "elbow pain Woolwich",
    ],
  },
] as const;

export function getCondition(slug: string) {
  return conditions.find((condition) => condition.slug === slug);
}

export function getAllConditionSlugs() {
  return conditions.map((condition) => condition.slug);
}
