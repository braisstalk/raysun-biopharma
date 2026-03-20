'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Bot, Send, ArrowRight, ExternalLink, Clock } from 'lucide-react'
import { getAiAssistantContent } from '@/lib/content'
import { useTranslation } from '@/i18n/useTranslation'


export default function AiAssistant() {
  const { t } = useTranslation()
  const content = getAiAssistantContent()
  const { hero, quickPrompts, mockAnswers, businessHours, defaultAnswer } = content
  
  // Build mock responses map
  const mockResponsesMap: Record<string, { answer: string; relatedLinks: { label: string; href: string }[] }> = {}
  mockAnswers.forEach(r => {
    mockResponsesMap[r.keywords[0]] = {
      answer: r.answer,
      relatedLinks: r.relatedLinks
    }
  })
  mockResponsesMap['default'] = {
    answer: defaultAnswer,
    relatedLinks: [
      { label: 'Browse Products', href: '/products' },
      { label: 'Verification Center', href: '/verify' },
      { label: 'Order Center', href: '/order-now' },
      { label: 'Contact Us', href: '/contact' },
    ]
  }
  
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState<typeof mockResponsesMap['default'] | null>(null)

  const handleSendQuestion = () => {
    if (!question.trim()) return
    
    setIsLoading(true)
    setAnswer(null)
    
    setTimeout(() => {
      const lowerQ = question.toLowerCase()
      let matchedResponse = mockResponsesMap['default']
      
      for (const keyword of Object.keys(mockResponsesMap)) {
        if (lowerQ.includes(keyword)) {
          matchedResponse = mockResponsesMap[keyword]
          break
        }
      }
      
      setAnswer(matchedResponse)
      setIsLoading(false)
    }, 1000)
  }

  const handleQuickQuestion = (q: string) => {
    setQuestion(q)
    setIsLoading(true)
    setAnswer(null)
    
    setTimeout(() => {
      const lowerQ = q.toLowerCase()
      let matchedResponse = mockResponsesMap['default']
      
      for (const keyword of Object.keys(mockResponsesMap)) {
        if (lowerQ.includes(keyword)) {
          matchedResponse = mockResponsesMap[keyword]
          break
        }
      }
      
      setAnswer(matchedResponse)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-blue-900 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-10 h-10 text-blue-400" />
            <p className="text-blue-300 font-medium">AI ASSISTANT</p>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{hero.title}</h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Quick Questions */}
      <section className="py-8 bg-slate-50 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-slate-600 mb-4">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handleQuickQuestion(prompt.label)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-[#1E6F5C] hover:text-white hover:border-[#1E6F5C] transition-colors"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Area */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Input */}
          <div className="mb-8">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
                  placeholder="Ask a question..."
                  className="w-full px-4 py-4 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C] focus:border-transparent text-lg"
                />
                <button
                  onClick={handleSendQuestion}
                  disabled={isLoading || !question.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1E6F5C] text-white rounded-lg flex items-center justify-center hover:opacity-90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Answer */}
          {answer && (
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1E6F5C] flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 whitespace-pre-line">{answer.answer}</p>
                  {answer.relatedLinks && answer.relatedLinks.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <p className="text-sm font-medium text-slate-600 mb-3">Related links:</p>
                      <div className="flex flex-wrap gap-3">
                        {answer.relatedLinks.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#1E6F5C] hover:text-[#1E6F5C] transition-colors"
                          >
                            {link.label} <ExternalLink className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && !answer && (
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1E6F5C]/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-[#1E6F5C]" />
                </div>
                <div className="flex-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-[#1E6F5C]" />
              <h2 className="text-xl font-bold text-slate-900">Business Hours</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">M-F</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{businessHours.weekdays}</p>
                  <p className="text-sm text-slate-500">Weekdays</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 font-bold">SAT</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{businessHours.weekend}</p>
                  <p className="text-sm text-slate-500">Saturday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
