import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // Print / marketing utilities — keep crawl budget on clinical pages.
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
      ],
    },
    // Explicit /sitemap.xml index (route handler) → /sitemap/0|1|2.xml.
    sitemap: `${site.websiteUrl}/sitemap.xml`,
    host: site.websiteUrl,
  };
}
