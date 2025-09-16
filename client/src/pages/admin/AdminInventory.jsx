import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminInventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    setError('')
    api.get('/api/products')
      .then(res => setItems(res.data.items || res.data.products || []))
      .catch(err => setError(err?.response?.data?.message || 'Failed to load inventory'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const updateStock = async (id, newStock) => {
    try {
      await api.put(`/api/products/${id}`, { stock: Number(newStock) })
      load()
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to update stock')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>
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
    </div>
  )
}


