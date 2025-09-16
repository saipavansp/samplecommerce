import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const load = () => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams()
    if (status) params.append('status', status)
    if (q) params.append('q', q)
    if (from) params.append('from', from)
    if (to) params.append('to', to)
    // Admin: fetch all orders
    api.get(`/api/orders/admin/all${params.toString() ? '?' + params.toString() : ''}`)
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
        <div className="flex items-center gap-2 flex-wrap">
          <select className="w-40" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="">All Status</option>
            {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <input className="w-64" placeholder="Search order #" value={q} onChange={(e)=>setQ(e.target.value)} />
          <input type="date" className="w-40" value={from} onChange={e=>setFrom(e.target.value)} />
          <input type="date" className="w-40" value={to} onChange={e=>setTo(e.target.value)} />
          <button className="btn btn-secondary btn-sm" onClick={load}>Filter</button>
        </div>
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
                    <div className="inline-flex gap-2">
                      <button className="btn btn-secondary btn-sm" onClick={()=>setSelected(o)}>View / Manage</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow w-full max-w-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Order #{selected.orderNumber || selected._id?.slice(-6)}</h3>
                <p className="text-sm text-gray-600">{new Date(selected.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={()=>setSelected(null)}>Close</button>
            </div>
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Items</h4>
                <div className="bg-gray-50 rounded p-3">
                  {selected.items?.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 text-sm border-b last:border-0">
                      <span>{it.name} × {it.quantity}</span>
                      <span>₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <div className="space-y-2">
                  {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s=> (
                    <button key={s} className={`w-full btn btn-secondary ${selected.orderStatus===s?'border-primary-600':''}`} onClick={()=>updateStatus(selected._id, s)}>{s}</button>
                  ))}
                </div>
                <div className="mt-4 bg-gray-50 rounded p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total</span>
                    <span className="font-semibold">₹{(selected.totalAmount || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Timeline</h4>
                  <ul className="text-sm text-gray-600 bg-gray-50 rounded p-3 space-y-1">
                    <li>Created: {new Date(selected.createdAt).toLocaleString('en-IN')}</li>
                    <li>Current Status: {selected.orderStatus || 'Pending'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


