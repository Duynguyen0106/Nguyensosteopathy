export const site = {
  name: "Nguyen's Osteopathic Clinic",
  shortName: "Nguyen's",
  tagline: "Recover, Realign, and Restore Your Vitality",
  practitioner: {
    name: "Austin Duy Nguyen",
    title: "GOsC-Registered Osteopath",
    regNo: "12332",
    credentials: "Master of Osteopathy, British College of Osteopathic Medicine",
  },
  phone: "07882843513",
  phoneHref: "tel:07882843513",
  whatsappUrl: "https://wa.me/447882843513",
  email: "nguyensosteopathy@gmail.com",
  emailHref: "mailto:nguyensosteopathy@gmail.com",
  facebookUrl: "https://www.facebook.com/Nguyensosteopathy",
  googleReviewsUrl: "https://maps.app.goo.gl/XgHpsXAy1FmZKibn9",
  googleMapsCid: "13911505434361225558",
  website: "www.nguyensosteopathy.com",
  websiteUrl: "https://www.nguyensosteopathy.com",
  address: {
    line1: "52 Powis Street",
    line2: "Woolwich, London, SE18 6LQ",
    venue: "St James Pharmacy & Travel Clinic",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=52+Powis+Street+Woolwich+London+SE18+6LQ",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=52+Powis+Street+Woolwich+London+SE18+6LQ&z=16&output=embed",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00am – 6:00pm" },
    { days: "Saturday", time: "9:00am – 5:30pm" },
  ],
  cancellation: "24 hours' notice is required for cancellations.",
  discount:
    "10% Discount for NHS Staff & Students (Valid ID required at appointment)",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://www.nguyensosteopathy.com/book",
  bookingEmbedUrl:
    process.env.NEXT_PUBLIC_BOOKING_EMBED_URL ??
    "https://treow-clinic.vercel.app/embed/nguyens-osteopathy",
  openingOffer: {
    dateLabel: "Wednesday 5 November 2026",
    dateIso: "2026-11-05",
    discountPercent: 50,
    headline: "50% off all service fees",
    summary:
      "Celebrate our official opening day with half-price osteopathy and clinic services — one day only, inside St James Pharmacy, Woolwich.",
    path: "/opening",
  },
} as const;

export const highlights = [
  "100% Drug-Free and Non-Invasive",
  "No GP Referral Necessary",
  "Private One-to-One Consultation",
  "10% Student and NHS Discount",
] as const;

export const visitSteps = [
  {
    step: "01",
    title: "Book online or call",
    detail:
      "Choose a time through online booking, or ring us directly — no GP referral needed.",
  },
  {
    step: "02",
    title: "Private consultation",
    detail:
      "We take a full case history, assess movement, and identify the root cause — not just the symptoms.",
  },
  {
    step: "03",
    title: "Tailored treatment",
    detail:
      "Hands-on osteopathy and adjunct therapies are planned around your goals, then reviewed as you recover.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "After months of desk-related back pain, Austin found the cause quickly and I was moving freely again within a few sessions. Clear advice and genuine care.",
    name: "Sarah M.",
    treatment: "Back Pain Patient",
    rating: 5,
  },
  {
    quote:
      "Shockwave therapy for my stubborn heel pain made a real difference when other approaches had stalled. The clinic felt professional and reassuring throughout.",
    name: "James T.",
    treatment: "Shockwave Therapy Patient",
    rating: 5,
  },
  {
    quote:
      "I was nervous about my first osteopathy visit, but the consultation was thorough and the treatment plan was easy to follow. Highly recommend for Woolwich locals.",
    name: "Priya K.",
    treatment: "Neck & Shoulder Patient",
    rating: 5,
  },
] as const;

