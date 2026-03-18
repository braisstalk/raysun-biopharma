// Content Resources Types

export type ResourceStatus = 'public' | 'request' | 'restricted' | 'pending'

export interface ContentResourceItem {
  id: string
  title: string
  description: string
  type: 'document' | 'video' | 'link'
  category: string
  fileSize?: string
  downloadUrl?: string
}

export interface ContentResourceDetail {
  id: string
  title: string
  slug: string
  description: string
  type: 'document' | 'video' | 'link'
  category: string
  fileSize?: string
  updatedDate?: string
  status: ResourceStatus
  downloadUrl?: string
  relatedResources?: string[] // IDs of related resources
}

export interface ContentResourcesPage {
  hero: {
    title: string
    subtitle: string
  }
  categories: {
    id: string
    label: string
  }[]
  items: ContentResourceItem[]
}
