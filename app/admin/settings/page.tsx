import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sistem Ayarları</h1>
          <p className="text-muted-foreground">Platform ayarlarını yapılandırın.</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="backup">Yedekleme</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>Platformun genel ayarlarını yapılandırın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Adı</Label>
                <Input id="site-name" defaultValue="SocialPro Studio" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Açıklaması</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Instagram içerik yönetimi için geliştirilmiş profesyonel bir platform."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">İletişim E-postası</Label>
                <Input id="contact-email" type="email" defaultValue="info@socialprostudio.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Saat Dilimi</Label>
                <Select defaultValue="europe-istanbul">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Saat dilimi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-istanbul">Europe/Istanbul (UTC+3)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+0/+1)</SelectItem>
                    <SelectItem value="america-new_york">America/New_York (UTC-5/-4)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Bakım Modu</Label>
                  <p className="text-sm text-muted-foreground">
                    Bakım modu etkinleştirildiğinde, kullanıcılar siteye erişemez.
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Değişiklikleri Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
              <CardDescription>Platform güvenlik ayarlarını yapılandırın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Şifre Politikası</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Şifre politikası seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Temel (En az 8 karakter)</SelectItem>
                    <SelectItem value="medium">Orta (En az 8 karakter, 1 büyük harf, 1 rakam)</SelectItem>
                    <SelectItem value="strong">
                      Güçlü (En az 10 karakter, 1 büyük harf, 1 rakam, 1 özel karakter)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Oturum Zaman Aşımı (dakika)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">İki Faktörlü Kimlik Doğrulama</Label>
                  <p className="text-sm text-muted-foreground">
                    Tüm kullanıcılar için iki faktörlü kimlik doğrulamayı zorunlu kılın.
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-restriction">IP Kısıtlaması</Label>
                  <p className="text-sm text-muted-foreground">
                    Admin paneline erişimi belirli IP adreslerine kısıtlayın.
                  </p>
                </div>
                <Switch id="ip-restriction" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Değişiklikleri Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Ayarları</CardTitle>
              <CardDescription>API entegrasyonlarını yapılandırın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram-api-key">Instagram API Anahtarı</Label>
                <Input id="instagram-api-key" type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="openai-api-key">OpenAI API Anahtarı</Label>
                <Input id="openai-api-key" type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate-limit">API İstek Limiti (dakika başına)</Label>
                <Input id="rate-limit" type="number" defaultValue="100" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-logging">API Günlük Kaydı</Label>
                  <p className="text-sm text-muted-foreground">Tüm API isteklerini ve yanıtlarını kaydedin.</p>
                </div>
                <Switch id="api-logging" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Değişiklikleri Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>Sistem bildirimlerini yapılandırın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Sunucusu</Label>
                <Input id="smtp-host" defaultValue="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" type="number" defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Kullanıcı Adı</Label>
                <Input id="smtp-username" defaultValue="notifications@socialprostudio.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Şifresi</Label>
                <Input id="smtp-password" type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">E-posta Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">Sistem olayları için e-posta bildirimleri gönderin.</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Değişiklikleri Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yedekleme Ayarları</CardTitle>
              <CardDescription>Veri yedekleme ayarlarını yapılandırın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Yedekleme Sıklığı</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Yedekleme sıklığı seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Saatlik</SelectItem>
                    <SelectItem value="daily">Günlük</SelectItem>
                    <SelectItem value="weekly">Haftalık</SelectItem>
                    <SelectItem value="monthly">Aylık</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Yedek Saklama Süresi (gün)</Label>
                <Input id="backup-retention" type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-storage">Yedekleme Depolama</Label>
                <Select defaultValue="s3">
                  <SelectTrigger id="backup-storage">
                    <SelectValue placeholder="Depolama seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Yerel Depolama</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Otomatik Yedekleme</Label>
                  <p className="text-sm text-muted-foreground">Belirlenen sıklıkta otomatik yedekleme yapın.</p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Manuel Yedekleme</Button>
              <Button>Değişiklikleri Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
