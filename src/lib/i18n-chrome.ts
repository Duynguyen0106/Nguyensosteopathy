/** Chrome (header/footer) strings for Vietnamese routes. */

export const viNavLabels: Record<string, string> = {
  "/about": "Giới thiệu",
  "/book": "Đặt lịch",
  "/conditions": "Tình trạng",
  "/exercises": "Bài tập",
  "/supplements": "Thực phẩm bổ sung",
  "/blog": "Blog",
  "/fees": "Bảng giá",
  "/nhs-discount": "Giảm 10% NHS",
  "/insurance": "Bảo hiểm",
  "/reviews": "Đánh giá",
  "/find-us": "Địa chỉ",
  "/contact": "Liên hệ",
  "/vi": "English",
  "/services": "Dịch vụ",
  "/services/back-neck-pain": "Đau lưng & cổ",
  "/services/home-visits": "Khám tại nhà",
  "/osteopathy": "Osteopathy là gì?",
  "/desk-pain": "Đau do ngồi máy",
};

/** Service dropdown titles on /vi/* (English titles remain on EN routes). */
export const viServiceLabels: Record<string, string> = {
  "back-neck-pain": "Đau lưng & cổ",
  "headaches-joints": "Đau đầu & khớp",
  "focused-shockwave": "Shockwave tập trung",
  "mens-health-ed": "Sức khỏe nam / ED",
  "acupuncture-electro": "Châm cứu / điện châm",
  "deep-tissue-massage": "Massage mô sâu",
  "sports-injury-rehab": "Chấn thương thể thao",
  "pregnancy-support": "Hỗ trợ thai kỳ",
  "cranial-therapy": "Liệu pháp sọ",
  "paediatric-care": "Nhi khoa",
  "home-visits": "Khám tại nhà",
};

export const viFooterLabels: Record<string, string> = {
  "/book": "Đặt lịch online",
  "/new-patients": "Bệnh nhân mới",
  "/fees": "Bảng giá",
  "/exercises": "Bài tập tại nhà",
  "/supplements": "Thực phẩm bổ sung & phục hồi",
  "/find-us": "Địa chỉ",
  "/contact": "Liên hệ",
  "/faq": "Câu hỏi thường gặp",
  "/osteopathy": "Osteopathy là gì?",
  "/services": "Tất cả dịch vụ",
  "/conditions": "Tình trạng",
  "/services/focused-shockwave": "Shockwave",
  "/areas": "Khu vực phục vụ",
  "/blog": "Blog",
  "/about": "Về Austin",
  "/reviews": "Đánh giá",
  "/vi": "Trang tiếng Việt",
  "/nhs-discount": "Giảm giá NHS / sinh viên",
  "/insurance": "Bảo hiểm",
  "/privacy": "Quyền riêng tư",
  "/accessibility": "Khả năng tiếp cận",
  "/site-map": "Sơ đồ trang",
};

/** On /vi/* remaps for pages that have Vietnamese twins. */
export function resolveViHref(href: string): string {
  if (href === "/fees") return "/vi/fees";
  if (href === "/find-us") return "/vi/find-us";
  if (href === "/book") return "/vi/book";
  if (href === "/about") return "/vi/about";
  if (href === "/services/back-neck-pain") return "/vi/services/back-neck-pain";
  if (href === "/services/home-visits") return "/vi/services/home-visits";
  if (href === "/vi") return "/";
  return href;
}

export function chromeLabel(
  href: string,
  english: string,
  isVi: boolean,
  map: Record<string, string>,
): string {
  if (!isVi) return english;
  return map[href] ?? english;
}
