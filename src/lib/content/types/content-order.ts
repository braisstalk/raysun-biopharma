// Content Order Types

export interface ContentOrderType {
  id: string
  title: string
  description: string
  icon: string
}

export interface ContentPaymentMethod {
  id: string
  name: string
  status: 'available' | 'coming'
}

export interface ContentOrderSection {
  hero: {
    title: string
    subtitle: string
  }
  orderTypes: ContentOrderType[]
  paymentMethods: ContentPaymentMethod[]
  trackingPlaceholder: string
  helpText: string
}

export interface ContentOrderPage extends ContentOrderSection {}
