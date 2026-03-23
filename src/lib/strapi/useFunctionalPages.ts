'use client'

import { useState, useEffect } from 'react'
import { STRAPI_URL } from './client'

export interface InquiryType {
  id: string
  label: string
  description: string
}

export interface VerifyType {
  id: string
  label: string
  placeholder: string
}

export interface OrderType {
  id: string
  title: string
  description: string
  icon: string
}

export interface PaymentMethod {
  id: string
  name: string
  status: 'available' | 'coming'
}

export interface ContactPageData {
  inquiryTypes: InquiryType[]
  countries: string[]
  officeEmail: string
  officePhone: string
  officeAddress: string
  officeHours: string
}

export interface VerifyPageData {
  types: VerifyType[]
  mockResults: Array<{
    code: string
    status: 'success' | 'warning' | 'error'
    message: string
    details?: string
  }>
  helpTitle: string
  helpDescription: string
  reportTitle: string
  reportDescription: string
}

export interface OrderPageData {
  orderTypes: OrderType[]
  paymentMethods: PaymentMethod[]
  trackingPlaceholder: string
  helpText: string
  countries: string[]
}

export function useContactPage(): ContactPageData | null {
  const [data, setData] = useState<ContactPageData | null>(null)

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=contact&pagination[pageSize]=1`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (json.data && json.data.length > 0) {
          const c = json.data[0].content
          if (c) {
            setData({
              inquiryTypes: c.inquiryTypes || [],
              countries: c.countries || [],
              officeEmail: c.officeInfo?.email || '',
              officePhone: c.officeInfo?.phone || '',
              officeAddress: c.officeInfo?.address || '',
              officeHours: c.officeInfo?.businessHours || '',
            })
          }
        }
      })
      .catch(err => {
        console.warn('[useContactPage] Failed:', err.message)
      })
  }, [])

  return data
}

export function useVerifyPage(): VerifyPageData | null {
  const [data, setData] = useState<VerifyPageData | null>(null)

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=verify&pagination[pageSize]=1`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (json.data && json.data.length > 0) {
          const c = json.data[0].content
          if (c) {
            setData({
              types: c.types || [],
              mockResults: c.mockResults || [],
              helpTitle: c.helpSection?.title || '',
              helpDescription: c.helpSection?.description || '',
              reportTitle: c.reportSection?.title || '',
              reportDescription: c.reportSection?.description || '',
            })
          }
        }
      })
      .catch(err => {
        console.warn('[useVerifyPage] Failed:', err.message)
      })
  }, [])

  return data
}

export function useOrderPage(): OrderPageData | null {
  const [data, setData] = useState<OrderPageData | null>(null)

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=order-now&pagination[pageSize]=1`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (json.data && json.data.length > 0) {
          const c = json.data[0].content
          if (c) {
            setData({
              orderTypes: c.orderTypes || [],
              paymentMethods: c.paymentMethods || [],
              trackingPlaceholder: c.trackingPlaceholder || '',
              helpText: c.helpText || '',
              countries: c.countries || [],
            })
          }
        }
      })
      .catch(err => {
        console.warn('[useOrderPage] Failed:', err.message)
      })
  }, [])

  return data
}
