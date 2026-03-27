export const i18n = {
  defaultLocale: 'en',
  locales: ['en'],
} as const

export type Locale = 'en'

export const languageNames: Record<Locale, string> = {
  en: 'English',
}

export const languageNamesEnglish: Record<Locale, string> = {
  en: 'English',
}

export const rtlLocales: Locale[] = []

export function isValidLocale(value: string): value is Locale {
  return value === 'en'
}
