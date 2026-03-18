'use client'

import { Search, X } from 'lucide-react'

interface ProductsSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export default function ProductsSearchBar({ value, onChange, placeholder }: ProductsSearchBarProps) {
  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 border-0 shadow-xl shadow-black/15 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
