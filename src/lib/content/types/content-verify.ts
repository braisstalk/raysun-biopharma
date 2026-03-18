// Content Verify Types

export interface ContentVerifyType {
  id: string
  label: string
  placeholder: string
}

export interface ContentVerifyMockResult {
  code: string
  status: 'success' | 'warning' | 'error'
  message: string
  details?: string
}

export interface ContentVerifyPage {
  hero: {
    title: string
    subtitle: string
  }
  types: ContentVerifyType[]
  mockResults: ContentVerifyMockResult[]
  helpSection: {
    title: string
    description: string
  }
  reportSection: {
    title: string
    description: string
  }
}
