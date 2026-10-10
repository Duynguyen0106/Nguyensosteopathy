import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Phòng khám Xương khớp Nguyễn | Osteopath người Việt tại Anh",
  description:
    "Nguyen's Osteopathic Clinic — phòng khám osteopathy của Austin Duy Nguyen, osteopath người Việt đăng ký GOsC tại Woolwich, London. Hỗ trợ cộng đồng Việt với chăm sóc cơ xương khớp bằng tiếng Việt và tiếng Anh.",
  alternates: {
    canonical: "/vi",
    languages: {
      "vi-VN": "/vi",
      "en-GB": "/",
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
  openGraph: {
    title: "Phòng khám Xương khớp Nguyễn | Osteopath người Việt tại Anh",
    description:
      "Osteopath người Việt duy nhất hành nghề tại Anh — chăm sóc cơ xương khớp cho cộng đồng Việt tại Woolwich, London SE18.",
    url: "/vi",
    locale: "vi_VN",
    images: [
      {
        url: "/images/austin-nguyen.jpg",
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
  const offer = site.openingOffer;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Phòng khám Xương khớp Nguyễn — Trang tiếng Việt",
    inLanguage: "vi",
    url: `${site.websiteUrl}/vi`,
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.websiteUrl,
    },
    about: {
      "@type": "MedicalBusiness",
      name: site.name,
      url: site.websiteUrl,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: "Woolwich",
        addressRegion: "London",
        postalCode: "SE18 6LQ",
        addressCountry: "GB",
      },
    },
  };

  return (
    <div className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />

      <section className="relative min-h-[min(88vh,920px)] overflow-hidden text-white">
        <Image
          src="/images/austin-nguyen.jpg"
          alt="Austin Duy Nguyen, osteopath đăng ký GOsC"
          fill
          priority
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
          <p className="opening-hero-copy text-xs font-semibold tracking-[0.28em] text-teal-mist uppercase">
            Nguyen&apos;s Osteopathic Clinic
          </p>
          <h1 className="opening-hero-copy opening-hero-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
            Osteopath người Việt tại Anh
          </h1>
          <p className="opening-hero-copy opening-hero-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Chăm sóc cơ xương khớp bằng tiếng Việt và tiếng Anh — để cộng đồng
            mình được hiểu, không chỉ được điều trị.
          </p>
          <div className="opening-hero-copy opening-hero-delay-3 mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/book">Đặt lịch khám</ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Gọi {site.phone}
            </ButtonLink>
            <Link
              href="/"
              className="text-sm font-semibold text-teal-mist underline-offset-2 hover:underline"
            >
              English →
            </Link>
          </div>
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
              <ButtonLink href="/back-neck" variant="secondary">
                Đau lưng &amp; cổ
              </ButtonLink>
              <ButtonLink href="/shockwave" variant="secondary">
                Shockwave
              </ButtonLink>
              <ButtonLink href="/fees" variant="secondary">
                Bảng giá
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-slate-600">
              Thêm:{" "}
              <Link href="/pregnancy" className="font-semibold text-teal hover:text-teal-dark">
                Thai kỳ
              </Link>
              {" · "}
              <Link href="/conditions" className="font-semibold text-teal hover:text-teal-dark">
                Tình trạng thường gặp
              </Link>
              {" · "}
              <Link href="/find-us" className="font-semibold text-teal hover:text-teal-dark">
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
              src="/images/clinic-promo.jpg"
              alt="Không gian phòng khám Nguyen's Osteopathic Clinic"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-navy px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-mist uppercase">
            Khai trương
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            {offer.headline} — {offer.dateLabel}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Ngày khai trương chính thức: giảm 50% mọi phí dịch vụ phòng khám
            cho bệnh nhân khám trong ngày. Một ngày duy nhất tại{" "}
            {site.address.venue}, Woolwich.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={offer.path}>Chi tiết ưu đãi</ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Đặt lịch ngay
            </ButtonLink>
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
              Giờ nhà thuốc:{" "}
              {site.hours.map((row) => (
                <span key={row.days} className="mr-4 inline-block">
                  {row.days}: {row.time}
                </span>
              ))}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Ngày đặt lịch osteopathy: {site.booking.bookableDaysLabel} (đóng{" "}
              {site.booking.closedDaysLabel}, trừ ngày khai trương).
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book">Đặt lịch online</ButtonLink>
            <ButtonLink href="/find-us" variant="secondary">
              Bản đồ &amp; gửi xe
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">
              Gọi {site.phone}
            </ButtonLink>
            <ButtonLink href={site.emailHref} variant="secondary">
              Email
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
