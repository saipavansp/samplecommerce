import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useCart } from '../context/CartContext'

const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n)

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then(res => setProduct(res.data.product))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="spinner mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    add(product, quantity)
    // Show success message or redirect to cart
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="text-gray-600 hover:text-primary-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {product.images?.[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center">
                <span className="text-6xl text-gray-400">📦</span>
              </div>
            )}
          </div>
          
          {/* Image Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-primary-600' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            {/* Price */}
            <div className="mb-4">
              {product.discountPrice ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatINR(product.discountPrice)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {formatINR(product.price)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary-600">
                  {formatINR(product.price)}
                </span>
              )}
            </div>

            {/* SKU and Stock */}
            <div className="flex gap-4 text-sm text-gray-600 mb-4">
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="btn btn-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category and Tags */}
          <div className="border-t pt-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Category:</span>
              <Link to={`/products?category=${product.category}`} className="badge badge-primary">
                {product.category}
              </Link>
            </div>
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-sm text-gray-600">Tags:</span>
                {product.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && (
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.dimensions && (
              <div className="flex border-b pb-3">
                <span className="font-medium w-32">Dimensions:</span>
                <span className="text-gray-600">{product.specifications.dimensions}</span>
              </div>
            )}
            {product.specifications.weight && (
              <div className="flex border-b pb-3">
                <span className="font-medium w-32">Weight:</span>
                <span className="text-gray-600">{product.specifications.weight}</span>
              </div>
            )}
            {product.specifications.material && (
              <div className="flex border-b pb-3">
                <span className="font-medium w-32">Material:</span>
                <span className="text-gray-600">{product.specifications.material}</span>
              </div>
            )}
            {product.specifications.features?.length > 0 && (
              <div className="flex border-b pb-3 md:col-span-2">
                <span className="font-medium w-32">Features:</span>
                <ul className="text-gray-600 list-disc list-inside">
                  {product.specifications.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
