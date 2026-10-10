export type ServiceArea = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  travelNote: string;
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
    travelNote:
      "Short walk from Woolwich Arsenal (Elizabeth line, DLR, National Rail) and local buses along Powis Street.",
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
    travelNote:
      "Bus links into Woolwich town centre; easy drop-off on Powis Street before asking at the pharmacy counter.",
    relatedBlogSlug: "osteopath-plumstead-abbey-wood-se18",
    keywords: ["osteopath Plumstead", "osteopath near Plumstead", "SE18 osteopath"],
  },
  {
    slug: "abbey-wood",
    name: "Abbey Wood",
    shortName: "Abbey Wood",
    summary:
      "Practical for Abbey Wood residents via Elizabeth line or bus into Woolwich — same-day local assessment instead of a long hospital wait.",
    travelNote:
      "Elizabeth line to Woolwich, then a short walk or bus to Powis Street and St James Pharmacy.",
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
    travelNote:
      "Bus or DLR/rail into Woolwich Arsenal; clinic is a short walk into Powis Street.",
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
    travelNote:
      "Buses toward Woolwich town centre; parking nearby if you drive — allow a few minutes on busy days.",
    relatedBlogSlug: "osteopath-greenwich-charlton-thamesmead",
    keywords: ["osteopath Charlton", "osteopath near Charlton", "SE7 osteopath"],
  },
  {
    slug: "thamesmead",
    name: "Thamesmead",
    shortName: "Thamesmead",
    summary:
      "A straightforward option for Thamesmead patients needing assessment for work strain, sports injuries, or persistent joint pain.",
    travelNote:
      "Bus routes into Woolwich; ask at St James Pharmacy for the osteopathy room on arrival.",
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
