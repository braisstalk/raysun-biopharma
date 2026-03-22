'use client'

import Link from 'next/link'
import { FlaskConical, Lightbulb, ArrowRight, CheckCircle, Microscope, Atom, BookOpen, Users, Target, Beaker, Layers, FileText, Award, Handshake, Rocket, Globe } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi'
import type { PageContent } from '@/lib/strapi'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical, Lightbulb, ArrowRight, CheckCircle, Microscope, Atom, BookOpen,
  Users, Target, Beaker, Layers, FileText, Award, Handshake, Rocket, Globe
}

interface RDContent extends PageContent {
  rdStats?: Array<{ value: string; label: string }>
  rdCapabilities?: Array<{ icon: string; title: string; description: string }>
  focusAreas?: Array<{ title: string; description: string; status: string }>
  partnershipModels?: Array<{ icon: string; title: string; description: string }>
  rdVision?: {
    title: string
    description: string
    subDescription: string
    checklist: string[]
  }
}

export default function RdInnovation() {
  const { t } = useTranslation()
  const pageData = usePageContent('rd-innovation')
  const content = pageData?.content as RDContent | null

  // Fallback data
  const rdStats = content?.rdStats ?? [
    { value: '15+', label: 'R&D Scientists' },
    { value: '30+', label: 'Products in Pipeline' },
    { value: '8', label: 'Dosage Forms' },
    { value: '5+', label: 'Research Partnerships' },
  ]

  const rdCapabilities = content?.rdCapabilities ?? [
    { icon: 'FlaskConical', title: 'Generic Drug Development', description: 'Full-cycle development of generic pharmaceuticals from formulation screening through bioequivalence studies, targeting WHO Essential Medicines List products for underserved markets.' },
    { icon: 'Layers', title: 'Formulation Innovation', description: 'Development of novel drug delivery systems including sustained-release formulations, taste-masked suspensions, and improved bioavailability formulations for existing APIs.' },
    { icon: 'Beaker', title: 'Analytical Method Development', description: 'Development and validation of analytical methods for quality control testing, stability studies, and dissolution profiling compliant with pharmacopoeial standards.' },
    { icon: 'Microscope', title: 'Stability Studies', description: 'ICH-compliant stability programs supporting product registrations across climatic zones, with dedicated stability chambers for long-term, accelerated, and photostability testing.' },
    { icon: 'Atom', title: 'Process Optimization', description: 'Continuous improvement of manufacturing processes through Design of Experiments (DoE), process analytical technology (PAT), and scale-up studies from lab to commercial batches.' },
    { icon: 'BookOpen', title: 'Regulatory Dossier Preparation', description: 'Preparation of complete registration dossiers in CTD/eCTD format for multi-market submissions including ASEAN, Middle East, and African regulatory authorities.' },
  ]

  const focusAreas = content?.focusAreas ?? [
    { title: 'Anti-Infectives', description: 'Next-generation antibiotics and antifungals addressing antimicrobial resistance challenges in Southeast Asian and African markets.', status: 'Active' },
    { title: 'Cardiovascular', description: 'Expanded portfolio of antihypertensives, statins, and anticoagulants in improved formulations for better patient compliance.', status: 'Active' },
    { title: 'Nutraceuticals', description: 'Evidence-based nutritional supplement formulations combining traditional herbal ingredients with modern pharmaceutical technology.', status: 'Active' },
    { title: 'Tropical Diseases', description: 'Affordable treatments targeting neglected tropical diseases prevalent in our core ASEAN and African markets.', status: 'Pipeline' },
    { title: 'Pediatric Formulations', description: 'Age-appropriate dosage forms for children including taste-masked suspensions, dispersible tablets, and mini-tablets.', status: 'Pipeline' },
    { title: 'Oncology Support', description: 'Supportive care medications for cancer patients including anti-emetics, pain management, and nutritional formulations.', status: 'Pipeline' },
  ]

  const partnershipModels = content?.partnershipModels ?? [
    { icon: 'Handshake', title: 'Contract Development (CDMO)', description: 'End-to-end pharmaceutical development services from early formulation to commercial scale manufacturing, with full regulatory support.' },
    { icon: 'Rocket', title: 'Technology Transfer', description: 'Receive and implement manufacturing technology for established products, with validation and regulatory transition support for your market.' },
    { icon: 'Users', title: 'Joint Research', description: 'Collaborative research partnerships with academic institutions, research organizations, and pharmaceutical companies for novel product development.' },
    { icon: 'Globe', title: 'Licensing Partnerships', description: 'In-licensing opportunities for innovative products to manufacture and distribute across our established market network in ASEAN and beyond.' },
  ]

  const rdVision = content?.rdVision ?? {
    title: 'Innovation for Accessible Healthcare',
    description: 'Our research and development strategy is anchored in a clear mission: to develop high-quality, affordable pharmaceutical products that address unmet healthcare needs in emerging markets.',
    subDescription: 'We focus on adapting proven active pharmaceutical ingredients into improved formulations — better bioavailability, improved stability in tropical climates, and patient-friendly dosage forms that drive treatment adherence.',
    checklist: [
      'Affordable access to essential medicines',
      'Climate-adapted formulations for tropical markets',
      'Patient-centric dosage form innovation',
      'WHO Essential Medicines List alignment'
    ]
  }

  return (
    <>
      {/* Hero Carousel */}
      <StrapiHeroCarousel
        page="rd-innovation"
        badge="R&D"
        badgeColor="text-blue-300"
        heading={t.hero.rdTitle}
        description={t.hero.rdSubtitle}
      />

      {/* R&D Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {rdStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1E6F5C]">{stat.value}</div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
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
              <p className="text-[#1E6F5C] font-medium mb-2">OUR R&D VISION</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{rdVision.title}</h2>
              <p className="text-slate-600 mb-4">{rdVision.description}</p>
              <p className="text-slate-600 mb-6">{rdVision.subDescription}</p>
              <div className="space-y-3">
                {rdVision.checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C] shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <FlaskConical className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium">R&D Laboratory</p>
                <p className="text-xs text-slate-400 mt-1">Photo coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">R&D CAPABILITIES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Full-Spectrum Development Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From initial concept through regulatory approval, our R&D team provides comprehensive development capabilities across all stages of the pharmaceutical product lifecycle.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rdCapabilities.map((cap, idx) => {
              const Icon = iconMap[cap.icon] || FlaskConical
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Icon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2">{cap.title}</h3>
                  <p className="text-sm text-slate-600">{cap.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Research Focus Areas / Pipeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">RESEARCH FOCUS AREAS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Therapeutic Focus & Pipeline</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our product development pipeline is focused on therapeutic areas with significant unmet need in our target markets.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <Target className="w-8 h-8 text-[#1E6F5C]" />
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${area.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {area.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{area.title}</h3>
                <p className="text-sm text-slate-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">COLLABORATION</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Partnership Models</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We offer flexible collaboration frameworks to accelerate pharmaceutical innovation and market access.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipModels.map((model, idx) => {
              const Icon = iconMap[model.icon] || Handshake
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <Icon className="w-10 h-10 text-[#1E6F5C] mx-auto mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2">{model.title}</h3>
                  <p className="text-sm text-slate-600">{model.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Innovate Together</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">Whether you need contract development services, technology transfer support, or a research collaboration partner — our R&D team is ready to help bring your pharmaceutical products to market.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">{t.cta.contact} <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/manufacturing" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">View Manufacturing</Link>
          </div>
        </div>
      </section>
    </>
  )
}
