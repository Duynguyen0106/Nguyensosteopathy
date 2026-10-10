import Link from "next/link";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="bg-slate-50 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
          That link may be out of date. Try booking, browsing services, or open
          the full site map.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/book" variant="secondary">
            Book online
          </ButtonLink>
          <ButtonLink href="/site-map" variant="secondary">
            Site map
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-slate-600">
          Popular:{" "}
          <Link href="/osteopathy" className="font-semibold text-teal hover:text-teal-dark">
            Osteopathy
          </Link>
          {" · "}
          <Link href="/back-neck" className="font-semibold text-teal hover:text-teal-dark">
            Back &amp; neck
          </Link>
          {" · "}
          <Link href="/desk-pain" className="font-semibold text-teal hover:text-teal-dark">
            Desk pain
          </Link>
          {" · "}
          <Link href="/shockwave" className="font-semibold text-teal hover:text-teal-dark">
            Shockwave
          </Link>
          {" · "}
          <Link href="/find-us" className="font-semibold text-teal hover:text-teal-dark">
            Find us
          </Link>
          {" · "}
          <Link href="/resources" className="font-semibold text-teal hover:text-teal-dark">
            Resources
          </Link>
          {" · "}
          <Link href="/contact" className="font-semibold text-teal hover:text-teal-dark">
            Contact
          </Link>
        </p>
      </div>
    </div>
  );
}
