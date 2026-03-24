'use client'

import { useState, useEffect, ReactNode } from 'react'
import { useTranslation } from '@/i18n/useTranslation'
import { translateText } from '@/lib/translate'
import { useLocale } from '@/i18n/LocaleContext'

interface AutoTextProps {
  children?: ReactNode
  text?: string
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

// Component that auto-translates CMS text based on current locale
export default function AutoText({ children, text, as: Tag = 'span', className }: AutoTextProps) {
  const { locale } = useTranslation()
  const { isRtl } = useLocale()
  const [translated, setTranslated] = useState('')
  
  // Get the text content from either text prop or children
  const sourceText = text || (typeof children === 'string' ? children : '')

  useEffect(() => {
    if (!sourceText || locale === 'en') {
      setTranslated(sourceText)
      return
    }

    let cancelled = false
    translateText(sourceText, locale).then(result => {
      if (!cancelled) setTranslated(result)
    })
    return () => { cancelled = true }
  }, [sourceText, locale])

  const rtlClass = isRtl ? 'rtl-text' : ''
  const combinedClassName = `${rtlClass} ${className || ''}`.trim()

  return <Tag className={combinedClassName}>{translated || sourceText}</Tag>
}
