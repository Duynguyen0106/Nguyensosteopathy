import type { BlogCategory, BlogPost } from "@/lib/blog";
import { site } from "@/lib/site";

const ctaBook =
  "Book online at www.nguyensosteopathy.com/book or call 07882843513.";
const clinic =
  `${site.name} inside ${site.address.venue}, ${site.address.line1}, Woolwich SE18 6LQ`;

type BatchPost = Omit<BlogPost, "image" | "readingMinutes"> & {
  readingMinutes?: number;
  category: BlogCategory;
};

function post(partial: BatchPost): BatchPost {
  return {
    readingMinutes: partial.readingMinutes ?? 5,
    ...partial,
  };
}

/** Batch 3 — 24 SEO articles (2026-10-10). */
export const batch3BlogPosts: BatchPost[] = [
  post({
    slug: "vietnamese-osteopath-woolwich-uk",
    title: "Vietnamese osteopath in Woolwich: care without the language barrier",
    description:
      "Looking for a Vietnamese osteopath in the UK? How Nguyen's Osteopathic Clinic in Woolwich supports clear MSK care for the Vietnamese community.",
    date: "2026-10-10",
    category: "Local guides",
    keywords: [
      "Vietnamese osteopath UK",
      "Vietnamese osteopath London",
      "osteopath Woolwich Vietnamese",
      "MSK care Vietnamese community",
    ],
    sections: [
      {
        paragraphs: [
          "Language should never stand between you and proper musculoskeletal care. At Nguyen's Osteopathic Clinic, Austin Duy Nguyen — a GOsC-registered osteopath — is proud to support Vietnamese patients across Woolwich and South East London who want to explain pain clearly and feel understood.",
          `Care is based at ${clinic}. You can describe work strain, night pain, or fear of losing shifts without translating your whole life first.`,
        ],
      },
      {
        heading: "Common work strains we see",
        bullets: [
          "Nail salon neck, shoulder, and wrist load",
          "Kitchen and takeaway standing and lifting strain",
          "Warehouse and packing repetitive bending",
          "Care work and cleaning postures",
        ],
        paragraphs: [
          "These jobs build Britain — and load the body. Early osteopathy assessment can stop small strains becoming stubborn pain.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "nail-technician-neck-wrist-pain-osteopath",
    title: "Nail technician neck and wrist pain: osteopathy for salon workers",
    description:
      "Long hours bent over a nail desk? How neck, shoulder, and wrist strain builds — and how osteopathy in Woolwich can help salon workers.",
    date: "2026-10-10",
    category: "Local guides",
    keywords: [
      "nail technician neck pain",
      "salon worker wrist pain",
      "beauty therapist osteopath London",
      "repetitive strain nail tech",
    ],
    sections: [
      {
        paragraphs: [
          "Nail technicians often work with eyes down, shoulders rolled forward, and wrists locked in fine movements for hours. Over months, the neck, upper back, thumbs, and forearms pay the price.",
          `At ${clinic}, we assess posture, soft tissue, and joint mobility, then treat what is irritable while giving practical desk and break advice you can use between clients.`,
        ],
      },
      {
        heading: "Simple habits that help between appointments",
        bullets: [
          "Raise the hand or client chair to reduce neck bend",
          "Micro-breaks every 30–40 minutes for wrists and shoulders",
          "Alternate tasks where the salon workflow allows",
        ],
        paragraphs: [
          "Pain that wakes you at night, numbness into fingers, or weakness gripping tools deserves a proper assessment — not only painkillers.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "restaurant-kitchen-back-pain-osteopath-woolwich",
    title: "Restaurant and kitchen back pain: osteopathy for hospitality workers",
    description:
      "Standing shifts, lifting stock, and repetitive prep — how kitchen work loads the spine and how Woolwich osteopathy supports hospitality teams.",
    date: "2026-10-10",
    category: "Local guides",
    keywords: [
      "kitchen worker back pain",
      "chef back pain osteopath",
      "hospitality MSK Woolwich",
      "standing all day back pain",
    ],
    sections: [
      {
        paragraphs: [
          "Hospitality work combines hard floors, heavy lifts, heat, and hurry. Hips, knees, shoulders, and the lower back often carry the shift home.",
          "Osteopathy looks at how you move under load — not only the sore spot — then uses hands-on care and simple strength or mobility advice timed around your rota.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "osteopath-plumstead-abbey-wood-se18",
    title: "Osteopath near Plumstead and Abbey Wood: Woolwich SE18 clinic",
    description:
      "Need an osteopath near Plumstead or Abbey Wood? Nguyen's Osteopathic Clinic on Powis Street, Woolwich is a short hop for SE18 patients.",
    date: "2026-10-10",
    category: "Local guides",
    keywords: [
      "osteopath Plumstead",
      "osteopath Abbey Wood",
      "osteopath SE18",
      "osteopathy Woolwich nearby",
    ],
    sections: [
      {
        paragraphs: [
          `Patients from Plumstead, Abbey Wood, and Woolwich Common regularly visit ${clinic}. Bus and DLR links make Powis Street practical without travelling into central London.`,
          "Ask at the St James Pharmacy counter on arrival and staff will direct you to the osteopathy room. Online booking opens from 5 November 2026.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "parking-osteopath-woolwich-powis-street",
    title: "Parking and getting to our Woolwich osteopath clinic",
    description:
      "How to reach Nguyen's Osteopathic Clinic inside St James Pharmacy on Powis Street — parking tips, buses, and DLR for SE18 patients.",
    date: "2026-10-10",
    category: "Clinic info",
    keywords: [
      "parking Powis Street Woolwich",
      "osteopath Woolwich directions",
      "St James Pharmacy parking",
      "how to get to osteopath SE18",
    ],
    sections: [
      {
        paragraphs: [
          `We are inside ${site.address.venue} at ${site.address.line1}, ${site.address.line2}. Woolwich town centre has short-stay parking nearby; check local signs for time limits and payment.`,
          "Public transport is often easiest: Woolwich Arsenal station (Elizabeth line, DLR, National Rail) and local buses serving Powis Street / General Gordon Place.",
        ],
      },
      {
        heading: "On arrival",
        paragraphs: [
          "Come to the pharmacy counter and say you have an osteopathy appointment. Wear comfortable clothes and arrive a few minutes early for your first visit.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "chronic-pain-osteopath-woolwich",
    title: "Chronic pain and osteopathy in Woolwich: a practical first step",
    description:
      "Living with pain for months? How osteopathy approaches persistent back, neck, and joint pain — and when medical review comes first.",
    date: "2026-10-10",
    category: "Getting started",
    keywords: [
      "chronic pain osteopath Woolwich",
      "long term back pain SE18",
      "persistent pain osteopathy London",
      "drug free pain relief Woolwich",
    ],
    sections: [
      {
        paragraphs: [
          "Chronic pain is pain that has outlasted expected tissue healing. The nervous system can stay “switched on”, so movement feels threatening even when scans are stable.",
          "Osteopathy cannot erase every chronic condition, but it can reduce irritability, restore confidence in movement, and pair well with graded activity. We screen carefully for red flags and refer on when needed.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "osteopathy-for-older-adults-woolwich",
    title: "Osteopathy for older adults in Woolwich: safer movement, less stiffness",
    description:
      "Gentle osteopathy for older adults with stiffness, joint wear, and balance confidence — what to expect at our SE18 clinic.",
    date: "2026-10-10",
    category: "Getting started",
    keywords: [
      "osteopath for elderly Woolwich",
      "osteopathy older adults London",
      "joint stiffness SE18",
      "gentle osteopathy Woolwich",
    ],
    sections: [
      {
        paragraphs: [
          "Ageing joints and soft tissues need respect, not force. Sessions are paced for comfort, with clear explanations and home advice you can actually do.",
          "Many older patients visit for neck stiffness, lumbar ache, hip or knee irritation, and the confidence to walk or garden again without fear.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "first-osteopathy-visit-checklist-woolwich",
    title: "First osteopathy visit checklist: what to bring and ask",
    description:
      "A simple checklist for your first osteopathy appointment in Woolwich — clothing, questions, medical letters, and how long it takes.",
    date: "2026-10-10",
    category: "Getting started",
    keywords: [
      "first osteopathy appointment checklist",
      "what to bring osteopath",
      "osteopath Woolwich first visit",
      "prepare for osteopathy",
    ],
    sections: [
      {
        heading: "Bring if you have them",
        bullets: [
          "List of medications and key medical history",
          "Recent scan or clinic letters (optional but useful)",
          "Comfortable clothing you can move in",
          "NHS or student ID if claiming the 10% discount",
        ],
        paragraphs: [
          "Your first visit is usually about 60 minutes: history, assessment, explanation, and treatment where appropriate. No GP referral is required.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "coccyx-tailbone-pain-osteopath-woolwich",
    title: "Coccyx (tailbone) pain: when osteopathy can help",
    description:
      "Pain sitting on hard seats or after a fall onto the tailbone? How coccyx pain presents and how Woolwich osteopathy approaches it.",
    date: "2026-10-10",
    category: "Back & neck",
    keywords: [
      "coccyx pain osteopath",
      "tailbone pain Woolwich",
      "coccydynia osteopathy",
      "pain sitting osteopath SE18",
    ],
    sections: [
      {
        paragraphs: [
          "Coccyx pain (coccydynia) often hurts most when sitting, rising from a chair, or after a slip onto the buttocks. Desk workers and drivers notice it quickly on firm seats.",
          "We assess lumbar, pelvic, and soft-tissue contribution, discuss sitting modifications, and use gentle hands-on care where appropriate. Sudden severe trauma with neurological change needs medical review first.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "lifting-back-pain-warehouse-trades-woolwich",
    title: "Lifting and back pain for warehouse and trades workers",
    description:
      "Repetitive lifting, twisting, and bending at work? Osteopathy for warehouse, construction, and trade-related back strain in SE18.",
    date: "2026-10-10",
    category: "Back & neck",
    keywords: [
      "warehouse back pain osteopath",
      "manual handling back pain",
      "trades back pain Woolwich",
      "lifting injury osteopathy SE18",
    ],
    sections: [
      {
        paragraphs: [
          "Manual work rarely fails from one heroic lift — it accumulates from thousands of bends, twists, and hurried loads. Protective muscle spasm then makes every shift harder.",
          `At ${clinic}, treatment aims to calm irritable tissue and restore hip and thoracic mobility so your back is not doing every job alone. We also talk through practical pacing for your role.`,
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "rib-pain-breathing-osteopath-woolwich",
    title: "Rib pain and stiff breathing: osteopathy for the thoracic cage",
    description:
      "Sharp rib or side pain when breathing, twisting, or coughing? How thoracic and rib irritation is assessed at our Woolwich clinic.",
    date: "2026-10-10",
    category: "Headaches & joints",
    keywords: [
      "rib pain osteopath",
      "thoracic pain Woolwich",
      "costochondral pain osteopathy",
      "pain breathing osteopath SE18",
    ],
    sections: [
      {
        paragraphs: [
          "Rib and thoracic joints can feel sharp with deep breath, coughing, or reaching. After assessing for medical red flags (such as unexplained shortness of breath or chest pain needing urgent care), osteopathy can ease stiff segments and surrounding soft tissue.",
          "Desk posture and one-sided gym work are common contributors we see locally.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "hip-bursitis-osteopath-woolwich",
    title: "Outer hip pain and bursitis: osteopathy for side-lying ache",
    description:
      "Pain on the outside of the hip when lying on that side or climbing stairs? How trochanteric irritation is managed with osteopathy in Woolwich.",
    date: "2026-10-10",
    category: "Headaches & joints",
    keywords: [
      "hip bursitis osteopath",
      "trochanteric pain Woolwich",
      "outer hip pain osteopathy",
      "side lying hip pain SE18",
    ],
    sections: [
      {
        paragraphs: [
          "Lateral hip pain is often related to tendon and soft-tissue load around the greater trochanter rather than the hip joint itself. Sleeping on that side and climbing stairs commonly aggravate it.",
          "We assess gait, pelvic control, and local tissue irritability, then combine hands-on care with load advice. Stubborn cases may be discussed alongside imaging or injection pathways via your GP when needed.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "rsi-wrist-forearm-office-osteopath",
    title: "RSI wrist and forearm pain for office and creative workers",
    description:
      "Mouse, keyboard, or tablet strain in the wrist and forearm? Osteopathy for repetitive strain patterns in Woolwich SE18.",
    date: "2026-10-10",
    category: "Headaches & joints",
    keywords: [
      "RSI wrist osteopath",
      "forearm pain office worker",
      "keyboard strain Woolwich",
      "repetitive strain osteopathy London",
    ],
    sections: [
      {
        paragraphs: [
          "Repetitive strain is rarely “just the wrist”. Neck posture, shoulder blade control, and desk height often feed the problem. Numbness at night or progressive weakness needs timely assessment.",
          "Treatment may include soft-tissue work, joint mobilisation higher up the chain, and clear workstation tweaks you can keep after the session.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "calcific-tendonitis-shoulder-shockwave-woolwich",
    title: "Calcific shoulder tendonitis and focused shockwave in Woolwich",
    description:
      "Stubborn shoulder calcium deposits and night pain? When focused shockwave and osteopathy are considered for calcific tendon irritation.",
    date: "2026-10-10",
    category: "Focused shockwave",
    keywords: [
      "calcific tendonitis shockwave",
      "shoulder calcium osteopath",
      "LI-ESWT shoulder Woolwich",
      "focused shockwave shoulder SE18",
    ],
    sections: [
      {
        paragraphs: [
          "Calcific tendonitis can cause intense shoulder pain, especially at night. After clinical screening (and imaging review when available), focused shockwave is sometimes used to stimulate a local healing response in stubborn deposits.",
          "We combine device-based care with osteopathy for scapular and thoracic mechanics so the shoulder is not fighting a stiff upper back.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "shockwave-therapy-cost-woolwich",
    title: "Shockwave therapy cost in Woolwich: what affects the fee",
    description:
      "What influences focused shockwave fees at Nguyen's Osteopathic Clinic — session type, course length, and how to book in SE18.",
    date: "2026-10-10",
    category: "Focused shockwave",
    keywords: [
      "shockwave therapy cost Woolwich",
      "LI-ESWT price London",
      "focused shockwave fees SE18",
      "shockwave osteopath cost",
    ],
    sections: [
      {
        paragraphs: [
          "Fees depend on whether shockwave is a standalone session or combined with osteopathic assessment, and on how many sessions your condition typically needs. We confirm pricing before you start — see our pricing list on the website for current figures.",
          "A clear diagnosis matters more than buying a package blindly. Suitability screening comes first.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "shin-splints-osteopath-woolwich",
    title: "Shin splints and medial tibial stress: osteopathy for runners",
    description:
      "Pain along the shin when running or after increasing mileage? How osteopathy helps shin splints and when to rest or image.",
    date: "2026-10-10",
    category: "Sports rehab",
    keywords: [
      "shin splints osteopath",
      "medial tibial stress Woolwich",
      "runner shin pain SE18",
      "osteopathy running injuries London",
    ],
    sections: [
      {
        paragraphs: [
          "Shin splints usually relate to rapid load spikes — new shoes, hills, or sudden mileage jumps. Pain along the inner shin that eases with rest is common; focal bone pain that worsens may need medical imaging to rule out stress fracture.",
          "Osteopathy addresses calf and foot mechanics, hip control, and training load so you return to running with a plan, not guesswork.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "cycling-lower-back-pain-osteopath-woolwich",
    title: "Cycling lower back pain: bike posture and osteopathy",
    description:
      "Aching lumbar spine after long rides? How bike setup and osteopathy help cyclists with lower back pain in Woolwich.",
    date: "2026-10-10",
    category: "Sports rehab",
    keywords: [
      "cycling lower back pain",
      "cyclist osteopath Woolwich",
      "bike posture back pain",
      "osteopathy for cyclists SE18",
    ],
    sections: [
      {
        paragraphs: [
          "Prolonged flexion on the bike can irritate lumbar joints and overload the mid-back and hips. Saddle height, reach, and core endurance all matter.",
          "We treat the stiff segments and tight soft tissue, then discuss simple bike-fit checks and off-bike mobility so longer rides feel sustainable.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "yoga-pilates-injury-osteopath-woolwich",
    title: "Yoga and Pilates injuries: when flexibility meets irritation",
    description:
      "Overstretched joints or flare-ups after class? How osteopathy helps yoga and Pilates-related strains in SE18.",
    date: "2026-10-10",
    category: "Sports rehab",
    keywords: [
      "yoga injury osteopath",
      "pilates injury Woolwich",
      "hypermobility osteopathy London",
      "stretch injury SE18",
    ],
    sections: [
      {
        paragraphs: [
          "Flexibility sports can still cause injury — especially when end-range poses meet tired control. Shoulders, lumbar spine, and sacroiliac joints are frequent visitors.",
          "Treatment focuses on settling irritable tissue and rebuilding control, not forcing more stretch into an already mobile joint.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "massage-for-desk-workers-woolwich",
    title: "Deep tissue massage for desk workers in Woolwich",
    description:
      "Tight traps, stiff mid-back, and screen fatigue — how deep tissue massage supports desk workers at Nguyen's Osteopathic Clinic.",
    date: "2026-10-10",
    category: "Deep tissue",
    keywords: [
      "deep tissue massage desk workers",
      "massage Woolwich office",
      "shoulder tension massage SE18",
      "desk worker massage London",
    ],
    sections: [
      {
        paragraphs: [
          "Desk work gathers tension in the neck, shoulders, and mid-back. Deep tissue massage can reduce that load when pressure is progressive and guided by your feedback.",
          "Many patients combine massage with osteopathy when joints feel stuck as well as muscles feeling knotted — we will advise which fits your presentation.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "cupping-vs-massage-woolwich",
    title: "Cupping vs massage: which add-on suits your pain?",
    description:
      "Not sure whether cupping or deep tissue massage is right for you? A plain-English guide for Woolwich patients.",
    date: "2026-10-10",
    category: "Acupuncture & cupping",
    keywords: [
      "cupping vs massage",
      "cupping therapy Woolwich",
      "massage or cupping SE18",
      "soft tissue add on osteopath",
    ],
    sections: [
      {
        paragraphs: [
          "Massage uses hands-on pressure through muscle layers. Cupping uses suction to lift tissue and can leave temporary circle marks. Neither replaces assessment of joints and movement.",
          "We recommend add-ons based on tissue irritability, preference, and your wider osteopathy plan — not trends.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "pregnancy-sciatica-osteopath-woolwich",
    title: "Pregnancy sciatica and leg pain: gentle osteopathy support",
    description:
      "Buttock or leg pain in pregnancy? How we assess pregnancy-related sciatic-type symptoms safely in Woolwich.",
    date: "2026-10-10",
    category: "Pregnancy",
    keywords: [
      "pregnancy sciatica osteopath",
      "pregnant leg pain Woolwich",
      "sciatica pregnancy SE18",
      "antenatal osteopathy London",
    ],
    sections: [
      {
        paragraphs: [
          "True nerve compression is less common in pregnancy than pelvic girdle or referred buttock pain, but symptoms deserve careful assessment. Positioning and technique are adapted for trimester and comfort.",
          "Osteopathy complements midwife and obstetric care — always tell us about complications, scans, or advice you have been given.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "baby-preferential-head-turn-osteopath",
    title: "Baby preferential head turn: when parents seek osteopathy",
    description:
      "Noticing your baby prefers one side? What parents ask about positional preference and gentle paediatric osteopathy in Woolwich.",
    date: "2026-10-10",
    category: "Paediatric",
    keywords: [
      "baby head preference osteopath",
      "infant torticollis Woolwich",
      "paediatric osteopathy SE18",
      "baby neck preference London",
    ],
    sections: [
      {
        paragraphs: [
          "Some babies prefer looking one way. Parents often ask whether gentle hands-on care can support comfort alongside GP or health visitor advice and tummy-time strategies.",
          "Paediatric osteopathy at our clinic is age-adapted and explanation-led. We do not replace medical assessment for developmental concerns.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "cranial-osteopathy-headaches-woolwich",
    title: "Cranial osteopathy for headaches and held tension",
    description:
      "Prefer a quieter treatment style for headaches and stress-held tension? How cranial osteopathy is used at our Woolwich clinic.",
    date: "2026-10-10",
    category: "Cranial",
    keywords: [
      "cranial osteopathy headaches",
      "gentle osteopathy Woolwich",
      "cranial treatment SE18",
      "stress tension cranial osteopathy",
    ],
    sections: [
      {
        paragraphs: [
          "Cranial osteopathy uses very light contact. Some patients with headache patterns or stress-held neck tension prefer this quieter style alongside or instead of firmer techniques.",
          "We still take a full case history and screen for headache red flags that need medical care first.",
        ],
      },
    ],
    cta: ctaBook,
  }),
  post({
    slug: "opening-day-osteopath-woolwich-5-november",
    title: "Opening day at Nguyen's Osteopathic Clinic: 5 November 2026",
    description:
      "Official opening on 5 November 2026 inside St James Pharmacy, Woolwich — 50% off all service fees that day, plus how to book.",
    date: "2026-10-10",
    category: "Clinic info",
    keywords: [
      "osteopath Woolwich opening",
      "Nguyen's Osteopathic Clinic opening day",
      "50% off osteopath Woolwich",
      "book osteopath 5 November",
    ],
    sections: [
      {
        paragraphs: [
          "Our official opening day is Wednesday 5 November 2026. To celebrate, all clinic service fees are reduced by 50% for patients seen on that day.",
          `Find us inside ${site.address.venue}, ${site.address.line1}, Woolwich. Online booking is available from 5 November (closed Wednesday and Sunday after opening for regular bookable days — check the booking calendar for live availability).`,
        ],
      },
      {
        heading: "After opening day",
        paragraphs: [
          "Regular pharmacy-based hours are Monday–Friday 9:00am–6:00pm and Saturday 9:00am–5:30pm. 10% NHS and student discount continues with valid ID.",
        ],
      },
    ],
    cta: ctaBook,
  }),
];

if (batch3BlogPosts.length !== 24) {
  throw new Error(
    `Expected 24 batch3 blog posts, got ${batch3BlogPosts.length}`,
  );
}
