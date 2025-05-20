"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, InstagramIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { useAuthContext } from "@/components/auth-provider"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const { user } = useAuthContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Genel Bakış</h1>
          <p className="text-muted-foreground">Instagram hesabınızın performansını ve içerik planınızı görüntüleyin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/connect">
              <InstagramIcon className="mr-2 h-4 w-4" />
              Instagram Hesabı Bağla
            </Link>
          </Button>
        </div>
      </div>

      {!user?.packageExpiry && user?.package === "free" && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Ücretsiz Paket Kullanıyorsunuz</h3>
                <p className="text-muted-foreground">Daha fazla özellik için paket yükseltmesi yapın.</p>
              </div>
              <Button asChild>
                <Link href="/dashboard/balance">Paket Yükselt</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
          <TabsTrigger value="content">İçerik</TabsTrigger>
          <TabsTrigger value="balance">Bakiye Yönetimi</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Takipçi</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <span>Instagram hesabınızı bağlayın</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Etkileşim Oranı</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <span>Instagram hesabınızı bağlayın</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Gönderi</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Instagram hesabınızı bağlayın</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Planlanan İçerik</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Henüz planlanan içerik yok</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Takipçi Artışı</CardTitle>
                <CardDescription>Son 30 günde takipçi artış grafiği</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Instagram hesabınızı bağladıktan sonra grafik burada görüntülenecek
                </p>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>En İyi Performans Gösteren İçerikler</CardTitle>
                <CardDescription>Etkileşim oranına göre</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[300px]">
                  <p className="text-muted-foreground">
                    Instagram hesabınızı bağladıktan sonra içerikleriniz burada görüntülenecek
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detaylı Analitik</CardTitle>
              <CardDescription>Bu bölüm Silver ve Gold paket kullanıcıları için aktiftir.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-muted-foreground">
                  {user?.package === "free" || user?.package === "bronze"
                    ? "Bu özelliği kullanmak için Silver veya Gold pakete yükseltin"
                    : "Instagram hesabınızı bağladıktan sonra analitik veriler burada görüntülenecek"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İçerik Planlama</CardTitle>
              <CardDescription>İçeriklerinizi planlayın ve yönetin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                <p className="text-muted-foreground">Henüz planlanmış içerik bulunmuyor</p>
                <Button asChild>
                  <Link href="/dashboard/editor">Yeni İçerik Oluştur</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="balance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Bakiye Yönetimi</CardTitle>
                <CardDescription>Bakiyenizi yükleyin ve yönetin.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <p className="text-sm font-medium">Mevcut Bakiye</p>
                    <p className="text-2xl font-bold">₺{user?.balance || 0}</p>
                  </div>
                  <Button asChild>
                    <Link href="/dashboard/balance/shopier">Bakiye Yükle</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Paket Satın Al</CardTitle>
                <CardDescription>Paket satın almak için bakiyenizi kullanın.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <p className="text-sm font-medium">Mevcut Paket</p>
                    <p className="text-2xl font-bold capitalize">{user?.package || "Ücretsiz"}</p>
                    {user?.packageExpiry && (
                      <p className="text-xs text-muted-foreground">
                        Son kullanma tarihi: {new Date(user.packageExpiry).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Button asChild>
                    <Link href="/dashboard/balance/package">Paket Satın Al</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