export const faqs = [
  {
    question: "Do I need a GP referral to book an appointment?",
    answer:
      "No. You can book directly online or by phone — a GP referral is not required. If you have relevant medical letters or imaging, bring them along so we can tailor your care.",
  },
  {
    question: "What should I expect during my first osteopathy visit?",
    answer:
      "Your initial appointment lasts about 60 minutes. We take a full case history, assess posture and movement, explain our findings, and begin hands-on treatment where appropriate. Wear comfortable clothing that allows easy movement.",
  },
  {
    question: "How many treatments will I need?",
    answer:
      "It depends on your condition, how long symptoms have been present, and your goals. Many patients notice improvement within a few sessions; we review progress regularly and only recommend further care when it is clinically useful.",
  },
  {
    question: "Where is the clinic located inside St James Pharmacy?",
    answer:
      "We are based inside St James Pharmacy & Travel Clinic at 52 Powis Street, Woolwich, London SE18 6LQ. Ask at the pharmacy counter on arrival and they will direct you to the osteopathy consultation room.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are based inside St James Pharmacy: Monday–Friday 9:00am–6:00pm and Saturday 9:00am–5:30pm. Online booking opens from 5 November 2026; bookable days are Monday, Tuesday, Thursday, Friday and Saturday (closed Wednesday and Sunday).",
  },
  {
    question: "Can I speak Vietnamese at the clinic?",
    answer:
      "Yes. Austin Duy Nguyen is a Vietnamese osteopath practising in the UK and can consult in Vietnamese or English — helpful if you prefer to describe symptoms without a language barrier.",
  },
  {
    question: "Is there an NHS or student discount?",
    answer:
      "Yes. NHS staff and students receive 10% off with valid ID shown at the appointment. This does not stack with the opening-day 50% offer on 5 November 2026.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "24 hours' notice is required for cancellations. Please call or use your booking confirmation options as soon as you know you cannot attend so we can offer the slot to someone else.",
  },
  {
    question: "Is parking available near Powis Street?",
    answer:
      "Powis Street and nearby Woolwich town-centre car parks serve the clinic. Allow a few extra minutes for parking on busy days. Public transport to Woolwich is also convenient.",
  },
  {
    question: "Do you offer shockwave therapy?",
    answer:
      "Yes. Focused shockwave therapy (LI-ESWT) is available for suitable tendon and soft-tissue conditions after clinical screening. Fees are listed on our fees page; we confirm suitability before treatment.",
  },
] as const;

export type ServiceIconName =
  | "spine"
  | "spark"
  | "wave"
  | "shield"
  | "needle"
  | "hand"
  | "bone"
  | "pregnancy"
  | "cranial"
  | "child";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  idealFor: string[];
  whatToExpect: string[];
  relatedPricing?: string;
  badge?: string;
  icon: ServiceIconName;
};

