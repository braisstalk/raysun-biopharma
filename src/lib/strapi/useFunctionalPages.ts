'use client'

import { useState, useEffect } from 'react'
import { STRAPI_URL } from './client'

// ── Types for new form-based fields ──

export interface InquiryType {
  id: string
  label: string
  description: string
}

export interface CountryItem {
  name: string
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

// ── Hook for Contact page ──

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
          const page = json.data[0]
          // Try new fields first, fallback to content JSON
          const inquiryTypes = page.contactInquiryTypes?.map((t: any) => ({
            id: t.id,
            label: t.label,
            description: t.description
          })) || page.content?.inquiryTypes

          const countries = page.contactCountries?.map((c: any) => c.name) || page.content?.countries

          setData({
            inquiryTypes: inquiryTypes || [],
            countries: countries || [],
            officeEmail: page.contactOfficeEmail || page.content?.officeInfo?.email || '',
            officePhone: page.contactOfficePhone || page.content?.officeInfo?.phone || '',
            officeAddress: page.contactOfficeAddress || page.content?.officeInfo?.address || '',
            officeHours: page.contactOfficeHours || page.content?.officeInfo?.businessHours || ''
          })
        }
      })
      .catch(err => {
        console.warn('[useContactPage] Failed:', err.message)
      })
  }, [])

  return data
}

// ── Hook for Verify page ──

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
          const page = json.data[0]
          // Try new fields first, fallback to content JSON
          const types = page.verifyTypes?.map((t: any) => ({
            id: t.id,
            label: t.label,
            placeholder: t.placeholder
          })) || page.content?.types

          setData({
            types: types || [],
            helpTitle: page.verifyHelpTitle || page.content?.helpSection?.title || '',
            helpDescription: page.verifyHelpDescription || page.content?.helpSection?.description || '',
            reportTitle: page.verifyReportTitle || page.content?.reportSection?.title || '',
            reportDescription: page.verifyReportDescription || page.content?.reportSection?.description || ''
          })
        }
      })
      .catch(err => {
        console.warn('[useVerifyPage] Failed:', err.message)
      })
  }, [])

  return data
}

// ── Hook for Order page ──

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
          const page = json.data[0]
          // Try new fields first, fallback to content JSON
          const orderTypes = page.orderTypes?.map((t: any) => ({
            id: t.id,
            title: t.title,
            description: t.description,
            icon: t.icon
          })) || page.content?.orderTypes

          const paymentMethods = page.orderPaymentMethods?.map((m: any) => ({
            id: m.id,
            name: m.name,
            status: m.status
          })) || page.content?.paymentMethods

          const countries = page.orderCountries?.map((c: any) => c.name) || page.content?.countries

          setData({
            orderTypes: orderTypes || [],
            paymentMethods: paymentMethods || [],
            trackingPlaceholder: page.orderTrackingPlaceholder || page.content?.trackingPlaceholder || '',
            helpText: page.orderHelpText || page.content?.helpText || '',
            countries: countries || []
          })
        }
      })
      .catch(err => {
        console.warn('[useOrderPage] Failed:', err.message)
      })
  }, [])

  return data
}
