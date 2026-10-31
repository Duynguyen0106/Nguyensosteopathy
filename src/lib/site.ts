export const site = {
  name: "Nguyen's Osteopathic Clinic",
  shortName: "Nguyen's",
  tagline: "Recover, Realign, and Restore Your Vitality",
  practitioner: {
    name: "Austin Duy Nguyen",
    /** Legal name as on the GOsC public Register (Mr Ba-duy Nguyen). */
    legalName: "Ba-duy Nguyen",
    title: "GOsC-Registered Osteopath",
    regNo: "12332",
    credentials:
      "Master of Osteopathy (BCOM); CertHE Medical Sciences with Distinction (University of Westminster); Dip.Acu; Shockwave CPD; NASM Personal Fitness Trainer",
    /**
     * Direct GOsC public Register profile (Reg. No. 12332 — Fully Registered).
     * Search fallback: https://www.osteopathy.org.uk/register-search/?search=1&registration=12332
     */
    goscRegisterUrl:
      "https://www.osteopathy.org.uk/register-search/registrants/003WT00000T8U4XYAV/",
    goscValidFrom: "16 October 2026",
    goscValidTo: "15 October 2027",
    bio: "Austin is a GOsC-registered osteopath and founder of Nguyen's Osteopathic Clinic in Woolwich. He specialises in back pain, neck pain, and sports injuries, and speaks English and Vietnamese.",
    /**
     * Public qualifications — PDFs only where privacy-safe.
     * University transcript is not published (contains personal data).
     */
    qualifications: [
      {
        id: "gosc",
        kind: "licence" as const,
        title: "General Osteopathic Council registration",
        shortTitle: "GOsC-registered osteopath",
        issuer: "General Osteopathic Council",
        detail:
          "Registration No. 12332 — Fully Registered; permitted to practise as an osteopath in the UK.",
        dateLabel: "Registered 16 Oct 2026 · Valid to 15 Oct 2027",
        href: "https://www.osteopathy.org.uk/register-search/registrants/003WT00000T8U4XYAV/",
        certificateHref: "/credentials/gosc-registration-12332.pdf",
      },
      {
        id: "mOst",
        kind: "degree" as const,
        title: "Master of Osteopathy",
        shortTitle: "M.Ost",
        issuer: "British College of Osteopathic Medicine (BCOM)",
        detail:
          "UK osteopathy degree covering clinical assessment, hands-on treatment, and professional standards.",
        dateLabel: "Graduated",
        href: undefined as string | undefined,
        certificateHref: undefined as string | undefined,
      },
      {
        id: "certhe-medsci",
        kind: "degree" as const,
        title: "Certificate of Higher Education in Medical Sciences",
        shortTitle: "CertHE Medical Sciences",
        issuer: "University of Westminster",
        detail:
          "Awarded with Distinction — biomedical foundation including anatomy, physiology, and research methods.",
        dateLabel: "21 June 2023",
        href: undefined as string | undefined,
        certificateHref: undefined as string | undefined,
      },
      {
        id: "dipacu",
        kind: "diploma" as const,
        title:
          "Diploma in Acupuncture — Clinical Acupuncture (Western Approach)",
        shortTitle: "Dip.Acu",
        issuer: "BSOMM Education / OMT Training",
        detail:
          "300-hour programme covering Western acupuncture, safe needling, infection control, red flags, and clinical application.",
        dateLabel: "10 October 2026",
        href: undefined as string | undefined,
        certificateHref: "/credentials/diploma-acupuncture-western-approach.pdf",
      },
      {
        id: "shockwave-cpd",
        kind: "cpd" as const,
        title: "Shockwave Therapy for Clinical Practice",
        shortTitle: "Shockwave CPD",
        issuer: "OMT Training",
        detail:
          "8-hour CPD in radial extracorporeal shockwave therapy (rESWT): indications, contraindications, safety, and MSK integration.",
        dateLabel: "10 October 2026",
        href: undefined as string | undefined,
        certificateHref: "/credentials/shockwave-therapy-clinical-practice.pdf",
      },
      {
        id: "nasm-pft",
        kind: "certificate" as const,
        title: "Personal Fitness Trainer",
        shortTitle: "NASM Personal Fitness Trainer",
        issuer: "National Academy of Sports Medicine (NASM)",
        detail:
          "Certificate No. 1261726997 — exercise programming and trainer competency (NASM 1.9 | AFAA 1.5 CEUs).",
        dateLabel: "7 March 2026",
        href: undefined as string | undefined,
        certificateHref: "/credentials/nasm-personal-fitness-trainer.pdf",
      },
    ],
  },
  phone: "07882 843513",
  /** E.164 for schema.org and reliable click-to-call. */
  phoneE164: "+447882843513",
  phoneHref: "tel:+447882843513",
  whatsappUrl: "https://wa.me/447882843513",
  email: "nguyensosteopathy@gmail.com",
  emailHref: "mailto:nguyensosteopathy@gmail.com",
  facebookUrl: "https://www.facebook.com/Nguyensosteopathy",
  /** Canonical LinkedIn profile (also used in schema sameAs). */
  linkedinUrl: "https://www.linkedin.com/in/austin-nguyen-do",
  googleReviewsUrl: "https://maps.app.goo.gl/XgHpsXAy1FmZKibn9",
  googleMapsCid: "13911505434361225558",
  website: "www.nguyensosteopathy.com",
  websiteUrl: "https://www.nguyensosteopathy.com",
  /**
   * Stable sitemap lastmod (YYYY-MM-DD) for evergreen pages without their own
   * content dates. Bump when major site copy/structure ships — do not use
   * request-time `new Date()` in sitemap.ts (forces a dynamic route).
   */
  sitemapDefaultLastmod: "2026-10-22",
  address: {
    line1: "52 Powis Street",
    line2: "Woolwich, London, SE18 6LQ",
    venue: "St James Pharmacy & Travel Clinic",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=52+Powis+Street+Woolwich+London+SE18+6LQ",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=52+Powis+Street+Woolwich+London+SE18+6LQ&z=16&output=embed",
    /** WGS84 for schema.org / meta geo tags (single source of truth). */
    geo: {
      latitude: 51.4912,
      longitude: 0.0672,
    },
  },
  /** Pharmacy / venue opening pattern (building access). */
  hours: [
    { days: "Monday – Friday", time: "9:00am – 6:00pm" },
    { days: "Saturday", time: "9:00am – 5:30pm" },
  ],
  /** Osteopathy booking pattern (pharmacy access hours may differ). */
  booking: {
    bookableDaysLabel:
      "Monday, Tuesday, Thursday, Friday and Saturday",
    closedDaysLabel: "Wednesday and Sunday",
    /** Display rows for bookable osteopathy clinic times (not pharmacy access). */
    hours: [
      { days: "Mon, Tue, Thu, Fri", time: "9:00am – 6:00pm" },
      { days: "Saturday", time: "9:00am – 5:30pm" },
    ],
    shortNote:
      "Bookable osteopathy days: Mon, Tue, Thu, Fri & Sat (closed Wed & Sun).",
    note: "Bookable osteopathy days are Monday, Tuesday, Thursday, Friday and Saturday (closed Wednesday and Sunday). Live slots are always shown in the booking calendar.",
    schemaWeekdays: ["Monday", "Tuesday", "Thursday", "Friday"] as const,
    weekday: { opens: "09:00", closes: "18:00" },
    saturday: { opens: "09:00", closes: "17:30" },
  },
  cancellation: "24 hours' notice is required for cancellations.",
  discount:
    "10% Discount for NHS Staff & Students (Valid ID required at appointment)",
  /** Site /book page (embed host). */
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://www.nguyensosteopathy.com/book",
  /** Treow non-embed public booking (fallback / “open full page”). */
  bookingExternalUrl:
    process.env.NEXT_PUBLIC_BOOKING_EXTERNAL_URL ??
    "https://treow-clinic.vercel.app/book/nguyens-osteopathy",
  bookingEmbedUrl:
    process.env.NEXT_PUBLIC_BOOKING_EMBED_URL ??
    "https://treow-clinic.vercel.app/embed/nguyens-osteopathy",
  /**
   * Products Austin built — clinician/clinic tools (not patient booking embeds).
   * MSK Tutor is for therapists/students; Treow powers this site’s /book widget.
   */
  products: {
    mskTutor: {
      name: "MSK Tutor",
      shortLabel: "MSK Tutor",
      url: "https://osteotutor-c0c151c1.vercel.app",
      tagline: "Clinical reasoning tutor for manual therapists",
      description:
        "An AI virtual-patient app for physio, osteopathy, chiropractic, and MSK clinicians — SOCRATES intake, live red-flag spotting, ranked differentials, and exportable SOAP notes.",
    },
    treowClinic: {
      name: "Treow Clinic",
      shortLabel: "Treow",
      url: "https://treowclinic.com/",
      loginUrl: "https://treowclinic.com/login",
      tagline: "Clinic booking and practice management",
      description:
        "The booking and clinic app that powers online appointments for Nguyen's Osteopathic Clinic — staff login, services, hours, and the public /book embed.",
    },
  },
} as const;

