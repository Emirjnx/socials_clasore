import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpIcon, ArrowDownIcon, DownloadIcon } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analitik</h1>
          <p className="text-muted-foreground">Instagram hesabınızın performans analizini görüntüleyin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="followers">Takipçiler</TabsTrigger>
          <TabsTrigger value="engagement">Etkileşim</TabsTrigger>
          <TabsTrigger value="content">İçerik Performansı</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Takipçi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+5.2%</span> son 30 günde
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Etkileşim Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.6%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+0.8%</span> son 30 günde
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Erişim</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,890</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+12.3%</span> son 30 günde
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profil Ziyaretleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
                  <span className="text-red-500">-2.1%</span> son 30 günde
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Takipçi Artışı</CardTitle>
                <CardDescription>Son 30 günde takipçi artış grafiği</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Grafik burada görüntülenecek</p>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Etkileşim Oranı</CardTitle>
                <CardDescription>Son 30 günde etkileşim oranı grafiği</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Grafik burada görüntülenecek</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="followers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Takipçi Demografisi</CardTitle>
              <CardDescription>Takipçilerinizin yaş, cinsiyet ve konum dağılımı</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Demografik veriler burada görüntülenecek</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Etkileşim Analizi</CardTitle>
              <CardDescription>Beğeni, yorum ve kaydetme istatistikleri</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Etkileşim verileri burada görüntülenecek</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İçerik Performansı</CardTitle>
              <CardDescription>En çok etkileşim alan içerikleriniz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-md">
                  <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-xs">Görsel</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Yaz Koleksiyonu</p>
                    <p className="text-sm text-muted-foreground">15 Nisan 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">245 beğeni</p>
                    <p className="text-sm text-muted-foreground">32 yorum</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-md">
                  <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-xs">Görsel</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Ürün İncelemesi</p>
                    <p className="text-sm text-muted-foreground">2 Nisan 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">198 beğeni</p>
                    <p className="text-sm text-muted-foreground">45 yorum</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-md">
                  <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-xs">Görsel</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Müşteri Yorumları</p>
                    <p className="text-sm text-muted-foreground">28 Mart 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">176 beğeni</p>
                    <p className="text-sm text-muted-foreground">28 yorum</p>
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
