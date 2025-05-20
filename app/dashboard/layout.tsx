"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { useState, useEffect } from "react"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated } = useAuthContext()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Sadece client tarafında çalıştır
    if (mounted) {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      if (!isAuthenticated || !user) {
        router.push("/login")
      }

      // Admin kullanıcısı admin paneline yönlendirilmeli
      if (user?.role === "admin") {
        router.push("/admin")
      }
    }
  }, [isAuthenticated, user, router, mounted])

  // Sayfa yüklenene kadar veya kimlik doğrulama yapılana kadar bir şey gösterme
  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="md:hidden mr-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 py-4 font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg font-bold">SocialPro Studio</span>
                </Link>
                <DashboardNav className="flex flex-col gap-2" />
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold mr-6">
            <span className="text-lg font-bold hidden md:inline-block">SocialPro Studio</span>
            <span className="text-lg font-bold md:hidden">SPS</span>
          </Link>
          <div className="hidden md:flex">
            <DashboardNav className="flex gap-6 mx-6" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex-1 container grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <aside className="hidden md:flex flex-col gap-6 border-r pr-6 pt-6">
          <DashboardNav className="flex flex-col gap-2" />
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
