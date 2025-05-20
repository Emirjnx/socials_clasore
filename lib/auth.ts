// Bu dosya gerçek bir backend olmadan kimlik doğrulama işlemlerini simüle etmek için kullanılır
// Gerçek bir uygulamada, bu işlemler bir backend API'si ile yapılmalıdır

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  balance: number
  package: "free" | "bronze" | "silver" | "gold"
  packageExpiry: string | null
}

type AuthState = {
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

// Demo kullanıcıları
const demoUsers = [
  {
    id: "1",
    name: "Demo Kullanıcı",
    email: "demo@example.com",
    password: "password123",
    role: "user" as const,
    balance: 500,
    package: "free" as const,
    packageExpiry: null,
  },
  {
    id: "2",
    name: "Admin Kullanıcı",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as const,
    balance: 1000,
    package: "gold" as const,
    packageExpiry: "2025-12-31",
  },
]

// Paket fiyatları
const packagePrices = {
  free: 0,
  bronze: 99,
  silver: 199,
  gold: 349,
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Demo login işlemi
        console.log("Login attempt:", email, password) // Debug için

        const user = demoUsers.find((u) => u.email === email && u.password === password)

        if (user) {
          const { password, ...userWithoutPassword } = user
          console.log("User found:", userWithoutPassword) // Debug için
          set({ user: userWithoutPassword, isAuthenticated: true })
          return { success: true }
        }

        console.log("Login failed: User not found") // Debug için
        return {
          success: false,
          message: "Geçersiz e-posta veya şifre",
        }
      },
      register: async (name: string, email: string, password: string, packageType: string) => {
        // E-posta kontrolü
        if (demoUsers.some((u) => u.email === email)) {
          return {
            success: false,
            message: "Bu e-posta adresi zaten kullanılıyor",
          }
        }

        // Yeni kullanıcı oluştur
        const newUser = {
          id: `${Date.now()}`, // Benzersiz ID oluştur
          name,
          email,
          password, // Gerçek uygulamada şifre hash'lenmeli
          role: "user" as const,
          balance: 0,
          package: packageType as "free" | "bronze" | "silver" | "gold",
          packageExpiry: packageType === "free" ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }

        // Kullanıcıyı kaydet (gerçek uygulamada veritabanına kaydedilir)
        // Burada sadece state'e kaydediyoruz
        demoUsers.push(newUser)

        // Şifre olmadan kullanıcı bilgilerini döndür
        const { password: _, ...userWithoutPassword } = newUser

        // Kullanıcıyı oturum açık olarak ayarla
        set({ user: userWithoutPassword, isAuthenticated: true })

        return { success: true }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      addBalance: (amount: number) => {
        set((state) => {
          if (!state.user) return state

          return {
            user: {
              ...state.user,
              balance: state.user.balance + amount,
            },
          }
        })
      },
      purchasePackage: async (packageType: string, months = 1) => {
        const { user } = get()

        if (!user) {
          return {
            success: false,
            message: "Oturum açmanız gerekiyor",
          }
        }

        const packagePrice = packagePrices[packageType as keyof typeof packagePrices] * months

        if (user.balance < packagePrice) {
          return {
            success: false,
            message: "Yetersiz bakiye",
          }
        }

        // Paketi satın al
        const expiryDate = new Date()
        expiryDate.setMonth(expiryDate.getMonth() + months)

        set({
          user: {
            ...user,
            balance: user.balance - packagePrice,
            package: packageType as "free" | "bronze" | "silver" | "gold",
            packageExpiry: expiryDate.toISOString(),
          },
        })

        return { success: true }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
