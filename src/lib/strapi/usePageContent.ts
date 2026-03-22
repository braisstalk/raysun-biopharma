'use client'

import { useState, useEffect } from 'react'
import { STRAPI_URL } from './client'

// ── Types ──

export interface PageContent {
  // About page
  highlights?: Array<{ icon: string; value: string; labelKey: string }>
  mission?: { icon: string; titleKey: string; descKey: string }
  vision?: { icon: string; titleKey: string; descKey: string }
  values?: Array<{ icon: string; titleKey: string; descKey: string }>
  milestones?: Array<{ year: string; title: string; desc: string }>
  regions?: string[]
  ctaLinks?: Array<{ href: string; labelKey: string; variant?: string }>
  
  // Manufacturing page
  facilityStats?: Array<{ value: string; unit: string; label: string }>
  productionLines?: Array<{ icon: string; title: string; description: string; specs: string[] }>
  facilityFeatures?: Array<{ icon: string; title: string; description: string }>
  facilityOverview?: {
    title: string
    description: string
    subDescription: string
    tags: string[]
  }
  qcSteps?: Array<{ step: string; title: string; desc: string }>
  
  // R&D page
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
  
  // Quality page
  certifications?: Array<{ icon: string; title: string; subtitle: string; description: string; year: string }>
  qaActivities?: Array<{ icon: string; title: string; description: string }>
  qcCapabilities?: Array<{ title: string; items: string[] }>
  regulatoryMarkets?: Array<{ region: string; countries: string; status: string }>
  qualityPhilosophy?: {
    title: string
    description: string
    subDescription: string
    checklist: string[]
  }
}

export interface PageData {
  id: number
  documentId: string
  slug: string
  title: string
  description: string | null
  seoTitle: string | null
  seoDescription: string | null
  seoKeywords: string | null
  content: PageContent | null
}

// ── Hook ──

export function usePageContent(slug: string): PageData | null {
  const [data, setData] = useState<PageData | null>(null)

  useEffect(() => {
    if (!slug) return

    fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&pagination[pageSize]=1`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (json.data && json.data.length > 0) {
          const page = json.data[0] as PageData
          setData(page)
        }
      })
      .catch(err => {
        console.warn(`[usePageContent] Failed to fetch page "${slug}" from CMS:`, err.message)
      })
  }, [slug])

  return data
}
