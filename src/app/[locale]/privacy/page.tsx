import Link from 'next/link'


export default function Privacy() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2">LEGAL</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-300">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 mb-8">
              Last updated: March 2026
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-600 mb-6">
              Raysun Biopharma Co., Ltd. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Fill out a contact form</li>
              <li>Request a quote or product information</li>
              <li>Submit a job application</li>
              <li>Subscribe to our newsletter</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-600 mb-6">
              We may use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you requested information about our products and services</li>
              <li>Process job applications</li>
              <li>Improve our website and user experience</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
            <p className="text-slate-600 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
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
