// Page-level translations
import { Locale } from '@/i18n/config'
import { translations, Translations } from '@/i18n/locales'

// Get translations for current locale
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en
}

// Page-specific translation keys for Home
export const homePageKeys = {
  hero: {
    title: 'hero.title',
    subtitle: 'hero.subtitle',
    primaryCta: 'hero.primaryCta',
    secondaryCta: 'hero.secondaryCta',
  },
  stats: 'stats',
  about: {
    title: 'about.title',
    description: 'about.description',
    cta: 'about.cta',
  },
  videoSection: {
    title: 'videoSection.title',
    description: 'videoSection.description',
    cta: 'videoSection.cta',
  },
  capabilities: {
    title: 'capabilities.title',
  },
  products: {
    title: 'products.title',
    cta: 'products.cta',
  },
  news: {
    title: 'news.title',
    cta: 'news.cta',
  },
  resources: {
    title: 'resources.title',
    cta: 'resources.cta',
  },
  cta: {
    verify: 'cta.verify',
    order: 'cta.order',
  },
  quality: {
    title: 'quality.title',
  },
  global: {
    title: 'global.title',
  },
}

// Get nested translation value
export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || path
}
