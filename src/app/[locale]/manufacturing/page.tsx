'use client'

import Link from 'next/link'
import { Factory, Shield, Award, Gauge, FlaskConical, Package, Droplets, Syringe, Pill, CheckCircle, ArrowRight, Thermometer, Wind, Eye } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'
import AutoText from '@/components/common/AutoText'

const iconMap: Record<string, React.ElementType> = {
  Factory, Shield, Award, Gauge, FlaskConical, Package, Droplets, Syringe, Pill, Thermometer, Wind, Eye,
}

export default function Manufacturing() {
  const { t } = useTranslation()
  const cms = usePageContent('manufacturing')

  const facilityStats = cms?.facilityStats || [
    { value: '12,000', unit: 'm²', label: <AutoText text="Total Facility Area" as="span" /> },
    { value: '6', unit: '', label: <AutoText text="Production Lines" as="span" /> },
    { value: '50+', unit: '', label: <AutoText text="Products Manufactured" as="span" /> },
    { value: '24/7', unit: '', label: <AutoText text="Operational Capability" as="span" /> },
  ]

  const productionLines = cms?.productionLines || [
    { icon: 'Pill', title: <AutoText text="Tablets & Film-Coated Tablets" as="span" />, description: <AutoText text="High-speed tablet compression and film-coating lines." as="span" />, specs: [<AutoText text="Capacity: 200 million tablets/year" as="span" />, <AutoText text="Compression: rotary press technology" as="span" />, <AutoText text="Coating: fully automated film-coating system" as="span" />] },
    { icon: 'Droplets', title: <AutoText text="Softgel Capsules" as="span" />, description: <AutoText text="State-of-the-art rotary die softgel encapsulation." as="span" />, specs: [<AutoText text="Capacity: 100 million capsules/year" as="span" />, <AutoText text="Fill range: 100mg - 1500mg" as="span" />, <AutoText text="Gelatin and vegetarian options" as="span" />] },
    { icon: 'Package', title: <AutoText text="Hard Capsules" as="span" />, description: <AutoText text="Automatic capsule filling lines for powder and pellet formulations." as="span" />, specs: [<AutoText text="Capacity: 150 million capsules/year" as="span" />, <AutoText text="Sizes: 00 to 4" as="span" />, <AutoText text="Powder and pellet filling" as="span" />] },
    { icon: 'Syringe', title: <AutoText text="Sterile Injectables" as="span" />, description: <AutoText text="Dedicated sterile manufacturing area with laminar flow isolators." as="span" />, specs: [<AutoText text="ISO Class 5 cleanroom" as="span" />, <AutoText text="Ampoules and vials" as="span" />, <AutoText text="Terminal sterilization & aseptic fill" as="span" />] },
    { icon: 'Droplets', title: <AutoText text="Creams & Ointments" as="span" />, description: <AutoText text="Semi-solid manufacturing with vacuum homogenizers." as="span" />, specs: [<AutoText text="Batch size: 50-500 kg" as="span" />, <AutoText text="Vacuum homogenization" as="span" />, <AutoText text="Automated tube/jar filling" as="span" />] },
    { icon: 'FlaskConical', title: <AutoText text="Oral Liquids & Syrups" as="span" />, description: <AutoText text="Liquid manufacturing and filling lines for oral solutions." as="span" />, specs: [<AutoText text="Batch size: 500-5000 L" as="span" />, <AutoText text="In-line filtration" as="span" />, <AutoText text="Automatic bottle filling & capping" as="span" />] },
  ]

  const facilityFeatures = cms?.facilityFeatures || [
    { icon: 'Wind', title: <AutoText text="HVAC Systems" as="span" />, description: <AutoText text="Centralized HVAC with HEPA filtration maintaining ISO Class 7/8 cleanroom environments." as="span" /> },
    { icon: 'Thermometer', title: <AutoText text="Environmental Monitoring" as="span" />, description: <AutoText text="Continuous temperature, humidity, and differential pressure monitoring." as="span" /> },
    { icon: 'Eye', title: <AutoText text="Water Systems" as="span" />, description: <AutoText text="Purified Water and Water for Injection generation systems." as="span" /> },
    { icon: 'Gauge', title: <AutoText text="Utilities Infrastructure" as="span" />, description: <AutoText text="Dedicated pharmaceutical-grade utilities including compressed air and steam systems." as="span" /> },
  ]

  const certifications = cms?.certifications || [
    { title: <AutoText text="WHO GMP" as="span" />, description: <AutoText text="World Health Organization Good Manufacturing Practice certification for all production lines" as="span" />, year: '2017' },
    { title: <AutoText text="ISO 9001:2015" as="span" />, description: <AutoText text="Quality Management System certification ensuring consistent quality standards" as="span" />, year: '2021' },
    { title: <AutoText text="ISO 14001" as="span" />, description: <AutoText text="Environmental Management System certification for sustainable manufacturing" as="span" />, year: '2024' },
  ]

  const qcSteps = cms?.qcSteps || [
    { step: '01', title: <AutoText text="Raw Material Testing" as="span" />, description: <AutoText text="Identity, purity, and potency testing of all incoming materials" as="span" /> },
    { step: '02', title: <AutoText text="In-Process Controls" as="span" />, description: <AutoText text="Real-time monitoring of critical process parameters during production" as="span" /> },
    { step: '03', title: <AutoText text="Finished Product Testing" as="span" />, description: <AutoText text="Comprehensive testing including dissolution, assay, and stability" as="span" /> },
    { step: '04', title: <AutoText text="Packaging & Labeling" as="span" />, description: <AutoText text="Automated inspection systems for packaging integrity and label accuracy" as="span" /> },
    { step: '05', title: <AutoText text="Batch Release" as="span" />, description: <AutoText text="QA review and batch release by qualified persons before distribution" as="span" /> },
  ]

  const facilityOverview = cms?.facilityOverview || {
    title: <AutoText text="World-Class Manufacturing Facility" as="span" />,
    description: <AutoText text="Our 12,000 m² manufacturing facility in Vientiane, Laos is designed and built to international pharmaceutical standards. The facility houses multiple production lines for diverse dosage forms, supported by comprehensive quality control laboratories and warehousing infrastructure." as="span" />,
    tags: [<AutoText text="WHO GMP Certified" as="span" />, <AutoText text="ISO 9001:2015" as="span" />, <AutoText text="ISO Class 7/8 Cleanrooms" as="span" />],
  }

  return (
    <>
      <StrapiHeroCarousel
        page="manufacturing"
        badge={<AutoText text="MANUFACTURING" as="span" />}
        badgeColor="text-blue-300"
        heading={t.hero.manufacturingTitle}
        description={t.hero.manufacturingSubtitle}
      />

      {/* Facility Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facilityStats.map((stat: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1E6F5C]">{stat.value}<span className="text-lg font-normal text-slate-500">{stat.unit}</span></div>
                <div className="text-sm text-slate-600 mt-1"><AutoText text={stat.label} as="span" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="OUR FACILITY" as="span" /></p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"><AutoText text={facilityOverview.title} as="span" /></h2>
              <p className="text-slate-600 mb-6"><AutoText text={facilityOverview.description} as="span" /></p>
              <div className="flex flex-wrap gap-3">
                {facilityOverview.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E6F5C]/10 text-[#1E6F5C] rounded-full text-sm font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> <AutoText text={tag} as="span" />
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <Factory className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium"><AutoText text="Manufacturing Facility" as="span" /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Lines */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="PRODUCTION CAPABILITIES" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Our Production Lines" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productionLines.map((line: any, idx: number) => {
              const LineIcon = iconMap[line.icon] || Factory
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <LineIcon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2"><AutoText text={line.title} as="span" /></h3>
                  <p className="text-sm text-slate-600 mb-4"><AutoText text={line.description} as="span" /></p>
                  <ul className="space-y-1.5">
                    {(line.specs || []).map((spec: string, sIdx: number) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-500">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1E6F5C] mt-0.5 shrink-0" /> <AutoText text={spec} as="span" />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Facility Infrastructure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="INFRASTRUCTURE" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Pharmaceutical-Grade Infrastructure" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityFeatures.map((feature: any, idx: number) => {
              const FIcon = iconMap[feature.icon] || Shield
              return (
                <div key={idx} className="bg-slate-50 rounded-xl p-6">
                  <FIcon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2"><AutoText text={feature.title} as="span" /></h3>
                  <p className="text-sm text-slate-600"><AutoText text={feature.description} as="span" /></p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="CERTIFICATIONS" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="Manufacturing Certifications" as="span" /></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm text-center">
                <Award className="w-12 h-12 text-[#1E6F5C] mx-auto mb-4" />
                <h3 className="font-bold text-xl text-slate-900 mb-2"><AutoText text={cert.title} as="span" /></h3>
                <p className="text-sm text-slate-600 mb-3"><AutoText text={cert.description} as="span" /></p>
                <span className="text-xs text-[#1E6F5C] font-medium bg-[#1E6F5C]/10 px-3 py-1 rounded-full"><AutoText text="Since " as="span" />{cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText text="QUALITY CONTROL" as="span" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText text="From Raw Material to Finished Product" as="span" /></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {qcSteps.map((item: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-[#1E6F5C] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">{item.step}</div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1"><AutoText text={item.title} as="span" /></h3>
                <p className="text-xs text-slate-500"><AutoText text={item.description || item.desc} as="span" /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4"><AutoText text="Partner With Us" as="span" /></h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8"><AutoText text="Leverage our manufacturing capabilities for your pharmaceutical products." as="span" /></p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">{t.cta.contact} <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/products" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">{t.cta.viewProducts}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
