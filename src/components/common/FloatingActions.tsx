'use client'

import { useState } from 'react'
import { Bot, ShoppingCart, MessageCircle, X } from 'lucide-react'
import { useRfqCart } from '@/contexts/RfqCartContext'
import { useTranslation } from '@/i18n/useTranslation'

export default function FloatingActions() {
  const { t } = useTranslation()
  const { itemCount } = useRfqCart()
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      {/* Desktop: right side vertical center */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
        {/* AI Assistant */}
        <a
          href="/ai-assistant"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="AI Assistant"
        >
          <Bot className="w-5 h-5" />
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            AI Assistant
          </span>
        </a>

        {/* RFQ Cart */}
        <a
          href="/order-now"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="RFQ Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            RFQ Cart {itemCount > 0 ? `(${itemCount})` : ''}
          </span>
        </a>

        {/* Contact Us */}
        <button
          onClick={() => setContactOpen(!contactOpen)}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="Contact Us"
        >
          {contactOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Contact Us
          </span>
        </button>
      </div>

      {/* Mobile: bottom horizontal bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 safe-area-pb">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          <a
            href="/ai-assistant"
            className="flex flex-col items-center gap-0.5 text-blue-600 py-1"
          >
            <Bot className="w-5 h-5" />
            <span className="text-[10px] font-medium">AI</span>
          </a>

          <a
            href="/order-now"
            className="relative flex flex-col items-center gap-0.5 text-emerald-600 py-1"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 left-1/2 ml-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
            <span className="text-[10px] font-medium">RFQ</span>
          </a>

          <button
            onClick={() => setContactOpen(!contactOpen)}
            className="flex flex-col items-center gap-0.5 text-violet-600 py-1"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium">Contact</span>
          </button>
        </div>
      </div>

      {/* Contact Us QR Code Popup */}
      {contactOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm"
            onClick={() => setContactOpen(false)}
          />
          {/* Panel */}
          <div className="fixed z-[60] bg-white rounded-2xl shadow-2xl p-6 w-[320px] max-w-[calc(100vw-2rem)] right-4 lg:right-20 top-1/2 -translate-y-1/2 lg:top-auto lg:translate-y-0 lg:bottom-auto" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Contact Us</h3>
              <button
                onClick={() => setContactOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="space-y-5">
              {/* WhatsApp QR */}
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700 mb-2">WhatsApp Business</p>
                <div className="w-40 h-40 mx-auto bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center text-slate-400">
                    <MessageCircle className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-xs">QR Code</p>
                    <p className="text-[10px]">Upload via CMS</p>
                  </div>
                </div>
              </div>

              {/* WeCom QR */}
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700 mb-2">WeCom / Enterprise WeChat</p>
                <div className="w-40 h-40 mx-auto bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center text-slate-400">
                    <MessageCircle className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-xs">QR Code</p>
                    <p className="text-[10px]">Upload via CMS</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center mt-4">
              Scan to connect with our team
            </p>
          </div>
        </>
      )}

      {/* Mobile bottom spacing to prevent content being hidden behind bottom bar */}
      <div className="lg:hidden h-16" />
    </>
  )
}
