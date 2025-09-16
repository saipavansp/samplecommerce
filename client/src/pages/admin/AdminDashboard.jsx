import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    setLoading(true)
    setError('')
    Promise.all([
      api.get('/api/products'),
      api.get('/api/orders/admin/all'),
    ])
      .then(([pRes, oRes]) => {
        setProducts(pRes.data.items || pRes.data.products || [])
        setOrders(oRes.data.orders || [])
      })
      .catch((e) => setError(e?.response?.data?.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  const totalRevenue = orders.reduce((s, o) => s + (o.totalAmount || 0), 0)
  const lowStock = products.filter((p) => (p.stock ?? 0) <= 3)
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-6">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-semibold">{loading ? '…' : products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-semibold">{loading ? '…' : orders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Revenue (₹)</p>
          <p className="text-2xl font-semibold">{loading ? '…' : totalRevenue.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Low Stock (≤3)</p>
          <p className="text-2xl font-semibold">{loading ? '…' : lowStock.length}</p>
        </div>
      </div>

      {/* Recent Orders + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b"><h3 className="font-semibold">Recent Orders</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">Order #</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className="p-3" colSpan={4}>Loading…</td></tr>
                ) : recentOrders.length === 0 ? (
                  <tr><td className="p-3" colSpan={4}>No orders yet</td></tr>
                ) : (
                  recentOrders.map((o) => (
                    <tr key={o._id} className="border-t">
                      <td className="p-3">{o.orderNumber || o._id?.slice(-6)}</td>
                      <td className="p-3">{new Date(o.createdAt).toLocaleString('en-IN')}</td>
                      <td className="p-3">₹{(o.totalAmount || 0).toLocaleString('en-IN')}</td>
                      <td className="p-3">{o.orderStatus || 'Pending'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b"><h3 className="font-semibold">Low Stock</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">Product</th>
                  <th className="p-3">Stock</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className="p-3" colSpan={2}>Loading…</td></tr>
                ) : lowStock.length === 0 ? (
                  <tr><td className="p-3" colSpan={2}>All good</td></tr>
                ) : (
                  lowStock.slice(0, 8).map((p) => (
                    <tr key={p._id} className="border-t">
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.stock ?? 0}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


