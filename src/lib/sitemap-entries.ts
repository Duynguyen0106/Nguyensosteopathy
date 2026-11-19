import type { MetadataRoute } from "next";
import { serviceAreas } from "@/lib/areas";
import { getAllPosts } from "@/lib/blog";
import { conditions } from "@/lib/conditions";
import { exercises, programmes } from "@/lib/exercises";
import { educationArticles, educationTracks } from "@/lib/education";
import { getSitemapAcupunctureCorpusPaths } from "@/lib/acupuncture-corpus";
import {
  getSitemapLibraryArticleSlugs,
  getSitemapLibraryTopicKeys,
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

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toUrlsetXml(entries: MetadataRoute.Sitemap): string {
  const body = entries
    .map((item) => {
      const lastmod =
        item.lastModified instanceof Date
          ? item.lastModified.toISOString()
          : item.lastModified
            ? new Date(item.lastModified).toISOString()
            : undefined;
      const parts = [
        "<url>",
        `<loc>${escapeXml(item.url)}</loc>`,
      ];
      if (lastmod) parts.push(`<lastmod>${lastmod}</lastmod>`);
      if (item.changeFrequency) {
        parts.push(`<changefreq>${item.changeFrequency}</changefreq>`);
      }
      if (typeof item.priority === "number") {
        parts.push(`<priority>${item.priority.toFixed(1)}</priority>`);
      }
      parts.push("</url>");
      return parts.join("");
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>\n`;
}

/**
 * Split crawl weight so Google can prioritise money pages separately from the
 * large education / acupuncture corpora.
 * Served as /sitemap/0.xml (core), /sitemap/1.xml (education), /sitemap/2.xml
 * (acupuncture) under a /sitemap.xml index.
 */
export function buildCoreSitemap(): MetadataRoute.Sitemap {
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
    { path: "/resources", priority: 0.75 },
    { path: "/aftercare", priority: 0.75 },
    { path: "/exercises", priority: 0.85 },
    { path: "/education", priority: 0.7 },
    { path: "/education/library", priority: 0.55 },
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
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
    { path: "/insurance", priority: 0.7 },
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
    ...posts.map((post) =>
      entry({
        path: `/blog/${post.slug}`,
        lastModified: toLastmod(post.updated ?? post.date),
        priority: 0.75,
      }),
    ),
  ];
}

export function buildEducationSitemap(): MetadataRoute.Sitemap {
  return [
    ...educationTracks
      .filter((track) => track.id !== "library")
      .map((track) =>
        entry({
          path: `/education/${track.slug}`,
          priority: 0.55,
          changeFrequency: "monthly",
        }),
      ),
    ...getSitemapLibraryTopicKeys().map((topic) =>
      entry({
        path: `/education/library/topic/${topic}`,
        priority: 0.45,
        changeFrequency: "monthly",
      }),
    ),
    ...getSitemapLibraryArticleSlugs().map((slug) =>
      entry({
        path: `/education/library/${slug}`,
        priority: 0.4,
        changeFrequency: "yearly",
      }),
    ),
    ...educationArticles
      .filter((article) => article.status === "published")
      .map((article) =>
        entry({
          path: `/education/${article.track}/${article.slug}`,
          priority: 0.5,
          changeFrequency: "monthly",
        }),
      ),
  ];
}

export function buildAcupunctureSitemap(): MetadataRoute.Sitemap {
  return [
    entry({
      path: "/education/acupuncture/reference",
      priority: 0.4,
      changeFrequency: "yearly",
    }),
    ...(["points", "herbs", "formulas", "conditions"] as const).map((type) =>
      entry({
        path: `/education/acupuncture/reference/${type}`,
        priority: 0.35,
        changeFrequency: "yearly",
      }),
    ),
    // Detail pages — keep in a dedicated sitemap so core money pages stay lean.
    ...getSitemapAcupunctureCorpusPaths().map(({ type, slug }) =>
      entry({
        path: `/education/acupuncture/reference/${type}/${slug}`,
        priority: 0.3,
        changeFrequency: "yearly",
      }),
    ),
  ];
}

export function sitemapUrlsetResponse(
  entries: MetadataRoute.Sitemap,
): Response {
  return new Response(toUrlsetXml(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export function sitemapIndexResponse(): Response {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${escapeXml(`${base}/sitemap/0.xml`)}</loc></sitemap>
  <sitemap><loc>${escapeXml(`${base}/sitemap/1.xml`)}</loc></sitemap>
  <sitemap><loc>${escapeXml(`${base}/sitemap/2.xml`)}</loc></sitemap>
</sitemapindex>
`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
