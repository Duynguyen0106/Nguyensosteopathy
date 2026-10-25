/**
 * Acupuncture education corpus (American Dragon ingest, owner-permitted).
 * Record bodies are read from disk so large JSON is not bundled into every route.
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
};

export type AcupunctureCorpusRecord = {
  id: string;
  type: AcupunctureCorpusType | string;
  slug: string;
  title: string;
  sourceUrl: string;
  gatheredAt?: string;
  publishable?: boolean;
  sections: Record<string, string>;
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

const typeCache = new Map<string, AcupunctureCorpusRecord[]>();

function typeFile(type: AcupunctureCorpusType) {
  return path.join(
    process.cwd(),
    "src/data/acupuncture-corpus/by-type",
    `${type}.json`,
  );
}

function loadTypeRecords(type: AcupunctureCorpusType): AcupunctureCorpusRecord[] {
  if (typeCache.has(type)) return typeCache.get(type)!;
  const file = typeFile(type);
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
  return loadTypeRecords(type).find((record) => record.slug === slug);
}

export function getAllAcupunctureCorpusParams(): {
  type: AcupunctureCorpusType;
  slug: string;
}[] {
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
