import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { defaultOgImage, pageOpenGraph } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Điều trị đau lưng & cổ tại Woolwich | Osteopath người Việt",
  },
  description:
    "Osteopathy cho đau lưng, đau cổ, sciatica và cứng cột sống tại Woolwich SE18. Austin Duy Nguyen — osteopath người Việt đăng ký GOsC. Đặt lịch không cần GP.",
  alternates: {
    canonical: "/vi/services/back-neck-pain",
    languages: {
      "vi-VN": "/vi/services/back-neck-pain",
      "en-GB": "/services/back-neck-pain",
      "x-default": "/services/back-neck-pain",
    },
  },
  keywords: [
    "đau lưng Woolwich",
    "đau cổ osteopath",
    "sciatica người Việt",
    "osteopath SE18",
  ],
  openGraph: pageOpenGraph({
    title: "Điều trị đau lưng & cổ tại Woolwich",
    description:
      "Osteopathy cho đau lưng, cổ và sciatica — khám bằng tiếng Việt tại Woolwich SE18.",
    url: "/vi/services/back-neck-pain",
    images: [defaultOgImage],
    locale: "vi_VN",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Điều trị đau lưng & cổ tại Woolwich",
    description:
      "Osteopathy cho đau lưng, cổ và sciatica — khám bằng tiếng Việt tại Woolwich SE18.",
    images: [defaultOgImage.url],
  },
};

const faqs = [
  {
    q: "Có cần giấy giới thiệu GP không?",
    a: "Không. Bạn có thể đặt lịch trực tiếp online hoặc gọi điện.",
  },
  {
    q: "Buổi đầu kéo dài bao lâu?",
    a: "Khoảng 60 phút — hỏi bệnh sử, khám vận động, giải thích và bắt đầu điều trị khi phù hợp.",
  },
  {
    q: "Chi phí thế nào?",
    a: "Khám ban đầu £75 (60 phút); tái khám £60. Xem bảng giá đầy đủ trên trang tiếng Việt.",
  },
  {
    q: "Có nói tiếng Việt không?",
    a: "Có. Austin tư vấn bằng tiếng Việt hoặc tiếng Anh theo lựa chọn của bạn.",
  },
] as const;

export default function VietnameseBackNeckPage() {
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
            Đau lưng &amp; cổ · Woolwich SE18
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Điều trị đau lưng &amp; cổ tại Woolwich
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Osteopathy đánh giá tư thế, khớp và mô mềm — cho sciatica, đau do
            ngồi máy, cứng cột sống và đau cổ vai. Khám trong St James Pharmacy
            trên Powis Street.
          </p>
          <p className="mt-4 text-sm font-bold tracking-wide text-teal-dark">
            Ban đầu £75 (60 phút) · Tái khám £60 · Không cần GP referral
          </p>
          <p className="mt-3 text-sm text-slate-500">
            <Link
              href="/services/back-neck-pain"
              className="font-semibold text-teal hover:text-teal-dark"
              hrefLang="en-GB"
            >
              English
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/vi/book">Đặt lịch</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Gọi {site.phone}
            </ButtonLink>
            <ButtonLink href="/vi/fees" variant="secondary">
              Bảng giá
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Vì sao đau lưng và cổ kéo dài
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              Đau thường bắt đầu sau tuần làm việc ngồi nhiều, bê đồ, đi lại
              xa, hoặc khi cơ thể trở nên cứng và “giữ” tư thế. Chúng tôi tìm
              nguyên nhân cơ học — không chỉ giảm triệu chứng tạm thời — rồi lập
              kế hoạch điều trị và lời khuyên tại nhà rõ ràng.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Phù hợp với công việc thực tế
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              Thợ nails, nhà hàng, kho hàng và công việc chăm sóc thường mang
              cổ, vai, cổ tay và lưng về nhà sau ca. Bạn có thể mô tả công việc
              và triệu chứng bằng tiếng Việt để kế hoạch điều trị sát thực tế
              hơn.
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
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-navy">Đặt lịch khám</h2>
            <p className="mt-3 text-base text-slate-600">
              {site.address.venue}, {site.address.line1}.{" "}
              <Link
                href="/vi/find-us"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                Hướng dẫn đường đi
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={bookHref("vi")}>Đặt lịch online</ButtonLink>
            <ButtonLink href="/vi/services/home-visits" variant="secondary">
              Khám tại nhà
            </ButtonLink>
          </div>
        </div>
      </section>

      <TopicClusterNav clusterId="vietnamese" />
    </div>
  );
}
