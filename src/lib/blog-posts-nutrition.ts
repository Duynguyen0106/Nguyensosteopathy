/**
 * Nutrition & recovery blog posts — migrated from the former /education/nutrition guides.
 * Original clinic copy; educational only, not prescribing advice.
 */
import type { BlogCategory, BlogPost } from "@/lib/blog";

type NutritionPost = Omit<BlogPost, "image" | "readingMinutes" | "category"> & {
  readingMinutes?: number;
  category: BlogCategory;
  image: BlogPost["image"];
  relatedConditionSlugs: string[];
};

const CATEGORY = "Nutrition & recovery" as BlogCategory;

function post(partial: NutritionPost): NutritionPost {
  return { readingMinutes: partial.readingMinutes ?? 5, ...partial };
}

export const nutritionBlogRelatedConditions: Record<string, string[]> = {
  "supplements-wont-fix-back-pain": ["non-specific-low-back-pain","neck-pain","sciatica","deconditioning"],
  "magnesium-muscle-tension": ["non-specific-low-back-pain","neck-pain","fibromyalgia"],
  "vitamin-d-msk-health": ["osteoporosis","non-specific-low-back-pain","deconditioning","hip-oa"],
  "omega-3-inflammation": ["frozen-shoulder","knee-oa","hip-oa","achilles-tendinopathy","tennis-elbow"],
  "collagen-tendons-joints": ["achilles-tendinopathy","patellar-tendinopathy","tennis-elbow","rotator-cuff-tear","knee-oa"],
  "turmeric-curcumin-caveats": ["knee-oa","hip-oa","cmc-oa","frozen-shoulder"],
  "sleep-recovery-nutrients": ["non-specific-low-back-pain","frozen-shoulder","fibromyalgia","cervicogenic-headache"],
  "hydration-electrolytes-active": ["deconditioning","shin-splints","hamstring-strain","itb-syndrome"],
  "glucosamine-chondroitin-joints": ["knee-oa","hip-oa","cmc-oa","hallux-rigidus"],
  "protein-rehab-recovery": ["deconditioning","achilles-tendinopathy","patellar-tendinopathy","post-surgical-general"],
  "topical-vs-oral-pain-relief": ["tennis-elbow","greater-trochanteric-pain","non-specific-low-back-pain","plantar-fasciitis"],
};

