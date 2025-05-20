"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
  })

  // Tema değişikliğini uygula
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Ayarları kaydetme simülasyonu
    setTimeout(() => {
      toast({
        title: "Ayarlar Kaydedildi",
        description: "Ayarlarınız başarıyla güncellendi.",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme)
    toast({
      title: "Tema Değiştirildi",
      description: `Tema ${selectedTheme === "light" ? "açık" : selectedTheme === "dark" ? "koyu" : "sistem"} olarak ayarlandı.`,
    })
  }

  const handleNotificationChange = (type: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  // Hydration için kontrol
  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">Uygulama ayarlarınızı yönetin.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-5 sm:grid-cols-5">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="appearance">Görünüm</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="advanced">Gelişmiş</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>Temel uygulama ayarlarınızı yapılandırın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Zaman Dilimi</Label>
                <Select defaultValue="Europe/Istanbul">
                  <SelectTrigger>
                    <SelectValue placeholder="Zaman dilimi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Istanbul">İstanbul (GMT+3)</SelectItem>
                    <SelectItem value="Europe/London">Londra (GMT+0)</SelectItem>
                    <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Dil</Label>
                <Select defaultValue="tr">
                  <SelectTrigger>
                    <SelectValue placeholder="Dil seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Otomatik Kaydetme</Label>
                  <p className="text-sm text-muted-foreground">İçerik düzenlerken otomatik olarak kaydet</p>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Tarih Formatı</Label>
                <Select defaultValue="dd/MM/yyyy">
                  <SelectTrigger>
                    <SelectValue placeholder="Tarih formatı seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/MM/yyyy">31/12/2025</SelectItem>
                    <SelectItem value="MM/dd/yyyy">12/31/2025</SelectItem>
                    <SelectItem value="yyyy-MM-dd">2025-12-31</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-format">Saat Formatı</Label>
                <RadioGroup defaultValue="24h" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24h" id="24h" />
                    <Label htmlFor="24h">24 saat (14:30)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="12h" id="12h" />
                    <Label htmlFor="12h">12 saat (2:30 PM)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Instagram Bağlantısı</CardTitle>
              <CardDescription>Instagram hesap ayarlarınızı yönetin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bağlı Hesaplar</Label>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs">IG</span>
                      </div>
                      <div>
                        <p className="font-medium">@instagram_hesabim</p>
                        <p className="text-xs text-muted-foreground">Bağlantı tarihi: 15.05.2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Bağlantıyı Kes
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Yeni Hesap Bağla</Label>
                <Button variant="outline" className="w-full">
                  Instagram Hesabı Bağla
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Otomatik Paylaşım Ayarları</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">Planlanan içerikleri otomatik paylaş</p>
                    <p className="text-xs text-muted-foreground">
                      Planlanan içerikler belirlenen saatte otomatik olarak paylaşılır
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Hashtag Ayarları</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">Hashtag önerilerini etkinleştir</p>
                    <p className="text-xs text-muted-foreground">İçerik oluştururken otomatik hashtag önerileri alın</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Analiz Ayarları</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">Haftalık analiz raporu</p>
                    <p className="text-xs text-muted-foreground">
                      Her hafta hesap performansınızla ilgili e-posta raporu alın
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm Ayarları</CardTitle>
              <CardDescription>Uygulama görünümünü özelleştirin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`h-20 w-full rounded-md bg-white border cursor-pointer ${theme === "light" ? "ring-2 ring-primary" : ""}`}
                      onClick={() => handleThemeChange("light")}
                    ></div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-light"
                        name="theme"
                        value="light"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        checked={theme === "light"}
                        onChange={() => handleThemeChange("light")}
                      />
                      <Label htmlFor="theme-light">Açık</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`h-20 w-full rounded-md bg-gray-900 border border-gray-800 cursor-pointer ${theme === "dark" ? "ring-2 ring-primary" : ""}`}
                      onClick={() => handleThemeChange("dark")}
                    ></div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-dark"
                        name="theme"
                        value="dark"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        checked={theme === "dark"}
                        onChange={() => handleThemeChange("dark")}
                      />
                      <Label htmlFor="theme-dark">Koyu</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`h-20 w-full rounded-md bg-gradient-to-b from-white to-gray-900 border cursor-pointer ${theme === "system" ? "ring-2 ring-primary" : ""}`}
                      onClick={() => handleThemeChange("system")}
                    ></div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-system"
                        name="theme"
                        value="system"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        checked={theme === "system"}
                        onChange={() => handleThemeChange("system")}
                      />
                      <Label htmlFor="theme-system">Sistem</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Yazı Boyutu</Label>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[fontSize]}
                    min={12}
                    max={24}
                    step={1}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                  <div className="flex justify-between">
                    <span className="text-xs">Küçük</span>
                    <span className="text-xs">Orta</span>
                    <span className="text-xs">Büyük</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium">Seçilen boyut: {fontSize}px</span>
                  </div>
                  <div className="p-4 border rounded-md" style={{ fontSize: `${fontSize}px` }}>
                    Bu bir örnek metindir. Yazı boyutu: {fontSize}px
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Renk Şeması</Label>
                <div className="grid grid-cols-4 gap-2">
                  <div
                    className="h-10 w-full rounded-md bg-[#7C3AED] cursor-pointer"
                    onClick={() => {
                      document.documentElement.style.setProperty("--primary", "252 94% 67%")
                      toast({
                        title: "Renk Şeması Değiştirildi",
                        description: "Mor renk şeması uygulandı.",
                      })
                    }}
                  ></div>
                  <div
                    className="h-10 w-full rounded-md bg-[#2563EB] cursor-pointer"
                    onClick={() => {
                      document.documentElement.style.setProperty("--primary", "221 83% 53%")
                      toast({
                        title: "Renk Şeması Değiştirildi",
                        description: "Mavi renk şeması uygulandı.",
                      })
                    }}
                  ></div>
                  <div
                    className="h-10 w-full rounded-md bg-[#10B981] cursor-pointer"
                    onClick={() => {
                      document.documentElement.style.setProperty("--primary", "152 76% 40%")
                      toast({
                        title: "Renk Şeması Değiştirildi",
                        description: "Yeşil renk şeması uygulandı.",
                      })
                    }}
                  ></div>
                  <div
                    className="h-10 w-full rounded-md bg-[#F59E0B] cursor-pointer"
                    onClick={() => {
                      document.documentElement.style.setProperty("--primary", "38 92% 50%")
                      toast({
                        title: "Renk Şeması Değiştirildi",
                        description: "Turuncu renk şeması uygulandı.",
                      })
                    }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Arayüz Yoğunluğu</Label>
                <RadioGroup defaultValue="comfortable" className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="compact" />
                    <Label htmlFor="compact">Sıkışık - Daha fazla içerik, daha az boşluk</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="comfortable" />
                    <Label htmlFor="comfortable">Rahat - Dengeli yerleşim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spacious" id="spacious" />
                    <Label htmlFor="spacious">Geniş - Daha fazla boşluk, daha az içerik</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardFooter>
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
                  <div className="space-y-0.5">
                    <Label>E-posta Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">Önemli güncellemeler için e-posta alın</p>
                  </div>
                  <Switch
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">Tarayıcı bildirimleri alın</p>
                  </div>
                  <Switch
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">Kritik uyarılar için SMS alın</p>
                  </div>
                  <Switch
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Bildirim Kategorileri</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">İçerik Planlaması</p>
                      <p className="text-xs text-muted-foreground">Planlanmış içerikler hakkında bildirimler</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Analiz Raporları</p>
                      <p className="text-xs text-muted-foreground">Performans raporları ve analizler</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Hesap Aktivitesi</p>
                      <p className="text-xs text-muted-foreground">Hesabınızdaki önemli değişiklikler</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Pazarlama Bildirimleri</p>
                      <p className="text-xs text-muted-foreground">Özel teklifler ve güncellemeler</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gelişmiş Ayarlar</CardTitle>
              <CardDescription>Gelişmiş uygulama ayarlarını yapılandırın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Veri Yedekleme</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">Otomatik Yedekleme</p>
                    <p className="text-xs text-muted-foreground">Verilerinizi haftalık olarak yedekleyin</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Manuel Yedekleme Oluştur
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>API Erişimi</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">API Erişimini Etkinleştir</p>
                    <p className="text-xs text-muted-foreground">Üçüncü taraf uygulamaların erişimine izin verin</p>
                  </div>
                  <Switch />
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full" disabled>
                    API Anahtarlarını Yönet
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Önbellek Yönetimi</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">Önbelleği Temizle</p>
                    <p className="text-xs text-muted-foreground">Uygulama önbelleğini temizleyin</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Önbellek Temizlendi",
                        description: "Uygulama önbelleği başarıyla temizlendi.",
                      })
                    }}
                  >
                    Temizle
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Hesap Silme</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Hesabımı Sil
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Hesabınızı silmek istediğinizden emin misiniz?</DialogTitle>
                      <DialogDescription>
                        Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Onaylamak için "SİL" yazın</Label>
                        <Input id="confirm" placeholder="SİL" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reason">Silme nedeniniz (isteğe bağlı)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Bir neden seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-useful">Uygulama ihtiyaçlarımı karşılamıyor</SelectItem>
                            <SelectItem value="too-expensive">Çok pahalı</SelectItem>
                            <SelectItem value="found-alternative">Alternatif bir çözüm buldum</SelectItem>
                            <SelectItem value="other">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">İptal</Button>
                      <Button variant="destructive">Hesabımı Kalıcı Olarak Sil</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p className="text-xs text-muted-foreground">
                  Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
