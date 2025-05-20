"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthContext } from "@/components/auth-provider"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, CheckIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function PackagePage() {
  const { user, purchasePackage } = useAuthContext()
  const { toast } = useToast()
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState("bronze")
  const [packageDuration, setPackageDuration] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const getPackagePrice = (packageName: string, months: number) => {
    const prices = {
      free: 0,
      bronze: 99,
      silver: 199,
      gold: 349,
    }

    return prices[packageName as keyof typeof prices] * months
  }

  const handlePurchasePackage = async () => {
    setIsLoading(true)

    try {
      const result = await purchasePackage(selectedPackage, packageDuration)

      if (result.success) {
        toast({
          title: "Paket Satın Alındı",
          description: `${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} paketi başarıyla satın alındı.`,
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Satın Alma Başarısız",
          description: result.message || "Paket satın alınırken bir hata oluştu.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Paket satın alınırken bir hata oluştu.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Paket Satın Al</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className={selectedPackage === "bronze" ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle>Bronze</CardTitle>
            <CardDescription>Temel özellikler</CardDescription>
            <div className="mt-2 text-3xl font-bold">
              ₺99<span className="text-sm font-normal text-muted-foreground">/ay</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Instagram Analizi</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Optimum Paylaşım Saatleri</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Temel Hashtag Önerileri</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>İçerik Takvimi (5 içerik)</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPackage === "bronze" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPackage("bronze")}
            >
              {selectedPackage === "bronze" ? "Seçildi" : "Seç"}
            </Button>
          </CardFooter>
        </Card>

        <Card className={selectedPackage === "silver" ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle>Silver</CardTitle>
            <CardDescription>Gelişmiş özellikler</CardDescription>
            <div className="mt-2 text-3xl font-bold">
              ₺199<span className="text-sm font-normal text-muted-foreground">/ay</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Instagram Analizi</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Optimum Paylaşım Saatleri</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Gelişmiş Hashtag Önerileri</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>İçerik Takvimi (Sınırsız)</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Gelişmiş Görsel Editör</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPackage === "silver" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPackage("silver")}
            >
              {selectedPackage === "silver" ? "Seçildi" : "Seç"}
            </Button>
          </CardFooter>
        </Card>

        <Card className={selectedPackage === "gold" ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle>Gold</CardTitle>
            <CardDescription>Premium özellikler</CardDescription>
            <div className="mt-2 text-3xl font-bold">
              ₺349<span className="text-sm font-normal text-muted-foreground">/ay</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Instagram Analizi</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Optimum Paylaşım Saatleri</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Premium Hashtag Önerileri</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>İçerik Takvimi (Sınırsız)</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Premium Görsel Editör</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Rakip Analizi (Sınırsız)</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                <span>Yapay Zeka İçerik Önerisi</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPackage === "gold" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPackage("gold")}
            >
              {selectedPackage === "gold" ? "Seçildi" : "Seç"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Abonelik Süresi</CardTitle>
          <CardDescription>Abonelik sürenizi seçin</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue="1"
            value={packageDuration.toString()}
            onValueChange={(value) => setPackageDuration(Number(value))}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div>
              <RadioGroupItem value="1" id="r1" className="peer sr-only" />
              <Label
                htmlFor="r1"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-lg font-semibold">1 Ay</span>
                <span className="text-sm text-muted-foreground">Standart</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="3" id="r2" className="peer sr-only" />
              <Label
                htmlFor="r2"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-lg font-semibold">3 Ay</span>
                <span className="text-sm text-muted-foreground">%5 İndirim</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="6" id="r3" className="peer sr-only" />
              <Label
                htmlFor="r3"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-lg font-semibold">6 Ay</span>
                <span className="text-sm text-muted-foreground">%10 İndirim</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="12" id="r4" className="peer sr-only" />
              <Label
                htmlFor="r4"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-lg font-semibold">12 Ay</span>
                <span className="text-sm text-muted-foreground">%20 İndirim</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ödeme Özeti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Paket:</span>
              <span className="font-medium capitalize">{selectedPackage}</span>
            </div>
            <div className="flex justify-between">
              <span>Süre:</span>
              <span className="font-medium">{packageDuration} Ay</span>
            </div>
            <div className="flex justify-between">
              <span>Toplam Tutar:</span>
              <span className="font-medium">₺{getPackagePrice(selectedPackage, packageDuration)}</span>
            </div>
            <div className="flex justify-between">
              <span>Mevcut Bakiye:</span>
              <span className="font-medium">₺{user?.balance || 0}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Kalan Bakiye:</span>
              <span>₺{(user?.balance || 0) - getPackagePrice(selectedPackage, packageDuration)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handlePurchasePackage}
            disabled={isLoading || (user?.balance || 0) < getPackagePrice(selectedPackage, packageDuration)}
          >
            {isLoading
              ? "İşleniyor..."
              : (user?.balance || 0) < getPackagePrice(selectedPackage, packageDuration)
                ? "Yetersiz Bakiye"
                : "Satın Al"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
