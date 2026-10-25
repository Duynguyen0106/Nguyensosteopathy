import {
  acupuncturePatientDisclaimer,
  cpdPractitionerDisclaimer,
  libraryDualAudienceDisclaimer,
  libraryDualAudienceDisclaimerShort,
  type EducationAudience,
  type EducationTrackId,
} from "@/lib/education";

const copy: Record<
  EducationTrackId,
  { title: string; body: string; bodyShort?: string } | null
> = {
  library: {
    title: "For patients & practitioners",
    body: libraryDualAudienceDisclaimer,
    bodyShort: libraryDualAudienceDisclaimerShort,
  },
  acupuncture: {
    title: "Patient education — acupuncture",
    body: acupuncturePatientDisclaimer,
  },
  cpd: {
    title: "For practitioners — not patient advice",
    body: cpdPractitionerDisclaimer,
  },
};

export function EducationAudienceBanner({
  trackId,
  audience,
  compact = false,
}: {
  trackId: EducationTrackId;
  audience: EducationAudience;
  /** Shorter disclaimer for dense library browse/theme pages. */
  compact?: boolean;
}) {
  const content = copy[trackId];
  if (!content) return null;

  const body =
    compact && content.bodyShort ? content.bodyShort : content.body;

  const border =
    audience === "practitioners"
      ? "border-navy/25 bg-navy/[0.04]"
      : audience === "both"
        ? "border-navy/20 bg-teal/[0.06]"
        : "border-teal/30 bg-teal/5";
  return (
    <aside
      className={`rounded-2xl border px-5 py-4 text-sm leading-relaxed text-slate-700 md:px-6 md:py-5 ${
        compact ? "md:text-sm" : "md:text-base"
      } ${border}`}
      role="note"
    >
      <p className="font-semibold text-navy">{content.title}</p>
      <p className="mt-2">{body}</p>
    </aside>
  );
}
