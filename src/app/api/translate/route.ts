import { NextRequest, NextResponse } from 'next/server'

const langMap: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  lo: 'lo',
  th: 'th',
  vi: 'vi',
  ar: 'ar',
  es: 'es',
  fr: 'fr',
}

// Brand name protection - replace incorrect translations with official names
const brandReplacements: Record<string, Array<{ wrong: RegExp; correct: string }>> = {
  zh: [
    { wrong: /瑞(盛|升|森|生|声|胜|圣)生物制药/g, correct: '雷神生物制药' },
    { wrong: /Raysun\s*Biopharma/gi, correct: '雷神生物制药' },
    { wrong: /Raysun\s*生物制药/gi, correct: '雷神生物制药' },
    { wrong: /瑞(盛|升|森|生|声|胜|圣)制药/g, correct: '雷神制药' },
    { wrong: /雷(森|声|胜|圣|升|盛)生物制药/g, correct: '雷神生物制药' },
    { wrong: /雷(森|声|胜|圣|升|盛)制药/g, correct: '雷神制药' },
  ],
  th: [
    { wrong: /Raysun\s*Biopharma/gi, correct: 'Raysun Biopharma' },
  ],
  lo: [
    { wrong: /Raysun\s*Biopharma/gi, correct: 'Raysun Biopharma' },
  ],
  vi: [
    { wrong: /Raysun\s*Biopharma/gi, correct: 'Raysun Biopharma' },
  ],
  ar: [
    { wrong: /Raysun\s*Biopharma/gi, correct: 'Raysun Biopharma' },
  ],
  es: [
    { wrong: /Raysun\s*Biopharma/gi, correct: 'Raysun Biopharma' },
  ],
  fr: [
    { wrong: /Raysun\s*Biopharma/gi, correct: 'Raysun Biopharma' },
  ],
}

function fixBrandNames(text: string, targetLang: string): string {
  const replacements = brandReplacements[targetLang]
  if (!replacements) return text
  let result = text
  for (const { wrong, correct } of replacements) {
    result = result.replace(wrong, correct)
  }
  return result
}

async function doTranslate(text: string, targetLang: string): Promise<string> {
  if (!text || !targetLang || targetLang === 'en') return text

  const googleLang = langMap[targetLang] || targetLang
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encodeURIComponent(text)}`

  const res = await fetch(url)
  if (!res.ok) {
    console.error(`[translate] Google API returned ${res.status} for lang=${googleLang}`)
    return text
  }

  const data = await res.json()
  let translated = data?.[0]?.map((item: any) => item[0]).join('') || text

  // Fix brand names after translation
  translated = fixBrandNames(translated, targetLang)

  return translated
}

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get('text') || ''
  const lang = request.nextUrl.searchParams.get('lang') || 'zh'

  if (!text) {
    return NextResponse.json({ status: 'ok', message: 'Translate API is running. Use ?text=hello&lang=zh to test.' })
  }

  try {
    const translated = await doTranslate(text, lang)
    return NextResponse.json({ original: text, translated, lang })
  } catch (err: any) {
    console.error('[translate] GET error:', err.message)
    return NextResponse.json({ error: err.message, translated: text })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang } = await request.json()
    const translated = await doTranslate(text, targetLang)
    return NextResponse.json({ translated })
  } catch (err: any) {
    console.error('[translate] POST error:', err.message)
    return NextResponse.json({ translated: '' })
  }
}
