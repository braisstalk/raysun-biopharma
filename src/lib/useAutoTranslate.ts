'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/useTranslation'
import { translateText, translateBatch } from './translate'

// Hook to auto-translate a single text
export function useAutoTranslate(text: string): string {
  const { locale } = useTranslation()
  const [translated, setTranslated] = useState(text)

  useEffect(() => {
    if (!text || locale === 'en') {
      setTranslated(text)
      return
    }

    let cancelled = false
    translateText(text, locale).then(result => {
      if (!cancelled) setTranslated(result)
    })
    return () => { cancelled = true }
  }, [text, locale])

  return translated
}

// Hook to auto-translate multiple texts at once
export function useAutoTranslateBatch(texts: string[]): string[] {
  const { locale } = useTranslation()
  const [translated, setTranslated] = useState(texts)

  useEffect(() => {
    if (locale === 'en' || texts.length === 0) {
      setTranslated(texts)
      return
    }

    let cancelled = false
    translateBatch(texts, locale).then(results => {
      if (!cancelled) setTranslated(results)
    })
    return () => { cancelled = true }
  }, [texts.join('||'), locale])

  return translated
}

// Hook to auto-translate an object's string values
export function useAutoTranslateObject<T extends Record<string, any>>(
  obj: T | null,
  keys: (keyof T)[]
): T | null {
  const { locale } = useTranslation()
  const [translated, setTranslated] = useState<T | null>(obj)

  useEffect(() => {
    if (!obj || locale === 'en') {
      setTranslated(obj)
      return
    }

    let cancelled = false
    const textsToTranslate = keys.map(k => String(obj[k] || ''))

    translateBatch(textsToTranslate, locale).then(results => {
      if (!cancelled) {
        const newObj = { ...obj }
        keys.forEach((key, i) => {
          if (results[i]) (newObj as any)[key] = results[i]
        })
        setTranslated(newObj)
      }
    })
    return () => { cancelled = true }
  }, [obj, locale])

  return translated
}
