/**
 * Public patient education on supplements & recovery habits.
 * Original clinic copy — not a republication of any third-party guide.
 * Educational only; not personalised prescribing advice.
 */

export type SupplementSection = {
  heading: string;
  body: string;
};

export type SupplementFaq = {
  question: string;
  answer: string;
};

export type SupplementTopic = {
  slug: string;
  title: string;
  summary: string;
  category:
    | "Minerals"
    | "Vitamins"
    | "Fatty acids"
    | "Protein & collagen"
    | "Herbal"
    | "Recovery habits"
    | "Guidance";
  sections: SupplementSection[];
  relatedConditionSlugs: string[];
  relatedExercisePath?: string;
  faqs: SupplementFaq[];
  caveats: string[];
};

export const supplementDisclaimer =
  "These pages are general patient education from Nguyen's Osteopathic Clinic. They are not a prescription, diagnosis, or product endorsement. Supplements can interact with medicines and medical conditions — check with your GP, pharmacist, or osteopath before starting anything new. Food supplements are not a substitute for clinical assessment, rehab, or prescribed treatment.";

export const supplementCategories: SupplementTopic["category"][] = [
  "Guidance",
  "Minerals",
  "Vitamins",
  "Fatty acids",
  "Protein & collagen",
  "Herbal",
  "Recovery habits",
];

