// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react"
import { authApi } from "../lib/authApi"

interface AuthContextType {
  user: any
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // ========== LOAD USER ==========
  const loadUser = async () => {
    try {
      const res = await authApi.me()
      setUser(res.data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  // ========== LOGIN ==========
  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password })
    localStorage.setItem("access_token", res.data.accessToken)
    setUser(res.data.user)
  }

  // ========== LOGOUT ==========
  const logout = async () => {
    await authApi.logout()
    localStorage.removeItem("access_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}