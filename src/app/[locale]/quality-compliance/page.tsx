'use client'

import Link from 'next/link'
import { Shield, Award, CheckCircle, ArrowRight, FileText, FlaskConical, Eye, ClipboardCheck, BarChart3, RefreshCw, Lock, Globe, BookOpen, Microscope } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import HeroCarousel from '@/components/common/HeroCarousel'
import { homeHeroSlides } from '@/config/heroSlides'

export default function QualityCompliance() {
  const { t } = useTranslation()

  const certifications = [
    { icon: Award, title: 'WHO GMP', subtitle: 'Good Manufacturing Practice', description: 'All production lines certified to World Health Organization GMP standards, ensuring products meet international quality expectations for regulated and semi-regulated markets.', year: '2017' },
    { icon: Shield, title: 'ISO 9001:2015', subtitle: 'Quality Management System', description: 'Systematic approach to quality management covering all processes from material procurement through manufacturing to distribution and post-market surveillance.', year: '2021' },
    { icon: Globe, title: 'ISO 14001', subtitle: 'Environmental Management', description: 'Commitment to environmentally responsible manufacturing with waste minimization, energy efficiency, and sustainable practices throughout our operations.', year: '2024' },
  ]

  const qaActivities = [
    { icon: ClipboardCheck, title: 'Document Control', description: 'Comprehensive documentation system managing SOPs, batch records, specifications, and change control across all departments.' },
    { icon: RefreshCw, title: 'Change Control', description: 'Structured change management process for equipment, processes, and systems ensuring no uncontrolled changes impact product quality.' },
    { icon: Eye, title: 'Internal Audits', description: 'Regular self-inspections and internal audits across all GMP areas to identify and resolve compliance gaps proactively.' },
    { icon: BarChart3, title: 'CAPA Management', description: 'Systematic Corrective and Preventive Action (CAPA) program to investigate deviations and prevent recurrence.' },
    { icon: BookOpen, title: 'Training Program', description: 'Continuous GMP and job-specific training for all personnel with competency assessments and refresher schedules.' },
    { icon: Lock, title: 'Supplier Qualification', description: 'Rigorous supplier approval program including audits, quality agreements, and ongoing performance monitoring for all critical materials.' },
  ]

  const qcCapabilities = [
    { title: 'Chemical Analysis', items: ['HPLC & UPLC systems', 'UV-Vis Spectrophotometry', 'IR Spectroscopy (FTIR)', 'Dissolution testing apparatus', 'Karl Fischer titration'] },
    { title: 'Physical Testing', items: ['Hardness & friability testing', 'Disintegration testing', 'Particle size analysis', 'Weight variation analysis', 'Viscosity measurement'] },
    { title: 'Microbiological Testing', items: ['Bioburden testing', 'Sterility testing', 'Endotoxin (LAL) testing', 'Environmental monitoring', 'Water system monitoring'] },
    { title: 'Stability Studies', items: ['ICH-compliant stability chambers', 'Long-term stability (25°C/60% RH)', 'Accelerated stability (40°C/75% RH)', 'Photostability testing', 'In-use stability studies'] },
  ]

  const regulatoryMarkets = [
    { region: 'ASEAN', countries: 'Laos, Thailand, Vietnam, Cambodia, Myanmar, Malaysia, Singapore', status: 'Active registrations' },
    { region: 'Middle East', countries: 'UAE, Saudi Arabia, Oman, Kuwait', status: 'Growing portfolio' },
    { region: 'Africa', countries: 'East & West Africa', status: 'Expanding presence' },
    { region: 'South Asia', countries: 'Bangladesh, Sri Lanka', status: 'Market development' },
  ]

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel
        badge="QUALITY"
        badgeColor="text-emerald-400"
        heading={t.hero.qualityTitle}
        description={t.hero.qualitySubtitle}
        slides={homeHeroSlides}
      />

      {/* Quality Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">QUALITY PHILOSOPHY</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Built on Quality, Driven by Compliance</h2>
              <p className="text-slate-600 mb-4">At Raysun Biopharma, quality is not a department — it is embedded in every aspect of our operations. From facility design to final product release, our quality management system ensures that every product meets the highest standards of safety, efficacy, and purity.</p>
              <p className="text-slate-600 mb-6">Our quality systems are designed to meet the regulatory expectations of multiple markets simultaneously, enabling us to serve customers across ASEAN, the Middle East, and Africa with confidence.</p>
              <div className="space-y-3">
                {['Zero tolerance for quality deviations', 'Continuous improvement culture', 'Data-driven decision making', 'Regulatory-first mindset'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C] shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium">Quality Control Laboratory</p>
                <p className="text-xs text-slate-400 mt-1">Photo coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">CERTIFICATIONS & ACCREDITATIONS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Internationally Recognized Standards</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm">
                <cert.icon className="w-12 h-12 text-[#1E6F5C] mb-4" />
                <h3 className="font-bold text-xl text-slate-900 mb-1">{cert.title}</h3>
                <p className="text-sm text-[#1E6F5C] font-medium mb-3">{cert.subtitle}</p>
                <p className="text-sm text-slate-600 mb-4">{cert.description}</p>
                <span className="text-xs text-[#1E6F5C] font-medium bg-[#1E6F5C]/10 px-3 py-1 rounded-full">Since {cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">QUALITY ASSURANCE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive QA Framework</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our Quality Assurance team oversees all aspects of the pharmaceutical quality system, ensuring compliance with GMP requirements and continuous improvement.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qaActivities.map((activity, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6">
                <activity.icon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{activity.title}</h3>
                <p className="text-sm text-slate-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Laboratory */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">QUALITY CONTROL LABORATORY</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Advanced Analytical Capabilities</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our fully equipped QC laboratory performs comprehensive testing on raw materials, in-process samples, and finished products using validated analytical methods.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qcCapabilities.map((cap, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <Microscope className="w-8 h-8 text-[#1E6F5C] mb-3" />
                <h3 className="font-bold text-slate-900 mb-3">{cap.title}</h3>
                <ul className="space-y-2">
                  {cap.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-3 h-3 text-[#1E6F5C] mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Affairs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">REGULATORY AFFAIRS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Multi-Market Registration Capability</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our regulatory affairs team manages product registrations and maintains compliance across multiple jurisdictions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regulatoryMarkets.map((market, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 text-center">
                <Globe className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-1">{market.region}</h3>
                <p className="text-xs text-slate-600 mb-2">{market.countries}</p>
                <span className="text-xs text-[#1E6F5C] font-medium">{market.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Quality You Can Trust</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">Download our quality certifications or contact our regulatory affairs team to discuss product registration in your market.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/resources" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">
              <FileText className="w-4 h-4" /> Download Certifications
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              {t.cta.contact} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
