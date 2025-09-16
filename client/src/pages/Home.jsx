import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n)

export default function Home() {
  const { spoofAdmin } = useAuth()
  const [featuredProducts, setFeaturedProducts] = useState([])
  
  useEffect(() => {
    api.get('/api/products?limit=4').then(res => setFeaturedProducts(res.data.items)).catch(() => {})
  }, [])

  const categories = [
    {
      name: 'Cutting Equipment',
      description: 'Precision glass cutting solutions',
      icon: '✂️',
      color: 'from-primary-500 to-primary-700',
    },
    {
      name: 'Polishing Machines',
      description: 'Professional edge finishing',
      icon: '✨',
      color: 'from-primary-600 to-primary-800',
    },
    {
      name: 'Drilling Systems',
      description: 'Automated drilling technology',
      icon: '🔧',
      color: 'from-primary-700 to-primary-900',
    },
  ]

  const features = [
    {
      title: 'Premium Quality',
      description: 'Industrial-grade equipment built to last',
      icon: '🏆',
    },
    {
      title: 'Expert Support',
      description: '24/7 technical assistance and training',
      icon: '🛠️',
    },
    {
      title: 'Fast Delivery',
      description: 'Quick shipping across India',
      icon: '🚚',
    },
    {
      title: 'Warranty',
      description: 'Comprehensive warranty coverage',
      icon: '🛡️',
    },
  ]

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Industrial Glass Processing Excellence
            </h1>
            <p className="text-lg md:text-xl mb-6 text-primary-100">
              Cutting-edge equipment for glass cutting, polishing, and drilling operations
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/products" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Browse Products
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700">
                Get Quote
              </Link>
              <button onClick={spoofAdmin} className="btn btn-secondary">
                Admin (demo)
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Equipment Categories</h2>
            <p className="text-lg text-gray-600">Comprehensive solutions for glass processing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <Link
                key={idx}
                to={`/products?category=${category.name}`}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`}></div>
                <div className="relative p-6 text-white">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-primary-100 text-sm">{category.description}</p>
                  <div className="mt-3 inline-flex items-center text-white group-hover:translate-x-2 transition-transform">
                    <span className="text-sm">Explore</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Featured Equipment</h2>
              <p className="text-lg text-gray-600">Our best-selling industrial solutions</p>
            </div>
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group card card-hover"
                >
                  <div className="thumb-wrapper">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-5xl">📦</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        {product.discountPrice ? (
                          <>
                            <span className="text-lg font-bold text-primary-600">
                              {formatINR(product.discountPrice)}
                            </span>
                            <span className="text-xs text-gray-500 line-through ml-1">
                              {formatINR(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-primary-600">
                            {formatINR(product.price)}
                          </span>
                        )}
                      </div>
                      <span className="text-primary-600 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/products" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Perfect Score?</h2>
            <p className="text-xl text-gray-600">Industry-leading glass processing solutions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-4 text-4xl bg-white rounded-full shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upgrade Your Operations?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Get expert consultation and competitive pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn btn-lg bg-white text-primary-700 hover:bg-gray-100">
              Request Quote
            </Link>
            <a href="tel:+911234567890" className="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-700">
              Call Now: +91 123 456 7890
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
