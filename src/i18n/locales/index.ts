// Locale translations export
import { en, Translations } from './en'
import { lo } from './lo'
import { th } from './th'
import { vi } from './vi'
import { ar } from './ar'
import { es } from './es'
import { pt } from './pt'
import { Locale } from '../config'

export const translations: Record<Locale, Translations> = {
  en,
  lo,
  th,
  vi,
  ar,
  es,
  pt,
}

export { en, lo, th, vi, ar, es, pt }
export type { Translations }
