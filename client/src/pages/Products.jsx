import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../services/api'
import { useCart } from '../context/CartContext'

const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n)

export default function Products() {
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const { add } = useCart()
  
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.append('q', searchQuery)
    
    api
      .get(`/api/products${params.toString() ? '?' + params.toString() : ''}`)
      .then((res) => setItems(res.data.items || res.data.products || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [searchQuery])

  const categories = ['All', 'Cutting', 'Polishing', 'Drilling']
  
  const filteredItems = items.filter(item => 
    !selectedCategory || selectedCategory === 'All' || item.category === selectedCategory
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'priceLow') return (a.discountPrice || a.price) - (b.discountPrice || b.price)
    if (sortBy === 'priceHigh') return (b.discountPrice || b.price) - (a.discountPrice || a.price)
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0 // newest (default)
  })

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="spinner mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Our Products</h1>
          <p className="text-lg text-primary-100">Professional glass processing equipment</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-700 font-medium self-center mr-1 text-sm">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    (cat === 'All' && !selectedCategory) || selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium text-sm">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 text-sm rounded-lg border border-gray-300 focus:border-primary-500"
              >
                <option value="newest">Newest</option>
                <option value="name">Name</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{sortedItems.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {sortedItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-12">
            {sortedItems.map((product) => (
              <div key={product._id} className="group card card-hover">
                <Link to={`/products/${product._id}`} className="block">
                  <div className="h-36 overflow-hidden bg-gray-100 relative">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-5xl">📦</span>
                      </div>
                    )}
                    {product.discountPrice && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </div>
                    )}
                  </div>
                </Link>
                
                <div className="p-3">
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-xs mb-2 line-clamp-1">{product.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      {product.discountPrice ? (
                        <>
                          <span className="text-base font-bold text-primary-600">
                            {formatINR(product.discountPrice)}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            {formatINR(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-bold text-primary-600">
                          {formatINR(product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => add(product, 1)}
                      className="flex-1 btn btn-sm btn-primary"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-sm btn-secondary"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}