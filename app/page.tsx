import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarIcon,
  LineChartIcon as ChartLineUp,
  CheckIcon,
  HashIcon as HashtagIcon,
  PaintbrushIcon as PaintBrushIcon,
  BotIcon as RobotIcon,
  UsersIcon,
  XIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-950 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Instagram İçeriklerinizi <span className="gradient-text">Profesyonelce</span> Yönetin
              </h1>
              <p className="text-muted-foreground md:text-xl">
                SocialPro Studio ile Instagram hesabınızı analiz edin, içeriklerinizi planlayın, görsellerinizi
                tasarlayın ve etkileşiminizi artırın.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link href="/register">Ücretsiz Başlayın</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#demo">Demo İzle</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm text-muted-foreground">Aktif Kullanıcı</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5M+</div>
                  <div className="text-sm text-muted-foreground">Analiz Edilen Gönderi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">%40</div>
                  <div className="text-sm text-muted-foreground">Etkileşim Artışı</div>
                </div>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 rounded-xl blur-3xl opacity-30"></div>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="SocialPro Studio Dashboard"
                width={800}
                height={600}
                className="relative rounded-xl shadow-xl border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Öne Çıkan Özellikler</h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Instagram hesabınızı yönetmek için ihtiyacınız olan tüm araçlar tek bir platformda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ChartLineUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Detaylı Analitik</h3>
                <p className="text-muted-foreground">
                  Takipçi artışı, etkileşim oranları ve içerik performansınızı detaylı grafiklerle analiz edin.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">İçerik Takvimi</h3>
                <p className="text-muted-foreground">
                  İçeriklerinizi önceden planlayın, takvimde düzenleyin ve otomatik paylaşım zamanı hatırlatmaları alın.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <PaintBrushIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Görsel Editör</h3>
                <p className="text-muted-foreground">
                  Profesyonel görünümlü Instagram gönderileri oluşturmak için kullanıcı dostu görsel editörümüzü
                  kullanın.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HashtagIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Hashtag Önerileri</h3>
                <p className="text-muted-foreground">
                  İçeriğinize uygun, etkileşimi artıracak popüler ve niş hashtag önerileri alın.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Rakip Analizi</h3>
                <p className="text-muted-foreground">
                  Rakiplerinizin stratejilerini analiz edin, içerik performanslarını karşılaştırın ve öne geçin.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <RobotIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Yapay Zeka İçerik</h3>
                <p className="text-muted-foreground">
                  Yapay zeka destekli içerik önerileri ile etkileşimi yüksek gönderiler oluşturun.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-20 bg-slate-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Nasıl Çalışır?</h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              SocialPro Studio ile Instagram hesabınızı yönetmek çok kolay.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <div className="absolute top-0 left-6 h-full w-px bg-border md:hidden"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold">Hesabınızı Bağlayın</h3>
                <p className="text-muted-foreground">
                  Instagram hesabınızı SocialPro Studio'ya bağlayarak analizlere hemen başlayın.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-6 h-full w-px bg-border md:hidden"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold">İçeriklerinizi Planlayın</h3>
                <p className="text-muted-foreground">
                  İçerik takviminizi oluşturun ve paylaşımlarınızı önceden planlayın.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-6 h-full w-px bg-border md:hidden"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold">Görsellerinizi Tasarlayın</h3>
                <p className="text-muted-foreground">
                  Görsel editörümüzle profesyonel Instagram gönderileri oluşturun.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                4
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold">Sonuçları Analiz Edin</h3>
                <p className="text-muted-foreground">
                  Detaylı analizlerle stratejinizi sürekli geliştirin ve etkileşiminizi artırın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Uygun Fiyatlı Paketler</h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              İhtiyacınıza en uygun paketi seçin ve Instagram hesabınızı profesyonelce yönetmeye başlayın.
            </p>
          </div>

          <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto mb-8">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Aylık</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yıllık{" "}
                  <span className="ml-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded-full">
                    %20 İndirim
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">Ücretsiz</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">₺0</span>
                      <span className="text-muted-foreground ml-1">/ay</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Temel Instagram Analizi</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>1 Instagram Hesabı</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Basit Hashtag Önerileri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>İçerik Takvimi (3 içerik)</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Görsel Editör</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Rakip Analizi</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Yapay Zeka İçerik Önerisi</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/register?package=free">Ücretsiz Başla</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">Bronze</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">₺99</span>
                      <span className="text-muted-foreground ml-1">/ay</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Instagram Analizi</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Optimum Paylaşım Saatleri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Temel Hashtag Önerileri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>İçerik Takvimi (5 içerik)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Temel Görsel Editör</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Rakip Analizi</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Yapay Zeka İçerik Önerisi</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/register?package=bronze">Şimdi Başla</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="relative border-primary">
                  <div className="popular-badge">En Popüler</div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">Silver</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">₺199</span>
                      <span className="text-muted-foreground ml-1">/ay</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Instagram Analizi</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Optimum Paylaşım Saatleri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Gelişmiş Hashtag Önerileri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>İçerik Takvimi (Sınırsız)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Gelişmiş Görsel Editör</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Rakip Analizi (3 hesap)</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Yapay Zeka İçerik Önerisi</span>
                      </li>
                    </ul>
                    <Button className="w-full" asChild>
                      <Link href="/register?package=silver">Şimdi Başla</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">Gold</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">₺349</span>
                      <span className="text-muted-foreground ml-1">/ay</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Instagram Analizi</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Optimum Paylaşım Saatleri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Premium Hashtag Önerileri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>İçerik Takvimi (Sınırsız)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Premium Görsel Editör</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Rakip Analizi (Sınırsız)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Yapay Zeka İçerik Önerisi</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/register?package=gold">Şimdi Başla</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="yearly">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">Ücretsiz</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">₺0</span>
                      <span className="text-muted-foreground ml-1">/yıl</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Temel Instagram Analizi</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>1 Instagram Hesabı</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Basit Hashtag Önerileri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>İçerik Takvimi (3 içerik)</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Görsel Editör</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Rakip Analizi</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Yapay Zeka İçerik Önerisi</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/register?package=free&billing=yearly">Ücretsiz Başla</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">Bronze</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">₺948</span>
                      <span className="text-muted-foreground ml-1">/yıl</span>
                    </div>
                    <p className="text-sm text-muted-foreground">₺79/ay olarak ücretlendirilir</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Instagram Analizi</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Optimum Paylaşım Saatleri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Temel Hashtag Önerileri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>İçerik Takvimi (5 içerik)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Temel Görsel Editör</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Rakip Analizi</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Yapay Zeka İçerik Önerisi</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/register?package=bronze&billing=yearly">Şimdi Başla</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="relative border-primary">
                  <div className="popular-badge">En Popüler</div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">Silver</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">₺1,908</span>
                      <span className="text-muted-foreground ml-1">/yıl</span>
                    </div>
                    <p className="text-sm text-muted-foreground">₺159/ay olarak ücretlendirilir</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Instagram Analizi</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Optimum Paylaşım Saatleri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Gelişmiş Hashtag Önerileri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>İçerik Takvimi (Sınırsız)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Gelişmiş Görsel Editör</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Rakip Analizi (3 hesap)</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <XIcon className="h-5 w-5 mr-2" />
                        <span>Yapay Zeka İçerik Önerisi</span>
                      </li>
                    </ul>
                    <Button className="w-full" asChild>
                      <Link href="/register?package=silver&billing=yearly">Şimdi Başla</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold">Gold</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">₺3,350</span>
                      <span className="text-muted-foreground ml-1">/yıl</span>
                    </div>
                    <p className="text-sm text-muted-foreground">₺279/ay olarak ücretlendirilir</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Instagram Analizi</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Optimum Paylaşım Saatleri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Premium Hashtag Önerileri</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>İçerik Takvimi (Sınırsız)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Premium Görsel Editör</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Rakip Analizi (Sınırsız)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Yapay Zeka İçerik Önerisi</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/register?package=gold&billing=yearly">Şimdi Başla</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-20 bg-slate-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Kullanıcılarımız Ne Diyor?</h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              SocialPro Studio'yu kullanan binlerce kullanıcının deneyimlerini okuyun.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="italic">
                    "SocialPro Studio sayesinde Instagram hesabımın etkileşim oranı %40 arttı. Özellikle içerik takvimi
                    ve optimum paylaşım saatleri özelliği çok işime yarıyor. Kesinlikle tavsiye ederim!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Ayşe Yılmaz"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Ayşe Yılmaz</h4>
                      <p className="text-sm text-muted-foreground">Moda Influencer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-6 gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Sıkça Sorulan Sorular</h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              SocialPro Studio hakkında merak ettiğiniz soruların cevapları.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    SocialPro Studio'yu kullanmak için Instagram hesabımı bağlamak zorunda mıyım?
                  </h3>
                  <p className="text-muted-foreground">
                    Evet, SocialPro Studio'nun analiz ve içerik yönetimi özelliklerini kullanabilmek için Instagram
                    hesabınızı bağlamanız gerekmektedir. Hesap bağlama işlemi tamamen güvenlidir ve hesabınızın
                    şifresini saklamayız.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Paketimi istediğim zaman değiştirebilir miyim?</h3>
                  <p className="text-muted-foreground">
                    Evet, paketinizi istediğiniz zaman yükseltebilir veya düşürebilirsiniz. Paket değişikliği anında
                    gerçekleşir ve ücretlendirme kalan süreye göre hesaplanır.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    İçerik takvimindeki paylaşımlar otomatik olarak Instagram'da paylaşılıyor mu?
                  </h3>
                  <p className="text-muted-foreground">
                    Hayır, içerik takvimine eklediğiniz paylaşımlar otomatik olarak Instagram'da paylaşılmaz. Planlanan
                    saatte size bildirim gönderilir ve paylaşımı manuel olarak yapmanız gerekir. Instagram'ın API
                    kısıtlamaları nedeniyle otomatik paylaşım şu anda mümkün değildir.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Yapay zeka içerik önerisi nasıl çalışır?</h3>
                  <p className="text-muted-foreground">
                    Yapay zeka içerik önerisi, Gold paket kullanıcılarına sunulan özel bir özelliktir. Belirlediğiniz
                    konu ve ton doğrultusunda, yapay zeka algoritması size Instagram gönderileri ve hikayeleri için
                    metin önerileri sunar. Bu öneriler, etkileşimi artırmak için optimize edilmiştir.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Ödeme yöntemleri nelerdir?</h3>
                  <p className="text-muted-foreground">
                    SocialPro Studio'da ödemelerinizi Shopier üzerinden kredi kartı, banka kartı veya havale/EFT
                    yöntemleriyle güvenle gerçekleştirebilirsiniz. Tüm ödemeler 256-bit SSL sertifikası ile
                    korunmaktadır.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Instagram Hesabınızı Profesyonelce Yönetmeye Başlayın
            </h2>
            <p className="md:text-xl">
              SocialPro Studio ile etkileşiminizi artırın, takipçi kazanın ve içeriklerinizi planlayın. Hemen ücretsiz
              denemeye başlayın!
            </p>
            <Button size="lg" variant="secondary" className="mt-4" asChild>
              <Link href="/register">Ücretsiz Başlayın</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
