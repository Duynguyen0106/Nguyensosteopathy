import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import {
  GoogleReviewsFeed,
  GoogleReviewsFeedFallback,
} from "@/components/GoogleReviewsFeed";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { defaultOgImage, pageOpenGraph, trimDescription } from "@/lib/seo";
import { reviewAskWhatsAppHref, viBookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

const description = trimDescription(
  "Đánh giá Google cho phòng khám osteopathy Nguyễn tại Charlton SE7. Đọc phản hồi bệnh nhân và để lại đánh giá sau buổi khám với Austin Duy Nguyen, osteopath GOsC.",
);

export const metadata: Metadata = {
  title: "Đánh giá bệnh nhân",
  description,
  alternates: {
    canonical: "/vi/reviews",
    languages: {
      "vi-VN": "/vi/reviews",
      "en-GB": "/reviews",
      "x-default": "/reviews",
    },
  },
  openGraph: pageOpenGraph({
    title: "Đánh giá bệnh nhân | Nguyen's Osteopathic Clinic",
    description,
    url: "/vi/reviews",
    images: [defaultOgImage],
  }),
};

export default function ViReviewsPage() {
  const mapsUrl = site.googleReviewsUrl;
  const reviewAsk = reviewAskWhatsAppHref();

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    inLanguage: "vi-VN",
    name: `Đánh giá bệnh nhân — ${site.name}`,
    url: `${site.websiteUrl}/vi/reviews`,
    about: { "@id": `${site.websiteUrl}/#clinic` },
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="opening-hero-copy text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="opening-hero-copy opening-hero-delay-1 mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Đánh giá bệnh nhân
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Phản hồi công khai trên Google — và lời mời để lại đánh giá sau
            buổi khám. Austin là osteopath đăng ký GOsC; lời bệnh nhân giữ
            nguyên cách họ viết.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Xem Google reviews
            </ButtonLink>
            <ButtonLink href={viBookHref("reviews")} variant="secondary">
              Đặt lịch
            </ButtonLink>
            <ButtonLink href="/reviews" variant="secondary">
              English
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-navy px-5 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl md:text-3xl">
              Đã khám? Đánh giá của bạn giúp hàng xóm tìm dịch vụ.
            </p>
            <p className="mt-2 text-sm text-white/75 md:text-base">
              Phản hồi trung thực trên Google giúp người dân Charlton chọn
              osteopath tin cậy — đặc biệt cộng đồng Việt muốn khám bằng tiếng
              Việt.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={mapsUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Để lại đánh giá Google
            </ButtonLink>
            <ButtonLink
              href={reviewAsk}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gửi link qua WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>

      <Suspense fallback={<GoogleReviewsFeedFallback />}>
        <GoogleReviewsFeed locale="vi" />
      </Suspense>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-navy">
              Sẵn sàng đặt lịch?
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Đặt lịch online, hoặc{" "}
              <Link
                href="/contact"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                liên hệ
              </Link>{" "}
              nếu bạn còn câu hỏi trước khi giữ chỗ.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={viBookHref("reviews")}>Đặt lịch khám</ButtonLink>
            <ButtonLink href="/vi/fees" variant="secondary">
              Bảng giá
            </ButtonLink>
          </div>
        </div>
      </section>

      <TopicClusterNav clusterId="vietnamese" />
    </div>
  );
}
