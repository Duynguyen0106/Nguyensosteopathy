import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cupping add-on in Woolwich",
  description:
    "Cupping therapy add-on (+£15) in Woolwich SE18 for muscular tightness — used when clinically useful alongside osteopathy or deep tissue massage at Nguyen's…",
  alternates: { canonical: "/cupping" },
  keywords: [
    "cupping Woolwich",
    "cupping therapy SE18",
    "cupping add-on osteopath",
    "cupping vs massage Woolwich",
    "myofascial cupping London",
  ],
  openGraph: {
    title: "Cupping Therapy Add-on | Nguyen's Osteopathic Clinic",
    description:
      "Optional cupping add-on (+£15) for muscular tightness in Woolwich SE18 — used only when clinically useful alongside osteopathy or deep tissue massage.",
    url: "/cupping",
    images: [defaultOgImage],
  },
};

const points = [
  {
    title: "What it is",
    body: "Cupping uses suction to lift soft tissue. It can help local muscular tightness and is offered only when it fits your presentation.",
  },
  {
    title: "Marks are temporary",
    body: "Circular marks can appear and usually fade over several days. We explain this before treatment so there are no surprises.",
  },
  {
    title: "Add-on, not a standalone spa ritual",
    body: "At Nguyen's, cupping supports osteopathy or deep tissue work — it is not sold as a wellness package without assessment.",
  },
  {
    title: "Fee",
    body: "Cupping therapy add-on is +£15 when agreed. Main session fees are listed on the fees page.",
  },
] as const;

export default function CuppingPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Cupping Therapy Add-on in Woolwich",
    url: `${site.websiteUrl}/cupping`,
    description:
      "Cupping therapy add-on for muscular tightness in Woolwich SE18.",
    about: {
      "@type": "MedicalTherapy",
      name: "Cupping therapy",
    },
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Soft-tissue add-on · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Cupping therapy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Optional suction-based soft-tissue care for muscular tightness —
            added only when clinically useful and agreed with you.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Add-on +£15 · Often paired with osteopathy or deep tissue massage
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/services/deep-tissue-massage" variant="secondary">
              Deep tissue massage
            </ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            When we consider cupping
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {points.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            What to expect on the day
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            After history and examination, Austin explains whether cupping is
            likely to help the tissues you present with. Cups are placed for a
            short period; you may feel a pulling sensation rather than sharp
            pain. Temporary circular marks are common and usually fade over a
            few days — we check clothing and work plans first if marks would be
            a problem.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Cupping is never billed as a surprise. If we agree to add it, the
            +£15 fee is confirmed before treatment continues. Prefer hands-on
            osteopathy or massage alone? That is always fine — cupping is an
            option, not a package requirement.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Next steps</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Book an osteopathy or massage appointment and we will discuss whether
            cupping is useful on the day — never pressure, always clinical judgement.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Related:{" "}
            <Link
              href="/blog/cupping-therapy-add-on-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Cupping add-on guide
            </Link>
            {" · "}
            <Link
              href="/blog/cupping-vs-massage-woolwich"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Cupping vs massage
            </Link>
            {" · "}
            <Link
              href="/services/acupuncture-electro"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Acupuncture
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book online</ButtonLink>
            <ButtonLink href="/services/back-neck-pain" variant="secondary">
              Back &amp; neck
            </ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Find us
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
