'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Factory, FlaskConical, Award, FileText, Users, Globe, MapPin, CheckCircle, ArrowUpRight } from 'lucide-react'
import { getHomeContent } from '@/lib/content'
import { useTranslation } from '@/i18n/useTranslation'
import { getContentTranslation } from '@/i18n/content'
import HomeHeroVideo from '@/components/home/HomeHeroVideo'
import HomeVideoFeature from '@/components/home/HomeVideoFeature'

export default function Home() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { t, locale } = useTranslation()
  const contentTrans = getContentTranslation(locale || 'en')

  useEffect(() => {
    const homeData = getHomeContent()
    setContent(homeData)
    setLoading(false)
  }, [])

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#1E6F5C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">{t.common.loading}</p>
        </div>
      </div>
    )
  }

  const { hero, stats, about, videoSection, capabilities, products } = content

  // Merge content with translations
  const heroConfig = {
    ...hero,
    title: contentTrans.home.hero.title,
    subtitle: contentTrans.home.hero.subtitle,
    primaryCta: { ...hero?.primaryCta, label: contentTrans.home.hero.primaryCta },
    secondaryCta: { ...hero?.secondaryCta, label: contentTrans.home.hero.secondaryCta },
  }
  const videoConfig = videoSection || { title: 'Video', description: '', cta: { label: 'Watch', href: '/' } }
  const statsData = stats || []
  const aboutData = about || { title: contentTrans.home.about.title, description: '', cta: { label: t.common.learnMore, href: '/about' } }
  const capabilitiesData = capabilities || { title: contentTrans.home.capabilities.title, items: [] }
  const productsData = products || { title: contentTrans.home.products.title, categories: [] }

  return (
    <>
      {/* Hero Section with Video Background */}
      <HomeHeroVideo config={heroConfig} />

      {/* Video Feature Section - Below Hero */}
      <HomeVideoFeature config={videoConfig} />

      {/* Stats */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1E6F5C]">{stat.value}</div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">{t.pages.about.toUpperCase()}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t.hero.aboutTitle}
              </h2>
              <p className="text-slate-600 mb-4">
                {t.content?.aboutDesc1 || 'Headquartered in Vientiane, Laos, Raysun Biopharma is a leading GMP-certified pharmaceutical manufacturer with a commitment to quality, innovation, and accessibility.'}
              </p>
              <p className="text-slate-600 mb-8">
                {t.content?.aboutDesc2 || 'Our state-of-the-art manufacturing facility produces a wide range of pharmaceutical products, serving healthcare needs across Southeast Asia, the Middle East, and Africa.'}
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
                {t.common.learnMore} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-64 md:h-80 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                <div className="text-center">
                  <Factory className="w-12 h-12 md:w-16 md:h-16 text-slate-300 mx-auto mb-3" />
                  <p className="text-xs md:text-sm text-slate-400 font-medium">{t.content?.manufacturingFacility || 'Manufacturing Facility'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      {capabilitiesData?.items?.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#1E6F5C] font-medium mb-2">{t.content?.capabilities || 'OUR CAPABILITIES'}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{capabilitiesData.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilitiesData.items.map((cap: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  {cap.icon === 'Factory' && <Factory className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                  {cap.icon === 'FlaskConical' && <FlaskConical className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                  {cap.icon === 'Shield' && <Shield className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                  {cap.icon === 'Award' && <Award className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                  <h3 className="font-semibold text-slate-900 mb-2">{cap.title}</h3>
                  <p className="text-sm text-slate-600">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {productsData?.categories?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#1E6F5C] font-medium mb-2">{t.pages.products.toUpperCase()}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{productsData.title}</h2>
              </div>
              <Link href="/products" className="hidden md:inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
                {contentTrans.home.products.viewAll} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData.categories.slice(0, 4).map((cat: any, idx: number) => (
                <Link key={idx} href={cat.href || '/products'} className="group">
                  <div className="bg-slate-50 rounded-xl p-6 hover:bg-blue-50 transition-colors h-full">
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-[#1E6F5C]">{cat.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{cat.description}</p>
                    <p className="text-xs text-[#1E6F5C] font-medium">{cat.count || '0'}+ Products</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quality & Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">{t.pages.qualityCompliance.toUpperCase()}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t.hero.qualityTitle}
              </h2>
              <p className="text-slate-600 mb-6">
                {t.content?.qualityDesc || 'Our manufacturing facility operates under strict quality management systems to ensure every product meets international standards. We maintain comprehensive documentation and compliance readiness for regulated markets worldwide.'}
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1E6F5C]" />
                  <span className="text-slate-700">{t.content?.whoGmpCertified || 'WHO GMP Certified Manufacturing'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1E6F5C]" />
                  <span className="text-slate-700">{t.content?.isoCertified || 'ISO 9001:2015 Quality Management'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1E6F5C]" />
                  <span className="text-slate-700">{t.content?.comprehensiveQA || 'Comprehensive Quality Assurance'}</span>
                </div>
              </div>
              <Link href="/quality-compliance" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
                {t.common.learnMore} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <Shield className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{t.content?.gmpStandards || 'GMP Standards'}</h3>
                <p className="text-xs text-slate-500">{t.content?.whoGmpCertifiedShort || 'WHO-GMP Certified'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <Award className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{t.content?.isoCertified || 'ISO Certified'}</h3>
                <p className="text-xs text-slate-500">{t.content?.qualityManagement || 'Quality Management'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <FileText className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{t.content?.documentation || 'Documentation'}</h3>
                <p className="text-xs text-slate-500">{t.content?.completeRecords || 'Complete Records'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <FlaskConical className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{t.content?.qcTesting || 'QC Testing'}</h3>
                <p className="text-xs text-slate-500">{t.content?.rigorousStandards || 'Rigorous Standards'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Markets */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{contentTrans.home.global.title.toUpperCase()}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t.hero.rdTitle}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t.content?.globalDesc || 'Our manufacturing capabilities support pharmaceutical companies and healthcare providers across multiple regions with reliable supply and regulatory compliance.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Globe className="w-10 h-10 text-[#1E6F5C] mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">{t.content?.southeastAsia || 'Southeast Asia'}</h3>
              <p className="text-sm text-slate-600 mb-4">{t.content?.southeastAsiaDesc || 'Primary market focus with established distribution networks in Thailand, Cambodia, Myanmar, Vietnam, and Laos.'}</p>
              <div className="flex items-center gap-2 text-xs text-[#1E6F5C] font-medium">
                <ArrowUpRight className="w-3 h-3" /> {t.common.learnMore}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <MapPin className="w-10 h-10 text-[#1E6F5C] mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">{t.content?.middleEast || 'Middle East'}</h3>
              <p className="text-sm text-slate-600 mb-4">{t.content?.middleEastDesc || 'Growing presence in UAE, Saudi Arabia, and neighboring markets with regulatory-aligned products.'}</p>
              <div className="flex items-center gap-2 text-xs text-[#1E6F5C] font-medium">
                <ArrowUpRight className="w-3 h-3" /> {t.common.learnMore}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Users className="w-10 h-10 text-[#1E6F5C] mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">{t.content?.africaBeyond || 'Africa & Beyond'}</h3>
              <p className="text-sm text-slate-600 mb-4">{t.content?.africaBeyondDesc || 'Partnership opportunities for quality generic medicines targeting underserved healthcare markets.'}</p>
              <div className="flex items-center gap-2 text-xs text-[#1E6F5C] font-medium">
                <ArrowUpRight className="w-3 h-3" /> {t.common.learnMore}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">{t.content?.latestNews || 'LATEST NEWS'}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.hero.newsTitle}</h2>
            </div>
            <Link href="/news" className="hidden md:inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
              {contentTrans.home.products.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/news/gmp-re-certification-success" className="group">
              <div className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#1E6F5C] mb-2">
                    <span>Mar 2026</span>
                    <span>•</span>
                    <span>Quality</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-[#1E6F5C]">GMP Re-certification Success</h3>
                </div>
              </div>
            </Link>
            <Link href="/news/new-asean-distribution-partnership" className="group">
              <div className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#1E6F5C] mb-2">
                    <span>Mar 2026</span>
                    <span>•</span>
                    <span>Business</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-[#1E6F5C]">ASEAN Distribution Partnership</h3>
                </div>
              </div>
            </Link>
            <Link href="/news/rd-facility-expansion" className="group">
              <div className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#1E6F5C] mb-2">
                    <span>Feb 2026</span>
                    <span>•</span>
                    <span>Innovation</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-[#1E6F5C]">R&D Facility Expansion</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{t.content?.resources || 'RESOURCES'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.hero.resourcesTitle}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/resources/company-brochure" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
              <FileText className="w-8 h-8 text-[#1E6F5C] mb-4" />
              <h3 className="font-medium text-slate-900 mb-1">{t.content?.companyOverview || 'Company Overview'}</h3>
              <p className="text-xs text-slate-500">PDF • 2.4 MB</p>
            </Link>
            <Link href="/resources/product-catalog" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
              <FileText className="w-8 h-8 text-[#1E6F5C] mb-4" />
              <h3 className="font-medium text-slate-900 mb-1">{t.content?.productCatalog || 'Product Catalog'}</h3>
              <p className="text-xs text-slate-500">PDF • 5.8 MB</p>
            </Link>
            <Link href="/resources/quality-certifications" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
              <FileText className="w-8 h-8 text-[#1E6F5C] mb-4" />
              <h3 className="font-medium text-slate-900 mb-1">{t.content?.qualityCertifications || 'Quality Certifications'}</h3>
              <p className="text-xs text-slate-500">PDF • 1.2 MB</p>
            </Link>
            <Link href="/resources/iso-9001-certificate" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
              <FileText className="w-8 h-8 text-[#1E6F5C] mb-4" />
              <h3 className="font-medium text-slate-900 mb-1">{t.content?.sustainabilityReport || 'Sustainability Report'}</h3>
              <p className="text-xs text-slate-500">PDF • 3.5 MB</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
// Force redeploy Thu Mar 19 19:02:44 CST 2026
