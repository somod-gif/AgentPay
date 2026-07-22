"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { api } from "./api"
import type { User } from "@/types"

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  })

  const setToken = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem("agentpay_token", token)
    } else {
      localStorage.removeItem("agentpay_token")
    }
  }, [])

  const refresh = useCallback(async () => {
    const token = localStorage.getItem("agentpay_token")
    if (!token) {
      setState({ user: null, token: null, loading: false })
      return
    }
    try {
      const user = await api.get<User>("/auth/me")
      setState({ user, token, loading: false })
    } catch {
      setToken(null)
      setState({ user: null, token: null, loading: false })
    }
  }, [setToken])

  useEffect(() => {
    const init = async () => { refresh() }
    init()
  }, [refresh])

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<{ accessToken: string; user: User }>("/auth/login", {
      email,
      password,
    })
    setToken(res.accessToken)
    setState({ user: res.user, token: res.accessToken, loading: false })
    return res.user
  }, [setToken])

  const logout = useCallback(() => {
    setToken(null)
    setState({ user: null, token: null, loading: false })
  }, [setToken])

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