export const services: Service[] = [
  {
    slug: "back-neck-pain",
    title: "Back & Neck Pain",
    summary:
      "Relief for sciatica, postural strain, disc issues, and stiffness.",
    description:
      "Persistent back or neck pain often comes from how you move, sit, and load your spine — not just a single “bad” day. We assess posture, joint mobility, and soft-tissue tone to find the driver of your discomfort, then use gentle osteopathic techniques to ease irritation and restore freer movement.",
    idealFor: [
      "Sciatica and referred leg pain",
      "Desk-related postural strain",
      "Disc-related stiffness or flare-ups",
      "Morning stiffness and reduced range",
    ],
    whatToExpect: [
      "Detailed history and movement assessment",
      "Hands-on soft-tissue and joint techniques",
      "Clear home advice to protect progress between visits",
    ],
    relatedPricing: "Initial £75 (60 mins) · Follow-up £60",
    icon: "spine",
  },
  {
    slug: "headaches-joints",
    title: "Headaches & Joints",
    summary:
      "Tension headache relief and joint rehabilitation support.",
    description:
      "Tension headaches and stiff joints often share the same story: restricted upper-neck mechanics, overloaded shoulders, and joints that have lost smooth glide. Treatment focuses on calming irritated tissues and rebuilding comfortable, confident movement in the areas that matter to you.",
    idealFor: [
      "Tension-type and cervicogenic headaches",
      "Shoulder, hip, knee, or ankle stiffness",
      "Post-injury joint irritability",
      "Recurring “tight” areas that never settle",
    ],
    whatToExpect: [
      "Assessment of neck, jaw, and surrounding joints as needed",
      "Targeted mobilisation and soft-tissue release",
      "Simple exercises to reduce recurrence",
    ],
    relatedPricing: "Initial £75 (60 mins) · Follow-up £60",
    icon: "spark",
  },
  {
    slug: "focused-shockwave",
    title: "Focused Shockwave",
    summary:
      "Advanced soundwave therapy for persistent tendinopathy.",
    description:
      "Focused shockwave (LI-ESWT) delivers precise acoustic energy to stubborn tendon problems that have not settled with rest alone. It is commonly used for heel, elbow, shoulder, and other chronic tendon irritations, helping stimulate local healing responses while we address the loading patterns that keep symptoms going.",
    idealFor: [
      "Plantar fasciopathy / heel pain",
      "Tennis or golfer’s elbow",
      "Achilles and patellar tendinopathy",
      "Long-standing tendon pain that plateaus",
    ],
    whatToExpect: [
      "Clinical screening to confirm suitability",
      "Short treatment sessions focused on the affected tendon",
      "Graduated loading advice alongside therapy",
    ],
    relatedPricing: "£90 per session",
    badge: "Specialist Care",
    icon: "wave",
  },
  {
    slug: "mens-health-ed",
    title: "Men's Health & ED",
    summary:
      "Discreet, non-invasive LI-ESWT for vascular health and recovery.",
    description:
      "Our men’s health pathway offers confidential low-intensity focused shockwave (LI-ESWT) as a drug-free, non-invasive option for vascular-related erectile difficulties and pelvic recovery goals. Appointments are private, respectful, and paced so you can ask questions and understand the plan clearly.",
    idealFor: [
      "Vascular-related erectile dysfunction",
      "Men seeking a non-drug, non-surgical option",
      "Pelvic protocol support alongside clinical care",
      "Patients who prefer discreet one-to-one treatment",
    ],
    whatToExpect: [
      "Confidential consultation in a private setting",
      "Clear explanation of LI-ESWT and expected course",
      "Protocol-based sessions with follow-up guidance",
    ],
    relatedPricing: "Specialist protocol £110 (30 mins)",
    badge: "Specialist Care",
    icon: "shield",
  },
  {
    slug: "acupuncture-electro",
    title: "Acupuncture / Electro",
    summary:
      "Targeted needle and microcurrent therapy for pain relief and healing.",
    description:
      "Western medical acupuncture and electroacupuncture can calm irritable muscles, support pain modulation, and complement hands-on osteopathy. Needles are placed with clinical intent — often as an add-on within a treatment, or as a focused standalone session when appropriate.",
    idealFor: [
      "Muscle trigger-point irritability",
      "Persistent localised pain",
      "Patients who respond well to needling",
      "Adjunct support during rehab",
    ],
    whatToExpect: [
      "Discussion of suitability and comfort preferences",
      "Precise needling with or without gentle microcurrent",
      "Integration with your broader treatment plan",
    ],
    relatedPricing: "Standalone or add-on +£20",
    icon: "needle",
  },
  {
    slug: "deep-tissue-massage",
    title: "Deep Tissue Massage",
    summary:
      "Release chronic muscle tension, knots, and tissue tightness.",
    description:
      "Deep tissue massage works into the layers that hold chronic tension — useful when muscles feel knotted, heavy, or restricted after training, long hours at a desk, or stress. Pressure is progressive and guided by your feedback so treatment stays effective without being overwhelming.",
    idealFor: [
      "Chronic muscular tightness",
      "Training-related muscle load",
      "Desk-related shoulder and back tension",
      "Anyone needing deeper soft-tissue release",
    ],
    whatToExpect: [
      "Focused work on priority regions",
      "Breathing and positioning to keep treatment comfortable",
      "Aftercare tips to keep tissues moving well",
    ],
    relatedPricing: "45 mins £60",
    icon: "hand",
  },
  {
    slug: "sports-injury-rehab",
    title: "Sports Injury & Rehab",
    summary:
      "Targeted recovery plans for athletic strains and sprains.",
    description:
      "Whether you are returning from a sprain, strain, or overuse injury, rehab works best when assessment, hands-on care, and progressive loading sit together. We build a plan that respects tissue healing while getting you back to training with better mechanics and confidence.",
    idealFor: [
      "Muscle strains and ligament sprains",
      "Overuse injuries from running or gym training",
      "Return-to-sport planning",
      "Recurring athletic niggles",
    ],
    whatToExpect: [
      "Injury-specific assessment and goal setting",
      "Manual therapy plus progressive rehab advice",
      "Clear milestones for return to activity",
    ],
    relatedPricing: "Initial £75 (60 mins) · Follow-up £60",
    icon: "bone",
  },
  {
    slug: "pregnancy-support",
    title: "Pregnancy Support",
    summary:
      "Gentle care for pelvic pressure and postural changes.",
    description:
      "Pregnancy changes how your pelvis, spine, and soft tissues carry load. Gentle osteopathic care can help ease pelvic pressure, rib and back discomfort, and postural strain — always adapted to your trimester and comfort.",
    idealFor: [
      "Pelvic girdle discomfort",
      "Lower-back and rib strain in pregnancy",
      "Postural change as your baby grows",
      "Gentle support through later trimesters",
    ],
    whatToExpect: [
      "Trimester-aware positioning and techniques",
      "Gentle mobilisation and soft-tissue care",
      "Practical advice for comfort day to day",
    ],
    relatedPricing: "Initial £75 (60 mins) · Follow-up £60",
    icon: "pregnancy",
  },
  {
    slug: "cranial-therapy",
    title: "Cranial Therapy",
    summary:
      "Subtle, gentle techniques for tension and structural alignment.",
    description:
      "Cranial osteopathy uses very light, precise contact to ease patterns of tension through the head, neck, and wider body. It suits people who prefer a quieter therapeutic approach, including those who find firmer techniques too intense.",
    idealFor: [
      "People sensitive to stronger manual techniques",
      "Head, jaw, and upper-neck tension patterns",
      "Stress-held structural tightness",
      "Patients seeking a gentler session style",
    ],
    whatToExpect: [
      "A calm, unhurried treatment environment",
      "Subtle hands-on techniques with regular check-ins",
      "Advice on rest and hydration afterwards",
    ],
    relatedPricing: "Initial £75 (60 mins) · Follow-up £60",
    icon: "cranial",
  },
  {
    slug: "paediatric-care",
    title: "Paediatric Care",
    summary:
      "Soft, gentle osteopathic care tailored for infants and children.",
    description:
      "Paediatric osteopathy is soft, measured, and always adapted to your child’s age and comfort. We take time with parents, explain what we are doing, and use gentle techniques suitable for infants through to older children.",
    idealFor: [
      "Infants and children needing gentle musculoskeletal care",
      "Families preferring a calm, unhurried approach",
      "Age-appropriate support for comfort and movement",
      "Parents who want clear explanations throughout",
    ],
    whatToExpect: [
      "Parent-led discussion of concerns and history",
      "Very gentle assessment and treatment",
      "Practical guidance you can use at home",
    ],
    relatedPricing: "Initial £75 (60 mins) · Follow-up £60",
    icon: "child",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

/** Prefer dedicated conversion hubs when they exist. */
export function getServiceHref(slug: string) {
  switch (slug) {
    case "focused-shockwave":
      return "/shockwave";
    case "mens-health-ed":
      return "/mens-health";
    case "pregnancy-support":
      return "/pregnancy";
    case "sports-injury-rehab":
      return "/sports";
    case "paediatric-care":
      return "/paediatric";
    case "cranial-therapy":
      return "/cranial";
    case "acupuncture-electro":
      return "/acupuncture";
    case "deep-tissue-massage":
      return "/massage";
    default:
      return `/services/${slug}`;
  }
}

export const pricing = [
  {
    service: "Initial Consultation & Treatment",
    duration: "60 mins",
    price: "£75",
  },
  {
    service: "Follow-up Osteopathic Treatment",
    duration: "30 mins",
    price: "£60",
  },
  {
    service: "Focused Shockwave Therapy (LI-ESWT)",
    duration: "30 mins",
    price: "£90",
  },
  {
    service: "Specialist ED Treatment & Pelvic Protocol",
    duration: "30 mins",
    price: "£110",
  },
  {
    service: "Acupuncture / Electroacupuncture",
    duration: "30 mins / add-on",
    price: "+£20",
  },
  {
    service: "Deep Tissue Massage Therapy",
    duration: "45 mins",
    price: "£60",
  },
  {
    service: "Cupping Therapy Add-on",
    duration: "45 mins",
    price: "+£15",
  },
] as const;
