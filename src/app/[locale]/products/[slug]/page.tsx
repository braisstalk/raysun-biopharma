'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, ShoppingCart, Mail, FileText, ArrowRight, Check, Loader2 } from 'lucide-react'
import { useRfqCart } from '@/contexts/RfqCartContext'
import { useProductBySlug, useRelatedProducts, type MappedProduct } from '@/lib/strapi'
import { productsPageConfig } from '@/config/products'
import { useTranslation } from '@/i18n/useTranslation'

// Generate slug from product name (for fallback)
function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// Get product by slug from local config
function getLocalProductBySlug(slug: string) {
  return productsPageConfig.products.find(p => generateSlug(p.name) === slug || p.slug === slug)
}

// Get category name by id
function getCategoryName(id: string) {
  const cat = productsPageConfig.categories.find(c => c.id === id)
  return cat?.name || id
}

// Get related products from local config
function getLocalRelatedProducts(product: typeof productsPageConfig.products[0], limit = 4) {
  const allProducts = productsPageConfig.products.filter(p => p.id !== product.id)
  
  // Score each product by relevance
  const scored = allProducts.map(p => {
    let score = 0
    if (p.category === product.category) score += 10
    if (p.dosageForm === product.dosageForm) score += 5
    if (p.type === product.type) score += 2
    return { product: p, score }
  })
  
  // Sort by score and take top results
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map(s => s.product)
}

