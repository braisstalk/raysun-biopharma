// Content AI Assistant Types

export interface ContentAiPrompt {
  id: string
  label: string
  keywords: string[]
}

export interface ContentAiMockAnswer {
  keywords: string[]
  answer: string
  relatedLinks: {
    label: string
    href: string
  }[]
}

export interface ContentAiHours {
  weekdays: string
  weekend: string
}

export interface ContentAiAssistantPage {
  hero: {
    title: string
    subtitle: string
  }
  quickPrompts: ContentAiPrompt[]
  mockAnswers: ContentAiMockAnswer[]
  businessHours: ContentAiHours
  defaultAnswer: string
}
