import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return setLoading(false)
    api
      .get('/api/auth/profile')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('token')
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data.user
  }

  const register = async (payload) => {
    const { data } = await api.post('/api/auth/register', payload)
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  // DEV ONLY: quick admin spoof for demo without credentials
  const spoofAdmin = () => {
    const fakeToken = 'demo'
    localStorage.setItem('token', fakeToken)
    setUser({ email: 'admin@demo.local', role: 'admin', firstName: 'Admin', lastName: 'Demo' })
  }

  const value = useMemo(() => ({ user, loading, login, register, logout, spoofAdmin }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


