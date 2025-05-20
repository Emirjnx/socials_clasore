"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, FileText, Clock, CheckCircle, XCircle, Upload, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Demo tasarım istekleri
const initialRequests = [
  {
    id: "req-001",
    title: "Instagram Hikaye Tasarımı",
    description: "Yeni ürün lansmanı için Instagram hikaye tasarımı. Marka renklerimiz ve logo kullanılmalı.",
    type: "instagram-story",
    status: "completed",
    createdAt: "2023-05-15T10:30:00Z",
    completedAt: "2023-05-17T14:20:00Z",
    feedback: "Harika olmuş, teşekkürler!",
    attachments: [
      { name: "marka-kilavuzu.pdf", url: "#" },
      { name: "logo.png", url: "#" },
    ],
    result: { name: "instagram-story-final.png", url: "/placeholder.svg?height=300&width=200" },
  },
  {
    id: "req-002",
    title: "Ürün Fotoğrafı Düzenleme",
    description: "Arka planı beyaz yapıp ürünü daha parlak hale getirin. 5 adet ürün fotoğrafı var.",
    type: "photo-editing",
    status: "in-progress",
    createdAt: "2023-05-18T09:15:00Z",
    attachments: [
      { name: "urun1.jpg", url: "#" },
      { name: "urun2.jpg", url: "#" },
      { name: "urun3.jpg", url: "#" },
      { name: "urun4.jpg", url: "#" },
      { name: "urun5.jpg", url: "#" },
    ],
  },
  {
    id: "req-003",
    title: "Logo Tasarımı",
    description: "Yeni markamız için minimalist bir logo tasarımı. Mavi ve yeşil tonları kullanılmalı.",
    type: "logo-design",
    status: "pending",
    createdAt: "2023-05-20T15:45:00Z",
    attachments: [
      { name: "referans-logolar.zip", url: "#" },
      { name: "brief.pdf", url: "#" },
    ],
  },
  {
    id: "req-004",
    title: "Facebook Reklam Görseli",
    description: "Yaz kampanyası için Facebook reklam görseli. 1200x628 piksel boyutunda olmalı.",
    type: "social-media-ad",
    status: "rejected",
    createdAt: "2023-05-10T11:20:00Z",
    completedAt: "2023-05-12T16:30:00Z",
    feedback: "Kampanya mesajı yeterince vurgulanmamış. Yazılar daha büyük olmalı.",
    attachments: [{ name: "kampanya-detaylari.docx", url: "#" }],
    result: { name: "facebook-ad-v1.png", url: "/placeholder.svg?height=200&width=300" },
  },
]

// Tasarım isteği durumlarına göre renk ve ikon belirleme
const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300", icon: Clock },
  "in-progress": { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", icon: FileText },
  completed: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", icon: CheckCircle },
  rejected: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300", icon: XCircle },
}

// Tasarım isteği türleri
const requestTypes = [
  { value: "instagram-post", label: "Instagram Gönderi" },
  { value: "instagram-story", label: "Instagram Hikaye" },
  { value: "facebook-post", label: "Facebook Gönderi" },
  { value: "social-media-ad", label: "Sosyal Medya Reklamı" },
  { value: "logo-design", label: "Logo Tasarımı" },
  { value: "banner-design", label: "Banner Tasarımı" },
  { value: "photo-editing", label: "Fotoğraf Düzenleme" },
  { value: "other", label: "Diğer" },
]

export default function DesignRequestsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [activeTab, setActiveTab] = useState("all")
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    type: "",
    attachments: [],
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Tasarım isteği oluşturma
  const handleCreateRequest = () => {
    const request = {
      id: `req-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      title: newRequest.title,
      description: newRequest.description,
      type: newRequest.type,
      status: "pending",
      createdAt: new Date().toISOString(),
      attachments: newRequest.attachments.map((file: File) => ({
        name: file.name,
        url: "#", // Gerçek uygulamada dosya yükleme URL'si olacak
      })),
    }

    setRequests([request, ...requests])
    setNewRequest({ title: "", description: "", type: "", attachments: [] })
    setIsDialogOpen(false)

    toast({
      title: "Tasarım isteği oluşturuldu",
      description: "Tasarım isteğiniz başarıyla oluşturuldu.",
    })
  }

  // Dosya yükleme işlemi (simülasyon)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewRequest({
        ...newRequest,
        attachments: [...newRequest.attachments, ...Array.from(e.target.files)],
      })
    }
  }

  // Filtreleme işlemi
  const filteredRequests = activeTab === "all" ? requests : requests.filter((request) => request.status === activeTab)

  // Tarih formatı
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tasarım İstekleri</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni İstek
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Yeni Tasarım İsteği</DialogTitle>
              <DialogDescription>
                Tasarım isteğinizin detaylarını girin. Ne kadar detaylı olursa, o kadar iyi sonuç alırsınız.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Başlık
                </label>
                <Input
                  id="title"
                  placeholder="Tasarım isteğiniz için kısa bir başlık"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Tasarım Türü
                </label>
                <Select
                  value={newRequest.type}
                  onValueChange={(value) => setNewRequest({ ...newRequest, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tasarım türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {requestTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Açıklama
                </label>
                <Textarea
                  id="description"
                  placeholder="Tasarım isteğinizin detaylarını yazın"
                  rows={5}
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="attachments" className="text-sm font-medium">
                  Ekler (Logo, referans görseller, vb.)
                </label>
                <Input id="attachments" type="file" multiple onChange={handleFileUpload} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={handleCreateRequest}>Oluştur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="pending">Beklemede</TabsTrigger>
          <TabsTrigger value="in-progress">Devam Ediyor</TabsTrigger>
          <TabsTrigger value="completed">Tamamlandı</TabsTrigger>
          <TabsTrigger value="rejected">Reddedildi</TabsTrigger>
        </TabsList>
        {Object.keys(statusConfig).map((status) => (
          <TabsContent key={status} value={status}>
            {filteredRequests.map((request) => (
              <Card key={request.id} className="w-full">
                <CardHeader>
                  <CardTitle>{request.title}</CardTitle>
                  <CardDescription>{request.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Badge className={statusConfig[status as keyof typeof statusConfig].color}>
                      {statusConfig[status as keyof typeof statusConfig].icon({ className: "h-4 w-4 mr-2" })}
                      {request.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Oluşturulma Tarihi: {formatDate(request.createdAt)}
                    </span>
                    {request.completedAt && (
                      <span className="text-sm text-muted-foreground">
                        Tamamlanma Tarihi: {formatDate(request.completedAt)}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    {request.attachments.map((attachment) => (
                      <div key={attachment.name} className="flex items-center space-x-2">
                        <span>{attachment.name}</span>
                        <Button variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  {request.result && (
                    <div className="mt-4">
                      <span>{request.result.name}</span>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {request.feedback && (
                    <div className="text-sm text-muted-foreground">Geri Bildirim: {request.feedback}</div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
