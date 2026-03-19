'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { Locale, i18n, languageNames } from '@/i18n/config'
import { translations, Translations } from '@/i18n/locales'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  isRtl: boolean
  t: Translations
  localeName: string
  isLoading: boolean
}

const LocaleContext = createContext<LocaleContextType | null>(null)

// Get initial locale from cookie synchronously (works in browser)
function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const cookies = document.cookie.split('; ')
    const localeCookie = cookies.find(c => c.startsWith('locale='))
    if (localeCookie) {
      const savedLocale = localeCookie.split('=')[1] as Locale
      if (i18n.locales.includes(savedLocale)) {
        return savedLocale
      }
    }
  } catch (e) {
    // Cookie access might fail in some environments
  }
  return 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [isRtl, setIsRtl] = useState(false)
  const [trans, setTrans] = useState<Translations>(translations.en)
  const [isLoading, setIsLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydration effect - runs once on mount to sync with cookie
  useEffect(() => {
    const savedLocale = getInitialLocale()
    if (savedLocale !== locale) {
      setLocaleState(savedLocale)
      setIsRtl(savedLocale === 'ar')
      setTrans(translations[savedLocale] || translations.en)
    }
    setIsHydrated(true)
    setIsLoading(false)
    
    // Update document attributes
    document.documentElement.lang = savedLocale
    document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr'
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setIsRtl(newLocale === 'ar')
    setTrans(translations[newLocale] || translations.en)
    
    // Save to cookie
    try {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    } catch (e) {
      console.error('Failed to set locale cookie:', e)
    }
    
    // Update document attributes immediately
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale
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
        key={locale} // Force re-render of children when locale changes
        dir={isRtl ? 'rtl' : 'ltr'} 
        className={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Show loading state during hydration to prevent flash of wrong content */}
        {!isHydrated ? (
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-[#1E6F5C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    // Return defaults if not in provider (shouldn't happen in normal use)
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
