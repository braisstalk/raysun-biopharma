'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { Locale, i18n, languageNames, rtlLocales } from '@/i18n/config'
import { translations } from '@/i18n/locales'
import type { Translations } from '@/i18n/locales/en'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  isRtl: boolean
  t: Translations
  localeName: string
  isLoading: boolean
}

const LocaleContext = createContext<LocaleContextType | null>(null)

interface LocaleProviderProps {
  children: ReactNode
  initialLocale?: Locale
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  // Use initialLocale from URL param (server-side) as the source of truth
  const startLocale = initialLocale && i18n.locales.includes(initialLocale) ? initialLocale : 'en'

  const [locale, setLocaleState] = useState<Locale>(startLocale)
  const [isRtl, setIsRtl] = useState(rtlLocales.includes(startLocale))
  const [trans, setTrans] = useState<Translations>(translations[startLocale] || translations.en)
  const [isLoading, setIsLoading] = useState(false)

  // Sync document attributes on mount and locale change
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr'
  }, [locale])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setIsRtl(rtlLocales.includes(newLocale))
    setTrans(translations[newLocale] || translations.en)

    // Save to cookie
    try {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    } catch (e) {
      console.error('Failed to set locale cookie:', e)
    }

    // Navigate to the new locale URL (keep current page path)
    const currentPath = window.location.pathname
    const segments = currentPath.split('/').filter(Boolean)

    // Remove current locale prefix if present
    if (segments[0] && i18n.locales.includes(segments[0] as Locale)) {
      segments.shift()
    }

    const newPath = `/${newLocale}${segments.length > 0 ? '/' + segments.join('/') : ''}`
    window.location.href = newPath
  }, [])

  return (
    <LocaleContext.Provider value={{
      locale,
      setLocale,
      isRtl,
      t: trans,
      localeName: languageNames[locale],
      isLoading
    }}>
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className={isRtl ? 'rtl' : 'ltr'}
      >
        {children}
      </div>
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    return {
      locale: 'en' as Locale,
      setLocale: () => {},
      isRtl: false,
      t: translations.en,
      localeName: 'English',
      isLoading: false
    }
  }
  return context
}
