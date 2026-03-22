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
  // 6 home sections
  capabilities: {
    title: string
    items: Array<{ title: string; description: string; icon: string }>
  } | null
  productCategories: {
    title: string
    categories: Array<{ name: string; description: string; count: number; href: string }>
  } | null
  quality: {
    title: string
    description: string
    features: Array<{ title: string; description: string }>
  } | null
  globalMarkets: {
    title: string
    subtitle: string
    markets: Array<{ name: string; description: string; icon: string }>
  } | null
  news: {
    title: string
    items: Array<{ date: string; title: string; category: string; href: string }>
  } | null
  resources: {
    title: string
    items: Array<{ title: string; type: string; size: string; href: string }>
  } | null
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
            // 6 home sections
            capabilities: g.homeCapabilities,
            productCategories: g.homeProductCategories,
            quality: g.homeQuality,
            globalMarkets: g.homeGlobalMarkets,
            news: g.homeNews,
            resources: g.homeResources,
          })
        }
      })
      .catch(err => {
        console.warn('[useHomeData] Failed to fetch from CMS, using fallback:', err.message)
      })
  }, [])

  return data
}
