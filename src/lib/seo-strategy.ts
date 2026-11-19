import { site } from "@/lib/site";

/**
 * SEO strategy helpers — money pages, UTM booking links, review asks,
 * and topic clusters for internal linking.
 */

/** Priority URLs for GSC inspection / indexing requests. */
export const moneyPages = [
  { path: "/", label: "Homepage", priority: "P0" },
  { path: "/book", label: "Book", priority: "P0" },
  { path: "/find-us", label: "Find us", priority: "P0" },
  { path: "/fees", label: "Fees", priority: "P0" },
  { path: "/services/back-neck-pain", label: "Back & neck", priority: "P0" },
  {
    path: "/services/focused-shockwave",
    label: "Focused shockwave",
    priority: "P0",
  },
  {
    path: "/services/mens-health-ed",
    label: "Men's health & ED",
    priority: "P0",
  },
  { path: "/services/home-visits", label: "Home visits", priority: "P1" },
  { path: "/about", label: "About Austin", priority: "P1" },
  { path: "/reviews", label: "Reviews", priority: "P1" },
  { path: "/areas/charlton", label: "Charlton area", priority: "P1" },
  { path: "/areas/plumstead", label: "Plumstead area", priority: "P1" },
  { path: "/areas/abbey-wood", label: "Abbey Wood area", priority: "P1" },
  { path: "/vi", label: "Vietnamese hub", priority: "P1" },
  { path: "/conditions/sciatica", label: "Sciatica", priority: "P2" },
  { path: "/conditions/neck-pain", label: "Neck pain", priority: "P2" },
] as const;

/** Queries to watch monthly in Google Search Console. */
export const trackedQueries = [
  "osteopath charlton",
  "osteopath se18",
  "osteopath plumstead",
  "osteopath abbey wood",
  "shockwave charlton",
  "vietnamese osteopath",
  "osteopath home visit charlton",
  "mens health shockwave charlton",
] as const;

export type BookCampaign =
  | "home"
  | "header"
  | "mobile-bar"
  | "footer"
  | "services"
  | "back-neck"
  | "shockwave"
  | "mens-health"
  | "home-visits"
  | "find-us"
  | "fees"
  | "reviews"
  | "about"
  | "areas"
  | "conditions"
  | "blog"
  | "author-bio"
  | "contact"
  | "education"
  | "exercises"
  | "insurance"
  | "resources"
  | "nhs"
  | "vi"
  | "faq"
  | "aftercare"
  | "osteopathy"
  | "new-patients";

/** UTM query string used on /book and forwarded into the Treow embed. */
export function bookUtmParams(campaign: BookCampaign): URLSearchParams {
  return new URLSearchParams({
    utm_source: "website",
    utm_medium: "seo",
    utm_campaign: campaign,
  });
}

/** Booking URL with UTM so Treow/analytics can attribute organic SEO. */
export function bookHref(campaign: BookCampaign): string {
  return `/book?${bookUtmParams(campaign).toString()}`;
}

/** Vietnamese booking URL with the same attribution pattern. */
export function viBookHref(campaign: BookCampaign = "vi"): string {
  return `/vi/book?${bookUtmParams(campaign).toString()}`;
}

const BOOKING_UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/**
 * Copy UTM (+ optional gclid/fbclid) from the /book page query onto a Treow
 * embed or external booking URL so attribution survives the iframe.
 */
