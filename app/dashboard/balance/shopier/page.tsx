"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthContext } from "@/components/auth-provider"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ShopierPayment } from "@/components/shopier-payment"
import { CreditCardIcon, ArrowLeftIcon } from "lucide-react"
import Image from "next/image"

export default function ShopierPage() {
  const { addBalance } = useAuthContext()
  const { toast } = useToast()
  const router = useRouter()
  const [amount, setAmount] = useState("100")
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  const handlePaymentSuccess = () => {
    addBalance(Number(amount))

    setTimeout(() => {
      router.push("/dashboard/balance")
    }, 1000)
  }

  const handlePaymentCancel = () => {
    toast({
      variant: "destructive",
      title: "Ödeme İptal Edildi",
      description: "Ödeme işlemi iptal edildi.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Shopier ile Ödeme</h1>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Shopier" width={32} height={32} />
            <CardTitle>Shopier ile Ödeme</CardTitle>
          </div>
          <CardDescription>Güvenli ve hızlı ödeme için Shopier'i kullanın.</CardDescription>
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
            <div className="flex items-center justify-between border rounded-md p-3">
              <div className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5" />
                <span>Kredi/Banka Kartı</span>
              </div>
              <div className="h-4 w-4 rounded-full bg-primary"></div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsPaymentOpen(true)} className="w-full">
            Ödemeye Geç
          </Button>
        </CardFooter>
      </Card>

      <ShopierPayment
        amount={Number(amount)}
        onSuccess={handlePaymentSuccess}
        onCancel={handlePaymentCancel}
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
      />
    </div>
  )
}
