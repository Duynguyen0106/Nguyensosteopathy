import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    ];
  },
  async redirects() {
    // Canonical SEO pages are /services/[slug]. Legacy hubs 301 here.
    // Keep /osteopathy, /desk-pain, /cupping as standalone guides (not in services[]).
    return [
      {
        // Crawlers sometimes request /sitemap without the .xml extension.
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        // Removed opening-day article still indexed by Google — send to blog index.
        source: "/blog/opening-day-osteopath-woolwich-5-november",
        destination: "/blog",
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
