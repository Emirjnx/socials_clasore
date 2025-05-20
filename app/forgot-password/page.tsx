"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { validateEmail } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("E-posta adresi gereklidir.")
      return
    }

    if (!validateEmail(email)) {
      setError("Geçerli bir e-posta adresi giriniz.")
      return
    }

    setIsLoading(true)

    // Şifre sıfırlama simülasyonu
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast({
        title: "Şifre Sıfırlama Bağlantısı Gönderildi",
        description: "E-posta adresinize şifre sıfırlama bağlantısı gönderdik.",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Şifremi Unuttum</CardTitle>
          <CardDescription>E-posta adresinizi girin, size şifre sıfırlama bağlantısı göndereceğiz.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Gönderiliyor..." : "Şifre Sıfırlama Bağlantısı Gönder"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md bg-primary/10 p-4">
                <p className="text-sm text-primary">
                  Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. Lütfen e-posta kutunuzu
                  kontrol edin.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                E-postayı alamadınız mı?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => {
                    setIsSubmitted(false)
                    toast({
                      title: "Yeni Bağlantı Gönderildi",
                      description: "E-posta adresinize yeni bir şifre sıfırlama bağlantısı gönderdik.",
                    })
                  }}
                >
                  Tekrar gönder
                </Button>
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground w-full text-center">
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Giriş sayfasına dön
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
