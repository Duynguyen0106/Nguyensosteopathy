import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Book drug-free osteopathy in Woolwich with Austin Duy Nguyen, GOsC-registered osteopath (Reg. No. 12332). Back & neck pain, focused shockwave, men’s health & ED, sports rehab, and more — inside St James Pharmacy.";

export const metadata: Metadata = {
  metadataBase: new URL(site.websiteUrl),
  title: {
    default: `${site.name} | Osteopath in Woolwich, London`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "osteopath Woolwich",
    "osteopathy Woolwich",
    "osteopath SE18",
    "back pain Woolwich",
    "neck pain osteopath London",
    "shockwave therapy Woolwich",
    "LI-ESWT Woolwich",
    "men's health osteopath",
    "ED shockwave therapy London",
    "sports injury Woolwich",
    "Nguyen's Osteopathic Clinic",
    "Austin Duy Nguyen osteopath",
    "St James Pharmacy osteopath",
    "GOsC osteopath Woolwich",
  ],
  authors: [{ name: site.practitioner.name }],
  creator: site.name,
  publisher: site.name,
  category: "healthcare",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} | Osteopath in Woolwich`,
    description,
    type: "website",
    locale: "en_GB",
    url: site.websiteUrl,
    siteName: site.name,
    images: [
      {
        url: "/images/logo-lockup.png",
        width: 1298,
        height: 926,
        alt: "Nguyen's Osteopathic Clinic logo — Recover, Realign, and Restore Your Vitality",
      },
      {
        url: "/images/clinic-promo.jpg",
        width: 1600,
        height: 1200,
        alt: "Austin Duy Nguyen, GOsC-registered osteopath in Woolwich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Osteopath in Woolwich`,
    description,
    images: ["/images/logo-lockup.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  other: {
    "geo.region": "GB-LND",
    "geo.placename": "Woolwich",
    "geo.position": "51.4912;0.0672",
    ICBM: "51.4912, 0.0672",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <JsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