// Map local product to MappedProduct format
function mapLocalProduct(product: typeof productsPageConfig.products[0]): MappedProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug || generateSlug(product.name),
    category: product.category,
    dosageForm: product.dosageForm,
    description: product.description,
    indication: product.indication || '',
    tags: product.tags || [],
    type: product.type || 'generic',
    strength: product.name.match(/(\d+mg|\d+g|\d+%)/)?.[0] || null,
    packaging: null,
    shelfLife: null,
    storageConditions: null,
    images: [],
    documents: { dataSheet: null, coa: null },
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { t } = useTranslation()

  // Try to get product from CMS
  const { product: cmsProduct, loading: cmsLoading, error: cmsError } = useProductBySlug(slug)
  
  // Get related products from CMS if available
  const { related: cmsRelated, loading: relatedLoading } = useRelatedProducts(cmsProduct, 4)

  // RFQ Cart
  const { addItem } = useRfqCart()

  // Fallback to local config
  const localProduct = !cmsProduct ? getLocalProductBySlug(slug) : null
  const localRelated = localProduct ? getLocalRelatedProducts(localProduct, 4) : []

  // Determine which product to use
  const product = cmsProduct || (localProduct ? mapLocalProduct(localProduct) : null)
  const relatedProducts = cmsProduct ? cmsRelated : localRelated.map(mapLocalProduct)
  const isLoading = cmsLoading
  const useCMS = !!cmsProduct && !cmsError

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#1E6F5C] mx-auto mb-4" />
          <p className="text-slate-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-700 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const categoryName = getCategoryName(product.category)
  const hue = (parseInt(product.id.replace(/\D/g, ''), 10) * 37) % 360

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-slate-700">Home</Link>
            <span className="text-slate-400">/</span>
            <Link href="/products" className="text-slate-500 hover:text-slate-700">Products</Link>
            <span className="text-slate-400">/</span>
            <Link href={`/products?category=${product.category}`} className="text-slate-500 hover:text-slate-700">{categoryName}</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Product Image */}
            <div className="aspect-square max-w-md mx-auto lg:max-w-none w-full">
              <div 
                className="w-full h-full rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(145deg, hsl(${hue}, 18%, 97%) 0%, hsl(${hue}, 12%, 92%) 100%)`,
                }}
              >
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    className="max-h-64 max-w-64 object-contain rounded-xl shadow-lg"
                  />
                ) : (
                  <div 
                    className="w-32 h-32 rounded-2xl shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, hsl(${hue}, 25%, 85%) 0%, hsl(${hue}, 20%, 75%) 100%)`,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {categoryName}
                  </span>
                  {product.type === 'brand' && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      Brand
                    </span>
                  )}
                  {!useCMS && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      Local Data
                    </span>
                  )}
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">{product.name}</h1>
                <p className="text-lg text-slate-500 mt-1">{product.dosageForm}</p>
              </div>

              <p className="text-slate-600 leading-relaxed">{product.description}</p>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Add to RFQ */}
              {product && (
                <button
                  onClick={() => addItem({ productId: product.id, productName: product.name, slug: product.slug })}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to RFQ Cart
                </button>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/verify"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-center"
                >
                  <Shield className="w-5 h-5" />
                  Verify
                </Link>
                <Link
                  href="/order-now"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors text-center"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Order
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-center"
                >
                  <Mail className="w-5 h-5" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Indications */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Indications & Usage</h2>
              <ul className="space-y-2">
                {product.indication ? (
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {product.indication}
                  </li>
                ) : (
                  <li className="text-slate-500 italic">Indications information available upon request</li>
                )}
              </ul>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {['Quality assured manufacturing', 'Internationally compliant production', 'Professional presentation', 'Reliable supply chain'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Documents & Resources</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Product Information Sheet</p>
                      <p className="text-xs text-slate-400">Comprehensive product overview</p>
                    </div>
                  </div>
                  {product.documents?.dataSheet ? (
                    <a 
                      href={product.documents.dataSheet}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Download
                    </a>
                  ) : (
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Request</button>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Quality Documentation</p>
                      <p className="text-xs text-slate-400">COA & manufacturing details</p>
                    </div>
                  </div>
                  {product.documents?.coa ? (
                    <a 
                      href={product.documents.coa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Download
                    </a>
                  ) : (
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Request</button>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Product Leaflet</p>
                      <p className="text-xs text-slate-400">Usage & safety information</p>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Request</button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Technical Dossier</p>
                      <p className="text-xs text-slate-400">Restricted access</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400">Contact</span>
                </div>
              </div>
            </div>

            {/* Compliance Disclaimer */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
              <h2 className="text-lg font-bold text-amber-900 mb-3">Regulatory Notice</h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                This product information is provided for reference purposes only. 
                Product availability, registration status, and specifications may vary by country. 
                Please contact us for specific regulatory information in your target market. 
                All products are manufactured in accordance with international GMP standards.
              </p>
            </div>
          </div>

          {/* Sidebar - Specifications */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Specifications</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dosage Form</dt>
                  <dd className="text-slate-700 mt-1">{product.dosageForm}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Strength</dt>
                  <dd className="text-slate-700 mt-1">{product.strength || 'See packaging'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Route of Administration</dt>
                  <dd className="text-slate-700 mt-1">{product.type === 'brand' ? 'Oral' : 'As prescribed'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pack Size</dt>
                  <dd className="text-slate-700 mt-1">{product.packaging || 'Varies by region'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Storage</dt>
                  <dd className="text-slate-700 mt-1">{product.storageConditions || 'Store as per label instructions'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shelf Life</dt>
                  <dd className="text-slate-700 mt-1">{product.shelfLife || 'As indicated on packaging'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Regulatory Status</dt>
                  <dd className="text-slate-700 mt-1">Subject to registration</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Regions</dt>
                  <dd className="text-slate-700 mt-1">Subject to local requirements</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Related Products</h2>
            {relatedLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#1E6F5C]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((related) => {
                  const relHue = (parseInt(related.id.replace(/\D/g, ''), 10) * 37) % 360
                  return (
                    <Link
                      key={related.id}
                      href={`/products/${related.slug}`}
                      className="group block bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-200"
                    >
                      <div
                        className="aspect-[4/3] flex items-center justify-center"
                        style={{
                          background: `linear-gradient(145deg, hsl(${relHue}, 18%, 97%) 0%, hsl(${relHue}, 12%, 92%) 100%)`,
                        }}
                      >
                        {related.images && related.images.length > 0 ? (
                          <img 
                            src={related.images[0].thumbnail || related.images[0].url}
                            alt={related.images[0].alt}
                            className="max-h-24 max-w-24 object-contain rounded-lg"
                          />
                        ) : (
                          <div
                            className="w-16 h-16 rounded-xl opacity-30"
                            style={{
                              background: `linear-gradient(135deg, hsl(${relHue}, 25%, 85%) 0%, hsl(${relHue}, 20%, 75%) 100%)`,
                            }}
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {related.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Back to Products */}
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/products" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}
