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

// Fix brand name after translation - Raysun Biopharma = 雷神生物制药
function fixBrandNames(text: string, lang: string): string {
  if (lang === 'zh') {
    return text
      .replace(/瑞[盛升森生声胜圣舜]生物制药/g, '雷神生物制药')
      .replace(/瑞[盛升森生声胜圣舜]制药/g, '雷神制药')
      .replace(/雷[森声胜圣升盛舜]生物制药/g, '雷神生物制药')
      .replace(/雷[森声胜圣升盛舜]制药/g, '雷神制药')
      .replace(/Raysun\s*Biopharma/gi, '雷神生物制药')
      .replace(/Raysun\s*生物制药/gi, '雷神生物制药')
  }
  return text
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
