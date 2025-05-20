"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAuth, type User } from "@/lib/auth"

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (
    name: string,
    email: string,
    password: string,
    packageType: string,
  ) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  addBalance: (amount: number) => void
  purchasePackage: (packageType: string, amount: number) => Promise<{ success: boolean; message?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  // Debug için
  console.log("Auth Provider State:", {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user
      ? {
          id: auth.user.id,
          name: auth.user.name,
          email: auth.user.email,
          role: auth.user.role,
        }
      : null,
  })

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }

  return context
}
