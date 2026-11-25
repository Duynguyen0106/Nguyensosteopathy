/**
 * Acupuncture education corpus (American Dragon ingest, owner-permitted).
 *
 * Listing metadata comes from the imported catalog (safe on Workers).
 * Full record bodies live in by-type JSON and are read from disk at
 * **build time** only — detail routes must be `force-static` so Cloudflare
 * Workers serve prerendered HTML (workerd has no `src/data` filesystem).
 */

import fs from "fs";
import path from "path";
import catalogData from "@/data/acupuncture-corpus/catalog.json";
import corpusIndex from "@/data/acupuncture-corpus/index.json";
import audit from "@/data/american-dragon/audit.json";

export type AcupunctureCorpusType =
  | "points"
  | "herbs"
  | "formulas"
  | "conditions";

export type AcupunctureCorpusCategory = {
  id: AcupunctureCorpusType;
  label: string;
  description: string;
};

export type AcupunctureCorpusEntry = {
  type: AcupunctureCorpusType | string;
  slug: string;
  title?: string;
  label?: string;
  sourceUrl: string;
  summary?: string;
  status?: string;
  publishable?: boolean;
  sectionKeys?: string[];
  quality?: string | null;
  channel?: string | null;
  pinyin?: string | null;
  latin?: string | null;
  pointCode?: string | null;
  category?: string | null;
  wordCount?: number | null;
  searchText?: string;
};

/** Slim entry for directory UI — omits heavy searchText / summary blobs. */
export type AcupunctureCorpusBrowseEntry = Pick<
  AcupunctureCorpusEntry,
  | "type"
  | "slug"
  | "title"
  | "label"
  | "sourceUrl"
  | "channel"
  | "pinyin"
  | "latin"
  | "pointCode"
  | "category"
  | "quality"
>;

export type AcupunctureCorpusRecord = {
  id: string;
  type: AcupunctureCorpusType | string;
  slug: string;
  title: string;
  rawTitle?: string;
  displayTitle?: string;
  sourceUrl: string;
  gatheredAt?: string;
  publishable?: boolean;
  sections: Record<string, string>;
  aliases?: string[];
  channel?: string | null;
  pinyin?: string | null;
  latin?: string | null;
  pointCode?: string | null;
  category?: string | null;
  searchText?: string;
  wordCount?: number;
  sectionCount?: number;
  quality?: "full" | "partial" | "thin" | string;
  attribution?: {
    sourceName: string;
    sourceUrl: string;
    author: string;
    licenseNote: string;
  };
};

export type AcupunctureCorpusIndex = {
  generatedAt: string;
  source: string;
  attribution: {
    sourceName: string;
    sourceUrl: string;
    author: string;
    licenseNote: string;
  };
  categories: AcupunctureCorpusCategory[];
  counts: Record<string, number>;
  inventoryTotal?: number;
  totalsApprox: Record<string, number>;
  entries: AcupunctureCorpusEntry[];
  pipeline: Record<string, string>;
  publishingRules: string[];
};

export const acupunctureCorpus = corpusIndex as AcupunctureCorpusIndex;
export const americanDragonAudit = audit;

export const acupunctureCorpusTypes: AcupunctureCorpusType[] = [
  "points",
  "herbs",
  "formulas",
  "conditions",
];

/** Above this, type hubs use letter links instead of shipping every row to the client. */
export const CORPUS_CLIENT_DIRECTORY_MAX = 900;

const typeCache = new Map<string, AcupunctureCorpusRecord[]>();
const slugIndexCache = new Map<string, Map<string, AcupunctureCorpusRecord>>();

function typeFile(type: AcupunctureCorpusType) {
  return path.join(
    process.cwd(),
    "src/data/acupuncture-corpus/by-type",
    `${type}.json`,
  );
}

function canReadCorpusFromDisk(): boolean {
  // Workerd / Edge have no Node filesystem for src/data.
  if (typeof (globalThis as { EdgeRuntime?: string }).EdgeRuntime === "string") {
    return false;
  }
  try {
    return typeof fs.existsSync === "function" && typeof fs.readFileSync === "function";
  } catch {
    return false;
  }
}

function loadTypeRecords(type: AcupunctureCorpusType): AcupunctureCorpusRecord[] {
  if (typeCache.has(type)) return typeCache.get(type)!;

  if (!canReadCorpusFromDisk()) {
    typeCache.set(type, []);
    return [];
  }

  const file = typeFile(type);
  try {
    if (!fs.existsSync(file)) {
      typeCache.set(type, []);
      return [];
    }
    const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as {
      records?: AcupunctureCorpusRecord[];
    };
    const records = parsed.records ?? [];
    typeCache.set(type, records);
    return records;
  } catch {
    typeCache.set(type, []);
    return [];
  }
}

