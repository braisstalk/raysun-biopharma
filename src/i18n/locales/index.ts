// Locale translations export
import { en } from './en'
import type { Translations } from './en'
import { lo } from './lo'
import { th } from './th'
import { vi } from './vi'
import { ar } from './ar'
import { es } from './es'
import { fr } from './fr'
import { zh } from './zh'
import { Locale } from '../config'

export const translations: Record<Locale, any> = {
  en,
  lo,
  th,
  vi,
  ar,
  es,
  fr,
  zh,
}

export { en, lo, th, vi, ar, es, fr, zh }
export type { Translations }
