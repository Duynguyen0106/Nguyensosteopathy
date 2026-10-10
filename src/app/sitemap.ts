import type { MetadataRoute } from "next";
import { serviceAreas } from "@/lib/areas";
import { getAllPosts } from "@/lib/blog";
import { conditions } from "@/lib/conditions";
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
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/blog`,
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
    {
      url: `${base}/opening`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/vi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/fees`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/reviews`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/new-patients`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/conditions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/shockwave`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/find-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/mens-health`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/pregnancy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/sports`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/paediatric`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/cranial`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/acupuncture`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/massage`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/nhs-discount`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/back-neck`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/headaches`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/accessibility`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/cupping`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/site-map`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/leaflet`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/insurance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/feed.xml`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...serviceAreas.map((area) => ({
      url: `${base}/areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...conditions.map((condition) => ({
      url: `${base}/conditions/${condition.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getAllPosts().map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.75,
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
    {
      url: `${base}/facebook/opening-day-50-off-facebook.png`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];
}
