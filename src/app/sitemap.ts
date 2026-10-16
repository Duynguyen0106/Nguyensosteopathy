import type { MetadataRoute } from "next";
import { serviceAreas } from "@/lib/areas";
import { getAllPosts } from "@/lib/blog";
import { conditions } from "@/lib/conditions";
import { exercises, programmes } from "@/lib/exercises";
import { services, site } from "@/lib/site";

const base = site.websiteUrl;

/** Parse YYYY-MM-DD (or full ISO) into a stable UTC Date for sitemap lastmod. */
function toLastmod(iso: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return new Date(`${iso}T00:00:00.000Z`);
  }
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) {
    return toLastmod(site.sitemapDefaultLastmod);
  }
  return parsed;
}

const catalogLastmod = toLastmod(site.sitemapDefaultLastmod);

type Entry = {
  path: string;
  lastModified?: Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

function entry({
  path,
  lastModified = catalogLastmod,
  changeFrequency = "monthly",
  priority = 0.7,
}: Entry): MetadataRoute.Sitemap[number] {
  return {
    url: path.startsWith("http") ? path : `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

/**
 * Cached by default in Next.js unless request-time APIs are used.
 * Keep lastModified values deterministic (no `new Date()` at request time).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostLastmod = posts.reduce((latest, post) => {
    const stamp = toLastmod(post.updated ?? post.date);
    return stamp > latest ? stamp : latest;
  }, toLastmod("1970-01-01"));

  const staticPages: Entry[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    {
      path: "/blog",
      lastModified: latestPostLastmod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { path: "/book", changeFrequency: "weekly", priority: 0.95 },
    { path: "/vi", priority: 0.9 },
    { path: "/fees", priority: 0.85 },
    { path: "/contact", priority: 0.85 },
    { path: "/reviews", priority: 0.75 },
    { path: "/faq", priority: 0.8 },
    { path: "/new-patients", priority: 0.8 },
    { path: "/resources", priority: 0.8 },
    { path: "/aftercare", priority: 0.75 },
    { path: "/exercises", priority: 0.85 },
    { path: "/complaints", changeFrequency: "yearly", priority: 0.35 },
    { path: "/conditions", priority: 0.85 },
    { path: "/areas", priority: 0.85 },
    { path: "/find-us", priority: 0.8 },
    { path: "/nhs-discount", priority: 0.75 },
    { path: "/osteopathy", priority: 0.9 },
    { path: "/desk-pain", priority: 0.85 },
    { path: "/accessibility", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cupping", priority: 0.7 },
    { path: "/site-map", priority: 0.4 },
    { path: "/leaflet", priority: 0.5 },
    { path: "/poster", priority: 0.5 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
    { path: "/insurance", priority: 0.7 },
    { path: "/feed.xml", changeFrequency: "weekly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    {
      path: "/leaflet/nguyens-osteopathy-leaflet.pdf",
      priority: 0.4,
    },
    {
      path: "/poster/nguyens-osteopathy-poster-a1.pdf",
      priority: 0.3,
    },
    {
      path: "/poster/nguyens-osteopathy-poster-a2.pdf",
      priority: 0.3,
    },
    {
      path: "/poster/nguyens-osteopathy-poster-a3.pdf",
      priority: 0.3,
    },
    {
      path: "/business-card/nguyens-osteopathy-business-card.pdf",
      priority: 0.2,
    },
  ];

  return [
    ...staticPages.map(entry),
    ...programmes.map((programme) =>
      entry({
        path: `/exercises/programmes/${programme.slug}`,
        priority: 0.7,
      }),
    ),
    ...exercises.map((exercise) =>
      entry({
        path: `/exercises/${exercise.slug}`,
        priority: 0.65,
      }),
    ),
    ...serviceAreas.map((area) =>
      entry({
        path: `/areas/${area.slug}`,
        priority: 0.8,
      }),
    ),
    ...services.map((service) =>
      entry({
        path: `/services/${service.slug}`,
        priority: 0.8,
      }),
    ),
    ...conditions.map((condition) =>
      entry({
        path: `/conditions/${condition.slug}`,
        priority: 0.8,
      }),
    ),
    // Per-post lastmod from content dates (updated, else publish date).
    ...posts.map((post) =>
      entry({
        path: `/blog/${post.slug}`,
        lastModified: toLastmod(post.updated ?? post.date),
        priority: 0.75,
      }),
    ),
  ];
}
