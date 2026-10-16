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

/** Local catchments for SEO and patient orientation around Woolwich SE18. */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "woolwich",
    name: "Woolwich",
    shortName: "Woolwich SE18",
    summary:
      "Our home base — private osteopathy inside St James Pharmacy on Powis Street, steps from Woolwich town centre.",
    heroLine:
      "Registered osteopathy in the heart of Woolwich — private appointments, clear plans, no GP referral needed.",
    travelNote:
      "Short walk from Woolwich Arsenal (Elizabeth line, DLR, National Rail) and local buses along Powis Street.",
    detail:
      "Nguyen's Osteopathic Clinic is based inside St James Pharmacy & Travel Clinic on Powis Street, so Woolwich patients can combine pharmacy errands with a private osteopathy appointment without a central-London trek. Care is with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332), for back and neck pain, sciatica, sports injuries, focused shockwave when suitable, pregnancy support, and discreet men’s health pathways. Desk workers around the town centre, tradespeople, runners on the Thames Path, and families who prefer Vietnamese or English consultations use the clinic as a local first stop. Online booking shows live slots from 5 November 2026; no GP referral is required for most musculoskeletal presentations. Ask at the pharmacy counter on arrival and they will direct you to the osteopathy room. Fees, NHS/student discount rules, and aftercare guidance are listed clearly so you know what to expect before you visit.",
    whyVisit: [
      "Clinic based on Powis Street inside St James Pharmacy",
      "Easy for Woolwich Arsenal and town-centre arrivals",
      "Full service list from back pain to shockwave",
      "Vietnamese or English consultations available",
    ],
    relatedBlogSlug: "osteopath-woolwich-what-to-expect",
    keywords: [
      "osteopath Woolwich",
      "osteopath SE18",
      "osteopathy Powis Street",
    ],
  },
  {
    slug: "plumstead",
    name: "Plumstead",
    shortName: "Plumstead",
    summary:
      "A short hop for Plumstead and Woolwich Common patients who want registered osteopathic care without travelling into central London.",
    heroLine:
      "Close enough for Plumstead locals who want assessment this week — not a central London trek.",
    travelNote:
      "Bus links into Woolwich town centre; easy drop-off on Powis Street before asking at the pharmacy counter.",
    detail:
      "Plumstead and Woolwich Common patients often prefer a short bus or drive into Powis Street rather than booking a central clinic that eats half the day. At Nguyen's Osteopathic Clinic we assess desk strain, trades niggles, running injuries, and stubborn heel or shoulder pain with the same private one-to-one format used for Woolwich locals. Bring comfortable clothes and any recent letters if you have them; we explain findings in plain English and leave you with a short home plan you can actually keep. Parking tips and pharmacy arrival steps are on our Find us page. Book online when slots open from 5 November 2026, or call if you are unsure whether osteopathy or a GP review should come first.",
    whyVisit: [
      "Short bus or drive into Woolwich town centre",
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
      "Practical for Abbey Wood residents via Elizabeth line or bus into Woolwich — same-day local assessment instead of a long hospital wait.",
    heroLine:
      "Elizabeth line to Woolwich, then a short walk to private osteopathy on Powis Street.",
    travelNote:
      "Elizabeth line to Woolwich, then a short walk or bus to Powis Street and St James Pharmacy.",
    detail:
      "Abbey Wood residents can reach the clinic via the Elizabeth line to Woolwich, then a short walk or bus to St James Pharmacy on Powis Street. That makes private osteopathy realistic when back, neck, or running pain is interrupting work or sleep and you do not want a long wait for routine MSK triage. We screen red flags carefully, treat mechanical drivers with hands-on care, and add focused shockwave for selected stubborn tendons after clinical screening. NHS staff and students receive 10% off with valid ID. Use the Find us guide for arrival, and book online when appointments open from 5 November 2026.",
    whyVisit: [
      "Elizabeth line link into Woolwich",
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
      "Drug-free osteopathy for Greenwich patients who prefer SE18 convenience over a central clinic.",
    travelNote:
      "Bus or DLR/rail into Woolwich Arsenal; clinic is a short walk into Powis Street.",
    detail:
      "Greenwich and East Greenwich patients often juggle Canary Wharf or central commutes with evening training — a pattern that feeds desk neck, running load, and irritable shoulders. Nguyen's Osteopathic Clinic in Woolwich offers registered osteopathy with clear fees and graded rehab advice, plus focused shockwave when tendinopathy is stubborn after screening. Travel is usually bus or rail into Woolwich Arsenal, then a short walk to Powis Street. Appointments are private and one-to-one; Vietnamese consultations are available if that helps you describe symptoms accurately. Book online from 5 November 2026 or call if you need help choosing an initial versus follow-up slot.",
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
    slug: "charlton",
    name: "Charlton",
    shortName: "Charlton",
    summary:
      "Serving Charlton locals who want clear osteopathy for back, neck, and sports niggles without a central-London trek.",
    heroLine:
      "Straightforward osteopathy for Charlton — assessment, hands-on care, and a plan you can follow.",
    travelNote:
      "Buses toward Woolwich town centre; parking nearby if you drive — allow a few minutes on busy days.",
    detail:
      "Charlton locals dealing with gym strain, pitch-side knocks, or desk-related neck pain can reach Nguyen's Osteopathic Clinic via buses into Woolwich town centre, with nearby parking if you drive. We assess the region that hurts and the kinetic chain that loads it — hips for knee pain, thoracic mobility for shoulder irritation — then match hands-on care and home drills to how irritable tissues are today. Sports injury rehab and shockwave sit alongside standard osteopathy when clinically useful. Fees and cancellation policy are published up front. Online booking opens from 5 November 2026; closed Wednesday and Sunday for regular bookable days.",
    whyVisit: [
      "Bus links toward Woolwich town centre",
      "Back, neck, and sports injury focus",
      "Transparent fees listed online",
      "Find-us guide for parking and arrival",
    ],
    relatedBlogSlug: "osteopath-greenwich-charlton-thamesmead",
    keywords: ["osteopath Charlton", "osteopath near Charlton", "SE7 osteopath"],
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
      "Bus routes into Woolwich; ask at St James Pharmacy for the osteopathy room on arrival.",
    detail:
      "Thamesmead patients with work strain, sports injuries, or persistent joint pain can reach Powis Street by bus into Woolwich and ask at St James Pharmacy for the osteopathy room. Care is drug-free and explanation-led: we screen for problems that need medical input first, then treat mechanical drivers with osteopathy and practical load advice. Standing occupations, warehouse lifting, and weekend sport are common stories we hear. NHS and student discounts apply with valid ID. Use Find us for arrival tips, and book online when clinics open from 5 November 2026.",
    whyVisit: [
      "Bus routes into Woolwich from Thamesmead",
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
