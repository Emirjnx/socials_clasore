"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { CreditCardIcon, CheckCircleIcon } from "lucide-react"

interface ShopierPaymentProps {
  amount: number
  onSuccess: () => void
  onCancel: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function ShopierPayment({ amount, onSuccess, onCancel, isOpen, setIsOpen }: ShopierPaymentProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Ödeme işlemi simülasyonu
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      // Başarılı ödeme sonrası
      setTimeout(() => {
        setIsComplete(false)
        setIsOpen(false)
        onSuccess()

        toast({
          title: "Ödeme Başarılı",
          description: `₺${amount} tutarındaki ödemeniz başarıyla gerçekleştirildi.`,
        })
      }, 2000)
    }, 2000)
  }

  const handleCancel = () => {
    setIsOpen(false)
    onCancel()
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shopier ile Ödeme</DialogTitle>
          <DialogDescription>Güvenli ödeme için kart bilgilerinizi girin.</DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Ödeme Başarılı</h3>
            <p className="text-center text-muted-foreground mt-2">
              ₺{amount} tutarındaki ödemeniz başarıyla gerçekleştirildi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Ödeme Tutarı:</span>
                <span className="text-lg font-bold">₺{amount}</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Kart Numarası</Label>
                <div className="relative">
                  <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="pl-10"
                    maxLength={19}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">Kart Üzerindeki İsim</Label>
                <Input
                  id="card-name"
                  placeholder="AD SOYAD"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Son Kullanma Tarihi</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                İptal
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? "İşleniyor..." : "Ödemeyi Tamamla"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
