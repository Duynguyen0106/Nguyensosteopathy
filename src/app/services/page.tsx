import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore osteopathy, shockwave therapy, acupuncture, massage, pregnancy support, and paediatric care at Nguyen's Osteopathic Clinic.",
};

export default function ServicesPage() {
  return (
    <div className="bg-background pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Clinical care
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Services & treatments
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Every treatment plan starts with understanding why symptoms started —
          then we match hands-on care, adjunct therapies, and clear advice to
          your goals.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="service-tile flex h-full flex-col rounded-2xl border border-line bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <ServiceIcon name={service.icon} />
                </span>
                <span className="mt-5 flex items-start justify-between gap-3">
                  <span className="text-xl font-semibold text-navy">
                    {service.title}
                  </span>
                  <span className="service-arrow text-navy/35" aria-hidden>
                    →
                  </span>
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted">
                  {service.summary}
                </span>
                <span className="mt-4 text-sm text-ink/80 line-clamp-3">
                  {service.description}
                </span>
                {service.relatedPricing ? (
                  <span className="mt-5 text-xs font-semibold tracking-wide text-teal">
                    {service.relatedPricing}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white px-5 py-6">
          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl text-navy">Ready to start?</p>
            <p className="mt-1 text-sm text-muted">
              Book online, or call{" "}
              <a href={site.phoneHref} className="font-medium text-teal hover:text-teal-dark">
                {site.phone}
              </a>{" "}
              for help choosing the right appointment.
            </p>
          </div>
          <ButtonLink href="/book">Book an appointment</ButtonLink>
        </div>
      </div>
    </div>
  );
}
