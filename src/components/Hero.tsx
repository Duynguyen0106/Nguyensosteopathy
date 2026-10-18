import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

const HERO_IMAGE = "/images/austin-nguyen.webp";

export function Hero() {
  return (
    <section className="hero-wash overflow-x-clip">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:gap-10 sm:px-5 sm:py-14 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div className="section-fade min-w-0">
          <h1 className="max-w-xl">
            <span className="font-display block text-[clamp(2.6rem,11vw,5.6rem)] leading-[0.92] font-semibold tracking-[0.04em] text-navy uppercase">
              Nguyen&apos;s
            </span>
            <span className="mt-3 block text-base font-semibold tracking-[0.18em] text-teal uppercase sm:tracking-[0.28em] md:text-lg">
              Osteopathic Clinic
            </span>
            <span className="mt-4 block text-base font-semibold tracking-wide text-navy/70">
              Osteopathy in Woolwich, London SE18
            </span>
          </h1>

          <div className="mt-6 flex items-center gap-3 sm:gap-4">
            <span className="brand-rule hidden h-px w-10 shrink-0 bg-teal sm:block" />
            <p className="min-w-0 text-base leading-snug text-muted sm:text-lg md:text-xl">
              {site.tagline}
            </p>
            <span className="brand-rule hidden h-px w-10 shrink-0 bg-teal sm:block" />
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/80 sm:text-lg md:text-[1.15rem]">
            Hands-on osteopathy and shockwave therapy with Austin Duy Nguyen,
            GOsC-registered osteopath, inside St James Pharmacy on Powis Street.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/book" className="w-full sm:w-auto">
              Book online
            </ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md overflow-hidden lg:max-w-none">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal/25 to-navy/10 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[0_24px_60px_rgba(11,44,69,0.16)] ring-1 ring-navy/5">
            {/*
              priority + fetchPriority="high" makes Next inject the correct
              `/_next/image` preload for the LCP hero (avoid double-fetching
              a separate static preload of the same asset).
            */}
            <Image
              src={HERO_IMAGE}
              alt="Austin Duy Nguyen, osteopath at Nguyen's Osteopathic Clinic"
              fill
              priority
              fetchPriority="high"
              quality={75}
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 90vw, 42vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
