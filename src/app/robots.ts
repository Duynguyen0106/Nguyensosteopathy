import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const marketingDisallow = [
  "/leaflet",
  "/leaflet/",
  "/poster",
  "/poster/",
  "/facebook",
  "/facebook/",
  "/business-card",
  "/business-card/",
  "/voucher",
  "/voucher/",
];

/** AI / training scrapers — polite agents honour this; middleware enforces it. */
const aiScrapers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Bytespider",
  "PetalBot",
  "Diffbot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: marketingDisallow,
      },
      ...aiScrapers.map((userAgent) => ({
        userAgent,
        disallow: ["/"] as string[],
      })),
    ],
    // Explicit /sitemap.xml index (route handler) → /sitemap/0|1|2.xml.
    sitemap: `${site.websiteUrl}/sitemap.xml`,
    host: site.websiteUrl,
  };
}
