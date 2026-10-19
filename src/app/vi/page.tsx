import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // Absolute — avoid doubling with the English clinic-name title template.
  title: {
    absolute: "Phòng khám Xương khớp Nguyễn | Osteopath người Việt tại Anh",
  },
  description:
    "Osteopath người Việt đăng ký GOsC tại Woolwich — Austin Duy Nguyen hỗ trợ cộng đồng Việt bằng tiếng Việt và tiếng Anh.",
  alternates: {
    canonical: "/vi",
    languages: {
      "vi-VN": "/vi",
      "en-GB": "/",
      "x-default": "/",
    },
  },
  keywords: [
    "osteopath người Việt",
    "phòng khám xương khớp Woolwich",
    "Austin Duy Nguyen",
    "osteopathy cộng đồng Việt UK",
    "đau lưng thợ nails",
    "osteopath SE18",
  ],
  other: {
    "content-language": "vi",
  },
  openGraph: {
    title: "Phòng khám Xương khớp Nguyễn | Osteopath người Việt tại Anh",
    description:
      "Osteopath người Việt nói tiếng Việt tại Woolwich — chăm sóc cơ xương khớp cho cộng đồng Việt tại London SE18.",
    url: "/vi",
    locale: "vi_VN",
    images: [
      {
        url: "/images/austin-nguyen.webp",
        width: 1200,
        height: 1500,
        alt: "Austin Duy Nguyen — osteopath đăng ký GOsC",
      },
    ],
  },
};

const jobs = [
  {
    role: "Thợ nails & làm đẹp",
    body: "Ngồi lâu, cúi cổ, cổ tay và ngón cái làm việc tinh xảo hàng giờ. Cổ, vai và bàn tay thường mỏi trước khi ai nghĩ đến việc khám.",
  },
  {
    role: "Nhà hàng, quán ăn & bếp",
    body: "Đứng lâu, bê đồ nặng, cử động lặp lại. Hông, gối, vai và lưng dưới mang cả ca làm về nhà.",
  },
  {
    role: "Kho hàng, xưởng & đóng gói",
    body: "Cúi, xoay, nâng lặp lại. Đau nhỏ tích tụ thành đau dai dẳng khi ngôn ngữ và thời gian khiến lọc khám sớm trở nên khó.",
  },
  {
    role: "Chăm sóc & vệ sinh",
    body: "Tư thế gượng, hỗ trợ người khác, ca sớm. Cơ thể gánh phần trái tim đã cho — xứng đáng được lắng nghe không rào cản.",
  },
] as const;

const serviceLines = [
  "Osteopathy — đau lưng, cổ, vai, khớp",
  "Shockwave tập trung (LI-ESWT)",
  "Xoa bóp mô sâu & liệu pháp hỗ trợ",
  "Châm cứu / điện châm (khi phù hợp)",
] as const;

