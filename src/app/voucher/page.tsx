import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "4-Session Care Voucher",
  description:
    "Download the Nguyen's Osteopathic Clinic 4-session gift voucher PDF (£500 total value) — consultation and treatment including osteopathy, acupuncture, and focused shockwave.",
  alternates: { canonical: "/voucher" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "4-Session Care Voucher | Nguyen's Osteopathic Clinic",
    description:
      "Print-ready gift voucher: four clinic visits, £500 total value — Woolwich SE18.",
    url: "/voucher",
    images: [defaultOgImage],
  },
};

const pdfHref = "/voucher/nguyens-osteopathy-4-session-voucher.pdf";

export default function VoucherPage() {
  return (
    <div className="bg-slate-50">
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Print &amp; gift
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            4-session care voucher
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            A print-ready gift voucher for four clinic visits — consultation and
            treatment included (osteopathy, acupuncture, and focused shockwave).
            Total value £500.
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
          <h2 className="font-display text-3xl text-navy">What&apos;s included</h2>
          <ul className="mt-6 max-w-2xl space-y-3 text-base text-slate-700">
            <li className="flex gap-2">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              Four visits with consultation and treatment — total value £500
            </li>
            <li className="flex gap-2">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              Osteopathy, acupuncture, and focused shockwave
            </li>
            <li className="flex gap-2">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              Fill-in fields, session tracker, QR to book, and clinic terms on
              the reverse
            </li>
          </ul>
          <p className="mt-8 text-sm text-slate-600">
            Print at A6 landscape (148 × 105 mm), double-sided. Rebuild anytime
            with <code className="text-navy">npm run voucher</code>. Prefer the
            interactive site? See{" "}
            <Link href="/fees" className="font-semibold text-teal hover:text-teal-dark">
              fees
            </Link>{" "}
            or book at {site.address.venue}.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Nguyen's Osteopathic Clinic 4-session voucher preview"
              src={`${pdfHref}#view=FitH`}
              className="h-[70vh] w-full border-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
