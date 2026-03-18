// i18n utilities
import { cookies } from 'next/headers'
import { Locale, i18n, rtlLocales } from './config'

// Get current locale from cookies or default
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')
  
  if (localeCookie && i18n.locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value as Locale
  }
  
  return i18n.defaultLocale
}

// Check if locale is RTL
export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}

// Get locale from path
export function getLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (firstSegment && i18n.locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  
  return null
}

// Generate localized path
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === i18n.defaultLocale) {
    return path
  }
  return `/${locale}${path}`
}

// Get path without locale prefix
export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (firstSegment && i18n.locales.includes(firstSegment as Locale)) {
    return '/' + segments.slice(1).join('/')
  }
  
  return pathname
}
