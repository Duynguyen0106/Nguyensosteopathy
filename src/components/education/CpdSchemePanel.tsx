import Link from "next/link";
import {
  educationHref,
  getCoveredOpsThemes,
  getCoveredSchemeElements,
  getGoscCpdActivities,
} from "@/lib/education";
import {
  GOSC_CPD_GUIDANCE_PDF,
  GOSC_CPD_URL,
  GOSC_OPS_URL,
  GOSC_SCHEME_ELEMENTS,
  OPS_THEMES,
  type GoscSchemeElementId,
  type OpsThemeId,
} from "@/lib/gosc-cpd";

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        ok
          ? "bg-teal/15 text-teal-dark"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {ok ? "Covered on site" : "Plan in clinic"} · {label}
    </span>
  );
}

export function CpdSchemePanel() {
  const activities = getGoscCpdActivities();
  const coveredThemes = new Set(getCoveredOpsThemes());
  const coveredElements = new Set(getCoveredSchemeElements());

  const elementHasActivity = (id: GoscSchemeElementId) =>
    coveredElements.has(id);

  return (
    <section className="rounded-2xl border border-navy/15 bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
      <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">
        GOsC three-year scheme
      </p>
      <h2 className="mt-2 font-display text-2xl text-navy md:text-3xl">
        Requirements checklist
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
        Use this hub to complete self-directed activities and keep reflective
        records that map to the{" "}
        <a
          href={GOSC_CPD_URL}
          className="font-semibold text-teal hover:text-teal-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          GOsC CPD scheme
        </a>
        . You remain responsible for honest hours, learning with others, and
        Peer Discussion Review with a real peer.
      </p>

      <ul className="mt-8 space-y-4">
        {GOSC_SCHEME_ELEMENTS.map((el) => {
          const linked = activities.filter((a) =>
            a.gosc?.contributesTo.includes(el.id),
          );
          return (
            <li
              key={el.id}
              className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 md:px-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold text-navy">{el.title}</h3>
                <StatusPill
                  ok={elementHasActivity(el.id)}
                  label={
                    linked.length
                      ? `${linked.length} activit${linked.length === 1 ? "y" : "ies"}`
                      : "no site activity yet"
                  }
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                <span className="font-medium text-slate-800">Requirement: </span>
                {el.requirement}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                <span className="font-medium text-slate-800">On this site: </span>
                {el.websiteRole}
              </p>
              {linked.length > 0 ? (
                <p className="mt-3 text-sm text-slate-700">
                  Start with:{" "}
                  {linked.map((article, i) => (
                    <span key={article.slug}>
                      {i > 0 ? " · " : null}
                      <Link
                        href={educationHref("cpd", article.slug)}
                        className="font-semibold text-teal hover:text-teal-dark"
                      >
                        {article.title}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <h3 className="font-display text-xl text-navy">OPS theme coverage</h3>
        <p className="mt-2 text-sm text-slate-600">
          Your cycle must include CPD linked to all four{" "}
          <a
            href={GOSC_OPS_URL}
            className="font-semibold text-teal hover:text-teal-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            Osteopathic Practice Standards
          </a>{" "}
          themes. Published hub activities currently tag:
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {(["A", "B", "C", "D"] as OpsThemeId[]).map((id) => {
            const theme = OPS_THEMES[id];
            const ok = coveredThemes.has(id);
            return (
              <li
                key={id}
                className={`rounded-xl border px-4 py-3 ${
                  ok
                    ? "border-teal/30 bg-teal/[0.06]"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <p className="text-sm font-semibold text-navy">
                  {id}. {theme.title}
                </p>
                <p className="mt-1 text-xs text-slate-600">{theme.summary}</p>
                <p className="mt-2 text-xs font-semibold tracking-wide uppercase text-slate-500">
                  {ok ? "Activities available" : "Add clinic CPD for this theme"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Official guidance:{" "}
        <a
          href={GOSC_CPD_GUIDANCE_PDF}
          className="font-semibold text-teal hover:text-teal-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          CPD Guidance PDF (GOsC)
        </a>
        .
      </p>
    </section>
  );
}
