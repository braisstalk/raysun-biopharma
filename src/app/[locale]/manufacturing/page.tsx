'use client'

import Link from 'next/link'
import { Factory, Shield, Award, Gauge, FlaskConical, Package, Droplets, Syringe, Pill, CheckCircle, ArrowRight, Thermometer, Wind, Eye } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'

export default function Manufacturing() {
  const { t } = useTranslation()

  const facilityStats = [
    { value: '12,000', unit: 'm²', label: 'Total Facility Area' },
    { value: '6', unit: '', label: 'Production Lines' },
    { value: '50+', unit: '', label: 'Products Manufactured' },
    { value: '24/7', unit: '', label: 'Operational Capability' },
  ]

  const productionLines = [
    { icon: Pill, title: 'Tablets & Film-Coated Tablets', description: 'High-speed tablet compression and film-coating lines capable of producing standard tablets, bi-layer tablets, and enteric-coated formulations.', specs: ['Capacity: 200 million tablets/year', 'Compression: rotary press technology', 'Coating: fully automated film-coating system'] },
    { icon: Droplets, title: 'Softgel Capsules', description: 'State-of-the-art rotary die softgel encapsulation for pharmaceutical and nutraceutical products with precise fill-weight control.', specs: ['Capacity: 100 million capsules/year', 'Fill range: 100mg - 1500mg', 'Gelatin and vegetarian options'] },
    { icon: Package, title: 'Hard Capsules', description: 'Automatic capsule filling lines for powder, pellet, and granule formulations with weight variation control systems.', specs: ['Capacity: 150 million capsules/year', 'Sizes: 00 to 4', 'Powder and pellet filling'] },
    { icon: Syringe, title: 'Sterile Injectables', description: 'Dedicated sterile manufacturing area with laminar flow isolators for small-volume parenteral products and lyophilized formulations.', specs: ['ISO Class 5 cleanroom', 'Ampoules and vials', 'Terminal sterilization & aseptic fill'] },
    { icon: Droplets, title: 'Creams & Ointments', description: 'Semi-solid manufacturing with vacuum homogenizers for topical pharmaceutical products including creams, ointments, and gels.', specs: ['Batch size: 50-500 kg', 'Vacuum homogenization', 'Automated tube/jar filling'] },
    { icon: FlaskConical, title: 'Oral Liquids & Syrups', description: 'Liquid manufacturing and filling lines for oral solutions, suspensions, and syrups with in-line filtration systems.', specs: ['Batch size: 500-5000 L', 'In-line filtration', 'Automatic bottle filling & capping'] },
  ]

  const facilityFeatures = [
    { icon: Wind, title: 'HVAC Systems', description: 'Centralized HVAC with HEPA filtration maintaining ISO Class 7/8 cleanroom environments across all production areas.' },
    { icon: Thermometer, title: 'Environmental Monitoring', description: 'Continuous temperature, humidity, and differential pressure monitoring with automated alert systems.' },
    { icon: Eye, title: 'Water Systems', description: 'Purified Water (PW) and Water for Injection (WFI) generation systems with continuous TOC and conductivity monitoring.' },
    { icon: Gauge, title: 'Utilities Infrastructure', description: 'Dedicated pharmaceutical-grade utilities including compressed air, nitrogen generation, and steam systems.' },
  ]

  const certifications = [
    { title: 'WHO GMP', description: 'World Health Organization Good Manufacturing Practice certification for all production lines', year: '2017' },
    { title: 'ISO 9001:2015', description: 'Quality Management System certification ensuring consistent quality standards', year: '2021' },
    { title: 'ISO 14001', description: 'Environmental Management System certification for sustainable manufacturing', year: '2024' },
  ]

  const qcSteps = [
    { step: '01', title: 'Raw Material Testing', desc: 'Identity, purity, and potency testing of all incoming materials' },
    { step: '02', title: 'In-Process Controls', desc: 'Real-time monitoring of critical process parameters during production' },
    { step: '03', title: 'Finished Product Testing', desc: 'Comprehensive testing including dissolution, assay, and stability' },
    { step: '04', title: 'Packaging & Labeling', desc: 'Automated inspection systems for packaging integrity and label accuracy' },
    { step: '05', title: 'Batch Release', desc: 'QA review and batch release by qualified persons before distribution' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2">{t.pages.manufacturing.toUpperCase()}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.hero.manufacturingTitle}</h1>
          <p className="text-xl text-slate-200 max-w-3xl mb-8">{t.hero.manufacturingSubtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="inline-flex items-center gap-2 bg-[#1E6F5C] hover:bg-[#165B46] text-white px-6 py-3 rounded-lg font-medium transition-colors">
              {t.cta.viewProducts} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              {t.cta.contact}
            </Link>
          </div>
        </div>
      </section>

      {/* Facility Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facilityStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1E6F5C]">{stat.value}<span className="text-lg font-normal text-slate-500">{stat.unit}</span></div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
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
              <p className="text-[#1E6F5C] font-medium mb-2">OUR FACILITY</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">World-Class Manufacturing Facility</h2>
              <p className="text-slate-600 mb-4">Our 12,000 m² manufacturing facility in Vientiane, Laos is designed and built to international pharmaceutical standards. The facility houses multiple production lines for diverse dosage forms, supported by comprehensive quality control laboratories and warehousing infrastructure.</p>
              <p className="text-slate-600 mb-6">Every aspect of our facility — from cleanroom design to utility systems — is engineered to ensure product quality, operator safety, and regulatory compliance across all markets we serve.</p>
              <div className="flex flex-wrap gap-3">
                {['WHO GMP Certified', 'ISO 9001:2015', 'ISO Class 7/8 Cleanrooms'].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E6F5C]/10 text-[#1E6F5C] rounded-full text-sm font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <Factory className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium">Manufacturing Facility</p>
                <p className="text-xs text-slate-400 mt-1">Photo coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Lines */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">PRODUCTION CAPABILITIES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Production Lines</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Six dedicated production lines covering all major pharmaceutical dosage forms, each equipped with modern machinery and in-process quality controls.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productionLines.map((line, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <line.icon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">{line.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{line.description}</p>
                <ul className="space-y-1.5">
                  {line.specs.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-500">
                      <CheckCircle className="w-3.5 h-3.5 text-[#1E6F5C] mt-0.5 shrink-0" /> {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Infrastructure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">INFRASTRUCTURE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pharmaceutical-Grade Infrastructure</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityFeatures.map((feature, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6">
                <feature.icon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">CERTIFICATIONS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Manufacturing Certifications</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm text-center">
                <Award className="w-12 h-12 text-[#1E6F5C] mx-auto mb-4" />
                <h3 className="font-bold text-xl text-slate-900 mb-2">{cert.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{cert.description}</p>
                <span className="text-xs text-[#1E6F5C] font-medium bg-[#1E6F5C]/10 px-3 py-1 rounded-full">Since {cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">QUALITY CONTROL</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">From Raw Material to Finished Product</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Every stage of production is monitored by our quality control team to ensure consistent product quality and regulatory compliance.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {qcSteps.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-[#1E6F5C] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">{item.step}</div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Partner With Us</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">Leverage our manufacturing capabilities for your pharmaceutical products. We offer contract manufacturing, private labeling, and technology transfer services.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">{t.cta.contact} <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/products" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">{t.cta.viewProducts}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
