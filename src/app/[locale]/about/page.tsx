'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Target, Eye, Users, Award, MapPin, Building2, Globe, Heart, Shield } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import HeroCarousel from '@/components/common/HeroCarousel'
import { getHeroSlides } from '@/config/hero-slides'

export default function About() {
  const { t } = useTranslation()

  // Company highlights - using translations
  const highlights = [
    { value: '10+', label: t.stats.years, icon: Award },
    { value: '12,000', label: t.stats.sqm, icon: Building2 },
    { value: '6+', label: t.stats.countries, icon: Globe },
    { value: '100+', label: t.stats.team, icon: Users },
  ]

  // Milestones - professional timeline
  const milestones = [
    { year: '2014', title: 'Company Founded', desc: 'Raysun Biopharma established in Vientiane, Laos' },
    { year: '2016', title: 'Factory Completed', desc: '12,000 sqm state-of-the-art manufacturing facility completed' },
    { year: '2017', title: 'GMP Certification', desc: 'Achieved WHO GMP certification for all production lines' },
    { year: '2019', title: 'Product Expansion', desc: 'Expanded softgel and tablet production capabilities' },
    { year: '2021', title: 'ISO Certification', desc: 'Quality Management System certified to ISO 9001:2015' },
    { year: '2023', title: 'Regional Expansion', desc: 'Expanded distribution to Thailand, Cambodia, and Myanmar' },
    { year: '2025', title: 'Global Presence', desc: 'Serving patients across multiple countries worldwide' },
  ]

  // Values as cards - using translations
  const values = [
    { icon: Shield, title: t.about.qualityFirst, desc: t.about.qualityFirstDesc },
    { icon: Heart, title: t.about.patientCentric, desc: t.about.patientCentricDesc },
    { icon: Target, title: t.about.continuousInnovation, desc: t.about.continuousInnovationDesc },
    { icon: CheckCircle, title: t.about.regulatoryExcellence, desc: t.about.regulatoryExcellenceDesc },
  ]

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel slides={getHeroSlides('about')} />

      {/* Company Highlights */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, idx) => (
              <div key={idx} className="text-center">
                <h.icon className="w-8 h-8 text-[#1E6F5C] mx-auto mb-2" />
                <div className="text-3xl font-bold text-slate-900">{h.value}</div>
                <div className="text-sm text-slate-600">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-[#1E6F5C] to-[#289c76] text-white rounded-2xl p-8">
              <Target className="w-10 h-10 mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-4">{t.about.ourMission}</h2>
              <p className="text-blue-100 text-lg">
                {t.about.missionDesc}
              </p>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-8">
              <Eye className="w-10 h-10 mb-4" />
              <h2 className="text-2xl font-bold mb-4">{t.about.ourVision}</h2>
              <p className="text-slate-300 text-lg">
                {t.about.visionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{t.about.ourValues}</p>
            <h2 className="text-3xl font-bold text-slate-900">{t.about.whatDrivesUs}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <v.icon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{t.about.ourJourney}</p>
            <h2 className="text-3xl font-bold text-slate-900">{t.about.milestones}</h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex gap-6 items-start relative">
                <div className="flex-shrink-0 w-32">
                  <span className="inline-block bg-[#1E6F5C] text-white text-sm font-bold px-4 py-2 rounded-full">
                    {m.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1E6F5C] mt-2.5 relative z-10">
                </div>
                {idx < milestones.length - 1 && (
                  <div className="absolute left-16 top-5 w-0.5 h-full bg-slate-200" />
                )}
                <div className="pt-1 pb-8">
                  <h3 className="font-semibold text-slate-900">{m.title}</h3>
                  <p className="text-sm text-slate-600">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{t.about.leadership}</p>
            <h2 className="text-3xl font-bold text-slate-900">{t.about.governance}</h2>
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-slate-600 mb-6">
              {t.about.leadershipInfo}
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm">
              <Users className="w-4 h-4" />
              {t.about.leadershipAvailable}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">{t.global.globalPresence}</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.about.servingWorldwide}</h2>
              <p className="text-slate-600 mb-6">
                {t.about.globalPresenceDesc}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['Laos', 'Thailand', 'Cambodia', 'Vietnam', 'Myanmar', 'Middle East', 'Africa'].map((region, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1E6F5C]" />
                    <span className="text-sm text-slate-700">{region}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <Globe className="w-16 h-16 mx-auto mb-3" />
                <p className="text-lg font-medium">Global Distribution Network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E6F5C] to-[#289c76]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-4">{t.about.exploreCapabilities}</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              {t.about.capabilitiesDesc}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/manufacturing" className="bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 flex items-center gap-2">
              {t.nav.manufacturing} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/quality-compliance" className="bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 flex items-center gap-2">
              {t.nav.qualityCompliance} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/rd-innovation" className="bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 flex items-center gap-2">
              {t.nav.rdInnovation} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 flex items-center gap-2">
              {t.common.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
