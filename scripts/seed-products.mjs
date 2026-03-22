const STRAPI_URL = 'https://raysun-cms-production.up.railway.app'
const STRAPI_TOKEN = '92a1de40c5ee6a313f4159d14718c7b1d37f1b3593c4fe76837e54cac075c251886af26fd769f3f07f4d8748be59d1ac7b4f8b286c7066a4c5eb8e30d09d33e532c612f2a45ae9fa8374c6fcf8f3c32ae9df2e619ba0d66f8031fad94e70b8423324a831362213b79fbdd7dc2a93dd7e4214b542151423bca3aeb8131c7ab181'

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const products = [
  { name: 'Amoxicillin Tablets 500mg', category: 'antibiotics', dosageForm: 'Film-coated Tablet', description: 'Broad-spectrum penicillin antibiotic.', indication: 'Bacterial infections', tags: ['antibiotic', 'oral'], productType: 'generic', sortOrder: 1 },
  { name: 'Ciprofloxacin Tablets 500mg', category: 'antibiotics', dosageForm: 'Film-coated Tablet', description: 'Fluoroquinolone antibiotic for UTI and respiratory infections.', indication: 'UTI, respiratory', tags: ['antibiotic', 'oral'], productType: 'generic', sortOrder: 2 },
  { name: 'Amoxicillin Capsules 500mg', category: 'antibiotics', dosageForm: 'Hard Capsule', description: 'Broad-spectrum antibiotic in capsule form.', indication: 'Bacterial infections', tags: ['antibiotic', 'oral'], productType: 'generic', sortOrder: 3 },
  { name: 'Ceftriaxone for Injection 1g', category: 'antibiotics', dosageForm: 'Powder for Injection', description: 'Third-generation cephalosporin for severe infections.', indication: 'Severe bacterial infections', tags: ['antibiotic', 'injectable'], productType: 'generic', sortOrder: 4 },
  { name: 'Gentamicin Injection 80mg/2ml', category: 'antibiotics', dosageForm: 'Solution for Injection', description: 'Aminoglycoside for serious gram-negative infections.', indication: 'Gram-negative infections', tags: ['antibiotic', 'injectable'], productType: 'generic', sortOrder: 5 },
  { name: 'Fluconazole Capsules 150mg', category: 'antibiotics', dosageForm: 'Hard Capsule', description: 'Antifungal for systemic and superficial fungal infections.', indication: 'Fungal infections', tags: ['antifungal', 'oral'], productType: 'generic', sortOrder: 6 },
  { name: 'Azithromycin Tablets 250mg', category: 'antibiotics', dosageForm: 'Film-coated Tablet', description: 'Macrolide antibiotic for respiratory and soft tissue infections.', indication: 'Respiratory infections', tags: ['antibiotic', 'oral'], productType: 'generic', sortOrder: 7 },
  { name: 'Doxycycline Capsules 100mg', category: 'antibiotics', dosageForm: 'Hard Capsule', description: 'Tetracycline antibiotic for a wide range of infections.', indication: 'Various infections', tags: ['antibiotic', 'oral'], productType: 'generic', sortOrder: 8 },
  { name: 'Metronidazole Tablets 400mg', category: 'antibiotics', dosageForm: 'Tablet', description: 'Antiprotozoal and antibacterial for anaerobic infections.', indication: 'Anaerobic infections', tags: ['antibiotic', 'oral'], productType: 'generic', sortOrder: 9 },
  { name: 'Amlodipine Tablets 5mg', category: 'cardiovascular', dosageForm: 'Tablet', description: 'Calcium channel blocker for hypertension and angina.', indication: 'Hypertension', tags: ['cardiovascular', 'oral'], productType: 'generic', sortOrder: 10 },
  { name: 'Atorvastatin Tablets 20mg', category: 'cardiovascular', dosageForm: 'Film-coated Tablet', description: 'Statin for cholesterol management and cardiovascular risk reduction.', indication: 'Hyperlipidemia', tags: ['cardiovascular', 'oral'], productType: 'generic', sortOrder: 11 },
  { name: 'Losartan Tablets 50mg', category: 'cardiovascular', dosageForm: 'Film-coated Tablet', description: 'ARB for hypertension and nephropathy in diabetics.', indication: 'Hypertension', tags: ['cardiovascular', 'oral'], productType: 'generic', sortOrder: 12 },
  { name: 'Aspirin Tablets 100mg', category: 'cardiovascular', dosageForm: 'Enteric-coated Tablet', description: 'Low-dose aspirin for cardiovascular event prevention.', indication: 'Cardiovascular prevention', tags: ['cardiovascular', 'oral'], productType: 'generic', sortOrder: 13 },
  { name: 'Metformin HCl Tablets 850mg', category: 'cardiovascular', dosageForm: 'Tablet', description: 'First-line antidiabetic with cardiovascular benefits.', indication: 'Type 2 diabetes', tags: ['diabetes', 'oral'], productType: 'generic', sortOrder: 14 },
  { name: 'Omega-3 Fish Oil Softgels 1000mg', category: 'cardiovascular', dosageForm: 'Softgel', description: 'EPA/DHA omega-3 for cardiovascular health support.', indication: 'Cardiovascular support', tags: ['supplement', 'heart'], productType: 'brand', sortOrder: 15 },
  { name: 'CoQ10 Softgels 100mg', category: 'cardiovascular', dosageForm: 'Softgel', description: 'Coenzyme Q10 for cellular energy and heart health.', indication: 'Cardiovascular support', tags: ['antioxidant', 'heart'], productType: 'brand', sortOrder: 16 },
  { name: 'Ibuprofen Tablets 400mg', category: 'pain', dosageForm: 'Film-coated Tablet', description: 'NSAID for pain, inflammation, and fever relief.', indication: 'Pain, inflammation, fever', tags: ['NSAID', 'analgesic'], productType: 'generic', sortOrder: 20 },
  { name: 'Diclofenac Gel 1%', category: 'pain', dosageForm: 'Topical Gel', description: 'Topical NSAID for localized pain and inflammation.', indication: 'Joint pain, sports injuries', tags: ['analgesic', 'topical'], productType: 'generic', sortOrder: 21 },
  { name: 'Diclofenac Sodium Injection 75mg/3ml', category: 'pain', dosageForm: 'Solution for Injection', description: 'Injectable NSAID for acute and post-operative pain.', indication: 'Acute pain', tags: ['analgesic', 'injectable'], productType: 'generic', sortOrder: 22 },
  { name: 'Paracetamol Tablets 500mg', category: 'pain', dosageForm: 'Tablet', description: 'Analgesic and antipyretic for mild to moderate pain.', indication: 'Pain, fever', tags: ['analgesic', 'oral'], productType: 'generic', sortOrder: 23 },
  { name: 'Naproxen Tablets 250mg', category: 'pain', dosageForm: 'Tablet', description: 'NSAID for musculoskeletal and joint pain relief.', indication: 'Arthritis, pain', tags: ['NSAID', 'oral'], productType: 'generic', sortOrder: 24 },
  { name: 'Tramadol Capsules 50mg', category: 'pain', dosageForm: 'Hard Capsule', description: 'Opioid analgesic for moderate to moderately severe pain.', indication: 'Moderate pain', tags: ['opioid', 'oral'], productType: 'generic', sortOrder: 25 },
  { name: 'Hydrocortisone Cream 1%', category: 'dermatology', dosageForm: 'Cream', description: 'Mild corticosteroid for inflammatory skin conditions.', indication: 'Eczema, dermatitis', tags: ['dermatology', 'topical'], productType: 'generic', sortOrder: 30 },
  { name: 'Clotrimazole Cream 1%', category: 'dermatology', dosageForm: 'Cream', description: 'Topical antifungal for skin infections.', indication: 'Fungal skin infections', tags: ['antifungal', 'topical'], productType: 'generic', sortOrder: 31 },
  { name: 'Betamethasone Cream 0.05%', category: 'dermatology', dosageForm: 'Cream', description: 'Potent corticosteroid for severe skin conditions.', indication: 'Psoriasis, severe eczema', tags: ['dermatology', 'topical'], productType: 'generic', sortOrder: 32 },
  { name: 'Miconazole Cream 2%', category: 'dermatology', dosageForm: 'Cream', description: 'Antifungal for dermatophyte and yeast skin infections.', indication: 'Fungal skin infections', tags: ['dermatology', 'antifungal'], productType: 'generic', sortOrder: 33 },
  { name: 'Benzoyl Peroxide Gel 5%', category: 'dermatology', dosageForm: 'Gel', description: 'Antimicrobial for mild to moderate acne treatment.', indication: 'Acne vulgaris', tags: ['dermatology', 'acne'], productType: 'generic', sortOrder: 34 },
  { name: 'Multivitamin Complex Tablets', category: 'vitamins', dosageForm: 'Tablet', description: 'Comprehensive daily multivitamin with essential minerals.', indication: 'Nutritional support', tags: ['vitamin', 'daily'], productType: 'brand', sortOrder: 40 },
  { name: 'Vitamin C Tablets 1000mg', category: 'vitamins', dosageForm: 'Chewable Tablet', description: 'High-dose vitamin C for immune support.', indication: 'Immune support', tags: ['vitamin', 'immune'], productType: 'brand', sortOrder: 41 },
  { name: 'Iron + Folic Acid Tablets', category: 'vitamins', dosageForm: 'Tablet', description: 'Iron supplementation with folic acid for anemia prevention.', indication: 'Iron deficiency', tags: ['mineral', 'women'], productType: 'brand', sortOrder: 42 },
  { name: 'Calcium + Vitamin D3 Tablets', category: 'vitamins', dosageForm: 'Tablet', description: 'Calcium with vitamin D3 for bone strength.', indication: 'Bone health', tags: ['mineral', 'bone health'], productType: 'brand', sortOrder: 43 },
  { name: 'Vitamin D3 Softgels 5000 IU', category: 'vitamins', dosageForm: 'Softgel', description: 'High-potency vitamin D3 for bone and immune health.', indication: 'Vitamin D deficiency', tags: ['vitamin', 'bone health'], productType: 'brand', sortOrder: 44 },
  { name: 'Evening Primrose Oil Softgels 1000mg', category: 'vitamins', dosageForm: 'Softgel', description: 'GLA source for hormonal balance and skin health.', indication: 'Hormonal balance', tags: ['supplement', 'women'], productType: 'brand', sortOrder: 45 },
  { name: 'Zinc Tablets 50mg', category: 'vitamins', dosageForm: 'Tablet', description: 'Essential mineral for immune function and wound healing.', indication: 'Immune support', tags: ['mineral', 'immune'], productType: 'brand', sortOrder: 46 },
  { name: 'Omeprazole Capsules 20mg', category: 'gastrointestinal', dosageForm: 'Enteric-coated Capsule', description: 'Proton pump inhibitor for acid reflux and ulcers.', indication: 'GERD, peptic ulcer', tags: ['GI', 'oral'], productType: 'generic', sortOrder: 50 },
  { name: 'Lansoprazole Capsules 30mg', category: 'gastrointestinal', dosageForm: 'Delayed-release Capsule', description: 'PPI for GERD and duodenal ulcer treatment.', indication: 'GERD, duodenal ulcer', tags: ['GI', 'oral'], productType: 'generic', sortOrder: 51 },
  { name: 'Oral Rehydration Salts', category: 'gastrointestinal', dosageForm: 'Powder for Solution', description: 'WHO-formula ORS for dehydration management.', indication: 'Dehydration', tags: ['GI', 'essential'], productType: 'generic', sortOrder: 52 },
  { name: 'Loperamide Capsules 2mg', category: 'gastrointestinal', dosageForm: 'Capsule', description: 'Antidiarrheal for acute diarrhea control.', indication: 'Acute diarrhea', tags: ['GI', 'oral'], productType: 'generic', sortOrder: 53 },
  { name: 'Ranitidine Tablets 150mg', category: 'gastrointestinal', dosageForm: 'Tablet', description: 'H2 blocker for gastric acid reduction.', indication: 'GERD, gastritis', tags: ['GI', 'oral'], productType: 'generic', sortOrder: 54 },
  { name: 'Salbutamol Inhaler 100mcg', category: 'respiratory', dosageForm: 'Metered-dose Inhaler', description: 'Bronchodilator for asthma and COPD symptom relief.', indication: 'Asthma, COPD', tags: ['respiratory', 'inhaled'], productType: 'generic', sortOrder: 60 },
  { name: 'Cetirizine Tablets 10mg', category: 'respiratory', dosageForm: 'Tablet', description: 'Antihistamine for allergic rhinitis and urticaria.', indication: 'Allergies', tags: ['antihistamine', 'oral'], productType: 'generic', sortOrder: 61 },
  { name: 'Dextromethorphan Syrup', category: 'respiratory', dosageForm: 'Syrup', description: 'Cough suppressant for dry and irritating cough.', indication: 'Dry cough', tags: ['respiratory', 'oral'], productType: 'generic', sortOrder: 62 },
  { name: 'Loratadine Tablets 10mg', category: 'respiratory', dosageForm: 'Tablet', description: 'Non-sedating antihistamine for allergies.', indication: 'Allergic rhinitis', tags: ['antihistamine', 'oral'], productType: 'generic', sortOrder: 63 },
  { name: 'Herbal Cough Syrup', category: 'traditional', dosageForm: 'Syrup', description: 'Traditional herbal formulation for cough relief.', indication: 'Cough, sore throat', tags: ['herbal', 'respiratory'], productType: 'brand', sortOrder: 70 },
  { name: 'Turmeric Extract Capsules', category: 'traditional', dosageForm: 'Capsule', description: 'Standardized curcumin for anti-inflammatory support.', indication: 'Inflammation', tags: ['herbal', 'anti-inflammatory'], productType: 'brand', sortOrder: 71 },
  { name: 'Ginger Root Extract Tablets', category: 'traditional', dosageForm: 'Tablet', description: 'Traditional remedy for digestive comfort and nausea.', indication: 'Nausea, digestion', tags: ['herbal', 'GI'], productType: 'brand', sortOrder: 72 },
  { name: 'Moringa Leaf Capsules', category: 'traditional', dosageForm: 'Capsule', description: 'Nutrient-dense superfood supplement.', indication: 'Nutritional support', tags: ['herbal', 'supplement'], productType: 'brand', sortOrder: 73 },
  { name: 'Metformin HCl Tablets 500mg', category: 'other', dosageForm: 'Tablet', description: 'Oral antidiabetic for type 2 diabetes management.', indication: 'Type 2 diabetes', tags: ['diabetes', 'oral'], productType: 'generic', sortOrder: 80 },
  { name: 'Prednisolone Tablets 5mg', category: 'other', dosageForm: 'Tablet', description: 'Corticosteroid for inflammatory and autoimmune conditions.', indication: 'Inflammation, allergy', tags: ['steroid', 'oral'], productType: 'generic', sortOrder: 81 },
  { name: 'Albendazole Tablets 400mg', category: 'other', dosageForm: 'Chewable Tablet', description: 'Anthelmintic for intestinal worm infections.', indication: 'Worm infections', tags: ['antiparasitic', 'oral'], productType: 'generic', sortOrder: 82 },
]

