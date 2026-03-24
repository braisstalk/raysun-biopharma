'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Heart, FlaskConical, Users, Globe, FileText, ChevronRight } from 'lucide-react'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'
import AutoText from '@/components/common/AutoText'

const iconMap: Record<string, React.ElementType> = {
  FlaskConical, Heart, Globe, BookOpen, FileText, Users,
}

const fallbackFeatures = [
  { icon: 'FlaskConical', title: <AutoText text="Research & Development" as="span" />, description: <AutoText text="Our state-of-the-art R&D facilities drive innovation across pharmaceutical formulations, drug delivery systems, and novel therapeutic approaches." as="span" />, href: '/rd-innovation' },
  { icon: 'Heart', title: <AutoText text="Patient Impact" as="span" />, description: <AutoText text="We measure success by the lives we touch. Our medicines reach patients across 6+ countries, improving health outcomes globally." as="span" />, href: '/what-science-can-do/stories-of-impact' },
  { icon: 'Globe', title: <AutoText text="Global Health Access" as="span" />, description: <AutoText text="Expanding access to quality medicines in underserved regions through strategic partnerships and sustainable manufacturing." as="span" />, href: '/about' },
]

const fallbackImpactAreas = [
  { title: <AutoText text="Cardiovascular Health" as="span" />, count: '45+', description: <AutoText text="Products for heart disease prevention and treatment" as="span" /> },
  { title: <AutoText text="Pain Management" as="span" />, count: '30+', description: <AutoText text="Effective solutions for acute and chronic pain" as="span" /> },
  { title: <AutoText text="Antibiotics" as="span" />, count: '25+', description: <AutoText text="Fighting infectious diseases worldwide" as="span" /> },
  { title: <AutoText text="Pediatric Formulations" as="span" />, count: '20+', description: <AutoText text="Child-friendly medicines for younger patients" as="span" /> },
]

const fallbackStats = [
  { value: '200+', label: <AutoText text="Products" as="span" /> },
  { value: '10+', label: <AutoText text="Years of Innovation" as="span" /> },
  { value: '6+', label: <AutoText text="Countries Served" as="span" /> },
  { value: '50+', label: <AutoText text="Research Partnerships" as="span" /> },
]

export default function WhatScienceCanDo() {
  const cms = usePageContent('what-science-can-do')

  const heroHeading = cms?.heroHeading || <AutoText text="Transforming Lives Through Pharmaceutical Science" as="span" />
  const heroDescription = cms?.heroDescription || <AutoText text="At Raysun Biopharma, science is more than research — it's a commitment to improving lives." as="span" />
  const stats = cms?.stats || fallbackStats
  const features = cms?.features || fallbackFeatures
  const impactAreas = cms?.impactAreas || fallbackImpactAreas
  const ctaCards = cms?.ctaCards || [
    { title: <AutoText text="Stories of Impact" as="span" />, description: <AutoText text="Discover how our medicines and partnerships are transforming healthcare in communities worldwide." as="span" />, href: '/what-science-can-do/stories-of-impact', linkLabel: <AutoText text="Explore stories" as="span" /> },
    { title: <AutoText text="Publications" as="span" />, description: <AutoText text="Browse our scientific publications, research papers, and contributions to pharmaceutical science." as="span" />, href: '/what-science-can-do/publications', linkLabel: <AutoText text="View publications" as="span" /> },
  ]
  const partnerCta = cms?.partnerCta || {
    title: <AutoText text="Partner With Us" as="span" />,
    description: <AutoText text="Collaborate with our R&D team to bring innovative pharmaceutical solutions to market." as="span" />,
    primaryLink: { label: <AutoText text="Contact Our Team" as="span" />, href: '/contact' },
    secondaryLink: { label: <AutoText text="Learn About Us" as="span" />, href: '/about' },
  }

  return (
    <>
      <StrapiHeroCarousel
        page="what-science-can-do"
        badge={<AutoText text="WHAT SCIENCE CAN DO" as="span" />}
        badgeColor="text-blue-300"
        heading={heroHeading}
        description={heroDescription}
      />

      {/* Stats */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-slate-600 mt-1"><AutoText text={stat.label} as="span" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium mb-2"><AutoText text="OUR APPROACH" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900"><AutoText text="Science-Led Innovation" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature: any, idx: number) => {
              const FeatureIcon = iconMap[feature.icon] || FlaskConical
              return (
                <Link key={idx} href={feature.href} className="group">
                  <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-all h-full">
                    <FeatureIcon className="w-12 h-12 text-blue-600 mb-6" />
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors"><AutoText text={feature.title} as="span" /></h3>
                    <p className="text-slate-600 mb-6 leading-relaxed"><AutoText text={feature.description} as="span" /></p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span><AutoText text="Learn more" as="span" /></span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-medium mb-2"><AutoText text="THERAPEUTIC FOCUS" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900"><AutoText text="Areas of Impact" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">{area.count}</div>
                <h3 className="font-semibold text-slate-900 mb-2"><AutoText text={area.title} as="span" /></h3>
                <p className="text-sm text-slate-600"><AutoText text={area.description} as="span" /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Link href={ctaCards[0]?.href || '/what-science-can-do/stories-of-impact'} className="group bg-slate-900 rounded-2xl p-8 text-white hover:bg-slate-800 transition-colors">
              <BookOpen className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3"><AutoText text={ctaCards[0]?.title || 'Stories of Impact'} as="span" /></h3>
              <p className="text-slate-300 mb-6"><AutoText text={ctaCards[0]?.description} as="span" /></p>
              <div className="flex items-center text-blue-400 font-medium">
                <span><AutoText text={ctaCards[0]?.linkLabel || 'Explore stories'} as="span" /></span>
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link href={ctaCards[1]?.href || '/what-science-can-do/publications'} className="group bg-blue-600 rounded-2xl p-8 text-white hover:bg-blue-700 transition-colors">
              <FileText className="w-10 h-10 text-blue-200 mb-4" />
              <h3 className="text-2xl font-bold mb-3"><AutoText text={ctaCards[1]?.title || 'Publications'} as="span" /></h3>
              <p className="text-blue-100 mb-6"><AutoText text={ctaCards[1]?.description} as="span" /></p>
              <div className="flex items-center text-white font-medium">
                <span><AutoText text={ctaCards[1]?.linkLabel || 'View publications'} as="span" /></span>
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"><AutoText text={partnerCta.title} as="span" /></h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto"><AutoText text={partnerCta.description} as="span" /></p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={partnerCta.primaryLink?.href || '/contact'} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                <AutoText text={partnerCta.primaryLink?.label || 'Contact Our Team'} as="span" />
              </Link>
              <Link href={partnerCta.secondaryLink?.href || '/about'} className="border border-white/30 hover:border-white text-white px-6 py-3 rounded-lg font-medium transition-colors">
                <AutoText text={partnerCta.secondaryLink?.label || 'Learn About Us'} as="span" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
