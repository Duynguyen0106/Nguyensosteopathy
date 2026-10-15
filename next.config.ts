import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
  async redirects() {
    return [
      {
        source: "/services/back-neck-pain",
        destination: "/back-neck",
        permanent: true,
      },
      {
        source: "/services/headaches-joints",
        destination: "/headaches",
        permanent: true,
      },
      {
        source: "/services/focused-shockwave",
        destination: "/shockwave",
        permanent: true,
      },
      {
        source: "/services/mens-health-ed",
        destination: "/mens-health",
        permanent: true,
      },
      {
        source: "/services/pregnancy-support",
        destination: "/pregnancy",
        permanent: true,
      },
      {
        source: "/services/sports-injury-rehab",
        destination: "/sports",
        permanent: true,
      },
      {
        source: "/services/paediatric-care",
        destination: "/paediatric",
        permanent: true,
      },
      {
        source: "/services/cranial-therapy",
        destination: "/cranial",
        permanent: true,
      },
      {
        source: "/services/acupuncture-electro",
        destination: "/acupuncture",
        permanent: true,
      },
      {
        source: "/services/deep-tissue-massage",
        destination: "/massage",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
