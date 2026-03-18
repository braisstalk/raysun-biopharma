// Verify Content Mapper

import { ContentVerifyPage, ContentVerifyMockResult } from '../types/content-verify'

const mockResults: ContentVerifyMockResult[] = [
  { 
    code: 'RS-2025-001234', 
    status: 'success', 
    message: 'Verified Authentic - This is a genuine Raysun Biopharma product.',
    details: 'Manufacturing Date: 2025-01-15 | Batch: RS-2025-001234 | Product: Amoxicillin Tablets 500mg | Expiry: 2028-01 | Distribution: Southeast Asia Region'
  },
  { 
    code: 'RS-2025-005678', 
    status: 'success', 
    message: 'Verified Authentic - This is a genuine Raysun Biopharma product.',
    details: 'Manufacturing Date: 2025-02-20 | Batch: RS-2025-005678 | Product: Omega-3 Fish Oil Softgels | Expiry: 2027-02 | Distribution: Middle East Region'
  },
  { 
    code: 'RS-2024', 
    status: 'warning', 
    message: 'Expired Product - This batch has expired. Please contact us for verification.',
    details: 'Manufacturing Date: 2024-03-01 | Expiry: 2025-03 | Note: Product may no longer be safe for use'
  },
]

export function mapVerifyContent(): ContentVerifyPage {
  return {
    hero: {
      title: 'Product Verification',
      subtitle: 'Verify the authenticity of Raysun Biopharma products, certificates, and authorized distributors.'
    },
    types: [
      { id: 'product', label: 'Product', placeholder: 'Enter batch number (e.g., RS-2025-001234)' },
      { id: 'certificate', label: 'Certificate', placeholder: 'Enter certificate ID' },
      { id: 'distributor', label: 'Distributor', placeholder: 'Enter distributor code' },
    ],
    mockResults,
    helpSection: {
      title: 'Need Help?',
      description: 'Contact our quality team for product verification assistance.'
    },
    reportSection: {
      title: 'Report Counterfeits',
      description: 'If you suspect counterfeit products, please report to our quality assurance team.'
    }
  }
}