/** Schema.org openingHoursSpecification for bookable osteopathy days. */
export const bookingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: [...site.booking.schemaWeekdays],
    opens: site.booking.weekday.opens,
    closes: site.booking.weekday.closes,
  },
  {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: "Saturday" as const,
    opens: site.booking.saturday.opens,
    closes: site.booking.saturday.closes,
  },
];

export const highlights = [
  "Drug-free, hands-on osteopathic care",
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

export const faqs = [
  {
    question: "What is osteopathy?",
    answer:
      "Osteopathy is a regulated, drug-free approach to musculoskeletal pain. We assess how your joints, muscles, and posture share load, use hands-on treatment to ease irritation, and give practical advice for work and daily life. See our what-is-osteopathy page for a fuller plain-English guide.",
  },
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
      "The pharmacy building (access) is open Monday–Friday 9:00am–6:00pm and Saturday 9:00am–5:30pm. Osteopathy appointments are separate: bookable Mon, Tue, Thu, Fri & Sat — closed Wednesday and Sunday. Live slots are always shown in the online booking calendar.",
  },
  {
    question: "Can I speak Vietnamese at the clinic?",
    answer:
      "Yes. Austin Duy Nguyen is a Vietnamese osteopath practising in the UK and can consult in Vietnamese or English — helpful if you prefer to describe symptoms without a language barrier.",
  },
  {
    question: "Is there an NHS or student discount?",
    answer:
      "Yes. NHS staff and students receive 10% off with valid ID shown at the appointment.",
  },
  {
    question: "What should I do after treatment?",
    answer:
      "Keep moving gently, hydrate as usual, and follow any posture or exercise advice from your visit. Mild soreness for 24–48 hours can be normal. See our aftercare guide and the post-visit gentle-move programme in our exercise library for more detail, and contact us if symptoms clearly worsen or you develop red-flag symptoms.",
  },
  {
    question: "Do you give home exercises?",
    answer:
      "Yes. Most plans include a short home programme matched to your presentation. You can also browse our public exercise library for illustrated drills and programmes (low back, desk neck, sciatica, knee, heel, shoulder, ankle). Those pages are educational guides — not a personal prescription — so clinic advice for your case always comes first.",
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
  {
    question: "Do you offer home visits?",
    answer:
      "Yes. Home-visit osteopathy is available when travel to the clinic is difficult. Initial home consultation and treatment is £120 for 60 minutes; follow-up home treatment is £100 for 30 minutes. Coverage is local to Woolwich and nearby SE London — contact us to confirm your address before booking.",
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
  | "child"
  | "home";

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
  {
    slug: "home-visits",
    title: "Home Visits",
    summary:
      "Osteopathy at your home when travel to the clinic is difficult.",
    description:
      "Home-visit osteopathy brings assessment and hands-on treatment to your address when getting to the clinic is hard — after injury, with limited mobility, or when staying home simply works better. Sessions follow the same clinical standards as clinic care, with clear fees for initial and follow-up visits.",
    idealFor: [
      "Limited mobility or post-injury travel difficulty",
      "Busy carers who cannot easily leave home",
      "Recovery periods when clinic trips are a barrier",
      "Patients who prefer treatment in a familiar space",
    ],
    whatToExpect: [
      "Confirmation of address, access, and parking or entry notes",
      "Full history and hands-on assessment in your home",
      "Clear plan for follow-up visits or clinic care if preferred",
    ],
    relatedPricing: "Home initial £120 (60 mins) · Follow-up £100 (30 mins)",
    badge: "Home visit",
    icon: "home",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

/** Canonical individual service SEO pages. */
export function getServiceHref(slug: string) {
  return `/services/${slug}`;
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
    duration: "Add-on",
    price: "+£15",
  },
  {
    service: "Home Visit — Initial Consultation & Treatment",
    duration: "60 mins",
    price: "£120",
  },
  {
    service: "Home Visit — Follow-up Treatment",
    duration: "30 mins",
    price: "£100",
  },
] as const;

/** Standalone session prices for schema Offer markup (excludes +£ add-ons). */
export const schemaOffers = pricing.filter(
  (item) => !item.price.trimStart().startsWith("+"),
);

/** Stable @id for clinic makesOffer entries — fees OfferCatalog references these. */
export function schemaOfferId(serviceName: string) {
  const slug = serviceName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${site.websiteUrl}/#offer-${slug}`;
}
