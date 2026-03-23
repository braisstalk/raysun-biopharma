'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Bot, X, Send, ExternalLink, Minimize2, Maximize2 } from 'lucide-react'
import { usePageContent } from '@/lib/strapi/usePageContent'
import { getAiAssistantContent } from '@/lib/content'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  links?: Array<{ label: string; href: string }>
  timestamp: Date
}

interface AiMockAnswer {
  keywords: string[]
  answer: string
  relatedLinks: Array<{ label: string; href: string }>
}

const LOCAL_PROMPTS = [
  'Tell me about your products',
  'How can I verify a product?',
  'How do I place an order?',
  'Show me your certifications',
  'How can I contact sales?',
]

export default function AiChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Try CMS first, fallback to local
  const cmsContent = usePageContent('ai-assistant') as any
  const localContent = getAiAssistantContent()

  const quickPrompts: string[] = cmsContent?.quickPrompts || LOCAL_PROMPTS
  const welcomeMessage: string = cmsContent?.welcomeMessage || "Hello! I'm the Raysun Biopharma AI Assistant. I can help you with product information, verification, ordering, and more. How can I assist you today?"
  const disclaimer: string = cmsContent?.disclaimer || 'AI responses are for reference only. Consult healthcare professionals for medical advice.'
  const defaultAnswer: string = cmsContent?.defaultAnswer || localContent.defaultAnswer
  const mockAnswers: AiMockAnswer[] = cmsContent?.mockAnswers || localContent.mockAnswers

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (open && !minimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, minimized])

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: welcomeMessage,
        links: [
          { label: 'Browse Products', href: '/products' },
          { label: 'Order Now', href: '/order-now' },
          { label: 'Verify Product', href: '/verify' },
        ],
        timestamp: new Date(),
      }])
    }
  }, [open])

  function findAnswer(question: string): { answer: string; links: Array<{ label: string; href: string }> } {
    const lowerQ = question.toLowerCase()
    for (const mock of mockAnswers) {
      if (mock.keywords.some(kw => lowerQ.includes(kw))) {
        return { answer: mock.answer, links: mock.relatedLinks }
      }
    }
    return {
      answer: defaultAnswer,
      links: [
        { label: 'Browse Products', href: '/products' },
        { label: 'Contact Us', href: '/contact' },
      ],
    }
  }

  function handleSend(text?: string) {
    const msg = (text || input).trim()
    if (!msg) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: msg,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const { answer, links } = findAnswer(msg)
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: answer,
        links,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 800 + Math.random() * 700)
  }

  if (!open) return null

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:right-20 z-[75]">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 transition-colors"
        >
          <Bot className="w-5 h-5" />
          <span className="text-sm font-medium">AI Assistant</span>
          <Maximize2 className="w-4 h-4 ml-1" />
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm sm:hidden" onClick={onClose} />

      <div className="fixed right-0 sm:right-4 bottom-0 sm:bottom-4 z-[75] w-full sm:w-[400px] h-full sm:h-[600px] sm:max-h-[calc(100vh-2rem)] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">AI Assistant</h3>
              <p className="text-[10px] text-blue-200">Raysun Biopharma</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setMinimized(true)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center" title="Minimize">
              <Minimize2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center" title="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[85%]">
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-[10px] text-slate-400">AI Assistant</span>
                  </div>
                )}
                <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}>
                  {msg.content}
                </div>
                {msg.links && msg.links.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                      >
                        {link.label} <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-[10px] text-slate-400">typing...</span>
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 shrink-0">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap shrink-0 hover:bg-blue-100 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-slate-200 shrink-0 bg-white">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
              className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            {disclaimer}
          </p>
        </div>
      </div>
    </>
  )
}