export default function VietnamesePage() {
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Phòng khám Xương khớp Nguyễn — Trang tiếng Việt",
    inLanguage: "vi",
    url: `${site.websiteUrl}/vi`,
    isPartOf: { "@id": `${site.websiteUrl}/#website` },
    about: { "@id": `${site.websiteUrl}/#clinic` },
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />

      <section className="relative min-h-[min(88vh,920px)] overflow-hidden text-white">
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
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy/30"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[min(88vh,920px)] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <h1 className="opening-hero-copy">
            <span className="font-display block text-[clamp(2.75rem,10vw,5.25rem)] leading-[0.92] font-semibold tracking-[0.04em] text-white uppercase">
              Nguyen&apos;s
            </span>
            <span className="mt-3 block text-base font-semibold tracking-[0.2em] text-teal-mist uppercase sm:text-lg sm:tracking-[0.28em]">
              Osteopathic Clinic
            </span>
          </h1>
          <p className="opening-hero-copy opening-hero-delay-1 mt-6 max-w-xl font-display text-2xl leading-snug text-white md:text-3xl">
            Osteopath người Việt tại Anh
          </p>
          <p className="opening-hero-copy opening-hero-delay-2 mt-4 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Chăm sóc cơ xương khớp bằng tiếng Việt và tiếng Anh — để cộng đồng
            mình được hiểu, không chỉ được điều trị.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/book">Đặt lịch khám</ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Gọi {site.phone}
            </ButtonLink>
          </div>
          <p className="opening-hero-copy opening-hero-delay-3 mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-mist underline-offset-4 hover:underline"
            >
              WhatsApp
            </a>
            <Link
              href="/"
              className="font-semibold text-teal-mist underline-offset-4 hover:underline"
            >
              English →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Câu chuyện
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            Tại sao mang tên Nguyễn?
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700 md:text-lg">
            <p>
              Tôi là{" "}
              <strong className="font-semibold text-navy">
                {site.practitioner.name}
              </strong>
              , tốt nghiệp{" "}
              <strong className="font-semibold text-navy">
                Master of Osteopathy
              </strong>{" "}
              tại British College of Osteopathic Medicine (BCOM), đăng ký GOsC
              số {site.practitioner.regNo}. Tôi là osteopath người Việt hành
              nghề tại Vương quốc Anh — và muốn cộng đồng mình nhận ra nơi có
              thể nói chuyện thoải mái về nỗi đau.
            </p>
            <p>
              Tên{" "}
              <strong className="font-semibold text-navy">
                Nguyen&apos;s Osteopathic Clinic
              </strong>{" "}
              không chỉ là họ của tôi. Đó là lời nhắc về sứ mệnh: hỗ trợ sức
              khỏe cột sống và xương cho trẻ em Việt Nam qua hoạt động tình
              nguyện, và mang chăm sóc MSK rõ ràng đến cộng đồng Việt tại Anh —
              nơi rào cản ngôn ngữ thường khiến việc khám đúng lúc trở nên khó
              khăn.
            </p>
          </div>
          <p className="mt-6">
            <Link
              href="/about"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              Đọc thêm câu chuyện (tiếng Anh) →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Công việc thường gặp
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Nghề nghiệp và cơ thể
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Nhiều anh chị em Việt tại Anh làm việc nặng về tư thế và lặp lại.
              Đau không phải &quot;bình thường vì nghề&quot; — và bạn xứng đáng
              được giải thích bằng ngôn ngữ mình hiểu.
            </p>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {jobs.map((job) => (
              <li key={job.role}>
                <h3 className="text-lg font-semibold text-navy">{job.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {job.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Dịch vụ
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Chúng tôi hỗ trợ gì?
            </h2>
            <ul className="mt-6 space-y-3">
              {serviceLines.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-base text-slate-700"
                >
                  <span className="mt-1 text-teal" aria-hidden>
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services">Xem dịch vụ (EN)</ButtonLink>
              <ButtonLink href="/osteopathy" variant="secondary">
                Osteopathy là gì?
              </ButtonLink>
              <ButtonLink href="/desk-pain" variant="secondary">
                Đau do ngồi máy tính
              </ButtonLink>
              <ButtonLink href="/services/back-neck-pain" variant="secondary">
                Đau lưng &amp; cổ
              </ButtonLink>
              <ButtonLink href="/services/focused-shockwave" variant="secondary">
                Shockwave
              </ButtonLink>
              <ButtonLink href="/vi/fees" variant="secondary">
                Bảng giá
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-slate-600">
              Thêm:{" "}
              <Link href="/services/pregnancy-support" className="font-semibold text-teal hover:text-teal-dark">
                Thai kỳ
              </Link>
              {" · "}
              <Link href="/conditions" className="font-semibold text-teal hover:text-teal-dark">
                Tình trạng thường gặp
              </Link>
              {" · "}
              <Link href="/vi/find-us" className="font-semibold text-teal hover:text-teal-dark">
                Đường đến phòng khám
              </Link>
              {" · "}
              <Link href="/nhs-discount" className="font-semibold text-teal hover:text-teal-dark">
                Giảm giá NHS / sinh viên
              </Link>
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
            <Image
              src="/images/clinic-room.webp"
              alt="Không gian phòng khám Nguyen's Osteopathic Clinic tại Woolwich"
              fill
              loading="lazy"
              decoding="async"
              quality={75}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Phí &amp; giờ khám
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              Thông tin đặt lịch bằng tiếng Việt
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Không cần giấy giới thiệu GP cho hầu hết các vấn đề cơ xương khớp.
              Đặt lịch trực tuyến để xem các khung giờ còn trống.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-navy">Bảng phí chính</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 md:text-base">
                <li className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                  <span>Khám ban đầu (60 phút)</span>
                  <span className="font-semibold text-navy">£75</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                  <span>Tái khám (30 phút)</span>
                  <span className="font-semibold text-navy">£60</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                  <span>Shockwave / chuyên khoa (xem bảng đầy đủ)</span>
                  <span className="font-semibold text-navy">£90–£110</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Giảm <strong className="font-semibold text-navy">10%</strong> cho
                nhân viên NHS và sinh viên (xuất trình thẻ hợp lệ khi đến khám).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy">Giờ mở cửa</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-700 md:text-base">
                <p>
                  <span className="font-semibold text-navy">
                    Nhà thuốc (ra vào tòa nhà):
                  </span>{" "}
                  Thứ Hai–Thứ Sáu 9:00–18:00 · Thứ Bảy 9:00–17:30
                </p>
                <p>
                  <span className="font-semibold text-navy">
                    Osteopathy (đặt lịch):
                  </span>{" "}
                  Thứ Hai, Thứ Ba, Thứ Năm, Thứ Sáu &amp; Thứ Bảy —{" "}
                  <strong className="font-semibold text-navy">
                    đóng Thứ Tư và Chủ Nhật
                  </strong>
                  . Lịch trực tuyến luôn hiển thị các khung giờ còn trống.
                </p>
              </div>

              <h3 className="mt-8 text-lg font-semibold text-navy">
                Khi đến nơi
              </h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
                <li>
                  Vào{" "}
                  <strong className="font-semibold text-navy">
                    St James Pharmacy &amp; Travel Clinic
                  </strong>{" "}
                  tại 52 Powis Street, Woolwich SE18 6LQ.
                </li>
                <li>
                  Hỏi quầy nhà thuốc — họ sẽ chỉ phòng osteopathy.
                </li>
                <li>
                  Đến sớm 5–10 phút; mặc đồ dễ cử động để khám.
                </li>
                <li>
                  Có thể gọi hoặc WhatsApp nếu cần hỗ trợ tìm đường.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Đến khám
            </p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
              {site.address.venue}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Bảng giá tiếng Việt:{" "}
              <Link
                href="/vi/fees"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                /vi/fees
              </Link>
              {" · "}
              Địa chỉ &amp; gửi xe:{" "}
              <Link
                href="/vi/find-us"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                /vi/find-us
              </Link>
              {" · "}
              Đặt lịch (lịch Anh):{" "}
              <Link
                href="/book"
                className="font-semibold text-teal hover:text-teal-dark"
              >
                /book
              </Link>
              . Cần hỗ trợ tiếng Việt? Gọi hoặc WhatsApp trước khi đến.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book">Đặt lịch online</ButtonLink>
            <ButtonLink
              href={site.whatsappUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Gọi {site.phone}
            </ButtonLink>
            <ButtonLink href="/vi/find-us" variant="secondary">
              Bản đồ &amp; gửi xe
            </ButtonLink>
            <ButtonLink href="/vi/fees" variant="secondary">
              Bảng giá
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
