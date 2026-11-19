import { sitemapIndexResponse } from "@/lib/sitemap-entries";

/** Explicit index — OpenNext does not emit Next's generateSitemaps index. */
export function GET() {
  return sitemapIndexResponse();
}
