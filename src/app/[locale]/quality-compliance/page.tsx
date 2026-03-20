'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Award } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'

export default function QualityCompliance() {
  const { t } = useTranslation()

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2">QUALITY & COMPLIANCE</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quality is Our Foundation</h1>
          <p className="text-xl text-slate-200 max-w-3xl">
            Committed to delivering safe, effective, high-quality pharmaceutical products.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Our Quality Standards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl">
              <Award className="w-10 h-10 text-[#1E6F5C] mb-4" />
              <h3 className="font-semibold mb-2">WHO GMP</h3>
              <p className="text-slate-600 text-sm">World Health Organization standards</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl">
              <Shield className="w-10 h-10 text-[#1E6F5C] mb-4" />
              <h3 className="font-semibold mb-2">Quality Assurance</h3>
              <p className="text-slate-600 text-sm">Systematic oversight of quality</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl">
              <ArrowRight className="w-10 h-10 text-[#1E6F5C] mb-4" />
              <h3 className="font-semibold mb-2">Continuous Improvement</h3>
              <p className="text-slate-600 text-sm">Ongoing quality enhancement</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
