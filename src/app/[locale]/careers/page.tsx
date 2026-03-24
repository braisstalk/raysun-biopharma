'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, MapPin, Mail, ArrowRight, Briefcase, Clock } from 'lucide-react'
import { getCareersPageContent, jobDepartments } from '@/lib/content'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { useTranslation } from '@/i18n/useTranslation'
import AutoText from '@/components/common/AutoText'

export default function Careers() {
  const { t } = useTranslation()
  const content = getCareersPageContent()
  const { hero, overview, benefits, positions } = content
  
  const [selectedDept, setSelectedDept] = useState('All')
  
  const filteredPositions = selectedDept === 'All' 
    ? positions 
    : positions.filter(p => p.department === selectedDept)

  return (
    <>
      {/* Hero Carousel */}
      <StrapiHeroCarousel
        page="careers"
        badge="CAREERS"
        badgeColor="text-blue-300"
        heading={hero.title}
        description={hero.subtitle}
      />

      {/* Overview */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText>Why Work With Us</AutoText></h2>
            <p className="text-lg text-slate-600">
              <AutoText>{overview.description}</AutoText>
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900"><AutoText>Open Positions</AutoText></h2>
            <p className="text-slate-600 mt-2"><AutoText>Find your next opportunity at Raysun Biopharma</AutoText></p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {jobDepartments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDept === dept
                    ? 'bg-[#1E6F5C] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <AutoText>{dept}</AutoText>
              </button>
            ))}
          </div>

          {/* Positions List */}
          <div className="space-y-4">
            {filteredPositions.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p><AutoText>{(t as any).careers?.noPositions || 'No positions currently available in this department.'}</AutoText></p>
                <p className="text-sm mt-2"><AutoText>Check back later or submit your CV for future opportunities.</AutoText></p>
              </div>
            ) : (
              filteredPositions.map((pos) => (
                <div key={pos.id} className="bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg"><AutoText>{pos.title}</AutoText></h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-2">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" /><AutoText>{pos.department}</AutoText>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /><AutoText>{pos.location}</AutoText>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /><AutoText>{pos.type}</AutoText>
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2"><AutoText>{pos.summary}</AutoText></p>
                  </div>
                  <Link
                    href={`/careers/${pos.slug}`}
                    className="px-4 py-2 bg-[#1E6F5C] text-white rounded-lg text-sm font-medium hover:bg-[#165a4a] flex items-center gap-2 whitespace-nowrap"
                  >
                    <AutoText>View Details</AutoText> <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900"><AutoText>{benefits.title}</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.items.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <Users className="w-8 h-8 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-medium text-slate-900"><AutoText>{benefit}</AutoText></h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Application */}
      <section className="py-20 bg-gradient-to-r from-[#1E6F5C] to-[#289c76]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4"><AutoText>Don&apos;t See the Right Role?</AutoText></h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            <AutoText>Send us your CV and we&apos;ll keep you informed about future opportunities that match your skills and experience.</AutoText>
          </p>
          <a href="mailto:info@raysunpharma.com" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
            <Mail className="w-4 h-4" /> <AutoText>Email Your CV</AutoText>
          </a>
        </div>
      </section>
    </>
  )
}
