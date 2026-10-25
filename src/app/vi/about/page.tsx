import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { TopicClusterNav } from "@/components/TopicClusterNav";
import { defaultOgImage, faqPageJsonLd, pageOpenGraph } from "@/lib/seo";
import { bookHref } from "@/lib/seo-strategy";
import { site } from "@/lib/site";

const viAboutFaqs = [
  {
    question: "Austin có đăng ký GOsC không?",
    answer: `Có. Austin Duy Nguyen là osteopath Fully Registered với General Osteopathic Council — số ${site.practitioner.regNo}. Bạn có thể xác minh trên sổ đăng ký GOsC công khai.`,
  },
  {
    question: "Có khám bằng tiếng Việt không?",
    answer:
      "Có. Bạn có thể mô tả triệu chứng và hỏi đáp bằng tiếng Việt hoặc tiếng Anh — chọn ngôn ngữ bạn thấy thoải mái nhất.",
  },
  {
    question: "Phòng khám ở đâu?",
    answer: `Trong ${site.address.venue}, ${site.address.line1}, ${site.address.line2}. Vào nhà thuốc và hỏi quầy — họ sẽ chỉ phòng osteopathy.`,
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "Về Austin Duy Nguyen | Osteopath người Việt tại Woolwich",
  },
  description:
    "Austin Duy Nguyen — osteopath đăng ký GOsC (số 12332), Master of Osteopathy (BCOM). Phòng khám phục vụ cộng đồng Việt tại Woolwich SE18 bằng tiếng Việt và Anh.",
  alternates: {
    canonical: "/vi/about",
    languages: {
      "vi-VN": "/vi/about",
      "en-GB": "/about",
      "x-default": "/about",
    },
  },
  keywords: [
    "Austin Duy Nguyen",
    "osteopath người Việt",
    "GOsC 12332",
    "osteopath Woolwich tiếng Việt",
  ],
  openGraph: pageOpenGraph({
    title: "Về Austin Duy Nguyen | Osteopath người Việt",
    description:
      "Osteopath đăng ký GOsC phục vụ cộng đồng Việt tại Woolwich — khám bằng tiếng Việt hoặc tiếng Anh.",
    url: "/vi/about",
    images: [
      {
        url: "/images/austin-nguyen.webp",
        width: 1200,
        height: 1500,
        alt: "Austin Duy Nguyen — osteopath đăng ký GOsC",
      },
    ],
    locale: "vi_VN",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Về Austin Duy Nguyen | Osteopath người Việt",
    description:
      "Osteopath đăng ký GOsC phục vụ cộng đồng Việt tại Woolwich — khám bằng tiếng Việt hoặc tiếng Anh.",
    images: ["/images/austin-nguyen.webp"],
  },
};

export default function VietnameseAboutPage() {
  const faqLd = faqPageJsonLd(viAboutFaqs, "vi");

  return (
    <div className="bg-slate-50" lang="vi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="relative min-h-[min(72vh,720px)] overflow-hidden text-white">
        <Image
          src="/images/austin-nguyen.webp"
          alt="Austin Duy Nguyen, osteopath đăng ký GOsC"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-[center_18%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-deep/94 via-navy/82 to-navy/40"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[min(72vh,720px)] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 md:px-8 md:pb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-light uppercase">
            {site.name}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">
            Austin Duy Nguyen
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Osteopath đăng ký GOsC (số {site.practitioner.regNo}) — khám bằng
            tiếng Việt hoặc tiếng Anh tại Woolwich SE18.
          </p>
          <p className="mt-3 text-sm text-white/70">
            <Link href="/about" className="font-semibold text-teal-light" hrefLang="en-GB">
              English
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookHref("vi")} variant="onDark">
              Đặt lịch
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="onDarkOutline">
              Gọi {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Vì sao phòng khám này tồn tại
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              Nhiều người trong cộng đồng Việt ở London làm việc bằng tay và
              lưng — thợ nails, nhà hàng, kho hàng, chăm sóc — nhưng ngại khám
              vì rào cản ngôn ngữ. Austin mở phòng khám để bạn mô tả triệu chứng
              bằng tiếng mẹ đẻ, với osteopath đăng ký đầy đủ tại Anh.
            </p>
            <p>
              Đào tạo gồm Master of Osteopathy (BCOM), CertHE Medical Sciences
              (Distinction), cùng CPD shockwave, Dip.Acu và NASM PFT. Mục tiêu
              là điều trị rõ ràng, giải thích dễ hiểu, và kế hoạch phục hồi thực
              tế — không phụ thuộc thuốc giảm đau dài hạn khi orthopaedic care
              phù hợp.
            </p>
            <p>
              Phòng khám nằm trong {site.address.venue}, {site.address.line1},{" "}
              {site.address.line2}. Hỏi quầy nhà thuốc khi đến — không cần GP
              referral. Nhận lịch Thứ Hai, Ba, Năm, Sáu và Bảy (đóng Tư &amp;
              Chủ Nhật).
            </p>
            <p>
              Dịch vụ phổ biến: đau lưng &amp; cổ, shockwave tập trung, hỗ trợ
              thể thao, châm cứu y khoa, và khám tại nhà trong khu vực Woolwich /
              SE London khi di chuyển đến phòng khám khó.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              Master of Osteopathy (BCOM)
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              GOsC Fully Registered — số {site.practitioner.regNo}
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              CertHE Medical Sciences (Distinction)
            </li>
            <li className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              Shockwave CPD · Dip.Acu · NASM PFT
            </li>
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            Xác minh trên{" "}
            <a
              href={site.practitioner.goscRegisterUrl}
              className="font-semibold text-teal hover:text-teal-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              sổ đăng ký GOsC công khai
            </a>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy">Câu hỏi nhanh</h2>
          <dl className="mt-6 space-y-5">
            {viAboutFaqs.map((item) => (
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

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-navy">Sẵn sàng đặt lịch?</h2>
            <p className="mt-3 text-base text-slate-600">
              Xem{" "}
              <Link href="/vi/fees" className="font-semibold text-teal hover:text-teal-dark">
                bảng giá
              </Link>{" "}
              hoặc{" "}
              <Link
                href="/vi/services/back-neck-pain"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                đau lưng &amp; cổ
              </Link>{" "}
              trước khi đặt.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/vi/book">Đặt lịch online</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Gọi {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <TopicClusterNav clusterId="vietnamese" />
    </div>
  );
}
