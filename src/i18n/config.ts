// i18n configuration
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'lo', 'th', 'vi', 'ar', 'es', 'fr', 'zh'],
} as const

export type Locale = (typeof i18n)['locales'][number]

// Native language names for language switcher
export const languageNames: Record<Locale, string> = {
  en: 'English',
  lo: 'ລາວ',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  ar: 'العربية',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
}

// English names for reference
export const languageNamesEnglish: Record<Locale, string> = {
  en: 'English',
  lo: 'Lao',
  th: 'Thai',
  vi: 'Vietnamese',
  ar: 'Arabic',
  es: 'Spanish',
  fr: 'French',
  zh: 'Chinese',
}

// RTL locales
export const rtlLocales: Locale[] = ['ar']

// Check if a string is a valid locale
export function isValidLocale(value: string): value is Locale {
  return i18n.locales.includes(value as Locale)
}
