'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, FileText, Video, Link as LinkIcon, Download, Mail, Eye, Lock, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { getResourceBySlug, getRelatedResources } from '@/lib/content'
import type { ContentResourceDetail, ResourceStatus } from '@/lib/content/types/content-resources'

const statusConfig: Record<ResourceStatus, { label: string; description: string; color: string; icon: React.ElementType }> = {
  public: { 
    label: 'Public', 
    description: 'Available for direct download', 
    color: 'bg-green-100 text-green-700',
    icon: CheckCircle
  },
  request: { 
    label: 'Request Access', 
    description: 'Submit a request to access this resource', 
    color: 'bg-amber-100 text-amber-700',
    icon: Mail
  },
  restricted: { 
    label: 'Restricted', 
    description: 'Authorized personnel only', 
    color: 'bg-red-100 text-red-700',
    icon: Lock
  },
  pending: { 
    label: 'Pending', 
    description: 'Under review', 
    color: 'bg-slate-100 text-slate-700',
    icon: Clock
  }
}

const typeIcons: Record<string, React.ElementType> = {
  document: FileText,
  video: Video,
  link: LinkIcon
}

export default function ResourceDetail() {
  const params = useParams()
  const slug = params?.slug as string
  
  const resource = getResourceBySlug(slug)
  const relatedResources = resource ? getRelatedResources(resource.id) : []

  const [requestStatus, setRequestStatus] = useState<'idle' | 'requested'>('idle')

  const handleRequestAccess = () => {
    setRequestStatus('requested')
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Resource Not Found</h1>
          <p className="text-slate-600 mb-6">The resource you're looking for doesn't exist.</p>
          <Link href="/resources" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
        </div>
      </div>
    )
  }

  const status = statusConfig[resource.status]
  const StatusIcon = status.icon
  const TypeIcon = typeIcons[resource.type] || FileText

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-[#1E6F5C]">Home</Link>
            <span className="text-slate-400">/</span>
            <Link href="/resources" className="text-slate-500 hover:text-[#1E6F5C]">Resources</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 truncate max-w-[200px]">{resource.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#1E6F5C] text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/10 px-3 py-1 rounded-full text-sm">{resource.category}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${status.color}`}>
              {status.label}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{resource.title}</h1>
          <p className="text-lg text-slate-300 max-w-2xl">{resource.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Document Preview Placeholder */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl h-64 md:h-80 flex items-center justify-center mb-8">
                <div className="text-center text-slate-400">
                  <TypeIcon className="w-16 h-16 mx-auto mb-2" />
                  <p>Document Preview</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
                <p className="text-slate-700">{resource.description}</p>
              </div>

              {/* Back Link */}
              <div className="pt-8 border-t">
                <Link href="/resources" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
                  <ArrowLeft className="w-4 h-4" /> Back to Resources
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Details Card */}
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-slate-900 mb-4">Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Type</span>
                    <span className="text-sm font-medium text-slate-900 capitalize">{resource.type}</span>
                  </div>
                  {resource.fileSize && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">File Size</span>
                      <span className="text-sm font-medium text-slate-900">{resource.fileSize}</span>
                    </div>
                  )}
                  {resource.updatedDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Updated</span>
                      <span className="text-sm font-medium text-slate-900">{resource.updatedDate}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Status</span>
                    <span className={`text-sm font-medium ${status.color.split(' ')[1]}`}>{status.label}</span>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Actions</h3>
                
                {resource.status === 'public' && (
                  <button className="w-full bg-[#1E6F5C] text-white py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2 mb-3">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                )}
                
                {resource.status === 'request' && (
                  <>
                    {requestStatus === 'requested' ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-800">Request Submitted</p>
                        <p className="text-xs text-green-600">We'll review and respond within 24-48 hours.</p>
                      </div>
                    ) : (
                      <button 
                        onClick={handleRequestAccess}
                        className="w-full bg-[#1E6F5C] text-white py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2 mb-3"
                      >
                        <Mail className="w-4 h-4" /> Request Access
                      </button>
                    )}
                  </>
                )}
                
                {resource.status === 'restricted' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <Lock className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-amber-800">Restricted Access</p>
                    <p className="text-xs text-amber-600 mb-3">Contact our team for authorization.</p>
                    <Link href="/contact" className="text-sm text-[#1E6F5C] hover:underline">
                      Contact Sales
                    </Link>
                  </div>
                )}
                
                <button className="w-full border border-slate-200 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-100 flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" /> Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedResources.map((related) => {
                const RelatedIcon = typeIcons[related.type] || FileText
                const relatedStatus = statusConfig[related.status]
                return (
                  <Link 
                    key={related.id} 
                    href={`/resources/${related.slug}`}
                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <RelatedIcon className="w-8 h-8 text-[#1E6F5C]" />
                      <span className={`text-xs px-2 py-1 rounded ${relatedStatus.color.split(' ')[0]}`}>
                        {relatedStatus.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#1E6F5C] mb-2">{related.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{related.description}</p>
                    <div className="flex items-center text-xs text-[#1E6F5C] font-medium">
                      View <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
