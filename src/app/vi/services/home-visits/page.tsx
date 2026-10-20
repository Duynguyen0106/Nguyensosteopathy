import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { defaultOgImage, pageOpenGraph } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Khám osteopathy tại nhà · Woolwich & SE London",
  },
  description:
    "Khám osteopathy tại nhà gần Woolwich: buổi đầu £120 (60 phút), tái khám £100 (30 phút). Liên hệ Austin Duy Nguyen để xác nhận địa chỉ trước khi đặt.",
  alternates: {
    canonical: "/vi/services/home-visits",
    languages: {
      "vi-VN": "/vi/services/home-visits",
      "en-GB": "/services/home-visits",
      "x-default": "/services/home-visits",
    },
  },
  keywords: [
    "khám osteopathy tại nhà",
    "osteopath home visit Woolwich",
    "osteopath đến nhà SE18",
  ],
  openGraph: pageOpenGraph({
    title: "Khám osteopathy tại nhà · Woolwich",
    description:
      "Buổi đầu £120 (60 phút), tái khám £100 (30 phút). Phục vụ địa bàn gần Woolwich — xác nhận địa chỉ trước khi đặt.",
    url: "/vi/services/home-visits",
    images: [defaultOgImage],
    locale: "vi_VN",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Khám osteopathy tại nhà · Woolwich",
    description:
      "Buổi đầu £120 (60 phút), tái khám £100 (30 phút). Phục vụ địa bàn gần Woolwich.",
    images: [defaultOgImage.url],
  },
};

const faqs = [
  {
    q: "Giá khám tại nhà là bao nhiêu?",
    a: "Buổi đầu £120 trong 60 phút. Tái khám £100 trong 30 phút. Chúng tôi xác nhận địa chỉ trước khi hẹn.",
  },
  {
    q: "Có đặt online được không?",
    a: "Khám tại nhà sắp xếp qua điện thoại, WhatsApp hoặc liên hệ — để kiểm tra đường đi và lối vào. Lịch phòng khám vẫn đặt online.",
  },
  {
    q: "Phục vụ khu vực nào?",
    a: "Ưu tiên Woolwich và SE London lân cận. Gửi địa chỉ để chúng tôi xác nhận trước.",
  },
] as const;

export default function VietnameseHomeVisitsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "vi",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="bg-slate-50" lang="vi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/vi"
            className="text-sm font-medium text-teal hover:text-teal-dark"
          >
            ← Trang tiếng Việt
          </Link>
          <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Khám tại nhà · Woolwich &amp; SE London
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Osteopathy tại nhà khi khó đến phòng khám
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Đánh giá và điều trị tại địa chỉ của bạn khi đi lại khó — cùng tiêu
            chuẩn lâm sàng như tại St James Pharmacy, với bảng giá rõ ràng.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Ban đầu £120 (60 phút) · Tái khám £100 (30 phút)
          </p>
          <p className="mt-3 text-sm text-slate-500">
            <Link
              href="/services/home-visits"
              className="font-semibold text-teal hover:text-teal-dark"
              hrefLang="en-GB"
            >
              English
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.phoneHref}>Gọi {site.phone}</ButtonLink>
            <ButtonLink
              href={site.whatsappUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </ButtonLink>
            <ButtonLink href="/vi/book" variant="secondary">
              Đặt lịch tại phòng khám
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Khi nào nên chọn khám tại nhà
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              Phù hợp khi đi lại khó sau chấn thương, hạn chế vận động, đang
              hồi phục, hoặc khi ở nhà tiện hơn cho bạn / người chăm sóc. Chúng
              tôi xác nhận địa chỉ trước để thời gian di chuyển và lối vào rõ
              ràng.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Câu hỏi thường gặp
            </h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {faqs.map((item) => (
                <li key={item.q}>
                  <h3 className="font-semibold text-navy">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy">Liên hệ để hẹn</h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Gửi địa chỉ và nhu cầu qua điện thoại hoặc WhatsApp. Xem thêm{" "}
            <Link
              href="/vi/fees"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              bảng giá
            </Link>{" "}
            và{" "}
            <Link
              href="/vi/services/back-neck-pain"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              đau lưng &amp; cổ
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.phoneHref}>Gọi ngay</ButtonLink>
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
      </section>

      <TopicClusterNav clusterId="vietnamese" />
    </div>
  );
}
