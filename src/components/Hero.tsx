import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

const HERO_IMAGE = "/images/austin-nguyen.webp";

/**
 * First viewport: one composition — full-bleed image, brand as hero signal,
 * one support line, one CTA group. No inset cards or overlay badges.
 */
export function Hero() {
  return (
    <section className="relative min-h-[min(92vh,52rem)] overflow-hidden text-white">
      <Image
        src={HERO_IMAGE}
        alt="Austin Duy Nguyen, osteopath at Nguyen's Osteopathic Clinic"
        fill
        priority
        fetchPriority="high"
        quality={75}
        sizes="100vw"
        className="object-cover object-[center_18%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy/75 to-navy/40"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy/25"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(92vh,52rem)] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:px-5 sm:pb-16 md:px-8 md:pb-24">
        <div className="section-fade max-w-2xl">
          <h1>
            <span className="font-display block text-[clamp(2.75rem,10vw,5.25rem)] leading-[0.92] font-semibold tracking-[0.04em] text-white uppercase">
              Nguyen&apos;s
            </span>
            <span className="mt-3 block text-base font-semibold tracking-[0.2em] text-teal-mist uppercase sm:text-lg sm:tracking-[0.28em]">
              Osteopathic Clinic
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-snug text-white/90 sm:text-xl md:text-[1.35rem]">
            {site.tagline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/book" className="w-full sm:w-auto">
              Book online
            </ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              className="w-full border-white/25 bg-white/10 text-white shadow-none hover:border-teal-mist hover:bg-white/15 hover:text-white sm:w-auto"
            >
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
