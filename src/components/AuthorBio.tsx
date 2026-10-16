import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

type AuthorBioProps = {
  /** Optional class on the outer aside */
  className?: string;
};

/**
 * Reusable author / practitioner bio box for blog posts and condition pages.
 */
export function AuthorBio({ className = "" }: AuthorBioProps) {
  return (
    <aside
      className={`flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-start sm:gap-5 ${className}`}
    >
      <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-white sm:mx-0">
        <Image
          src="/images/austin-nguyen.webp"
          alt={`${site.practitioner.name}, ${site.practitioner.title}`}
          fill
          sizes="96px"
          className="object-cover object-[center_18%]"
          loading="lazy"
          decoding="async"
          quality={70}
        />
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
          {site.practitioner.bio}
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
