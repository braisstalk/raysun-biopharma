'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bot, ShoppingCart, MessageCircle, X } from 'lucide-react'
import { useRfqCart } from '@/contexts/RfqCartContext'
import AiChatPanel from './AiChatPanel'

export default function FloatingActions() {
  const { itemCount } = useRfqCart()
  const [contactOpen, setContactOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <>
      <div className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 sm:gap-3">
        {/* AI Assistant - opens chat panel */}
        <button
          onClick={() => { setAiOpen(!aiOpen); setContactOpen(false) }}
          className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="AI Assistant"
        >
          {aiOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            AI Assistant
          </span>
        </button>

        {/* Order Now - links to order page */}
        <Link
          href="/order-now"
          className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="Order Now"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            Order Now {itemCount > 0 ? `(${itemCount})` : ''}
          </span>
        </Link>

        {/* Contact Us */}
        <button
          onClick={() => { setContactOpen(!contactOpen); setAiOpen(false) }}
          className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="Contact Us"
        >
          {contactOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            Contact Us
          </span>
        </button>
      </div>

      {/* AI Chat Panel */}
      <AiChatPanel open={aiOpen} onClose={() => setAiOpen(false)} />

      {/* Contact Us QR Code Popup */}
      {contactOpen && (
        <>
          <div className="fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
          <div className="fixed z-[60] bg-white rounded-2xl shadow-2xl p-6 w-[300px] max-w-[calc(100vw-2rem)] right-4 sm:right-20 top-1/2 -translate-y-1/2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Contact Us</h3>
              <button onClick={() => setContactOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700 mb-2">WhatsApp Business</p>
                <div className="w-36 h-36 mx-auto bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center text-slate-400">
                    <MessageCircle className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-xs">QR Code</p>
                    <p className="text-[10px]">Upload via CMS</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700 mb-2">WeCom / Enterprise WeChat</p>
                <div className="w-36 h-36 mx-auto bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center text-slate-400">
                    <MessageCircle className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-xs">QR Code</p>
                    <p className="text-[10px]">Upload via CMS</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 text-center mt-4">Scan to connect with our team</p>
          </div>
        </>
      )}
    </>
  )
}
