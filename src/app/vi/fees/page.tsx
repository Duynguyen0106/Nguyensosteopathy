import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import {
  defaultOgImage,
  faqPageJsonLd,
  pageOpenGraph,
  trimDescription,
} from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { pricing, site } from "@/lib/site";

const feesDescription = trimDescription(
  "Bảng giá osteopathy Woolwich SE18: khám ban đầu £75, tái khám £60, khám tại nhà £120/£100, shockwave £90. Giảm 10% NHS & sinh viên.",
);

const viFeesFaqs = [
  {
    question: "Có phụ phí ẩn không?",
    answer:
      "Không. Loại lịch hẹn và mức phí được xác nhận trước khi điều trị. Add-on (châm cứu, giác hơi) chỉ dùng khi cần và đã thống nhất.",
  },
  {
    question: "Giảm giá NHS / sinh viên thế nào?",
    answer: `${site.discount} Xuất trình thẻ hợp lệ khi đến khám.`,
  },
  {
    question: "Có xuất hóa đơn bảo hiểm không?",
    answer:
      "Phòng khám nhận self-pay. Sau buổi khám có thể xin biên lai chi tiết để bạn tự claim với bảo hiểm hoặc cash-plan — kiểm tra quyền lợi với insurer trước.",
  },
  {
    question: "Chính sách hủy lịch?",
    answer: site.cancellation,
  },
] as const;

export const metadata: Metadata = {
  title: "Bảng giá osteopathy Woolwich",
  description: feesDescription,
  alternates: {
    canonical: "/vi/fees",
    languages: {
      "vi-VN": "/vi/fees",
      "en-GB": "/fees",
      "x-default": "/fees",
    },
  },
  openGraph: pageOpenGraph({
    title: "Bảng giá osteopathy Woolwich",
    description: feesDescription,
    url: "/vi/fees",
    images: [defaultOgImage],
    locale: "vi_VN",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Bảng giá osteopathy Woolwich",
    description: feesDescription,
    images: [defaultOgImage.url],
  },
};

const viLabels: Record<string, string> = {
  "Initial Consultation & Treatment": "Khám ban đầu & điều trị",
  "Follow-up Osteopathic Treatment": "Tái khám osteopathy",
  "Focused Shockwave Therapy (LI-ESWT)": "Shockwave tập trung (LI-ESWT)",
  "Specialist ED Treatment & Pelvic Protocol":
    "Điều trị ED / sàn chậu chuyên khoa",
  "Acupuncture / Electroacupuncture": "Châm cứu / điện châm (add-on)",
  "Deep Tissue Massage Therapy": "Massage mô sâu",
  "Cupping Therapy Add-on": "Giác hơi (add-on)",
  "Home Visit — Initial Consultation & Treatment":
    "Khám tại nhà — ban đầu & điều trị",
  "Home Visit — Follow-up Treatment": "Khám tại nhà — tái khám",
};

export default function VietnameseFeesPage() {
  const faqLd = faqPageJsonLd(viFeesFaqs, "vi");

  return (
    <div className="bg-slate-50" lang="vi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="hero-wash border-b border-slate-200 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Phí điều trị
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-navy md:text-6xl">
            Bảng giá rõ ràng
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Giá được xác nhận trước khi bắt đầu điều trị. Self-pay tại phòng
            khám; có thể hỏi bằng tiếng Việt qua điện thoại hoặc WhatsApp nếu
            bạn cần giải thích thời lượng buổi khám hoặc add-on.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            <Link
              href="/fees"
              className="font-semibold text-teal hover:text-teal-dark"
              hrefLang="en-GB"
            >
              English
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookHref("vi")}>Đặt lịch online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Gọi {site.phone}
            </ButtonLink>
            <ButtonLink href="/vi" variant="secondary">
              ← Trang tiếng Việt
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {pricing.map((row) => (
              <li
                key={row.service}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6"
              >
                <div>
                  <p className="font-semibold text-navy">
                    {viLabels[row.service] ?? row.service}
                  </p>
                  <p className="text-sm text-slate-500">{row.duration}</p>
                </div>
                <p className="text-lg font-semibold text-teal">{row.price}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div>
              <h2 className="text-lg font-semibold text-navy">Không phụ phí ẩn</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Loại lịch hẹn và mức phí được xác nhận trước khi điều trị. Add-on
                (châm cứu, giác hơi) chỉ dùng khi cần và đã thống nhất.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-navy">
                Giảm 10% NHS &amp; sinh viên
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {site.discount} Xuất trình thẻ hợp lệ khi đến khám.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-navy">Hủy lịch</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {site.cancellation}
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-3xl">
            <h2 className="font-display text-2xl text-navy">Câu hỏi về phí</h2>
            <dl className="mt-6 space-y-5">
              {viFeesFaqs.map((item) => (
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

          <p className="mt-10 text-sm text-slate-500">
            Bản tiếng Anh đầy đủ:{" "}
            <Link href="/fees" className="font-semibold text-teal hover:text-teal-dark">
              /fees
            </Link>
            {" · "}
            <Link
              href="/vi/book"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Đặt lịch
            </Link>
            .
          </p>
        </div>
      </section>

      <TopicClusterNav
        clusterId="vietnamese"
        intro="Các trang tiếng Việt liên quan — đặt lịch, dịch vụ và địa chỉ."
      />
    </div>
  );
}
