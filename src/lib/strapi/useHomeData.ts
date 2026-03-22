'use client'

import { useState, useEffect } from 'react'
import { STRAPI_URL } from './client'
import type { StrapiGlobal } from './api'

export interface HomeDataFromCMS {
  heroTitle: string | null
  heroSubtitle: string | null
  heroPrimaryCtaLabel: string | null
  heroPrimaryCtaLink: string | null
  heroSecondaryCtaLabel: string | null
  heroSecondaryCtaLink: string | null
  stats: Array<{ value: string; label: string }> | null
  aboutTitle: string | null
  aboutDesc1: string | null
  aboutDesc2: string | null
  aboutCtaLabel: string | null
  aboutCtaLink: string | null
}

export function useHomeData(): HomeDataFromCMS | null {
  const [data, setData] = useState<HomeDataFromCMS | null>(null)

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/global`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (json.data) {
          const g = json.data as StrapiGlobal
          setData({
            heroTitle: g.homeHeroTitle,
            heroSubtitle: g.homeHeroSubtitle,
            heroPrimaryCtaLabel: g.homeHeroPrimaryCtaLabel,
            heroPrimaryCtaLink: g.homeHeroPrimaryCtaLink,
            heroSecondaryCtaLabel: g.homeHeroSecondaryCtaLabel,
            heroSecondaryCtaLink: g.homeHeroSecondaryCtaLink,
            stats: g.homeStats,
            aboutTitle: g.homeAboutTitle,
            aboutDesc1: g.homeAboutDesc1,
            aboutDesc2: g.homeAboutDesc2,
            aboutCtaLabel: g.homeAboutCtaLabel,
            aboutCtaLink: g.homeAboutCtaLink,
          })
        }
      })
      .catch(err => {
        console.warn('[useHomeData] Failed to fetch from CMS, using fallback:', err.message)
      })
  }, [])

  return data
}
