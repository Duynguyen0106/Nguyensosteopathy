import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { LazyMapsEmbed } from "@/components/LazyMapsEmbed";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { defaultOgImage, faqPageJsonLd, pageOpenGraph } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

const viFindFaqs = [
  {
    question: "Phòng khám có cửa riêng ngoài phố không?",
    answer:
      "Không. Vào St James Pharmacy & Travel Clinic, hỏi quầy — nhân viên sẽ chỉ phòng osteopathy bên trong.",
  },
  {
    question: "Osteopathy mở ngày nào?",
    answer:
      "Nhận lịch Thứ Hai, Ba, Năm, Sáu và Bảy. Đóng Thứ Tư và Chủ Nhật. Giờ mở cửa nhà thuốc (ra vào tòa nhà) có thể khác — luôn xem lịch online cho slot còn trống.",
  },
  {
    question: "Gửi xe ở đâu?",
    answer:
      "Có chỗ gửi xe ngắn hạn quanh trung tâm Woolwich / Powis Street. Đến sớm vài phút nếu cần tìm chỗ trống; Elizabeth line và DLR cũng gần.",
  },
  {
    question: "Đến từ Plumstead / Abbey Wood thế nào?",
    answer:
      "Elizabeth line, DLR hoặc National Rail tới Woolwich / Woolwich Arsenal rồi đi bộ ngắn đến 52 Powis Street. Nhiều tuyến xe buýt cũng dừng quanh trung tâm.",
  },
] as const;

export const metadata: Metadata = {
  title: "Địa chỉ osteopath Woolwich",
  description:
    "Tìm Nguyen's Osteopathic Clinic trong St James Pharmacy, 52 Powis Street, Woolwich SE18 — gửi xe, Elizabeth line, DLR, và hướng dẫn khi đến nơi.",
  alternates: {
    canonical: "/vi/find-us",
    languages: {
      "vi-VN": "/vi/find-us",
      "en-GB": "/find-us",
      "x-default": "/find-us",
    },
  },
  openGraph: pageOpenGraph({
    title: "Địa chỉ osteopath Woolwich",
    description:
      "Tìm phòng khám osteopathy trong St James Pharmacy, 52 Powis Street, Woolwich SE18 — gửi xe, Elizabeth line, DLR.",
    url: "/vi/find-us",
    images: [defaultOgImage],
    locale: "vi_VN",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Địa chỉ osteopath Woolwich",
    description:
      "Tìm phòng khám osteopathy trong St James Pharmacy, 52 Powis Street, Woolwich SE18 — gửi xe, Elizabeth line, DLR.",
    images: [defaultOgImage.url],
  },
};

const travel = [
  {
    title: "Elizabeth line, DLR & National Rail",
    body: "Xuống Woolwich / Woolwich Arsenal — đi bộ ngắn đến Powis Street. Hỏi quầy nhà thuốc khi vào.",
  },
  {
    title: "Xe buýt",
    body: "Nhiều tuyến dừng quanh trung tâm Woolwich. Đến số 52 Powis Street — St James Pharmacy & Travel Clinic.",
  },
  {
    title: "Gửi xe ngắn hạn",
    body: "Có chỗ gửi xe ngắn hạn ở trung tâm thị trấn. Đến sớm vài phút nếu cần tìm chỗ trống.",
  },
  {
    title: "Khi vào nhà thuốc",
    body: "Không có cửa riêng ngoài phố. Vào nhà thuốc, hỏi quầy — nhân viên sẽ chỉ phòng osteopathy.",
  },
] as const;

export default function VietnameseFindUsPage() {
  const faqLd = faqPageJsonLd(viFindFaqs, "vi");

  return (
    <div className="bg-slate-50" lang="vi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Địa chỉ · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Tìm chúng tôi &amp; gửi xe
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Trong {site.address.venue}, {site.address.line1}, {site.address.line2}{" "}
            — đi Elizabeth line, DLR, xe buýt, hoặc gửi xe ngắn hạn ở trung tâm.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            <Link
              href="/find-us"
              className="font-semibold text-teal hover:text-teal-dark"
              hrefLang="en-GB"
            >
              English
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mở Google Maps
            </ButtonLink>
            <ButtonLink href={bookHref("vi")} variant="secondary">
              Đặt lịch
            </ButtonLink>
            <ButtonLink href="/vi" variant="secondary">
              ← Trang tiếng Việt
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Bên trong phòng khám
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Không gian tư vấn và điều trị riêng trong nhà thuốc — nhân viên sẽ
            hướng dẫn sau khi bạn check-in ở quầy.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Image
              src="/images/clinic-room.webp"
              alt="Tổng quan phòng tư vấn và điều trị osteopathy"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="aspect-[4/3] w-full object-cover object-center"
            />
            <Image
              src="/images/clinic-treatment.webp"
              alt="Giường điều trị cạnh cửa sổ và chứng chỉ chuyên môn"
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="aspect-[4/3] w-full object-cover object-[center_20%]"
            />
            <Image
              src="/images/clinic-desk.webp"
              alt="Bàn tư vấn và sơ đồ giải phẫu trong phòng khám"
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="aspect-[4/3] w-full object-cover object-[center_25%]"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Cách đến
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {travel.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-navy">
                Giờ nhà thuốc (ra vào tòa nhà)
              </h3>
              <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
                {site.hours.map((row) => (
                  <li key={row.days}>
                    <span className="text-navy">{row.days}</span> · {row.time}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-navy">
                Ngày đặt lịch osteopathy
              </h3>
              <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
                {site.booking.hours.map((row) => (
                  <li key={row.days}>
                    <span className="text-navy">{row.days}</span> · {row.time}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Đóng {site.booking.closedDaysLabel}. Lịch trực tuyến luôn hiện
                khung giờ còn trống.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy">Câu hỏi khi đến khám</h2>
          <dl className="mt-6 space-y-5">
            {viFindFaqs.map((item) => (
              <div key={item.question}>
                <dt className="text-base font-semibold text-navy">
                  {item.question}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-navy">Bản đồ</h2>
              <p className="mt-2 text-sm text-slate-600">
                {site.address.line1}, Woolwich — trong nhà thuốc, không có cửa
                riêng ngoài phố.
              </p>
            </div>
            <ButtonLink
              href={site.address.mapsUrl}
              variant="navy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mở Google Maps
            </ButtonLink>
          </div>
          <div className="mt-8">
            <LazyMapsEmbed
              title="Bản đồ đến Nguyen's Osteopathic Clinic, 52 Powis Street Woolwich"
              src={site.address.mapsEmbedUrl}
            />
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Bản tiếng Anh đầy đủ:{" "}
            <Link
              href="/find-us"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              /find-us
            </Link>
            .
          </p>
        </div>
      </section>

      <TopicClusterNav
        clusterId="vietnamese"
        intro="Các trang tiếng Việt liên quan — đặt lịch, bảng giá và dịch vụ."
      />
    </div>
  );
}
