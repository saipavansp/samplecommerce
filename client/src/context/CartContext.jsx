import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    } catch {
      return []
    }
  })

  const persist = (next) => {
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const add = (product, quantity = 1) => {
    const existing = items.find((i) => i.productId === product._id)
    let next
    if (existing) {
      next = items.map((i) => (i.productId === product._id ? { ...i, quantity: i.quantity + quantity } : i))
    } else {
      next = [
        ...items,
        {
          productId: product._id,
          name: product.name,
          price: product.discountPrice || product.price,
          image: product.images?.[0],
          quantity,
        },
      ]
    }
    persist(next)
  }

  const remove = (productId) => persist(items.filter((i) => i.productId !== productId))
  const updateQty = (productId, quantity) => persist(items.map((i) => (i.productId === productId ? { ...i, quantity } : i)))
  const clear = () => persist([])

  const value = useMemo(() => ({ items, add, remove, updateQty, clear }), [items])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}


