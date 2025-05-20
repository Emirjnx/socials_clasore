"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Instagram } from "lucide-react"
import { useState } from "react"

export default function ConnectPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      toast({
        title: "Hata",
        description: "Lütfen Instagram kullanıcı adınızı ve şifrenizi girin.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    // Instagram bağlantı simülasyonu
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      toast({
        title: "Bağlantı Başarılı",
        description: "Instagram hesabınız başarıyla bağlandı.",
      })
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setUsername("")
    setPassword("")
    toast({
      title: "Bağlantı Kesildi",
      description: "Instagram hesabınızın bağlantısı kesildi.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Instagram Bağlantısı</h1>
        <p className="text-muted-foreground">Instagram hesabınızı SocialPro Studio'ya bağlayın.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Instagram Hesabı Bağla</CardTitle>
            <CardDescription>
              Instagram hesabınızı bağlayarak içerik planlaması, analiz ve diğer özellikleri kullanabilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <form onSubmit={handleConnect} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Instagram Kullanıcı Adı</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="instagram_kullanici_adi"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Instagram Şifresi</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Şifreniz güvenli bir şekilde saklanır ve sadece Instagram API'sine erişim için kullanılır.
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <span className="mr-2">Bağlanıyor...</span>
                      <span className="animate-spin">⏳</span>
                    </>
                  ) : (
                    <>
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram'a Bağlan
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-md bg-primary/10 p-4 flex items-center">
                  <Instagram className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="font-medium">@{username}</p>
                    <p className="text-xs text-muted-foreground">Bağlantı tarihi: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleDisconnect}>
                  Bağlantıyı Kes
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <p className="text-sm text-muted-foreground">
              Instagram hesabınızı bağlayarak, SocialPro Studio'nun hesabınıza erişmesine ve içerik yönetimi yapmasına
              izin vermiş olursunuz.
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bağlantı Avantajları</CardTitle>
            <CardDescription>Instagram hesabınızı bağlayarak elde edeceğiniz avantajlar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">İçerik Planlama</h3>
                <p className="text-sm text-muted-foreground">
                  Gönderilerinizi önceden planlayın ve otomatik olarak paylaşın.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Analitik</h3>
                <p className="text-sm text-muted-foreground">
                  Takipçi artışı, etkileşim oranları ve diğer önemli metrikleri analiz edin.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Hashtag Önerileri</h3>
                <p className="text-sm text-muted-foreground">
                  İçeriğinize uygun, etkileşimi artıracak hashtag önerileri alın.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Rakip Analizi</h3>
                <p className="text-sm text-muted-foreground">
                  Rakiplerinizin performansını izleyin ve stratejinizi buna göre ayarlayın.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Daha fazla bilgi için{" "}
              <a href="#" className="text-primary underline underline-offset-4">
                yardım merkezimizi
              </a>{" "}
              ziyaret edin.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
