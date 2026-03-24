// Translation service - uses server-side proxy to avoid CORS issues

const cache = new Map<string, string>()

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text || !text.trim() || targetLang === 'en') return text

  const cacheKey = `${targetLang}:${text}`
  if (cache.has(cacheKey)) return cache.get(cacheKey)!

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang }),
    })

    if (!res.ok) return text

    const data = await res.json()
    const translated = data.translated || text

    cache.set(cacheKey, translated)
    return translated
  } catch {
    return text
  }
}

export async function translateBatch(
  texts: string[],
  targetLang: string
): Promise<string[]> {
  if (targetLang === 'en' || texts.length === 0) return texts

  // Translate each text individually (proxy handles one at a time)
  const results = await Promise.all(
    texts.map(text => translateText(text, targetLang))
  )

  return results
}
