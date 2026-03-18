// Content Types for Careers Page

export interface ContentJobPosting {
  id: string
  slug: string
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  summary: string
  responsibilities: string[]
  requirements: string[]
  preferred: string[]
  postedDate: string
  relatedJobs: string[] // department-based
}

export interface ContentCareersPage {
  hero: {
    title: string
    subtitle: string
  }
  overview: {
    title: string
    description: string
  }
  benefits: {
    title: string
    items: string[]
  }
  positions: ContentJobPosting[]
}
