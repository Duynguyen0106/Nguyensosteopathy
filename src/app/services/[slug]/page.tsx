import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { ServiceIcon } from "@/components/ServiceIcon";
import { getService, services, site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  const title = `${service.title} in Woolwich`;
  const description = `${service.summary} Book with Austin Duy Nguyen at Nguyen's Osteopathic Clinic, Woolwich.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 4);

  return (
    <div className="bg-slate-50 pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <Link
          href="/services"
          className="text-sm font-medium text-teal hover:text-teal-dark"
        >
          ← All services
        </Link>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-4xl text-navy md:text-5xl">
                {service.title}
              </h1>
              {service.badge ? (
                <span className="inline-flex rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold tracking-wide text-teal-dark uppercase">
                  {service.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {service.summary}
            </p>
            {service.relatedPricing ? (
              <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
                {service.relatedPricing}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3 md:pt-10">
            <ButtonLink href="/book">Book this treatment</ButtonLink>
            {service.slug === "focused-shockwave" ? (
              <ButtonLink href="/shockwave" variant="secondary">
                Full shockwave guide
              </ButtonLink>
            ) : null}
            {service.slug === "mens-health-ed" ? (
              <ButtonLink href="/mens-health" variant="secondary">
                Full men&apos;s health guide
              </ButtonLink>
            ) : null}
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 md:grid-cols-[1.4fr_0.8fr] md:px-8 md:pb-24">
        <div className="space-y-8">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-display text-2xl text-navy">About this treatment</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {service.description}
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-display text-2xl text-navy">Ideal for</h2>
            <ul className="mt-4 space-y-3">
              {service.idealFor.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700 md:text-base">
                  <span className="mt-1 text-teal" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-display text-2xl text-navy">What to expect</h2>
            <ol className="mt-4 space-y-4">
              {service.whatToExpect.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm text-slate-700 md:text-base">{item}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-teal/25 bg-teal/5 p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
              Book with confidence
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              No GP referral needed. Private one-to-one care with{" "}
              {site.practitioner.name}, GOsC Reg. No. {site.practitioner.regNo}.
            </p>
            <ButtonLink href="/book" className="mt-5 w-full">
              Book online
            </ButtonLink>
            <p className="mt-4 text-xs font-medium text-slate-600">{site.discount}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
              Related services
            </p>
            <ul className="mt-4 space-y-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex items-center justify-between gap-3 text-sm font-medium text-navy hover:text-teal"
                  >
                    <span>{item.title}</span>
                    <span className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
