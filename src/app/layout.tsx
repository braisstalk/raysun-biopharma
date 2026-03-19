import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/common/FloatingActions";
import { footerConfig } from "@/config/footer";
import { LocaleProvider } from "@/i18n/LocaleContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://raysun-biopharma.com'),
  title: {
    default: "Raysun Biopharma - GMP Certified Pharmaceutical Manufacturer",
    template: "%s | Raysun Biopharma"
  },
  description: "GMP-certified pharmaceutical manufacturer specializing in softgels, tablets, capsules, creams, and injections. Serving Southeast Asia and global markets with quality medicines.",
  keywords: ["pharmaceutical manufacturer", "GMP certified", "generic medicines", "softgel", "tablet", "Southeast Asia", "Laos", "healthcare", "pharma company"],
  authors: [{ name: "Raysun Biopharma" }],
  creator: "Raysun Biopharma",
  publisher: "Raysun Biopharma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raysun-biopharma.com',
    siteName: 'Raysun Biopharma',
    title: 'Raysun Biopharma - GMP Certified Pharmaceutical Manufacturer',
    description: 'GMP-certified pharmaceutical manufacturer specializing in softgels, tablets, capsules, creams, and injections. Serving Southeast Asia and global markets.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Raysun Biopharma'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raysun Biopharma',
    description: 'GMP-certified pharmaceutical manufacturer serving global markets.',
    images: ['/logo.png']
  },
  alternates: {
    canonical: 'https://raysun-biopharma.com',
    languages: {
      'en': 'https://raysun-biopharma.com',
      'th': 'https://raysun-biopharma.com',
      'lo': 'https://raysun-biopharma.com',
      'vi': 'https://raysun-biopharma.com',
      'ar': 'https://raysun-biopharma.com',
      'es': 'https://raysun-biopharma.com',
      'pt': 'https://raysun-biopharma.com',
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LocaleProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer config={footerConfig} />
          <FloatingActions />
        </LocaleProvider>
      </body>
    </html>
  );
}
// Cache bust 1773924989
