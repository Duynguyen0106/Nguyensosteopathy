import { notFound } from "next/navigation";
import {
  buildAcupunctureSitemap,
  buildCoreSitemap,
  buildEducationSitemap,
  sitemapUrlsetResponse,
} from "@/lib/sitemap-entries";

type Props = { params: Promise<{ id: string }> };

/** Serves /sitemap/0.xml, /sitemap/1.xml, /sitemap/2.xml */
export async function GET(_request: Request, { params }: Props) {
  const { id: raw } = await params;
  const id = raw.replace(/\.xml$/, "");

  if (id === "0") return sitemapUrlsetResponse(buildCoreSitemap());
  if (id === "1") return sitemapUrlsetResponse(buildEducationSitemap());
  if (id === "2") return sitemapUrlsetResponse(buildAcupunctureSitemap());
  notFound();
}