async function createProduct(product) {
  const slug = slugify(product.name)
  const body = {
    data: {
      name: product.name,
      slug,
      category: product.category,
      dosageForm: product.dosageForm,
      description: product.description,
      indication: product.indication || null,
      tags: product.tags ? product.tags.join(', ') : '',
      productType: product.productType || 'generic',
      sortOrder: product.sortOrder || 0,
      isActive: true,
    }
  }

  const res = await fetch(`${STRAPI_URL}/api/products`, {
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
      console.log(`SKIP (already exists): ${product.name}`)
      return 'skip'
    }
    console.error(`FAIL: ${product.name}`, json.error?.message || json)
    return 'fail'
  }

  const docId = json.data?.documentId
  if (docId) {
    const pubRes = await fetch(`${STRAPI_URL}/api/products/${docId}/actions/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    })
    if (pubRes.ok) {
      console.log(`OK Created & Published: ${product.name} (${slug})`)
    } else {
      console.log(`OK Created (draft): ${product.name} - publish manually`)
    }
  } else {
    console.log(`OK Created: ${product.name}`)
  }
  return 'ok'
}

async function main() {
  console.log(`Seeding ${products.length} products to ${STRAPI_URL}`)
  let ok = 0, skip = 0, fail = 0
  for (const product of products) {
    const result = await createProduct(product)
    if (result === 'ok') ok++
    else if (result === 'skip') skip++
    else fail++
    await new Promise(r => setTimeout(r, 200))
  }
  console.log(`Result: ${ok} created, ${skip} skipped, ${fail} failed (total: ${products.length})`)
}

main().catch(console.error)
