import { fetchStrapi, fetchStrapiList } from './client'

// ── Types ──

interface FooterLink {
  label: string
  href: string
}

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
  // Footer fields
  footerQuickLinks: FooterLink[] | null
  footerProductLinks: FooterLink[] | null
  footerBottomLinks: FooterLink[] | null
  footerQuickLinksTitle: string | null
  footerProductsTitle: string | null
  footerContactTitle: string | null
  footerCopyright: string | null
  // Home section fields (6 sections)
  homeCapabilities: {
    title: string
    items: Array<{ title: string; description: string; icon: string }>
  } | null
  homeProductCategories: {
    title: string
    categories: Array<{ name: string; description: string; count: number; href: string }>
  } | null
  homeQuality: {
    title: string
    description: string
    features: Array<{ title: string; description: string }>
  } | null
  homeGlobalMarkets: {
    title: string
    subtitle: string
    markets: Array<{ name: string; description: string; icon: string }>
  } | null
  homeNews: {
    title: string
    items: Array<{ date: string; title: string; category: string; href: string }>
  } | null
  homeResources: {
    title: string
    items: Array<{ title: string; type: string; size: string; href: string }>
  } | null
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
