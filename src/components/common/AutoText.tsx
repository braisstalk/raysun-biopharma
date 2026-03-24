'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/useTranslation'
import { translateText } from '@/lib/translate'

interface AutoTextProps {
  text: string
  as?: keyof JSX.IntrinsicElements
  className?: string
  children?: never
}

// Component that auto-translates CMS text based on current locale
export default function AutoText({ text, as: Tag = 'span', className }: AutoTextProps) {
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

  return <Tag className={className}>{translated}</Tag>
}
