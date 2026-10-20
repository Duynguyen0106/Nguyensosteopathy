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
      ],
    },
    sitemap: `${site.websiteUrl}/sitemap.xml`,
    host: site.websiteUrl,
  };
}
