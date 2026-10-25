import type { MetadataRoute } from "next";
import { serviceAreas } from "@/lib/areas";
import { getAllPosts } from "@/lib/blog";
import { conditions } from "@/lib/conditions";
import { exercises, programmes } from "@/lib/exercises";
import { educationArticles, educationTracks } from "@/lib/education";
import {
  getSitemapLibraryTopicKeys,
  libraryArticles,
} from "@/lib/education-library";
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
    { path: "/vi/book", changeFrequency: "weekly", priority: 0.9 },
    { path: "/vi/about", priority: 0.85 },
    { path: "/vi/services/back-neck-pain", priority: 0.85 },
    { path: "/vi/services/home-visits", priority: 0.8 },
    { path: "/vi/fees", priority: 0.85 },
    { path: "/vi/find-us", priority: 0.85 },
    { path: "/fees", priority: 0.9 },
    { path: "/contact", priority: 0.85 },
    { path: "/reviews", priority: 0.85 },
    { path: "/faq", priority: 0.8 },
    { path: "/new-patients", priority: 0.8 },
    { path: "/resources", priority: 0.8 },
    { path: "/aftercare", priority: 0.75 },
    { path: "/exercises", priority: 0.85 },
    { path: "/education", priority: 0.8 },
    { path: "/education/library", priority: 0.75 },
    { path: "/complaints", changeFrequency: "yearly", priority: 0.35 },
    { path: "/conditions", priority: 0.85 },
    { path: "/areas", priority: 0.85 },
    { path: "/find-us", priority: 0.9 },
    { path: "/nhs-discount", priority: 0.75 },
    { path: "/osteopathy", priority: 0.9 },
    { path: "/desk-pain", priority: 0.85 },
    { path: "/accessibility", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cupping", priority: 0.7 },
    { path: "/site-map", priority: 0.4 },
    // Print utilities (/leaflet, /poster) are noindex — omit from sitemap.
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
    { path: "/insurance", priority: 0.7 },
    // RSS is linked via <link rel="alternate"> — not a page URL for sitemap.
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
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
    ...educationTracks
      .filter((track) => track.id !== "library")
      .map((track) =>
        entry({
          path: `/education/${track.slug}`,
          priority: 0.7,
        }),
      ),
    entry({
      path: "/education/acupuncture/reference",
      priority: 0.55,
    }),
    ...(["points", "herbs", "formulas", "conditions"] as const).map((type) =>
      entry({
        path: `/education/acupuncture/reference/${type}`,
        priority: 0.5,
      }),
    ),
    ...getSitemapLibraryTopicKeys().map((topic) =>
      entry({
        path: `/education/library/topic/${topic}`,
        priority: 0.6,
      }),
    ),
    ...libraryArticles.map((article) =>
      entry({
        path: `/education/library/${article.slug}`,
        priority: 0.55,
      }),
    ),
    ...educationArticles
      .filter((article) => article.status === "published")
      .map((article) =>
        entry({
          path: `/education/${article.track}/${article.slug}`,
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
