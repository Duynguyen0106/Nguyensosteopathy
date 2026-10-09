import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Hero } from "@/components/Hero";
import { ServiceIcon } from "@/components/ServiceIcon";
import { getAllPosts } from "@/lib/blog";
import {
  faqs,
  highlights,
  pricing,
  services,
  site,
  testimonials,
  visitSteps,
} from "@/lib/site";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-3 px-5 py-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {highlights.map((item) => (
            <p
              key={item}
              className="flex items-start gap-2 text-sm text-white/95 md:text-[0.95rem]"
            >
              <span className="mt-0.5 text-teal-mist" aria-hidden>
                ✓
              </span>
              {item}
            </p>
          ))}
        </div>
        <div className="border-t border-white/10 px-5 py-3 text-center text-sm text-teal-mist md:px-8">
          Located inside {site.address.venue}, Woolwich
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Your visit
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Simple from first contact to recovery
            </h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {visitSteps.map((item) => (
              <li
                key={item.step}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-teal">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="testimonials"
        className="scroll-mt-24 border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Patient stories
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              What Our Patients Say
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Real feedback from people who came in for pain relief, specialist
              care, and a clearer path back to comfortable movement.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((review) => (
              <li
                key={review.name}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <p className="flex gap-0.5 text-teal" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, star) => (
                    <svg
                      key={star}
                      viewBox="0 0 20 20"
                      className="h-4 w-4 fill-current"
                      aria-hidden
                    >
                      <path d="M10 1.5 12.6 7l6 .5-4.5 4 1.4 5.8L10 14.8 4.5 17.3l1.4-5.8L1.4 7.5l6-.5L10 1.5Z" />
                    </svg>
                  ))}
                </p>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 md:text-[0.95rem]">
                  “{review.quote}”
                </blockquote>
                <footer className="mt-5 border-t border-slate-200 pt-4">
                  <p className="font-semibold text-navy">{review.name}</p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-teal-dark uppercase">
                    {review.treatment}
                  </p>
                </footer>
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-navy md:text-base">
            Google 5.0 ★ Rated Osteopathy Clinic in Woolwich
          </p>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 bg-white px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal/20 to-navy/10 blur-xl" />
            <Image
              src="/images/austin-nguyen.jpg"
              alt="Austin Duy Nguyen"
              width={560}
              height={700}
              className="relative float-soft w-full rounded-[1.5rem] object-cover object-top shadow-[0_24px_60px_rgba(11,44,69,0.14)]"
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
              {site.practitioner.title} · Reg No. {site.practitioner.regNo}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Master of Osteopathy graduate of the British College of
              Osteopathic Medicine — and the only Vietnamese osteopath
              practising in the UK. {site.name} exists so our community can find
              drug-free care they recognise, in a clinic built around root-cause
              treatment and dignity.
            </p>

            <div className="mt-8 inline-flex max-w-full items-center gap-3 rounded-xl border border-teal/30 bg-teal/5 px-4 py-3 text-sm font-medium text-navy sm:px-5">
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
            </div>

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
            <ButtonLink href="/services" variant="secondary">
              View all services
            </ButtonLink>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="service-tile group flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block text-lg font-semibold text-navy">
                          {service.title}
                        </span>
                        {service.badge ? (
                          <span className="mt-1.5 inline-flex rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-teal-dark uppercase">
                            {service.badge}
                          </span>
                        ) : null}
                      </span>
                      <span className="service-arrow text-slate-400" aria-hidden>
                        →
                      </span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-600">
                      {service.summary}
                    </span>
                    {service.relatedPricing ? (
                      <span className="mt-3 block text-xs font-semibold tracking-wide text-teal-dark">
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

          <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.6fr_0.8fr_0.5fr] bg-navy px-6 py-4 text-sm font-medium tracking-wide text-white md:grid">
              <span>Service & consultation</span>
              <span>Duration</span>
              <span className="text-right">Price</span>
            </div>
            <ul>
              {pricing.map((row, index) => (
                <li
                  key={row.service}
                  className={`grid gap-1 px-5 py-4 md:grid-cols-[1.6fr_0.8fr_0.5fr] md:items-center md:gap-4 md:px-6 ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <p className="font-medium text-navy">{row.service}</p>
                  <p className="text-sm font-medium text-slate-600">
                    {row.duration}
                  </p>
                  <p className="text-lg font-bold text-teal-dark md:text-right">
                    {row.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 rounded-xl border border-dashed border-teal/40 bg-teal/5 px-5 py-4 text-sm font-medium text-navy md:text-base">
            {site.discount}
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
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:border-teal hover:bg-white"
                >
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-display text-xl text-navy">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-24 border-t border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-24"
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
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section
        id="location"
        className="scroll-mt-24 border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Find us
            </p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
              Conveniently located inside {site.address.venue}
            </h2>
            <p className="mt-5 text-lg font-medium text-slate-700">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Providing NHS & Private Pharmacy Services on site.
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
              <ButtonLink href="/book" variant="secondary">
                Book an appointment
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
              Book your appointment
            </p>
            <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
              <li>
                <a href={site.phoneHref} className="hover:text-teal">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="hover:text-teal">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal"
                >
                  {site.website}
                </a>
              </li>
              <li>
                <a
                  href={site.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal"
                >
                  Facebook
                </a>
              </li>
              <li>
                <Link
                  href="/book"
                  className="font-semibold text-teal hover:text-teal-dark"
                >
                  Book online
                </Link>
              </li>
            </ul>
            <div className="mt-6 space-y-2 border-t border-slate-200 pt-5 text-sm font-medium text-slate-600">
              {site.hours.map((row) => (
                <p key={row.days}>
                  <span className="font-semibold text-navy">{row.days}:</span>{" "}
                  {row.time}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
