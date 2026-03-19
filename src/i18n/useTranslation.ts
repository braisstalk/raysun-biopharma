// Simple translation hook for client components - DEPRECATED: Use useLocale from LocaleContext instead
'use client'

import { useLocale } from './LocaleContext'

// Re-export useLocale as useTranslation for backward compatibility
export function useTranslation() {
  const { locale, setLocale, t, isRtl } = useLocale()
  
  return {
    locale,
    setLocale,
    t,
    isRtl
  }
}
