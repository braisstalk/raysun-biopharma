'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Trash2, Minus, Plus, ShoppingCart, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useRfqCart } from '@/contexts/RfqCartContext'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function RfqPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, itemCount, removeItem, updateQuantity, clearCart } = useRfqCart()
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', country: '', message: '' })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return

    setSubmitStatus('submitting')

    const productLines = items.map(i => `- ${i.productName} × ${i.quantity}`).join('\n')
    const message = `RFQ Inquiry\n\nProducts:\n${productLines}\n\nTotal items: ${itemCount}\n\n${form.message ? `Additional notes:\n${form.message}` : ''}`

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          country: form.country,
          message,
          formSource: 'rfq',
          inquiryType: 'RFQ Inquiry',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitStatus('success')
        clearCart()
        setForm({ name: '', email: '', company: '', country: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-[75] w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">RFQ Cart</h2>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">{itemCount}</span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {submitStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">RFQ Submitted!</h3>
              <p className="text-slate-600 mb-6">Our sales team will review your inquiry and respond within 24-48 hours.</p>
              <button onClick={() => { setSubmitStatus('idle'); setShowForm(false); onClose() }} className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                Close
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingCart className="w-16 h-16 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Your RFQ cart is empty</h3>
              <p className="text-slate-500 mb-6">Browse our products and add items to request a quote.</p>
              <Link href="/products" onClick={onClose} className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                Browse Products
              </Link>
            </div>
          ) : !showForm ? (
            <div className="p-5">
              {/* Product List */}
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.productId} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.slug}`} onClick={onClose} className="text-sm font-medium text-slate-900 hover:text-emerald-600 line-clamp-1">
                        {item.productName}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.productId)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit RFQ ({itemCount} items)
                </button>
                <button onClick={clearCart} className="w-full py-2 text-sm text-slate-500 hover:text-red-500">
                  Clear All
                </button>
              </div>
            </div>
          ) : (
            /* RFQ Submit Form */
            <div className="p-5">
              <button onClick={() => setShowForm(false)} className="text-sm text-slate-500 hover:text-slate-700 mb-4">
                ← Back to cart
              </button>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Submit RFQ</h3>
              <p className="text-sm text-slate-500 mb-4">{itemCount} product(s) in your inquiry</p>

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" /> Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                  <input type="text" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                  <input type="text" value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
                  <textarea rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none" />
                </div>
                <button type="submit" disabled={submitStatus === 'submitting'}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitStatus === 'submitting' ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit RFQ</>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
