import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n)

export default function Cart() {
  const { items, updateQty, remove, clear } = useCart()
  const navigate = useNavigate()
  
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const tax = subtotal * 0.18 // 18% GST
  const shipping = subtotal > 10000 ? 0 : 500 // Free shipping above ₹10,000
  const total = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-3xl">📦</span>
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600">{formatINR(item.price)}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.productId, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 rounded border hover:bg-gray-100 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.productId, item.quantity + 1)}
                    className="w-8 h-8 rounded border hover:bg-gray-100 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                
                {/* Item Total */}
                <div className="text-right min-w-[100px]">
                  <p className="font-semibold">{formatINR(item.price * item.quantity)}</p>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => remove(item.productId)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            
            {/* Clear Cart Button */}
            <div className="p-4">
              <button
                onClick={clear}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (GST 18%)</span>
                <span>{formatINR(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'FREE' : formatINR(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-gray-500">
                  Free shipping on orders above {formatINR(10000)}
                </p>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary-600">{formatINR(total)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn btn-primary mb-3"
            >
              Proceed to Checkout
            </button>
            
            <Link to="/products" className="block text-center text-primary-600 hover:text-primary-700">
              Continue Shopping
            </Link>
          </div>
          
          {/* Promo Code */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h3 className="font-semibold mb-3">Have a promo code?</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 border rounded px-3 py-2"
              />
              <button className="btn btn-secondary">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}