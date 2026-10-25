import Link from "next/link";
import {
  getEvidenceGradeHint,
  getEvidenceGradeLabel,
  libraryEvidenceDisclaimer,
  resolveClaimReferences,
  type LibraryTopicEvidence,
} from "@/lib/library-evidence";

export function LibraryEvidencePanel({
  evidence,
  topicTitle,
}: {
  evidence: LibraryTopicEvidence;
  topicTitle: string;
}) {
  const hasContent =
    evidence.status !== "empty" &&
    (evidence.claims.length > 0 || evidence.references.length > 0);

  if (!hasContent) {
    return (
      <section
        id="evidence"
        className="mx-auto max-w-6xl px-5 pb-10 md:px-8"
      >
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6">
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            What the evidence says
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Scientific notes and references for {topicTitle} are being added to
            this library. Until then, treat this theme as clinic education —
            not a literature review — and check with a GP, pharmacist, or
            osteopath before starting supplements.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Prefer personal advice?{" "}
            <Link
              href="/book"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Book online
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  const refIndex = new Map(
    evidence.references.map((ref, index) => [ref.id, index + 1]),
  );

  return (
    <section id="evidence" className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6 md:py-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
          Scientific notes
          {evidence.lastReviewed ? ` · Reviewed ${evidence.lastReviewed}` : ""}
          {evidence.status === "draft" ? " · Draft" : ""}
        </p>
        <h2 className="mt-2 font-display text-2xl text-navy md:text-3xl">
          What the evidence says
        </h2>
        {evidence.overview ? (
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
            {evidence.overview}
          </p>
        ) : null}
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-500">
          {libraryEvidenceDisclaimer}
        </p>

        <ul className="mt-8 space-y-6">
          {evidence.claims.map((claim) => {
            const refs = resolveClaimReferences(claim, evidence);
            return (
              <li
                key={claim.id}
                className="border-t border-slate-100 pt-6 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-navy">
                    {getEvidenceGradeLabel(claim.grade)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {claim.audience === "both"
                      ? "Patients & practitioners"
                      : claim.audience === "patients"
                        ? "Patients"
                        : "Practitioners"}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl text-navy">
                  {claim.statement}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {getEvidenceGradeHint(claim.grade)}
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  {claim.summary}
                </p>
                {refs.length > 0 ? (
                  <p className="mt-3 text-sm text-slate-600">
                    Sources:{" "}
                    {refs.map((ref, i) => (
                      <span key={ref.id}>
                        {i > 0 ? ", " : ""}
                        <a
                          href={`#${ref.id}`}
                          className="font-semibold text-teal hover:text-teal-dark"
                        >
                          [{refIndex.get(ref.id)}]
                        </a>
                      </span>
                    ))}
                  </p>
                ) : null}
                {claim.caveats && claim.caveats.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                    {claim.caveats.map((caveat) => (
                      <li key={caveat}>{caveat}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        {evidence.references.length > 0 ? (
          <div className="mt-10 border-t border-slate-200 pt-8">
            <h3 className="font-display text-2xl text-navy">References</h3>
            <ol className="mt-4 space-y-4">
              {evidence.references.map((ref, index) => (
                <li key={ref.id} id={ref.id} className="text-sm text-slate-700">
                  <span className="font-semibold text-navy">[{index + 1}]</span>{" "}
                  {ref.authors ? `${ref.authors}. ` : null}
                  {ref.url ? (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-teal hover:text-teal-dark"
                    >
                      {ref.title}
                    </a>
                  ) : (
                    <span className="font-medium text-navy">{ref.title}</span>
                  )}
                  {ref.publisher ? ` — ${ref.publisher}` : null}
                  {ref.year ? ` (${ref.year})` : null}
                  {ref.doi ? (
                    <>
                      {" · "}
                      <a
                        href={`https://doi.org/${ref.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal hover:text-teal-dark"
                      >
                        doi:{ref.doi}
                      </a>
                    </>
                  ) : null}
                  {ref.pmid ? (
                    <>
                      {" · "}
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal hover:text-teal-dark"
                      >
                        PMID {ref.pmid}
                      </a>
                    </>
                  ) : null}
                  {ref.accessed ? (
                    <span className="text-slate-500">
                      {" "}
                      (accessed {ref.accessed})
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
}
