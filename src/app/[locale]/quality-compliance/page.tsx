'use client'

import Link from 'next/link'
import { Shield, Award, CheckCircle, ArrowRight, FileText, FlaskConical, Eye, ClipboardCheck, BarChart3, RefreshCw, Lock, Globe, BookOpen, Microscope, Leaf } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'
import AutoText from '@/components/common/AutoText'

const iconMap: Record<string, React.ElementType> = {
  Shield, Award, FileText, FlaskConical, Eye, ClipboardCheck, BarChart3, RefreshCw, Lock, Globe, BookOpen, Microscope, Leaf,
}

export default function QualityCompliance() {
  const { t } = useTranslation()
  const cms = usePageContent('quality-compliance')

  // CMS 使用 qualityPhilosophy，提供 fallback
  const philosophy = (cms?.qualityPhilosophy || cms?.philosophy || {
    title: <AutoText text="Built on Quality, Driven by Compliance" as="span" />,
    description: <AutoText text="At Raysun Biopharma, quality is not a department — it is embedded in every aspect of our operations. From facility design to final product release, our quality management system ensures that every product meets the highest standards of safety, efficacy, and purity." as="span" />,
    checklist: [<AutoText text="Zero tolerance for quality deviations" as="span" />, <AutoText text="Continuous improvement culture" as="span" />, <AutoText text="Data-driven decision making" as="span" />, <AutoText text="Regulatory-first mindset" as="span" />],
  }) as any

  const certifications = cms?.certifications || [
    { icon: 'Award', title: <AutoText text="WHO GMP" as="span" />, subtitle: <AutoText text="Good Manufacturing Practice" as="span" />, description: <AutoText text="All production lines certified to World Health Organization GMP standards." as="span" />, year: '2017' },
    { icon: 'Shield', title: <AutoText text="ISO 9001:2015" as="span" />, subtitle: <AutoText text="Quality Management System" as="span" />, description: <AutoText text="Systematic approach to quality management covering all processes." as="span" />, year: '2021' },
    { icon: 'Leaf', title: <AutoText text="ISO 14001" as="span" />, subtitle: <AutoText text="Environmental Management" as="span" />, description: <AutoText text="Commitment to environmentally responsible manufacturing." as="span" />, year: '2024' },
  ]

  // CMS 使用 qaActivities，但代码期望 qmsFramework，进行转换
  const qmsFramework = (cms?.qmsFramework || (cms?.qaActivities as any[])?.map((qa: any) => ({
    title: qa.title,
    description: qa.description,
    icon: qa.icon,
  })) || [
    { title: <AutoText text="Document Control" as="span" />, description: <AutoText text="Comprehensive SOP management with version control and electronic approval workflows" as="span" /> },
    { title: <AutoText text="Change Control" as="span" />, description: <AutoText text="Structured change management process for facilities, processes, and documentation" as="span" /> },
    { title: <AutoText text="CAPA System" as="span" />, description: <AutoText text="Corrective and Preventive Action system for continuous quality improvement" as="span" /> },
    { title: <AutoText text="Training Management" as="span" />, description: <AutoText text="Competency-based training program for all manufacturing and quality personnel" as="span" /> },
    { title: <AutoText text="Supplier Qualification" as="span" />, description: <AutoText text="Rigorous supplier audit and qualification program for raw materials and packaging" as="span" /> },
    { title: <AutoText text="Batch Record Review" as="span" />, description: <AutoText text="100% review of batch manufacturing records prior to product release" as="span" /> },
  ])

  // CMS 数据是对象数组 {title, items}，fallback 也使用相同结构
  const qcCapabilities = cms?.qcCapabilities || [
    { title: <AutoText text="Chemical Analysis" as="span" />, items: [<AutoText text="HPLC & UPLC Systems" as="span" />, <AutoText text="UV-Vis Spectrophotometry" as="span" />, <AutoText text="Dissolution Testing (USP)" as="span" />, <AutoText text="Karl Fischer titration" as="span" />] },
    { title: <AutoText text="Physical Testing" as="span" />, items: [<AutoText text="Friability & Hardness Testing" as="span" />, <AutoText text="Particle Size Analysis" as="span" />, <AutoText text="Disintegration testing" as="span" />] },
    { title: <AutoText text="Microbiological Testing" as="span" />, items: [<AutoText text="Bioburden testing" as="span" />, <AutoText text="Sterility testing" as="span" />, <AutoText text="Endotoxin (LAL) testing" as="span" />] },
    { title: <AutoText text="Stability Studies" as="span" />, items: [<AutoText text="ICH-compliant stability chambers" as="span" />, <AutoText text="Accelerated stability" as="span" />, <AutoText text="Photostability testing" as="span" />] },
  ]

  const regulatoryMarkets = cms?.regulatoryMarkets || [
    { region: <AutoText text="Laos (FDA)" as="span" />, status: <AutoText text="Registered" as="span" />, products: <AutoText text="Full portfolio" as="span" /> },
    { region: <AutoText text="Thailand (FDA)" as="span" />, status: <AutoText text="In Progress" as="span" />, products: <AutoText text="Selected products" as="span" /> },
    { region: <AutoText text="Cambodia (MOH)" as="span" />, status: <AutoText text="Registered" as="span" />, products: <AutoText text="Essential medicines" as="span" /> },
    { region: <AutoText text="Vietnam (DAV)" as="span" />, status: <AutoText text="Planned" as="span" />, products: <AutoText text="Generic portfolio" as="span" /> },
    { region: <AutoText text="Myanmar (FDA)" as="span" />, status: <AutoText text="In Progress" as="span" />, products: <AutoText text="Selected products" as="span" /> },
  ]

  return (
    <>
      <StrapiHeroCarousel
        page="quality-compliance"
        badge={<AutoText text="QUALITY" as="span" />}
        badgeColor="text-emerald-400"
        heading={t.hero.qualityTitle}
        description={t.hero.qualitySubtitle}
      />

      {/* Quality Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="QUALITY PHILOSOPHY" as="span" /></p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"><AutoText text={philosophy.title} as="span" /></h2>
              <p className="text-slate-600 mb-6"><AutoText text={philosophy.description} as="span" /></p>
              <div className="space-y-3">
                {(philosophy.checklist || [<AutoText text="Zero tolerance for quality deviations" as="span" />, <AutoText text="Continuous improvement culture" as="span" />, <AutoText text="Data-driven decision making" as="span" />, <AutoText text="Regulatory-first mindset" as="span" />]).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C] shrink-0" />
                    <span className="text-slate-700"><AutoText text={item} as="span" /></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium"><AutoText text="Quality Control Laboratory" as="span" /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="CERTIFICATIONS & ACCREDITATIONS" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Internationally Recognized Standards" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert: any, idx: number) => {
              const CertIcon = iconMap[cert.icon] || Award
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-sm">
                  <CertIcon className="w-12 h-12 text-[#1E6F5C] mb-4" />
                  <h3 className="font-bold text-xl text-slate-900 mb-1"><AutoText text={cert.title} as="span" /></h3>
                  <p className="text-sm text-[#1E6F5C] font-medium mb-3"><AutoText text={cert.subtitle} as="span" /></p>
                  <p className="text-sm text-slate-600 mb-4"><AutoText text={cert.description} as="span" /></p>
                  <span className="text-xs text-[#1E6F5C] font-medium bg-[#1E6F5C]/10 px-3 py-1 rounded-full"><AutoText text="Since " as="span" />{cert.year}</span>
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
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="QUALITY MANAGEMENT SYSTEM" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Comprehensive QA Framework" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qmsFramework.map((item: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6">
                <CheckCircle className="w-10 h-10 text-[#1E6F5C] mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2"><AutoText text={item.title} as="span" /></h3>
                <p className="text-sm text-slate-600"><AutoText text={item.description} as="span" /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QC Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="QUALITY CONTROL LABORATORY" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Advanced Analytical Capabilities" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(qcCapabilities as any[]).map((cap: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4"><AutoText text={cap.title} as="span" /></h3>
                <ul className="space-y-2">
                  {(cap.items || []).map((item: string, itemIdx: number) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-[#1E6F5C] shrink-0 mt-0.5" />
                      <span><AutoText text={item} as="span" /></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Markets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="REGULATORY AFFAIRS" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Multi-Market Registration" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {regulatoryMarkets.map((market: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 text-center">
                <Globe className="w-8 h-8 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-sm mb-1"><AutoText text={market.region} as="span" /></h3>
                <span className="text-xs text-[#1E6F5C] font-medium"><AutoText text={market.status} as="span" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4"><AutoText text="Quality You Can Trust" as="span" /></h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8"><AutoText text="Download our quality certifications or contact our regulatory affairs team." as="span" /></p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/resources" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">
              <FileText className="w-4 h-4" /> <AutoText text="Download Certifications" as="span" />
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
