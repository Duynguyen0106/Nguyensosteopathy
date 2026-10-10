import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { siteMapGroups } from "@/lib/site-map";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Site Map",
  description: `HTML site map for ${site.name} — book, treatments, conditions, areas, and clinic information for Woolwich SE18.`,
  alternates: { canonical: "/site-map" },
  openGraph: {
    title: "Site Map",
    description: "Browse all main pages on Nguyen's Osteopathic Clinic website.",
    url: "/site-map",
  },
};

export default function SiteMapPage() {
  return (
    <div className="bg-slate-50 px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Navigate
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Site map
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Every main page on {site.name} — from booking and fees to treatments,
          conditions, and local areas.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/book">Book online</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {siteMapGroups.map((group) => (
            <section key={group.title}>
              <h2 className="font-display text-2xl text-navy">{group.title}</h2>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-teal hover:text-teal-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
