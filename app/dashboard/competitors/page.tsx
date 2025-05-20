"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Instagram, Users, Hash, TrendingUp, Search } from "lucide-react"
import Image from "next/image"

// Demo rakip verileri
const competitors = {
  fashionbrand: {
    username: "fashionbrand",
    name: "Fashion Brand",
    followers: 125000,
    following: 850,
    posts: 1240,
    engagement: 3.2,
    bio: "Moda ve stil için en iyi adres. #fashion #style #trendy",
    profileImage: "/placeholder.svg?height=150&width=150",
    topHashtags: ["fashion", "style", "ootd", "trendy", "outfit"],
    postFrequency: "Günde 2-3 gönderi",
    contentTypes: ["Ürün", "Lifestyle", "Model", "Behind the scenes"],
    recentPosts: [
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 5240,
        comments: 124,
        caption: "Yeni koleksiyonumuz çok yakında! #newcollection",
      },
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 4890,
        comments: 98,
        caption: "Yaz stilinizi tamamlayacak aksesuarlar #summer",
      },
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 6120,
        comments: 145,
        caption: "Bu sezonun trend renkleri #trendy #fashion",
      },
    ],
  },
  beautybrand: {
    username: "beautybrand",
    name: "Beauty Brand",
    followers: 98000,
    following: 720,
    posts: 890,
    engagement: 4.1,
    bio: "Doğal güzelliğinizi ortaya çıkarın. #beauty #skincare #natural",
    profileImage: "/placeholder.svg?height=150&width=150",
    topHashtags: ["beauty", "skincare", "makeup", "natural", "glow"],
    postFrequency: "Günde 1-2 gönderi",
    contentTypes: ["Ürün", "Tutorial", "Before/After", "Influencer"],
    recentPosts: [
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 4120,
        comments: 210,
        caption: "Cildinize bahar tazeliği #skincare",
      },
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 3890,
        comments: 175,
        caption: "5 dakikada doğal makyaj #naturalmakeup",
      },
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 4560,
        comments: 198,
        caption: "Yeni cilt bakım rutininiz #routine #skincare",
      },
    ],
  },
  techbrand: {
    username: "techbrand",
    name: "Tech Brand",
    followers: 75000,
    following: 450,
    posts: 620,
    engagement: 2.8,
    bio: "Teknoloji dünyasındaki son gelişmeler. #tech #innovation #gadgets",
    profileImage: "/placeholder.svg?height=150&width=150",
    topHashtags: ["tech", "innovation", "gadgets", "smartphone", "laptop"],
    postFrequency: "Haftada 4-5 gönderi",
    contentTypes: ["Ürün", "Review", "Unboxing", "Tech News"],
    recentPosts: [
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 3240,
        comments: 187,
        caption: "Yeni akıllı saatimiz ile tanışın #smartwatch",
      },
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 2980,
        comments: 145,
        caption: "Teknoloji dünyasında bu hafta #technews",
      },
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 3560,
        comments: 210,
        caption: "En yeni laptop modellerimiz #laptop #tech",
      },
    ],
  },
  foodbrand: {
    username: "foodbrand",
    name: "Food Brand",
    followers: 112000,
    following: 920,
    posts: 1450,
    engagement: 5.2,
    bio: "Lezzetli tarifler ve yemek önerileri. #food #recipes #delicious",
    profileImage: "/placeholder.svg?height=150&width=150",
    topHashtags: ["food", "recipes", "delicious", "homemade", "foodie"],
    postFrequency: "Günde 2-3 gönderi",
    contentTypes: ["Yemek", "Tarif", "Restaurant", "Behind the scenes"],
    recentPosts: [
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 7240,
        comments: 320,
        caption: "Hafta sonu kahvaltı önerisi #breakfast",
      },
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 6890,
        comments: 275,
        caption: "10 dakikada hazırlayabileceğiniz tatlılar #dessert",
      },
      {
        image: "/placeholder.svg?height=200&width=200",
        likes: 8120,
        comments: 345,
        caption: "Akşam yemeği için sağlıklı alternatifler #healthy",
      },
    ],
  },
}

