import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminProducts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '', description: '', category: '', price: '', discountPrice: '', images: '', stock: '', sku: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const load = () => {
    setLoading(true)
    api.get('/api/products')
      .then(res => setItems(res.data.items || res.data.products || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category.trim() || 'General',
        price: Number(form.price) || 0,
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
        stock: Number(form.stock) || 0,
        sku: form.sku.trim() || undefined,
      }
      if (editing) {
        await api.put(`/api/products/${editing._id}`, payload)
        setSuccess('Product updated')
      } else {
        await api.post('/api/products', payload)
        setSuccess('Product created')
      }
      setForm({ name: '', description: '', category: '', price: '', discountPrice: '', images: '', stock: '', sku: '' })
      setShowForm(false); setEditing(null)
      load()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create product')
    }
  }

  const onEdit = (p) => {
    setEditing(p)
    setForm({
      name: p.name || '',
      description: p.description || '',
      category: p.category || '',
      price: p.price || '',
      discountPrice: p.discountPrice || '',
      images: Array.isArray(p.images) ? p.images.join(', ') : '',
      stock: p.stock ?? '',
      sku: p.sku || ''
    })
    setShowForm(true)
  }

  const onDelete = async (p) => {
    if (!confirm(`Delete ${p.name}?`)) return
    try {
      await api.delete(`/api/products/${p._id}`)
      load()
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex items-center gap-2">
          <input placeholder="Search products" className="w-56" value={query} onChange={e=>setQuery(e.target.value)} />
          <button className="btn btn-primary btn-sm" onClick={() => { setEditing(null); setShowForm(true) }}>Add Product</button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-3">{editing ? 'Edit Product' : 'Create Product'}</h3>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
            <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
            <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required />
            <input type="number" placeholder="Discount Price" value={form.discountPrice} onChange={e=>setForm({...form,discountPrice:e.target.value})} />
            <input placeholder="SKU" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})} />
            <input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} />
            <div className="md:col-span-2">
              <input placeholder="Image URLs (comma separated)" value={form.images} onChange={e=>setForm({...form,images:e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <textarea placeholder="Description" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="btn btn-primary">{editing ? 'Save' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={()=>{setShowForm(false);setError('');setSuccess('')}}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="p-3" colSpan={4}>Loading…</td></tr>
              ) : items.length === 0 ? (
                <tr><td className="p-3" colSpan={4}>No products</td></tr>
              ) : (
                items.filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()) || (p.category||'').toLowerCase().includes(query.toLowerCase())).map(p => (
                  <tr key={p._id} className="border-t">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">₹{(p.discountPrice || p.price)?.toLocaleString('en-IN')}</td>
                    <td className="p-3">{p.stock ?? '-'}</td>
                    <td className="p-3 text-right">
                      <div className="inline-flex gap-2">
                        <button className="btn btn-secondary btn-sm" onClick={()=>onEdit(p)}>Edit</button>
                        <button className="btn btn-secondary btn-sm" onClick={()=>onDelete(p)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


