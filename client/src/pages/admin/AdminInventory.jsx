import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminInventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [logs, setLogs] = useState([])
  const [showBulk, setShowBulk] = useState(false)
  const [csv, setCsv] = useState('')

  const load = () => {
    setLoading(true)
    setError('')
    api.get('/api/products')
      .then(res => setItems(res.data.items || res.data.products || []))
      .catch(err => setError(err?.response?.data?.message || 'Failed to load inventory'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const loadLogs = () => {
    api.get('/api/inventory/logs?limit=50').then(res => setLogs(res.data.logs || []))
  }

  const updateStock = async (id, newStock) => {
    try {
      await api.put(`/api/products/${id}`, { stock: Number(newStock) })
      load(); loadLogs()
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to update stock')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary btn-sm" onClick={()=>{load();loadLogs()}}>Refresh</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setShowBulk(true)}>Bulk Adjust (CSV)</button>
        </div>
      </div>
      {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Product</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Stock</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan={4}>Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="p-3" colSpan={4}>No products</td></tr>
            ) : (
              items.map(p => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.sku || '-'}</td>
                  <td className="p-3">{p.stock ?? 0}</td>
                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2 items-center">
                      <input type="number" min="0" defaultValue={p.stock ?? 0} className="w-24" id={`stock-${p._id}`} />
                      <button className="btn btn-secondary btn-sm" onClick={()=>updateStock(p._id, document.getElementById(`stock-${p._id}`).value)}>
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Change Logs */}
      <div className="bg-white rounded-lg shadow mt-4">
        <div className="p-3 border-b"><h3 className="font-semibold">Recent Stock Changes</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-3">When</th>
                <th className="p-3">Product</th>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Δ</th>
                <th className="p-3">Reason</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr><td className="p-3" colSpan={6}>No recent changes</td></tr>
              ) : (
                logs.map(l => (
                  <tr key={l.id} className="border-t">
                    <td className="p-3">{new Date(l.at).toLocaleString('en-IN')}</td>
                    <td className="p-3">{l.name}</td>
                    <td className="p-3">{l.from}</td>
                    <td className="p-3">{l.to}</td>
                    <td className="p-3">{l.delta > 0 ? `+${l.delta}` : l.delta}</td>
                    <td className="p-3">{l.reason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Adjust Modal */}
      {showBulk && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
            <h3 className="text-lg font-semibold mb-2">Bulk Adjust (CSV)</h3>
            <p className="text-sm text-gray-600 mb-3">Format: id,delta per line (e.g., 1,5)</p>
            <textarea className="w-full h-40" placeholder={"1,5\n2,-3"} value={csv} onChange={e=>setCsv(e.target.value)} />
            <div className="mt-3 text-right flex gap-2 justify-end">
              <button className="btn btn-secondary" onClick={()=>setShowBulk(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={async()=>{ await api.post('/api/inventory/bulk',{csv}); setCsv(''); setShowBulk(false); load(); loadLogs() }}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


