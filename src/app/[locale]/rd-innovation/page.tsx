'use client'

import Link from 'next/link'
import { FlaskConical, Lightbulb, ArrowRight, CheckCircle, Microscope, Atom, BookOpen, Users, Target, Beaker, Layers, FileText, Award, Handshake, Rocket, Globe } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'
import AutoText from '@/components/common/AutoText'

const iconMap: Record<string, React.ElementType> = {
  FlaskConical, Lightbulb, Microscope, Atom, BookOpen, Users, Target, Beaker, Layers, FileText, Award, Handshake, Rocket, Globe,
}

export default function RdInnovation() {
  const { t } = useTranslation()
  const cms = usePageContent('rd-innovation')

  const rdStats = cms?.stats || [
    { value: '15+', label: <AutoText text="R&D Scientists" as="span" /> },
    { value: '30+', label: <AutoText text="Products in Pipeline" as="span" /> },
    { value: '8', label: <AutoText text="Dosage Forms" as="span" /> },
    { value: '5+', label: <AutoText text="Research Partnerships" as="span" /> },
  ]

  const rdCapabilities = cms?.focusAreas || [
    { icon: 'FlaskConical', title: <AutoText text="Generic Drug Development" as="span" />, description: <AutoText text="Full-cycle development of generic pharmaceuticals from formulation screening through bioequivalence studies." as="span" /> },
    { icon: 'Layers', title: <AutoText text="Formulation Innovation" as="span" />, description: <AutoText text="Development of novel drug delivery systems including sustained-release formulations." as="span" /> },
    { icon: 'Beaker', title: <AutoText text="Analytical Method Development" as="span" />, description: <AutoText text="Development and validation of analytical methods for quality control testing." as="span" /> },
    { icon: 'Microscope', title: <AutoText text="Stability Studies" as="span" />, description: <AutoText text="ICH-compliant stability programs supporting product registrations across climatic zones." as="span" /> },
    { icon: 'Atom', title: <AutoText text="Process Optimization" as="span" />, description: <AutoText text="Continuous improvement through Design of Experiments (DoE) and process analytical technology." as="span" /> },
    { icon: 'BookOpen', title: <AutoText text="Regulatory Dossier Preparation" as="span" />, description: <AutoText text="Complete registration dossiers in CTD/eCTD format for multi-market submissions." as="span" /> },
  ]

  const pipeline = cms?.pipeline || [
    { phase: <AutoText text="Registration" as="span" />, count: 8, description: <AutoText text="Products in active registration across target markets" as="span" /> },
    { phase: <AutoText text="Stability Studies" as="span" />, count: 6, description: <AutoText text="Products undergoing stability studies" as="span" /> },
    { phase: <AutoText text="Formulation" as="span" />, count: 10, description: <AutoText text="Products in formulation development" as="span" /> },
  ]

  const capabilities = cms?.capabilities || [
    <AutoText text="HPLC & UPLC Analysis" as="span" />, <AutoText text="Dissolution Testing" as="span" />, <AutoText text="Stability Chambers (ICH zones)" as="span" />,
    <AutoText text="Microbiological Testing" as="span" />, <AutoText text="Particle Size Analysis" as="span" />, <AutoText text="Karl Fischer Moisture Analysis" as="span" />,
  ]

  return (
    <>
      <StrapiHeroCarousel
        page="rd-innovation"
        badge={<AutoText text="R&D" as="span" />}
        badgeColor="text-blue-300"
        heading={t.hero.rdTitle}
        description={t.hero.rdSubtitle}
      />

      {/* R&D Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {rdStats.map((stat: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1E6F5C]">{stat.value}</div>
                <div className="text-sm text-slate-600 mt-1"><AutoText text={stat.label} as="span" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="OUR R&D VISION" as="span" /></p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"><AutoText text="Innovation for Accessible Healthcare" as="span" /></h2>
              <p className="text-slate-600 mb-4"><AutoText text="Our research and development strategy is anchored in a clear mission: to develop high-quality, affordable pharmaceutical products that address unmet healthcare needs in emerging markets." as="span" /></p>
              <p className="text-slate-600 mb-6"><AutoText text="We focus on adapting proven active pharmaceutical ingredients into improved formulations — better bioavailability, improved stability in tropical climates, and patient-friendly dosage forms." as="span" /></p>
              <div className="space-y-3">
                {[<AutoText text="Affordable access to essential medicines" as="span" />, <AutoText text="Climate-adapted formulations for tropical markets" as="span" />, <AutoText text="Patient-centric dosage form innovation" as="span" />, <AutoText text="WHO Essential Medicines List alignment" as="span" />].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C] shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <FlaskConical className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium"><AutoText text="R&D Laboratory" as="span" /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="R&D CAPABILITIES" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Full-Spectrum Development Services" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rdCapabilities.map((cap: any, idx: number) => {
              const CapIcon = iconMap[cap.icon] || FlaskConical
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <CapIcon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2"><AutoText text={cap.title} as="span" /></h3>
                  <p className="text-sm text-slate-600"><AutoText text={cap.description} as="span" /></p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="PRODUCT PIPELINE" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Development Pipeline" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pipeline.map((item: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-[#1E6F5C] mb-2">{item.count}</div>
                <h3 className="font-bold text-slate-900 mb-2"><AutoText text={item.phase} as="span" /></h3>
                <p className="text-sm text-slate-600"><AutoText text={item.description} as="span" /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="LABORATORY" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Analytical Capabilities" as="span" /></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {capabilities.map((cap: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 bg-white rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-[#1E6F5C] shrink-0" />
                <span className="text-sm text-slate-700"><AutoText text={cap} as="span" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4"><AutoText text="Let's Innovate Together" as="span" /></h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8"><AutoText text="Whether you need contract development services, technology transfer support, or a research collaboration partner — our R&D team is ready to help." as="span" /></p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">{t.cta.contact} <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/manufacturing" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"><AutoText text="View Manufacturing" as="span" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
