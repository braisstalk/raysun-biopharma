// AI Assistant Content Mapper

import { ContentAiAssistantPage, ContentAiPrompt, ContentAiMockAnswer } from '../types/content-ai'

const quickPrompts: ContentAiPrompt[] = [
  { id: '1', label: 'Tell me about your manufacturing capabilities', keywords: ['manufacturing', 'production', 'facility', 'capabilities'] },
  { id: '2', label: 'How can I verify a product?', keywords: ['verify', 'verification', 'authentic', 'batch', 'product'] },
  { id: '3', label: 'How do I place a bulk order?', keywords: ['order', 'bulk', 'quote', 'purchase', 'buy'] },
  { id: '4', label: 'Show me your product categories', keywords: ['products', 'catalog', 'categories', 'list'] },
  { id: '5', label: 'How can I contact sales?', keywords: ['contact', 'sales', 'reach', 'phone', 'email'] },
]

const mockAnswers: ContentAiMockAnswer[] = [
  {
    keywords: ['manufacturing', 'production', 'facility', 'capabilities', 'gmp', 'factory'],
    answer: 'Our state-of-the-art manufacturing facility is WHO GMP certified and located in Vientiane, Laos. We specialize in oral solid doses (tablets, capsules, softgels), topical preparations (creams, ointments), and sterile injectables. Our production lines adhere to international quality standards with rigorous QC/QA processes.',
    relatedLinks: [
      { label: 'View Manufacturing', href: '/manufacturing' },
      { label: 'Quality Certifications', href: '/quality-compliance' },
      { label: 'Contact Sales', href: '/contact' },
    ]
  },
  {
    keywords: ['verify', 'verification', 'authentic', 'batch', 'product', 'check'],
    answer: 'You can verify product authenticity using our Verification Center. Enter the batch number found on your product packaging to check if it\'s an authentic Raysun Biopharma product. We also verify GMP certificates and authorized distributors.',
    relatedLinks: [
      { label: 'Go to Verification', href: '/verify' },
      { label: 'Report Counterfeit', href: '/contact' },
    ]
  },
  {
    keywords: ['order', 'bulk', 'quote', 'purchase', 'buy', 'b2b'],
    answer: 'To place a bulk order, you can: 1) Browse our product catalog and add items to cart for quick orders, 2) Use our Quote Request form for large quantities and custom pricing, 3) Contact our sales team directly for partnership opportunities. We typically respond to quote requests within 24-48 hours.',
    relatedLinks: [
      { label: 'Request Quote', href: '/order-now' },
      { label: 'Browse Products', href: '/products' },
      { label: 'Contact Sales', href: '/contact' },
    ]
  },
  {
    keywords: ['products', 'catalog', 'categories', 'list', 'medicines', 'drugs'],
    answer: 'We offer 200+ pharmaceutical products across categories: Antibiotics, Cardiovascular, Pain & Inflammation, Dermatology, Vitamins & Supplements, Gastrointestinal, Respiratory, and Traditional/Herbal medicines. Our formulations include tablets, capsules, softgels, creams, ointments, and injections.',
    relatedLinks: [
      { label: 'Browse Products', href: '/products' },
      { label: 'Request Quote', href: '/order-now' },
    ]
  },
  {
    keywords: ['contact', 'sales', 'reach', 'phone', 'email', 'support'],
    answer: 'You can reach our team through: Email: info@raysunpharma.com | Phone: Available upon request | Our business hours are Monday-Friday, 9:00 AM - 6:00 PM (GMT+7). We typically respond within 24-48 hours.',
    relatedLinks: [
      { label: 'Contact Page', href: '/contact' },
      { label: 'Request Quote', href: '/order-now' },
    ]
  },
]

const defaultAnswer = 'Thank you for your question! I can help you with information about our products, manufacturing capabilities, verification, ordering, and partnerships. Please select a quick question above or browse our website for more details.'

export function mapAiAssistantContent(): ContentAiAssistantPage {
  return {
    hero: {
      title: 'AI Assistant',
      subtitle: 'Get instant answers to your questions about our products and services.'
    },
    quickPrompts,
    mockAnswers,
    businessHours: {
      weekdays: 'Monday-Friday, 9:00 AM - 6:00 PM (GMT+7)',
      weekend: 'Saturday, 9:00 AM - 1:00 PM (GMT+7)'
    },
    defaultAnswer
  }
}
