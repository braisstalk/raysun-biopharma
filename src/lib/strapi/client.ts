const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://raysun-cms-production.up.railway.app'

interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiError {
  data: null
  error: {
    status: number
    name: string
    message: string
  }
}

type StrapiResult<T> = StrapiResponse<T> | StrapiError

function isError<T>(result: StrapiResult<T>): result is StrapiError {
  return result.data === null && 'error' in result
}

export async function fetchStrapi<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T | null> {
  try {
    const url = new URL(`/api${endpoint}`, STRAPI_URL)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value)
      })
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error(`Strapi fetch error: ${res.status} ${res.statusText} for ${endpoint}`)
      return null
    }

    const json: StrapiResult<T> = await res.json()

    if (isError(json)) {
      console.error(`Strapi API error: ${json.error.message} for ${endpoint}`)
      return null
    }

    return json.data
  } catch (error) {
    console.error(`Strapi fetch failed for ${endpoint}:`, error)
    return null
  }
}

export async function fetchStrapiList<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T[]> {
  const data = await fetchStrapi<T[]>(endpoint, params)
  return data || []
}

export { STRAPI_URL }
