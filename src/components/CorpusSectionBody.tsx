import {
  formatCorpusHeading,
  formatCorpusSection,
  type CorpusBlock,
} from "@/lib/corpus-format";

function Block({ block }: { block: CorpusBlock }) {
  if (block.kind === "pairs") {
    return (
      <dl className="grid gap-3 sm:grid-cols-2">
        {block.pairs.map((pair) => (
          <div key={pair.label} className="border-b border-slate-200 pb-3">
            <dt className="text-xs font-semibold tracking-[0.12em] text-teal uppercase">
              {pair.label}
            </dt>
            <dd className="mt-1 text-base text-slate-700 md:text-lg">
              {pair.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  if (block.kind === "split") {
    return (
      <div className="space-y-6">
        {block.groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold tracking-[0.12em] text-teal uppercase">
              {group.title}
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 md:text-lg">
              {group.items.map((item) => (
                <li key={item.slice(0, 64)}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (block.kind === "list") {
    return (
      <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 md:text-lg">
        {block.items.map((item) => (
          <li key={item.slice(0, 64)}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-3 text-base leading-relaxed text-slate-700 md:text-lg">
      {block.paragraphs.map((para) => (
        <p key={para.slice(0, 64)}>{para}</p>
      ))}
    </div>
  );
}

export function CorpusSectionBody({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  const block = formatCorpusSection(heading, body);
  return (
    <article id={slugifyHeading(heading)}>
      <h2 className="font-display text-2xl text-navy md:text-3xl">
        {formatCorpusHeading(heading)}
      </h2>
      <div className="mt-3">
        <Block block={block} />
      </div>
    </article>
  );
}

export function slugifyHeading(heading: string): string {
  return String(heading || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
