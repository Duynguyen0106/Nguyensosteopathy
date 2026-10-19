import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pavement & Window Posters",
  description:
    "Download print-ready A1 and A2 pavement A-board posters, plus the A3 pharmacy-window poster, for Nguyen's Osteopathic Clinic in Woolwich.",
  alternates: { canonical: "/poster" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Print posters | Nguyen's Osteopathic Clinic",
    description:
      "A1 and A2 pavement signs plus A3 window poster PDFs for Woolwich SE18.",
    url: "/poster",
  },
};

const posters = [
  {
    size: "A1",
    use: "Pavement A-board (large)",
    dims: "594 × 841 mm",
    href: "/poster/nguyens-osteopathy-poster-a1.pdf",
  },
  {
    size: "A2",
    use: "Pavement A-board (standard)",
    dims: "420 × 594 mm",
    href: "/poster/nguyens-osteopathy-poster-a2.pdf",
  },
  {
    size: "A3",
    use: "Pharmacy window / noticeboard",
    dims: "297 × 420 mm",
    href: "/poster/nguyens-osteopathy-poster-a3.pdf",
  },
] as const;

export default function PosterPage() {
  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="opening-hero-copy text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Print &amp; pavement
          </p>
          <h1 className="opening-hero-copy opening-hero-delay-1 mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Clinic posters
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Print-ready PDFs for pavement A-boards and the pharmacy window —
            brand-first, distance-readable, with phone and booking QR for{" "}
            {site.address.venue}, Woolwich.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/poster/nguyens-osteopathy-poster-a2.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download A2 pavement PDF
            </ButtonLink>
            <ButtonLink href="/leaflet" variant="secondary">
              Clinic leaflet
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Sizes</h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Same layout language across sizes: logo, one headline, phone, QR,
            address, and hours. Print full-bleed on matte stock; laminate for
            outdoor A-boards.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {posters.map((poster) => (
              <li
                key={poster.size}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">
                  {poster.size}
                </p>
                <h3 className="mt-2 font-display text-2xl text-navy">
                  {poster.use}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{poster.dims}</p>
                <div className="mt-6">
                  <ButtonLink
                    href={poster.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    Download {poster.size} PDF
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="A2 pavement poster preview"
              src="/poster/nguyens-osteopathy-poster-a2.pdf#view=FitH"
              className="h-[70vh] w-full border-0"
            />
          </div>

          <p className="mt-8 text-sm text-slate-600">
            Prefer a foldable handout? See the{" "}
            <Link
              href="/leaflet"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              clinic leaflet
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
