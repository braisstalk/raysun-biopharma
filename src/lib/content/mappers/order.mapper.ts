// Order Content Mapper

import { ContentOrderPage, ContentOrderType, ContentPaymentMethod } from '../types/content-order'

const orderTypes: ContentOrderType[] = [
  { id: 'quick', title: 'Quick Order', description: 'Browse and add products directly to cart', icon: 'ShoppingCart' },
  { id: 'bulk', title: 'Bulk / B2B Orders', description: 'Request quote for large quantities and custom pricing', icon: 'Package' },
  { id: 'rfq', title: 'Request Quotation', description: 'Submit requirements for personalized quote', icon: 'FileText' },
]

const paymentMethods: ContentPaymentMethod[] = [
  { id: 'online', name: 'Online Payment', status: 'coming' },
  { id: 'tt', name: 'Bank Transfer (TT)', status: 'available' },
  { id: 'account', name: 'Account Terms', status: 'available' },
]

export function mapOrderContent(): ContentOrderPage {
  return {
    hero: {
      title: 'Order Now',
      subtitle: 'Place your order or request a quote for pharmaceutical products.'
    },
    orderTypes,
    paymentMethods,
    trackingPlaceholder: 'Enter order number (e.g., ORD-2026-XXXXXX)',
    helpText: 'Need assistance? Contact our sales team for personalized support.'
  }
}
