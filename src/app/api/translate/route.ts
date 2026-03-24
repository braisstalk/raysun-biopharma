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

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang } = await request.json()

    if (!text || !targetLang || targetLang === 'en') {
      return NextResponse.json({ translated: text })
    }

    const googleLang = langMap[targetLang] || targetLang
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encodeURIComponent(text)}`

    const res = await fetch(url)
    if (!res.ok) {
      return NextResponse.json({ translated: text })
    }

    const data = await res.json()
    const translated = data?.[0]?.map((item: any) => item[0]).join('') || text

    return NextResponse.json({ translated })
  } catch {
    return NextResponse.json({ translated: '' })
  }
}
