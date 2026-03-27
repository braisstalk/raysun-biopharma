'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Heart, FlaskConical, Users, Globe, FileText, ChevronRight } from 'lucide-react'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'

const iconMap: Record<string, React.ElementType> = {
  FlaskConical, Heart, Globe, BookOpen, FileText, Users,
}

const fallbackFeatures = [
  { icon: 'FlaskConical', title: 'Research & Development', description: 'Our state-of-the-art R&D facilities drive innovation across pharmaceutical formulations, drug delivery systems, and novel therapeutic approaches.', href: '/rd-innovation' },
  { icon: 'Heart', title: 'Patient Impact', description: 'We measure success by the lives we touch. Our medicines reach patients across 6+ countries, improving health outcomes globally.', href: '/what-science-can-do/stories-of-impact' },
  { icon: 'Globe', title: 'Global Health Access', description: 'Expanding access to quality medicines in underserved regions through strategic partnerships and sustainable manufacturing.', href: '/about' },
]

const fallbackImpactAreas = [
  { title: 'Cardiovascular Health', count: '45+', description: 'Products for heart disease prevention and treatment' },
  { title: 'Pain Management', count: '30+', description: 'Effective solutions for acute and chronic pain' },
  { title: 'Antibiotics', count: '25+', description: 'Fighting infectious diseases worldwide' },
  { title: 'Pediatric Formulations', count: '20+', description: 'Child-friendly medicines for younger patients' },
]

const fallbackStats = [
  { value: '200+', label: 'Products' },
  { value: '10+', label: 'Years of Innovation' },
  { value: '6+', label: 'Countries Served' },
  { value: '50+', label: 'Research Partnerships' },
]

export default function WhatScienceCanDo() {
  const cms = usePageContent('what-science-can-do')

  const heroHeading = cms?.heroHeading || 'Transforming Lives Through Pharmaceutical Science'
  const heroDescription = cms?.heroDescription || "At Raysun Biopharma, science is more than research — it's a commitment to improving lives."
  const stats = cms?.stats || fallbackStats
  const features = cms?.features || fallbackFeatures
  const impactAreas = cms?.impactAreas || fallbackImpactAreas
  const ctaCards = cms?.ctaCards || [
    { title: 'Stories of Impact', description: 'Discover how our medicines and partnerships are transforming healthcare in communities worldwide.', href: '/what-science-can-do/stories-of-impact', linkLabel: 'Explore stories' },
    { title: 'Publications', description: 'Browse our scientific publications, research papers, and contributions to pharmaceutical science.', href: '/what-science-can-do/publications', linkLabel: 'View publications' },
  ]
  const partnerCta = cms?.partnerCta || {
    title: 'Partner With Us',
    description: 'Collaborate with our R&D team to bring innovative pharmaceutical solutions to market.',
    primaryLink: { label: 'Contact Our Team', href: '/contact' },
    secondaryLink: { label: 'Learn About Us', href: '/about' },
  }

  return (
    <>
      <StrapiHeroCarousel
        page="what-science-can-do"
        badge="WHAT SCIENCE CAN DO"
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
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium mb-2">OUR APPROACH</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Science-Led Innovation</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature: any, idx: number) => {
              const FeatureIcon = iconMap[feature.icon] || FlaskConical
              return (
                <Link key={idx} href={feature.href} className="group">
                  <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-all h-full">
                    <FeatureIcon className="w-12 h-12 text-blue-600 mb-6" />
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>Learn more</span>
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
            <p className="text-blue-600 font-medium mb-2">THERAPEUTIC FOCUS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Areas of Impact</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">{area.count}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{area.title}</h3>
                <p className="text-sm text-slate-600">{area.description}</p>
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
              <h3 className="text-2xl font-bold mb-3">{ctaCards[0]?.title || 'Stories of Impact'}</h3>
              <p className="text-slate-300 mb-6">{ctaCards[0]?.description}</p>
              <div className="flex items-center text-blue-400 font-medium">
                <span>{ctaCards[0]?.linkLabel || 'Explore stories'}</span>
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link href={ctaCards[1]?.href || '/what-science-can-do/publications'} className="group bg-blue-600 rounded-2xl p-8 text-white hover:bg-blue-700 transition-colors">
              <FileText className="w-10 h-10 text-blue-200 mb-4" />
              <h3 className="text-2xl font-bold mb-3">{ctaCards[1]?.title || 'Publications'}</h3>
              <p className="text-blue-100 mb-6">{ctaCards[1]?.description}</p>
              <div className="flex items-center text-white font-medium">
                <span>{ctaCards[1]?.linkLabel || 'View publications'}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{partnerCta.title}</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">{partnerCta.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={partnerCta.primaryLink?.href || '/contact'} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                {partnerCta.primaryLink?.label || 'Contact Our Team'}
              </Link>
              <Link href={partnerCta.secondaryLink?.href || '/about'} className="border border-white/30 hover:border-white text-white px-6 py-3 rounded-lg font-medium transition-colors">
                {partnerCta.secondaryLink?.label || 'Learn About Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
