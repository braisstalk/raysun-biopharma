const STRAPI_URL = 'https://raysun-cms-production.up.railway.app'
const STRAPI_TOKEN = '92a1de40c5ee6a313f4159d14718c7b1d37f1b3593c4fe76837e54cac075c251886af26fd769f3f07f4d8748be59d1ac7b4f8b286c7066a4c5eb8e30d09d33e532c612f2a45ae9fa8374c6fcf8f3c32ae9df2e619ba0d66f8031fad94e70b8423324a831362213b79fbdd7dc2a93dd7e4214b542151423bca3aeb8131c7ab181'

const jobs = [
  {
    title: 'Production Manager',
    slug: 'production-manager',
    department: 'manufacturing',
    location: 'Vientiane, Laos',
    employmentType: 'full-time',
    summary: 'Lead production operations ensuring quality and efficiency across all manufacturing lines.',
    responsibilities: ['Oversee daily production operations across all dosage forms', 'Manage production schedules and ensure on-time delivery', 'Implement and maintain GMP compliance in production areas', 'Lead and develop production team members', 'Coordinate with QA/QC for quality assurance', 'Drive continuous improvement initiatives'],
    requirements: ["Bachelor's degree in Pharmacy, Chemical Engineering, or related field", '5+ years pharmaceutical manufacturing experience', 'Strong knowledge of GMP regulations', 'Experience with multiple dosage forms preferred', 'Excellent leadership and communication skills'],
    preferred: ["Master's degree in relevant field", 'Previous WHO GMP certification experience', 'Lean/Six Sigma certification'],
    postedDate: '2026-03-01',
    sortOrder: 1,
  },
  {
    title: 'Quality Assurance Specialist',
    slug: 'quality-assurance-specialist',
    department: 'quality',
    location: 'Vientiane, Laos',
    employmentType: 'full-time',
    summary: 'Ensure compliance with quality standards and regulatory requirements throughout the manufacturing process.',
    responsibilities: ['Review and approve batch production records', 'Conduct internal quality audits', 'Manage deviation and CAPA processes', 'Ensure compliance with GMP and regulatory requirements', 'Coordinate with regulatory authorities', 'Support product release activities'],
    requirements: ["Bachelor's degree in Pharmacy, Chemistry, or related field", '3+ years QA experience in pharmaceutical industry', 'Knowledge of WHO GMP guidelines', 'Strong analytical and problem-solving skills', 'Attention to detail and documentation skills'],
    preferred: ['ISO 9001/14001 experience', 'Previous regulatory submission experience', 'Experience with stability testing programs'],
    postedDate: '2026-03-05',
    sortOrder: 2,
  },
  {
    title: 'R&D Scientist',
    slug: 'rd-scientist',
    department: 'rd',
    location: 'Vientiane, Laos',
    employmentType: 'full-time',
    summary: 'Develop new pharmaceutical formulations and improve existing products through innovative research.',
    responsibilities: ['Develop new formulation prototypes', 'Conduct laboratory-scale experiments', 'Scale-up formulations to production scale', 'Prepare technical documentation', 'Collaborate with manufacturing and quality teams', 'Stay current with pharmaceutical research trends'],
    requirements: ["Master's or PhD in Pharmacy, Chemistry, or related field", '2+ years R&D experience in pharmaceutical industry', 'Experience with solid dosage forms preferred', 'Strong analytical and laboratory skills', 'Excellent documentation skills'],
    preferred: ['Publication history in peer-reviewed journals', 'Experience with novel drug delivery systems', 'Process validation experience'],
    postedDate: '2026-03-10',
    sortOrder: 3,
  },
  {
    title: 'Regulatory Affairs Manager',
    slug: 'regulatory-affairs-manager',
    department: 'compliance',
    location: 'Vientiane, Laos',
    employmentType: 'full-time',
    summary: 'Manage regulatory submissions and ensure compliance with international pharmaceutical regulations.',
    responsibilities: ['Prepare and submit regulatory filings', 'Monitor regulatory changes and ensure compliance', 'Liaise with regulatory authorities', 'Manage product registration processes', 'Provide regulatory guidance to internal teams', 'Ensure labeling compliance'],
    requirements: ["Bachelor's degree in Pharmacy or related field", '5+ years regulatory affairs experience', 'Experience with ASEAN and Middle East registrations', 'Knowledge of ICH guidelines', 'Strong communication and negotiation skills'],
    preferred: ['Experience with WHO prequalification', 'Previous audit experience', 'Multi-market submission track record'],
    postedDate: '2026-03-08',
    sortOrder: 4,
  },
  {
    title: 'Sales Manager - Asia',
    slug: 'sales-manager-asia',
    department: 'sales',
    location: 'Bangkok, Thailand',
    employmentType: 'full-time',
    summary: 'Drive business growth in Asian markets through strategic partnerships and distributor management.',
    responsibilities: ['Develop and execute sales strategy for Asia Pacific region', 'Manage key distributor relationships', 'Achieve sales targets and business development goals', 'Identify new market opportunities', 'Coordinate with marketing for regional campaigns', 'Report on market trends and competitor activities'],
    requirements: ["Bachelor's degree in Business, Pharmacy, or related field", '5+ years pharmaceutical sales experience in Asia', 'Proven track record of meeting targets', 'Strong network in pharmaceutical distribution', 'Excellent interpersonal and presentation skills'],
    preferred: ['Experience with generic pharmaceutical sales', 'MBA or international business degree', 'Language skills (Thai, Vietnamese, Mandarin)'],
    postedDate: '2026-03-12',
    sortOrder: 5,
  },
  {
    title: 'Quality Control Chemist',
    slug: 'quality-control-chemist',
    department: 'quality',
    location: 'Vientiane, Laos',
    employmentType: 'full-time',
    summary: 'Perform analytical testing and quality control activities to ensure product meets specifications.',
    responsibilities: ['Perform HPLC, GC, and other analytical testing', 'Conduct raw material and finished product testing', 'Maintain laboratory equipment and records', 'Participate in method validation', 'Support stability testing programs', 'Ensure compliance with laboratory safety standards'],
    requirements: ["Bachelor's degree in Chemistry or Pharmacy", '2+ years QC laboratory experience', 'Experience with pharmaceutical analytical methods', 'Knowledge of GMP laboratory practices', 'Strong attention to detail'],
    preferred: ['Experience with ICP-OES or particle size analysis', 'Method development experience', 'Stability study experience'],
    postedDate: '2026-03-15',
    sortOrder: 6,
  },
  {
    title: 'Supply Chain Coordinator',
    slug: 'supply-chain-coordinator',
    department: 'operations',
    location: 'Vientiane, Laos',
    employmentType: 'full-time',
    summary: 'Coordinate supply chain activities to ensure smooth material flow and timely delivery.',
    responsibilities: ['Manage raw material procurement', 'Coordinate with suppliers and logistics providers', 'Monitor inventory levels', 'Ensure on-time delivery of materials', 'Collaborate with production planning', 'Optimize supply chain processes'],
    requirements: ["Bachelor's degree in Business, Supply Chain, or related field", '3+ years supply chain experience', 'Pharmaceutical or manufacturing background preferred', 'Strong analytical and planning skills', 'Excellent organizational skills'],
    preferred: ['APICS/SCOR certification', 'ERP system experience', 'International procurement experience'],
    postedDate: '2026-03-14',
    sortOrder: 7,
  },
]

