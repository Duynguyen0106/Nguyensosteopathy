import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ServiceIcon } from "@/components/ServiceIcon";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { getConditionsForService } from "@/lib/conditions";
import {
  getServiceWithPage,
  relatedServices,
  servicePages,
} from "@/lib/service-pages";
import {
  breadcrumbJsonLd,
  fitSerpTitle,
  trimDescription,
  defaultOgImage,
} from "@/lib/seo";
import {
  serviceBookCampaign,
  serviceClusterId,
  viServiceTwins,
  bookHref,
} from "@/lib/seo-strategy";
import { getServiceHref, services, site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getServiceWithPage(slug);
  if (!data) return { title: "Service" };

  const { page } = data;
  const title = fitSerpTitle(page.seoTitle);
  const description = trimDescription(page.metaDescription);
  const path = `/services/${page.slug}`;
  const hasViTwin = viServiceTwins.has(page.slug);
  const ogTitle =
    typeof title === "string" ? `${title} | ${site.name}` : title.absolute;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      ...(hasViTwin
        ? {
            languages: {
              "en-GB": path,
              "vi-VN": `/vi/services/${page.slug}`,
              "x-default": path,
            },
          }
        : {}),
    },
    keywords: page.keywords,
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      images: [defaultOgImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = getServiceWithPage(slug);
  if (!data) notFound();

  const { service, page } = data;
  const related = relatedServices(page.relatedSlugs);
  const relatedConditions = getConditionsForService(service.slug, 6);
  const moreServices = services
    .filter(
      (item) =>
        item.slug !== service.slug &&
        !page.relatedSlugs.includes(item.slug),
    )
    .slice(0, 3);
  const bookUrl = bookHref(serviceBookCampaign(service.slug));
  const clusterId = serviceClusterId(service.slug);
  const hasViTwin = viServiceTwins.has(service.slug);

  /** Service-focused MedicalWebPage — clinic identity lives sitewide at /#clinic. */
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${site.websiteUrl}/services/${service.slug}#webpage`,
    url: `${site.websiteUrl}/services/${service.slug}`,
    name: page.seoTitle,
    description: page.metaDescription,
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
    about: {
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.summary,
      url: `${site.websiteUrl}/services/${service.slug}`,
    },
    provider: { "@id": `${site.websiteUrl}/#clinic` },
    mainEntity: {
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.summary,
      url: `${site.websiteUrl}/services/${service.slug}`,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const crumbsLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/services"
            className="text-sm font-medium text-teal hover:text-teal-dark"
          >
            ← All services
          </Link>
          <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            {page.eyebrow}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>
            {service.badge ? (
              <span className="inline-flex rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold tracking-wide text-teal-dark uppercase">
                {service.badge}
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {page.heroLine}
          </p>
          {service.relatedPricing ? (
            <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
              {service.relatedPricing} · No GP referral needed
            </p>
          ) : null}
          {hasViTwin ? (
            <p className="mt-3 text-sm text-slate-500">
              <Link
                href={`/vi/services/${service.slug}`}
                className="font-semibold text-teal hover:text-teal-dark"
                hrefLang="vi-VN"
              >
                Tiếng Việt →
              </Link>
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookUrl}>Book this treatment</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
            {service.slug === "sports-injury-rehab" ? (
              <ButtonLink href="/exercises" variant="secondary">
                Home exercise library
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.4fr_0.8fr] md:px-8 md:py-20">
        <div className="space-y-10 md:space-y-12">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-base leading-relaxed text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-slate-200 pt-10">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Ideal for
            </h2>
            <ul className="mt-4 space-y-3">
              {service.idealFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-slate-700 md:text-base"
                >
                  <span className="mt-1 text-teal" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-slate-200 pt-10">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              What to expect
            </h2>
            <ol className="mt-4 space-y-4">
              {service.whatToExpect.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm text-slate-700 md:text-base">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-t border-slate-200 pt-10">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Quick answers about {service.title.toLowerCase()} at our Woolwich
              clinic.
            </p>
            <FaqAccordion items={page.faqs} />
          </section>
        </div>

        <aside className="space-y-8 border-t border-slate-200 pt-8 md:sticky md:top-28 md:self-start md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
              Book with confidence
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              No GP referral needed. Private one-to-one care with{" "}
              {site.practitioner.name}, GOsC Reg. No. {site.practitioner.regNo}.
            </p>
            <ButtonLink href={bookUrl} className="mt-5 w-full">
              Book online
            </ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              className="mt-3 w-full"
            >
              Call {site.phone}
            </ButtonLink>
            <p className="mt-4 text-xs font-medium text-slate-600">
              {site.discount}
            </p>
          </div>

          {service.slug === "sports-injury-rehab" ? (
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                Between sessions
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Browse illustrated rehab programmes for knee, ankle, shoulder and
                more — then refine the plan in clinic around your sport.
              </p>
              <ButtonLink href="/exercises" className="mt-5 w-full">
                Open exercise library
              </ButtonLink>
            </div>
          ) : null}

          {relatedConditions.length > 0 ? (
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
                Related conditions
              </p>
              <ul className="mt-4 space-y-1">
                {relatedConditions.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/conditions/${item.slug}`}
                      className="group flex min-h-11 items-center justify-between gap-3 text-sm font-medium text-navy hover:text-teal"
                    >
                      <span>{item.shortTitle}</span>
                      <span className="text-slate-400 motion-safe:transition group-hover:translate-x-0.5 group-hover:text-teal">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/conditions"
                className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-teal hover:text-teal-dark"
              >
                View all conditions →
              </Link>
            </div>
          ) : null}

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
              Related services
            </p>
            <ul className="mt-4 space-y-1">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className="group flex min-h-11 items-center justify-between gap-3 text-sm font-medium text-navy hover:text-teal"
                  >
                    <span>{item.title}</span>
                    <span className="text-slate-400 motion-safe:transition group-hover:translate-x-0.5 group-hover:text-teal">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {moreServices.length > 0 ? (
              <ul className="mt-2 space-y-1 border-t border-slate-100 pt-2">
                {moreServices.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={getServiceHref(item.slug)}
                      className="flex min-h-11 items-center text-sm font-medium text-slate-600 hover:text-teal"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <Link
              href="/services"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-teal hover:text-teal-dark"
            >
              View all services →
            </Link>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
              Visit us
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {site.address.venue}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <ButtonLink href="/find-us" variant="secondary" className="mt-5 w-full">
              Find us &amp; parking
            </ButtonLink>
          </div>
        </aside>
      </div>

      <section className="border-t border-slate-200 bg-navy px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl text-white md:text-4xl">
              Ready to book {service.title.toLowerCase()}?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Online booking shows live availability at our Woolwich clinic.
              Prefer to talk first? Call or WhatsApp and we will help you choose
              the right appointment.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={bookUrl} variant="onDark">
              Book online
            </ButtonLink>
            <ButtonLink
              href={site.whatsappUrl}
              variant="onDarkOutline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>

      {clusterId ? <TopicClusterNav clusterId={clusterId} /> : null}
    </div>
  );
}
