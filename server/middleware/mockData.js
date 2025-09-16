// Mock data middleware for when DB is unavailable
const mockProducts = [
  {
    _id: '1',
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
    _id: '2',
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
    _id: '3',
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
  {
    _id: '4',
    name: 'Glass Beveling Machine',
    description: 'Precision beveling for decorative glass edges.',
    category: 'Polishing',
    subcategory: 'Beveling',
    price: 380000,
    discountPrice: 360000,
    images: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '2400 x 1600 mm',
      weight: '950 kg',
      material: 'Heavy-duty Steel',
      features: ['Angle adjustment', 'Diamond wheels', 'Water recycling'],
    },
    stock: 3,
    sku: 'PST-BEV-004',
    isActive: true,
    tags: ['glass', 'bevel', 'polish'],
  },
  {
    _id: '5',
    name: 'Automatic Glass Loading Table',
    description: 'Hydraulic loading system for safe glass handling.',
    category: 'Cutting',
    subcategory: 'Handling',
    price: 185000,
    images: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '3600 x 2600 mm',
      weight: '1500 kg',
      material: 'Steel Frame',
      features: ['Hydraulic tilt', 'Air cushion', 'Safety locks'],
    },
    stock: 7,
    sku: 'PST-LOAD-005',
    isActive: true,
    tags: ['glass', 'loading', 'handling'],
  },
  {
    _id: '6',
    name: 'Glass Washing Machine',
    description: 'Vertical glass washing and drying system.',
    category: 'Polishing',
    subcategory: 'Washing',
    price: 275000,
    images: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '2800 x 2000 mm',
      weight: '1100 kg',
      material: 'Stainless Steel',
      features: ['Hot water system', 'Air knife drying', 'Filtration'],
    },
    stock: 4,
    sku: 'PST-WASH-006',
    isActive: true,
    tags: ['glass', 'washing', 'cleaning'],
  },
  {
    _id: '7',
    name: 'Manual Glass Cutting Table',
    description: 'Professional manual cutting table with breaking bar.',
    category: 'Cutting',
    subcategory: 'Manual',
    price: 125000,
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '3200 x 2200 mm',
      weight: '400 kg',
      material: 'Aluminum Frame',
      features: ['Air cushion', 'Breaking bar', 'Measurement system'],
    },
    stock: 12,
    sku: 'PST-MAN-007',
    isActive: true,
    tags: ['glass', 'cutting', 'manual'],
  },
  {
    _id: '8',
    name: 'Double Glazing Line',
    description: 'Complete insulated glass production line.',
    category: 'Cutting',
    subcategory: 'Production Line',
    price: 1250000,
    discountPrice: 1150000,
    images: [
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '15000 x 3000 mm',
      weight: '8500 kg',
      material: 'Industrial Steel',
      features: ['Gas filling', 'Sealing robot', 'Quality control'],
    },
    stock: 1,
    sku: 'PST-DGL-008',
    isActive: true,
    tags: ['glass', 'double glazing', 'production'],
  },
  {
    _id: '9',
    name: 'Glass Tempering Furnace',
    description: 'Horizontal tempering furnace for safety glass.',
    category: 'Drilling',
    subcategory: 'Tempering',
    price: 2800000,
    images: [
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '8000 x 4000 mm',
      weight: '15000 kg',
      material: 'Heat-resistant Steel',
      features: ['Convection heating', 'Quench system', 'PLC control'],
    },
    stock: 1,
    sku: 'PST-TEMP-009',
    isActive: true,
    tags: ['glass', 'tempering', 'furnace'],
  },
  {
    _id: '10',
    name: 'Corner Grinding Machine',
    description: 'Specialized machine for glass corner processing.',
    category: 'Polishing',
    subcategory: 'Grinding',
    price: 165000,
    images: [
      'https://images.unsplash.com/photo-1609205807107-e8ec0120f9de?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '1200 x 800 mm',
      weight: '350 kg',
      material: 'Cast Iron Base',
      features: ['Diamond tools', 'Water cooling', 'Dust extraction'],
    },
    stock: 6,
    sku: 'PST-CRN-010',
    isActive: true,
    tags: ['glass', 'corner', 'grinding'],
  },
  {
    _id: '11',
    name: 'Glass Laminating Line',
    description: 'Automated laminating line for safety glass production.',
    category: 'Cutting',
    subcategory: 'Laminating',
    price: 980000,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '12000 x 2500 mm',
      weight: '6500 kg',
      material: 'Industrial Grade Steel',
      features: ['PVB application', 'Pre-pressing', 'Autoclave ready'],
    },
    stock: 2,
    sku: 'PST-LAM-011',
    isActive: true,
    tags: ['glass', 'laminating', 'safety'],
  },
  {
    _id: '12',
    name: 'Portable Glass Suction Lifter',
    description: 'Battery-powered vacuum lifter for glass handling.',
    category: 'Drilling',
    subcategory: 'Handling',
    price: 45000,
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1200&auto=format&fit=crop',
    ],
    specifications: {
      dimensions: '600 x 400 mm',
      weight: '25 kg',
      material: 'Aluminum',
      features: ['Battery powered', '500kg capacity', 'Safety alarm'],
    },
    stock: 15,
    sku: 'PST-LIFT-012',
    isActive: true,
    tags: ['glass', 'lifting', 'portable'],
  },
];

