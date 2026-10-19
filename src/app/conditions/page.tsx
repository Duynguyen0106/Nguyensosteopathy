import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import {
  conditionRegions,
  getConditionsByRegion,
  getFeaturedConditions,
} from "@/lib/conditions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions We Treat",
  description:
    "Musculoskeletal conditions we help with at Nguyen's Osteopathic Clinic in Woolwich — neck, back, hip, knee, shoulder, elbow, wrist, and foot — with clear…",
  alternates: { canonical: "/conditions" },
  openGraph: {
    title: "Conditions We Treat | Nguyen's Osteopathic Clinic",
    description:
      "Explore the MSK conditions catalogue we treat in Woolwich SE18, organised by body region.",
    url: "/conditions",
  },
};

export default function ConditionsIndexPage() {
  const featured = getFeaturedConditions();

  return (
    <div className="bg-slate-50 pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Clinical focus
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Conditions we help with
        </h1>

        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
          <p>
            Looking for osteopathic treatment in Woolwich for pain that will not
            settle? This index gathers the musculoskeletal conditions in SE18
            that we assess and treat most often at {site.name}, inside{" "}
            {site.address.venue} on {site.address.line1}. Care is provided by{" "}
            {site.practitioner.name}, a GOsC-registered osteopath (Reg. No.{" "}
            {site.practitioner.regNo}), with a focus on clear diagnosis of what
            is driving your symptoms — and a practical plan you can keep on a
            real week of work, commuting, or sport.
          </p>
          <p>
            People travel from Woolwich, Plumstead, Abbey Wood, Thamesmead,
            Charlton, and Greenwich with back pain, neck stiffness, sciatica,
            shoulder restriction, heel pain, tennis elbow, and other mechanical
            problems. Some arrive after a flare from desk work or lifting;
            others have lived with on–off symptoms for months. You do not need a
            GP referral to book. Our role is to examine joints, soft tissue, and
            movement patterns, explain findings in plain English, and match
            hands-on care to how irritable your presentation is today.
          </p>
          <p>
            Use the guides below to understand common signs, what osteopathy may
            involve, and when medical review should come first. Each condition
            page links to related problems, FAQs, and booking. If your exact
            label is not listed, start with the closest body region — many
            presentations overlap — or book an assessment so we can place your
            symptoms in clinical context rather than guessing from a search
            result alone. Whether you are dealing with a fresh flare or a
            long-standing ache, the aim is the same: reduce pain, restore
            confident movement, and give you a clear next step.
          </p>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          Conditions are grouped by body region — cervical, thoracic, lumbar,
          pelvis and hip, knee, ankle and foot, shoulder, elbow and wrist, plus
          whole-body presentations — so you can scan the area that matches where
          you feel pain or restriction, then open the guide that fits best.
        </p>

        <div className="mt-10 max-w-3xl">
          <h2 className="font-display text-2xl text-navy">How we treat</h2>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-teal" aria-hidden>
                ✓
              </span>
              Thorough history and hands-on assessment of the joints, soft
              tissue, and movement patterns involved — with red-flag screening
              when needed.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-teal" aria-hidden>
                ✓
              </span>
              Gentle osteopathic techniques matched to irritability and stage,
              never forced into sharp pain.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-teal" aria-hidden>
                ✓
              </span>
              Clear advice on pacing, workstation or shift tweaks, and what to
              do between visits so progress sticks.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-teal" aria-hidden>
                ✓
              </span>
              Honest next steps — including when GP review, imaging, or urgent
              care is more appropriate than hands-on treatment alone.
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <h2 className="font-display text-2xl text-navy">Popular guides</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((condition) => (
            <li key={condition.slug}>
              <Link
                href={`/conditions/${condition.slug}`}
                className="service-tile flex h-full flex-col rounded-xl border border-teal/30 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                  {condition.region}
                </span>
                <span className="mt-2 text-lg font-semibold text-navy">
                  {condition.shortTitle}
                </span>
                <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {condition.summary}
                </span>
                <span className="mt-4 text-sm font-semibold text-teal">
                  Read guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-5 pb-20 md:px-8">
        {conditionRegions.map((region) => {
          const list = getConditionsByRegion(region);
          if (list.length === 0) return null;
          return (
            <section key={region} id={region.toLowerCase().replace(/\s+/g, "-")}>
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                {region}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {list.length} condition{list.length === 1 ? "" : "s"}
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((condition) => (
                  <li key={condition.slug}>
                    <Link
                      href={`/conditions/${condition.slug}`}
                      className="flex h-full flex-col rounded-lg border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-teal/40 hover:bg-teal/5"
                    >
                      <span className="font-semibold text-navy">
                        {condition.shortTitle}
                      </span>
                      <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {condition.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <div className="rounded-xl border border-teal/25 bg-teal/5 px-5 py-8 md:px-8">
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            Ready for assessment?
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Book online with {site.practitioner.name} at {site.name} — no GP
            referral needed. Prefer to talk first? Call {site.phone}.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ButtonLink
              href="/book"
              variant="navy"
              className="min-h-12 px-6 py-3 text-base font-bold tracking-wide"
            >
              Book Now
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Call {site.phone}
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              View all services
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
