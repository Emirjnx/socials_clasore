"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage({ searchParams }: { searchParams: { package?: string; billing?: string } }) {
  const selectedPackage = searchParams.package || "free"
  const billingCycle = searchParams.billing || "monthly"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [packageType, setPackageType] = useState(selectedPackage)
  const [billing, setBilling] = useState(billingCycle)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuthContext()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Devam etmek için kullanım koşullarını kabul etmelisiniz.",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await register(name, email, password, packageType)

      if (result.success) {
        toast({
          title: "Kayıt başarılı",
          description: "Hesabınız oluşturuldu. Yönlendiriliyorsunuz...",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Kayıt başarısız",
          description: result.message || "Kayıt sırasında bir hata oluştu",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.",
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
              <CardTitle className="text-2xl text-center">Ücretsiz Kaydolun</CardTitle>
              <CardDescription className="text-center">
                14 gün ücretsiz deneme ile başlayın, kredi kartı gerekmez
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  placeholder="Ad Soyad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Seçilen Paket</Label>
                <Tabs defaultValue={packageType} className="w-full" onValueChange={(value) => setPackageType(value)}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="free">Ücretsiz</TabsTrigger>
                    <TabsTrigger value="bronze">Bronze</TabsTrigger>
                    <TabsTrigger value="silver">Silver</TabsTrigger>
                    <TabsTrigger value="gold">Gold</TabsTrigger>
                  </TabsList>
                  <TabsContent value="free" className="mt-2 text-sm text-muted-foreground">
                    Ücretsiz paket - ₺0
                  </TabsContent>
                  <TabsContent value="bronze" className="mt-2 text-sm text-muted-foreground">
                    Bronze paket - {billing === "yearly" ? "₺948/yıl" : "₺99/ay"}
                  </TabsContent>
                  <TabsContent value="silver" className="mt-2 text-sm text-muted-foreground">
                    Silver paket - {billing === "yearly" ? "₺1,908/yıl" : "₺199/ay"}
                  </TabsContent>
                  <TabsContent value="gold" className="mt-2 text-sm text-muted-foreground">
                    Gold paket - {billing === "yearly" ? "₺3,350/yıl" : "₺349/ay"}
                  </TabsContent>
                </Tabs>
              </div>
              <div className="space-y-2">
                <Label>Fatura Dönemi</Label>
                <Tabs defaultValue={billing} className="w-full" onValueChange={(value) => setBilling(value)}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="monthly">Aylık</TabsTrigger>
                    <TabsTrigger value="yearly">Yıllık</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  <span>
                    <Link href="/terms" className="text-primary hover:underline">
                      Kullanım Koşulları
                    </Link>{" "}
                    ve{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Gizlilik Politikası
                    </Link>
                    'nı kabul ediyorum
                  </span>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Kaydediliyor..." : "Ücretsiz Başla"}
              </Button>
              <div className="text-center text-sm">
                Zaten hesabınız var mı?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Giriş Yapın
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
