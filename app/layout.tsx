import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { ThemeCustomizer } from "@/components/theme-customizer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SocialPro Studio - Instagram İçerik Yönetimi",
  description:
    "Instagram hesabınızı analiz edin, içeriklerinizi planlayın, görsellerinizi tasarlayın ve etkileşiminizi artırın.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-poppins`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <ThemeCustomizer />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
