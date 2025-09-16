import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  const load = () => {
    setLoading(true)
    setError('')
    // Admin: fetch all orders
    api.get('/api/orders/admin/all')
      .then(res => setOrders(res.data.orders || res.data || []))
      .catch(err => setError(err?.response?.data?.message || 'Failed to load orders'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const updateStatus = async (orderId, orderStatus) => {
    try {
      await api.put(`/api/orders/${orderId}`, { orderStatus })
      setSelected(null)
      load()
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to update status')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
      </div>
      {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Order #</th>
              <th className="p-3">Date</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan={6}>Loading…</td></tr>
            ) : orders.length === 0 ? (
              <tr><td className="p-3" colSpan={6}>No orders</td></tr>
            ) : (
              orders.map(o => (
                <tr key={o._id} className="border-t">
                  <td className="p-3">{o.orderNumber || o._id?.slice(-6)}</td>
                  <td className="p-3">{new Date(o.createdAt).toLocaleString('en-IN')}</td>
                  <td className="p-3">{o.items?.reduce((s,i)=>s+i.quantity,0)}</td>
                  <td className="p-3">₹{(o.totalAmount || 0).toLocaleString('en-IN')}</td>
                  <td className="p-3">{o.orderStatus || 'Pending'}</td>
                  <td className="p-3 text-right">
                    <button className="btn btn-secondary btn-sm" onClick={()=>setSelected(o)}>Manage</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Update Status</h3>
            <p className="text-sm text-gray-600 mb-3">Order #{selected.orderNumber || selected._id?.slice(-6)}</p>
            <div className="space-y-2">
              {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s=> (
                <button key={s} className="w-full btn btn-secondary" onClick={()=>updateStatus(selected._id, s)}>{s}</button>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button className="btn btn-primary" onClick={()=>setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


