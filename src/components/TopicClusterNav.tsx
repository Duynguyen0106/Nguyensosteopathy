import Link from "next/link";
import { getCluster, type TopicCluster } from "@/lib/seo-strategy";

type Props = {
  clusterId: TopicCluster["id"];
  /** Optional override intro under the heading. */
  intro?: string;
};

/** One-job internal linking block for SEO topic clusters. */
export function TopicClusterNav({ clusterId, intro }: Props) {
  const cluster = getCluster(clusterId);

  return (
    <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-5 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Explore next
        </p>
        <h2 className="mt-2 font-display text-2xl text-navy md:text-3xl">
          {cluster.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          {intro ?? (
            <>
              Start from{" "}
              <Link
                href={cluster.hubHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
                {cluster.hubLabel}
              </Link>
              , or jump to a related guide.
            </>
          )}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-teal">
          <li>
            <Link href={cluster.hubHref} className="hover:text-teal-dark">
              {cluster.hubLabel} →
            </Link>
          </li>
          {cluster.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-teal-dark">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
