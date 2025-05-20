"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ImageIcon,
  ClockIcon,
  FileTextIcon,
  UploadIcon,
  MoreHorizontalIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  DownloadIcon,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Tasarım isteği tipi
interface DesignRequest {
  id: string
  userId: string
  userName: string
  title: string
  description: string
  type: string
  size: string
  status: "pending" | "in-progress" | "completed" | "rejected"
  createdAt: string
  completedAt?: string
  attachments?: string[]
  result?: string
  feedback?: string
  adminNotes?: string
}

export default function AdminDesignRequestsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<DesignRequest | null>(null)
  const [adminNote, setAdminNote] = useState("")
  const [resultImage, setResultImage] = useState("")
  const { toast } = useToast()

  // Demo tasarım istekleri
  const [requests, setRequests] = useState<DesignRequest[]>([
    {
      id: "req-001",
      userId: "user-1",
      userName: "Ahmet Yılmaz",
      title: "Yaz Koleksiyonu Tanıtımı",
      description:
        "Yeni yaz koleksiyonumuz için Instagram gönderisi. Açık renkler ve yaz teması kullanılmalı. Ürün görselleri ekte.",
      type: "post",
      size: "square",
      status: "completed",
      createdAt: "15 Mayıs 2025",
      completedAt: "17 Mayıs 2025",
      result: "/placeholder.svg?height=500&width=500",
      feedback: "Harika olmuş, teşekkürler!",
    },
    {
      id: "req-002",
      userId: "user-2",
      userName: "Mehmet Demir",
      title: "İndirim Kampanyası",
      description:
        "Sezon sonu indirimi için Instagram hikayesi. %50'ye varan indirimler vurgulanmalı. Kırmızı ve siyah renkler kullanılabilir.",
      type: "story",
      size: "portrait",
      status: "in-progress",
      createdAt: "18 Mayıs 2025",
      adminNotes: "Kırmızı tonları daha canlı olmalı, indirim yazısı daha büyük olacak.",
    },
    {
      id: "req-003",
      userId: "user-3",
      userName: "Ayşe Kaya",
      title: "Ürün Detay Çekimi",
      description: "Yeni gelen deri ceket için detay çekimi. Ürünün doku ve detayları vurgulanmalı.",
      type: "post",
      size: "square",
      status: "pending",
      createdAt: "19 Mayıs 2025",
    },
    {
      id: "req-004",
      userId: "user-4",
      userName: "Zeynep Şahin",
      title: "Marka Tanıtım Videosu",
      description:
        "Markamızın değerlerini ve vizyonunu anlatan kısa bir tanıtım videosu. Modern ve profesyonel bir tarz istiyorum.",
      type: "video",
      size: "landscape",
      status: "rejected",
      createdAt: "14 Mayıs 2025",
      adminNotes: "Video içeriği için daha fazla detay gerekli. Müşteriye geri bildirim gönderildi.",
    },
    {
      id: "req-005",
      userId: "user-5",
      userName: "Ali Yıldız",
      title: "Yeni Ürün Lansmanı",
      description:
        "Yeni çıkan akıllı saat ürünümüz için Instagram carousel gönderisi. Ürünün tüm özelliklerini vurgulayan 5 görsel.",
      type: "carousel",
      size: "square",
      status: "pending",
      createdAt: "20 Mayıs 2025",
    },
  ])

  // Tasarım isteği durumunu değiştirme
  const changeRequestStatus = (requestId: string, newStatus: "pending" | "in-progress" | "completed" | "rejected") => {
    setRequests(
      requests.map((req) => {
        if (req.id === requestId) {
          const updatedReq = { ...req, status: newStatus }
          if (newStatus === "completed") {
            updatedReq.completedAt = new Date().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          }
          return updatedReq
        }
        return req
      }),
    )

    toast({
      title: "Durum güncellendi",
      description: `Tasarım isteği durumu ${
        newStatus === "pending"
          ? "beklemede"
          : newStatus === "in-progress"
            ? "devam ediyor"
            : newStatus === "completed"
              ? "tamamlandı"
              : "reddedildi"
      } olarak güncellendi.`,
    })
  }

  // Admin notu ekleme
  const addAdminNote = (requestId: string, note: string) => {
    if (!note.trim()) {
      toast({
        title: "Not gerekli",
        description: "Lütfen bir not girin",
        variant: "destructive",
      })
      return
    }

    setRequests(
      requests.map((req) => {
        if (req.id === requestId) {
          return { ...req, adminNotes: note }
        }
        return req
      }),
    )

    toast({
      title: "Not eklendi",
      description: "Admin notu başarıyla eklendi.",
    })
  }

  // Tasarım sonucu yükleme
  const uploadDesignResult = () => {
    if (!resultImage.trim()) {
      toast({
        title: "Görsel gerekli",
        description: "Lütfen bir görsel URL'si girin",
        variant: "destructive",
      })
      return
    }

    if (!selectedRequest) return

    setRequests(
      requests.map((req) => {
        if (req.id === selectedRequest.id) {
          return {
            ...req,
            result: resultImage,
            status: "completed",
            completedAt: new Date().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            adminNotes: adminNote ? (req.adminNotes ? `${req.adminNotes}\n\n${adminNote}` : adminNote) : req.adminNotes,
          }
        }
        return req
      }),
    )

    setIsUploadDialogOpen(false)
    setResultImage("")
    setAdminNote("")
    setSelectedRequest(null)

    toast({
      title: "Tasarım yüklendi",
      description: "Tasarım sonucu başarıyla yüklendi ve istek tamamlandı olarak işaretlendi.",
    })
  }

  // Filtrelenmiş istekler
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = activeTab === "all" || req.status === activeTab

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasarım İstekleri Yönetimi</h1>
          <p className="text-muted-foreground">Kullanıcılardan gelen tasarım isteklerini yönetin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasarım İstekleri</CardTitle>
          <CardDescription>Toplam {requests.length} tasarım isteği</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="İstek ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-5 w-full md:w-auto">
                <TabsTrigger value="all">Tümü</TabsTrigger>
                <TabsTrigger value="pending">Bekleyen</TabsTrigger>
                <TabsTrigger value="in-progress">Devam Eden</TabsTrigger>
                <TabsTrigger value="completed">Tamamlanan</TabsTrigger>
                <TabsTrigger value="rejected">Reddedilen</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kullanıcı</TableHead>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.userName}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={request.title}>
                          {request.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {request.type === "post"
                            ? "Instagram Gönderisi"
                            : request.type === "story"
                              ? "Instagram Hikayesi"
                              : request.type === "carousel"
                                ? "Carousel"
                                : request.type === "profile"
                                  ? "Profil Görseli"
                                  : request.type === "video"
                                    ? "Video"
                                    : "Kapak Görseli"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            request.status === "pending"
                              ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                              : request.status === "in-progress"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                : request.status === "completed"
                                  ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          }
                        >
                          {request.status === "pending"
                            ? "Bekliyor"
                            : request.status === "in-progress"
                              ? "Devam Ediyor"
                              : request.status === "completed"
                                ? "Tamamlandı"
                                : "Reddedildi"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Oluşturulma:</span>
                          <span>{request.createdAt}</span>
                          {request.completedAt && (
                            <>
                              <span className="text-xs text-muted-foreground mt-1">Tamamlanma:</span>
                              <span>{request.completedAt}</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">İşlemler</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRequest(request)
                                setAdminNote(request.adminNotes || "")
                              }}
                            >
                              <FileTextIcon className="mr-2 h-4 w-4" />
                              Detayları Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRequest(request)
                                setIsUploadDialogOpen(true)
                              }}
                            >
                              <UploadIcon className="mr-2 h-4 w-4" />
                              Tasarım Yükle
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Durum Değiştir</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => changeRequestStatus(request.id, "pending")}>
                              <AlertCircleIcon className="mr-2 h-4 w-4 text-yellow-500" />
                              Beklemede
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeRequestStatus(request.id, "in-progress")}>
                              <ClockIcon className="mr-2 h-4 w-4 text-blue-500" />
                              Devam Ediyor
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeRequestStatus(request.id, "completed")}>
                              <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                              Tamamlandı
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeRequestStatus(request.id, "rejected")}>
                              <XCircleIcon className="mr-2 h-4 w-4 text-red-500" />
                              Reddedildi
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileTextIcon className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Hiç tasarım isteği bulunamadı</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tasarım İsteği Detay Diyaloğu */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest && !isUploadDialogOpen} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Tasarım İsteği Detayları</DialogTitle>
              <DialogDescription>ID: {selectedRequest.id}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">İstek Bilgileri</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Kullanıcı</Label>
                      <p className="text-sm font-medium">{selectedRequest.userName}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Başlık</Label>
                      <p className="text-sm font-medium">{selectedRequest.title}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Açıklama</Label>
                      <p className="text-sm">{selectedRequest.description}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <Label className="text-xs">Tür</Label>
                        <p className="text-sm">
                          {selectedRequest.type === "post"
                            ? "Instagram Gönderisi"
                            : selectedRequest.type === "story"
                              ? "Instagram Hikayesi"
                              : selectedRequest.type === "carousel"
                                ? "Carousel"
                                : selectedRequest.type === "profile"
                                  ? "Profil Görseli"
                                  : selectedRequest.type === "video"
                                    ? "Video"
                                    : "Kapak Görseli"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs">Boyut</Label>
                        <p className="text-sm">
                          {selectedRequest.size === "square"
                            ? "Kare (1:1)"
                            : selectedRequest.size === "portrait"
                              ? "Dikey (4:5)"
                              : selectedRequest.size === "landscape"
                                ? "Yatay (1.91:1)"
                                : "Hikaye (9:16)"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <Label className="text-xs">Oluşturulma Tarihi</Label>
                        <p className="text-sm">{selectedRequest.createdAt}</p>
                      </div>
                      {selectedRequest.completedAt && (
                        <div>
                          <Label className="text-xs">Tamamlanma Tarihi</Label>
                          <p className="text-sm">{selectedRequest.completedAt}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs">Durum</Label>
                      <Badge
                        variant="outline"
                        className={
                          selectedRequest.status === "pending"
                            ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : selectedRequest.status === "in-progress"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                              : selectedRequest.status === "completed"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }
                      >
                        {selectedRequest.status === "pending"
                          ? "Bekliyor"
                          : selectedRequest.status === "in-progress"
                            ? "Devam Ediyor"
                            : selectedRequest.status === "completed"
                              ? "Tamamlandı"
                              : "Reddedildi"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Admin Notları</h3>
                    <Textarea
                      placeholder="Bu tasarım isteği hakkında notlar ekleyin..."
                      rows={4}
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                    />
                    <Button
                      className="mt-2"
                      onClick={() => {
                        addAdminNote(selectedRequest.id, adminNote)
                        setSelectedRequest({
                          ...selectedRequest,
                          adminNotes: adminNote,
                        })
                      }}
                    >
                      Not Kaydet
                    </Button>
                  </div>

                  {selectedRequest.feedback && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Kullanıcı Geri Bildirimi</h3>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <p className="text-sm">{selectedRequest.feedback}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                {selectedRequest.result && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Tasarım Sonucu</h3>
                    <div className="border rounded-md p-2 flex items-center justify-center">
                      <img
                        src={selectedRequest.result || "/placeholder.svg"}
                        alt="Tasarım Sonucu"
                        className="max-h-64 object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                Kapat
              </Button>
              <Button
                onClick={() => {
                  setIsUploadDialogOpen(true)
                }}
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                Tasarım Yükle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Tasarım Yükleme Diyaloğu */}
      {selectedRequest && (
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tasarım Yükle</DialogTitle>
              <DialogDescription>{selectedRequest.title} için tasarım sonucunu yükleyin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="resultImage">Görsel URL'si</Label>
                <Input
                  id="resultImage"
                  placeholder="https://example.com/image.jpg"
                  value={resultImage}
                  onChange={(e) => setResultImage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Görsel URL'si girin veya aşağıdan bir görsel yükleyin</p>
              </div>

              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Tasarım görselini yüklemek için tıklayın veya sürükleyin
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Görsel Seç
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminNotes">Admin Notu (İsteğe Bağlı)</Label>
                <Textarea
                  id="adminNotes"
                  placeholder="Tasarım hakkında notlar..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={uploadDesignResult}>Tasarımı Yükle ve Tamamla</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
