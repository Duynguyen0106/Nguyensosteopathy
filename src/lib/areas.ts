export type ServiceArea = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  heroLine: string;
  travelNote: string;
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
    whyVisit: [
      "Bus links toward Woolwich town centre",
      "Back, neck, and sports injury focus",
      "Opening offer and transparent fees listed online",
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
