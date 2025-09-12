// Placeholder industrial equipment with INR pricing and Unsplash images
module.exports = [
  {
    name: 'CNC Glass Cutting Table',
    description: 'High-precision CNC cutting table for float glass.',
    category: 'Cutting',
    subcategory: 'CNC',
    price: 450000,
    discountPrice: 420000,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee243b6b2f26?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '3000 x 2000 mm',
      weight: '1200 kg',
      material: 'Steel, Aluminum',
      features: ['Servo control', 'Auto lubrication', 'Safety sensors'],
    },
    stock: 5,
    sku: 'PST-CUT-001',
    isActive: true,
    tags: ['glass', 'cutting', 'cnc'],
  },
  {
    name: 'Glass Edge Polishing Machine',
    description: 'Multi-head edging for smooth glass finish.',
    category: 'Polishing',
    subcategory: 'Edging',
    price: 320000,
    discountPrice: 299000,
    images: [
      'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '2200 x 1500 mm',
      weight: '800 kg',
      material: 'Steel',
      features: ['Variable speed', 'Water cooling'],
    },
    stock: 8,
    sku: 'PST-EDGE-002',
    isActive: true,
    tags: ['glass', 'edge', 'polish'],
  },
  {
    name: 'Glass Drilling Machine',
    description: 'Automated double-head drilling for glass sheets.',
    category: 'Drilling',
    subcategory: 'Automatic',
    price: 210000,
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '1600 x 1200 mm',
      weight: '600 kg',
      material: 'Steel',
      features: ['Auto feed', 'Digital control'],
    },
    stock: 10,
    sku: 'PST-DRL-003',
    isActive: true,
    tags: ['glass', 'drill'],
  },
];


