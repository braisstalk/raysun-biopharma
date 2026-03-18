'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, i18n, languageNames } from '@/i18n/config'
import { translations, Translations } from '@/i18n/locales'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  isRtl: boolean
  t: Translations
  localeName: string
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [isRtl, setIsRtl] = useState(false)
  const [trans, setTrans] = useState<Translations>(translations.en)

  useEffect(() => {
    // Get locale from cookie
    const cookies = document.cookie.split('; ')
    const localeCookie = cookies.find(c => c.startsWith('locale='))
    if (localeCookie) {
      const savedLocale = localeCookie.split('=')[1] as Locale
      if (i18n.locales.includes(savedLocale)) {
        setLocaleState(savedLocale)
        setIsRtl(savedLocale === 'ar')
        setTrans(translations[savedLocale] || translations.en)
      }
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setIsRtl(newLocale === 'ar')
    setTrans(translations[newLocale] || translations.en)
    
    // Save to cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
    
    // Update document direction
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale
  }

  return (
    <LocaleContext.Provider value={{ 
      locale, 
      setLocale, 
      isRtl, 
      t: trans,
      localeName: languageNames[locale]
    }}>
      <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    // Return defaults if not in provider
    return {
      locale: 'en' as Locale,
      setLocale: () => {},
      isRtl: false,
      t: translations.en,
      localeName: 'English'
    }
  }
  return context
}
