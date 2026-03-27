'use client'

import { createContext, useContext, ReactNode } from 'react'
import { translations } from '@/i18n/locales'
import type { Translations } from '@/i18n/locales/en'

interface LocaleContextType {
  locale: 'en'
  setLocale: (locale: string) => void
  isRtl: false
  t: Translations
  localeName: 'English'
  isLoading: false
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({ children }: { children: ReactNode; initialLocale?: string }) {
  return (
    <LocaleContext.Provider value={{
      locale: 'en',
      setLocale: () => {},
      isRtl: false,
      t: translations.en,
      localeName: 'English',
      isLoading: false,
    }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    return {
      locale: 'en' as const,
      setLocale: () => {},
      isRtl: false as const,
      t: translations.en,
      localeName: 'English' as const,
      isLoading: false as const,
    }
  }
  return context
}
