import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">İçerik Takvimi</h1>
          <p className="text-muted-foreground">Instagram içeriklerinizi planlayın ve takip edin.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/calendar/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Yeni İçerik Ekle
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mayıs 2025</CardTitle>
          <CardDescription>Planlanan ve yayınlanan içerikleriniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {/* Haftanın günleri */}
            {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day) => (
              <div key={day} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}

            {/* Boş günler (önceki aydan) */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`empty-start-${i}`}
                className="h-24 border rounded-md bg-muted/20 p-2 text-muted-foreground text-sm"
              >
                {28 + i}
              </div>
            ))}

            {/* Ayın günleri */}
            {Array.from({ length: 31 }).map((_, i) => (
              <div
                key={`day-${i + 1}`}
                className="h-24 border rounded-md p-2 text-sm hover:bg-accent transition-colors"
              >
                <div className="font-medium">{i + 1}</div>
                {i === 4 && (
                  <div className="mt-1 p-1 text-xs bg-blue-100 dark:bg-blue-900 rounded text-blue-800 dark:text-blue-200">
                    Yeni Ürün Tanıtımı (10:00)
                  </div>
                )}
                {i === 12 && (
                  <div className="mt-1 p-1 text-xs bg-green-100 dark:bg-green-900 rounded text-green-800 dark:text-green-200">
                    Müşteri Yorumları (15:30)
                  </div>
                )}
                {i === 19 && (
                  <div className="mt-1 p-1 text-xs bg-purple-100 dark:bg-purple-900 rounded text-purple-800 dark:text-purple-200">
                    Haftalık İpuçları (18:00)
                  </div>
                )}
              </div>
            ))}

            {/* Boş günler (sonraki aydan) */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`empty-end-${i}`}
                className="h-24 border rounded-md bg-muted/20 p-2 text-muted-foreground text-sm"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yaklaşan İçerikler</CardTitle>
          <CardDescription>Önümüzdeki 7 gün içinde paylaşılacak içerikler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-xs">Görsel</span>
                </div>
                <div>
                  <p className="font-medium">Yeni Ürün Tanıtımı</p>
                  <p className="text-sm text-muted-foreground">5 Mayıs, 10:00</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Düzenle
                </Button>
                <Button variant="ghost" size="sm">
                  İptal Et
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-xs">Görsel</span>
                </div>
                <div>
                  <p className="font-medium">Müşteri Yorumları</p>
                  <p className="text-sm text-muted-foreground">13 Mayıs, 15:30</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Düzenle
                </Button>
                <Button variant="ghost" size="sm">
                  İptal Et
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-xs">Görsel</span>
                </div>
                <div>
                  <p className="font-medium">Haftalık İpuçları</p>
                  <p className="text-sm text-muted-foreground">20 Mayıs, 18:00</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Düzenle
                </Button>
                <Button variant="ghost" size="sm">
                  İptal Et
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
