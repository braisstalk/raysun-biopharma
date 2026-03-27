import Link from 'next/link'

export default function Terms() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2">LEGAL</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
          <p className="text-lg text-slate-300">
            Terms and conditions governing your use of this website.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 mb-8">
              Last updated: March 2026
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-6">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Intellectual Property</h2>
            <p className="text-slate-600 mb-6">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Raysun Biopharma Co., Ltd. and is protected by international copyright laws.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Use License</h2>
            <p className="text-slate-600 mb-4">
              Permission is granted to temporarily use this website for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <p className="text-slate-600 mb-6">
              You may not: modify or copy the materials; use the materials for any commercial purpose; transfer the materials to another person; or attempt to reverse engineer any software contained on the website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Product Information</h2>
            <p className="text-slate-600 mb-6">
              The information provided on this website is for general informational purposes only. Product specifications, availability, and pricing are subject to change without notice. Please contact us directly for the most current product information.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Disclaimer</h2>
            <p className="text-slate-600 mb-6">
              The materials on this website are provided &quot;as is.&quot; Raysun Biopharma makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-slate-600 mb-6">
              In no event shall Raysun Biopharma be liable for any damages arising out of the use or inability to use the materials on this website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 font-medium">Raysun Biopharma Co., Ltd.</p>
              <p className="text-slate-600">Vientiane Capital, Lao PDR</p>
              <p className="text-slate-600">Email: info@raysunpharma.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
