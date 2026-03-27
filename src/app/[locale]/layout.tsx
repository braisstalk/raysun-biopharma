import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { i18n } from '@/i18n/config'
import type { Locale } from '@/i18n/config'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/common/FloatingActions'

import { LocaleProvider } from '@/i18n/LocaleContext'
import { RfqCartProvider } from '@/contexts/RfqCartContext'

const inter = Inter({ subsets: ['latin'] })

// Generate static params for all locales
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const brandName = 'Raysun Biopharma'
  const description = 'GMP-certified pharmaceutical manufacturer specializing in softgels, tablets, capsules, creams, and injections. Serving Southeast Asia and global markets with quality medicines.'

  const baseUrl = 'https://www.raysunpharma.com'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${brandName} - GMP Certified Pharmaceutical Manufacturer`,
      template: `%s | ${brandName}`,
    },
    description,
    keywords: [
      'pharmaceutical manufacturer', 'GMP certified', 'generic medicines',
      'softgel', 'tablet', 'Southeast Asia', 'Laos', 'healthcare',
    ],
    authors: [{ name: brandName }],
    creator: brandName,
    publisher: brandName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website' as const,
      locale: 'en_US',
      url: `${baseUrl}/${locale}`,
      siteName: brandName,
      title: `${brandName} - GMP Certified Pharmaceutical Manufacturer`,
      description,
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: brandName }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: brandName,
      description,
      images: ['/logo.png'],
    },
    alternates: {
      canonical: `${baseUrl}/en`,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!i18n.locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <LocaleProvider initialLocale={locale}>
          <RfqCartProvider>
            <Navbar />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
            <FloatingActions />
          </RfqCartProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
