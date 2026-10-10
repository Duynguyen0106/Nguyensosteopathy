export type ConditionRegion =
  | "Cervical"
  | "Thoracic"
  | "Lumbar"
  | "Pelvis & Hip"
  | "Knee"
  | "Ankle & Foot"
  | "Shoulder"
  | "Elbow & Wrist"
  | "Whole body";

export type Condition = {
  slug: string;
  title: string;
  shortTitle: string;
  region: ConditionRegion;
  summary: string;
  heroLine: string;
  symptoms: string[];
  howWeHelp: string[];
  relatedServiceSlug: string;
  relatedBlogSlug?: string;
  keywords: string[];
  featured?: boolean;
};

/** Region order aligned with the MSK Tutor conditions catalogue. */
export const conditionRegions: ConditionRegion[] = [
  "Cervical",
  "Thoracic",
  "Lumbar",
  "Pelvis & Hip",
  "Knee",
  "Ankle & Foot",
  "Shoulder",
  "Elbow & Wrist",
  "Whole body",
];

/**
 * Conditions index sourced from the MSK Tutor (Osteotutor) catalogue,
 * rewritten for patient-facing Woolwich clinic pages. Featured landers
 * keep richer SEO copy; remaining entries share a consistent template.
 */
export const conditions: Condition[] = [
  {
    slug: "sciatica",
    title: "Sciatica Treatment in Woolwich",
    shortTitle: "Sciatica",
    region: "Lumbar",
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
    relatedBlogSlug: "sciatica-woolwich-osteopath",
    keywords: [
      "sciatica Woolwich",
      "sciatica osteopath SE18",
      "leg pain osteopath Woolwich",
    ],
    featured: true,
  },
  {
    slug: "neck-pain",
    title: "Neck Pain Osteopath in Woolwich",
    shortTitle: "Neck pain",
    region: "Cervical",
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
    featured: true,
  },
  {
    slug: "cervical-radiculopathy",
    title: "Cervical radiculopathy Treatment in Woolwich",
    shortTitle: "Cervical radiculopathy",
    region: "Cervical",
    summary:
      "Osteopathic assessment and care in Woolwich for cervical radiculopathy (cervical). Nerve-root irritation producing arm pain, paraesthesia with or without weakness. Most settle with conservative care over 6–12 weeks.",
    heroLine:
      "Clear assessment and a practical plan for cervical radiculopathy — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pins and needles, numbness, or nerve-type referral",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    keywords: [
      "Cervical radiculopathy Woolwich",
      "Cervical radiculopathy osteopath SE18",
      "cervical radiculopathy Woolwich",
    ],
  },
  {
    slug: "cervicogenic-headache",
    title: "Cervicogenic headache Treatment in Woolwich",
    shortTitle: "Cervicogenic headache",
    region: "Cervical",
    summary:
      "Osteopathic assessment and care in Woolwich for cervicogenic headache (cervical). Unilateral headache driven by upper cervical dysfunction (C0–C3). Reproduced by neck movement/sustained posture.",
    heroLine:
      "Clear assessment and a practical plan for cervicogenic headache — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to cervicogenic headache",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "tension-headaches-neck-osteopath-woolwich",
    keywords: [
      "Cervicogenic headache Woolwich",
      "Cervicogenic headache osteopath SE18",
      "cervicogenic headache Woolwich",
    ],
  },
  {
    slug: "whiplash",
    title: "Whiplash-associated disorder Treatment in Woolwich",
    shortTitle: "Whiplash-associated disorder",
    region: "Cervical",
    summary:
      "Osteopathic assessment and care in Woolwich for whiplash-associated disorder (cervical). Post-road traffic collision neck pain with or without headache, no neurology or fracture. Early gentle active care is superior to collars/rest.",
    heroLine:
      "Clear assessment and a practical plan for whiplash-associated disorder — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to whiplash-associated disorder",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "whiplash-neck-pain-osteopath-se18",
    keywords: [
      "Whiplash-associated disorder Woolwich",
      "Whiplash-associated disorder osteopath SE18",
      "whiplash Woolwich",
    ],
  },
  {
    slug: "thoracic-joint-dysfunction",
    title: "Thoracic joint / postural pain Treatment in Woolwich",
    shortTitle: "Thoracic joint / postural pain",
    region: "Thoracic",
    summary:
      "Osteopathic assessment and care in Woolwich for thoracic joint / postural pain (thoracic). Interscapular ache, often desk-related. Driven by stiffness and poor postural endurance.",
    heroLine:
      "Clear assessment and a practical plan for thoracic joint / postural pain — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to thoracic joint / postural pain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "upper-back-pain-desk-workers-woolwich",
    keywords: [
      "Thoracic joint / postural pain Woolwich",
      "Thoracic joint / postural pain osteopath SE18",
      "thoracic joint dysfunction Woolwich",
    ],
  },
  {
    slug: "costochondritis",
    title: "Costochondritis / costovertebral pain Treatment in Woolwich",
    shortTitle: "Costochondritis / costovertebral pain",
    region: "Thoracic",
    summary:
      "Osteopathic assessment and care in Woolwich for costochondritis / costovertebral pain (thoracic). Sharp localised anterior or posterior rib pain, reproduced by palpation/deep breath. Self-limiting.",
    heroLine:
      "Clear assessment and a practical plan for costochondritis / costovertebral pain — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to costochondritis / costovertebral pain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "rib-pain-breathing-osteopath-woolwich",
    keywords: [
      "Costochondritis / costovertebral pain Woolwich",
      "Costochondritis / costovertebral pain osteopath SE18",
      "costochondritis Woolwich",
    ],
  },
  {
    slug: "scheuermanns",
    title: "Scheuermann's / postural hyperkyphosis Treatment in Woolwich",
    shortTitle: "Scheuermann's / postural hyperkyphosis",
    region: "Thoracic",
    summary:
      "Osteopathic assessment and care in Woolwich for scheuermann's / postural hyperkyphosis (thoracic). Structural or postural increase in thoracic kyphosis. Focus on extension mobility and posterior chain strength.",
    heroLine:
      "Clear assessment and a practical plan for scheuermann's / postural hyperkyphosis — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with bending backwards or twisting",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    keywords: [
      "Scheuermann's / postural hyperkyphosis Woolwich",
      "Scheuermann's / postural hyperkyphosis osteopath SE18",
      "scheuermanns Woolwich",
    ],
  },
  {
    slug: "non-specific-low-back-pain",
    title: "Non-specific low back pain Treatment in Woolwich",
    shortTitle: "Non-specific low back pain",
    region: "Lumbar",
    summary:
      "Osteopathic assessment and care in Woolwich for non-specific low back pain (lumbar). Most common low back pain presentation. No radicular features. Stay active, graded loading.",
    heroLine:
      "Clear assessment and a practical plan for non-specific low back pain — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to non-specific low back pain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "back-pain-woolwich-osteopathy",
    keywords: [
      "Non-specific low back pain Woolwich",
      "Non-specific low back pain osteopath SE18",
      "non specific low back pain Woolwich",
    ],
  },
  {
    slug: "lumbar-disc-radiculopathy",
    title: "Lumbar disc / radiculopathy Treatment in Woolwich",
    shortTitle: "Lumbar disc / radiculopathy",
    region: "Lumbar",
    summary:
      "Osteopathic assessment and care in Woolwich for lumbar disc / radiculopathy (lumbar). Disc-related back with or without leg pain in a dermatomal pattern. Most resolve conservatively over 6–12 weeks.",
    heroLine:
      "Clear assessment and a practical plan for lumbar disc / radiculopathy — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to lumbar disc / radiculopathy",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "lumbar-disc-pain-osteopath-woolwich",
    keywords: [
      "Lumbar disc / radiculopathy Woolwich",
      "Lumbar disc / radiculopathy osteopath SE18",
      "lumbar disc radiculopathy Woolwich",
    ],
  },
  {
    slug: "lumbar-stenosis",
    title: "Lumbar spinal stenosis Treatment in Woolwich",
    shortTitle: "Lumbar spinal stenosis",
    region: "Lumbar",
    summary:
      "Osteopathic assessment and care in Woolwich for lumbar spinal stenosis (lumbar). Neurogenic claudication — leg pain with walking/standing, relieved by flexion/sitting. Common >60.",
    heroLine:
      "Clear assessment and a practical plan for lumbar spinal stenosis — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with prolonged sitting",
      "Aggravated by walking or running",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    keywords: [
      "Lumbar spinal stenosis Woolwich",
      "Lumbar spinal stenosis osteopath SE18",
      "lumbar stenosis Woolwich",
    ],
  },
  {
    slug: "spondylolysis",
    title: "Spondylolysis / spondylolisthesis Treatment in Woolwich",
    shortTitle: "Spondylolysis / spondylolisthesis",
    region: "Lumbar",
    summary:
      "Osteopathic assessment and care in Woolwich for spondylolysis / spondylolisthesis (lumbar). Pars stress lesion with or without slip. Pain worsened by extension/rotation. Avoid extension load early.",
    heroLine:
      "Clear assessment and a practical plan for spondylolysis / spondylolisthesis — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with bending backwards or twisting",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    keywords: [
      "Spondylolysis / spondylolisthesis Woolwich",
      "Spondylolysis / spondylolisthesis osteopath SE18",
      "spondylolysis Woolwich",
    ],
  },
  {
    slug: "facet-syndrome",
    title: "Facet joint / extension-pattern LBP Treatment in Woolwich",
    shortTitle: "Facet joint / extension-pattern LBP",
    region: "Lumbar",
    summary:
      "Osteopathic assessment and care in Woolwich for facet joint / extension-pattern lbp (lumbar). Pain on extension and rotation, eased by flexion. Often unilateral, well-localised.",
    heroLine:
      "Clear assessment and a practical plan for facet joint / extension-pattern lbp — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with bending backwards or twisting",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    keywords: [
      "Facet joint / extension-pattern LBP Woolwich",
      "Facet joint / extension-pattern LBP osteopath SE18",
      "facet syndrome Woolwich",
    ],
  },
  {
    slug: "si-joint-dysfunction",
    title: "Sacroiliac joint dysfunction Treatment in Woolwich",
    shortTitle: "Sacroiliac joint dysfunction",
    region: "Pelvis & Hip",
    summary:
      "Osteopathic assessment and care in Woolwich for sacroiliac joint dysfunction (pelvis & hip). Localised sacroiliac joint pain, often peripartum or after asymmetric load. Force-closure deficit common.",
    heroLine:
      "Clear assessment and a practical plan for sacroiliac joint dysfunction — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to sacroiliac joint dysfunction",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "sacroiliac-joint-pain-woolwich",
    keywords: [
      "Sacroiliac joint dysfunction Woolwich",
      "Sacroiliac joint dysfunction osteopath SE18",
      "si joint dysfunction Woolwich",
    ],
  },
  {
    slug: "coccydynia",
    title: "Coccydynia Treatment in Woolwich",
    shortTitle: "Coccydynia",
    region: "Lumbar",
    summary:
      "Osteopathic assessment and care in Woolwich for coccydynia (lumbar). Tailbone pain worse with sitting. Often post-trauma or post-partum.",
    heroLine:
      "Clear assessment and a practical plan for coccydynia — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with prolonged sitting",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "back-neck-pain",
    relatedBlogSlug: "coccyx-tailbone-pain-osteopath-woolwich",
    keywords: [
      "Coccydynia Woolwich",
      "Coccydynia osteopath SE18",
      "coccydynia Woolwich",
    ],
  },
  {
    slug: "hip-oa",
    title: "Hip osteoarthritis Treatment in Woolwich",
    shortTitle: "Hip osteoarthritis",
    region: "Pelvis & Hip",
    summary:
      "Osteopathic assessment and care in Woolwich for hip osteoarthritis (pelvis & hip). Groin pain, morning stiffness <30 min, limited inward rotation. Exercise is first-line care.",
    heroLine:
      "Clear assessment and a practical plan for hip osteoarthritis — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Morning stiffness or first-step pain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "hip-knee-pain-osteopath-woolwich",
    keywords: [
      "Hip osteoarthritis Woolwich",
      "Hip osteoarthritis osteopath SE18",
      "hip oa Woolwich",
    ],
  },
  {
    slug: "greater-trochanteric-pain",
    title: "Greater trochanteric pain syndrome Treatment in Woolwich",
    shortTitle: "Greater trochanteric pain syndrome",
    region: "Pelvis & Hip",
    summary:
      "Osteopathic assessment and care in Woolwich for greater trochanteric pain syndrome (pelvis & hip). Lateral hip pain on side-lying and single-leg load. Compressive positions aggravate.",
    heroLine:
      "Clear assessment and a practical plan for greater trochanteric pain syndrome — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to greater trochanteric pain syndrome",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "hip-bursitis-osteopath-woolwich",
    keywords: [
      "Greater trochanteric pain syndrome Woolwich",
      "Greater trochanteric pain syndrome osteopath SE18",
      "greater trochanteric pain Woolwich",
    ],
  },
  {
    slug: "femoroacetabular-impingement",
    title: "Femoroacetabular impingement / labral pain Treatment in Woolwich",
    shortTitle: "Femoroacetabular impingement / labral pain",
    region: "Pelvis & Hip",
    summary:
      "Osteopathic assessment and care in Woolwich for femoroacetabular impingement / labral pain (pelvis & hip). Anterior groin pain on deep flexion/inward rotation. Common in young athletes. C-sign positive.",
    heroLine:
      "Clear assessment and a practical plan for femoroacetabular impingement / labral pain — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to femoroacetabular impingement / labral pain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "Femoroacetabular impingement / labral pain Woolwich",
      "Femoroacetabular impingement / labral pain osteopath SE18",
      "femoroacetabular impingement Woolwich",
    ],
  },
  {
    slug: "piriformis-syndrome",
    title: "Deep gluteal / piriformis syndrome Treatment in Woolwich",
    shortTitle: "Deep gluteal / piriformis syndrome",
    region: "Pelvis & Hip",
    summary:
      "Osteopathic assessment and care in Woolwich for deep gluteal / piriformis syndrome (pelvis & hip). Buttock pain with or without sciatic-type referral, reproduced by sustained sitting and resisted outward rotation/abduction.",
    heroLine:
      "Clear assessment and a practical plan for deep gluteal / piriformis syndrome — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with prolonged sitting",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "Deep gluteal / piriformis syndrome Woolwich",
      "Deep gluteal / piriformis syndrome osteopath SE18",
      "piriformis syndrome Woolwich",
    ],
  },
  {
    slug: "hamstring-strain",
    title: "Hamstring strain / proximal tendinopathy Treatment in Woolwich",
    shortTitle: "Hamstring strain / proximal tendinopathy",
    region: "Pelvis & Hip",
    summary:
      "Osteopathic assessment and care in Woolwich for hamstring strain / proximal tendinopathy (pelvis & hip). Posterior thigh pain on lengthening/sprinting. Tendinopathy involves sit-bone pain on sitting/hill running.",
    heroLine:
      "Clear assessment and a practical plan for hamstring strain / proximal tendinopathy — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with prolonged sitting",
      "Aggravated by walking or running",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "Hamstring strain / proximal tendinopathy Woolwich",
      "Hamstring strain / proximal tendinopathy osteopath SE18",
      "hamstring strain Woolwich",
    ],
  },
  {
    slug: "groin-pain",
    title: "Adductor-related groin pain Treatment in Woolwich",
    shortTitle: "Adductor-related groin pain",
    region: "Pelvis & Hip",
    summary:
      "Osteopathic assessment and care in Woolwich for adductor-related groin pain (pelvis & hip). Groin pain on resisted adduction or change of direction. Common in football, hockey.",
    heroLine:
      "Clear assessment and a practical plan for adductor-related groin pain — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to adductor-related groin pain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Flag red flags and discuss GP or imaging pathways only when clinically needed",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "Adductor-related groin pain Woolwich",
      "Adductor-related groin pain osteopath SE18",
      "groin pain Woolwich",
    ],
  },
  {
    slug: "knee-oa",
    title: "Knee osteoarthritis Treatment in Woolwich",
    shortTitle: "Knee osteoarthritis",
    region: "Knee",
    summary:
      "Osteopathic assessment and care in Woolwich for knee osteoarthritis (knee). Activity-related knee pain, morning stiffness <30 min, crepitus. Exercise is first-line.",
    heroLine:
      "Clear assessment and a practical plan for knee osteoarthritis — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Morning stiffness or first-step pain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    relatedBlogSlug: "hip-knee-pain-osteopath-woolwich",
    keywords: [
      "Knee osteoarthritis Woolwich",
      "Knee osteoarthritis osteopath SE18",
      "knee oa Woolwich",
    ],
  },
  {
    slug: "patellofemoral-pain",
    title: "Patellofemoral pain syndrome Treatment in Woolwich",
    shortTitle: "Patellofemoral pain syndrome",
    region: "Knee",
    summary:
      "Osteopathic assessment and care in Woolwich for patellofemoral pain syndrome (knee). Anterior knee pain on stairs, squatting, prolonged sitting. Common in runners/young women.",
    heroLine:
      "Clear assessment and a practical plan for patellofemoral pain syndrome — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with prolonged sitting",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "Patellofemoral pain syndrome Woolwich",
      "Patellofemoral pain syndrome osteopath SE18",
      "patellofemoral pain Woolwich",
    ],
  },
  {
    slug: "patellar-tendinopathy",
    title: "Patellar tendinopathy Treatment in Woolwich",
    shortTitle: "Patellar tendinopathy",
    region: "Knee",
    summary:
      "Osteopathic assessment and care in Woolwich for patellar tendinopathy (knee). Inferior pole patella pain on jumping/squatting. Common in volleyball/basketball.",
    heroLine:
      "Clear assessment and a practical plan for patellar tendinopathy — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to patellar tendinopathy",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "patellar-tendinopathy-shockwave-woolwich",
    keywords: [
      "Patellar tendinopathy Woolwich",
      "Patellar tendinopathy osteopath SE18",
      "patellar tendinopathy Woolwich",
    ],
  },
  {
    slug: "acl-rehab",
    title: "ACL injury / post-reconstruction Treatment in Woolwich",
    shortTitle: "ACL injury / post-reconstruction",
    region: "Knee",
    summary:
      "Osteopathic assessment and care in Woolwich for acl injury / post-reconstruction (knee). Phased rehab over 9–12 months. Criteria-based progression, not time-based.",
    heroLine:
      "Clear assessment and a practical plan for acl injury / post-reconstruction — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to acl injury / post-reconstruction",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "ACL injury / post-reconstruction Woolwich",
      "ACL injury / post-reconstruction osteopath SE18",
      "acl rehab Woolwich",
    ],
  },
  {
    slug: "meniscal-injury",
    title: "Meniscal injury Treatment in Woolwich",
    shortTitle: "Meniscal injury",
    region: "Knee",
    summary:
      "Osteopathic assessment and care in Woolwich for meniscal injury (knee). Joint-line pain with twisting/squatting. Most degenerative tears respond to exercise as well as surgery.",
    heroLine:
      "Clear assessment and a practical plan for meniscal injury — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to meniscal injury",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "Meniscal injury Woolwich",
      "Meniscal injury osteopath SE18",
      "meniscal injury Woolwich",
    ],
  },
  {
    slug: "itb-syndrome",
    title: "Iliotibial band syndrome Treatment in Woolwich",
    shortTitle: "Iliotibial band syndrome",
    region: "Knee",
    summary:
      "Osteopathic assessment and care in Woolwich for iliotibial band syndrome (knee). Lateral knee pain in runners/cyclists. Compression over lateral femoral epicondyle.",
    heroLine:
      "Clear assessment and a practical plan for iliotibial band syndrome — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to iliotibial band syndrome",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "Iliotibial band syndrome Woolwich",
      "Iliotibial band syndrome osteopath SE18",
      "itb syndrome Woolwich",
    ],
  },
  {
    slug: "lateral-ankle-sprain",
    title: "Lateral ankle sprain Treatment in Woolwich",
    shortTitle: "Lateral ankle sprain",
    region: "Ankle & Foot",
    summary:
      "Osteopathic assessment and care in Woolwich for lateral ankle sprain (ankle & foot). outer ankle ligament with or without calcaneofibular ligament injury. Early loading + proprioception reduce recurrence.",
    heroLine:
      "Clear assessment and a practical plan for lateral ankle sprain — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to lateral ankle sprain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "ankle-sprain-rehab-osteopath-woolwich",
    keywords: [
      "Lateral ankle sprain Woolwich",
      "Lateral ankle sprain osteopath SE18",
      "lateral ankle sprain Woolwich",
    ],
  },
  {
    slug: "achilles-tendinopathy",
    title: "Achilles tendinopathy Treatment in Woolwich",
    shortTitle: "Achilles tendinopathy",
    region: "Ankle & Foot",
    summary:
      "Osteopathic assessment and care in Woolwich for achilles tendinopathy (ankle & foot). Posterior heel pain 2–6 cm above insertion. Morning stiffness, eases with warmth then worsens with load.",
    heroLine:
      "Clear assessment and a practical plan for achilles tendinopathy — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Morning stiffness or first-step pain",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "achilles-tendinopathy-shockwave-woolwich",
    keywords: [
      "Achilles tendinopathy Woolwich",
      "Achilles tendinopathy osteopath SE18",
      "achilles tendinopathy Woolwich",
    ],
  },
  {
    slug: "plantar-fasciitis",
    title: "Plantar Fasciitis & Heel Pain in Woolwich",
    shortTitle: "Heel pain",
    region: "Ankle & Foot",
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
    relatedBlogSlug: "plantar-fasciitis-shockwave-woolwich",
    keywords: [
      "plantar fasciitis Woolwich",
      "heel pain osteopath SE18",
      "shockwave heel pain Woolwich",
    ],
    featured: true,
  },
  {
    slug: "shin-splints",
    title: "Medial tibial stress syndrome Treatment in Woolwich",
    shortTitle: "Medial tibial stress syndrome",
    region: "Ankle & Foot",
    summary:
      "Osteopathic assessment and care in Woolwich for medial tibial stress syndrome (ankle & foot). Diffuse medial tibial pain with running. Differentiate from stress fracture (focal pain).",
    heroLine:
      "Clear assessment and a practical plan for medial tibial stress syndrome — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Aggravated by walking or running",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "shin-splints-osteopath-woolwich",
    keywords: [
      "Medial tibial stress syndrome Woolwich",
      "Medial tibial stress syndrome osteopath SE18",
      "shin splints Woolwich",
    ],
  },
  {
    slug: "hallux-rigidus",
    title: "Hallux rigidus / 1st MTP OA Treatment in Woolwich",
    shortTitle: "Hallux rigidus / 1st MTP OA",
    region: "Ankle & Foot",
    summary:
      "Osteopathic assessment and care in Woolwich for hallux rigidus / 1st mtp oa (ankle & foot). Stiff painful 1st toe joint joint, especially on push-off. Limits great-toe extension.",
    heroLine:
      "Clear assessment and a practical plan for hallux rigidus / 1st mtp oa — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Worse with bending backwards or twisting",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    keywords: [
      "Hallux rigidus / 1st MTP OA Woolwich",
      "Hallux rigidus / 1st MTP OA osteopath SE18",
      "hallux rigidus Woolwich",
    ],
  },
  {
    slug: "morton-neuroma",
    title: "Morton's neuroma Treatment in Woolwich",
    shortTitle: "Morton's neuroma",
    region: "Ankle & Foot",
    summary:
      "Osteopathic assessment and care in Woolwich for morton's neuroma (ankle & foot). Burning forefoot pain between 3rd–4th metatarsals. Mulder's click positive.",
    heroLine:
      "Clear assessment and a practical plan for morton's neuroma — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to morton's neuroma",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    keywords: [
      "Morton's neuroma Woolwich",
      "Morton's neuroma osteopath SE18",
      "morton neuroma Woolwich",
    ],
  },
  {
    slug: "subacromial-pain",
    title: "Subacromial pain syndrome Treatment in Woolwich",
    shortTitle: "Subacromial pain syndrome",
    region: "Shoulder",
    summary:
      "Osteopathic assessment and care in Woolwich for subacromial pain syndrome (shoulder). Lateral shoulder pain on elevation/reaching. Most respond to graded loading.",
    heroLine:
      "Clear assessment and a practical plan for subacromial pain syndrome — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain reaching overhead or across the body",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "shoulder-pain-frozen-shoulder-woolwich",
    keywords: [
      "Subacromial pain syndrome Woolwich",
      "Subacromial pain syndrome osteopath SE18",
      "subacromial pain Woolwich",
    ],
  },
  {
    slug: "rotator-cuff-tear",
    title: "Rotator cuff tear Treatment in Woolwich",
    shortTitle: "Rotator cuff tear",
    region: "Shoulder",
    summary:
      "Osteopathic assessment and care in Woolwich for rotator cuff tear (shoulder). Most degenerative tears respond to exercise as well as surgery. Acute traumatic tears in young patients often surgical.",
    heroLine:
      "Clear assessment and a practical plan for rotator cuff tear — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to rotator cuff tear",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "headaches-joints",
    keywords: [
      "Rotator cuff tear Woolwich",
      "Rotator cuff tear osteopath SE18",
      "rotator cuff tear Woolwich",
    ],
  },
  {
    slug: "frozen-shoulder",
    title: "Frozen Shoulder Help in Woolwich",
    shortTitle: "Frozen shoulder",
    region: "Shoulder",
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
    featured: true,
  },
  {
    slug: "shoulder-instability",
    title: "Shoulder instability Treatment in Woolwich",
    shortTitle: "Shoulder instability",
    region: "Shoulder",
    summary:
      "Osteopathic assessment and care in Woolwich for shoulder instability (shoulder). Hypermobile shoulder with apprehension and dead-arm episodes. Rockwood protocol: progressive cuff + scapular work.",
    heroLine:
      "Clear assessment and a practical plan for shoulder instability — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to shoulder instability",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "headaches-joints",
    keywords: [
      "Shoulder instability Woolwich",
      "Shoulder instability osteopath SE18",
      "shoulder instability Woolwich",
    ],
  },
  {
    slug: "ac-joint-injury",
    title: "AC joint sprain / OA Treatment in Woolwich",
    shortTitle: "AC joint sprain / OA",
    region: "Shoulder",
    summary:
      "Osteopathic assessment and care in Woolwich for ac joint sprain / oa (shoulder). Pain on top of shoulder, worse with cross-body adduction and heavy bench. Grade I–II respond to load.",
    heroLine:
      "Clear assessment and a practical plan for ac joint sprain / oa — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to ac joint sprain / oa",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "headaches-joints",
    keywords: [
      "AC joint sprain / OA Woolwich",
      "AC joint sprain / OA osteopath SE18",
      "ac joint injury Woolwich",
    ],
  },
  {
    slug: "tennis-elbow",
    title: "Tennis Elbow Treatment in Woolwich",
    shortTitle: "Tennis elbow",
    region: "Elbow & Wrist",
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
    relatedBlogSlug: "tennis-elbow-shockwave-osteopath-woolwich",
    keywords: [
      "tennis elbow Woolwich",
      "lateral epicondylitis osteopath",
      "elbow pain Woolwich",
    ],
    featured: true,
  },
  {
    slug: "medial-epicondylalgia",
    title: "Medial epicondylalgia Treatment in Woolwich",
    shortTitle: "Medial epicondylalgia",
    region: "Elbow & Wrist",
    summary:
      "Osteopathic assessment and care in Woolwich for medial epicondylalgia (elbow & wrist). Common flexor-pronator tendinopathy. Pain on resisted wrist flexion/pronation.",
    heroLine:
      "Clear assessment and a practical plan for medial epicondylalgia — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to medial epicondylalgia",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "golfers-elbow-osteopath-woolwich",
    keywords: [
      "Medial epicondylalgia Woolwich",
      "Medial epicondylalgia osteopath SE18",
      "medial epicondylalgia Woolwich",
    ],
  },
  {
    slug: "cubital-tunnel",
    title: "Cubital tunnel syndrome Treatment in Woolwich",
    shortTitle: "Cubital tunnel syndrome",
    region: "Elbow & Wrist",
    summary:
      "Osteopathic assessment and care in Woolwich for cubital tunnel syndrome (elbow & wrist). Ulnar nerve entrapment at elbow. Numbness ring/little finger, weak grip in chronic cases.",
    heroLine:
      "Clear assessment and a practical plan for cubital tunnel syndrome — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain with gripping or lifting",
      "Pins and needles, numbness, or nerve-type referral",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    keywords: [
      "Cubital tunnel syndrome Woolwich",
      "Cubital tunnel syndrome osteopath SE18",
      "cubital tunnel Woolwich",
    ],
  },
  {
    slug: "carpal-tunnel",
    title: "Carpal tunnel syndrome Treatment in Woolwich",
    shortTitle: "Carpal tunnel syndrome",
    region: "Elbow & Wrist",
    summary:
      "Osteopathic assessment and care in Woolwich for carpal tunnel syndrome (elbow & wrist). Median nerve entrapment at wrist. Nocturnal paraesthesia thumb-index-middle, eased by shaking.",
    heroLine:
      "Clear assessment and a practical plan for carpal tunnel syndrome — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Night pain or sleep disturbance",
      "Pins and needles, numbness, or nerve-type referral",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    relatedBlogSlug: "rsi-wrist-forearm-office-osteopath",
    keywords: [
      "Carpal tunnel syndrome Woolwich",
      "Carpal tunnel syndrome osteopath SE18",
      "carpal tunnel Woolwich",
    ],
  },
  {
    slug: "dequervains",
    title: "De Quervain's tenosynovitis Treatment in Woolwich",
    shortTitle: "De Quervain's tenosynovitis",
    region: "Elbow & Wrist",
    summary:
      "Osteopathic assessment and care in Woolwich for de quervain's tenosynovitis (elbow & wrist). Pain over radial styloid, positive Finkelstein. Common in new parents (baby-lifting).",
    heroLine:
      "Clear assessment and a practical plan for de quervain's tenosynovitis — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to de quervain's tenosynovitis",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    keywords: [
      "De Quervain's tenosynovitis Woolwich",
      "De Quervain's tenosynovitis osteopath SE18",
      "dequervains Woolwich",
    ],
  },
  {
    slug: "cmc-oa",
    title: "Thumb CMC osteoarthritis Treatment in Woolwich",
    shortTitle: "Thumb CMC osteoarthritis",
    region: "Elbow & Wrist",
    summary:
      "Osteopathic assessment and care in Woolwich for thumb cmc osteoarthritis (elbow & wrist). Base-of-thumb pain on pinch/grip. Common in postmenopausal women.",
    heroLine:
      "Clear assessment and a practical plan for thumb cmc osteoarthritis — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain with gripping or lifting",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Discuss focused shockwave or referral when conservative care alone is not enough",
    ],
    relatedServiceSlug: "focused-shockwave",
    keywords: [
      "Thumb CMC osteoarthritis Woolwich",
      "Thumb CMC osteoarthritis osteopath SE18",
      "cmc oa Woolwich",
    ],
  },
  {
    slug: "fibromyalgia",
    title: "Fibromyalgia / central sensitisation Treatment in Woolwich",
    shortTitle: "Fibromyalgia / central sensitisation",
    region: "Whole body",
    summary:
      "Osteopathic assessment and care in Woolwich for fibromyalgia / central sensitisation (whole body). Widespread pain with fatigue, poor sleep, cognitive symptoms. Aerobic exercise and pacing are first-line.",
    heroLine:
      "Clear assessment and a practical plan for fibromyalgia / central sensitisation — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to fibromyalgia / central sensitisation",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Coordinate pacing, graded activity, and GP/imaging pathways when needed",
    ],
    relatedServiceSlug: "headaches-joints",
    keywords: [
      "Fibromyalgia / central sensitisation Woolwich",
      "Fibromyalgia / central sensitisation osteopath SE18",
      "fibromyalgia Woolwich",
    ],
  },
  {
    slug: "deconditioning",
    title: "General deconditioning / sedentary lifestyle Treatment in Woolwich",
    shortTitle: "General deconditioning / sedentary lifestyle",
    region: "Whole body",
    summary:
      "Osteopathic assessment and care in Woolwich for general deconditioning / sedentary lifestyle (whole body). Reduced cardiovascular and musculoskeletal capacity from inactivity. Common after long illness, retirement, or sedentary work.",
    heroLine:
      "Clear assessment and a practical plan for general deconditioning / sedentary lifestyle — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to general deconditioning / sedentary lifestyle",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Coordinate pacing, graded activity, and GP/imaging pathways when needed",
    ],
    relatedServiceSlug: "headaches-joints",
    keywords: [
      "General deconditioning / sedentary lifestyle Woolwich",
      "General deconditioning / sedentary lifestyle osteopath SE18",
      "deconditioning Woolwich",
    ],
  },
  {
    slug: "osteoporosis",
    title: "Osteoporosis / low bone density Treatment in Woolwich",
    shortTitle: "Osteoporosis / low bone density",
    region: "Whole body",
    summary:
      "Osteopathic assessment and care in Woolwich for osteoporosis / low bone density (whole body). Reduced bone mineral density with fracture risk. Weight-bearing + resistance training are protective.",
    heroLine:
      "Clear assessment and a practical plan for osteoporosis / low bone density — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to osteoporosis / low bone density",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Coordinate pacing, graded activity, and GP/imaging pathways when needed",
    ],
    relatedServiceSlug: "headaches-joints",
    keywords: [
      "Osteoporosis / low bone density Woolwich",
      "Osteoporosis / low bone density osteopath SE18",
      "osteoporosis Woolwich",
    ],
  },
  {
    slug: "post-surgical-general",
    title: "Post-surgical rehab Treatment in Woolwich",
    shortTitle: "Post-surgical rehab",
    region: "Whole body",
    summary:
      "Osteopathic assessment and care in Woolwich for post-surgical rehab (whole body). Follow surgeon protocol. General principles: protect repair → range of movement → strength → function.",
    heroLine:
      "Clear assessment and a practical plan for post-surgical rehab — so you know what is driving symptoms and what to do next.",
    symptoms: [
      "Pain or stiffness linked to post-surgical rehab",
      "Symptoms that change with posture, load, or activity",
      "Difficulty with work, sport, or daily tasks",
    ],
    howWeHelp: [
      "Take a full history and examine the joints, soft tissue, and movement patterns involved",
      "Hands-on osteopathic treatment matched to irritability and stage",
      "Clear advice on pacing, load, and what you can do between visits",
      "Coordinate pacing, graded activity, and GP/imaging pathways when needed",
    ],
    relatedServiceSlug: "sports-injury-rehab",
    keywords: [
      "Post-surgical rehab Woolwich",
      "Post-surgical rehab osteopath SE18",
      "post surgical general Woolwich",
    ],
  },
];

export function getCondition(slug: string) {
  return conditions.find((condition) => condition.slug === slug);
}

export function getAllConditionSlugs() {
  return conditions.map((condition) => condition.slug);
}

export function getConditionsByRegion(region: ConditionRegion) {
  return conditions.filter((condition) => condition.region === region);
}

export function getFeaturedConditions() {
  return conditions.filter((condition) => condition.featured);
}
