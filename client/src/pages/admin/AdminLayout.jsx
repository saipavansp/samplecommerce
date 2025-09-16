import { Link, Outlet, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLayout() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const nav = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/inventory', label: 'Inventory' },
    { to: '/admin/orders', label: 'Orders' },
  ]

  const isActive = (to) => (location.pathname === to)

  return (
    <div className="min-h-screen grid lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block border-r bg-white">
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold">Admin Console</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <nav className="p-3 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`block px-3 py-2 rounded-md text-sm ${
                isActive(n.to)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="bg-gray-50 min-h-screen">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}


