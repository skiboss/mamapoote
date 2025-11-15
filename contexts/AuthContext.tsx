"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  joinedDate?: string
  role?: "user" | "admin"
  preferences?: {
    dietaryRestrictions: string[]
    favoriteCategories: string[]
    spiceLevel: number
  }
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
  loading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("mamapoote_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock authentication - replace with actual API call
      const mockUser: User = {
        id: "1",
        name: "durrrr",
        email: email,
        // avatar: "/smiling-african-man.jpg",
        phone: "+234 123 456 7890",
        joinedDate: "2024-01-15",
        role: email === "admin@mamapoote.com" ? "admin" : "user",
        preferences: {
          dietaryRestrictions: [],
          favoriteCategories: ["Main Course", "Soup"],
          spiceLevel: 3,
        },
      }

      setUser(mockUser)
      localStorage.setItem("mamapoote_user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        // avatar: "/smiling-african-man.jpg",
        phone: "",
        joinedDate: new Date().toISOString().split("T")[0],
        role: "user",
        preferences: {
          dietaryRestrictions: [],
          favoriteCategories: [],
          spiceLevel: 2,
        },
      }

      setUser(mockUser)
      localStorage.setItem("mamapoote_user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error("No user logged in")

    setLoading(true)
    try {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("mamapoote_user", JSON.stringify(updatedUser))
    } catch (error) {
      throw new Error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("mamapoote_user")
  }
  
  // const isAdmin = user?.role === "admin"
  const isAdmin = "true" === "true"  // Temporary for testing admin features

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateProfile, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
