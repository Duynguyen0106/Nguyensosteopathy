export type ServiceArea = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  heroLine: string;
  travelNote: string;
  /** Longer local SEO copy rendered on the area lander. */
  detail: string;
  whyVisit: string[];
  relatedBlogSlug?: string;
  keywords: string[];
};

export type AreaFaq = { question: string; answer: string };

/** Local FAQs for area landers + FAQPage JSON-LD. */
export function getAreaFaqs(area: ServiceArea): AreaFaq[] {
  return [
    {
      question: `Do I need a GP referral to see an osteopath from ${area.name}?`,
      answer:
        "No. You can book Nguyen's Osteopathic Clinic directly online or by phone — a GP referral is not required for most musculoskeletal presentations.",
    },
    {
      question: `Where is the clinic for patients travelling from ${area.name}?`,
      answer: `We are inside Village Pharmacy at 9 The Village, Charlton SE7 8UG. ${area.travelNote} Ask at the pharmacy counter on arrival and staff will direct you to the osteopathy room.`,
    },
    {
      question: "What days can I book osteopathy?",
      answer:
        "The clinic is open Monday to Sunday, 9:00am – 8:00pm. Live slots are always shown on the booking page.",
    },
    {
      question: `Is home-visit osteopathy available near ${area.name}?`,
      answer:
        "Yes, when clinic travel is difficult. Home-visit initial appointments are £120 (60 minutes) and follow-ups are £100 (30 minutes). Contact us first to confirm your address is within local coverage.",
    },
    {
      question: "Can I speak Vietnamese at the clinic?",
      answer:
        "Yes. Austin Duy Nguyen can consult in Vietnamese or English so you can describe symptoms without a language barrier.",
    },
  ];
}