export function withBookingAttribution(
  baseUrl: string,
  incoming: URLSearchParams | Record<string, string | string[] | undefined>,
): string {
  const params =
    incoming instanceof URLSearchParams
      ? incoming
      : new URLSearchParams(
          Object.entries(incoming).flatMap(([key, value]) => {
            if (value === undefined) return [];
            if (Array.isArray(value)) {
              return value.map((entry) => [key, entry] as [string, string]);
            }
            return [[key, value] as [string, string]];
          }),
        );

  try {
    const url = new URL(baseUrl);
    for (const key of BOOKING_UTM_KEYS) {
      const value = params.get(key);
      if (value) url.searchParams.set(key, value);
    }
    for (const key of ["gclid", "fbclid", "msclkid"] as const) {
      const value = params.get(key);
      if (value) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/** Prefilled WhatsApp message patients can use — or clinic can forward. */
export function reviewAskWhatsAppHref(): string {
  const text = [
    `Hi — if your visit to ${site.name} helped, a short Google review means a lot to neighbours in Charlton looking for an osteopath:`,
    site.googleReviewsUrl,
  ].join("\n");
  return `${site.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export type ClusterLink = { href: string; label: string };

export type TopicCluster = {
  id: "spine" | "specialty" | "access" | "vietnamese";
  title: string;
  hubHref: string;
  hubLabel: string;
  links: ClusterLink[];
};

export const topicClusters: TopicCluster[] = [
  {
    id: "spine",
    title: "Spine care",
    hubHref: "/services/back-neck-pain",
    hubLabel: "Back & neck pain treatment",
    links: [
      { href: "/conditions/sciatica", label: "Sciatica" },
      { href: "/conditions/neck-pain", label: "Neck pain" },
      {
        href: "/conditions/non-specific-low-back-pain",
        label: "Low back pain",
      },
      { href: "/conditions/lumbar-disc-radiculopathy", label: "Disc-related pain" },
      { href: "/desk-pain", label: "Desk & office pain" },
      { href: "/exercises", label: "Home exercises" },
      {
        href: "/blog/back-pain-charlton-osteopathy",
        label: "Back pain guide",
      },
    ],
  },
  {
    id: "specialty",
    title: "Specialist pathways",
    hubHref: "/services/focused-shockwave",
    hubLabel: "Focused shockwave",
    links: [
      { href: "/services/mens-health-ed", label: "Men's health & ED" },
      { href: "/services/sports-injury-rehab", label: "Sports injury rehab" },
      { href: "/fees", label: "Fees" },
      {
        href: "/blog/focused-shockwave-therapy-charlton",
        label: "Shockwave guide",
      },
      {
        href: "/blog/mens-health-shockwave-charlton",
        label: "Men's health guide",
      },
    ],
  },
  {
    id: "access",
    title: "Visit & local access",
    hubHref: "/find-us",
    hubLabel: "Find us & parking",
    links: [
      { href: "/areas/charlton", label: "Charlton" },
      { href: "/areas/plumstead", label: "Plumstead" },
      { href: "/areas/abbey-wood", label: "Abbey Wood" },
      { href: "/areas/greenwich", label: "Greenwich" },
      { href: "/services/home-visits", label: "Home visits" },
      { href: "/book", label: "Book online" },
    ],
  },
  {
    id: "vietnamese",
    title: "Tiếng Việt",
    hubHref: "/vi",
    hubLabel: "Trang tiếng Việt",
    links: [
      { href: "/vi/book", label: "Đặt lịch" },
      { href: "/vi/about", label: "Về Austin" },
      { href: "/vi/services/back-neck-pain", label: "Đau lưng & cổ" },
      { href: "/vi/services/home-visits", label: "Khám tại nhà" },
      { href: "/vi/fees", label: "Bảng giá" },
      { href: "/vi/find-us", label: "Địa chỉ" },
    ],
  },
];

export function getCluster(id: TopicCluster["id"]): TopicCluster {
  const cluster = topicClusters.find((item) => item.id === id);
  if (!cluster) throw new Error(`Unknown topic cluster: ${id}`);
  return cluster;
}

/** Map service slug → booking UTM campaign. */
export function serviceBookCampaign(slug: string): BookCampaign {
  switch (slug) {
    case "back-neck-pain":
      return "back-neck";
    case "focused-shockwave":
      return "shockwave";
    case "mens-health-ed":
      return "mens-health";
    case "home-visits":
      return "home-visits";
    default:
      return "services";
  }
}

/** Topic cluster for a service hub (null = no cluster nav). */
export function serviceClusterId(
  slug: string,
): TopicCluster["id"] | null {
  switch (slug) {
    case "back-neck-pain":
      return "spine";
    case "focused-shockwave":
    case "mens-health-ed":
      return "specialty";
    case "home-visits":
      return "access";
    default:
      return null;
  }
}

/** Spine-cluster condition slugs that should show Cluster A nav. */
export const spineConditionSlugs = new Set([
  "sciatica",
  "neck-pain",
  "lumbar-disc-radiculopathy",
  "non-specific-low-back-pain",
  "lumbar-stenosis",
]);

/** Services with Vietnamese twin pages (hreflang pairs). */
export const viServiceTwins = new Set(["back-neck-pain", "home-visits"]);

/** Monthly measurement checklist — GSC + GBP + bookings (no new SaaS). */
export const monthlyReviewChecklist = [
  "Resubmit sitemap only after major releases",
  "Compare money-page impressions/CTR for tracked queries",
  "Refresh URLs gaining impressions before writing new blogs",
  "GBP: photo cadence, weekly post, Q&A, review replies <48h",
  "Review velocity vs prior month; keep ask process after suitable visits",
  "Treow/analytics: bookings with utm_medium=seo",
  "Citation spot-check: Yell/Apple/Bing hours match site.ts",
  "Do not mass-produce thin condition/blog pages",
  "Only after winners identified: competitor-gap blog topics",
  "Optional: short GBP walk-in video from The Village pharmacy entrance",
] as const;

/** Four weekly GBP post drafts — rotate; always include a booking CTA. */
export const gbpWeeklyPostDrafts = [
  {
    theme: "Book online",
    body: `Looking for an osteopath in Charlton SE7? Book online with Austin Duy Nguyen (GOsC) inside Village Pharmacy, 9 The Village — no GP referral needed.\n\nBook: ${site.websiteUrl}/book`,
  },
  {
    theme: "Home visits",
    body: `Home-visit osteopathy near Charlton when clinic travel is hard. Initial visit £120 (60 min); follow-up £100 (30 min). Message us to confirm your address.\n\nDetails: ${site.websiteUrl}/services/home-visits`,
  },
  {
    theme: "Vietnamese care",
    body: `Cần osteopath nói tiếng Việt tại Charlton? Austin Duy Nguyen khám bằng tiếng Việt hoặc tiếng Anh — trong Village Pharmacy, The Village SE7.\n\nĐặt lịch: ${site.websiteUrl}/vi/book`,
  },
  {
    theme: "Shockwave",
    body: `Stubborn heel, elbow or Achilles pain in Charlton? Focused shockwave (LI-ESWT) is available after clinical screening — £90 per session.\n\nLearn more: ${site.websiteUrl}/services/focused-shockwave`,
  },
] as const;

/** GBP Q&A seeds — also used as FAQPage on /reviews and /find-us. */
export const localPackFaqs = [
  {
    question: "Do I need a GP referral to see an osteopath in Charlton?",
    answer:
      "No. You can book Nguyen's Osteopathic Clinic directly online or by phone — a GP referral is not required.",
  },
  {
    question: "Where is the clinic inside Village Pharmacy?",
    answer:
      "We are inside Village Pharmacy at 9 The Village, Charlton SE7 8UG. Ask at the pharmacy counter on arrival and staff will direct you to the osteopathy room.",
  },
  {
    question: "What days can I book osteopathy?",
    answer:
      "The clinic is open Monday to Sunday, 9:00am – 8:00pm. Live slots are shown on the booking page.",
  },
  {
    question: "Is parking available near The Village, Charlton?",
    answer:
      "On-street and nearby short-stay bays serve The Village in Charlton. Allow a few extra minutes on busy days. Charlton station is a short walk.",
  },
  {
    question: "Can I speak Vietnamese at the clinic?",
    answer:
      "Yes. Austin Duy Nguyen can consult in Vietnamese or English so you can describe symptoms without a language barrier.",
  },
  {
    question: "Do you offer home visits?",
    answer:
      "Yes. Home-visit osteopathy is available locally when travel to the clinic is difficult. Initial visits are £120 for 60 minutes; follow-ups are £100 for 30 minutes. Contact us to confirm your address.",
  },
  {
    question: "Do you offer shockwave therapy?",
    answer:
      "Yes. Focused shockwave (LI-ESWT) is available after clinical screening for suitable tendon problems. Men's health vascular LI-ESWT is a separate confidential pathway.",
  },
  {
    question: "How do I leave a Google review?",
    answer: `After your visit, open our Google reviews link and share honest feedback — it helps Charlton neighbours choose care: ${site.googleReviewsUrl}`,
  },
] as const;

/**
 * Short FAQ set for /book and /fees (Days 61–90) — subset of localPackFaqs
 * so money pages answer conversion questions without duplicating the full pack.
 */
export const moneyPageFaqs = [
  localPackFaqs[0], // GP referral
  localPackFaqs[2], // bookable days
  localPackFaqs[5], // home visits
] as const;
