import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://tetrangles.com.ng"
  ),
  title: {
    default: "Tetrangles Projects Limited | Citadel Of Contemporary",
    template: "%s | Tetrangles Projects Limited",
  },
  description:
    "Nigeria's premier construction and real estate company. 15+ years delivering luxury residential, commercial, and infrastructure projects across Lagos and West Africa.",
  keywords: [
    "construction company Nigeria",
    "Lagos construction",
    "real estate Lagos",
    "luxury homes Lagos",
    "building construction Nigeria",
    "Tetrangles",
    "project management Lagos",
    "architecture Lagos",
    "Lekki construction",
  ],
  authors: [{ name: "Tetrangles Projects Limited" }],
  creator: "Tetrangles Projects Limited",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://tetrangles.com.ng",
    siteName: "Tetrangles Projects Limited",
    title: "Tetrangles Projects Limited | Citadel Of Contemporary",
    description:
      "Nigeria's premier construction and real estate company. Delivering quality projects across Lagos and West Africa since 2010.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tetrangles Projects Limited",
    description:
      "Nigeria's premier construction and real estate company since 2010.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white antialiased">
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
