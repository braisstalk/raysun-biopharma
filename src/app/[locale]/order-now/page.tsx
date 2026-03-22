'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, FileText, CheckCircle, CreditCard, Truck, Package, ArrowRight, Search, Clock, Shield, Users, Mail, Phone, ChevronRight } from 'lucide-react'
import { getOrderContent } from '@/lib/content'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'

const icons: Record<string, React.ElementType> = {
  quick: ShoppingCart,
  bulk: Package,
  rfq: FileText,
}

const steps = [
  { id: 1, title: 'Select', icon: ShoppingCart },
  { id: 2, title: 'Quote', icon: FileText },
  { id: 3, title: 'Confirm', icon: CheckCircle },
]


export default function OrderNow() {
  const { t } = useTranslation()
  const content = getOrderContent()
  const { hero, orderTypes, paymentMethods, trackingPlaceholder, helpText } = content
  
  const [currentStep, setCurrentStep] = useState(1)
  const [orderType, setOrderType] = useState('')
  const [submitError, setSubmitError] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    products: '',
    quantity: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOrderTypeSelect = (type: string) => {
    setOrderType(type)
    setCurrentStep(2)
  }

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          country: formData.country,
          message: `Order Type: ${orderType}\n\nProducts:\n${formData.products}\n\nQuantity: ${formData.quantity || 'N/A'}\n\nNote:\n${formData.message || 'None'}`,
          formSource: 'order',
          inquiryType: orderType === 'bulk' ? 'Bulk / B2B Order' : orderType === 'rfq' ? 'Request Quotation' : 'Quick Order',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setCurrentStep(3)
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    }
  }

  return (
    <>
      {/* Hero */}
      <StrapiHeroCarousel
        page="order-now"
        badge="ORDER CENTER"
        badgeColor="text-emerald-400"
        heading={hero.title}
        description={hero.subtitle}
      />

      {/* Progress Steps */}
      <section className="py-8 bg-slate-50 border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${isActive || isCompleted ? 'text-[#1E6F5C]' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-[#1E6F5C] text-white' :
                      isCompleted ? 'bg-[#1E6F5C]/20 text-[#1E6F5C]' :
                      'bg-slate-200'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className="font-medium hidden sm:block">{step.title}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-12 sm:w-24 h-0.5 mx-2 ${isCompleted ? 'bg-[#1E6F5C]' : 'bg-slate-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Step 1: Select Order Type */}
      {currentStep === 1 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How would you like to order?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {orderTypes.map((type) => {
                const Icon = icons[type.id] || ShoppingCart
                return (
                  <button
                    key={type.id}
                    onClick={() => handleOrderTypeSelect(type.id)}
                    className="bg-slate-50 rounded-2xl p-6 text-left hover:shadow-lg transition-shadow group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#1E6F5C]/10 flex items-center justify-center mb-4 group-hover:bg-[#1E6F5C] transition-colors">
                      <Icon className="w-6 h-6 text-[#1E6F5C] group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{type.title}</h3>
                    <p className="text-slate-600 text-sm">{type.description}</p>
                    <div className="mt-4 flex items-center text-[#1E6F5C] font-medium text-sm">
                      Get Started <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Quote Form */}
      {currentStep === 2 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Request a Quote</h2>
            <form onSubmit={handleSubmitQuote} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Country *</label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                  >
                    <option value="">Select Country</option>
                    <option value="laos">Laos</option>
                    <option value="thailand">Thailand</option>
                    <option value="vietnam">Vietnam</option>
                    <option value="cambodia">Cambodia</option>
                    <option value="myanmar">Myanmar</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="philippines">Philippines</option>
                    <option value="singapore">Singapore</option>
                    <option value="uae">UAE</option>
                    <option value="saudi">Saudi Arabia</option>
                    <option value="egypt">Egypt</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="kenya">Kenya</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Products Interested *</label>
                <textarea
                  name="products"
                  required
                  rows={3}
                  placeholder="List the products you're interested in..."
                  value={formData.products}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="e.g., 10,000 units"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                  <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-600">
                    Bank Transfer (TT) - Available
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Message</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Any specific requirements or questions..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                />
              </div>
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                  Something went wrong. Please try again or email us at{' '}
                  <a href="mailto:info@raysunpharma.com" className="underline font-medium">info@raysunpharma.com</a>
                </div>
              )}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#1E6F5C] text-white rounded-xl font-medium hover:opacity-90"
                >
                  Submit Quote Request
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Step 3: Confirmation */}
      {currentStep === 3 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Quote Request Submitted!</h2>
            <p className="text-slate-600 mb-8">
              Thank you for your inquiry. Our sales team will review your request and respond within 24-48 hours.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 text-left mb-8">
              <h3 className="font-semibold text-slate-900 mb-4">What happens next?</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1E6F5C]/20 text-[#1E6F5C] flex items-center justify-center shrink-0 text-xs">1</span>
                  Our team will review your requirements
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1E6F5C]/20 text-[#1E6F5C] flex items-center justify-center shrink-0 text-xs">2</span>
                  We'll prepare a customized quote with pricing
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1E6F5C]/20 text-[#1E6F5C] flex items-center justify-center shrink-0 text-xs">3</span>
                  You'll receive an email with the quote details
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50">
                Continue Browsing
              </Link>
              <Link href="/" className="px-6 py-3 bg-[#1E6F5C] text-white rounded-xl font-medium hover:opacity-90">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Payment Methods */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Accepted Payment Methods</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.id} className={`bg-white rounded-xl p-6 ${method.status === 'coming' ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-6 h-6 text-[#1E6F5C]" />
                  <h3 className="font-semibold text-slate-900">{method.name}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  {method.status === 'available' ? 'Ready to use' : `Coming ${method.status}`}
                </p>
                {method.status === 'available' && (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Available</span>
                )}
                {method.status === 'coming' && (
                  <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Coming Soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
            <Truck className="w-10 h-10 mb-4" />
            <h2 className="text-xl font-bold mb-2">Track Your Order</h2>
            <p className="text-slate-300 mb-4">Enter your order number to check the status of your order.</p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder={trackingPlaceholder}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
              />
              <button className="px-6 py-3 bg-[#1E6F5C] rounded-lg font-medium hover:opacity-90">
                Track
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="py-12 md:py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
          <p className="mb-6 max-w-xl mx-auto">{helpText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50">
              Contact Sales Team
            </Link>
            <Link href="/products" className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
