// Careers Content Mapper

import { ContentCareersPage, ContentJobPosting } from '../types/content-careers'

// Mock job postings data
const jobPostings: ContentJobPosting[] = [
  {
    id: '1',
    slug: 'production-manager',
    title: 'Production Manager',
    department: 'Manufacturing',
    location: 'Vientiane, Laos',
    type: 'Full-time',
    summary: 'Lead production operations ensuring quality and efficiency across all manufacturing lines.',
    responsibilities: [
      'Oversee daily production operations across all dosage forms',
      'Manage production schedules and ensure on-time delivery',
      'Implement and maintain GMP compliance in production areas',
      'Lead and develop production team members',
      'Coordinate with QA/QC for quality assurance',
      'Drive continuous improvement initiatives',
    ],
    requirements: [
      'Bachelor\'s degree in Pharmacy, Chemical Engineering, or related field',
      '5+ years pharmaceutical manufacturing experience',
      'Strong knowledge of GMP regulations',
      'Experience with multiple dosage forms preferred',
      'Excellent leadership and communication skills',
    ],
    preferred: [
      'Master\'s degree in relevant field',
      'Previous WHO GMP certification experience',
      'Lean/Six Sigma certification',
    ],
    postedDate: '2026-03-01',
    relatedJobs: ['2', '3'],
  },
  {
    id: '2',
    slug: 'quality-assurance-specialist',
    title: 'Quality Assurance Specialist',
    department: 'Quality',
    location: 'Vientiane, Laos',
    type: 'Full-time',
    summary: 'Ensure compliance with quality standards and regulatory requirements throughout the manufacturing process.',
    responsibilities: [
      'Review and approve batch production records',
      'Conduct internal quality audits',
      'Manage deviation and CAPA processes',
      'Ensure compliance with GMP and regulatory requirements',
      'Coordinate with regulatory authorities',
      'Support product release activities',
    ],
    requirements: [
      'Bachelor\'s degree in Pharmacy, Chemistry, or related field',
      '3+ years QA experience in pharmaceutical industry',
      'Knowledge of WHO GMP guidelines',
      'Strong analytical and problem-solving skills',
      'Attention to detail and documentation skills',
    ],
    preferred: [
      'ISO 9001/14001 experience',
      'Previous regulatory submission experience',
      'Experience with stability testing programs',
    ],
    postedDate: '2026-03-05',
    relatedJobs: ['1', '4'],
  },
  {
    id: '3',
    slug: 'rd-scientist',
    title: 'R&D Scientist',
    department: 'R&D',
    location: 'Vientiane, Laos',
    type: 'Full-time',
    summary: 'Develop new pharmaceutical formulations and improve existing products through innovative research.',
    responsibilities: [
      'Develop new formulation prototypes',
      'Conduct laboratory-scale experiments',
      'Scale-up formulations to production scale',
      'Prepare technical documentation',
      'Collaborate with manufacturing and quality teams',
      'Stay current with pharmaceutical research trends',
    ],
    requirements: [
      'Master\'s or PhD in Pharmacy, Chemistry, or related field',
      '2+ years R&D experience in pharmaceutical industry',
      'Experience with solid dosage forms preferred',
      'Strong analytical and laboratory skills',
      'Excellent documentation skills',
    ],
    preferred: [
      'Publication history in peer-reviewed journals',
      'Experience with novel drug delivery systems',
      'Process validation experience',
    ],
    postedDate: '2026-03-10',
    relatedJobs: ['4', '6'],
  },
  {
    id: '4',
    slug: 'regulatory-affairs-manager',
    title: 'Regulatory Affairs Manager',
    department: 'Compliance',
    location: 'Vientiane, Laos',
    type: 'Full-time',
    summary: 'Manage regulatory submissions and ensure compliance with international pharmaceutical regulations.',
    responsibilities: [
      'Prepare and submit regulatory filings',
      'Monitor regulatory changes and ensure compliance',
      ' Liaise with regulatory authorities',
      'Manage product registration processes',
      'Provide regulatory guidance to internal teams',
      'Ensure labeling compliance',
    ],
    requirements: [
      'Bachelor\'s degree in Pharmacy or related field',
      '5+ years regulatory affairs experience',
      'Experience with ASEAN and Middle East registrations',
      'Knowledge of ICH guidelines',
      'Strong communication and negotiation skills',
    ],
    preferred: [
      'Experience with WHO prequalification',
      'Previous audit experience',
      'Multi-market submission track record',
    ],
    postedDate: '2026-03-08',
    relatedJobs: ['2', '5'],
  },
  {
    id: '5',
    slug: 'sales-manager-asia',
    title: 'Sales Manager - Asia',
    department: 'Sales',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    summary: 'Drive business growth in Asian markets through strategic partnerships and distributor management.',
    responsibilities: [
      'Develop and execute sales strategy for Asia Pacific region',
      'Manage key distributor relationships',
      'Achieve sales targets and business development goals',
      'Identify new market opportunities',
      'Coordinate with marketing for regional campaigns',
      'Report on market trends and competitor activities',
    ],
    requirements: [
      'Bachelor\'s degree in Business, Pharmacy, or related field',
      '5+ years pharmaceutical sales experience in Asia',
      'Proven track record of meeting targets',
      'Strong network in pharmaceutical distribution',
      'Excellent interpersonal and presentation skills',
    ],
    preferred: [
      'Experience with generic pharmaceutical sales',
      'MBA or international business degree',
      'Language skills (Thai, Vietnamese, Mandarin)',
    ],
    postedDate: '2026-03-12',
    relatedJobs: ['4', '7'],
  },
  {
    id: '6',
    slug: 'quality-control-chemist',
    title: 'Quality Control Chemist',
    department: 'Quality',
    location: 'Vientiane, Laos',
    type: 'Full-time',
    summary: 'Perform analytical testing and quality control activities to ensure product meets specifications.',
    responsibilities: [
      'Perform HPLC, GC, and other analytical testing',
      'Conduct raw material and finished product testing',
      'Maintain laboratory equipment and records',
      'Participate in method validation',
      'Support stability testing programs',
      'Ensure compliance with laboratory safety standards',
    ],
    requirements: [
      'Bachelor\'s degree in Chemistry or Pharmacy',
      '2+ years QC laboratory experience',
      'Experience with pharmaceutical analytical methods',
      'Knowledge of GMP laboratory practices',
      'Strong attention to detail',
    ],
    preferred: [
      'Experience with ICP-OES or particle size analysis',
      'Method development experience',
      'Stability study experience',
    ],
    postedDate: '2026-03-15',
    relatedJobs: ['2', '3'],
  },
  {
    id: '7',
    slug: 'supply-chain-coordinator',
    title: 'Supply Chain Coordinator',
    department: 'Operations',
    location: 'Vientiane, Laos',
    type: 'Full-time',
    summary: 'Coordinate supply chain activities to ensure smooth material flow and timely delivery.',
    responsibilities: [
      'Manage raw material procurement',
      'Coordinate with suppliers and logistics providers',
      'Monitor inventory levels',
      'Ensure on-time delivery of materials',
      'Collaborate with production planning',
      'Optimize supply chain processes',
    ],
    requirements: [
      'Bachelor\'s degree in Business, Supply Chain, or related field',
      '3+ years supply chain experience',
      'Pharmaceutical or manufacturing background preferred',
      'Strong analytical and planning skills',
      'Excellent organizational skills',
    ],
    preferred: [
      'APICS/SCOR certification',
      'ERP system experience',
      'International procurement experience',
    ],
    postedDate: '2026-03-14',
    relatedJobs: ['1', '5'],
  },
]

