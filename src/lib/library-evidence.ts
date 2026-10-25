/**
 * Topic-level scientific evidence dossiers for the supplement education library.
 * Data: src/data/library-evidence.json — hand-curated, never OCR/QRG prose.
 */

import evidenceData from "@/data/library-evidence.json";

export type EvidenceGrade =
  | "high"
  | "moderate"
  | "low"
  | "very-low"
  | "mixed"
  | "insufficient";

export type LibraryReferenceType =
  | "guideline"
  | "systematic-review"
  | "narrative-review"
  | "rct"
  | "observational"
  | "patient-info"
  | "other";

export type LibraryReference = {
  id: string;
  title: string;
  authors?: string;
  year?: number;
  publisher?: string;
  url?: string;
  pmid?: string;
  doi?: string;
  type: LibraryReferenceType;
  accessed?: string;
};

export type LibraryEvidenceClaim = {
  id: string;
  statement: string;
  audience: "patients" | "practitioners" | "both";
  grade: EvidenceGrade;
  summary: string;
  referenceIds: string[];
  caveats?: string[];
};

export type LibraryTopicEvidence = {
  topicKey: string;
  status: "draft" | "reviewed" | "empty";
  lastReviewed?: string;
  overview?: string;
  claims: LibraryEvidenceClaim[];
  references: LibraryReference[];
};

export const libraryEvidenceDisclaimer =
  "These notes are an educational synthesis for patients and practitioners at Nguyen's Osteopathic Clinic. They are not a formal systematic review, GRADE appraisal for an individual patient, or prescribing advice. Always check the primary sources, a pharmacist or GP for interactions, and clinical context before changing care.";

type EvidenceFile = {
  generatedAt?: string;
  note?: string;
  topics: LibraryTopicEvidence[];
};

const file = evidenceData as EvidenceFile;

export const libraryTopicEvidenceList: LibraryTopicEvidence[] = file.topics ?? [];

const byKey = new Map(
  libraryTopicEvidenceList.map((topic) => [topic.topicKey, topic]),
);

export function getTopicEvidence(
  topicKey: string,
): LibraryTopicEvidence | undefined {
  return byKey.get(topicKey);
}

export function hasTopicEvidence(topicKey: string): boolean {
  const topic = getTopicEvidence(topicKey);
  return Boolean(
    topic &&
      topic.status !== "empty" &&
      (topic.claims.length > 0 || topic.references.length > 0),
  );
}

export function getEvidenceGradeLabel(grade: EvidenceGrade): string {
  switch (grade) {
    case "high":
      return "Higher certainty";
    case "moderate":
      return "Moderate certainty";
    case "low":
      return "Lower certainty";
    case "very-low":
      return "Very low certainty";
    case "mixed":
      return "Mixed findings";
    case "insufficient":
      return "Insufficient evidence";
    default:
      return grade;
  }
}

export function getEvidenceGradeHint(grade: EvidenceGrade): string {
  switch (grade) {
    case "high":
      return "Consistent findings from strong evidence sources (e.g. guidelines or high-quality reviews).";
    case "moderate":
      return "Useful signal from guidelines or reviews, with remaining uncertainty.";
    case "low":
      return "Limited or indirect evidence — treat as a discussion prompt only.";
    case "very-low":
      return "Very uncertain; avoid strong claims.";
    case "mixed":
      return "Studies disagree or results depend heavily on dose, population, or outcome.";
    case "insufficient":
      return "Not enough reliable evidence to support a clinical claim.";
    default:
      return "";
  }
}

export function formatReferenceCitation(
  reference: LibraryReference,
  index: number,
): string {
  const parts: string[] = [`[${index}]`];
  if (reference.authors) parts.push(`${reference.authors}.`);
  parts.push(reference.title);
  if (reference.publisher) parts.push(reference.publisher);
  if (reference.year) parts.push(String(reference.year));
  return parts.join(" ");
}

export function resolveClaimReferences(
  claim: LibraryEvidenceClaim,
  topic: LibraryTopicEvidence,
): LibraryReference[] {
  const map = new Map(topic.references.map((ref) => [ref.id, ref]));
  return claim.referenceIds
    .map((id) => map.get(id))
    .filter((ref): ref is LibraryReference => Boolean(ref));
}
