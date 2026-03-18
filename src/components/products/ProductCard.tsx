import Link from 'next/link'
import { ArrowRight, Pill } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all duration-200">
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <Pill className="w-8 h-8 text-slate-300 mx-auto mb-1" />
          <p className="text-[10px] text-slate-300">Product Image</p>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
          {product.dosageForm}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Action */}
        <Link
          href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:gap-2 transition-all"
        >
          View Details <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
