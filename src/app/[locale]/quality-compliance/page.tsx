'use client'

import Link from 'next/link'
import { Shield, Award, CheckCircle, ArrowRight, FileText, FlaskConical, Eye, ClipboardCheck, BarChart3, RefreshCw, Lock, Globe, BookOpen, Microscope, Leaf } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'

const iconMap: Record<string, React.ElementType> = {
  Shield, Award, FileText, FlaskConical, Eye, ClipboardCheck, BarChart3, RefreshCw, Lock, Globe, BookOpen, Microscope, Leaf,
}

export default function QualityCompliance() {
  const { t } = useTranslation()
  const cms = usePageContent('quality-compliance')

  const philosophy = cms?.philosophy || {
    title: 'Built on Quality, Driven by Compliance',
    description: 'At Raysun Biopharma, quality is not a department — it is embedded in every aspect of our operations. From facility design to final product release, our quality management system ensures that every product meets the highest standards of safety, efficacy, and purity.',
  }

  const certifications = cms?.certifications || [
    { icon: 'Award', title: 'WHO GMP', subtitle: 'Good Manufacturing Practice', description: 'All production lines certified to World Health Organization GMP standards.', year: '2017' },
    { icon: 'Shield', title: 'ISO 9001:2015', subtitle: 'Quality Management System', description: 'Systematic approach to quality management covering all processes.', year: '2021' },
    { icon: 'Leaf', title: 'ISO 14001', subtitle: 'Environmental Management', description: 'Commitment to environmentally responsible manufacturing.', year: '2024' },
  ]

  const qmsFramework = cms?.qmsFramework || [
    { title: 'Document Control', description: 'Comprehensive SOP management with version control and electronic approval workflows' },
    { title: 'Change Control', description: 'Structured change management process for facilities, processes, and documentation' },
    { title: 'CAPA System', description: 'Corrective and Preventive Action system for continuous quality improvement' },
    { title: 'Training Management', description: 'Competency-based training program for all manufacturing and quality personnel' },
    { title: 'Supplier Qualification', description: 'Rigorous supplier audit and qualification program for raw materials and packaging' },
    { title: 'Batch Record Review', description: '100% review of batch manufacturing records prior to product release' },
  ]

  const qcCapabilities = cms?.qcCapabilities || [
    'HPLC & UPLC Systems', 'UV-Vis Spectrophotometry', 'Dissolution Testing (USP)',
    'Friability & Hardness Testing', 'Particle Size Analysis', 'Microbiological Testing',
    'Stability Testing (ICH Zones)', 'Water Testing (TOC, Conductivity)',
  ]

  const regulatoryMarkets = cms?.regulatoryMarkets || [
    { region: 'Laos (FDA)', status: 'Registered', products: 'Full portfolio' },
    { region: 'Thailand (FDA)', status: 'In Progress', products: 'Selected products' },
    { region: 'Cambodia (MOH)', status: 'Registered', products: 'Essential medicines' },
    { region: 'Vietnam (DAV)', status: 'Planned', products: 'Generic portfolio' },
    { region: 'Myanmar (FDA)', status: 'In Progress', products: 'Selected products' },
  ]

  return (
    <>
      <StrapiHeroCarousel
        page="quality-compliance"
        badge="QUALITY"
        badgeColor="text-emerald-400"
        heading={t.hero.qualityTitle}
        description={t.hero.qualitySubtitle}
      />

      {/* Quality Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">QUALITY PHILOSOPHY</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{philosophy.title}</h2>
              <p className="text-slate-600 mb-6">{philosophy.description}</p>
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
            {certifications.map((cert: any, idx: number) => {
              const CertIcon = iconMap[cert.icon] || Award
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-sm">
                  <CertIcon className="w-12 h-12 text-[#1E6F5C] mb-4" />
                  <h3 className="font-bold text-xl text-slate-900 mb-1">{cert.title}</h3>
                  <p className="text-sm text-[#1E6F5C] font-medium mb-3">{cert.subtitle}</p>
                  <p className="text-sm text-slate-600 mb-4">{cert.description}</p>
                  <span className="text-xs text-[#1E6F5C] font-medium bg-[#1E6F5C]/10 px-3 py-1 rounded-full">Since {cert.year}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* QMS Framework */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">QUALITY MANAGEMENT SYSTEM</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive QA Framework</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qmsFramework.map((item: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6">
                <CheckCircle className="w-10 h-10 text-[#1E6F5C] mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QC Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">QUALITY CONTROL LABORATORY</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Advanced Analytical Capabilities</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {qcCapabilities.map((cap: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 bg-white rounded-lg p-4">
                <CheckCircle className="w-4 h-4 text-[#1E6F5C] shrink-0" />
                <span className="text-sm text-slate-700">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Markets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">REGULATORY AFFAIRS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Multi-Market Registration</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {regulatoryMarkets.map((market: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 text-center">
                <Globe className="w-8 h-8 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-sm mb-1">{market.region}</h3>
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
          <p className="text-white/80 max-w-2xl mx-auto mb-8">Download our quality certifications or contact our regulatory affairs team.</p>
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
