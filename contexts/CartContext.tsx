"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  price: string
  image: string
  // description: string
  quantity: number
  customizations?: {
    removedIngredients: string[]
    specialInstructions?: string
    selectedProtein?: string
    selectedSides?: string[]
    basePrice?: number
    proteinPrice?: number
    sidesPrice?: number
  }
  soupCustomizations?: {
    selectedProtein?: string
    proteinQuantity?: number
    selectedSwallow?: string
    swallowQuantity?: number
  }
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | {
      type: "UPDATE_CUSTOMIZATIONS"
      payload: { id: string; customizations: { removedIngredients: string[]; specialInstructions?: string } }
    }
  | {
      type: "UPDATE_SOUP_CUSTOMIZATIONS"
      payload: {
        id: string
        soupCustomizations: {
          selectedProtein?: string
          proteinQuantity?: number
          selectedSwallow?: string
          swallowQuantity?: number
        }
      }
    }
  | { type: "CLEAR_CART" }

interface CartContextType {
  items: CartItem[]
  total: number
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateCartItemCustomizations?: (
    id: string,
    customizations: { removedIngredients: string[]; specialInstructions?: string },
  ) => void
  updateSoupCustomizations?: (
    id: string,
    soupCustomizations: {
      selectedProtein?: string
      proteinQuantity?: number
      selectedSwallow?: string
      swallowQuantity?: number
    },
  ) => void
  clearCart: () => void
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += action.payload.quantity
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        }
      }

      const newItems = [...state.items, action.payload]
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems),
      }
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
        .filter((item) => item.quantity > 0)

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }
    }

    case "UPDATE_CUSTOMIZATIONS": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, customizations: action.payload.customizations } : item,
      )
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }
    }

    case "UPDATE_SOUP_CUSTOMIZATIONS": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, soupCustomizations: action.payload.soupCustomizations } : item,
      )
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
      }

    default:
      return state
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace("$", ""))
    // return total + price * item.quantity
    let itemTotal = price * item.quantity

    if (item.customizations) {
      if (item.customizations.basePrice !== undefined) {
        itemTotal = item.customizations.basePrice * item.quantity
      }
      if (item.customizations.proteinPrice !== undefined) {
        itemTotal += item.customizations.proteinPrice * item.quantity
      }
      if (item.customizations.sidesPrice !== undefined) {
        itemTotal += item.customizations.sidesPrice * item.quantity
      }
    }

    return total + itemTotal
  }, 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item, quantity: 1 },
    })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const updateCartItemCustomizations = (
    id: string,
    customizations: { removedIngredients: string[]; specialInstructions?: string },
  ) => {
    dispatch({ type: "UPDATE_CUSTOMIZATIONS", payload: { id, customizations } })
  }

  const updateSoupCustomizations = (
    id: string,
    soupCustomizations: {
      selectedProtein?: string
      proteinQuantity?: number
      selectedSwallow?: string
      swallowQuantity?: number
    },
  ) => {
    dispatch({ type: "UPDATE_SOUP_CUSTOMIZATIONS", payload: { id, soupCustomizations } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addItem,
        removeItem,
        updateQuantity,
        updateCartItemCustomizations,
        updateSoupCustomizations,
        clearCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
