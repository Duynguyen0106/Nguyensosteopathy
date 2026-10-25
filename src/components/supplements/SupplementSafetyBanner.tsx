import Link from "next/link";
import {
  supplementDisclaimer,
  supplementDisclaimerCore,
} from "@/lib/supplements";
import { site } from "@/lib/site";

export function SupplementSafetyBanner({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className="rounded-2xl border border-teal/30 bg-teal/5 px-5 py-4 text-sm leading-relaxed text-slate-700 md:px-6 md:py-5 md:text-base"
      role="note"
    >
      <p className="font-semibold text-navy">Educational guides — not personal prescribing</p>
      {compact ? (
        <p className="mt-2">
          {supplementDisclaimerCore}{" "}
          <Link href="/book" className="font-semibold text-teal hover:text-teal-dark">
            Book online
          </Link>
          .
        </p>
      ) : (
        <>
          <p className="mt-2">{supplementDisclaimer}</p>
          <p className="mt-2">
            Prefer a plan built around your case?{" "}
            <Link href="/book" className="font-semibold text-teal hover:text-teal-dark">
              Book online
            </Link>{" "}
            or call{" "}
            <a href={site.phoneHref} className="font-semibold text-teal hover:text-teal-dark">
              {site.phone}
            </a>
            .
          </p>
        </>
      )}
    </aside>
  );
}
