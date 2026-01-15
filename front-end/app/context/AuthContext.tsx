"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { useRouter } from "next/navigation"
import { api } from "../lib/api"
import { UserType } from "../lib/userType"

interface AuthContextType {
  user: UserType | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  const setToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  const removeToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      delete api.defaults.headers.common['Authorization']
    }
  }

  const fetchUser = async () => {
    const token = getToken()
    if (!token) {
      return false
    }

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const res = await api.get("/user")
      setUser(res.data)
      return true
    } catch (err: any) {
      setUser(null)
      removeToken()
      return false
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      const token = getToken()
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      await fetchUser()
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      console.log("Attempting login...")
      const loginRes = await api.post("/login", { email, password })
      console.log("Login response:", loginRes.status, loginRes.data)
      
      const token = loginRes.data.token || loginRes.data.access_token
      if (!token) {
        throw new Error("No token received from login response")
      }
      
      setToken(token)
      
      const success = await fetchUser()
      if (success) {
        router.push("/dashboard")
      } else {
        removeToken()
        throw new Error("Failed to fetch user after login")
      }
    } catch (err: any) {
      setUser(null)
      removeToken()
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await api.post("/logout")
    } catch {
    } finally {
      setUser(null)
      removeToken()
      router.push("/login")
    }
  }

  const hasRole = useCallback(
    (role: string) => user?.roles.includes(role) ?? false,
    [user]
  )
  
  const hasPermission = useCallback(
    (permission: string) => user?.permissions.includes(permission) ?? false,
    [user]
  )

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, hasRole, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
