'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Briefcase, Clock, ArrowRight, Send, CheckCircle, Loader2 } from 'lucide-react'
import { useJobBySlug, useRelatedJobs, type MappedJob } from '@/lib/strapi/useCareers'
import { getJobBySlug as getLocalJob, getRelatedJobs as getLocalRelated } from '@/lib/content'
import AutoText from '@/components/common/AutoText'

function getLocalFallback(slug: string): MappedJob | null {
  const j = getLocalJob(slug)
  if (!j) return null
  return {
    id: j.id,
    documentId: j.id,
    slug: j.slug,
    title: j.title,
    department: j.department,
    location: j.location,
    type: j.type,
    summary: j.summary,
    responsibilities: j.responsibilities,
    requirements: j.requirements,
    preferred: j.preferred,
    postedDate: j.postedDate,
  }
}

function getLocalRelatedFallback(job: MappedJob): MappedJob[] {
  const related = getLocalRelated(job.id)
  return related.map(j => ({
    id: j.id,
    documentId: j.id,
    slug: j.slug,
    title: j.title,
    department: j.department,
    location: j.location,
    type: j.type,
    summary: j.summary,
    responsibilities: j.responsibilities,
    requirements: j.requirements,
    preferred: j.preferred,
    postedDate: j.postedDate,
  }))
}

export default function JobDetail() {
  const params = useParams()
  const slug = params?.slug as string

  const { job: cmsJob, loading } = useJobBySlug(slug)
  const job = cmsJob || (loading ? null : getLocalFallback(slug))
  const cmsRelated = useRelatedJobs(cmsJob, 3)
  const relatedJobs = cmsJob ? cmsRelated : (job ? getLocalRelatedFallback(job) : [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1E6F5C] animate-spin" />
        <span className="ml-3 text-slate-500"><AutoText text="Loading position..." as="span" /></span>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="Job Not Found" as="span" /></h1>
          <Link href="/careers" className="text-[#1E6F5C] hover:underline">← <AutoText text="Back to Careers" as="span" /></Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#1E6F5C]">
            <ArrowLeft className="w-4 h-4" /> <AutoText text="Back to Careers" as="span" />
          </Link>
        </div>
      </div>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <span>{job.department}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-6 text-slate-300">
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{job.location}</span>
            <span className="flex items-center gap-2"><Briefcase className="w-5 h-5" />{job.department}</span>
            <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{job.type}</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4"><AutoText text="Overview" as="span" /></h2>
              <p className="text-slate-600 leading-relaxed"><AutoText text={job.summary} as="span" /></p>
            </div>

            {job.responsibilities.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4"><AutoText text="Responsibilities" as="span" /></h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1E6F5C] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700"><AutoText text={item} as="span" /></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4"><AutoText text="Requirements" as="span" /></h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1E6F5C] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700"><AutoText text={item} as="span" /></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.preferred.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4"><AutoText text="Preferred Qualifications" as="span" /></h2>
                <ul className="space-y-3">
                  {job.preferred.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-slate-500">{idx + 1}</span>
                      </div>
                      <span className="text-slate-700"><AutoText text={item} as="span" /></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold text-slate-900 mb-4"><AutoText text="Apply for this Position" as="span" /></h3>
              <p className="text-sm text-slate-600 mb-4"><AutoText text="Interested in this role? Submit your application and we will be in touch." as="span" /></p>
              <button className="w-full bg-[#1E6F5C] text-white py-3 rounded-lg font-medium hover:bg-[#165a4a] flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> <AutoText text="Apply Now" as="span" />
              </button>
              <p className="text-xs text-slate-500 mt-4 text-center">
                <AutoText text="Or email your CV to" as="span" /><br />
                <a href="mailto:info@raysunpharma.com" className="text-[#1E6F5C] hover:underline">info@raysunpharma.com</a>
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4"><AutoText text="Job Details" as="span" /></h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500"><AutoText text="Department" as="span" /></span>
                  <span className="text-slate-900 font-medium"><AutoText text={job.department} as="span" /></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500"><AutoText text="Location" as="span" /></span>
                  <span className="text-slate-900 font-medium"><AutoText text={job.location} as="span" /></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500"><AutoText text="Job Type" as="span" /></span>
                  <span className="text-slate-900 font-medium"><AutoText text={job.type} as="span" /></span>
                </div>
                {job.postedDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-500"><AutoText text="Posted" as="span" /></span>
                    <span className="text-slate-900 font-medium">{new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {relatedJobs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6"><AutoText text="Related Positions" as="span" /></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedJobs.map((relatedJob) => (
                <Link
                  key={relatedJob.id}
                  href={`/careers/${relatedJob.slug}`}
                  className="bg-slate-50 rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-slate-900 mb-2"><AutoText text={relatedJob.title} as="span" /></h3>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <span><AutoText text={relatedJob.department} as="span" /></span>
                    <span>•</span>
                    <span><AutoText text={relatedJob.location} as="span" /></span>
                  </div>
                  <div className="mt-3 text-[#1E6F5C] text-sm font-medium flex items-center gap-1">
                    <AutoText text="View Details" as="span" /> <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 mb-4"><AutoText text="Interested in other opportunities?" as="span" /></p>
          <Link href="/careers" className="text-[#1E6F5C] font-medium hover:underline flex items-center justify-center gap-2">
            <AutoText text="View All Open Positions" as="span" /> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
