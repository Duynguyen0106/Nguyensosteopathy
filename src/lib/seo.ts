import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Default social share card (1200×630). */
export const defaultOgImage = {
  url: "/images/og-default.webp",
  width: 1200,
  height: 630,
  alt: "Austin Duy Nguyen, GOsC osteopath at Nguyen's Osteopathic Clinic in Woolwich",
} as const;

/**
 * Document titles use the root template `%s | ${site.name}`.
 * Pass only the unique segment — strip an existing `| …` brand tail so the
 * clinic name is not doubled in SERPs.
 */
export function segmentTitle(title: string): string {
  const pipe = title.indexOf("|");
  if (pipe === -1) return title.trim();
  return title.slice(0, pipe).trim();
}

const fullBrandTail = ` | ${site.name}`;
/** Shorter absolute brand when the full clinic name would crush the segment. */
const compactBrandTail = " | Nguyen's";

function clipAtWord(text: string, budget: number): string {
  if (text.length <= budget) return text;
  const cut = text.slice(0, budget);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > 12 ? cut.slice(0, lastSpace) : cut).trim();
  return base.replace(/[,:;.–/-]+$/, "");
}

export type FittedSerpTitle = NonNullable<Metadata["title"]>;

/**
 * Fit a title for the root `%s | ${site.name}` template when the segment is
 * short enough. For longer clinical/blog titles, return an absolute title with
 * a compact brand so the primary keywords stay readable (~60 chars total).
 */
export function fitSerpTitle(title: string, maxTotal = 60): FittedSerpTitle {
  const cleaned = segmentTitle(title);
  if (cleaned.length + fullBrandTail.length <= maxTotal) return cleaned;
  const budget = Math.max(24, maxTotal - compactBrandTail.length);
  return { absolute: `${clipAtWord(cleaned, budget)}${compactBrandTail}` };
}

/** Absolute string for Open Graph / JSON-LD from a fitSerpTitle result. */
export function absoluteSerpTitle(fitted: FittedSerpTitle): string {
  if (typeof fitted === "string") return `${fitted}${fullBrandTail}`;
  if (fitted && typeof fitted === "object" && "absolute" in fitted) {
    return String(fitted.absolute || "");
  }
  return site.name;
}

/** Keep meta descriptions near typical SERP length. */
export function trimDescription(text: string, max = 158): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > 90 ? cut.slice(0, lastSpace) : cut).trim();
  return `${base.replace(/[,:;.–-]+$/, "")}…`;
}

/** Pad short blurbs toward ~150–158 chars for richer SERP snippets. */
export function enrichDescription(
  text: string,
  suffix: string,
  max = 158,
): string {
  const base = text.replace(/\s+/g, " ").trim();
  if (base.length >= 140) return trimDescription(base, max);
  const joined = `${base.replace(/[.!?]$/, "")}. ${suffix}`.replace(
    /\s+/g,
    " ",
  );
  return trimDescription(joined, max);
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList JSON-LD for deep pages. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path.startsWith("http")
        ? crumb.path
        : `${site.websiteUrl}${crumb.path.startsWith("/") ? crumb.path : `/${crumb.path}`}`,
    })),
  };
}

/** Shared Open Graph fields for a route. */
export function pageOpenGraph({
  title,
  description,
  url,
  images,
  locale = "en_GB",
}: {
  title: string;
  description: string;
  url: string;
  images?: Metadata["openGraph"] extends infer O
    ? O extends { images?: infer I }
      ? I
      : never
    : never;
  locale?: "en_GB" | "vi_VN";
}): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url,
    siteName: site.name,
    locale,
    type: "website",
    images: images ?? [defaultOgImage],
  };
}

/** FAQPage JSON-LD from question/answer pairs. */
export function faqPageJsonLd(
  items: readonly { question: string; answer: string }[],
  inLanguage?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(inLanguage ? { inLanguage } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
