import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero-wash overflow-x-clip">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:gap-10 sm:px-5 sm:py-14 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div className="section-fade min-w-0">
          <h1 className="max-w-xl">
            <span className="font-display block text-[clamp(2.6rem,11vw,5.6rem)] leading-[0.92] font-semibold tracking-[0.04em] text-navy uppercase">
              Nguyen&apos;s
            </span>
            <span className="mt-3 block text-sm font-semibold tracking-[0.18em] text-teal uppercase sm:text-base sm:tracking-[0.28em] md:text-lg">
              Osteopathic Clinic
            </span>
            <span className="mt-4 block text-sm font-semibold tracking-wide text-navy/70 md:text-base">
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
            Expert osteopathy for drug free pain relief, back pain treatment,
            neck pain treatment, and shockwave therapy. Care with Austin Duy
            Nguyen, GOsC-registered osteopath, inside St James Pharmacy on Powis
            Street.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm sm:text-sm">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              GOsC Reg. No. {site.practitioner.regNo}
            </span>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal-dark shadow-sm sm:text-sm">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              10% NHS & Student Discount
            </span>
          </div>

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
            <Image
              src="/images/austin-nguyen.jpg"
              alt="Austin Duy Nguyen, osteopath at Nguyen's Osteopathic Clinic"
              fill
              priority
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 90vw, 42vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
