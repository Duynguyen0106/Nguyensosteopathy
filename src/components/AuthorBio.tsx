import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

type AuthorBioProps = {
  /** Optional class on the outer aside */
  className?: string;
};

/**
 * Reusable author / practitioner bio box for blog posts and condition pages.
 * Photo is a styled placeholder until a final headshot is added.
 */
export function AuthorBio({ className = "" }: AuthorBioProps) {
  return (
    <aside
      className={`flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-start sm:gap-5 ${className}`}
    >
      {/* Professional photo placeholder — swap for next/image when ready */}
      <div
        className="relative mx-auto flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal/25 to-navy/20 ring-2 ring-white sm:mx-0"
        role="img"
        aria-label={`${site.practitioner.name}, professional photo placeholder`}
      >
        <span className="font-display text-2xl text-navy" aria-hidden>
          AN
        </span>
      </div>

      <div className="min-w-0 text-center sm:text-left">
        <p className="font-semibold text-navy">{site.practitioner.name}</p>
        <p className="mt-0.5 text-sm text-slate-600">
          {site.practitioner.title} (Reg. No.{" "}
          <a
            href={site.practitioner.goscRegisterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal hover:text-teal-dark"
          >
            {site.practitioner.regNo}
          </a>
          )
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {site.practitioner.bio} He also built{" "}
          <a
            href={site.products.mskTutor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal hover:text-teal-dark"
          >
            {site.products.mskTutor.name}
          </a>{" "}
          for clinicians and{" "}
          <a
            href={site.products.treowClinic.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal hover:text-teal-dark"
          >
            {site.products.treowClinic.name}
          </a>
          , which powers booking on this site.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <ButtonLink href="/book">Book an appointment</ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            About Austin
          </ButtonLink>
          <a
            href={site.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-teal hover:text-teal-dark"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </aside>
  );
}
