import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  DownloadIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  ImageIcon,
  FileTextIcon,
  VideoIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">İçerik Yönetimi</h1>
          <p className="text-muted-foreground">Platform içeriklerini görüntüleyin ve yönetin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Dışa Aktar
          </Button>
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            İçerik Ekle
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>İçerikler</CardTitle>
          <CardDescription>Toplam 256 içerik</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="İçerik ara..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tür" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Türler</SelectItem>
                  <SelectItem value="blog">Blog Yazısı</SelectItem>
                  <SelectItem value="tutorial">Eğitim</SelectItem>
                  <SelectItem value="faq">SSS</SelectItem>
                  <SelectItem value="announcement">Duyuru</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="published">Yayında</SelectItem>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="archived">Arşivlenmiş</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Yazar</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Oluşturulma</TableHead>
                  <TableHead>Güncellenme</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {i % 3 === 0 ? (
                        <FileTextIcon className="h-4 w-4 text-blue-500" />
                      ) : i % 3 === 1 ? (
                        <ImageIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <VideoIcon className="h-4 w-4 text-red-500" />
                      )}
                      {i % 4 === 0
                        ? "Instagram Etkileşimini Artırmanın 10 Yolu"
                        : i % 4 === 1
                          ? "Hashtag Kullanım Rehberi"
                          : i % 4 === 2
                            ? "Görsel İçerik Oluşturma İpuçları"
                            : "SocialPro Studio Kullanım Kılavuzu"}
                    </TableCell>
                    <TableCell>
                      {i % 4 === 0 ? (
                        <Badge variant="outline">Blog Yazısı</Badge>
                      ) : i % 4 === 1 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        >
                          Eğitim
                        </Badge>
                      ) : i % 4 === 2 ? (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          SSS
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                        >
                          Duyuru
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Yayında
                      </Badge>
                    </TableCell>
                    <TableCell>01.01.2023</TableCell>
                    <TableCell>02.01.2023</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Aç</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ayarlar</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Düzenle</DropdownMenuItem>
                          <DropdownMenuItem>Sil</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