// Department categories for filtering
export const jobDepartments = [
  'All',
  'Manufacturing',
  'Quality',
  'R&D',
  'Compliance',
  'Sales',
  'Operations',
]

// Benefits data
const benefits = [
  'Competitive Salary',
  'Health Insurance',
  'Professional Development',
  'Housing Allowance',
  'Annual Leave',
  'Performance Bonus',
  'Provident Fund',
  'Work-Life Balance',
]

export function getCareersContent(): ContentCareersPage {
  return {
    hero: {
      title: 'Join Our Team',
      subtitle: 'Build your career with a leading pharmaceutical company committed to healthcare innovation.',
    },
    overview: {
      title: 'Why Work With Us',
      description: 'At Raysun Biopharma, we offer more than just a job. Join a team that values integrity, innovation, and commitment to quality healthcare.',
    },
    benefits: {
      title: 'Benefits & Perks',
      items: benefits,
    },
    positions: jobPostings,
  }
}

export function getAllJobPostings(): ContentJobPosting[] {
  return jobPostings
}

export function getJobBySlug(slug: string): ContentJobPosting | undefined {
  return jobPostings.find(job => job.slug === slug)
}

export function getJobsByDepartment(department: string): ContentJobPosting[] {
  if (department === 'All') return jobPostings
  return jobPostings.filter(job => job.department === department)
}

export function getRelatedJobs(jobId: string): ContentJobPosting[] {
  const job = jobPostings.find(j => j.id === jobId)
  if (!job) return []
  return jobPostings.filter(j => job.relatedJobs.includes(j.id)).slice(0, 3)
}