// Very small in-memory mock orders for admin demo
let mockOrders = [
  {
    _id: 'o1',
    orderNumber: 'PST-1001',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [ { productId: '1', quantity: 1, price: 420000, name: 'CNC Glass Cutting Table' } ],
    totalAmount: 420000,
    orderStatus: 'Pending',
    paymentStatus: 'unpaid',
  },
  {
    _id: 'o2',
    orderNumber: 'PST-1002',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [ { productId: '2', quantity: 1, price: 299000, name: 'Glass Edge Polishing Machine' } ],
    totalAmount: 299000,
    orderStatus: 'Processing',
    paymentStatus: 'unpaid',
  },
]

const mockDataMiddleware = (req, res, next) => {
  // If MongoDB is not connected, use mock data
  if (process.env.USE_MOCK_DATA === 'true') {
    // Products list
    if (req.path === '/api/products' && req.method === 'GET') {
      return res.json({
        items: mockProducts,
        total: mockProducts.length,
        page: 1,
        pages: 1
      });
    }
    // Create product
    if (req.path === '/api/products' && req.method === 'POST') {
      const body = req.body || {}
      const newProd = {
        _id: Date.now().toString(),
        name: body.name || 'New Product',
        description: body.description || '',
        category: body.category || 'General',
        price: Number(body.price) || 0,
        discountPrice: body.discountPrice ? Number(body.discountPrice) : undefined,
        images: Array.isArray(body.images) ? body.images : [],
        stock: Number(body.stock) || 0,
        sku: body.sku || undefined,
        isActive: true,
      }
      mockProducts.unshift(newProd)
      return res.status(201).json({ product: newProd })
    }
    // Update product
    if (req.path.startsWith('/api/products/') && req.method === 'PUT') {
      const id = req.path.split('/').pop();
      const idx = mockProducts.findIndex(p => p._id === id)
      if (idx === -1) return res.status(404).json({ message: 'Product not found' })
      mockProducts[idx] = { ...mockProducts[idx], ...req.body }
      return res.json({ product: mockProducts[idx] })
    }
    // Delete product
    if (req.path.startsWith('/api/products/') && req.method === 'DELETE') {
      const id = req.path.split('/').pop();
      const idx = mockProducts.findIndex(p => p._id === id)
      if (idx === -1) return res.status(404).json({ message: 'Product not found' })
      const [removed] = mockProducts.splice(idx, 1)
      return res.json({ product: removed })
    }
    if (req.path.startsWith('/api/products/') && req.method === 'GET') {
      const id = req.path.split('/').pop();
      const product = mockProducts.find(p => p._id === id);
      if (product) {
        return res.json({ product });
      }
      return res.status(404).json({ message: 'Product not found' });
    }
    // Orders mock
    if (req.path === '/api/orders' && req.method === 'GET') {
      return res.json({ orders: mockOrders })
    }
    if (req.path === '/api/orders/admin/all' && req.method === 'GET') {
      return res.json({ orders: mockOrders })
    }
    if (req.path.startsWith('/api/orders/') && req.method === 'PUT') {
      const id = req.path.split('/').pop();
      const idx = mockOrders.findIndex(o => o._id === id)
      if (idx === -1) return res.status(404).json({ message: 'Order not found' })
      mockOrders[idx] = { ...mockOrders[idx], ...req.body }
      return res.json({ order: mockOrders[idx] })
    }
    if (req.path.startsWith('/api/orders/') && req.method === 'GET') {
      const id = req.path.split('/').pop();
      const order = mockOrders.find(o => o._id === id)
      if (!order) return res.status(404).json({ message: 'Order not found' })
      return res.json({ order })
    }
  }
  next();
};

module.exports = mockDataMiddleware;
