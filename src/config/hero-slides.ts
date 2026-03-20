// Hero Carousel configuration for all pages
// In Milestone 2, this will be replaced by CMS data from Strapi
import type { HeroSlide } from '@/components/common/HeroCarousel'

// Each page gets 3 default slides (as per requirements)
// All using gradient type for now - will switch to image/video when assets are provided

export const heroSlides: Record<string, HeroSlide[]> = {
  home: [
    {
      id: 'home-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Raysun Biopharma',
      title: 'Your Trusted Pharmaceutical Manufacturing Partner',
      subtitle: 'Delivering high-quality, affordable medicines to communities worldwide from our GMP-certified facility.',
      primaryCta: { label: 'Explore Products', href: '/products' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    {
      id: 'home-2',
      type: 'gradient',
      gradient: 'from-blue-900 via-blue-800 to-slate-900',
      label: 'GMP Certified',
      title: 'World-Class Manufacturing Excellence',
      subtitle: '12,000 m² facility with 6 production lines covering all major pharmaceutical dosage forms.',
      primaryCta: { label: 'Our Facility', href: '/manufacturing' },
      secondaryCta: { label: 'Quality Standards', href: '/quality-compliance' },
    },
    {
      id: 'home-3',
      type: 'gradient',
      gradient: 'from-teal-900 via-teal-800 to-slate-900',
      label: 'Global Reach',
      title: 'Serving Healthcare Across Continents',
      subtitle: 'Strategic partnerships and distribution networks spanning Southeast Asia, the Middle East, and Africa.',
      primaryCta: { label: 'About Us', href: '/about' },
      secondaryCta: { label: 'Our Products', href: '/products' },
    },
  ],
  about: [
    {
      id: 'about-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'About Us',
      title: 'About Raysun Biopharma',
      subtitle: 'Your trusted pharmaceutical manufacturing partner committed to delivering high-quality, affordable medicines to communities worldwide.',
      primaryCta: { label: 'Our Manufacturing', href: '/manufacturing' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
  ],
  manufacturing: [
    {
      id: 'mfg-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Manufacturing',
      title: 'Pharmaceutical Manufacturing Excellence',
      subtitle: 'Our WHO GMP-certified facility is equipped with advanced technology to produce high-quality pharmaceutical products for regulated markets worldwide.',
      primaryCta: { label: 'View Products', href: '/products' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    {
      id: 'mfg-2',
      type: 'gradient',
      gradient: 'from-blue-900 via-blue-800 to-slate-900',
      label: '6 Production Lines',
      title: 'Diverse Dosage Form Capabilities',
      subtitle: 'From tablets and softgels to sterile injectables — we manufacture across all major pharmaceutical dosage forms.',
      primaryCta: { label: 'Our Capabilities', href: '/manufacturing#capabilities' },
    },
    {
      id: 'mfg-3',
      type: 'gradient',
      gradient: 'from-teal-900 via-teal-800 to-slate-900',
      label: 'Contract Manufacturing',
      title: 'Your Manufacturing Partner',
      subtitle: 'CDMO services including contract manufacturing, private labeling, and technology transfer for pharmaceutical companies worldwide.',
      primaryCta: { label: 'Partner With Us', href: '/contact' },
    },
  ],
  'quality-compliance': [
    {
      id: 'qc-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Quality & Compliance',
      title: 'Quality is Our Foundation',
      subtitle: 'We are committed to delivering safe, effective, and high-quality pharmaceutical products. Our quality systems are built around international regulatory expectations.',
      primaryCta: { label: 'View Certifications', href: '/resources' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    {
      id: 'qc-2',
      type: 'gradient',
      gradient: 'from-blue-900 via-blue-800 to-slate-900',
      label: 'WHO GMP · ISO 9001 · ISO 14001',
      title: 'Internationally Certified',
      subtitle: 'Multiple international certifications ensuring our products meet the highest global quality standards.',
    },
  ],
  'rd-innovation': [
    {
      id: 'rd-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'R&D Innovation',
      title: 'Driving Pharmaceutical Innovation',
      subtitle: 'Our R&D team is dedicated to developing innovative pharmaceutical solutions that meet evolving healthcare needs.',
      primaryCta: { label: 'Research Partnerships', href: '/contact' },
      secondaryCta: { label: 'View Products', href: '/products' },
    },
    {
      id: 'rd-2',
      type: 'gradient',
      gradient: 'from-indigo-900 via-indigo-800 to-slate-900',
      label: '30+ Products in Pipeline',
      title: 'Innovation for Accessible Healthcare',
      subtitle: 'Developing affordable, climate-adapted formulations targeting unmet healthcare needs in emerging markets.',
    },
  ],
  products: [
    {
      id: 'prod-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Products',
      title: 'Our Product Portfolio',
      subtitle: 'Explore our comprehensive range of high-quality pharmaceutical products manufactured to international GMP standards.',
      primaryCta: { label: 'Request Quote', href: '/order-now' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
  ],
  news: [
    {
      id: 'news-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'News & Media',
      title: 'Latest News & Updates',
      subtitle: 'Stay informed about our latest developments, partnerships, and achievements.',
    },
  ],
  careers: [
    {
      id: 'careers-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Careers',
      title: 'Join Our Team',
      subtitle: 'Build your career with a leading pharmaceutical company committed to healthcare innovation.',
      primaryCta: { label: 'View Positions', href: '/careers#positions' },
      secondaryCta: { label: 'About Us', href: '/about' },
    },
  ],
  contact: [
    {
      id: 'contact-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Contact',
      title: 'Get in Touch',
      subtitle: "We're here to answer your questions and discuss partnership opportunities.",
      primaryCta: { label: 'Send Message', href: '#contact-form' },
    },
  ],
  resources: [
    {
      id: 'res-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Resources',
      title: 'Resources & Documents',
      subtitle: 'Access product information, certifications, and company materials.',
    },
  ],
  verify: [
    {
      id: 'verify-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Product Verification',
      title: 'Verify Product Authenticity',
      subtitle: 'Enter the batch code to verify your product is genuine Raysun Biopharma.',
    },
  ],
  'order-now': [
    {
      id: 'order-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'Order',
      title: 'Request a Quote',
      subtitle: 'Submit your inquiry for our pharmaceutical products. Our team will respond within 24 hours.',
      primaryCta: { label: 'View Products', href: '/products' },
    },
  ],
  'ai-assistant': [
    {
      id: 'ai-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'AI Assistant',
      title: 'Intelligent Product Assistant',
      subtitle: 'Get instant answers about our products, manufacturing capabilities, and services.',
    },
  ],
  'what-science-can-do': [
    {
      id: 'wsc-1',
      type: 'gradient',
      gradient: 'from-slate-900 via-slate-800 to-blue-900',
      label: 'What Science Can Do',
      title: 'The Power of Pharmaceutical Science',
      subtitle: 'Exploring how innovation in pharmaceutical manufacturing is improving lives across the globe.',
      primaryCta: { label: 'Stories of Impact', href: '/what-science-can-do/stories-of-impact' },
    },
  ],
}

// Helper to get slides for a page with translation override
export function getHeroSlides(pageKey: string): HeroSlide[] {
  return heroSlides[pageKey] || heroSlides.home
}
