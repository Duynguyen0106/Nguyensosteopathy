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

/** Keep meta descriptions near typical SERP length. */
export function trimDescription(text: string, max = 158): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > 90 ? cut.slice(0, lastSpace) : cut).trim();
  return `${base.replace(/[,:;.–-]+$/, "")}…`;
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
}: {
  title: string;
  description: string;
  url: string;
  images?: Metadata["openGraph"] extends infer O
    ? O extends { images?: infer I }
      ? I
      : never
    : never;
}): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
    images: images ?? [defaultOgImage],
  };
}
