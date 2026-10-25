/**
 * Acupuncture education corpus framework (American Dragon ingest).
 * Public index holds catalog metadata only until clinic-voice pages are published.
 */

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
  label: string;
  sourceUrl: string;
  status: string;
  publishable: boolean;
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
  const entries = acupunctureCorpus.entries ?? [];
  if (!type) return entries;
  return entries.filter((entry) => entry.type === type);
}

export function getAcupunctureCorpusAttribution() {
  return acupunctureCorpus.attribution;
}

export function getAcupunctureCorpusPipeline() {
  return acupunctureCorpus.pipeline;
}

/** True when discover has populated real catalog counts. */
export function acupunctureCorpusIsDiscovered(): boolean {
  const total =
    acupunctureCorpus.inventoryTotal ??
    Object.values(acupunctureCorpus.counts || {}).reduce(
      (sum, n) => sum + (Number(n) || 0),
      0,
    );
  return total > 0 && acupunctureCorpus.source === "discovered-inventory";
}
