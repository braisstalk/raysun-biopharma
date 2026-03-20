'use client'
import Link from 'next/link'
import { FileText, Download, File, Video } from 'lucide-react'
import { getResourcesContent } from '@/lib/content'
import { useTranslation } from '@/i18n/useTranslation'

const icons: Record<string, React.ElementType> = {
  document: FileText,
  video: Video,
  link: File,
}

function generateSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}


export default function Resources() {
  const { t } = useTranslation()
  const content = getResourcesContent()
  const { hero, items } = content

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2">RESOURCES</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((res) => {
              const Icon = icons[res.type] || File
              const slug = generateSlug(res.title)
              return (
                <Link key={res.id} href={`/resources/${slug}`} className="bg-slate-50 rounded-xl p-6 text-left hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-10 h-10 text-blue-600" />
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase">{res.type}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">{res.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-slate-500">{res.fileSize || res.category}</span>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="mb-6">Contact us for specific documents or additional information.</p>
          <Link href="/contact" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
