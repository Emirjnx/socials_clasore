"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Kullanıcı giriş yapmışsa dashboard'a, yapmamışsa ana sayfaya yönlendir
  const getLogoLink = () => {
    if (pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password")) {
      return "/"
    }
    return pathname
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={getLogoLink()} className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="SocialPro Studio"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="text-lg font-bold">SocialPro Studio</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Özellikler
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            Nasıl Çalışır
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Paketler
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Yorumlar
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">
            SSS
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Giriş Yap</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Ücretsiz Dene</Link>
          </Button>
        </div>
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="#features"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Özellikler
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Nasıl Çalışır
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Paketler
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Yorumlar
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  SSS
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/login">Giriş Yap</Link>
                  </Button>
                  <Button asChild onClick={() => setIsOpen(false)}>
                    <Link href="/register">Ücretsiz Dene</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
