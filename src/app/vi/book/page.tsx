import type { Metadata } from "next";
import Link from "next/link";
import { BookingEmbed } from "@/components/BookingEmbed";
import { ButtonLink } from "@/components/Button";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { defaultOgImage, pageOpenGraph } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Đặt lịch osteopathy Woolwich | Phòng khám Xương khớp Nguyễn",
  },
  description:
    "Đặt lịch osteopathy online tại Woolwich SE18 với Austin Duy Nguyen — osteopath người Việt đăng ký GOsC. Không cần GP referral. Gọi hoặc WhatsApp nếu cần hỗ trợ.",
  alternates: {
    canonical: "/vi/book",
    languages: {
      "vi-VN": "/vi/book",
      "en-GB": "/book",
      "x-default": "/book",
    },
  },
  openGraph: pageOpenGraph({
    title: "Đặt lịch osteopathy Woolwich",
    description:
      "Đặt lịch online với osteopath người Việt tại Woolwich SE18 — không cần GP referral.",
    url: "/vi/book",
    images: [defaultOgImage],
    locale: "vi_VN",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Đặt lịch osteopathy Woolwich",
    description:
      "Đặt lịch online với osteopath người Việt tại Woolwich SE18 — không cần GP referral.",
    images: [defaultOgImage.url],
  },
};

export default function VietnameseBookPage() {
  return (
    <div className="bg-slate-50 pt-8 md:pt-12" lang="vi">
      <div className="mx-auto max-w-6xl px-5 pb-6 md:px-8 md:pb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          Đặt lịch online
        </p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl text-navy md:text-5xl">
              Đặt lịch khám
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
              Chọn khung giờ phù hợp. Muốn hỏi trước? Gọi hoặc WhatsApp — chúng
              tôi hỗ trợ bằng tiếng Việt hoặc tiếng Anh.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/vi" variant="secondary">
              Trang tiếng Việt
            </ButtonLink>
            <Link
              href="/book"
              className="inline-flex items-center text-sm font-semibold text-teal hover:text-teal-dark"
              hrefLang="en-GB"
            >
              English
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-teal/30 bg-teal/5 px-5 py-5 md:px-6">
          <p className="text-sm font-semibold tracking-wide text-teal-dark uppercase">
            Ngày nhận lịch
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
            {site.booking.note}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Khám tại nhà?{" "}
            <Link
              href="/vi/services/home-visits"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Xem khám tại nhà →
            </Link>{" "}
            (liên hệ để xác nhận địa chỉ, không đặt qua lịch online).
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={site.phoneHref} variant="secondary">
            Gọi {site.phone}
          </ButtonLink>
          <ButtonLink
            href={site.whatsappUrl}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </ButtonLink>
          <ButtonLink href="/vi/fees" variant="secondary">
            Bảng giá
          </ButtonLink>
        </div>
      </div>

      <BookingEmbed />

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <p className="text-sm text-slate-600">
          Bệnh nhân mới?{" "}
          <Link
            href={bookHref("vi")}
            className="font-semibold text-teal hover:text-teal-dark"
          >
            Lịch tiếng Anh
          </Link>
          {" · "}
          <Link
            href="/vi/find-us"
            className="font-semibold text-teal hover:text-teal-dark"
          >
            Địa chỉ &amp; gửi xe
          </Link>
          {" · "}
          <Link
            href="/vi/about"
            className="font-semibold text-teal hover:text-teal-dark"
          >
            Về Austin
          </Link>
        </p>
      </div>

      <TopicClusterNav
        clusterId="vietnamese"
        intro="Các trang tiếng Việt liên quan — đặt lịch, dịch vụ, và địa chỉ."
      />
    </div>
  );
}
