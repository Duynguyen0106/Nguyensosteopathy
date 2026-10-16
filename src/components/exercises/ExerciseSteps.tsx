export function ExerciseSteps({
  steps,
  cues,
  avoid,
}: {
  steps: string[];
  cues: string[];
  avoid: string[];
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-2xl text-navy md:text-3xl">Steps</h2>
        <ol className="mt-5 space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                {index + 1}
              </span>
              <p className="pt-1 text-base leading-relaxed text-slate-700">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {cues.length > 0 ? (
        <div>
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            Coaching cues
          </h2>
          <ul className="mt-5 space-y-3">
            {cues.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-base leading-relaxed text-slate-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {avoid.length > 0 ? (
        <div>
          <h2 className="font-display text-2xl text-navy md:text-3xl">Avoid</h2>
          <ul className="mt-5 space-y-3">
            {avoid.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-base leading-relaxed text-slate-700"
              >
                <span className="mt-1 font-semibold text-teal" aria-hidden>
                  ×
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
