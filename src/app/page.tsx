import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Hero } from "@/components/Hero";
import {
  HomeReviewsTeaser,
  HomeReviewsTeaserFallback,
} from "@/components/HomeReviewsTeaser";
import { ServiceIcon } from "@/components/ServiceIcon";
import { getLatestPostCards } from "@/lib/blog";
import { getFeaturedConditions } from "@/lib/conditions";
import {
  faqs,
  getServiceHref,
  highlights,
  pricing,
  services,
  site,
  visitSteps,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/",
      "vi-VN": "/vi",
    },
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function HomePage() {
  const latestPosts = getLatestPostCards(3);
  const featuredConditions = getFeaturedConditions();

  return (
    <>
      <Hero />

      {/* First section after hero — one job: how a visit works */}
      <section className="bg-slate-50 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Your visit
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Simple from first contact to recovery
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {site.booking.shortNote}
            </p>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {visitSteps.map((item) => (
              <li key={item.step}>
                <p className="text-xs font-semibold tracking-[0.18em] text-teal">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deferred trust signals — not in the first viewport */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:px-8">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={site.practitioner.goscRegisterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-navy hover:text-teal"
            >
              GOsC Reg. No. {site.practitioner.regNo}
            </a>
            <Link
              href="/nhs-discount"
              className="text-sm font-semibold text-navy hover:text-teal"
            >
              10% NHS &amp; student discount
            </Link>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
            {highlights.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="reviews"
        className="scroll-mt-24 border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Reviews
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              What patients say on Google
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Real feedback from our Google listing — and a warm invitation to
              leave your own review after your visit from{" "}
              {site.booking.opensFromLabel}.
            </p>
          </div>

          <Suspense fallback={<HomeReviewsTeaserFallback />}>
            <HomeReviewsTeaser />
          </Suspense>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 bg-white px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal/20 to-navy/10 blur-xl" />
            <Image
              src="/images/austin-clinic.webp"
              alt="Treatment room at Nguyen's Osteopathic Clinic inside St James Pharmacy, Woolwich"
              width={560}
              height={700}
              sizes="(max-width: 768px) 90vw, 40vw"
              loading="lazy"
              decoding="async"
              quality={70}
              className="relative float-soft w-full rounded-[1.5rem] object-cover object-center shadow-[0_24px_60px_rgba(11,44,69,0.14)]"
            />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Meet your osteopath
            </p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
              {site.practitioner.name}
            </h2>
            <p className="mt-2 text-sm font-semibold tracking-wide text-slate-600">
              {site.practitioner.title} · Reg No.{" "}
              <a
                href={site.practitioner.goscRegisterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:text-teal-dark"
              >
                {site.practitioner.regNo}
              </a>
            </p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Master of Osteopathy graduate of the British College of
              Osteopathic Medicine, and a Vietnamese-speaking GOsC osteopath
              practising in Woolwich. {site.name} exists so our community can
              find drug-free care they recognise, in a clinic built around
              root-cause treatment and dignity.
            </p>

            <a
              href={site.practitioner.goscRegisterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex max-w-full items-center gap-3 rounded-xl border border-teal/30 bg-teal/5 px-4 py-3 text-sm font-medium text-navy transition hover:border-teal hover:bg-teal/10 sm:px-5"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal"
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3 5 6v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" />
                  <path d="m9.5 12 1.8 1.8 3.4-3.6" />
                </svg>
              </span>
              <span>
                General Osteopathic Council Registered · Reg No.{" "}
                {site.practitioner.regNo}
              </span>
            </a>

            <div className="mt-6">
              <ButtonLink href="/about" variant="secondary">
                Read Austin&apos;s story
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-24 border-y border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                Clinical care
              </p>
              <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
                Treatments for how you move
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                From everyday back pain to specialist shockwave therapy — open
                any service for who it helps, what to expect, and fees.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/services/focused-shockwave" variant="secondary">
                Shockwave guide
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                View all services
              </ButtonLink>
            </div>
          </div>

          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200 sm:mt-12">
            {services.map((service) => (
              <li key={service.slug} className="min-w-0">
                <Link
                  href={getServiceHref(service.slug)}
                  className="group flex gap-3 py-4 transition-colors hover:bg-white/60 sm:gap-4 sm:py-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2 sm:gap-3">
                      <span className="min-w-0">
                        <span className="block text-base font-semibold text-navy group-hover:text-teal sm:text-lg">
                          {service.title}
                        </span>
                        {service.badge ? (
                          <span className="mt-1.5 inline-flex max-w-full text-[11px] font-semibold tracking-wide text-teal-dark uppercase">
                            {service.badge}
                          </span>
                        ) : null}
                      </span>
                      <span
                        className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-slate-600">
                      {service.summary}
                    </span>
                    {service.relatedPricing ? (
                      <span className="mt-2 block text-xs font-semibold tracking-wide text-teal-dark">
                        {service.relatedPricing}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="pricing"
        className="scroll-mt-24 bg-white px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Transparent pricing
            </p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
              Treatments & fees
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Tailored clinical care designed around your specific recovery
              goals.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden min-w-[36rem] grid-cols-[1.6fr_0.8fr_0.5fr] bg-navy px-6 py-4 text-sm font-medium tracking-wide text-white md:grid">
              <span>Service & consultation</span>
              <span>Duration</span>
              <span className="text-right">Price</span>
            </div>
            <ul className="md:min-w-[36rem]">
              {pricing.map((row, index) => (
                <li
                  key={row.service}
                  className={`grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1 px-4 py-4 sm:px-5 md:grid-cols-[1.6fr_0.8fr_0.5fr] md:items-center md:gap-4 md:px-6 ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <p className="col-span-2 min-w-0 font-medium text-navy md:col-span-1">
                    {row.service}
                  </p>
                  <p className="text-sm font-medium text-slate-600">
                    {row.duration}
                  </p>
                  <p className="text-right text-lg font-bold text-teal-dark">
                    {row.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 rounded-xl border border-dashed border-teal/40 bg-teal/5 px-5 py-4 text-sm font-medium text-navy md:text-base">
            {site.discount}
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Full fee notes and NHS/student discount details are on our{" "}
            <Link
              href="/fees"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              fees page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                From the blog
              </p>
              <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
                Local osteopathy guides for Woolwich
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Practical articles to help you understand symptoms, treatment
                options, and what to expect before you book.
              </p>
            </div>
            <ButtonLink href="/blog" variant="secondary">
              View all articles
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <span className="mt-4 block text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                    {post.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-navy group-hover:text-teal">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Explore
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Popular condition guides
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Start with a common presentation, then book when you are ready for
              assessment.
            </p>
          </div>
          <ul className="mt-10 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
            {featuredConditions.map((condition) => (
              <li key={condition.slug} className="mb-3 break-inside-avoid">
                <Link
                  href={`/conditions/${condition.slug}`}
                  className="group inline-flex flex-col py-1"
                >
                  <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                    {condition.region}
                  </span>
                  <span className="mt-0.5 font-semibold text-navy group-hover:text-teal">
                    {condition.shortTitle}
                    <span aria-hidden className="ml-1 text-slate-400">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            <Link
              href="/conditions"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Full conditions index →
            </Link>
            {" · "}
            <Link
              href="/areas"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Areas we serve
            </Link>
            {" · "}
            <Link
              href="/find-us"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Find us &amp; parking
            </Link>
            {" · "}
            <Link
              href="/site-map"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Site map
            </Link>
          </p>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-24 border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Common questions
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Quick answers before you book — from referrals and first visits to
              finding us inside the pharmacy.
            </p>
          </div>
          <FaqAccordion items={faqs.slice(0, 5)} />
          <p className="mt-6 text-center text-sm text-slate-600">
            <Link
              href="/faq"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              See all FAQs
            </Link>
            {" · "}
            <Link
              href="/new-patients"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              New patient guide
            </Link>
            {" · "}
            <Link
              href="/resources"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Patient resources
            </Link>
            {" · "}
            <Link
              href="/osteopathy"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              What is osteopathy?
            </Link>
            {" · "}
            <Link
              href="/conditions"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Conditions we treat
            </Link>
          </p>
        </div>
      </section>

      <section
        id="location"
        className="scroll-mt-24 border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Find us
          </p>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
            Osteopath in Woolwich — inside {site.address.venue}
          </h2>
          <p className="mt-5 text-lg font-medium text-slate-700">
            {site.address.line1}
            <br />
            {site.address.line2}
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
            Easy to reach from Greenwich, Charlton, Plumstead, Thamesmead, and
            Abbey Wood. Ask at the pharmacy counter on arrival — they will
            direct you to the osteopathy room.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={site.address.mapsUrl}
              variant="navy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps
            </ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Parking, hours &amp; travel
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