function slugIndex(type: AcupunctureCorpusType): Map<string, AcupunctureCorpusRecord> {
  if (slugIndexCache.has(type)) return slugIndexCache.get(type)!;
  const map = new Map<string, AcupunctureCorpusRecord>();
  for (const record of loadTypeRecords(type)) {
    map.set(record.slug, record);
  }
  slugIndexCache.set(type, map);
  return map;
}

export function isAcupunctureCorpusType(
  value: string,
): value is AcupunctureCorpusType {
  return (acupunctureCorpusTypes as string[]).includes(value);
}

export function getAcupunctureCorpusCategories(): AcupunctureCorpusCategory[] {
  return acupunctureCorpus.categories;
}

export function getAcupunctureCorpusCounts(): Record<string, number> {
  return acupunctureCorpus.counts;
}

export function getAcupunctureCorpusApproxTotals(): Record<string, number> {
  return acupunctureCorpus.totalsApprox;
}

export function getAcupunctureCorpusEntries(
  type?: AcupunctureCorpusType,
): AcupunctureCorpusEntry[] {
  const entries = (catalogData.entries ||
    acupunctureCorpus.entries ||
    []) as AcupunctureCorpusEntry[];
  if (!type) return entries;
  return entries.filter((entry) => entry.type === type);
}

/** Directory / crawl UI payload — drops multi‑KB searchText fields. */
export function getAcupunctureCorpusBrowseEntries(
  type?: AcupunctureCorpusType,
): AcupunctureCorpusBrowseEntry[] {
  return getAcupunctureCorpusEntries(type).map((entry) => ({
    type: entry.type,
    slug: entry.slug,
    title: entry.title,
    label: entry.label,
    sourceUrl: entry.sourceUrl,
    channel: entry.channel,
    pinyin: entry.pinyin,
    latin: entry.latin,
    pointCode: entry.pointCode,
    category: entry.category,
    quality: entry.quality,
  }));
}

export function getAcupunctureCorpusAttribution() {
  return acupunctureCorpus.attribution;
}

export function getAcupunctureCorpusPipeline() {
  return acupunctureCorpus.pipeline;
}

export function acupunctureCorpusIsDiscovered(): boolean {
  const total =
    acupunctureCorpus.inventoryTotal ??
    Object.values(acupunctureCorpus.counts || {}).reduce(
      (sum, n) => sum + (Number(n) || 0),
      0,
    );
  return total > 0;
}

export function acupunctureCorpusIsPublished(): boolean {
  return (
    acupunctureCorpus.source === "published-corpus" &&
    (acupunctureCorpus.inventoryTotal ?? 0) > 0
  );
}

export function getAcupunctureCorpusRecords(
  type: AcupunctureCorpusType,
): AcupunctureCorpusRecord[] {
  return loadTypeRecords(type);
}

export function getAcupunctureCorpusRecord(
  type: AcupunctureCorpusType,
  slug: string,
): AcupunctureCorpusRecord | undefined {
  return slugIndex(type).get(slug);
}

export function getAllAcupunctureCorpusParams(): {
  type: AcupunctureCorpusType;
  slug: string;
}[] {
  // Prefer catalog so generateStaticParams works even if by-type JSON is absent
  // in a partial checkout; bodies still resolve from by-type at page build time.
  const fromCatalog = getSitemapAcupunctureCorpusPaths();
  if (fromCatalog.length > 0) return fromCatalog;

  const params: { type: AcupunctureCorpusType; slug: string }[] = [];
  for (const type of acupunctureCorpusTypes) {
    for (const record of getAcupunctureCorpusRecords(type)) {
      params.push({ type, slug: record.slug });
    }
  }
  return params;
}

export function getAcupunctureCorpusTypeLabel(type: string): string {
  return (
    getAcupunctureCorpusCategories().find((c) => c.id === type)?.label ?? type
  );
}

/**
 * Lightweight paths for sitemap.xml — uses catalog.json (no by-type body load).
 * Prefer full/partial quality; thin is currently unused but excluded if present.
 */
export function getSitemapAcupunctureCorpusPaths(): {
  type: AcupunctureCorpusType;
  slug: string;
}[] {
  return getAcupunctureCorpusEntries()
    .filter((entry) => {
      if (!isAcupunctureCorpusType(String(entry.type))) return false;
      if (entry.publishable === false) return false;
      if (entry.quality === "thin") return false;
      return Boolean(entry.slug);
    })
    .map((entry) => ({
      type: entry.type as AcupunctureCorpusType,
      slug: entry.slug,
    }));
}