export const supplements: SupplementTopic[] = [
  {
    slug: "supplements-wont-fix-back-pain",
    title: "When supplements will not fix back pain",
    summary:
      "Most back and neck pain settles with movement, load management, and targeted care — not a bottle from the shelf. Know what supplements can and cannot do.",
    category: "Guidance",
    sections: [
      {
        heading: "What usually drives MSK pain",
        body: "Non-specific low back pain, desk-related neck ache, and many tendon problems are driven by how tissues are loaded, how you move, sleep, and recover — plus medical red flags that need proper screening. A capsule rarely changes those drivers on its own.",
      },
      {
        heading: "Where supplements may sit",
        body: "If blood tests show a clear deficiency (for example low vitamin D), correcting it can support general health. That is different from expecting magnesium, turmeric, or collagen to replace assessment, manual therapy, or a graded exercise plan.",
      },
      {
        heading: "A practical order of priorities",
        body: "1) Rule out urgent medical causes. 2) Understand aggravating loads at work or sport. 3) Rebuild capacity with progressive movement. 4) Only then discuss nutrition or supplements as an adjunct — not as the main treatment.",
      },
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "neck-pain",
      "sciatica",
      "deconditioning",
    ],
    relatedExercisePath: "/exercises",
    faqs: [
      {
        question: "Should I stop the supplements I already take?",
        answer:
          "Do not stop prescribed medicines or GP-advised supplements without advice. Bring a list to your appointment so we can talk about what is relevant to your MSK plan.",
      },
      {
        question: "Can I still ask about vitamins at the clinic?",
        answer:
          "Yes. We can help you think through questions to take to your GP or pharmacist, especially when pain, sleep, or recovery are involved.",
      },
    ],
    caveats: [
      "Red-flag symptoms (severe night pain, unexplained weight loss, neurological change, chest pain) need medical assessment first.",
      "Marketing claims on packaging are not the same as clinical evidence for your specific diagnosis.",
    ],
  },
  {
    slug: "magnesium-muscle-tension",
    title: "Magnesium and muscle tension",
    summary:
      "Magnesium is involved in normal muscle and nerve function. Deficiency can matter — but it is not a cure-all for tight muscles or back spasms.",
    category: "Minerals",
    sections: [
      {
        heading: "Why patients ask about it",
        body: "People often link magnesium with cramps, evening restlessness, or feeling 'tight'. Food sources (leafy greens, nuts, seeds, whole grains) already cover needs for many adults. Extra capsules are more useful when intake is low or a clinician has identified a gap.",
      },
      {
        heading: "How this fits osteopathy",
        body: "Persistent muscle guarding around a painful joint usually needs load change and rehab, not only a mineral. We still ask about diet, alcohol, and medicines because they affect recovery and sleep — both of which influence pain.",
      },
      {
        heading: "Forms and practical notes",
        body: "Different salts (citrate, glycinate, oxide and others) vary in absorption and gut tolerance. Your pharmacist can help match a form to your stomach and other medicines. More is not better; high doses often cause loose stools.",
      },
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "neck-pain",
      "fibromyalgia",
    ],
    relatedExercisePath: "/exercises/programmes/post-visit-gentle-move",
    faqs: [
      {
        question: "Will magnesium stop my back from spasming?",
        answer:
          "Unlikely on its own. Spasm often settles as pain and threat reduce and as you restore gentle movement. Correcting a true deficiency may help general muscle function, not replace hands-on care or rehab.",
      },
      {
        question: "Is topical magnesium oil enough?",
        answer:
          "Evidence for topical absorption into muscle is limited. If you enjoy the massage feel, treat it as comfort care — not a guaranteed systemic dose.",
      },
    ],
    caveats: [
      "Kidney disease and some heart medicines change how magnesium should be used — ask a pharmacist or GP.",
      "Do not combine multiple high-dose products without checking the total daily amount.",
    ],
  },
  {
    slug: "vitamin-d-msk-health",
    title: "Vitamin D and musculoskeletal health",
    summary:
      "Vitamin D supports bone and muscle health. In the UK, many adults run low in winter — but dosing should follow blood results and medical advice.",
    category: "Vitamins",
    sections: [
      {
        heading: "Why it shows up in MSK clinics",
        body: "Low vitamin D is linked with bone health risk and can contribute to generalised aches or slower recovery in some people. It does not explain every episode of sciatica or desk neck, so we avoid guessing from symptoms alone.",
      },
      {
        heading: "Testing before megadosing",
        body: "If fatigue, bone pain, or fracture risk are concerns, your GP can arrange a blood test. UK public health guidance often includes a maintenance dose through darker months; therapeutic doses for deficiency belong under medical supervision.",
      },
      {
        heading: "Alongside osteopathy",
        body: "For osteoporosis risk, tendinopathy rehab, or post-fracture recovery, vitamin D status is one piece of the picture next to strength training, balance work, and safe loading — not a stand-alone fix.",
      },
    ],
    relatedConditionSlugs: [
      "osteoporosis",
      "non-specific-low-back-pain",
      "deconditioning",
      "hip-oa",
    ],
    faqs: [
      {
        question: "Can I just take a high-street spray?",
        answer:
          "Many adults use a standard maintenance product safely. If you already take multivitamins, cod liver oil, or prescription D, add up the total and check with a pharmacist to avoid excess.",
      },
      {
        question: "Does sunshine in Woolwich cover me?",
        answer:
          "Short summer exposure can help, but indoor work, darker skin, covering clothing, and winter UV make deficiency common in London. Do not rely on 'feeling fine' as a test result.",
      },
    ],
    caveats: [
      "Excess vitamin D can raise calcium to unsafe levels.",
      "People with sarcoidosis, some lymphomas, or kidney stones need individual medical advice before supplementing.",
    ],
  },
  {
    slug: "omega-3-inflammation",
    title: "Omega-3 fats and inflammation",
    summary:
      "Long-chain omega-3s from oily fish support general health and may modestly influence inflammatory pathways — they are not a substitute for tendon loading or joint rehab.",
    category: "Fatty acids",
    sections: [
      {
        heading: "What the evidence roughly says",
        body: "Eating oily fish a couple of times a week is a sensible default for heart and general health. Concentrated EPA/DHA capsules are sometimes used for inflammatory joint symptoms; results vary and doses in studies are often higher than basic retail softgels.",
      },
      {
        heading: "MSK clinic framing",
        body: "For frozen shoulder, tendinopathy, or osteoarthritis pain, the heavy lifting still comes from graded movement, sleep, and reducing unhelpful spikes in load. Omega-3 can be a dietary adjunct after you and your GP or pharmacist decide it is appropriate.",
      },
      {
        heading: "Quality and bleeding risk",
        body: "Choose products that state EPA/DHA content clearly. High doses can affect bleeding risk, especially with anticoagulants — always check before surgery or if you bruise easily.",
      },
    ],
    relatedConditionSlugs: [
      "frozen-shoulder",
      "knee-oa",
      "hip-oa",
      "achilles-tendinopathy",
      "tennis-elbow",
    ],
    faqs: [
      {
        question: "Is flaxseed oil the same as fish oil?",
        answer:
          "Flax provides ALA, which converts poorly to EPA/DHA in many people. If you want long-chain omega-3s and do not eat fish, ask a pharmacist about algae-based DHA/EPA options.",
      },
    ],
    caveats: [
      "Stop or pause high-dose oils before planned procedures only if your clinician advises it.",
      "Rancid oils (strong fishy burps, poor storage) are worth replacing.",
    ],
  },
  {
    slug: "collagen-tendons-joints",
    title: "Collagen for tendons and joints",
    summary:
      "Collagen supplements are popular for tendons and knees. Evidence is emerging but mixed — pair any trial with progressive loading, not rest alone.",
    category: "Protein & collagen",
    sections: [
      {
        heading: "The rehab-first view",
        body: "Tendons adapt to well-timed load. Patellar, Achilles, and rotator-cuff programmes succeed because capacity is rebuilt. A collagen powder without that stimulus is unlikely to remodel tissue on its own.",
      },
      {
        heading: "What some studies explore",
        body: "Certain protocols combine collagen (sometimes with vitamin C) around training. Results are not universal, products differ, and many trials are small. Treat marketing claims cautiously.",
      },
      {
        heading: "Protein more broadly",
        body: "Meeting daily protein needs from food supports muscle and recovery during rehab. If appetite is low or you are older and rebuilding strength, a dietitian or GP can advise before specialised powders.",
      },
    ],
    relatedConditionSlugs: [
      "achilles-tendinopathy",
      "patellar-tendinopathy",
      "tennis-elbow",
      "rotator-cuff-tear",
      "knee-oa",
    ],
    relatedExercisePath: "/exercises",
    faqs: [
      {
        question: "Gelatine in cooking — is that enough?",
        answer:
          "Bone broths and gelatine provide collagen-derived amino acids, but amounts are inconsistent. Food-first protein still matters more than chasing one ingredient.",
      },
    ],
    caveats: [
      "People with restrictive diets or kidney disease should get personalised nutrition advice.",
      "Collagen is not a medicine for cartilage 'regrowth' despite some labels.",
    ],
  },
  {
    slug: "turmeric-curcumin-caveats",
    title: "Turmeric and curcumin — useful caveats",
    summary:
      "Curcumin is studied for joint comfort, but absorption, dose, and medicine interactions matter. Kitchen turmeric is not the same as a high-dose extract.",
    category: "Herbal",
    sections: [
      {
        heading: "Interest vs expectation",
        body: "Some people with osteoarthritis try curcumin extracts for comfort. Effects, if any, are usually modest. It should never delay assessment of night pain, locking, giving-way, or inflammatory red flags.",
      },
      {
        heading: "Absorption and additives",
        body: "Curcumin absorbs poorly alone; many products add piperine (black pepper extract) or use special formulations. Piperine can change how other medicines are metabolised — check with a pharmacist.",
      },
      {
        heading: "Clinic stance",
        body: "We focus on strength, joint mechanics, and activity modification first. If you already use turmeric products, tell us so we can factor gut side effects or interaction questions into your plan.",
      },
    ],
    relatedConditionSlugs: ["knee-oa", "hip-oa", "cmc-oa", "frozen-shoulder"],
    faqs: [
      {
        question: "Can I cook with more turmeric instead?",
        answer:
          "Culinary amounts are generally fine in food for most people. They rarely match study doses. Enjoy the flavour; do not expect stew to replace physio-style loading.",
      },
    ],
    caveats: [
      "Gallbladder disease, upcoming surgery, and anticoagulant use need pharmacist or GP review before concentrated extracts.",
      "Stop herbal products before surgery only under clinical advice.",
    ],
  },
  {
    slug: "sleep-recovery-nutrients",
    title: "Sleep, stress, and recovery nutrients",
    summary:
      "Pain and sleep trade blows. Magnesium-rich food, steady caffeine timing, and wind-down habits often help more than a stack of 'sleep' capsules.",
    category: "Recovery habits",
    sections: [
      {
        heading: "Why sleep belongs on an MSK plan",
        body: "Poor sleep raises pain sensitivity and slows rehab adherence. Evening scrolling, late caffeine, alcohol, and uncontrolled night pain are common Woolwich-clinic themes — more than exotic supplements.",
      },
      {
        heading: "Nutrients people ask about",
        body: "Magnesium, herbal teas, and pharmacy sleep aids appear often in patient questions. Some are short-term options after pharmacist advice; none replace treating the painful driver (for example disc-related night pain or shoulder irritability).",
      },
      {
        heading: "What we usually prioritise",
        body: "Positioning for night comfort, daytime load balance, and a consistent sleep window. If mood, apnoea symptoms, or long-term insomnia dominate, we signpost GP or specialist care rather than escalating supplements.",
      },
    ],
    relatedConditionSlugs: [
      "non-specific-low-back-pain",
      "frozen-shoulder",
      "fibromyalgia",
      "cervicogenic-headache",
    ],
    relatedExercisePath: "/exercises/programmes/post-visit-gentle-move",
    faqs: [
      {
        question: "Are melatonin gummies OK?",
        answer:
          "In the UK, melatonin is generally prescription-only for specific uses. Do not import high-dose products casually — ask your GP.",
      },
    ],
    caveats: [
      "Sedating herbals can linger into the next morning and affect driving or manual work.",
      "New snoring, breath pauses, or morning headaches deserve medical review.",
    ],
  },
  {
    slug: "hydration-electrolytes-active",
    title: "Hydration and electrolytes for active patients",
    summary:
      "For most training and desk days, water and normal meals beat fancy electrolyte tubs. Know when salts actually help.",
    category: "Recovery habits",
    sections: [
      {
        heading: "Everyday MSK recovery",
        body: "After osteopathy, we often encourage normal hydration and gentle movement. You do not need a sports drink for a standard office day or a short walk along Powis Street.",
      },
      {
        heading: "When electrolytes earn a place",
        body: "Long hot sessions, heavy sweating, stomach bugs, or medically advised fluid plans are different. Then sodium and fluids matter. Recreational tubs with high sugar or stimulant blends are optional extras, not medical care.",
      },
      {
        heading: "Cramps are multifactorial",
        body: "Night cramps and training cramps relate to fatigue, sudden load spikes, medications, and sometimes electrolytes. Stretching and load management remain central; get persistent cramps checked if they are new or severe.",
      },
    ],
    relatedConditionSlugs: [
      "deconditioning",
      "shin-splints",
      "hamstring-strain",
      "itb-syndrome",
    ],
    relatedExercisePath: "/exercises",
    faqs: [
      {
        question: "How much water should I drink after treatment?",
        answer:
          "Drink to thirst and habitual needs unless your clinician gave a specific plan. Pale straw-coloured urine is a rough guide for many healthy adults.",
      },
    ],
    caveats: [
      "Heart failure, kidney disease, and some blood-pressure medicines change fluid and salt advice — follow your GP.",
      "Over-drinking plain water in long events without sodium can be harmful.",
    ],
  },
  {
    slug: "glucosamine-chondroitin-joints",
    title: "Glucosamine and chondroitin for joints",
    summary:
      "Long-standing joint supplements with mixed evidence. Useful to understand expectations if you already take them.",
    category: "Guidance",
    sections: [
      {
        heading: "What patients hope for",
        body: "Many people with knee or hip osteoarthritis try glucosamine or chondroitin for stiffness. Trial results are inconsistent; some feel a small comfort change, others notice nothing.",
      },
      {
        heading: "What changes function more reliably",
        body: "Quadriceps and hip strength, weight management where relevant, footwear, and activity pacing outperform waiting for a supplement to 'regrow cartilage'.",
      },
      {
        heading: "If you continue them",
        body: "Give a defined trial period, track walking tolerance and morning stiffness, and review with your GP if you take warfarin or have shellfish allergy (some glucosamine is shellfish-derived).",
      },
    ],
    relatedConditionSlugs: ["knee-oa", "hip-oa", "cmc-oa", "hallux-rigidus"],
    faqs: [
      {
        question: "Should I buy the most expensive joint complex?",
        answer:
          "Price does not guarantee benefit. If you use one, pick a reputable brand, avoid megastacks with mystery blends, and keep rehab as the main plan.",
      },
    ],
    caveats: [
      "Shellfish allergy and anticoagulant therapy need product-specific checks.",
      "Supplements are not licensed medicines for reversing osteoarthritis.",
    ],
  },
  {
    slug: "protein-rehab-recovery",
    title: "Protein intake during rehab",
    summary:
      "Enough daily protein helps muscle repair while you rebuild strength after injury or deconditioning — food first, powders second.",
    category: "Protein & collagen",
    sections: [
      {
        heading: "Why rehab asks about protein",
        body: "Building calf endurance after Achilles pain, or quadriceps capacity after knee irritation, needs training stimulus plus building blocks. Older adults often under-eat protein without noticing.",
      },
      {
        heading: "Food-first targets",
        body: "Spread protein across meals from eggs, dairy or alternatives, fish, pulses, lean meat, or tofu. A shake is a convenience tool when appetite or time is short — not a requirement for every patient.",
      },
      {
        heading: "Tie it to your programme",
        body: "We set loading progressions in clinic. Nutrition supports that work; it does not replace the exercises you leave with.",
      },
    ],
    relatedConditionSlugs: [
      "deconditioning",
      "achilles-tendinopathy",
      "patellar-tendinopathy",
      "post-surgical-general",
    ],
    relatedExercisePath: "/exercises",
    faqs: [
      {
        question: "Do I need protein straight after osteopathy?",
        answer:
          "No special post-treatment shake is required. Keep regular meals. If you trained hard the same day, a normal protein-containing meal is enough for most people.",
      },
    ],
    caveats: [
      "Kidney disease needs individualised protein advice from your medical team.",
      "Very high intake without training just adds calories.",
    ],
  },
  {
    slug: "topical-vs-oral-pain-relief",
    title: "Topical gels versus oral supplements",
    summary:
      "Gels, patches, and capsules do different jobs. Match the tool to the problem — and know when pharmacy pain relief needs a proper diagnosis first.",
    category: "Guidance",
    sections: [
      {
        heading: "Topicals",
        body: "Anti-inflammatory gels or heat/cool rubs can ease irritable superficial tissues for some people. They will not correct a lumbar disc problem or rebuild a tendon. Follow packet rules and avoid broken skin.",
      },
      {
        heading: "Oral supplements vs medicines",
        body: "Food supplements are regulated differently from painkillers. Do not swap prescribed analgesia for a herbal capsule without advice. If you need regular pain tablets, get the underlying MSK issue assessed.",
      },
      {
        heading: "Our clinic bias",
        body: "We prefer clarifying diagnosis, calming irritable tissue, and restoring capacity. Pharmacy products can sit alongside that plan when used safely.",
      },
    ],
    relatedConditionSlugs: [
      "tennis-elbow",
      "greater-trochanteric-pain",
      "non-specific-low-back-pain",
      "plantar-fasciitis",
    ],
    faqs: [
      {
        question: "Can I use a CBD rub?",
        answer:
          "Rules and product quality vary. Discuss with a pharmacist, especially if you take other medicines. Do not assume CBD replaces assessment.",
      },
    ],
    caveats: [
      "Oral NSAIDs and some gels are unsuitable in pregnancy, stomach ulcers, kidney disease, or with certain drugs — check first.",
      "Numbing sprays can mask injury and lead to over-stressing tissue.",
    ],
  },
];

export function getSupplement(slug: string): SupplementTopic | undefined {
  return supplements.find((topic) => topic.slug === slug);
}

export function getAllSupplementSlugs(): string[] {
  return supplements.map((topic) => topic.slug);
}

export function getSupplementsByCategory(
  category?: SupplementTopic["category"],
): SupplementTopic[] {
  if (!category) return supplements;
  return supplements.filter((topic) => topic.category === category);
}

/** Topics that explicitly list a condition slug — for condition-page cross-links. */
export function getSupplementsForCondition(
  conditionSlug: string,
  limit = 3,
): SupplementTopic[] {
  return supplements
    .filter((topic) => topic.relatedConditionSlugs.includes(conditionSlug))
    .slice(0, limit);
}
