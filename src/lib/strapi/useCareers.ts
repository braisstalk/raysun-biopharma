'use client'

import { useState, useEffect } from 'react'
import { STRAPI_URL } from './client'

export interface StrapiJobPosition {
  id: number
  documentId: string
  title: string
  slug: string
  department: string
  location: string
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  summary: string
  responsibilities: string[] | null
  requirements: string[] | null
  preferred: string[] | null
  postedDate: string | null
  isActive: boolean
  sortOrder: number
}

export interface MappedJob {
  id: string
  documentId: string
  slug: string
  title: string
  department: string
  location: string
  type: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  preferred: string[]
  postedDate: string
}

const deptDisplayNames: Record<string, string> = {
  manufacturing: 'Manufacturing',
  quality: 'Quality',
  rd: 'R&D',
  compliance: 'Compliance',
  sales: 'Sales',
  operations: 'Operations',
  admin: 'Admin',
}

const typeDisplayNames: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
}

function mapJob(raw: StrapiJobPosition): MappedJob {
  return {
    id: String(raw.id),
    documentId: raw.documentId,
    slug: raw.slug,
    title: raw.title,
    department: deptDisplayNames[raw.department] || raw.department,
    location: raw.location,
    type: typeDisplayNames[raw.employmentType] || raw.employmentType,
    summary: raw.summary,
    responsibilities: raw.responsibilities || [],
    requirements: raw.requirements || [],
    preferred: raw.preferred || [],
    postedDate: raw.postedDate || '',
  }
}

export function useCareers(): {
  jobs: MappedJob[]
  loading: boolean
  error: string | null
} {
  const [jobs, setJobs] = useState<MappedJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchJobs() {
      try {
        const url = `${STRAPI_URL}/api/job-positions?sort=sortOrder:asc&pagination[pageSize]=100&publicationState=live`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled && json.data) {
          const mapped = (json.data as StrapiJobPosition[])
            .filter(j => j.isActive !== false)
            .map(mapJob)
          setJobs(mapped)
        }
      } catch (err: any) {
        if (!cancelled) {
          console.warn('[useCareers] CMS fetch failed:', err.message)
          setError(err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchJobs()
    return () => { cancelled = true }
  }, [])

  return { jobs, loading, error }
}

export function useJobBySlug(slug: string): {
  job: MappedJob | null
  loading: boolean
  error: string | null
} {
  const [job, setJob] = useState<MappedJob | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) { setLoading(false); return }
    let cancelled = false

    async function fetchJob() {
      try {
        const url = `${STRAPI_URL}/api/job-positions?filters[slug][$eq]=${encodeURIComponent(slug)}&publicationState=live`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled && json.data && json.data.length > 0) {
          setJob(mapJob(json.data[0] as StrapiJobPosition))
        }
      } catch (err: any) {
        if (!cancelled) {
          console.warn(`[useJobBySlug] CMS fetch failed for "${slug}":`, err.message)
          setError(err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchJob()
    return () => { cancelled = true }
  }, [slug])

  return { job, loading, error }
}

export function useRelatedJobs(
  currentJob: MappedJob | null,
  limit = 3
): MappedJob[] {
  const { jobs } = useCareers()

  if (!currentJob || jobs.length === 0) return []

  return jobs
    .filter(j => j.id !== currentJob.id)
    .sort((a, b) => {
      let scoreA = 0, scoreB = 0
      if (a.department === currentJob.department) scoreA += 10
      if (b.department === currentJob.department) scoreB += 10
      if (a.location === currentJob.location) scoreA += 5
      if (b.location === currentJob.location) scoreB += 5
      return scoreB - scoreA
    })
    .slice(0, limit)
}