export default function CompetitorsPage() {
  const [username, setUsername] = useState("")
  const [competitor, setCompetitor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = () => {
    setIsLoading(true)
    setError("")

    // Demo için gecikme ekleyelim
    setTimeout(() => {
      const foundCompetitor = competitors[username.toLowerCase() as keyof typeof competitors]

      if (foundCompetitor) {
        setCompetitor(foundCompetitor)
        setError("")
      } else {
        setCompetitor(null)
        setError("Rakip bulunamadı. Lütfen geçerli bir kullanıcı adı girin.")
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Rakip Analizi</h2>
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Instagram Kullanıcı Adı
          </label>
          <Input
            id="username"
            placeholder="örn. fashionbrand, beautybrand, techbrand, foodbrand"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch} disabled={isLoading || !username}>
          {isLoading ? "Aranıyor..." : "Analiz Et"}
          <Search className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md">{error}</div>}

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      )}

      {competitor && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <Image
                  src={competitor.profileImage || "/placeholder.svg"}
                  alt={competitor.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <CardTitle className="text-2xl">{competitor.name}</CardTitle>
                  <CardDescription className="text-base">@{competitor.username}</CardDescription>
                  <p className="mt-2 text-sm">{competitor.bio}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{competitor.followers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Takipçi</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{competitor.following.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Takip</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{competitor.posts.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Gönderi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="content">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="content">
                <Instagram className="h-4 w-4 mr-2" />
                İçerik
              </TabsTrigger>
              <TabsTrigger value="hashtags">
                <Hash className="h-4 w-4 mr-2" />
                Hashtagler
              </TabsTrigger>
              <TabsTrigger value="engagement">
                <BarChart3 className="h-4 w-4 mr-2" />
                Etkileşim
              </TabsTrigger>
              <TabsTrigger value="audience">
                <Users className="h-4 w-4 mr-2" />
                Kitle
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>İçerik Analizi</CardTitle>
                  <CardDescription>Rakibinizin içerik stratejisi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Gönderi Sıklığı</h4>
                    <p>{competitor.postFrequency}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">İçerik Türleri</h4>
                    <div className="flex flex-wrap gap-2">
                      {competitor.contentTypes.map((type: string) => (
                        <span key={type} className="bg-muted px-2 py-1 rounded-md text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Son Gönderiler</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {competitor.recentPosts.map((post: any, index: number) => (
                        <div key={index} className="border rounded-md overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={`Post ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-auto"
                          />
                          <div className="p-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{post.likes} beğeni</span>
                              <span>{post.comments} yorum</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{post.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hashtags">
              <Card>
                <CardHeader>
                  <CardTitle>Hashtag Analizi</CardTitle>
                  <CardDescription>Rakibinizin en çok kullandığı hashtagler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">En Popüler Hashtagler</h4>
                      <div className="flex flex-wrap gap-2">
                        {competitor.topHashtags.map((tag: string) => (
                          <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Hashtag Kullanım Stratejisi</h4>
                      <p>
                        Rakibiniz genellikle gönderi başına 5-7 hashtag kullanıyor. Hashtagler genellikle marka, ürün
                        kategorisi ve trend konular etrafında yoğunlaşıyor.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Önerilen Hashtagler</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Rakibinizin başarılı içeriklerinde kullandığı hashtagleri siz de deneyebilirsiniz:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {competitor.topHashtags.slice(0, 3).map((tag: string) => (
                          <span
                            key={`rec-${tag}`}
                            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                        <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                          #instagram
                        </span>
                        <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                          #instagood
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement">
              <Card>
                <CardHeader>
                  <CardTitle>Etkileşim Analizi</CardTitle>
                  <CardDescription>Rakibinizin etkileşim oranları ve performansı</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Ortalama Etkileşim Oranı</h4>
                      <p className="text-sm text-muted-foreground">Beğeni ve yorumların takipçi sayısına oranı</p>
                    </div>
                    <div className="text-2xl font-bold text-primary">%{competitor.engagement}</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Etkileşim Dağılımı</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Beğeniler</span>
                        <span className="text-sm font-medium">%85</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Yorumlar</span>
                        <span className="text-sm font-medium">%12</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Kaydetmeler</span>
                        <span className="text-sm font-medium">%3</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "3%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">En Yüksek Etkileşimli İçerik Türleri</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{competitor.contentTypes[0]}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ortalama %{(competitor.engagement * 1.2).toFixed(1)} etkileşim oranı
                        </p>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{competitor.contentTypes[1]}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ortalama %{(competitor.engagement * 1.1).toFixed(1)} etkileşim oranı
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience">
              <Card>
                <CardHeader>
                  <CardTitle>Kitle Analizi</CardTitle>
                  <CardDescription>Rakibinizin takipçi demografisi ve özellikleri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Cinsiyet Dağılımı</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-4">
                          <div className="bg-blue-500 h-4 rounded-l-full" style={{ width: "35%" }}></div>
                          <div
                            className="bg-pink-500 h-4 rounded-r-full"
                            style={{ width: "65%", marginLeft: "35%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Erkek: %35</span>
                        <span>Kadın: %65</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Yaş Dağılımı</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">18-24</span>
                          <span className="text-xs">%25</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">25-34</span>
                          <span className="text-xs">%45</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">35-44</span>
                          <span className="text-xs">%20</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">45+</span>
                          <span className="text-xs">%10</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Konum</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="border rounded-md p-2">
                        <p className="text-sm font-medium">İstanbul</p>
                        <p className="text-xs text-muted-foreground">%35</p>
                      </div>
                      <div className="border rounded-md p-2">
                        <p className="text-sm font-medium">Ankara</p>
                        <p className="text-xs text-muted-foreground">%15</p>
                      </div>
                      <div className="border rounded-md p-2">
                        <p className="text-sm font-medium">İzmir</p>
                        <p className="text-xs text-muted-foreground">%12</p>
                      </div>
                      <div className="border rounded-md p-2">
                        <p className="text-sm font-medium">Diğer</p>
                        <p className="text-xs text-muted-foreground">%38</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">İlgi Alanları</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-muted px-2 py-1 rounded-md text-xs">Moda</span>
                      <span className="bg-muted px-2 py-1 rounded-md text-xs">Alışveriş</span>
                      <span className="bg-muted px-2 py-1 rounded-md text-xs">Güzellik</span>
                      <span className="bg-muted px-2 py-1 rounded-md text-xs">Seyahat</span>
                      <span className="bg-muted px-2 py-1 rounded-md text-xs">Yemek</span>
                      <span className="bg-muted px-2 py-1 rounded-md text-xs">Fitness</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
