import { fetchStrapi, fetchStrapiList } from './client'

// ── Types ──

export interface StrapiGlobal {
  id: number
  documentId: string
  siteName: string
  siteNameCn: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  socialLinkedin: string
  socialFacebook: string
  socialYoutube: string
  socialX: string
  socialInstagram: string
  complianceDisclaimer: string
  // Home page fields
  homeHeroTitle: string | null
  homeHeroSubtitle: string | null
  homeHeroPrimaryCtaLabel: string | null
  homeHeroPrimaryCtaLink: string | null
  homeHeroSecondaryCtaLabel: string | null
  homeHeroSecondaryCtaLink: string | null
  homeStats: Array<{ value: string; label: string }> | null
  homeAboutTitle: string | null
  homeAboutDesc1: string | null
  homeAboutDesc2: string | null
  homeAboutCtaLabel: string | null
  homeAboutCtaLink: string | null
}

export interface StrapiHeroSlide {
  id: number
  documentId: string
  page: string
  title: string
  subtitle: string
  backgroundType: 'image' | 'video' | 'gradient'
  gradientClass: string
  ctaPrimaryLabel: string
  ctaPrimaryLink: string
  ctaSecondaryLabel: string
  ctaSecondaryLink: string
  sortOrder: number
  isActive: boolean
  locale: string
}

export interface StrapiPage {
  id: number
  documentId: string
  slug: string
  title: string
  description: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  locale: string
}

// ── Fetch Functions ──

export async function getGlobal(): Promise<StrapiGlobal | null> {
  return fetchStrapi<StrapiGlobal>('/global')
}

export async function getHeroSlides(page: string): Promise<StrapiHeroSlide[]> {
  const slides = await fetchStrapiList<StrapiHeroSlide>('/hero-slides', {
    'filters[page][$eq]': page,
    'filters[isActive][$eq]': 'true',
    'sort': 'sortOrder:asc',
    'pagination[pageSize]': '20',
  })
  return slides
}

export async function getPageSeo(slug: string): Promise<StrapiPage | null> {
  const pages = await fetchStrapiList<StrapiPage>('/pages', {
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': '1',
  })
  return pages.length > 0 ? pages[0] : null
}

export async function getAllHeroSlides(): Promise<StrapiHeroSlide[]> {
  return fetchStrapiList<StrapiHeroSlide>('/hero-slides', {
    'filters[isActive][$eq]': 'true',
    'sort': 'sortOrder:asc',
    'pagination[pageSize]': '100',
  })
}
