"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthContext } from "@/components/auth-provider"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { CreditCardIcon, WalletIcon, CoinsIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BalancePage() {
  const { user, addBalance, purchasePackage } = useAuthContext()
  const { toast } = useToast()
  const [amount, setAmount] = useState("100")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState("bronze")
  const [packageDuration, setPackageDuration] = useState(1)

  const handleAddBalance = async () => {
    setIsLoading(true)

    // Shopier ödeme sayfasına yönlendirme simülasyonu
    setTimeout(() => {
      addBalance(Number(amount))
      toast({
        title: "Bakiye Yüklendi",
        description: `₺${amount} tutarında bakiye hesabınıza eklendi.`,
      })
      setIsLoading(false)
    }, 2000)
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

  const getPackagePrice = (packageName: string, months: number) => {
    const prices = {
      free: 0,
      bronze: 99,
      silver: 199,
      gold: 349,
    }

    return prices[packageName as keyof typeof prices] * months
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bakiye Yönetimi</h1>
          <p className="text-muted-foreground">Bakiyenizi yönetin ve paket satın alın.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mevcut Bakiye</CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{user?.balance || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Paket</CardTitle>
            <CoinsIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{user?.package || "Ücretsiz"}</div>
            {user?.packageExpiry && (
              <p className="text-xs text-muted-foreground">
                Bitiş: {new Date(user.packageExpiry).toLocaleDateString("tr-TR")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="add-balance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="add-balance">Bakiye Yükle</TabsTrigger>
          <TabsTrigger value="purchase-package">Paket Satın Al</TabsTrigger>
          <TabsTrigger value="transaction-history">İşlem Geçmişi</TabsTrigger>
        </TabsList>

        <TabsContent value="add-balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bakiye Yükle</CardTitle>
              <CardDescription>Hesabınıza bakiye yükleyin ve paketleri satın alın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Yüklenecek Tutar (₺)</Label>
                <div className="flex gap-2">
                  {[50, 100, 200, 500].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={amount === String(value) ? "default" : "outline"}
                      onClick={() => setAmount(String(value))}
                    >
                      ₺{value}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Özel Tutar</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  min="10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Ödeme Yöntemi</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border rounded-md p-3 cursor-pointer bg-primary/5">
                    <div className="flex items-center gap-2">
                      <CreditCardIcon className="h-5 w-5" />
                      <span>Kredi Kartı</span>
                    </div>
                    <div className="h-4 w-4 rounded-full bg-primary"></div>
                  </div>
                  <Link href="/dashboard/balance/shopier" className="w-full">
                    <div className="flex items-center justify-between border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Image src="/placeholder.svg?height=20&width=20" alt="Shopier" width={20} height={20} />
                        <span>Shopier</span>
                      </div>
                      <div className="h-4 w-4 rounded-full border"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddBalance} disabled={isLoading} className="w-full">
                {isLoading ? "İşleniyor..." : "Bakiye Yükle"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="purchase-package" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paket Satın Al</CardTitle>
              <CardDescription>Bakiyenizi kullanarak paket satın alın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Paket Seçin</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["bronze", "silver", "gold"].map((pkg) => (
                    <div
                      key={pkg}
                      className={`flex flex-col border rounded-md p-4 cursor-pointer ${
                        selectedPackage === pkg ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <div className="font-bold capitalize mb-2">{pkg}</div>
                      <div className="text-2xl font-bold">
                        ₺{pkg === "bronze" ? "99" : pkg === "silver" ? "199" : "349"}
                        <span className="text-sm font-normal text-muted-foreground">/ay</span>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {pkg === "bronze"
                          ? "Temel özellikler"
                          : pkg === "silver"
                            ? "Gelişmiş özellikler"
                            : "Premium özellikler"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Süre Seçin</Label>
                <div className="flex gap-2">
                  {[1, 3, 6, 12].map((months) => (
                    <Button
                      key={months}
                      type="button"
                      variant={packageDuration === months ? "default" : "outline"}
                      onClick={() => setPackageDuration(months)}
                    >
                      {months} {months === 1 ? "Ay" : "Ay"}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="mt-4 p-4 border rounded-md bg-muted/50">
                <div className="flex justify-between mb-2">
                  <span>Paket Ücreti:</span>
                  <span>₺{getPackagePrice(selectedPackage, packageDuration)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Mevcut Bakiye:</span>
                  <span>₺{user?.balance || 0}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Kalan Bakiye:</span>
                  <span>₺{(user?.balance || 0) - getPackagePrice(selectedPackage, packageDuration)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePurchasePackage}
                disabled={isLoading || (user?.balance || 0) < getPackagePrice(selectedPackage, packageDuration)}
                className="w-full"
              >
                {isLoading
                  ? "İşleniyor..."
                  : (user?.balance || 0) < getPackagePrice(selectedPackage, packageDuration)
                    ? "Yetersiz Bakiye"
                    : "Satın Al"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="transaction-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İşlem Geçmişi</CardTitle>
              <CardDescription>Bakiye yükleme ve paket satın alma işlemleriniz.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <WalletIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Bakiye Yükleme</p>
                      <p className="text-sm text-muted-foreground">20 Mayıs 2025, 14:30</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600 dark:text-green-400">+₺100</p>
                    <p className="text-sm text-muted-foreground">Kredi Kartı</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <CoinsIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium">Silver Paket Satın Alma</p>
                      <p className="text-sm text-muted-foreground">18 Mayıs 2025, 10:15</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600 dark:text-red-400">-₺199</p>
                    <p className="text-sm text-muted-foreground">Bakiye</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <WalletIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Bakiye Yükleme</p>
                      <p className="text-sm text-muted-foreground">15 Mayıs 2025, 09:45</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600 dark:text-green-400">+₺200</p>
                    <p className="text-sm text-muted-foreground">Shopier</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
