import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Woolwich Osteopath`,
    template: `%s | ${site.name}`,
  },
  description:
    "Drug-free osteopathic care in Woolwich with Austin Duy Nguyen, GOsC-registered osteopath. Book online for back pain, shockwave therapy, sports rehab, and more.",
  metadataBase: new URL("https://www.nguyensosteopathy.com"),
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/images/clinic-promo.jpg",
        width: 1600,
        height: 1200,
        alt: "Nguyen's Osteopathic Clinic — Austin Duy Nguyen, Woolwich",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
