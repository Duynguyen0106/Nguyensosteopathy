import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopathy Services in Woolwich | Back Pain & Shockwave Therapy",
  description:
    "Osteopathy services in Woolwich: back pain treatment, neck pain treatment, shockwave therapy, drug free pain relief, sports rehab, acupuncture, pregnancy support, and paediatric care.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Osteopathy Services in Woolwich | Back Pain & Shockwave Therapy",
    description:
      "Explore osteopathy, back pain treatment, neck pain treatment, and shockwave therapy at Nguyen's Osteopathic Clinic with Austin Duy Nguyen, GOsC-registered osteopath.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Clinical care
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Osteopathy services and treatments
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          From back pain treatment and neck pain treatment to shockwave therapy
          and drug free pain relief, every plan starts with why symptoms began —
          then we match hands-on osteopathy and clear advice to your goals.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={
                  service.slug === "focused-shockwave"
                    ? "/shockwave"
                    : service.slug === "mens-health-ed"
                      ? "/mens-health"
                      : service.slug === "pregnancy-support"
                        ? "/pregnancy"
                        : `/services/${service.slug}`
                }
                className="service-tile flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <ServiceIcon name={service.icon} />
                  </span>
                  {service.badge ? (
                    <span className="inline-flex rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-teal-dark uppercase">
                      {service.badge}
                    </span>
                  ) : null}
                </span>
                <span className="mt-5 flex items-start justify-between gap-3">
                  <span className="text-xl font-semibold text-navy">
                    {service.title}
                  </span>
                  <span className="service-arrow text-slate-400" aria-hidden>
                    →
                  </span>
                </span>
                <span className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.summary}
                </span>
                <span className="mt-4 line-clamp-3 text-sm text-slate-700">
                  {service.description}
                </span>
                {service.relatedPricing ? (
                  <span className="mt-5 text-xs font-semibold tracking-wide text-teal-dark">
                    {service.relatedPricing}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl text-navy">Ready to start?</p>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Book online, or call{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-teal hover:text-teal-dark"
              >
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
