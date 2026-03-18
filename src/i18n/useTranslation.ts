// Simple translation hook for client components
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Locale, i18n } from '@/i18n/config'
import { translations, Translations } from '@/i18n/locales'

// Get initial locale from cookie synchronously (works in browser)
function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const cookies = document.cookie.split('; ')
  const localeCookie = cookies.find(c => c.startsWith('locale='))
  if (localeCookie) {
    const savedLocale = localeCookie.split('=')[1] as Locale
    if (i18n.locales.includes(savedLocale)) {
      return savedLocale
    }
  }
  return 'en'
}

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)
  
  // Use useMemo to get translations - this will update when locale changes
  const t = useMemo(() => {
    return translations[locale] || translations.en
  }, [locale])

  const isRtl = locale === 'ar'

  // Update document when locale changes
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  // Force re-render on mount to get correct locale from cookie
  useEffect(() => {
    const currentLocale = getInitialLocale()
    if (currentLocale !== locale) {
      setLocaleState(currentLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
    // Trigger a full page reload to ensure all static content is re-rendered
    window.location.reload()
  }

  return {
    locale,
    setLocale,
    t,
    isRtl
  }
}
