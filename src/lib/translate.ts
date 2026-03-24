// Google Translate free API wrapper with caching
// Uses the free translate.googleapis.com endpoint

const cache = new Map<string, string>()

// Language code mapping (our codes → Google Translate codes)
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

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  // Don't translate if target is English or text is empty
  if (!text || !text.trim() || targetLang === 'en') return text

  // Check cache
  const cacheKey = `${targetLang}:${text}`
  if (cache.has(cacheKey)) return cache.get(cacheKey)!

  const googleLang = langMap[targetLang] || targetLang

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encodeURIComponent(text)}`
    const res = await fetch(url)
    if (!res.ok) return text

    const data = await res.json()
    // Google returns [[["translated text","original text",null,null,10]],null,"en"]
    const translated = data?.[0]?.map((item: any) => item[0]).join('') || text

    cache.set(cacheKey, translated)
    return translated
  } catch {
    return text
  }
}

// Batch translate multiple texts (more efficient)
export async function translateBatch(
  texts: string[],
  targetLang: string
): Promise<string[]> {
  if (targetLang === 'en') return texts

  const results: string[] = []
  const toTranslate: { index: number; text: string }[] = []

  // Check cache first
  for (let i = 0; i < texts.length; i++) {
    const cacheKey = `${targetLang}:${texts[i]}`
    if (cache.has(cacheKey)) {
      results[i] = cache.get(cacheKey)!
    } else if (!texts[i] || !texts[i].trim()) {
      results[i] = texts[i]
    } else {
      toTranslate.push({ index: i, text: texts[i] })
      results[i] = texts[i] // placeholder
    }
  }

  // Translate uncached texts (batch by joining with delimiter)
  if (toTranslate.length > 0) {
    const delimiter = '\n§§§\n'
    const combined = toTranslate.map(t => t.text).join(delimiter)

    try {
      const googleLang = langMap[targetLang] || targetLang
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encodeURIComponent(combined)}`
      const res = await fetch(url)

      if (res.ok) {
        const data = await res.json()
        const translated = data?.[0]?.map((item: any) => item[0]).join('') || combined
        const parts = translated.split(/\n?§§§\n?/)

        for (let i = 0; i < toTranslate.length; i++) {
          const translatedText = parts[i]?.trim() || toTranslate[i].text
          results[toTranslate[i].index] = translatedText
          cache.set(`${targetLang}:${toTranslate[i].text}`, translatedText)
        }
      }
    } catch {
      // Keep original texts on error
    }
  }

  return results
}
