"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthContext } from "@/components/auth-provider"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const { user } = useAuthContext()
  const { toast } = useToast()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Profil güncelleme simülasyonu
    setTimeout(() => {
      toast({
        title: "Profil Güncellendi",
        description: "Profil bilgileriniz başarıyla güncellendi.",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Şifreler Eşleşmiyor",
        description: "Yeni şifre ve şifre tekrarı alanları eşleşmiyor.",
      })
      setIsLoading(false)
      return
    }

    // Şifre güncelleme simülasyonu
    setTimeout(() => {
      toast({
        title: "Şifre Güncellendi",
        description: "Şifreniz başarıyla güncellendi.",
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil Ayarları</h1>
        <p className="text-muted-foreground">Hesap bilgilerinizi yönetin ve şifrenizi değiştirin.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>Hesap bilgilerinizi görüntüleyin.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.name || "Kullanıcı"} />
              <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-medium">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="w-full">
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Üyelik Tipi</span>
                  <span className="text-sm font-medium capitalize">{user?.package}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bakiye</span>
                  <span className="text-sm font-medium">₺{user?.balance}</span>
                </div>
                {user?.packageExpiry && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Paket Bitiş</span>
                    <span className="text-sm font-medium">
                      {new Date(user.packageExpiry).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
              <TabsTrigger value="password">Şifre Değiştir</TabsTrigger>
              <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <form onSubmit={handleUpdateProfile}>
                  <CardHeader>
                    <CardTitle>Genel Bilgiler</CardTitle>
                    <CardDescription>Profil bilgilerinizi güncelleyin.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="space-y-4">
              <Card>
                <form onSubmit={handleUpdatePassword}>
                  <CardHeader>
                    <CardTitle>Şifre Değiştir</CardTitle>
                    <CardDescription>Hesap şifrenizi güncelleyin.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mevcut Şifre</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Yeni Şifre</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Yeni Şifre Tekrar</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Kaydediliyor..." : "Şifreyi Değiştir"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bildirim Ayarları</CardTitle>
                  <CardDescription>Bildirim tercihlerinizi yönetin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">E-posta Bildirimleri</p>
                        <p className="text-sm text-muted-foreground">Önemli güncellemeler hakkında e-posta alın.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="email-notifications" className="sr-only">
                          E-posta Bildirimleri
                        </Label>
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pazarlama E-postaları</p>
                        <p className="text-sm text-muted-foreground">
                          Kampanyalar ve özel teklifler hakkında bilgi alın.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="marketing-emails" className="sr-only">
                          Pazarlama E-postaları
                        </Label>
                        <input
                          type="checkbox"
                          id="marketing-emails"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Uygulama İçi Bildirimler</p>
                        <p className="text-sm text-muted-foreground">Uygulama içi bildirimler alın.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="app-notifications" className="sr-only">
                          Uygulama İçi Bildirimler
                        </Label>
                        <input
                          type="checkbox"
                          id="app-notifications"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Değişiklikleri Kaydet</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
