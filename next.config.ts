import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import libraryOverlap from "./src/data/library-condition-overlap.json";

// Enables Cloudflare bindings during `next dev` (no-op in production builds).
initOpenNextCloudflareForDev();

const libraryOverlapRedirects = [
  ...Object.entries(libraryOverlap.redirects).map(([topic, destination]) => ({
    source: `/education/library/topic/${topic}`,
    destination,
    permanent: true,
  })),
  ...Object.entries(libraryOverlap.legacySheetRedirects).map(
    ([slug, destination]) => ({
      source: `/education/library/${slug}`,
      destination,
      permanent: true,
    }),
  ),
];

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  // Dev-only: allow custom / Workers preview hosts to hit the Next dev server.
  allowedDevOrigins: [
    "nguyensosteopathy.com",
    "www.nguyensosteopathy.com",
    "nguyensosteopathy.duydichdanh.workers.dev",
  ],
  // Disabled for Cloudflare Workers / OpenNext: workerd cancels hung requests
  // (CF 1101) when Cache Components + partial prefetching are enabled.
  // Re-enable after OpenNext documents full support for this combo.
  cacheComponents: false,
  partialPrefetching: false,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
  compiler: {
    // Production builds already minify JS/CSS via SWC; drop noisy logs.
    removeConsole: process.env.NODE_ENV === "production",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Static print/promo assets under public/ — reinforce robots.txt with headers.
      {
        source: "/facebook/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/business-card/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/leaflet/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/poster/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/voucher/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    // Canonical SEO pages are /services/[slug]. Legacy hubs 301 here.
    // Keep /osteopathy, /desk-pain, /cupping as standalone guides (not in services[]).
    return [
      ...libraryOverlapRedirects,
      {
        // Crawlers sometimes request /sitemap without the .xml extension.
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        // Removed opening-day article still indexed by Google — send to blog index.
        source: "/blog/opening-day-osteopath-charlton-5-november",
        destination: "/blog",
        permanent: true,
      },
      {
        // Former Woolwich catchment lander
        source: "/areas/woolwich",
        destination: "/areas/charlton",
        permanent: true,
      },
      {
        // Old opening-day URL still in GSC
        source: "/blog/opening-day-osteopath-woolwich-5-november",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/achilles-tendinopathy-shockwave-woolwich",
        destination: "/blog/achilles-tendinopathy-shockwave-charlton",
        permanent: true,
      },
      {
        source: "/blog/ankle-sprain-rehab-osteopath-woolwich",
        destination: "/blog/ankle-sprain-rehab-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/back-pain-woolwich-osteopathy",
        destination: "/blog/back-pain-charlton-osteopathy",
        permanent: true,
      },
      {
        source: "/blog/book-osteopath-online-woolwich",
        destination: "/blog/book-osteopath-online-charlton",
        permanent: true,
      },
      {
        source: "/blog/calcific-tendonitis-shoulder-shockwave-woolwich",
        destination: "/blog/calcific-tendonitis-shoulder-shockwave-charlton",
        permanent: true,
      },
      {
        source: "/blog/chronic-pain-osteopath-woolwich",
        destination: "/blog/chronic-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/coccyx-tailbone-pain-osteopath-woolwich",
        destination: "/blog/coccyx-tailbone-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/cranial-osteopathy-headaches-woolwich",
        destination: "/blog/cranial-osteopathy-headaches-charlton",
        permanent: true,
      },
      {
        source: "/blog/cranial-osteopathy-woolwich-what-is-it",
        destination: "/blog/cranial-osteopathy-charlton-what-is-it",
        permanent: true,
      },
      {
        source: "/blog/cranial-vs-structural-osteopathy-woolwich",
        destination: "/blog/cranial-vs-structural-osteopathy-charlton",
        permanent: true,
      },
      {
        source: "/blog/cupping-therapy-add-on-woolwich",
        destination: "/blog/cupping-therapy-add-on-charlton",
        permanent: true,
      },
      {
        source: "/blog/cupping-vs-massage-woolwich",
        destination: "/blog/cupping-vs-massage-charlton",
        permanent: true,
      },
      {
        source: "/blog/cycling-lower-back-pain-osteopath-woolwich",
        destination: "/blog/cycling-lower-back-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/deep-tissue-massage-woolwich-osteopath",
        destination: "/blog/deep-tissue-massage-charlton-osteopath",
        permanent: true,
      },
      {
        source: "/blog/deep-tissue-vs-osteopathy-woolwich",
        destination: "/blog/deep-tissue-vs-osteopathy-charlton",
        permanent: true,
      },
      {
        source: "/blog/drug-free-ed-options-woolwich",
        destination: "/blog/drug-free-ed-options-charlton",
        permanent: true,
      },
      {
        source: "/blog/electroacupuncture-pain-relief-woolwich",
        destination: "/blog/electroacupuncture-pain-relief-charlton",
        permanent: true,
      },
      {
        source: "/blog/first-osteopathy-visit-checklist-woolwich",
        destination: "/blog/first-osteopathy-visit-checklist-charlton",
        permanent: true,
      },
      {
        source: "/blog/focused-shockwave-therapy-woolwich",
        destination: "/blog/focused-shockwave-therapy-charlton",
        permanent: true,
      },
      {
        source: "/blog/golfers-elbow-osteopath-woolwich",
        destination: "/blog/golfers-elbow-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/growing-pains-osteopath-woolwich",
        destination: "/blog/growing-pains-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/gym-shoulder-injury-osteopath-woolwich",
        destination: "/blog/gym-shoulder-injury-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/hip-bursitis-osteopath-woolwich",
        destination: "/blog/hip-bursitis-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/hip-knee-pain-osteopath-woolwich",
        destination: "/blog/hip-knee-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/infant-osteopathy-what-parents-ask-woolwich",
        destination: "/blog/infant-osteopathy-what-parents-ask-charlton",
        permanent: true,
      },
      {
        source: "/blog/li-eswt-erectile-dysfunction-woolwich",
        destination: "/blog/li-eswt-erectile-dysfunction-charlton",
        permanent: true,
      },
      {
        source: "/blog/lifting-back-pain-warehouse-trades-woolwich",
        destination: "/blog/lifting-back-pain-warehouse-trades-charlton",
        permanent: true,
      },
      {
        source: "/blog/lumbar-disc-pain-osteopath-woolwich",
        destination: "/blog/lumbar-disc-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/massage-for-desk-workers-woolwich",
        destination: "/blog/massage-for-desk-workers-charlton",
        permanent: true,
      },
      {
        source: "/blog/medical-acupuncture-osteopath-woolwich",
        destination: "/blog/medical-acupuncture-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/mens-health-shockwave-woolwich",
        destination: "/blog/mens-health-shockwave-charlton",
        permanent: true,
      },
      {
        source: "/blog/mens-pelvic-health-osteopathy-woolwich",
        destination: "/blog/mens-pelvic-health-osteopathy-charlton",
        permanent: true,
      },
      {
        source: "/blog/nhs-student-osteopathy-discount-woolwich",
        destination: "/blog/nhs-student-osteopathy-discount-charlton",
        permanent: true,
      },
      {
        source: "/blog/osteoarthritis-joints-osteopath-woolwich",
        destination: "/blog/osteoarthritis-joints-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/osteopath-inside-st-james-pharmacy-woolwich",
        destination: "/blog/osteopath-inside-village-pharmacy-charlton",
        permanent: true,
      },
      {
        source: "/blog/osteopath-vs-physiotherapist-woolwich",
        destination: "/blog/osteopath-vs-physiotherapist-charlton",
        permanent: true,
      },
      {
        source: "/blog/osteopath-woolwich-what-to-expect",
        destination: "/blog/osteopath-charlton-what-to-expect",
        permanent: true,
      },
      {
        source: "/blog/osteopathy-fees-woolwich-price-list",
        destination: "/blog/osteopathy-fees-charlton-price-list",
        permanent: true,
      },
      {
        source: "/blog/osteopathy-for-older-adults-woolwich",
        destination: "/blog/osteopathy-for-older-adults-charlton",
        permanent: true,
      },
      {
        source: "/blog/overuse-injuries-gym-running-woolwich",
        destination: "/blog/overuse-injuries-gym-running-charlton",
        permanent: true,
      },
      {
        source: "/blog/paediatric-osteopathy-woolwich-parents-guide",
        destination: "/blog/paediatric-osteopathy-charlton-parents-guide",
        permanent: true,
      },
      {
        source: "/blog/parking-osteopath-woolwich-powis-street",
        destination: "/blog/parking-osteopath-charlton-the-village",
        permanent: true,
      },
      {
        source: "/blog/patellar-tendinopathy-shockwave-woolwich",
        destination: "/blog/patellar-tendinopathy-shockwave-charlton",
        permanent: true,
      },
      {
        source: "/blog/pelvic-girdle-pain-pregnancy-woolwich",
        destination: "/blog/pelvic-girdle-pain-pregnancy-charlton",
        permanent: true,
      },
      {
        source: "/blog/plantar-fasciitis-shockwave-woolwich",
        destination: "/blog/plantar-fasciitis-shockwave-charlton",
        permanent: true,
      },
      {
        source: "/blog/post-gym-muscle-soreness-massage-woolwich",
        destination: "/blog/post-gym-muscle-soreness-massage-charlton",
        permanent: true,
      },
      {
        source: "/blog/postpartum-back-pain-osteopath-woolwich",
        destination: "/blog/postpartum-back-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/pregnancy-osteopathy-safety-woolwich",
        destination: "/blog/pregnancy-osteopathy-safety-charlton",
        permanent: true,
      },
      {
        source: "/blog/pregnancy-osteopathy-woolwich",
        destination: "/blog/pregnancy-osteopathy-charlton",
        permanent: true,
      },
      {
        source: "/blog/pregnancy-rib-pain-osteopath-woolwich",
        destination: "/blog/pregnancy-rib-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/pregnancy-sciatica-osteopath-woolwich",
        destination: "/blog/pregnancy-sciatica-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/restaurant-kitchen-back-pain-osteopath-woolwich",
        destination: "/blog/restaurant-kitchen-back-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/return-to-sport-after-sprain-woolwich",
        destination: "/blog/return-to-sport-after-sprain-charlton",
        permanent: true,
      },
      {
        source: "/blog/rib-pain-breathing-osteopath-woolwich",
        destination: "/blog/rib-pain-breathing-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/running-injuries-osteopath-woolwich",
        destination: "/blog/running-injuries-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/sacroiliac-joint-pain-woolwich",
        destination: "/blog/sacroiliac-joint-pain-charlton",
        permanent: true,
      },
      {
        source: "/blog/sciatica-woolwich-osteopath",
        destination: "/blog/sciatica-charlton-osteopath",
        permanent: true,
      },
      {
        source: "/blog/shin-splints-osteopath-woolwich",
        destination: "/blog/shin-splints-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/shockwave-therapy-cost-woolwich",
        destination: "/blog/shockwave-therapy-cost-charlton",
        permanent: true,
      },
      {
        source: "/blog/shoulder-pain-frozen-shoulder-woolwich",
        destination: "/blog/shoulder-pain-frozen-shoulder-charlton",
        permanent: true,
      },
      {
        source: "/blog/sports-injury-osteopath-woolwich",
        destination: "/blog/sports-injury-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/stress-shoulder-tension-massage-woolwich",
        destination: "/blog/stress-shoulder-tension-massage-charlton",
        permanent: true,
      },
      {
        source: "/blog/tennis-elbow-shockwave-osteopath-woolwich",
        destination: "/blog/tennis-elbow-shockwave-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/tension-headaches-neck-osteopath-woolwich",
        destination: "/blog/tension-headaches-neck-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/text-neck-smartphone-osteopath-woolwich",
        destination: "/blog/text-neck-smartphone-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/tmj-jaw-pain-osteopath-woolwich",
        destination: "/blog/tmj-jaw-pain-osteopath-charlton",
        permanent: true,
      },
      {
        source: "/blog/upper-back-pain-desk-workers-woolwich",
        destination: "/blog/upper-back-pain-desk-workers-charlton",
        permanent: true,
      },
      {
        source: "/blog/vietnamese-osteopath-woolwich-uk",
        destination: "/blog/vietnamese-osteopath-charlton-uk",
        permanent: true,
      },
      {
        source: "/blog/yoga-pilates-injury-osteopath-woolwich",
        destination: "/blog/yoga-pilates-injury-osteopath-charlton",
        permanent: true,
      },
      {
        // Deleted Facebook promo asset still requested from old GSC discoveries.
        source: "/facebook/opening-day-50-off-facebook.png",
        destination: "/book",
        permanent: true,
      },
      {
        source: "/opening",
        destination: "/fees",
        permanent: true,
      },
      {
        // Former supplements / nutrition guides → blog (Nutrition & recovery).
        source: "/supplements",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/supplements/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/education/nutrition",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/education/nutrition/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/back-neck",
        destination: "/services/back-neck-pain",
        permanent: true,
      },
      {
        source: "/headaches",
        destination: "/services/headaches-joints",
        permanent: true,
      },
      {
        source: "/shockwave",
        destination: "/services/focused-shockwave",
        permanent: true,
      },
      {
        source: "/mens-health",
        destination: "/services/mens-health-ed",
        permanent: true,
      },
      {
        source: "/acupuncture",
        destination: "/services/acupuncture-electro",
        permanent: true,
      },
      {
        source: "/massage",
        destination: "/services/deep-tissue-massage",
        permanent: true,
      },
      {
        source: "/sports",
        destination: "/services/sports-injury-rehab",
        permanent: true,
      },
      {
        source: "/pregnancy",
        destination: "/services/pregnancy-support",
        permanent: true,
      },
      {
        source: "/cranial",
        destination: "/services/cranial-therapy",
        permanent: true,
      },
      {
        source: "/paediatric",
        destination: "/services/paediatric-care",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
