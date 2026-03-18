// i18n configuration
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'lo', 'th', 'vi', 'ar', 'es', 'pt'],
} as const

export type Locale = (typeof i18n)['locales'][number]

// Language metadata for display
export const languageNames: Record<Locale, string> = {
  en: 'English',
  lo: 'Lao',
  th: 'Thai',
  vi: 'Vietnamese',
  ar: 'Arabic',
  es: 'Spanish',
  pt: 'Portuguese',
}

// RTL locales
export const rtlLocales: Locale[] = ['ar']
