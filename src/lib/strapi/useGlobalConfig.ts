'use client'

import { useState, useEffect } from 'react'
import { STRAPI_URL } from './client'

export interface GlobalConfig {
  siteName: string
  siteNameCn: string
  contactEmail: string
  contactPhone: string
  address: string
  complianceDisclaimer: string
  whatsappQrCodeUrl: string | null
  wecomQrCodeUrl: string | null
  socialLinkedin: string | null
  socialFacebook: string | null
  socialYoutube: string | null
}

function getMediaUrl(media: any): string | null {
  if (!media) return null
  const url = media.url || media.data?.attributes?.url
  if (!url) return null
  return url.startsWith('/') ? `${STRAPI_URL}${url}` : url
}

export function useGlobalConfig(): GlobalConfig | null {
  const [config, setConfig] = useState<GlobalConfig | null>(null)

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/global?populate[0]=whatsappQrCode&populate[1]=wecomQrCode`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (json.data) {
          const g = json.data
          setConfig({
            siteName: g.siteName || 'Raysun Biopharma',
            siteNameCn: g.siteNameCn || '雷神生物制药',
            contactEmail: g.contactEmail || 'info@raysunpharma.com',
            contactPhone: g.contactPhone || '',
            address: g.address || '',
            complianceDisclaimer: g.complianceDisclaimer || 'This product information is provided for reference purposes only. Product availability, registration status, and specifications may vary by country.',
            whatsappQrCodeUrl: getMediaUrl(g.whatsappQrCode),
            wecomQrCodeUrl: getMediaUrl(g.wecomQrCode),
            socialLinkedin: g.socialLinkedin || null,
            socialFacebook: g.socialFacebook || null,
            socialYoutube: g.socialYoutube || null,
          })
        }
      })
      .catch(err => {
        console.warn('[useGlobalConfig] Failed:', err.message)
      })
  }, [])

  return config
}