async function createJob(job) {
  const body = {
    data: {
      title: job.title,
      slug: job.slug,
      department: job.department,
      location: job.location,
      employmentType: job.employmentType,
      summary: job.summary,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      preferred: job.preferred,
      postedDate: job.postedDate,
      isActive: true,
      sortOrder: job.sortOrder,
    }
  }

  const res = await fetch(`${STRAPI_URL}/api/job-positions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify(body),
  })

  const json = await res.json()

  if (!res.ok) {
    if (json?.error?.message?.includes('unique') || json?.error?.message?.includes('already')) {
      console.log(`SKIP (already exists): ${job.title}`)
      return 'skip'
    }
    console.error(`FAIL: ${job.title}`, json.error?.message || json)
    return 'fail'
  }

  const docId = json.data?.documentId
  if (docId) {
    const pubRes = await fetch(`${STRAPI_URL}/api/job-positions/${docId}/actions/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    })
    if (pubRes.ok) {
      console.log(`OK Created & Published: ${job.title}`)
    } else {
      console.log(`OK Created (draft): ${job.title} - publish manually`)
    }
  } else {
    console.log(`OK Created: ${job.title}`)
  }
  return 'ok'
}

async function main() {
  console.log(`Seeding ${jobs.length} job positions to ${STRAPI_URL}`)
  let ok = 0, skip = 0, fail = 0
  for (const job of jobs) {
    const result = await createJob(job)
    if (result === 'ok') ok++
    else if (result === 'skip') skip++
    else fail++
    await new Promise(r => setTimeout(r, 300))
  }
  console.log(`Result: ${ok} created, ${skip} skipped, ${fail} failed (total: ${jobs.length})`)
}

main().catch(console.error)
