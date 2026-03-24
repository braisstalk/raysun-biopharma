'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Shield, Search, AlertTriangle, CheckCircle, FileCheck, UserCheck, Package, Phone, Mail, ExternalLink } from 'lucide-react'
import { getVerifyContent } from '@/lib/content'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import AutoText from '@/components/common/AutoText'

const icons: Record<string, React.ElementType> = {
  product: Package,
  certificate: FileCheck,
  distributor: UserCheck,
}

export default function Verify() {
  const content = getVerifyContent()
  const { t } = useTranslation()
  const { hero, types, mockResults, helpSection, reportSection } = content
  
  // Build mock results map for verification logic
  const mockResultsMap: Record<string, { status: 'success' | 'warning' | 'error'; title: string; message: string; details?: string[]; nextSteps?: { label: string; href: string }[] }> = {}
  mockResults.forEach(r => {
    mockResultsMap[r.code] = {
      status: r.status,
      title: r.status === 'success' ? 'Verified Authentic' : r.status === 'warning' ? 'Expired Product' : 'Not Found',
      message: r.message,
      details: r.details ? r.details.split(' | ') : [],
      nextSteps: r.status === 'success' ? [
        { label: 'View Product Details', href: '/products' },
        { label: 'Contact Sales', href: '/contact' },
      ] : [
        { label: 'Contact Support', href: '/contact' },
        { label: 'Report Concern', href: '/contact' },
      ]
    }
  })
  
  const [activeTab, setActiveTab] = useState('product')
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<typeof mockResultsMap[string] | null>(null)

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchValue.trim()) return
    
    setLoading(true)
    setResult(null)
    
    setTimeout(() => {
      const upper = searchValue.toUpperCase()
      const mockResult = mockResultsMap[upper]
      
      if (mockResult) {
        setResult(mockResult)
      } else if (upper.includes('RS-2025') || upper.includes('RS-')) {
        setResult({
          status: 'error',
          title: 'Not Found',
          message: 'The entered information does not match our records.',
          details: ['Please verify the batch number is correct', 'Check for any typing errors', 'Ensure you have the full batch number'],
          nextSteps: [
            { label: 'Contact Support', href: '/contact' },
            { label: 'Report Suspicious Product', href: '/contact' },
          ]
        })
      } else {
        setResult({
          status: 'error',
          title: 'Invalid Format',
          message: 'Please enter a valid batch number starting with RS-.',
          details: [],
          nextSteps: []
        })
      }
      setLoading(false)
    }, 1200)
  }

  const handleReset = () => {
    setSearchValue('')
    setResult(null)
  }

  const currentType = types.find(t => t.id === activeTab)

  return (
    <>
      {/* Hero */}
      <StrapiHeroCarousel
        page="verify"
        badge="VERIFICATION CENTER"
        badgeColor="text-emerald-400"
        heading={hero.title}
        description={hero.subtitle}
      />

      {/* Verification Types */}
      <section className="py-8 md:py-12 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {types.map((type) => {
              const Icon = icons[type.id] || Package
              return (
                <button
                  key={type.id}
                  onClick={() => { setActiveTab(type.id); handleReset() }}
                  className={`flex items-center gap-3 p-3 md:p-4 rounded-xl transition-all ${
                    activeTab === type.id
                      ? 'bg-white shadow-md border-2 border-[#1E6F5C]'
                      : 'bg-white/50 hover:bg-white hover:shadow-sm border border-slate-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeTab === type.id ? 'bg-[#1E6F5C] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold text-sm md:text-base ${activeTab === type.id ? 'text-[#1E6F5C]' : 'text-slate-900'}`}><AutoText>{type.label}</AutoText></p>
                    <p className="text-xs text-slate-500 hidden sm:block"><AutoText>Batch number verification</AutoText></p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="verify-input" className="block text-sm font-medium text-slate-700 mb-2">
                <AutoText>Enter {currentType?.label} Code</AutoText>
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="verify-input"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={currentType?.placeholder || 'Enter batch number'}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E6F5C] focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-[#1E6F5C] text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <AutoText>{loading ? 'Verifying...' : 'Verify'}</AutoText>
                </button>
              </div>
            </div>
          </form>

          {/* Sample Codes */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-600 mb-2"><AutoText>Sample codes for testing:</AutoText></p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSearchValue('RS-2025-001234')} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-100">RS-2025-001234</button>
              <button onClick={() => setSearchValue('RS-2025-005678')} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-100">RS-2025-005678</button>
              <button onClick={() => setSearchValue('RS-2024')} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-100">RS-2024</button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className={`mt-8 p-6 rounded-2xl ${
              result.status === 'success' ? 'bg-green-50 border border-green-200' :
              result.status === 'warning' ? 'bg-amber-50 border border-amber-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start gap-4">
                {result.status === 'success' && <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />}
                {result.status === 'warning' && <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />}
                {result.status === 'error' && <AlertTriangle className="w-8 h-8 text-red-600 shrink-0" />}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${
                    result.status === 'success' ? 'text-green-800' :
                    result.status === 'warning' ? 'text-amber-800' :
                    'text-red-800'
                  }`}><AutoText>{result.title}</AutoText></h3>
                  <p className="mt-2 text-slate-700"><AutoText>{result.message}</AutoText></p>
                  {result.details && result.details.length > 0 && (
                    <ul className="mt-4 space-y-1">
                      {result.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <AutoText>{detail}</AutoText>
                        </li>
                      ))}
                    </ul>
                  )}
                  {result.nextSteps && result.nextSteps.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.nextSteps.map((step, idx) => (
                        <Link
                          key={idx}
                          href={step.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#1E6F5C] hover:underline"
                        >
                          <AutoText>{step.label}</AutoText> <ExternalLink className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <Phone className="w-10 h-10 text-[#1E6F5C] mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2"><AutoText>{helpSection.title}</AutoText></h3>
              <p className="text-slate-600 mb-4"><AutoText>{helpSection.description}</AutoText></p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:underline">
                <AutoText>Contact Support</AutoText> <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <Shield className="w-10 h-10 text-[#1E6F5C] mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2"><AutoText>{reportSection.title}</AutoText></h3>
              <p className="text-slate-600 mb-4"><AutoText>{reportSection.description}</AutoText></p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:underline">
                <AutoText>Report Counterfeit</AutoText> <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
