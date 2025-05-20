import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DownloadIcon,
  UsersIcon,
  CreditCardIcon,
  HelpCircleIcon,
  AlertCircleIcon,
} from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Paneli</h1>
          <p className="text-muted-foreground">SocialPro Studio platformunun genel durumunu görüntüleyin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+5.2%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Abonelikler</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,721</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+3.1%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aylık Gelir</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺1,234,567</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.3%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destek Talepleri</CardTitle>
            <HelpCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownIcon className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">-12%</span> son 30 günde
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
          <TabsTrigger value="revenue">Gelir</TabsTrigger>
          <TabsTrigger value="alerts">Uyarılar</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Kullanıcı Artışı</CardTitle>
                <CardDescription>Son 30 günde kullanıcı artış grafiği</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Grafik burada görüntülenecek</p>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Paket Dağılımı</CardTitle>
                <CardDescription>Kullanıcıların paket dağılımı</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Grafik burada görüntülenecek</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Son Kayıt Olan Kullanıcılar</CardTitle>
                <CardDescription>Son 24 saat içinde kayıt olan kullanıcılar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                        <div>
                          <p className="text-sm font-medium">Kullanıcı {i}</p>
                          <p className="text-xs text-muted-foreground">kullanici{i}@email.com</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">2 saat önce</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Son Abonelikler</CardTitle>
                <CardDescription>Son 24 saat içinde yapılan abonelikler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                        <div>
                          <p className="text-sm font-medium">Kullanıcı {i}</p>
                          <p className="text-xs text-muted-foreground">
                            {i % 3 === 0 ? "Gold" : i % 3 === 1 ? "Silver" : "Bronze"} Paketi
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">3 saat önce</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı İstatistikleri</CardTitle>
              <CardDescription>Kullanıcı büyüme ve aktivite istatistikleri</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Kullanıcı istatistikleri burada görüntülenecek</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gelir Analizi</CardTitle>
              <CardDescription>Aylık ve yıllık gelir analizi</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Gelir analizi burada görüntülenecek</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistem Uyarıları</CardTitle>
              <CardDescription>Dikkat edilmesi gereken sistem uyarıları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 border rounded-md bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
                  <AlertCircleIcon className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Yüksek Sunucu Yükü</p>
                    <p className="text-sm">Sunucu yükü son 1 saattir normalin üzerinde seyrediyor.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-md bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300">
                  <AlertCircleIcon className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Ödeme Sistemi Hatası</p>
                    <p className="text-sm">Bazı kullanıcılar ödeme yaparken hata alıyor.</p>
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
