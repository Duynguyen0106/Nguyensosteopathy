export const site = {
  name: "Nguyen's Osteopathic Clinic",
  shortName: "Nguyen's",
  tagline: "Recover, Realign, and Restore Your Vitality",
  practitioner: {
    name: "Austin Duy Nguyen",
    title: "GOsC-Registered Osteopath",
    regNo: "12332",
  },
  phone: "07882843513",
  phoneHref: "tel:+447882843513",
  email: "info@nguyensosteopathy.co.uk",
  emailHref: "mailto:info@nguyensosteopathy.co.uk",
  website: "www.nguyensosteopathy.co.uk",
  address: {
    line1: "52 Powis Street",
    line2: "Woolwich, London, SE18 6LQ",
    venue: "St James Pharmacy & Travel Clinic",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=52+Powis+Street+Woolwich+London+SE18+6LQ",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00am – 6:00pm" },
    { days: "Saturday", time: "9:00am – 5:30pm" },
  ],
  cancellation: "24 hours' notice is required for cancellations.",
  discount: "10% Discount for NHS Staff & Students (Valid ID required at appointment)",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://treow-clinic.vercel.app/book/nguyens-osteopathy",
  bookingEmbedUrl:
    process.env.NEXT_PUBLIC_BOOKING_EMBED_URL ??
    "https://treow-clinic.vercel.app/embed/nguyens-osteopathy",
} as const;

export const highlights = [
  "100% Drug-Free & Non-Invasive",
  "No GP Referral Necessary",
  "Private 1-on-1 Consultation",
  "10% Student & NHS Discount",
] as const;

export const services = [
  {
    title: "Back & Neck Pain",
    description: "Relief for sciatica, postural strain, disc issues, and stiffness.",
    icon: "spine",
  },
  {
    title: "Headaches & Joints",
    description: "Tension headache relief and joint rehabilitation support.",
    icon: "spark",
  },
  {
    title: "Focused Shockwave",
    description: "Advanced soundwave therapy for persistent tendinopathy.",
    icon: "wave",
  },
  {
    title: "Men's Health & ED",
    description: "Discreet, non-invasive LI-ESWT for vascular health and recovery.",
    icon: "shield",
  },
  {
    title: "Acupuncture / Electro",
    description: "Targeted needle and microcurrent therapy for pain relief and healing.",
    icon: "needle",
  },
  {
    title: "Deep Tissue Massage",
    description: "Release chronic muscle tension, knots, and tissue tightness.",
    icon: "hand",
  },
  {
    title: "Sports Injury & Rehab",
    description: "Targeted recovery plans for athletic strains and sprains.",
    icon: "bone",
  },
  {
    title: "Pregnancy Support",
    description: "Gentle care for pelvic pressure and postural changes.",
    icon: "pregnancy",
  },
  {
    title: "Cranial Therapy",
    description: "Subtle, gentle techniques for tension and structural alignment.",
    icon: "cranial",
  },
  {
    title: "Paediatric Care",
    description: "Soft, gentle osteopathic care tailored for infants and children.",
    icon: "child",
  },
] as const;

export const pricing = [
  {
    service: "Initial Consultation & Treatment",
    duration: "45–60 mins",
    price: "£75",
  },
  {
    service: "Follow-up Osteopathic Treatment",
    duration: "30 mins",
    price: "£60",
  },
  {
    service: "Focused Shockwave Therapy (LI-ESWT)",
    duration: "Per session",
    price: "£90",
  },
  {
    service: "Specialist ED Treatment & Pelvic Protocol",
    duration: "Confidential",
    price: "£110",
  },
  {
    service: "Acupuncture / Electroacupuncture",
    duration: "Add-on / Standalone",
    price: "+£15 – £20",
  },
  {
    service: "Deep Tissue Massage Therapy",
    duration: "45 mins",
    price: "£60",
  },
  {
    service: "Cupping Therapy Add-on",
    duration: "Add-on",
    price: "+£10 – £15",
  },
] as const;
