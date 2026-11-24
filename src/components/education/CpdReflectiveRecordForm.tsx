"use client";

import { useMemo, useState } from "react";
import {
  formatOpsThemes,
  learningModeLabel,
  OPS_THEMES,
  type CpdLearningMode,
  type OpsThemeId,
} from "@/lib/gosc-cpd";

export type CpdReflectiveRecordDefaults = {
  activityTitle: string;
  provider?: string;
  suggestedHours?: number;
  learningMode?: CpdLearningMode;
  opsThemes?: OpsThemeId[];
  activityUrl?: string;
};

const empty = {
  date: "",
  hours: "",
  learningMode: "individual" as CpdLearningMode,
  themes: [] as OpsThemeId[],
  method: "",
  learningPoints: "",
  reflection: "",
  impact: "",
  furtherActions: "",
  evidence: "",
};

export function CpdReflectiveRecordForm({
  defaults,
}: {
  defaults: CpdReflectiveRecordDefaults;
}) {
  const [date, setDate] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [hours, setHours] = useState(
    defaults.suggestedHours != null ? String(defaults.suggestedHours) : "",
  );
  const [learningMode, setLearningMode] = useState<CpdLearningMode>(
    defaults.learningMode === "learning-with-others"
      ? "learning-with-others"
      : "individual",
  );
  const [themes, setThemes] = useState<OpsThemeId[]>(
    defaults.opsThemes?.length ? [...defaults.opsThemes] : [],
  );
  const [method, setMethod] = useState(
    defaults.provider
      ? `E-learning / course notes — ${defaults.provider}`
      : "E-learning / reading with reflection",
  );
  const [learningPoints, setLearningPoints] = useState("");
  const [reflection, setReflection] = useState("");
  const [impact, setImpact] = useState("");
  const [furtherActions, setFurtherActions] = useState("");
  const [evidence, setEvidence] = useState(
    defaults.activityUrl
      ? `Activity URL: ${defaults.activityUrl}`
      : "",
  );
  const [copied, setCopied] = useState(false);

  const recordText = useMemo(() => {
    const themeLine =
      themes.length > 0
        ? formatOpsThemes(themes)
        : "(select OPS themes)";
    return [
      "GOsC-ALIGNED REFLECTIVE CPD RECORD",
      "================================",
      `Activity: ${defaults.activityTitle}`,
      `Date: ${date || "(add date)"}`,
      `Hours: ${hours || "(add hours)"}`,
      `Learning mode: ${learningModeLabel(learningMode)}`,
      `Method: ${method}`,
      `OPS themes: ${themeLine}`,
      "",
      "Key learning points:",
      learningPoints || "(add learning points)",
      "",
      "Reflection (what changed in your thinking):",
      reflection || "(add reflection)",
      "",
      "Impact on practice (what you will do differently):",
      impact || "(add impact)",
      "",
      "Further learning / actions:",
      furtherActions || "(add actions)",
      "",
      "Evidence attached / links:",
      evidence || "(none noted)",
      "",
      "Note: Claim only hours actually spent. Solo e-learning is usually individual CPD; peer discussion can add learning-with-others hours. Keep this with your portfolio for renewal and Peer Discussion Review.",
    ].join("\n");
  }, [
    defaults.activityTitle,
    date,
    hours,
    learningMode,
    method,
    themes,
    learningPoints,
    reflection,
    impact,
    furtherActions,
    evidence,
  ]);

  function toggleTheme(id: OpsThemeId) {
    setThemes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  async function copyRecord() {
    try {
      await navigator.clipboard.writeText(recordText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function printRecord() {
    const w = window.open("", "_blank", "noopener,noreferrer,width=720,height=900");
    if (!w) return;
    w.document.write(
      `<!doctype html><html><head><title>CPD record — ${defaults.activityTitle}</title>
      <style>body{font-family:Georgia,serif;max-width:40rem;margin:2rem auto;padding:0 1rem;line-height:1.5;white-space:pre-wrap}</style>
      </head><body>${recordText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</body></html>`,
    );
    w.document.close();
    w.focus();
    w.print();
  }

  function resetForm() {
    setDate(new Date().toISOString().slice(0, 10));
    setHours(
      defaults.suggestedHours != null ? String(defaults.suggestedHours) : "",
    );
    setLearningMode(
      defaults.learningMode === "learning-with-others"
        ? "learning-with-others"
        : "individual",
    );
    setThemes(defaults.opsThemes?.length ? [...defaults.opsThemes] : []);
    setMethod(
      defaults.provider
        ? `E-learning / course notes — ${defaults.provider}`
        : "E-learning / reading with reflection",
    );
    setLearningPoints(empty.learningPoints);
    setReflection(empty.reflection);
    setImpact(empty.impact);
    setFurtherActions(empty.furtherActions);
    setEvidence(
      defaults.activityUrl ? `Activity URL: ${defaults.activityUrl}` : "",
    );
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6 md:py-7">
      <h2 className="font-display text-2xl text-navy md:text-3xl">
        Reflective CPD record
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Prefills from this activity. Complete reflection and impact, then copy
        or print into your portfolio. Hours must match time you actually spent.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800">
          Date
          <input
            type="date"
            className={fieldClass}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Hours claimed
          <input
            type="number"
            min={0}
            step={0.25}
            className={fieldClass}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-800 sm:col-span-2">
          Learning mode
          <select
            className={fieldClass}
            value={learningMode}
            onChange={(e) =>
              setLearningMode(e.target.value as CpdLearningMode)
            }
          >
            <option value="individual">Individual CPD (self-directed)</option>
            <option value="learning-with-others">
              Learning with others (peer interaction)
            </option>
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-800 sm:col-span-2">
          Method / activity type
          <input
            type="text"
            className={fieldClass}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-slate-800">
          OPS themes supported
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["A", "B", "C", "D"] as OpsThemeId[]).map((id) => {
            const active = themes.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleTheme(id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "border-teal bg-teal/10 text-teal-dark"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-teal/40"
                }`}
              >
                {id} · {OPS_THEMES[id].shortTitle}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-5 block text-sm font-medium text-slate-800">
        Key learning points
        <textarea
          rows={3}
          className={fieldClass}
          value={learningPoints}
          onChange={(e) => setLearningPoints(e.target.value)}
          placeholder="What did you learn?"
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-slate-800">
        Reflection
        <textarea
          rows={3}
          className={fieldClass}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What changed in your thinking?"
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-slate-800">
        Impact on practice
        <textarea
          rows={3}
          className={fieldClass}
          value={impact}
          onChange={(e) => setImpact(e.target.value)}
          placeholder="What will you do differently?"
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-slate-800">
        Further learning / actions
        <textarea
          rows={2}
          className={fieldClass}
          value={furtherActions}
          onChange={(e) => setFurtherActions(e.target.value)}
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-slate-800">
        Evidence / links
        <textarea
          rows={2}
          className={fieldClass}
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyRecord}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal/25 hover:bg-teal-dark"
        >
          {copied ? "Copied" : "Copy record"}
        </button>
        <button
          type="button"
          onClick={printRecord}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm hover:border-teal hover:text-teal"
        >
          Print record
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-teal hover:text-teal-dark"
        >
          Reset
        </button>
      </div>

      <pre className="mt-6 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed whitespace-pre-wrap text-slate-700">
        {recordText}
      </pre>
    </div>
  );
}