/** Local catchments for SEO and patient orientation around Charlton SE7. */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "charlton",
    name: "Charlton",
    shortName: "Charlton SE7",
    summary:
      "Our home base — private osteopathy inside Village Pharmacy on The Village, steps from Charlton village.",
    heroLine:
      "Registered osteopathy in Charlton — private appointments, clear plans, no GP referral needed.",
    travelNote:
      "Short walk from Charlton station and local buses along The Village / Charlton Church Lane.",
    detail:
      "Nguyen's Osteopathic Clinic is based inside Village Pharmacy at 9 The Village, Charlton SE7 8UG, so local patients can combine pharmacy errands with a private osteopathy appointment without a central-London trek. Care is with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332), for back and neck pain, sciatica, sports injuries, focused shockwave when suitable, pregnancy support, and discreet men’s health pathways. Charlton Park runners, pitch-side knocks at The Valley, hybrid workers on the SE7–SE10 corridor, and families who prefer Vietnamese or English consultations use the clinic as a local first stop. Charlton station and local buses make same-day travel realistic if you work toward Greenwich or Canary Wharf and want care closer to home than a central clinic. No GP referral is required for most musculoskeletal presentations. Ask at the pharmacy counter on arrival and they will direct you to the osteopathy room. Fees, NHS/student discount rules, and aftercare guidance are listed clearly so you know what to expect before you visit.",
    whyVisit: [
      "Clinic based on The Village inside Village Pharmacy",
      "Easy for Charlton station and village arrivals",
      "Full service list from back pain to shockwave",
      "Vietnamese or English consultations available",
    ],
    relatedBlogSlug: "osteopath-greenwich-charlton-thamesmead",
    keywords: [
      "osteopath Charlton",
      "osteopath SE7",
      "osteopathy The Village Charlton",
    ],
  },
  {
    slug: "plumstead",
    name: "Plumstead",
    shortName: "Plumstead",
    summary:
      "A short hop for Plumstead and Plumstead Common patients who want registered osteopathic care without travelling into central London.",
    heroLine:
      "Close enough for Plumstead locals who want assessment this week — not a central London trek.",
    travelNote:
      "Bus or drive toward Charlton village; ask at Village Pharmacy for the osteopathy room.",
    detail:
      "Plumstead and Plumstead Common patients often prefer a short bus or drive to Village Pharmacy in Charlton rather than booking a central clinic that eats half the day. Care is with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332), covering mechanical back and neck pain, desk strain from hybrid work, trades niggles from local builds, park-run and Common running injuries, and focused shockwave for selected stubborn heel or shoulder tendons after screening. Parents around the Common schools and shift workers who need evening-friendly planning are regular visitors; Vietnamese or English consultations are available if that helps you describe symptoms accurately. Bring comfortable clothes and any recent letters if you have them — we explain findings in plain English and leave a short home plan you can keep. NHS staff and students receive 10% off with valid ID. No GP referral is required for most musculoskeletal presentations. Regular bookable days follow the clinic hours on Find us; parking tips, pharmacy arrival steps, fees, and cancellation rules are published up front before you visit.",
    whyVisit: [
      "Short bus or drive toward Charlton village",
      "Helpful for desk, trades, and sports niggles",
      "Parking tips and arrival guide on Find us",
      "Online booking with no GP referral",
    ],
    relatedBlogSlug: "osteopath-plumstead-abbey-wood-se18",
    keywords: ["osteopath Plumstead", "osteopath near Plumstead", "SE18 osteopath"],
  },
  {
    slug: "abbey-wood",
    name: "Abbey Wood",
    shortName: "Abbey Wood",
    summary:
      "Practical for Abbey Wood residents via rail or bus toward Charlton — same-day local assessment instead of a long hospital wait.",
    heroLine:
      "Rail toward Charlton, then a short hop to private osteopathy on The Village.",
    travelNote:
      "Rail or bus toward Charlton village, then a short walk to Village Pharmacy at 9 The Village.",
    detail:
      "Abbey Wood residents can reach the clinic via rail or bus toward Charlton, then a short walk to Village Pharmacy at 9 The Village — often faster door-to-door than a central London MSK wait when back, neck, or running pain is interrupting work or sleep. Crossrail-era commuting, Harrow Manor Way links, and Lesnes Abbey weekend walks are common contexts we hear alongside desk strain and park-run spikes. At Nguyen's Osteopathic Clinic, care is with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332), covering mechanical back and neck pain, sciatica-type leg symptoms, sports load errors, and focused shockwave for selected stubborn tendons after clinical screening. We screen red flags carefully and explain findings in plain English before treatment starts. NHS staff and students receive 10% off with valid ID. Parents juggling school runs toward Thamesmead and shift workers who need clear evening planning are regular visitors. No GP referral is required for most musculoskeletal presentations. Use the Find us guide for arrival steps and the booking page for live appointment slots, with fees and cancellation rules published up front.",
    whyVisit: [
      "Practical rail and bus links toward Charlton",
      "Useful for back, neck, and running injuries",
      "Clear fees and NHS/student discount info",
      "Ask at the pharmacy counter on arrival",
    ],
    relatedBlogSlug: "osteopath-plumstead-abbey-wood-se18",
    keywords: [
      "osteopath Abbey Wood",
      "osteopath near Abbey Wood",
      "Elizabeth line osteopath",
    ],
  },
  {
    slug: "greenwich",
    name: "Greenwich",
    shortName: "Greenwich",
    summary:
      "Handy for Greenwich and East Greenwich patients after desk, commute, or running-related aches — drug-free care closer than central clinics.",
    heroLine:
      "Drug-free osteopathy for Greenwich patients who prefer SE7 convenience over a central clinic.",
    travelNote:
      "Bus or short drive into Charlton village; clinic is inside Village Pharmacy on The Village.",
    detail:
      "Greenwich, East Greenwich, and Peninsula patients often juggle Canary Wharf or central London commutes with evening training along the Thames Path or around Greenwich Park — a pattern that feeds desk neck, running load, and irritable shoulders. Nguyen's Osteopathic Clinic sits inside Village Pharmacy at 9 The Village in Charlton, so travel is usually a short bus or drive — often faster door-to-door than a central clinic after a late finish. Care is with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332), for mechanical back and neck pain, sciatica-type symptoms, sports injuries, and focused shockwave when a stubborn tendon fits after clinical screening. Hybrid desk weeks toward the Isle of Dogs, maritime shift patterns, and Park runners stepping up mileage are common stories we hear. Appointments are private and one-to-one; Vietnamese or English consultations are available if that helps you describe symptoms accurately. NHS staff and students receive 10% off with valid ID. No GP referral is required for most musculoskeletal presentations. Ask at the pharmacy counter on arrival and they will direct you to the osteopathy room; fees and cancellation rules are listed clearly before you book.",
    whyVisit: [
      "Practical from Greenwich and East Greenwich",
      "Desk-neck, running, and joint pathways available",
      "Shockwave and sports rehab when suitable",
      "Private one-to-one appointments",
    ],
    relatedBlogSlug: "osteopath-greenwich-charlton-thamesmead",
    keywords: [
      "osteopath Greenwich",
      "osteopath near Greenwich",
      "osteopath SE10",
    ],
  },
  {
    slug: "thamesmead",
    name: "Thamesmead",
    shortName: "Thamesmead",
    summary:
      "A straightforward option for Thamesmead patients needing assessment for work strain, sports injuries, or persistent joint pain.",
    heroLine:
      "Local osteopathy for Thamesmead — work strain, sports injuries, and joint pain assessed properly.",
    travelNote:
      "Bus routes toward Charlton; ask at Village Pharmacy for the osteopathy room on arrival.",
    detail:
      "Thamesmead patients with work strain, sports injuries, or persistent joint pain can reach Charlton by bus and ask at Village Pharmacy for the osteopathy room — a practical alternative to a long central triage wait when sleep, stairs, or shifts are already under pressure. Lakeside and Thames Path walks, warehouse and logistics shifts, and weekend five-a-side are common load stories we hear from SE28. Care is with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332), and stays drug-free and explanation-led: we screen for problems that need medical input first, then treat mechanical drivers with osteopathy, graded rehab advice, and focused shockwave when a stubborn tendon fits after clinical screening. Standing occupations and sudden training spikes after quiet weeks often share the same presentation as desk-neck flares from hybrid work. NHS and student discounts apply with valid ID; fees and cancellation rules are listed clearly before you book. No GP referral is required for most musculoskeletal presentations. Use Find us for arrival tips and the booking page for live slots, and call if you are unsure whether osteopathy or a GP review should come first.",
    whyVisit: [
      "Bus routes toward Charlton from Thamesmead",
      "Work-related and sports pathways",
      "GOsC-registered practitioner",
      "Book online or call for appointment help",
    ],
    relatedBlogSlug: "osteopath-greenwich-charlton-thamesmead",
    keywords: [
      "osteopath Thamesmead",
      "osteopath near Thamesmead",
      "SE28 osteopath",
    ],
  },
] as const;

export function getServiceArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getAllServiceAreaSlugs() {
  return serviceAreas.map((area) => area.slug);
}
