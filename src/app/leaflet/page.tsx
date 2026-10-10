import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clinic Leaflet | Download Print PDF",
  description:
    "Download the Nguyen's Osteopathic Clinic leaflet PDF — services, fees overview, and Woolwich contact details for print or sharing.",
  alternates: { canonical: "/leaflet" },
  openGraph: {
    title: "Clinic Leaflet | Nguyen's Osteopathic Clinic",
    description: "Print-ready clinic leaflet PDF for Woolwich SE18.",
    url: "/leaflet",
  },
};

const pdfHref = "/leaflet/nguyens-osteopathy-leaflet.pdf";

export default function LeafletPage() {
  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Print &amp; share
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Clinic leaflet
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            A print-ready PDF with clinic details, key services, and how to book
            at {site.address.venue}, Woolwich.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={pdfHref} target="_blank" rel="noopener noreferrer">
              Download PDF
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book online
            </ButtonLink>
            <ButtonLink href="/fees" variant="secondary">
              Fees
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">What&apos;s inside</h2>
          <ul className="mt-6 max-w-2xl space-y-3 text-base text-slate-700">
            <li className="flex gap-2">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              Clinic address, phone, and booking path
            </li>
            <li className="flex gap-2">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              Overview of osteopathy and specialist options
            </li>
            <li className="flex gap-2">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              Useful for noticeboards, pharmacies, and community sharing
            </li>
          </ul>
          <p className="mt-8 text-sm text-slate-600">
            Prefer the interactive site? Browse{" "}
            <a href="/site-map" className="font-semibold text-teal hover:text-teal-dark">
              the site map
            </a>{" "}
            or{" "}
            <a href="/services" className="font-semibold text-teal hover:text-teal-dark">
              services
            </a>
            .
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Nguyen's Osteopathic Clinic leaflet preview"
              src={`${pdfHref}#view=FitH`}
              className="h-[70vh] w-full border-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
