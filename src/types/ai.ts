// AI Types for future implementation
export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface AIConversation {
  id: string
  messages: AIMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface AIQuestion {
  id: string
  question: string
  answer: string
  category: string
  language: string
}

export interface AIConfig {
  provider: 'openai' | 'anthropic' | 'custom'
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
}

export interface KnowledgeBaseDocument {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  lastUpdated: Date
}

// Future API response types
export interface AIResponse {
  content: string
  sources?: KnowledgeBaseDocument[]
  confidence?: number
  followUpQuestions?: string[]
}

// API function signatures (to be implemented)
export interface AIAPIFunctions {
  chat: (messages: AIMessage[]) => Promise<AIResponse>
  searchKnowledgeBase: (query: string) => Promise<KnowledgeBaseDocument[]>
  getConversationHistory: (conversationId: string) => Promise<AIConversation>
  saveConversation: (conversation: AIConversation) => Promise<void>
}
