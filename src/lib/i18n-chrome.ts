/** Chrome (header/footer) strings for Vietnamese routes. */

export const viNavLabels: Record<string, string> = {
  "/about": "Giới thiệu",
  "/book": "Đặt lịch",
  "/conditions": "Tình trạng",
  "/exercises": "Bài tập",
  "/education": "Giáo dục",
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
  "/education": "Trung tâm giáo dục",
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

/** On /vi/* remaps for pages that have Vietnamese twins. Keeps ?query (e.g. UTMs). */
export function resolveViHref(href: string): string {
  const qIndex = href.indexOf("?");
  const path = qIndex === -1 ? href : href.slice(0, qIndex);
  const query = qIndex === -1 ? "" : href.slice(qIndex);
  let mapped = path;
  if (path === "/fees") mapped = "/vi/fees";
  else if (path === "/find-us") mapped = "/vi/find-us";
  else if (path === "/book") mapped = "/vi/book";
  else if (path === "/about") mapped = "/vi/about";
  else if (path === "/reviews") mapped = "/vi/reviews";
  else if (path === "/services/back-neck-pain") {
    mapped = "/vi/services/back-neck-pain";
  } else if (path === "/services/home-visits") {
    mapped = "/vi/services/home-visits";
  } else if (path === "/vi") mapped = "/";
  return `${mapped}${query}`;
}

export function chromeLabel(
  href: string,
  english: string,
  isVi: boolean,
  map: Record<string, string>,
): string {
  if (!isVi) return english;
  const path = href.split("?")[0] ?? href;
  return map[path] ?? map[href] ?? english;
}
