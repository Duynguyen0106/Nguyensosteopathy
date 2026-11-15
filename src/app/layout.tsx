import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileBookBar } from "@/components/MobileBookBar";
import { SkipLink } from "@/components/SkipLink";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700"],
  display: "swap",
  // Body text is the LCP-critical face; skip display preload to cut contention.
  preload: false,
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const description =
  "Osteopathy in Charlton for drug-free back pain, neck pain and shockwave therapy. Book Austin Duy Nguyen, GOsC osteopath at Village Pharmacy, SE7.";

export const metadata: Metadata = {
  metadataBase: new URL(site.websiteUrl),
  title: {
    default: "Osteopathy in Charlton | Back Pain, Neck Pain & Shockwave",
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "osteopathy",
    "osteopath Charlton",
    "osteopathy Charlton",
    "osteopath Woolwich",
    "osteopathy Woolwich",
    "drug free pain relief",
    "back pain treatment",
    "neck pain treatment",
    "shockwave therapy",
    "osteopath SE7",
    "osteopath SE18",
    "osteopath Greenwich",
    "osteopath Plumstead",
    "back pain Charlton",
    "neck pain osteopath London",
    "shockwave therapy Charlton",
    "LI-ESWT Charlton",
    "men's health osteopath",
    "ED shockwave therapy London",
    "sports injury Charlton",
    "Vietnamese osteopath UK",
    "Vietnamese osteopath London",
    "Nguyen's Osteopathic Clinic",
    "Austin Duy Nguyen osteopath",
    "Village Pharmacy osteopath",
    "GOsC osteopath Charlton",
  ],
  authors: [{ name: site.practitioner.name }],
  creator: site.name,
  publisher: site.name,
  category: "healthcare",
  verification: {
    google: "Q1nYC_wKSmgSGo2IbHT52HWYknHeKbQ7O0hJCt_W05g",
  },
  manifest: "/site.webmanifest",
  alternates: {
    // Canonical is set per-page (homepage sets "/"). Do not default all
    // routes to the homepage — that can confuse crawlers when a page
    // forgets its own alternates.canonical.
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: `Osteopathy in Charlton | ${site.name}`,
    description,
    type: "website",
    locale: "en_GB",
    url: site.websiteUrl,
    siteName: site.name,
    images: [
      defaultOgImage,
      {
        url: "/images/clinic-room.webp",
        width: 1600,
        height: 1200,
        alt: "Treatment room at Nguyen's Osteopathic Clinic in Charlton",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Osteopathy in Charlton | ${site.name}`,
    description,
    images: [defaultOgImage.url],
  },
  // Do not set robots: index here — it conflicts with Next’s automatic
  // noindex on not-found pages (both meta tags then appear). Defaults index
  // normal routes; /blog pages set googleBot extras explicitly where needed.
  icons: {
    icon: [{ url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  other: {
    "geo.region": "GB-LND",
    "geo.placename": "Charlton",
    "geo.position": `${site.address.geo.latitude};${site.address.geo.longitude}`,
    ICBM: `${site.address.geo.latitude}, ${site.address.geo.longitude}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Keep <html lang> static for prerender (Cache Components). Vietnamese
  // routes set documentElement.lang via DocumentLang in src/app/vi/layout.tsx.
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        {/* Consent Mode v2 defaults before any analytics tags load */}
        <script
          id="gtag-consent-default"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});`,
          }}
        />
        {/* Sitewide MedicalClinic / LocalBusiness (+ practitioner & website) JSON-LD */}
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-background text-ink">
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileBookBar />
        <CookieBanner />
        <GoogleAnalytics />
        <ConsentAnalytics />
      </body>
    </html>
  );
}
