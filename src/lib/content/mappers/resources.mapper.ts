// Resources Content Mapper

import { ContentResourcesPage, ContentResourceItem, ContentResourceDetail } from '../types/content-resources'

// Extended mock resources data with detail
const resources: ContentResourceDetail[] = [
  {
    id: '1',
    slug: 'company-brochure',
    title: 'Company Brochure',
    description: 'Comprehensive overview of Raysun Biopharma, our manufacturing capabilities, certifications, and product portfolio.',
    type: 'document',
    category: 'Corporate',
    fileSize: '2.4 MB',
    updatedDate: 'Jan 2026',
    status: 'public',
    relatedResources: ['2', '3']
  },
  {
    id: '2',
    slug: 'factory-overview',
    title: 'Factory Overview',
    description: 'Detailed information about our state-of-the-art manufacturing facility in Vientiane, Laos.',
    type: 'document',
    category: 'Facility',
    fileSize: '3.1 MB',
    updatedDate: 'Dec 2025',
    status: 'public',
    relatedResources: ['1', '9']
  },
  {
    id: '3',
    slug: 'product-catalog',
    title: 'Product Catalog',
    description: 'Complete catalog of our pharmaceutical products including formulations, strengths, and packaging options.',
    type: 'document',
    category: 'Products',
    fileSize: '5.8 MB',
    updatedDate: 'Feb 2026',
    status: 'request',
    relatedResources: ['1', '4']
  },
  {
    id: '4',
    slug: 'quality-certifications',
    title: 'Quality Certifications',
    description: 'Overview of our quality certifications including WHO GMP, ISO 9001, and ISO 14001.',
    type: 'document',
    category: 'Quality',
    fileSize: '1.2 MB',
    updatedDate: 'Mar 2026',
    status: 'public',
    relatedResources: ['5', '6']
  },
  {
    id: '5',
    slug: 'gmp-certificate',
    title: 'GMP Certificate',
    description: 'WHO GMP certification document for our manufacturing facility.',
    type: 'document',
    category: 'Quality',
    fileSize: '0.8 MB',
    updatedDate: 'Mar 2026',
    status: 'public',
    relatedResources: ['4', '6']
  },
  {
    id: '6',
    slug: 'iso-9001-certificate',
    title: 'ISO 9001 Certificate',
    description: 'ISO 9001:2015 Quality Management System certification.',
    type: 'document',
    category: 'Quality',
    fileSize: '0.5 MB',
    updatedDate: 'Jan 2026',
    status: 'public',
    relatedResources: ['4', '5']
  },
  {
    id: '7',
    slug: 'corporate-logo-pack',
    title: 'Corporate Logo Pack',
    description: 'Official Raysun Biopharma logos and brand guidelines for authorized partners.',
    type: 'link',
    category: 'Media',
    fileSize: '4.2 MB',
    updatedDate: 'Nov 2025',
    status: 'restricted',
    relatedResources: ['8']
  },
  {
    id: '8',
    slug: 'product-images',
    title: 'Product Images',
    description: 'High-resolution product images for marketing and promotional materials.',
    type: 'link',
    category: 'Media',
    fileSize: '12.5 MB',
    updatedDate: 'Oct 2025',
    status: 'request',
    relatedResources: ['7']
  },
  {
    id: '9',
    slug: 'factory-tour-video',
    title: 'Factory Tour Video',
    description: 'Virtual tour of our GMP-certified manufacturing facility.',
    type: 'video',
    category: 'Media',
    fileSize: '45 MB',
    updatedDate: 'Sep 2025',
    status: 'public',
    relatedResources: ['2']
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'facility', label: 'Facility' },
  { id: 'products', label: 'Products' },
  { id: 'quality', label: 'Quality' },
  { id: 'media', label: 'Media' },
]

export function mapResourcesContent(): ContentResourcesPage {
  return {
    hero: {
      title: 'Downloads & Documents',
      subtitle: 'Access our brochures, certificates, and media resources.'
    },
    categories: categories.map(cat => ({
      id: cat.id,
      label: cat.label
    })),
    items: resources.map(res => ({
      id: res.id,
      title: res.title,
      description: res.description,
      type: res.type,
      category: res.category,
      fileSize: res.fileSize
    }))
  }
}

export function getResourceBySlug(slug: string): ContentResourceDetail | undefined {
  return resources.find(r => r.slug === slug)
}

export function getAllResources(): ContentResourceDetail[] {
  return resources
}

export function getRelatedResources(resourceId: string): ContentResourceDetail[] {
  const resource = resources.find(r => r.id === resourceId)
  if (!resource || !resource.relatedResources) return []
  return resources.filter(r => resource.relatedResources?.includes(r.id))
}
