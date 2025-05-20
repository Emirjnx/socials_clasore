"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthContext()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(email, password)

      if (result.success) {
        toast({
          title: "Giriş başarılı",
          description: "Hoş geldiniz! Yönlendiriliyorsunuz...",
        })

        // Admin kullanıcısı için admin paneline yönlendir
        if (email === "admin@example.com") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Giriş başarısız",
          description: result.message || "E-posta veya şifre hatalı",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="SocialPro Studio"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-2xl font-bold">SocialPro Studio</span>
          </Link>
        </div>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Giriş Yap</CardTitle>
              <CardDescription className="text-center">
                Hesabınıza giriş yaparak Instagram içeriklerinizi yönetmeye başlayın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Şifre</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Şifremi Unuttum
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Beni hatırla
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
              <div className="text-center text-sm">
                Hesabınız yok mu?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Ücretsiz Kaydolun
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>Demo hesapları:</p>
          <p>Kullanıcı: demo@example.com / password123</p>
          <p>Admin: admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  )
}
