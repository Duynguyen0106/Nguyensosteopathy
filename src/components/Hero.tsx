import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero-wash">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div className="section-fade">
          <p className="font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-[0.94] font-semibold tracking-[0.04em] text-navy uppercase">
            Nguyen&apos;s
          </p>
          <p className="mt-2 text-sm font-semibold tracking-[0.28em] text-teal uppercase md:text-base">
            Osteopathic Clinic
          </p>

          <div className="mt-5 flex items-center gap-4">
            <span className="brand-rule h-px w-10 bg-teal" />
            <p className="text-base text-muted md:text-lg">{site.tagline}</p>
            <span className="brand-rule h-px w-10 bg-teal" />
          </div>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80 md:text-[1.05rem]">
            High-quality, drug-free care that finds the root cause of your pain
            and helps you move with confidence again.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-xl border border-teal/35 bg-white/80 px-3 py-1.5 text-xs font-medium text-navy backdrop-blur sm:text-sm">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              GOsC Reg. No. {site.practitioner.regNo}
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-teal/35 bg-white/80 px-3 py-1.5 text-xs font-medium text-navy backdrop-blur sm:text-sm">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              10% NHS & Student Discount
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
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