export const nutritionBlogPosts: NutritionPost[] = [
  post({
    slug: "supplements-wont-fix-back-pain",
    title: "When supplements will not fix back pain",
    description: "Most back and neck pain settles with movement, load management, and targeted care — not a bottle from the shelf. Know what supplements can and cannot do.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "supplements back pain",
      "vitamins for back pain Woolwich",
      "osteopath nutrition SE18",
      "MSK supplements myth"
    ],
    image: {
      "src": "/images/blog/back-pain-woolwich-osteopathy.webp",
      "alt": "Adult holding the lower back due to back pain"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["supplements-wont-fix-back-pain"],
    sections: [
      {
        "heading": "What usually drives MSK pain",
        "paragraphs": [
          "Non-specific low back pain, desk-related neck ache, and many tendon problems are driven by how tissues are loaded, how you move, sleep, and recover — plus medical red flags that need proper screening. A capsule rarely changes those drivers on its own."
        ]
      },
      {
        "heading": "Where supplements may sit",
        "paragraphs": [
          "If blood tests show a clear deficiency (for example low vitamin D), correcting it can support general health. That is different from expecting magnesium, turmeric, or collagen to replace assessment, manual therapy, or a graded exercise plan."
        ]
      },
      {
        "heading": "A practical order of priorities",
        "paragraphs": [
          "1) Rule out urgent medical causes. 2) Understand aggravating loads at work or sport. 3) Rebuild capacity with progressive movement. 4) Only then discuss nutrition or supplements as an adjunct — not as the main treatment."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Should I stop the supplements I already take? Do not stop prescribed medicines or GP-advised supplements without advice. Bring a list to your appointment so we can talk about what is relevant to your MSK plan.",
          "Can I still ask about vitamins at the clinic? Yes. We can help you think through questions to take to your GP or pharmacist, especially when pain, sleep, or recovery are involved."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Red-flag symptoms (severe night pain, unexplained weight loss, neurological change, chest pain) need medical assessment first.",
          "Marketing claims on packaging are not the same as clinical evidence for your specific diagnosis."
        ]
      },
      {
        "heading": "Related movement resources",
        "paragraphs": [
          "You may also find our exercise library useful while you rebuild capacity: [exercise resources](/exercises)."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "magnesium-muscle-tension",
    title: "Magnesium and muscle tension",
    description: "Magnesium is involved in normal muscle and nerve function. Deficiency can matter — but it is not a cure-all for tight muscles or back spasms.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "magnesium muscle tension",
      "magnesium cramps osteopath",
      "magnesium Woolwich",
      "tight muscles supplements"
    ],
    image: {
      "src": "/images/blog/chronic-pain-osteopath-woolwich.webp",
      "alt": "Person dealing with persistent muscle tension and pain"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["magnesium-muscle-tension"],
    sections: [
      {
        "heading": "Why patients ask about it",
        "paragraphs": [
          "People often link magnesium with cramps, evening restlessness, or feeling 'tight'. Food sources (leafy greens, nuts, seeds, whole grains) already cover needs for many adults. Extra capsules are more useful when intake is low or a clinician has identified a gap."
        ]
      },
      {
        "heading": "How this fits osteopathy",
        "paragraphs": [
          "Persistent muscle guarding around a painful joint usually needs load change and rehab, not only a mineral. We still ask about diet, alcohol, and medicines because they affect recovery and sleep — both of which influence pain."
        ]
      },
      {
        "heading": "Forms and practical notes",
        "paragraphs": [
          "Different salts (citrate, glycinate, oxide and others) vary in absorption and gut tolerance. Your pharmacist can help match a form to your stomach and other medicines. More is not better; high doses often cause loose stools."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Will magnesium stop my back from spasming? Unlikely on its own. Spasm often settles as pain and threat reduce and as you restore gentle movement. Correcting a true deficiency may help general muscle function, not replace hands-on care or rehab.",
          "Is topical magnesium oil enough? Evidence for topical absorption into muscle is limited. If you enjoy the massage feel, treat it as comfort care — not a guaranteed systemic dose."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Kidney disease and some heart medicines change how magnesium should be used — ask a pharmacist or GP.",
          "Do not combine multiple high-dose products without checking the total daily amount."
        ]
      },
      {
        "heading": "Related movement resources",
        "paragraphs": [
          "You may also find our exercise library useful while you rebuild capacity: [exercise resources](/exercises/programmes/post-visit-gentle-move)."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "vitamin-d-msk-health",
    title: "Vitamin D and musculoskeletal health",
    description: "Vitamin D supports bone and muscle health. In the UK, many adults run low in winter — but dosing should follow blood results and medical advice.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "vitamin D musculoskeletal",
      "vitamin D osteopath Woolwich",
      "vitamin D bone health SE18",
      "vitamin D deficiency UK"
    ],
    image: {
      "src": "/images/blog/osteoarthritis-joints-osteopath-woolwich.webp",
      "alt": "Hands and joints — bone and muscle health context"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["vitamin-d-msk-health"],
    sections: [
      {
        "heading": "Why it shows up in MSK clinics",
        "paragraphs": [
          "Low vitamin D is linked with bone health risk and can contribute to generalised aches or slower recovery in some people. It does not explain every episode of sciatica or desk neck, so we avoid guessing from symptoms alone."
        ]
      },
      {
        "heading": "Testing before megadosing",
        "paragraphs": [
          "If fatigue, bone pain, or fracture risk are concerns, your GP can arrange a blood test. UK public health guidance often includes a maintenance dose through darker months; therapeutic doses for deficiency belong under medical supervision."
        ]
      },
      {
        "heading": "Alongside osteopathy",
        "paragraphs": [
          "For osteoporosis risk, tendinopathy rehab, or post-fracture recovery, vitamin D status is one piece of the picture next to strength training, balance work, and safe loading — not a stand-alone fix."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Can I just take a high-street spray? Many adults use a standard maintenance product safely. If you already take multivitamins, cod liver oil, or prescription D, add up the total and check with a pharmacist to avoid excess.",
          "Does sunshine in Woolwich cover me? Short summer exposure can help, but indoor work, darker skin, covering clothing, and winter UV make deficiency common in London. Do not rely on 'feeling fine' as a test result."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Excess vitamin D can raise calcium to unsafe levels.",
          "People with sarcoidosis, some lymphomas, or kidney stones need individual medical advice before supplementing."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "omega-3-inflammation",
    title: "Omega-3 fats and inflammation",
    description: "Long-chain omega-3s from oily fish support general health and may modestly influence inflammatory pathways — they are not a substitute for tendon loading or joint rehab.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "omega-3 inflammation joints",
      "fish oil osteopath",
      "EPA DHA joint pain",
      "omega-3 Woolwich"
    ],
    image: {
      "src": "/images/blog/hip-knee-pain-osteopath-woolwich.webp",
      "alt": "Hip and knee comfort during everyday movement"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["omega-3-inflammation"],
    sections: [
      {
        "heading": "What the evidence roughly says",
        "paragraphs": [
          "Eating oily fish a couple of times a week is a sensible default for heart and general health. Concentrated EPA/DHA capsules are sometimes used for inflammatory joint symptoms; results vary and doses in studies are often higher than basic retail softgels."
        ]
      },
      {
        "heading": "MSK clinic framing",
        "paragraphs": [
          "For frozen shoulder, tendinopathy, or osteoarthritis pain, the heavy lifting still comes from graded movement, sleep, and reducing unhelpful spikes in load. Omega-3 can be a dietary adjunct after you and your GP or pharmacist decide it is appropriate."
        ]
      },
      {
        "heading": "Quality and bleeding risk",
        "paragraphs": [
          "Choose products that state EPA/DHA content clearly. High doses can affect bleeding risk, especially with anticoagulants — always check before surgery or if you bruise easily."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Is flaxseed oil the same as fish oil? Flax provides ALA, which converts poorly to EPA/DHA in many people. If you want long-chain omega-3s and do not eat fish, ask a pharmacist about algae-based DHA/EPA options."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Stop or pause high-dose oils before planned procedures only if your clinician advises it.",
          "Rancid oils (strong fishy burps, poor storage) are worth replacing."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "collagen-tendons-joints",
    title: "Collagen for tendons and joints",
    description: "Collagen supplements are popular for tendons and knees. Evidence is emerging but mixed — pair any trial with progressive loading, not rest alone.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "collagen tendons",
      "collagen supplements joints",
      "collagen rehab Woolwich",
      "tendon collagen osteopath"
    ],
    image: {
      "src": "/images/blog/achilles-tendinopathy-shockwave-woolwich.webp",
      "alt": "Lower leg and Achilles tendon region during rehab"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["collagen-tendons-joints"],
    sections: [
      {
        "heading": "The rehab-first view",
        "paragraphs": [
          "Tendons adapt to well-timed load. Patellar, Achilles, and rotator-cuff programmes succeed because capacity is rebuilt. A collagen powder without that stimulus is unlikely to remodel tissue on its own."
        ]
      },
      {
        "heading": "What some studies explore",
        "paragraphs": [
          "Certain protocols combine collagen (sometimes with vitamin C) around training. Results are not universal, products differ, and many trials are small. Treat marketing claims cautiously."
        ]
      },
      {
        "heading": "Protein more broadly",
        "paragraphs": [
          "Meeting daily protein needs from food supports muscle and recovery during rehab. If appetite is low or you are older and rebuilding strength, a dietitian or GP can advise before specialised powders."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Gelatine in cooking — is that enough? Bone broths and gelatine provide collagen-derived amino acids, but amounts are inconsistent. Food-first protein still matters more than chasing one ingredient."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "People with restrictive diets or kidney disease should get personalised nutrition advice.",
          "Collagen is not a medicine for cartilage 'regrowth' despite some labels."
        ]
      },
      {
        "heading": "Related movement resources",
        "paragraphs": [
          "You may also find our exercise library useful while you rebuild capacity: [exercise resources](/exercises)."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "turmeric-curcumin-caveats",
    title: "Turmeric and curcumin — useful caveats",
    description: "Curcumin is studied for joint comfort, but absorption, dose, and medicine interactions matter. Kitchen turmeric is not the same as a high-dose extract.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "turmeric curcumin joints",
      "curcumin osteoarthritis",
      "turmeric caveats",
      "herbal joint supplements"
    ],
    image: {
      "src": "/images/blog/osteoarthritis-joints-osteopath-woolwich.webp",
      "alt": "Osteoarthritis joint care conversation in clinic"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["turmeric-curcumin-caveats"],
    sections: [
      {
        "heading": "Interest vs expectation",
        "paragraphs": [
          "Some people with osteoarthritis try curcumin extracts for comfort. Effects, if any, are usually modest. It should never delay assessment of night pain, locking, giving-way, or inflammatory red flags."
        ]
      },
      {
        "heading": "Absorption and additives",
        "paragraphs": [
          "Curcumin absorbs poorly alone; many products add piperine (black pepper extract) or use special formulations. Piperine can change how other medicines are metabolised — check with a pharmacist."
        ]
      },
      {
        "heading": "Clinic stance",
        "paragraphs": [
          "We focus on strength, joint mechanics, and activity modification first. If you already use turmeric products, tell us so we can factor gut side effects or interaction questions into your plan."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Can I cook with more turmeric instead? Culinary amounts are generally fine in food for most people. They rarely match study doses. Enjoy the flavour; do not expect stew to replace physio-style loading."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Gallbladder disease, upcoming surgery, and anticoagulant use need pharmacist or GP review before concentrated extracts.",
          "Stop herbal products before surgery only under clinical advice."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "sleep-recovery-nutrients",
    title: "Sleep, stress, and recovery nutrients",
    description: "Pain and sleep trade blows. Magnesium-rich food, steady caffeine timing, and wind-down habits often help more than a stack of 'sleep' capsules.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "sleep recovery nutrients",
      "sleep and pain osteopath",
      "magnesium sleep Woolwich",
      "pain insomnia recovery"
    ],
    image: {
      "src": "/images/blog/cranial-osteopathy-for-stress-tension.webp",
      "alt": "Person resting to support sleep and recovery"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["sleep-recovery-nutrients"],
    sections: [
      {
        "heading": "Why sleep belongs on an MSK plan",
        "paragraphs": [
          "Poor sleep raises pain sensitivity and slows rehab adherence. Evening scrolling, late caffeine, alcohol, and uncontrolled night pain are common Woolwich-clinic themes — more than exotic supplements."
        ]
      },
      {
        "heading": "Nutrients people ask about",
        "paragraphs": [
          "Magnesium, herbal teas, and pharmacy sleep aids appear often in patient questions. Some are short-term options after pharmacist advice; none replace treating the painful driver (for example disc-related night pain or shoulder irritability)."
        ]
      },
      {
        "heading": "What we usually prioritise",
        "paragraphs": [
          "Positioning for night comfort, daytime load balance, and a consistent sleep window. If mood, apnoea symptoms, or long-term insomnia dominate, we signpost GP or specialist care rather than escalating supplements."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Are melatonin gummies OK? In the UK, melatonin is generally prescription-only for specific uses. Do not import high-dose products casually — ask your GP."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Sedating herbals can linger into the next morning and affect driving or manual work.",
          "New snoring, breath pauses, or morning headaches deserve medical review."
        ]
      },
      {
        "heading": "Related movement resources",
        "paragraphs": [
          "You may also find our exercise library useful while you rebuild capacity: [exercise resources](/exercises/programmes/post-visit-gentle-move)."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "hydration-electrolytes-active",
    title: "Hydration and electrolytes for active patients",
    description: "For most training and desk days, water and normal meals beat fancy electrolyte tubs. Know when salts actually help.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "hydration electrolytes training",
      "sports drink osteopath",
      "cramps electrolytes",
      "active recovery Woolwich"
    ],
    image: {
      "src": "/images/blog/football-muscle-strain-osteopath-se18.webp",
      "alt": "Active patient recovering after training"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["hydration-electrolytes-active"],
    sections: [
      {
        "heading": "Everyday MSK recovery",
        "paragraphs": [
          "After osteopathy, we often encourage normal hydration and gentle movement. You do not need a sports drink for a standard office day or a short walk along Powis Street."
        ]
      },
      {
        "heading": "When electrolytes earn a place",
        "paragraphs": [
          "Long hot sessions, heavy sweating, stomach bugs, or medically advised fluid plans are different. Then sodium and fluids matter. Recreational tubs with high sugar or stimulant blends are optional extras, not medical care."
        ]
      },
      {
        "heading": "Cramps are multifactorial",
        "paragraphs": [
          "Night cramps and training cramps relate to fatigue, sudden load spikes, medications, and sometimes electrolytes. Stretching and load management remain central; get persistent cramps checked if they are new or severe."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "How much water should I drink after treatment? Drink to thirst and habitual needs unless your clinician gave a specific plan. Pale straw-coloured urine is a rough guide for many healthy adults."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Heart failure, kidney disease, and some blood-pressure medicines change fluid and salt advice — follow your GP.",
          "Over-drinking plain water in long events without sodium can be harmful."
        ]
      },
      {
        "heading": "Related movement resources",
        "paragraphs": [
          "You may also find our exercise library useful while you rebuild capacity: [exercise resources](/exercises)."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "glucosamine-chondroitin-joints",
    title: "Glucosamine and chondroitin for joints",
    description: "Long-standing joint supplements with mixed evidence. Useful to understand expectations if you already take them.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "glucosamine chondroitin",
      "joint supplements osteoarthritis",
      "glucosamine Woolwich",
      "cartilage supplements evidence"
    ],
    image: {
      "src": "/images/blog/hip-knee-pain-osteopath-woolwich.webp",
      "alt": "Knee and hip osteoarthritis support"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["glucosamine-chondroitin-joints"],
    sections: [
      {
        "heading": "What patients hope for",
        "paragraphs": [
          "Many people with knee or hip osteoarthritis try glucosamine or chondroitin for stiffness. Trial results are inconsistent; some feel a small comfort change, others notice nothing."
        ]
      },
      {
        "heading": "What changes function more reliably",
        "paragraphs": [
          "Quadriceps and hip strength, weight management where relevant, footwear, and activity pacing outperform waiting for a supplement to 'regrow cartilage'."
        ]
      },
      {
        "heading": "If you continue them",
        "paragraphs": [
          "Give a defined trial period, track walking tolerance and morning stiffness, and review with your GP if you take warfarin or have shellfish allergy (some glucosamine is shellfish-derived)."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Should I buy the most expensive joint complex? Price does not guarantee benefit. If you use one, pick a reputable brand, avoid megastacks with mystery blends, and keep rehab as the main plan."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Shellfish allergy and anticoagulant therapy need product-specific checks.",
          "Supplements are not licensed medicines for reversing osteoarthritis."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "protein-rehab-recovery",
    title: "Protein intake during rehab",
    description: "Enough daily protein helps muscle repair while you rebuild strength after injury or deconditioning — food first, powders second.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "protein rehab recovery",
      "protein intake injury",
      "protein osteopath Woolwich",
      "muscle recovery protein"
    ],
    image: {
      "src": "/images/blog/ankle-sprain-rehab-osteopath-woolwich.webp",
      "alt": "Rehab training to rebuild strength after injury"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["protein-rehab-recovery"],
    sections: [
      {
        "heading": "Why rehab asks about protein",
        "paragraphs": [
          "Building calf endurance after Achilles pain, or quadriceps capacity after knee irritation, needs training stimulus plus building blocks. Older adults often under-eat protein without noticing."
        ]
      },
      {
        "heading": "Food-first targets",
        "paragraphs": [
          "Spread protein across meals from eggs, dairy or alternatives, fish, pulses, lean meat, or tofu. A shake is a convenience tool when appetite or time is short — not a requirement for every patient."
        ]
      },
      {
        "heading": "Tie it to your programme",
        "paragraphs": [
          "We set loading progressions in clinic. Nutrition supports that work; it does not replace the exercises you leave with."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Do I need protein straight after osteopathy? No special post-treatment shake is required. Keep regular meals. If you trained hard the same day, a normal protein-containing meal is enough for most people."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Kidney disease needs individualised protein advice from your medical team.",
          "Very high intake without training just adds calories."
        ]
      },
      {
        "heading": "Related movement resources",
        "paragraphs": [
          "You may also find our exercise library useful while you rebuild capacity: [exercise resources](/exercises)."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
  post({
    slug: "topical-vs-oral-pain-relief",
    title: "Topical gels versus oral supplements",
    description: "Gels, patches, and capsules do different jobs. Match the tool to the problem — and know when pharmacy pain relief needs a proper diagnosis first.",
    date: "2026-10-25",
    category: CATEGORY,
    keywords: [
      "topical gel vs supplements",
      "pain gel osteopath",
      "oral supplements pain",
      "pharmacy pain relief Woolwich"
    ],
    image: {
      "src": "/images/blog/deep-tissue-massage-woolwich-osteopath.webp",
      "alt": "Hands-on clinic care alongside pharmacy products"
    },
    relatedConditionSlugs: nutritionBlogRelatedConditions["topical-vs-oral-pain-relief"],
    sections: [
      {
        "heading": "Topicals",
        "paragraphs": [
          "Anti-inflammatory gels or heat/cool rubs can ease irritable superficial tissues for some people. They will not correct a lumbar disc problem or rebuild a tendon. Follow packet rules and avoid broken skin."
        ]
      },
      {
        "heading": "Oral supplements vs medicines",
        "paragraphs": [
          "Food supplements are regulated differently from painkillers. Do not swap prescribed analgesia for a herbal capsule without advice. If you need regular pain tablets, get the underlying MSK issue assessed."
        ]
      },
      {
        "heading": "Our clinic bias",
        "paragraphs": [
          "We prefer clarifying diagnosis, calming irritable tissue, and restoring capacity. Pharmacy products can sit alongside that plan when used safely."
        ]
      },
      {
        "heading": "FAQs",
        "paragraphs": [
          "Can I use a CBD rub? In the UK, CBD products sit in a grey area of quality and novel-food rules. Ask a pharmacist before use, especially with other medicines, and do not treat a rub as a substitute for diagnosis or rehab."
        ]
      },
      {
        "heading": "Important caveats",
        "paragraphs": [
          "Educational only — not a prescription or product endorsement. Check with your GP, pharmacist, or osteopath before starting supplements, especially if you take medicines, have a long-term condition, or are pregnant or breastfeeding. Supplements are not a substitute for assessment or rehab."
        ],
        "bullets": [
          "Oral NSAIDs and some gels are unsuitable in pregnancy, stomach ulcers, kidney disease, or with certain drugs — check first.",
          "Numbing sprays can mask injury and lead to over-stressing tissue."
        ]
      },
      {
        "heading": "Full supplement education library",
        "paragraphs": [
          "For a wider dual-audience catalogue of ingredient and wellness themes, browse the [supplement education library](/education/library)."
        ]
      }
    ],
    cta: "Book an assessment at Nguyen's Osteopathic Clinic in Woolwich if pain or recovery questions need a personal plan.",
    ctaHref: "/book",
    ctaLabel: "Book online",
  }),
];

export function getNutritionBlogMeta(slug: string) {
  const match = nutritionBlogPosts.find((item) => item.slug === slug);
  if (!match) return undefined;
  return { slug: match.slug, title: match.title, summary: match.description };
}

export function getNutritionBlogPostsForCondition(
  conditionSlug: string,
  limit = 3,
) {
  return nutritionBlogPosts
    .filter((item) =>
      (nutritionBlogRelatedConditions[item.slug] ?? []).includes(conditionSlug),
    )
    .slice(0, limit)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      summary: item.description,
      category: item.category,
    }));
}

export const nutritionBlogSlugs = nutritionBlogPosts.map((item) => item.slug);
