'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook, Youtube, ArrowUpRight } from 'lucide-react'
import { FooterConfig } from '@/types/footer'
import { useTranslation } from '@/i18n/useTranslation'

interface FooterProps {
  config: FooterConfig
}

export default function Footer({ config }: FooterProps) {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Social */}
          <div className="lg:col-span-1">
            <div className="text-xl font-bold text-white mb-4">
              <span className="text-blue-400">Raysun</span>
              <span className="text-slate-300">Biopharma</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {config.brand.description}
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a 
                href={config.brand.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={config.brand.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={config.brand.socials.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {config.columns[0]?.links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.common.products}</h3>
            <ul className="space-y-3">
              {config.columns[1]?.links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.common.contact}</h3>
            <ul className="space-y-3">
              <li>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="w-4 h-4" />
                  info@raysunpharma.com
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone className="w-4 h-4" />
                  Available upon request
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4" />
                  Vientiane, Laos
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} Raysun Biopharma. {t.footer.allRightsReserved}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-400 transition-colors">
                {t.footer.privacyPolicy}
              </Link>
              <Link href="/terms" className="text-sm text-slate-500 hover:text-blue-400 transition-colors">
                {t.footer.termsOfService}
              </Link>
              <Link href="/sitemap" className="text-sm text-slate-500 hover:text-blue-400 transition-colors">
                {t.footer.sitemap}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
