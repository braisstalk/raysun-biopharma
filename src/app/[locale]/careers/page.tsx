'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Users, MapPin, Mail, ArrowRight, Briefcase, Clock, Loader2 } from 'lucide-react'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { useTranslation } from '@/i18n/useTranslation'
import { useCareers, type MappedJob } from '@/lib/strapi/useCareers'
import { getCareersPageContent } from '@/lib/content'
import AutoText from '@/components/common/AutoText'

const DEPARTMENTS = [<AutoText text="All" as="span" />, <AutoText text="Manufacturing" as="span" />, <AutoText text="Quality" as="span" />, <AutoText text="R&D" as="span" />, <AutoText text="Compliance" as="span" />, <AutoText text="Sales" as="span" />, <AutoText text="Operations" as="span" />]

function mapLocalJobs(): MappedJob[] {
  const content = getCareersPageContent()
  return content.positions.map(p => ({
    id: p.id,
    documentId: p.id,
    slug: p.slug,
    title: p.title,
    department: p.department,
    location: p.location,
    type: p.type,
    summary: p.summary,
    responsibilities: p.responsibilities,
    requirements: p.requirements,
    preferred: p.preferred,
    postedDate: p.postedDate,
  }))
}

export default function Careers() {
  const { t } = useTranslation()
  const { jobs: cmsJobs, loading, error } = useCareers()
  const jobs = cmsJobs.length > 0 ? cmsJobs : (loading ? [] : mapLocalJobs())

  const localContent = getCareersPageContent()
  const hero = localContent.hero
  const overview = localContent.overview
  const benefits = localContent.benefits

  const [selectedDept, setSelectedDept] = useState('All')

  const filteredPositions = useMemo(() => {
    if (selectedDept === 'All') return jobs
    return jobs.filter(p => p.department === selectedDept)
  }, [jobs, selectedDept])

  return (
    <>
      <StrapiHeroCarousel
        page="careers"
        badge={<AutoText text="CAREERS" as="span" />}
        badgeColor="text-blue-300"
        heading={hero.title}
        description={hero.subtitle}
      />

      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{overview.title}</h2>
            <p className="text-lg text-slate-600">{overview.description}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900"><AutoText text="Open Positions" as="span" /></h2>
            <p className="text-slate-600 mt-2"><AutoText text="Find your next opportunity at Raysun Biopharma" as="span" /></p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDept === dept
                    ? 'bg-[#1E6F5C] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {loading && jobs.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#1E6F5C] animate-spin" />
              <span className="ml-3 text-slate-500"><AutoText text="Loading positions..." as="span" /></span>
            </div>
          )}

          <div className="space-y-4">
            {!loading && filteredPositions.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p><AutoText text="No positions currently available in this department." as="span" /></p>
                <p className="text-sm mt-2"><AutoText text="Check back later or submit your CV for future opportunities." as="span" /></p>
              </div>
            ) : (
              filteredPositions.map((pos) => (
                <div key={pos.id} className="bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg"><AutoText text={pos.title} /></h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-2">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /><AutoText text={pos.department} /></span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{pos.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{pos.type}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2"><AutoText text={pos.summary} /></p>
                  </div>
                  <Link
                    href={`/careers/${pos.slug}`}
                    className="px-4 py-2 bg-[#1E6F5C] text-white rounded-lg text-sm font-medium hover:bg-[#165a4a] flex items-center gap-2 whitespace-nowrap"
                  >
                    <AutoText text="View Details" as="span" /> <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>

          {error && !loading && (
            <p className="text-center text-xs text-amber-500 mt-4"><AutoText text="(using offline data)" as="span" /></p>
          )}
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{benefits.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.items.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <Users className="w-8 h-8 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-medium text-slate-900">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#1E6F5C] to-[#289c76]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4"><AutoText text="Don't See the Right Role?" as="span" /></h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            <AutoText text="Send us your CV and we'll keep you informed about future opportunities that match your skills and experience." as="span" />
          </p>
          <a href="mailto:info@raysunpharma.com" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
            <Mail className="w-4 h-4" /> <AutoText text="Email Your CV" as="span" />
          </a>
        </div>
      </section>
    </>
  )
}
