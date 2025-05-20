"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CopyIcon, HashIcon, SearchIcon, TrendingUpIcon, SaveIcon, TrashIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function HashtagsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("popular")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Array<{ name: string; count: string }>>([])
  const [savedHashtags, setSavedHashtags] = useState<Array<{ name: string; count: string; date: string }>>([])
  const { toast } = useToast()

  // Hashtag kategorileri
  const categories = {
    popular: {
      high: [
        { name: "fashion", count: "24.5M" },
        { name: "style", count: "18.2M" },
        { name: "ootd", count: "15.7M" },
        { name: "fashionblogger", count: "12.3M" },
        { name: "instafashion", count: "10.8M" },
        { name: "streetstyle", count: "8.4M" },
        { name: "fashionstyle", count: "7.2M" },
        { name: "outfitoftheday", count: "6.9M" },
      ],
      medium: [
        { name: "fashioninspiration", count: "3.5M" },
        { name: "fashionlover", count: "2.8M" },
        { name: "styleinspo", count: "2.3M" },
        { name: "fashiongram", count: "1.9M" },
        { name: "fashionista", count: "1.7M" },
        { name: "fashionaddict", count: "1.5M" },
      ],
      low: [
        { name: "dailyfashion", count: "850K" },
        { name: "fashiondiaries", count: "720K" },
        { name: "styleinspiration", count: "650K" },
        { name: "fashiondaily", count: "580K" },
        { name: "styleoftheday", count: "520K" },
      ],
    },
    niche: {
      high: [
        { name: "sustainablefashion", count: "2.1M" },
        { name: "vintagestyle", count: "1.8M" },
        { name: "minimalstyle", count: "1.5M" },
        { name: "scandistyle", count: "1.2M" },
      ],
      medium: [
        { name: "slowfashion", count: "950K" },
        { name: "ethicalfashion", count: "780K" },
        { name: "capsulewardrobe", count: "650K" },
        { name: "minimaliststyle", count: "520K" },
      ],
      low: [
        { name: "consciousfashion", count: "320K" },
        { name: "ecofashion", count: "280K" },
        { name: "fairfashion", count: "210K" },
        { name: "greenfashion", count: "180K" },
      ],
    },
    trending: [
      { name: "summervibes", count: "1.2M", growth: "+24%" },
      { name: "beachlife", count: "950K", growth: "+18%" },
      { name: "summerfashion", count: "780K", growth: "+15%" },
      { name: "vacationmode", count: "650K", growth: "+12%" },
      { name: "summeroutfit", count: "520K", growth: "+10%" },
    ],
  }

  // Kaydedilen hashtag'leri localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem("savedHashtags")
    if (saved) {
      setSavedHashtags(JSON.parse(saved))
    }
  }, [])

  // Arama işlevi
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Arama terimi gerekli",
        description: "Lütfen bir anahtar kelime veya kategori girin",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    // Gerçek bir API çağrısı yapılacak yer
    // Burada sadece simüle ediyoruz
    setTimeout(() => {
      // Arama sonuçlarını oluştur (gerçek uygulamada API'den gelecek)
      const results = [
        { name: `${searchQuery}fashion`, count: "1.2M" },
        { name: `${searchQuery}style`, count: "950K" },
        { name: `${searchQuery}lover`, count: "780K" },
        { name: `${searchQuery}daily`, count: "650K" },
        { name: `${searchQuery}gram`, count: "520K" },
        { name: `${searchQuery}photo`, count: "480K" },
        { name: `${searchQuery}life`, count: "420K" },
        { name: `${searchQuery}world`, count: "380K" },
      ]

      setSearchResults(results)
      setIsSearching(false)
      setActiveTab("search-results")

      toast({
        title: "Arama tamamlandı",
        description: `"${searchQuery}" için hashtag önerileri bulundu`,
      })
    }, 1000)
  }

  // Hashtag kopyalama işlevi
  const copyHashtags = (tags: Array<{ name: string; count: string }>) => {
    const hashtagsToCopy = tags.map((tag) => `#${tag.name}`).join(" ")
    navigator.clipboard.writeText(hashtagsToCopy)

    toast({
      title: "Kopyalandı!",
      description: "Hashtag'ler panoya kopyalandı",
    })
  }

  // Hashtag kaydetme işlevi
  const saveHashtag = (tag: { name: string; count: string }) => {
    const newSavedHashtags = [
      ...savedHashtags,
      {
        ...tag,
        date: new Date().toLocaleDateString(),
      },
    ]

    setSavedHashtags(newSavedHashtags)
    localStorage.setItem("savedHashtags", JSON.stringify(newSavedHashtags))

    toast({
      title: "Hashtag kaydedildi",
      description: `#${tag.name} kaydedildi`,
    })
  }

  // Kaydedilen hashtag'i silme işlevi
  const removeSavedHashtag = (index: number) => {
    const newSavedHashtags = [...savedHashtags]
    newSavedHashtags.splice(index, 1)

    setSavedHashtags(newSavedHashtags)
    localStorage.setItem("savedHashtags", JSON.stringify(newSavedHashtags))

    toast({
      title: "Hashtag silindi",
      description: "Hashtag başarıyla silindi",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hashtag Önerileri</h1>
          <p className="text-muted-foreground">İçeriğinize uygun, etkileşimi artıracak hashtag'ler bulun.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hashtag Arama</CardTitle>
          <CardDescription>Anahtar kelime veya kategori girerek hashtag önerileri alın</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Anahtar kelime veya kategori girin..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Aranıyor..." : "Ara"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="popular">Popüler</TabsTrigger>
          <TabsTrigger value="niche">Niş</TabsTrigger>
          <TabsTrigger value="trending">Trend</TabsTrigger>
          <TabsTrigger value="saved">Kaydedilenler</TabsTrigger>
          {searchResults.length > 0 && <TabsTrigger value="search-results">Arama Sonuçları</TabsTrigger>}
        </TabsList>

        {/* Arama Sonuçları Sekmesi */}
        <TabsContent value="search-results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Arama Sonuçları</CardTitle>
              <CardDescription>"{searchQuery}" için hashtag önerileri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Bulunan Hashtag'ler</Label>
                    <Button variant="outline" size="sm" onClick={() => copyHashtags(searchResults)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Tümünü Kopyala
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 pr-1">
                        <div className="flex items-center gap-1 mr-1">
                          <HashIcon className="h-3 w-3" />
                          {tag.name} <span className="text-xs text-muted-foreground ml-1">{tag.count}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => saveHashtag(tag)}
                        >
                          <SaveIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Hashtag'leri kaydetmek için yanlarındaki kaydet simgesine tıklayın.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popüler Hashtag'ler</CardTitle>
              <CardDescription>Moda kategorisinde en popüler hashtag'ler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Yüksek Hacimli Hashtag'ler</Label>
                    <Button variant="outline" size="sm" onClick={() => copyHashtags(categories.popular.high)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Tümünü Kopyala
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.popular.high.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 pr-1">
                        <div className="flex items-center gap-1 mr-1">
                          <HashIcon className="h-3 w-3" />
                          {tag.name} <span className="text-xs text-muted-foreground ml-1">{tag.count}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => saveHashtag(tag)}
                        >
                          <SaveIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Orta Hacimli Hashtag'ler</Label>
                    <Button variant="outline" size="sm" onClick={() => copyHashtags(categories.popular.medium)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Tümünü Kopyala
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.popular.medium.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 pr-1">
                        <div className="flex items-center gap-1 mr-1">
                          <HashIcon className="h-3 w-3" />
                          {tag.name} <span className="text-xs text-muted-foreground ml-1">{tag.count}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => saveHashtag(tag)}
                        >
                          <SaveIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Düşük Hacimli Hashtag'ler</Label>
                    <Button variant="outline" size="sm" onClick={() => copyHashtags(categories.popular.low)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Tümünü Kopyala
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.popular.low.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 pr-1">
                        <div className="flex items-center gap-1 mr-1">
                          <HashIcon className="h-3 w-3" />
                          {tag.name} <span className="text-xs text-muted-foreground ml-1">{tag.count}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => saveHashtag(tag)}
                        >
                          <SaveIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="niche" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Niş Hashtag'ler</CardTitle>
              <CardDescription>Daha spesifik ve hedefli hashtag'ler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Yüksek Hacimli Niş Hashtag'ler</Label>
                    <Button variant="outline" size="sm" onClick={() => copyHashtags(categories.niche.high)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Tümünü Kopyala
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.niche.high.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 pr-1">
                        <div className="flex items-center gap-1 mr-1">
                          <HashIcon className="h-3 w-3" />
                          {tag.name} <span className="text-xs text-muted-foreground ml-1">{tag.count}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => saveHashtag(tag)}
                        >
                          <SaveIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Orta Hacimli Niş Hashtag'ler</Label>
                    <Button variant="outline" size="sm" onClick={() => copyHashtags(categories.niche.medium)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Tümünü Kopyala
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.niche.medium.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 pr-1">
                        <div className="flex items-center gap-1 mr-1">
                          <HashIcon className="h-3 w-3" />
                          {tag.name} <span className="text-xs text-muted-foreground ml-1">{tag.count}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => saveHashtag(tag)}
                        >
                          <SaveIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Düşük Hacimli Niş Hashtag'ler</Label>
                    <Button variant="outline" size="sm" onClick={() => copyHashtags(categories.niche.low)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Tümünü Kopyala
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.niche.low.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 pr-1">
                        <div className="flex items-center gap-1 mr-1">
                          <HashIcon className="h-3 w-3" />
                          {tag.name} <span className="text-xs text-muted-foreground ml-1">{tag.count}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => saveHashtag(tag)}
                        >
                          <SaveIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trend Hashtag'ler</CardTitle>
              <CardDescription>Son 24 saatte yükselen hashtag'ler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div></div>
                  <Button variant="outline" size="sm" onClick={() => copyHashtags(categories.trending)}>
                    <CopyIcon className="mr-2 h-4 w-4" />
                    Tümünü Kopyala
                  </Button>
                </div>

                {categories.trending.map((tag, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <TrendingUpIcon className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">#{tag.name}</p>
                        <p className="text-sm text-muted-foreground">{tag.count} gönderi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{tag.growth}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => saveHashtag(tag)}>
                        <SaveIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kaydedilen Hashtag'ler</CardTitle>
              <CardDescription>Daha sonra kullanmak üzere kaydettiğiniz hashtag'ler</CardDescription>
            </CardHeader>
            <CardContent>
              {savedHashtags.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div></div>
                    <Button variant="outline" size="sm" onClick={() => copyHashtags(savedHashtags)}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Tümünü Kopyala
                    </Button>
                  </div>

                  {savedHashtags.map((tag, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <HashIcon className="h-5 w-5" />
                        <div>
                          <p className="font-medium">#{tag.name}</p>
                          <p className="text-sm text-muted-foreground">{tag.count} gönderi</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{tag.date}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeSavedHashtag(index)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                  <p className="text-muted-foreground">Henüz kaydedilmiş hashtag yok</p>
                  <Button variant="outline" onClick={() => setActiveTab("popular")}>
                    Hashtag Önerilerini Görüntüle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
