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
  { path: "/areas/woolwich", label: "Woolwich area", priority: "P1" },
  { path: "/areas/plumstead", label: "Plumstead area", priority: "P1" },
  { path: "/areas/abbey-wood", label: "Abbey Wood area", priority: "P1" },
  { path: "/vi", label: "Vietnamese hub", priority: "P1" },
  { path: "/conditions/sciatica", label: "Sciatica", priority: "P2" },
  { path: "/conditions/neck-pain", label: "Neck pain", priority: "P2" },
] as const;

/** Queries to watch monthly in Google Search Console. */
export const trackedQueries = [
  "osteopath woolwich",
  "osteopath se18",
  "osteopath plumstead",
  "osteopath abbey wood",
  "shockwave woolwich",
  "vietnamese osteopath",
  "osteopath home visit woolwich",
  "mens health shockwave woolwich",
] as const;

export type BookCampaign =
  | "home"
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
  | "vi"
  | "faq"
  | "aftercare";

/** Booking URL with UTM so Treow/analytics can attribute organic SEO. */
export function bookHref(campaign: BookCampaign): string {
  const params = new URLSearchParams({
    utm_source: "website",
    utm_medium: "seo",
    utm_campaign: campaign,
  });
  return `/book?${params.toString()}`;
}

/** Prefilled WhatsApp message patients can use — or clinic can forward. */
export function reviewAskWhatsAppHref(): string {
  const text = [
    `Hi — if your visit to ${site.name} helped, a short Google review means a lot to neighbours in Woolwich looking for an osteopath:`,
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
        href: "/blog/back-pain-woolwich-osteopathy",
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
        href: "/blog/focused-shockwave-therapy-woolwich",
        label: "Shockwave guide",
      },
      {
        href: "/blog/mens-health-shockwave-woolwich",
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
      { href: "/areas/woolwich", label: "Woolwich" },
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
  "Optional: short GBP walk-in video from Powis Street pharmacy entrance",
] as const;

/** Four weekly GBP post drafts — rotate; always include a booking CTA. */
export const gbpWeeklyPostDrafts = [
  {
    theme: "Book online",
    body: `Looking for an osteopath in Woolwich SE18? Book online with Austin Duy Nguyen (GOsC) inside St James Pharmacy, 52 Powis Street — no GP referral needed.\n\nBook: ${site.websiteUrl}/book`,
  },
  {
    theme: "Home visits",
    body: `Home-visit osteopathy near Woolwich when clinic travel is hard. Initial visit £120 (60 min); follow-up £100 (30 min). Message us to confirm your address.\n\nDetails: ${site.websiteUrl}/services/home-visits`,
  },
  {
    theme: "Vietnamese care",
    body: `Cần osteopath nói tiếng Việt tại Woolwich? Austin Duy Nguyen khám bằng tiếng Việt hoặc tiếng Anh — trong St James Pharmacy, Powis Street SE18.\n\nĐặt lịch: ${site.websiteUrl}/vi/book`,
  },
  {
    theme: "Shockwave",
    body: `Stubborn heel, elbow or Achilles pain in Woolwich? Focused shockwave (LI-ESWT) is available after clinical screening — £90 per session.\n\nLearn more: ${site.websiteUrl}/services/focused-shockwave`,
  },
] as const;

/** GBP Q&A seeds — also used as FAQPage on /reviews and /find-us. */
export const localPackFaqs = [
  {
    question: "Do I need a GP referral to see an osteopath in Woolwich?",
    answer:
      "No. You can book Nguyen's Osteopathic Clinic directly online or by phone — a GP referral is not required.",
  },
  {
    question: "Where is the clinic inside St James Pharmacy?",
    answer:
      "We are inside St James Pharmacy & Travel Clinic at 52 Powis Street, Woolwich SE18 6LQ. Ask at the pharmacy counter on arrival and staff will direct you to the osteopathy room.",
  },
  {
    question: "What days can I book osteopathy?",
    answer:
      "Bookable osteopathy days are Monday, Tuesday, Thursday, Friday and Saturday. We are closed Wednesday and Sunday. Live slots are shown on the booking page.",
  },
  {
    question: "Is parking available near Powis Street?",
    answer:
      "Short-stay Woolwich town-centre car parks and nearby on-street bays serve the clinic. Allow a few extra minutes on busy days. Woolwich Arsenal station is a short walk.",
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
    answer: `After your visit, open our Google reviews link and share honest feedback — it helps Woolwich neighbours choose care: ${site.googleReviewsUrl}`,
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
