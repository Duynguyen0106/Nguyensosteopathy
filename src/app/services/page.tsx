import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ServiceIcon } from "@/components/ServiceIcon";
import { getServiceHref, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Osteopathy Services in Woolwich",
  description:
    "Osteopathy services in Woolwich: back pain treatment, neck pain treatment, shockwave therapy, drug free pain relief, sports rehab, acupuncture, pregnancy…",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Osteopathy Services in Woolwich | Back Pain & Shockwave Therapy",
    description:
      "Explore osteopathy, back pain treatment, neck pain treatment, and shockwave therapy at Nguyen's Osteopathic Clinic with Austin Duy Nguyen, GOsC-registered osteopath.",
    url: "/services",
    images: [defaultOgImage],
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
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Most people come for a clear diagnosis of load, posture, or soft-tissue
          irritation — not a one-size-fits-all package. Initial visits are usually
          60 minutes so we can examine how your spine, hips, and shoulders share
          work; follow-ups are shorter and focused on the findings that matter.
          You can book without a GP referral, and we explain options (including
          when not to treat) in plain English — or Vietnamese when that helps.
        </p>
        <p className="mt-4 text-sm text-slate-600">
          New here?{" "}
          <Link href="/osteopathy" className="prose-link">
            What is osteopathy?
          </Link>
          {" · "}
          <Link href="/desk-pain" className="prose-link">
            Desk &amp; office pain
          </Link>
          {" · "}
          <Link href="/fees" className="prose-link">
            Fees
          </Link>
          {" · "}
          <Link href="/new-patients" className="prose-link">
            New patient guide
          </Link>
        </p>
      </div>

      <section className="border-y border-slate-200 bg-white px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-navy">How we choose care</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Assessment first. Hands-on osteopathy is the core; acupuncture,
              cupping, or focused shockwave are added only when they fit the
              tissue problem and you agree the fee.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-navy">Who we see</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Desk workers, trades, runners, peri-natal patients, and people
              managing recurrent flare-ups. Red-flag symptoms are screened; we
              refer on when imaging or medical review is the safer next step.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-navy">Where you are seen</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Inside {site.address.venue} on Powis Street, Woolwich SE18 — private
              room, pharmacy reception on arrival.{" "}
              <Link href="/find-us" className="prose-link">
                Parking &amp; travel
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-8">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          All treatments
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          Open any service for who it helps, what to expect, and how it sits
          beside related fees.
        </p>
        <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {services.map((service) => (
            <li key={service.slug} className="min-w-0">
              <Link
                href={getServiceHref(service.slug)}
                className="group flex gap-3 py-5 transition-colors hover:bg-white/70 sm:gap-4 sm:py-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <ServiceIcon name={service.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block text-lg font-semibold text-navy group-hover:text-teal sm:text-xl">
                        {service.title}
                      </span>
                      {service.badge ? (
                        <span className="mt-1 inline-flex text-[11px] font-semibold tracking-wide text-teal-dark uppercase">
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

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 max-w-xl">
            <p className="font-display text-2xl text-navy">Ready to start?</p>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Book online, or call{" "}
              <a href={site.phoneHref} className="prose-link">
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
