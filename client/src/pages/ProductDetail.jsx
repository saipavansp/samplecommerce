import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../services/api'
import { useCart } from '../context/CartContext'

const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n)

export default function ProductDetail() {
  const { id } = useParams()
  const { add } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setLoading(true)
    api.get(`/api/products/${id}`)
      .then(res => setProduct(res.data.product))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-4-5 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="h-44 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
        <Link to="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    )
  }

  const priceBlock = (
    <div className="flex items-center gap-3">
      {product.discountPrice ? (
        <>
          <span className="text-2xl font-semibold text-gray-900">{formatINR(product.discountPrice)}</span>
          <span className="text-sm text-gray-500 line-through">{formatINR(product.price)}</span>
          <span className="badge badge-danger">{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF</span>
        </>
      ) : (
        <span className="text-2xl font-semibold text-gray-900">{formatINR(product.price)}</span>
      )}
    </div>
  )

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4 text-gray-600">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Media */}
        <div>
          <div className="aspect-4-5 bg-gray-100 rounded-xl overflow-hidden">
            {product.images?.[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">📦</div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`thumb-wrapper w-20 h-20 rounded-lg border ${selectedImage === i ? 'border-primary-600' : 'border-gray-200'}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2 text-gray-900">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {priceBlock}

          <div className="text-sm text-gray-600 space-x-3">
            {product.sku && <span>SKU: {product.sku}</span>}
            {product.category && <span>• Category: {product.category}</span>}
            {typeof product.stock === 'number' && (
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
              </span>
            )}
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center border rounded">
                <button className="px-3 py-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <input className="w-16 text-center border-l border-r" type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                <button className="px-3 py-2" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="btn btn-primary flex-1"
                disabled={product.stock === 0}
                onClick={() => add(product, quantity)}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="btn btn-secondary">Wishlist</button>
            </div>
          </div>

          {product.specifications && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                {product.specifications.dimensions && <div><span className="font-medium">Dimensions:</span> {product.specifications.dimensions}</div>}
                {product.specifications.weight && <div><span className="font-medium">Weight:</span> {product.specifications.weight}</div>}
                {product.specifications.material && <div><span className="font-medium">Material:</span> {product.specifications.material}</div>}
                {Array.isArray(product.specifications.features) && product.specifications.features.length > 0 && (
                  <div className="md:col-span-2">
                    <span className="font-medium">Features:</span>
                    <ul className="list-disc ml-5 mt-1">
                      {product.specifications.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}