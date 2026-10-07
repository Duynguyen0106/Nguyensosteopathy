import type { MetadataRoute } from "next";
import { services } from "@/lib/site";

const base = "https://www.nguyensosteopathy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/book`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/leaflet/nguyens-osteopathy-leaflet.pdf`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${base}/poster/nguyens-osteopathy-poster-a3.pdf`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${base}/business-card/nguyens-osteopathy-business-card.pdf`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.2,
    },
  ];
}
