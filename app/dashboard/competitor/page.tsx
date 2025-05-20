"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  SearchIcon,
  TrendingUpIcon,
  BarChart3Icon,
  HashIcon as HashtagIcon,
  ClockIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
  BookmarkIcon,
  SendIcon,
  EyeIcon,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Rakip profil tipi
interface CompetitorProfile {
  username: string
  fullName: string
  profilePic: string
  followers: number
  following: number
  posts: number
  engagement: number
  bio: string
  website: string
  avgLikes: number
  avgComments: number
  topHashtags: string[]
  topPosts: {
    image: string
    likes: number
    comments: number
    saves: number
    shares: number
    views: number
    caption: string
    date: string
  }[]
}

export default function CompetitorAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [competitor, setCompetitor] = useState<CompetitorProfile | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  // Demo rakip profili
  const demoCompetitor: CompetitorProfile = {
    username: "fashionbrand",
    fullName: "Fashion Brand",
    profilePic: "/placeholder.svg?height=100&width=100",
    followers: 125000,
    following: 850,
    posts: 432,
    engagement: 3.8,
    bio: "Official account of Fashion Brand. Latest trends and styles for modern fashion lovers. #FashionBrand",
    website: "www.fashionbrand.com",
    avgLikes: 4250,
    avgComments: 187,
    topHashtags: ["fashionbrand", "fashion", "style", "ootd", "newcollection", "summerstyle", "trendy", "outfitinspo"],
    topPosts: [
      {
        image: "/placeholder.svg?height=300&width=300",
        likes: 8750,
        comments: 342,
        saves: 1250,
        shares: 187,
        views: 45000,
        caption: "Yeni yaz koleksiyonumuz ile tarzınızı yükseltin! #SummerCollection #FashionBrand",
        date: "15 Mayıs 2025",
      },
      {
        image: "/placeholder.svg?height=300&width=300",
        likes: 7820,
        comments: 298,
        saves: 980,
        shares: 145,
        views: 38000,
        caption: "Sezonun en trend parçaları şimdi mağazalarımızda! #NewArrivals #TrendAlert",
        date: "2 Mayıs 2025",
      },
      {
        image: "/placeholder.svg?height=300&width=300",
        likes: 6950,
        comments: 276,
        saves: 820,
        shares: 132,
        views: 32000,
        caption: "Bahar stilinizi yenileyin! Yeni koleksiyonumuz ile tarzınızı konuşturun. #SpringStyle",
        date: "18 Nisan 2025",
      },
    ],
  }

  // Rakip arama işlevi
  const searchCompetitor = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Kullanıcı adı gerekli",
        description: "Lütfen bir Instagram kullanıcı adı girin",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    // Gerçek bir API çağrısı yapılacak yer
    // Burada sadece simüle ediyoruz
    setTimeout(() => {
      setCompetitor({
        ...demoCompetitor,
        username: searchQuery.toLowerCase().replace(/\s+/g, ""),
        fullName: searchQuery
          .split(/\s+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      })
      setIsSearching(false)

      toast({
        title: "Rakip analizi hazır",
        description: `@${searchQuery} için analiz sonuçları görüntüleniyor`,
      })
    }, 1500)
  }

  // Sayıları formatlama
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rakip Analizi</h1>
          <p className="text-muted-foreground">Rakiplerinizin Instagram performansını analiz edin.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rakip Arama</CardTitle>
          <CardDescription>Instagram kullanıcı adı girerek rakip analizi yapın</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Instagram kullanıcı adı girin..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchCompetitor()}
                />
              </div>
            </div>
            <Button onClick={searchCompetitor} disabled={isSearching}>
              {isSearching ? "Analiz Ediliyor..." : "Analiz Et"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {competitor && (
        <>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={competitor.profilePic || "/placeholder.svg"}
                    alt={competitor.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">@{competitor.username}</h2>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                      Rakip
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{competitor.fullName}</p>
                  <p className="text-sm mt-1">{competitor.bio}</p>
                  {competitor.website && (
                    <a
                      href={`https://${competitor.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {competitor.website}
                    </a>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 border rounded-md">
                  <p className="text-2xl font-bold">{formatNumber(competitor.followers)}</p>
                  <p className="text-sm text-muted-foreground">Takipçi</p>
                </div>
                <div className="text-center p-3 border rounded-md">
                  <p className="text-2xl font-bold">{formatNumber(competitor.following)}</p>
                  <p className="text-sm text-muted-foreground">Takip</p>
                </div>
                <div className="text-center p-3 border rounded-md">
                  <p className="text-2xl font-bold">{formatNumber(competitor.posts)}</p>
                  <p className="text-sm text-muted-foreground">Gönderi</p>
                </div>
                <div className="text-center p-3 border rounded-md">
                  <p className="text-2xl font-bold">%{competitor.engagement.toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">Etkileşim Oranı</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
              <TabsTrigger value="content">İçerik Analizi</TabsTrigger>
              <TabsTrigger value="hashtags">Hashtag Analizi</TabsTrigger>
              <TabsTrigger value="engagement">Etkileşim</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performans Özeti</CardTitle>
                  <CardDescription>Son 30 günlük performans metrikleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ortalama Beğeni</CardTitle>
                        <ThumbsUpIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatNumber(competitor.avgLikes)}</div>
                        <p className="text-xs text-muted-foreground">Gönderi başına ortalama beğeni sayısı</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ortalama Yorum</CardTitle>
                        <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatNumber(competitor.avgComments)}</div>
                        <p className="text-xs text-muted-foreground">Gönderi başına ortalama yorum sayısı</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gönderi Sıklığı</CardTitle>
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3.2</div>
                        <p className="text-xs text-muted-foreground">Haftalık ortalama gönderi sayısı</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Takipçi Artışı</CardTitle>
                        <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">+2.8%</div>
                        <p className="text-xs text-muted-foreground">Son 30 günde takipçi artış oranı</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Rakip Hakkında Öne Çıkan Bilgiler</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3Icon className="h-5 w-5 text-blue-500" />
                          <h4 className="font-medium">Etkileşim Performansı</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Bu rakip, sektör ortalamasının %15 üzerinde bir etkileşim oranına sahip. Özellikle ürün
                          tanıtımı içeren gönderiler daha yüksek etkileşim alıyor.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <ClockIcon className="h-5 w-5 text-green-500" />
                          <h4 className="font-medium">Paylaşım Stratejisi</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Genellikle Salı ve Perşembe günleri 18:00-20:00 saatleri arasında paylaşım yapıyor. Bu zaman
                          dilimlerinde etkileşim oranı %23 daha yüksek.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <HashtagIcon className="h-5 w-5 text-purple-500" />
                          <h4 className="font-medium">Hashtag Stratejisi</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ortalama 8-10 hashtag kullanıyor. Kendi marka hashtag'ini her gönderide kullanırken, trend
                          hashtag'leri de etkin şekilde takip ediyor.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>En Başarılı İçerikler</CardTitle>
                  <CardDescription>En çok etkileşim alan gönderiler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {competitor.topPosts.map((post, index) => (
                      <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border rounded-md">
                        <div className="w-full md:w-1/3">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={`Top post ${index + 1}`}
                            className="w-full h-auto rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm mb-2">{post.caption}</p>
                          <div className="flex items-center text-xs text-muted-foreground mb-4">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-sm">
                            <div className="flex items-center">
                              <ThumbsUpIcon className="h-3 w-3 mr-1" />
                              <span>{formatNumber(post.likes)}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageSquareIcon className="h-3 w-3 mr-1" />
                              <span>{formatNumber(post.comments)}</span>
                            </div>
                            <div className="flex items-center">
                              <BookmarkIcon className="h-3 w-3 mr-1" />
                              <span>{formatNumber(post.saves)}</span>
                            </div>
                            <div className="flex items-center">
                              <SendIcon className="h-3 w-3 mr-1" />
                              <span>{formatNumber(post.shares)}</span>
                            </div>
                            <div className="flex items-center">
                              <EyeIcon className="h-3 w-3 mr-1" />
                              <span>{formatNumber(post.views)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Bu veriler son 90 günlük içerik performansına dayanmaktadır.
                  </p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>İçerik Türü Analizi</CardTitle>
                  <CardDescription>Farklı içerik türlerinin performans karşılaştırması</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>İçerik Türü</TableHead>
                        <TableHead>Paylaşım Oranı</TableHead>
                        <TableHead>Ort. Beğeni</TableHead>
                        <TableHead>Ort. Yorum</TableHead>
                        <TableHead>Ort. Etkileşim</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Ürün Fotoğrafları</TableCell>
                        <TableCell>45%</TableCell>
                        <TableCell>{formatNumber(4800)}</TableCell>
                        <TableCell>{formatNumber(210)}</TableCell>
                        <TableCell>4.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Lifestyle Fotoğraflar</TableCell>
                        <TableCell>25%</TableCell>
                        <TableCell>{formatNumber(5200)}</TableCell>
                        <TableCell>{formatNumber(245)}</TableCell>
                        <TableCell>4.6%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Kullanıcı İçerikleri</TableCell>
                        <TableCell>15%</TableCell>
                        <TableCell>{formatNumber(3900)}</TableCell>
                        <TableCell>{formatNumber(180)}</TableCell>
                        <TableCell>3.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Video İçerikler</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>{formatNumber(6100)}</TableCell>
                        <TableCell>{formatNumber(320)}</TableCell>
                        <TableCell>5.4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Kampanya/İndirim</TableCell>
                        <TableCell>5%</TableCell>
                        <TableCell>{formatNumber(3500)}</TableCell>
                        <TableCell>{formatNumber(150)}</TableCell>
                        <TableCell>3.1%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hashtags" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hashtag Analizi</CardTitle>
                  <CardDescription>En sık kullanılan ve en etkili hashtag'ler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">En Sık Kullanılan Hashtag'ler</h3>
                      <div className="flex flex-wrap gap-2">
                        {competitor.topHashtags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <HashtagIcon className="h-3 w-3" />
                            {tag}
                            <span className="text-xs text-muted-foreground ml-1">
                              {Math.floor(Math.random() * 100) + 1}%
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Hashtag Performans Analizi</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Hashtag</TableHead>
                            <TableHead>Kullanım Sayısı</TableHead>
                            <TableHead>Ort. Etkileşim</TableHead>
                            <TableHead>Erişim Etkisi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {competitor.topHashtags.slice(0, 5).map((tag, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">#{tag}</TableCell>
                              <TableCell>{Math.floor(Math.random() * 50) + 10}</TableCell>
                              <TableCell>+{(Math.random() * 20 + 5).toFixed(1)}%</TableCell>
                              <TableCell>+{(Math.random() * 30 + 10).toFixed(1)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Önerilen Hashtag'ler</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Rakibinizin kullandığı hashtag'lere benzer, ancak daha yüksek potansiyele sahip hashtag'ler:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "fashioninspo",
                          "styleoftheday",
                          "outfitgoals",
                          "fashiondaily",
                          "trendyoutfits",
                          "summerlooks",
                          "fashiontrends2025",
                          "styleinspo",
                        ].map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          >
                            <HashtagIcon className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Etkileşim Analizi</CardTitle>
                  <CardDescription>Takipçi etkileşimi ve içerik performansı</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Etkileşim Dağılımı</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Beğeniler</span>
                              <span className="text-sm font-medium">78%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Yorumlar</span>
                              <span className="text-sm font-medium">12%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "12%" }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Kaydetmeler</span>
                              <span className="text-sm font-medium">7%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "7%" }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Paylaşımlar</span>
                              <span className="text-sm font-medium">3%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: "3%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">En Aktif Saatler</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">18:00 - 20:00</span>
                              <span className="text-sm font-medium">32%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "32%" }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm">12:00 - 14:00</span>
                              <span className="text-sm font-medium">24%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "24%" }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm">20:00 - 22:00</span>
                              <span className="text-sm font-medium">18%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm">08:00 - 10:00</span>
                              <span className="text-sm font-medium">14%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "14%" }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Takipçi Demografisi</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Cinsiyet Dağılımı</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Kadın</span>
                                <span className="text-sm font-medium">68%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm">Erkek</span>
                                <span className="text-sm font-medium">32%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "32%" }}></div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Yaş Dağılımı</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">18-24</span>
                                <span className="text-sm font-medium">35%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm">25-34</span>
                                <span className="text-sm font-medium">42%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm">35-44</span>
                                <span className="text-sm font-medium">18%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm">45+</span>
                                <span className="text-sm font-medium">5%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
