import { ProductsPageConfig } from '@/types/product'

export const productsPageConfig: ProductsPageConfig = {
  hero: {
    title: 'Our Products',
    subtitle: 'Explore our comprehensive portfolio of high-quality pharmaceutical products — all manufactured to international GMP standards.',
    searchPlaceholder: 'Search product name, generic name, indication, dosage form, or category...',
    slides: [
      {
        id: 'slide-1',
        title: 'Trusted Quality, Global Reach',
        subtitle: 'Over 200 products serving healthcare needs across Southeast Asia, the Middle East, and Africa.',
        gradient: 'from-blue-900 via-blue-800 to-slate-900',
        accentColor: 'blue',
      },
      {
        id: 'slide-2',
        title: 'Innovation in Every Dose',
        subtitle: 'Advanced formulations developed through rigorous R&D and cutting-edge manufacturing technology.',
        gradient: 'from-teal-900 via-teal-800 to-slate-900',
        accentColor: 'teal',
      },
      {
        id: 'slide-3',
        title: 'GMP-Certified Excellence',
        subtitle: 'Every product meets the highest international quality and safety standards.',
        gradient: 'from-indigo-900 via-indigo-800 to-slate-900',
        accentColor: 'indigo',
      },
    ],
  },
  tabs: [
    { id: 'all', label: 'All Products' },
    { id: 'brand', label: 'Brands' },
    { id: 'generic', label: 'Generics' },
    { id: 'dosages', label: 'Dosages' },
  ],
  perPage: 12,
  categories: [
    { id: 'antibiotics', name: 'Antibiotics', description: 'Anti-infective agents', icon: 'Shield' },
    { id: 'cardiovascular', name: 'Cardiovascular', description: 'Heart and circulatory system', icon: 'Heart' },
    { id: 'pain', name: 'Pain & Inflammation', description: 'Analgesics and NSAIDs', icon: 'Activity' },
    { id: 'dermatology', name: 'Dermatology', description: 'Skin treatments', icon: 'Droplets' },
    { id: 'vitamins', name: 'Vitamins & Supplements', description: 'Nutritional products', icon: 'Pill' },
    { id: 'gastrointestinal', name: 'Gastrointestinal', description: 'Digestive health', icon: 'Activity' },
    { id: 'respiratory', name: 'Respiratory', description: 'Respiratory system', icon: 'Wind' },
    { id: 'traditional', name: 'Traditional / Herbal', description: 'Traditional medicines', icon: 'Leaf' },
    { id: 'other', name: 'Other', description: 'Other therapeutic areas', icon: 'Package' },
  ],
  products: [
    // Antibiotics
    { id: 'p-001', name: 'Amoxicillin Tablets 500mg', category: 'antibiotics', dosageForm: 'Film-coated Tablet', description: 'Broad-spectrum penicillin antibiotic.', indication: 'Bacterial infections', tags: ['antibiotic', 'oral'], type: 'generic' },
    { id: 'p-002', name: 'Ciprofloxacin Tablets 500mg', category: 'antibiotics', dosageForm: 'Film-coated Tablet', description: 'Fluoroquinolone antibiotic for UTI and respiratory infections.', indication: 'UTI, respiratory', tags: ['antibiotic', 'oral'], type: 'generic' },
    { id: 'p-003', name: 'Amoxicillin Capsules 500mg', category: 'antibiotics', dosageForm: 'Hard Capsule', description: 'Broad-spectrum antibiotic in capsule form.', indication: 'Bacterial infections', tags: ['antibiotic', 'oral'], type: 'generic' },
    { id: 'p-004', name: 'Ceftriaxone for Injection 1g', category: 'antibiotics', dosageForm: 'Powder for Injection', description: 'Third-generation cephalosporin for severe infections.', indication: 'Severe bacterial infections', tags: ['antibiotic', 'injectable'], type: 'generic' },
    { id: 'p-005', name: 'Gentamicin Injection 80mg/2ml', category: 'antibiotics', dosageForm: 'Solution for Injection', description: 'Aminoglycoside for serious gram-negative infections.', indication: 'Gram-negative infections', tags: ['antibiotic', 'injectable'], type: 'generic' },
    { id: 'p-006', name: 'Fluconazole Capsules 150mg', category: 'antibiotics', dosageForm: 'Hard Capsule', description: 'Antifungal for systemic and superficial fungal infections.', indication: 'Fungal infections', tags: ['antifungal', 'oral'], type: 'generic' },
    { id: 'p-007', name: 'Azithromycin Tablets 250mg', category: 'antibiotics', dosageForm: 'Film-coated Tablet', description: 'Macrolide antibiotic for respiratory and soft tissue infections.', indication: 'Respiratory infections', tags: ['antibiotic', 'oral'], type: 'generic' },
    { id: 'p-008', name: 'Doxycycline Capsules 100mg', category: 'antibiotics', dosageForm: 'Hard Capsule', description: 'Tetracycline antibiotic for a wide range of infections.', indication: 'Various infections', tags: ['antibiotic', 'oral'], type: 'generic' },
    { id: 'p-009', name: 'Metronidazole Tablets 400mg', category: 'antibiotics', dosageForm: 'Tablet', description: 'Antiprotozoal and antibacterial for anaerobic infections.', indication: 'Anaerobic infections', tags: ['antibiotic', 'oral'], type: 'generic' },

    // Cardiovascular
    { id: 'p-010', name: 'Amlodipine Tablets 5mg', category: 'cardiovascular', dosageForm: 'Tablet', description: 'Calcium channel blocker for hypertension and angina.', indication: 'Hypertension', tags: ['cardiovascular', 'oral'], type: 'generic' },
    { id: 'p-011', name: 'Atorvastatin Tablets 20mg', category: 'cardiovascular', dosageForm: 'Film-coated Tablet', description: 'Statin for cholesterol management and cardiovascular risk reduction.', indication: 'Hyperlipidemia', tags: ['cardiovascular', 'oral'], type: 'generic' },
    { id: 'p-012', name: 'Losartan Tablets 50mg', category: 'cardiovascular', dosageForm: 'Film-coated Tablet', description: 'ARB for hypertension and nephropathy in diabetics.', indication: 'Hypertension', tags: ['cardiovascular', 'oral'], type: 'generic' },
    { id: 'p-013', name: 'Aspirin Tablets 100mg', category: 'cardiovascular', dosageForm: 'Enteric-coated Tablet', description: 'Low-dose aspirin for cardiovascular event prevention.', indication: 'Cardiovascular prevention', tags: ['cardiovascular', 'oral'], type: 'generic' },
    { id: 'p-014', name: 'Metformin HCl Tablets 850mg', category: 'cardiovascular', dosageForm: 'Tablet', description: 'First-line antidiabetic with cardiovascular benefits.', indication: 'Type 2 diabetes', tags: ['diabetes', 'oral'], type: 'generic' },
    { id: 'p-015', name: 'Omega-3 Fish Oil Softgels 1000mg', category: 'cardiovascular', dosageForm: 'Softgel', description: 'EPA/DHA omega-3 for cardiovascular health support.', indication: 'Cardiovascular support', tags: ['supplement', 'heart'], type: 'brand' },
    { id: 'p-016', name: 'CoQ10 Softgels 100mg', category: 'cardiovascular', dosageForm: 'Softgel', description: 'Coenzyme Q10 for cellular energy and heart health.', indication: 'Cardiovascular support', tags: ['antioxidant', 'heart'], type: 'brand' },

    // Pain & Inflammation
    { id: 'p-020', name: 'Ibuprofen Tablets 400mg', category: 'pain', dosageForm: 'Film-coated Tablet', description: 'NSAID for pain, inflammation, and fever relief.', indication: 'Pain, inflammation, fever', tags: ['NSAID', 'analgesic'], type: 'generic' },
    { id: 'p-021', name: 'Diclofenac Gel 1%', category: 'pain', dosageForm: 'Topical Gel', description: 'Topical NSAID for localized pain and inflammation.', indication: 'Joint pain, sports injuries', tags: ['analgesic', 'topical'], type: 'generic' },
    { id: 'p-022', name: 'Diclofenac Sodium Injection 75mg/3ml', category: 'pain', dosageForm: 'Solution for Injection', description: 'Injectable NSAID for acute and post-operative pain.', indication: 'Acute pain', tags: ['analgesic', 'injectable'], type: 'generic' },
    { id: 'p-023', name: 'Paracetamol Tablets 500mg', category: 'pain', dosageForm: 'Tablet', description: 'Analgesic and antipyretic for mild to moderate pain.', indication: 'Pain, fever', tags: ['analgesic', 'oral'], type: 'generic' },
    { id: 'p-024', name: 'Naproxen Tablets 250mg', category: 'pain', dosageForm: 'Tablet', description: 'NSAID for musculoskeletal and joint pain relief.', indication: 'Arthritis, pain', tags: ['NSAID', 'oral'], type: 'generic' },
    { id: 'p-025', name: 'Tramadol Capsules 50mg', category: 'pain', dosageForm: 'Hard Capsule', description: 'Opioid analgesic for moderate to moderately severe pain.', indication: 'Moderate pain', tags: ['opioid', 'oral'], type: 'generic' },

    // Dermatology
    { id: 'p-030', name: 'Hydrocortisone Cream 1%', category: 'dermatology', dosageForm: 'Cream', description: 'Mild corticosteroid for inflammatory skin conditions.', indication: 'Eczema, dermatitis', tags: ['dermatology', 'topical'], type: 'generic' },
    { id: 'p-031', name: 'Clotrimazole Cream 1%', category: 'dermatology', dosageForm: 'Cream', description: 'Topical antifungal for skin infections.', indication: 'Fungal skin infections', tags: ['antifungal', 'topical'], type: 'generic' },
    { id: 'p-032', name: 'Betamethasone Cream 0.05%', category: 'dermatology', dosageForm: 'Cream', description: 'Potent corticosteroid for severe skin conditions.', indication: 'Psoriasis, severe eczema', tags: ['dermatology', 'topical'], type: 'generic' },
    { id: 'p-033', name: 'Miconazole Cream 2%', category: 'dermatology', dosageForm: 'Cream', description: 'Antifungal for dermatophyte and yeast skin infections.', indication: 'Fungal skin infections', tags: ['dermatology', 'antifungal'], type: 'generic' },
    { id: 'p-034', name: 'Benzoyl Peroxide Gel 5%', category: 'dermatology', dosageForm: 'Gel', description: 'Antimicrobial for mild to moderate acne treatment.', indication: 'Acne vulgaris', tags: ['dermatology', 'acne'], type: 'generic' },

    // Vitamins & Supplements
    { id: 'p-040', name: 'Multivitamin Complex Tablets', category: 'vitamins', dosageForm: 'Tablet', description: 'Comprehensive daily multivitamin with essential minerals.', indication: 'Nutritional support', tags: ['vitamin', 'daily'], type: 'brand' },
    { id: 'p-041', name: 'Vitamin C Tablets 1000mg', category: 'vitamins', dosageForm: 'Chewable Tablet', description: 'High-dose vitamin C for immune support.', indication: 'Immune support', tags: ['vitamin', 'immune'], type: 'brand' },
    { id: 'p-042', name: 'Iron + Folic Acid Tablets', category: 'vitamins', dosageForm: 'Tablet', description: 'Iron supplementation with folic acid for anemia prevention.', indication: 'Iron deficiency', tags: ['mineral', 'women'], type: 'brand' },
    { id: 'p-043', name: 'Calcium + Vitamin D3 Tablets', category: 'vitamins', dosageForm: 'Tablet', description: 'Calcium with vitamin D3 for bone strength.', indication: 'Bone health', tags: ['mineral', 'bone health'], type: 'brand' },
    { id: 'p-044', name: 'Vitamin D3 Softgels 5000 IU', category: 'vitamins', dosageForm: 'Softgel', description: 'High-potency vitamin D3 for bone and immune health.', indication: 'Vitamin D deficiency', tags: ['vitamin', 'bone health'], type: 'brand' },
    { id: 'p-045', name: 'Evening Primrose Oil Softgels 1000mg', category: 'vitamins', dosageForm: 'Softgel', description: 'GLA source for hormonal balance and skin health.', indication: 'Hormonal balance', tags: ['supplement', 'women'], type: 'brand' },
    { id: 'p-046', name: 'Zinc Tablets 50mg', category: 'vitamins', dosageForm: 'Tablet', description: 'Essential mineral for immune function and wound healing.', indication: 'Immune support', tags: ['mineral', 'immune'], type: 'brand' },

    // Gastrointestinal
    { id: 'p-050', name: 'Omeprazole Capsules 20mg', category: 'gastrointestinal', dosageForm: 'Enteric-coated Capsule', description: 'Proton pump inhibitor for acid reflux and ulcers.', indication: 'GERD, peptic ulcer', tags: ['GI', 'oral'], type: 'generic' },
    { id: 'p-051', name: 'Lansoprazole Capsules 30mg', category: 'gastrointestinal', dosageForm: 'Delayed-release Capsule', description: 'PPI for GERD and duodenal ulcer treatment.', indication: 'GERD, duodenal ulcer', tags: ['GI', 'oral'], type: 'generic' },
    { id: 'p-052', name: 'Oral Rehydration Salts', category: 'gastrointestinal', dosageForm: 'Powder for Solution', description: 'WHO-formula ORS for dehydration management.', indication: 'Dehydration', tags: ['GI', 'essential'], type: 'generic' },
    { id: 'p-053', name: 'Loperamide Capsules 2mg', category: 'gastrointestinal', dosageForm: 'Capsule', description: 'Antidiarrheal for acute diarrhea control.', indication: 'Acute diarrhea', tags: ['GI', 'oral'], type: 'generic' },
    { id: 'p-054', name: 'Ranitidine Tablets 150mg', category: 'gastrointestinal', dosageForm: 'Tablet', description: 'H2 blocker for gastric acid reduction.', indication: 'GERD, gastritis', tags: ['GI', 'oral'], type: 'generic' },

    // Respiratory
    { id: 'p-060', name: 'Salbutamol Inhaler 100mcg', category: 'respiratory', dosageForm: 'Metered-dose Inhaler', description: 'Bronchodilator for asthma and COPD symptom relief.', indication: 'Asthma, COPD', tags: ['respiratory', 'inhaled'], type: 'generic' },
    { id: 'p-061', name: 'Cetirizine Tablets 10mg', category: 'respiratory', dosageForm: 'Tablet', description: 'Antihistamine for allergic rhinitis and urticaria.', indication: 'Allergies', tags: ['antihistamine', 'oral'], type: 'generic' },
    { id: 'p-062', name: 'Dextromethorphan Syrup', category: 'respiratory', dosageForm: 'Syrup', description: 'Cough suppressant for dry and irritating cough.', indication: 'Dry cough', tags: ['respiratory', 'oral'], type: 'generic' },
    { id: 'p-063', name: 'Loratadine Tablets 10mg', category: 'respiratory', dosageForm: 'Tablet', description: 'Non-sedating antihistamine for allergies.', indication: 'Allergic rhinitis', tags: ['antihistamine', 'oral'], type: 'generic' },

    // Traditional / Herbal
    { id: 'p-070', name: 'Herbal Cough Syrup', category: 'traditional', dosageForm: 'Syrup', description: 'Traditional herbal formulation for cough relief.', indication: 'Cough, sore throat', tags: ['herbal', 'respiratory'], type: 'brand' },
    { id: 'p-071', name: 'Turmeric Extract Capsules', category: 'traditional', dosageForm: 'Capsule', description: 'Standardized curcumin for anti-inflammatory support.', indication: 'Inflammation', tags: ['herbal', 'anti-inflammatory'], type: 'brand' },
    { id: 'p-072', name: 'Ginger Root Extract Tablets', category: 'traditional', dosageForm: 'Tablet', description: 'Traditional remedy for digestive comfort and nausea.', indication: 'Nausea, digestion', tags: ['herbal', 'GI'], type: 'brand' },
    { id: 'p-073', name: 'Moringa Leaf Capsules', category: 'traditional', dosageForm: 'Capsule', description: 'Nutrient-dense superfood supplement.', indication: 'Nutritional support', tags: ['herbal', 'supplement'], type: 'brand' },

    // Other
    { id: 'p-080', name: 'Metformin HCl Tablets 500mg', category: 'other', dosageForm: 'Tablet', description: 'Oral antidiabetic for type 2 diabetes management.', indication: 'Type 2 diabetes', tags: ['diabetes', 'oral'], type: 'generic' },
    { id: 'p-081', name: 'Prednisolone Tablets 5mg', category: 'other', dosageForm: 'Tablet', description: 'Corticosteroid for inflammatory and autoimmune conditions.', indication: 'Inflammation, allergy', tags: ['steroid', 'oral'], type: 'generic' },
    { id: 'p-082', name: 'Albendazole Tablets 400mg', category: 'other', dosageForm: 'Chewable Tablet', description: 'Anthelmintic for intestinal worm infections.', indication: 'Worm infections', tags: ['antiparasitic', 'oral'], type: 'generic' },
  ],
}
