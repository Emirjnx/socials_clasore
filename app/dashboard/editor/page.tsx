"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import {
  ImageIcon,
  LayoutIcon,
  TextIcon,
  TypeIcon,
  Square,
  Circle,
  Triangle,
  Download,
  Save,
  Trash2,
  Copy,
  Layers,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Palette,
} from "lucide-react"

// Editör için temel bileşen tipleri
type ElementType = "text" | "shape" | "image" | "background"

interface EditorElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  rotation: number
  content?: string
  fontSize?: number
  fontFamily?: string
  color?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  opacity?: number
  shape?: "square" | "circle" | "triangle"
  imageUrl?: string
  zIndex: number
  visible: boolean
}

// Şablonlar
const templates = [
  {
    id: "minimal",
    name: "Minimal",
    elements: [
      {
        id: "bg-1",
        type: "background",
        x: 0,
        y: 0,
        width: 1080,
        height: 1080,
        rotation: 0,
        backgroundColor: "#ffffff",
        zIndex: 0,
        visible: true,
      },
      {
        id: "text-1",
        type: "text",
        x: 540,
        y: 400,
        width: 800,
        height: 100,
        rotation: 0,
        content: "Minimal Tasarım",
        fontSize: 48,
        fontFamily: "Inter",
        color: "#000000",
        backgroundColor: "transparent",
        zIndex: 1,
        visible: true,
      },
      {
        id: "text-2",
        type: "text",
        x: 540,
        y: 500,
        width: 800,
        height: 60,
        rotation: 0,
        content: "Sade ve şık bir görünüm",
        fontSize: 24,
        fontFamily: "Inter",
        color: "#666666",
        backgroundColor: "transparent",
        zIndex: 2,
        visible: true,
      },
    ],
  },
  {
    id: "gradient",
    name: "Gradient",
    elements: [
      {
        id: "bg-1",
        type: "background",
        x: 0,
        y: 0,
        width: 1080,
        height: 1080,
        rotation: 0,
        backgroundColor: "linear-gradient(135deg, #6366f1, #ec4899)",
        zIndex: 0,
        visible: true,
      },
      {
        id: "text-1",
        type: "text",
        x: 540,
        y: 400,
        width: 800,
        height: 100,
        rotation: 0,
        content: "Gradient Tasarım",
        fontSize: 48,
        fontFamily: "Poppins",
        color: "#ffffff",
        backgroundColor: "transparent",
        zIndex: 1,
        visible: true,
      },
      {
        id: "text-2",
        type: "text",
        x: 540,
        y: 500,
        width: 800,
        height: 60,
        rotation: 0,
        content: "Modern ve renkli bir görünüm",
        fontSize: 24,
        fontFamily: "Poppins",
        color: "#ffffff",
        backgroundColor: "transparent",
        zIndex: 2,
        visible: true,
      },
    ],
  },
  {
    id: "product",
    name: "Ürün",
    elements: [
      {
        id: "bg-1",
        type: "background",
        x: 0,
        y: 0,
        width: 1080,
        height: 1080,
        rotation: 0,
        backgroundColor: "#f8fafc",
        zIndex: 0,
        visible: true,
      },
      {
        id: "shape-1",
        type: "shape",
        x: 540,
        y: 300,
        width: 400,
        height: 400,
        rotation: 0,
        shape: "circle",
        backgroundColor: "#e2e8f0",
        zIndex: 1,
        visible: true,
      },
      {
        id: "image-1",
        type: "image",
        x: 540,
        y: 300,
        width: 350,
        height: 350,
        rotation: 0,
        imageUrl: "/placeholder.svg?height=350&width=350",
        zIndex: 2,
        visible: true,
      },
      {
        id: "text-1",
        type: "text",
        x: 540,
        y: 600,
        width: 800,
        height: 100,
        rotation: 0,
        content: "Ürün Adı",
        fontSize: 36,
        fontFamily: "Montserrat",
        color: "#1e293b",
        backgroundColor: "transparent",
        zIndex: 3,
        visible: true,
      },
      {
        id: "text-2",
        type: "text",
        x: 540,
        y: 670,
        width: 800,
        height: 60,
        rotation: 0,
        content: "₺199.99",
        fontSize: 24,
        fontFamily: "Montserrat",
        color: "#64748b",
        backgroundColor: "transparent",
        zIndex: 4,
        visible: true,
      },
    ],
  },
]

// Renk paletleri
const colorPalettes = [
  ["#ffffff", "#000000", "#f43f5e", "#3b82f6", "#22c55e"],
  ["#f8fafc", "#1e293b", "#6366f1", "#ec4899", "#eab308"],
  ["#f5f5f4", "#292524", "#84cc16", "#06b6d4", "#f97316"],
  ["#fef2f2", "#7f1d1d", "#4338ca", "#15803d", "#b45309"],
]

// Font aileleri
const fontFamilies = ["Inter", "Poppins", "Montserrat", "Roboto", "Open Sans"]

export default function EditorPage() {
  const { toast } = useToast()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("content")
  const [format, setFormat] = useState("square")
  const [template, setTemplate] = useState("minimal")
  const [elements, setElements] = useState<EditorElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [history, setHistory] = useState<EditorElement[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [colorPalette, setColorPalette] = useState(0)

  // Geçmişe element durumunu ekle
  const addToHistory = (newElements: EditorElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newElements])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Geri al
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setElements([...history[historyIndex - 1]])
    }
  }

  // Yeniden yap
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setElements([...history[historyIndex + 1]])
    }
  }

  // Şablon değiştiğinde elementleri güncelle
  useEffect(() => {
    const selectedTemplate = templates.find((t) => t.id === template)
    if (selectedTemplate) {
      setElements(selectedTemplate.elements)
      addToHistory(selectedTemplate.elements)
    }
  }, [template])

  // Format değiştiğinde canvas boyutunu güncelle
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let width = 1080
    let height = 1080

    switch (format) {
      case "square":
        width = 1080
        height = 1080
        break
      case "portrait":
        width = 1080
        height = 1350
        break
      case "landscape":
        width = 1920
        height = 1080
        break
      case "story":
        width = 1080
        height = 1920
        break
    }

    // Arka plan elementini güncelle
    setElements((prev) => {
      const newElements = [...prev]
      const bgIndex = newElements.findIndex((el) => el.type === "background")
      if (bgIndex !== -1) {
        newElements[bgIndex] = {
          ...newElements[bgIndex],
          width,
          height,
        }
      }
      return newElements
    })

    // Canvas boyutunu güncelle
    canvas.style.width = `${width / 4}px`
    canvas.style.height = `${height / 4}px`
  }, [format])

  // Element seç
  const selectElement = (id: string) => {
    setSelectedElement(id)
  }

  // Element ekle
  const addElement = (type: ElementType) => {
    const newElement: EditorElement = {
      id: `${type}-${Date.now()}`,
      type,
      x: 540,
      y: 540,
      width: type === "text" ? 400 : 200,
      height: type === "text" ? 100 : 200,
      rotation: 0,
      zIndex: elements.length + 1,
      visible: true,
    }

    switch (type) {
      case "text":
        newElement.content = "Yeni Metin"
        newElement.fontSize = 24
        newElement.fontFamily = "Inter"
        newElement.color = "#000000"
        newElement.backgroundColor = "transparent"
        break
      case "shape":
        newElement.shape = "square"
        newElement.backgroundColor = colorPalettes[colorPalette][2]
        break
      case "image":
        newElement.imageUrl = "/placeholder.svg?height=200&width=200"
        break
    }

    const newElements = [...elements, newElement]
    setElements(newElements)
    setSelectedElement(newElement.id)
    addToHistory(newElements)

    toast({
      title: "Element eklendi",
      description: `Yeni bir ${type} elementi eklendi.`,
    })
  }

  // Element sil
  const deleteElement = (id: string) => {
    if (id === selectedElement) {
      setSelectedElement(null)
    }
    const newElements = elements.filter((el) => el.id !== id)
    setElements(newElements)
    addToHistory(newElements)

    toast({
      title: "Element silindi",
      description: "Seçili element başarıyla silindi.",
    })
  }

  // Element güncelle
  const updateElement = (id: string, updates: Partial<EditorElement>) => {
    const newElements = elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    setElements(newElements)
  }

  // Element güncelleme işlemi bittiğinde geçmişe ekle
  const finalizeUpdate = () => {
    addToHistory([...elements])
  }

  // Element kopyala
  const duplicateElement = (id: string) => {
    const element = elements.find((el) => el.id === id)
    if (!element) return

    const newElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20,
    }

    const newElements = [...elements, newElement]
    setElements(newElements)
    setSelectedElement(newElement.id)
    addToHistory(newElements)

    toast({
      title: "Element kopyalandı",
      description: "Seçili element başarıyla kopyalandı.",
    })
  }

  // Element katmanını değiştir
  const changeElementLayer = (id: string, direction: "up" | "down") => {
    const elementIndex = elements.findIndex((el) => el.id === id)
    if (elementIndex === -1) return

    const newElements = [...elements]
    const element = newElements[elementIndex]

    if (direction === "up" && element.zIndex < elements.length) {
      // Bir üst katmana taşı
      const upperElement = newElements.find((el) => el.zIndex === element.zIndex + 1)
      if (upperElement) {
        upperElement.zIndex -= 1
        element.zIndex += 1
      }
    } else if (direction === "down" && element.zIndex > 1) {
      // Bir alt katmana taşı
      const lowerElement = newElements.find((el) => el.zIndex === element.zIndex - 1)
      if (lowerElement) {
        lowerElement.zIndex += 1
        element.zIndex -= 1
      }
    }

    setElements(newElements)
    addToHistory(newElements)
  }

  // Element görünürlüğünü değiştir
  const toggleElementVisibility = (id: string) => {
    const newElements = elements.map((el) => (el.id === id ? { ...el, visible: !el.visible } : el))
    setElements(newElements)
    addToHistory(newElements)
  }

  // Sürükleme başlat
  const startDrag = (e: React.MouseEvent, id: string) => {
    if (!selectedElement || selectedElement !== id) {
      selectElement(id)
      return
    }

    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY,
    })
  }

  // Sürükleme
  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return

    const element = elements.find((el) => el.id === selectedElement)
    if (!element) return

    const dx = (e.clientX - dragStart.x) * 4 // Canvas ölçeğine göre ayarla
    const dy = (e.clientY - dragStart.y) * 4

    updateElement(selectedElement, {
      x: element.x + dx,
      y: element.y + dy,
    })

    setDragStart({
      x: e.clientX,
      y: e.clientY,
    })
  }

  // Sürükleme bitir
  const endDrag = () => {
    if (isDragging) {
      setIsDragging(false)
      finalizeUpdate()
    }
  }

  // Tasarımı kaydet
  const saveDesign = () => {
    localStorage.setItem(
      "canvaDesign",
      JSON.stringify({
        format,
        elements,
      }),
    )

    toast({
      title: "Tasarım kaydedildi",
      description: "Tasarımınız başarıyla kaydedildi.",
    })
  }

  // Tasarımı indir
  const downloadDesign = () => {
    // Gerçek bir uygulamada burada canvas'ı bir resme dönüştürüp indirme işlemi yapılır
    toast({
      title: "Tasarım indirildi",
      description: "Tasarımınız başarıyla indirildi.",
    })
  }

  // Seçili element
  const selectedElementData = selectedElement ? elements.find((el) => el.id === selectedElement) : null

  return (
    <div className="space-y-6" onMouseMove={handleDrag} onMouseUp={endDrag} onMouseLeave={endDrag}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Görsel Editör</h1>
          <p className="text-muted-foreground">
            Instagram gönderileri ve hikayeleri için profesyonel görseller oluşturun.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0}>
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={redo} disabled={historyIndex >= history.length - 1}>
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={saveDesign}>
            <Save className="h-4 w-4 mr-2" />
            Kaydet
          </Button>
          <Button onClick={downloadDesign}>
            <Download className="h-4 w-4 mr-2" />
            İndir
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Önizleme</CardTitle>
              <CardDescription>Oluşturduğunuz görselin önizlemesi</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="relative mx-auto border rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden"
                style={{ width: "270px", height: "270px" }}
              >
                <div
                  ref={canvasRef}
                  className="absolute top-0 left-0 origin-top-left"
                  style={{
                    transform: "scale(0.25)",
                    transformOrigin: "top left",
                    width: "1080px",
                    height: "1080px",
                  }}
                >
                  {/* Canvas içeriği */}
                  {elements
                    .sort((a, b) => a.zIndex - b.zIndex)
                    .map((element) => {
                      if (!element.visible) return null

                      // Arka plan
                      if (element.type === "background") {
                        return (
                          <div
                            key={element.id}
                            className="absolute"
                            style={{
                              width: `${element.width}px`,
                              height: `${element.height}px`,
                              background: element.backgroundColor,
                              zIndex: element.zIndex,
                            }}
                          />
                        )
                      }

                      // Metin
                      if (element.type === "text") {
                        return (
                          <div
                            key={element.id}
                            className={`absolute flex items-center justify-center text-center ${selectedElement === element.id ? "ring-2 ring-blue-500" : ""}`}
                            style={{
                              left: `${element.x - element.width / 2}px`,
                              top: `${element.y - element.height / 2}px`,
                              width: `${element.width}px`,
                              height: `${element.height}px`,
                              transform: `rotate(${element.rotation}deg)`,
                              color: element.color,
                              backgroundColor:
                                element.backgroundColor !== "transparent" ? element.backgroundColor : undefined,
                              fontFamily: element.fontFamily,
                              fontSize: `${element.fontSize}px`,
                              zIndex: element.zIndex,
                              cursor: "move",
                            }}
                            onMouseDown={(e) => startDrag(e, element.id)}
                          >
                            {element.content}
                          </div>
                        )
                      }

                      // Şekil
                      if (element.type === "shape") {
                        let ShapeComponent = Square
                        if (element.shape === "circle") ShapeComponent = Circle
                        if (element.shape === "triangle") ShapeComponent = Triangle

                        return (
                          <div
                            key={element.id}
                            className={`absolute flex items-center justify-center ${selectedElement === element.id ? "ring-2 ring-blue-500" : ""}`}
                            style={{
                              left: `${element.x - element.width / 2}px`,
                              top: `${element.y - element.height / 2}px`,
                              width: `${element.width}px`,
                              height: `${element.height}px`,
                              transform: `rotate(${element.rotation}deg)`,
                              backgroundColor: element.backgroundColor,
                              borderRadius: element.shape === "circle" ? "50%" : undefined,
                              zIndex: element.zIndex,
                              cursor: "move",
                            }}
                            onMouseDown={(e) => startDrag(e, element.id)}
                          >
                            {element.shape === "triangle" && (
                              <div
                                style={{
                                  width: 0,
                                  height: 0,
                                  borderLeft: `${element.width / 2}px solid transparent`,
                                  borderRight: `${element.width / 2}px solid transparent`,
                                  borderBottom: `${element.height}px solid ${element.backgroundColor}`,
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                }}
                              />
                            )}
                          </div>
                        )
                      }

                      // Görsel
                      if (element.type === "image") {
                        return (
                          <div
                            key={element.id}
                            className={`absolute ${selectedElement === element.id ? "ring-2 ring-blue-500" : ""}`}
                            style={{
                              left: `${element.x - element.width / 2}px`,
                              top: `${element.y - element.height / 2}px`,
                              width: `${element.width}px`,
                              height: `${element.height}px`,
                              transform: `rotate(${element.rotation}deg)`,
                              zIndex: element.zIndex,
                              cursor: "move",
                              backgroundImage: `url(${element.imageUrl})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                            onMouseDown={(e) => startDrag(e, element.id)}
                          />
                        )
                      }

                      return null
                    })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Görsel Ayarları</CardTitle>
              <CardDescription>Görselinizin boyut ve formatını ayarlayın</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Format seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Kare (1:1)</SelectItem>
                      <SelectItem value="portrait">Dikey (4:5)</SelectItem>
                      <SelectItem value="landscape">Yatay (1.91:1)</SelectItem>
                      <SelectItem value="story">Hikaye (9:16)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template">Şablon</Label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Şablon seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="gradient">Gradient</SelectItem>
                      <SelectItem value="product">Ürün Odaklı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="content" className="flex flex-col items-center gap-1 py-2 h-auto">
                <TextIcon className="h-4 w-4" />
                <span className="text-xs">İçerik</span>
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex flex-col items-center gap-1 py-2 h-auto">
                <LayoutIcon className="h-4 w-4" />
                <span className="text-xs">Düzen</span>
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex flex-col items-center gap-1 py-2 h-auto">
                <TypeIcon className="h-4 w-4" />
                <span className="text-xs">Yazı</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex flex-col items-center gap-1 py-2 h-auto">
                <ImageIcon className="h-4 w-4" />
                <span className="text-xs">Medya</span>
              </TabsTrigger>
              <TabsTrigger value="elements" className="flex flex-col items-center gap-1 py-2 h-auto">
                <Layers className="h-4 w-4" />
                <span className="text-xs">Katmanlar</span>
              </TabsTrigger>
            </TabsList>

            {/* İçerik Sekmesi */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>İçerik</CardTitle>
                  <CardDescription>Görselinizin içeriğini düzenleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedElementData?.type === "text" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="title">Metin</Label>
                        <Textarea
                          id="title"
                          value={selectedElementData.content}
                          onChange={(e) => updateElement(selectedElement!, { content: e.target.value })}
                          onBlur={finalizeUpdate}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="textColor">Metin Rengi</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {colorPalettes[colorPalette].map((color, index) => (
                            <div
                              key={index}
                              className={`h-8 rounded-md cursor-pointer border ${selectedElementData.color === color ? "ring-2 ring-blue-500" : ""}`}
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                updateElement(selectedElement!, { color })
                                finalizeUpdate()
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bgColor">Arka Plan Rengi</Label>
                        <div className="grid grid-cols-5 gap-2">
                          <div
                            className={`h-8 rounded-md cursor-pointer border border-dashed ${selectedElementData.backgroundColor === "transparent" ? "ring-2 ring-blue-500" : ""}`}
                            onClick={() => {
                              updateElement(selectedElement!, { backgroundColor: "transparent" })
                              finalizeUpdate()
                            }}
                          >
                            <div className="w-full h-full flex items-center justify-center text-xs">Şeffaf</div>
                          </div>
                          {colorPalettes[colorPalette].map((color, index) => (
                            <div
                              key={index}
                              className={`h-8 rounded-md cursor-pointer border ${selectedElementData.backgroundColor === color ? "ring-2 ring-blue-500" : ""}`}
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                updateElement(selectedElement!, { backgroundColor: color })
                                finalizeUpdate()
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : selectedElementData?.type === "shape" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="shape">Şekil</Label>
                        <Select
                          value={selectedElementData.shape}
                          onValueChange={(value: "square" | "circle" | "triangle") => {
                            updateElement(selectedElement!, { shape: value })
                            finalizeUpdate()
                          }}
                        >
                          <SelectTrigger id="shape">
                            <SelectValue placeholder="Şekil seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="square">Kare</SelectItem>
                            <SelectItem value="circle">Daire</SelectItem>
                            <SelectItem value="triangle">Üçgen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shapeColor">Renk</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {colorPalettes[colorPalette].map((color, index) => (
                            <div
                              key={index}
                              className={`h-8 rounded-md cursor-pointer border ${selectedElementData.backgroundColor === color ? "ring-2 ring-blue-500" : ""}`}
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                updateElement(selectedElement!, { backgroundColor: color })
                                finalizeUpdate()
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : selectedElementData?.type === "image" ? (
                    <div className="space-y-2">
                      <Label>Görsel URL</Label>
                      <Input
                        value={selectedElementData.imageUrl}
                        onChange={(e) => updateElement(selectedElement!, { imageUrl: e.target.value })}
                        onBlur={finalizeUpdate}
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs text-muted-foreground">
                        Görsel URL'si girin veya aşağıdan bir görsel yükleyin
                      </p>
                      <div className="border-2 border-dashed rounded-md p-6 text-center mt-4">
                        <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Görsel yüklemek için tıklayın veya sürükleyin
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Görsel Seç
                        </Button>
                      </div>
                    </div>
                  ) : selectedElementData?.type === "background" ? (
                    <div className="space-y-2">
                      <Label htmlFor="bgColor">Arka Plan Rengi</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {colorPalettes[colorPalette].map((color, index) => (
                          <div
                            key={index}
                            className={`h-8 rounded-md cursor-pointer border ${selectedElementData.backgroundColor === color ? "ring-2 ring-blue-500" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              updateElement(selectedElement!, { backgroundColor: color })
                              finalizeUpdate()
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="colorPalette">Renk Paleti</Label>
                        <Select
                          value={colorPalette.toString()}
                          onValueChange={(value) => setColorPalette(Number.parseInt(value))}
                        >
                          <SelectTrigger id="colorPalette">
                            <SelectValue placeholder="Renk paleti seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Palette 1</SelectItem>
                            <SelectItem value="1">Palette 2</SelectItem>
                            <SelectItem value="2">Palette 3</SelectItem>
                            <SelectItem value="3">Palette 4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Düzenlemek için bir element seçin veya yeni bir element ekleyin.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => addElement("text")}>
                          <TextIcon className="h-4 w-4 mr-2" />
                          Metin Ekle
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => addElement("shape")}>
                          <Square className="h-4 w-4 mr-2" />
                          Şekil Ekle
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => addElement("image")}>
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Görsel Ekle
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Düzen Sekmesi */}
            <TabsContent value="layout">
              <Card>
                <CardHeader>
                  <CardTitle>Düzen</CardTitle>
                  <CardDescription>Görselinizin düzenini ayarlayın</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedElementData ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="position">Konum</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="posX" className="text-xs">
                              X Pozisyonu
                            </Label>
                            <Input
                              id="posX"
                              type="number"
                              value={Math.round(selectedElementData.x)}
                              onChange={(e) => updateElement(selectedElement!, { x: Number.parseInt(e.target.value) })}
                              onBlur={finalizeUpdate}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="posY" className="text-xs">
                              Y Pozisyonu
                            </Label>
                            <Input
                              id="posY"
                              type="number"
                              value={Math.round(selectedElementData.y)}
                              onChange={(e) => updateElement(selectedElement!, { y: Number.parseInt(e.target.value) })}
                              onBlur={finalizeUpdate}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size">Boyut</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="width" className="text-xs">
                              Genişlik
                            </Label>
                            <Input
                              id="width"
                              type="number"
                              value={Math.round(selectedElementData.width)}
                              onChange={(e) =>
                                updateElement(selectedElement!, { width: Number.parseInt(e.target.value) })
                              }
                              onBlur={finalizeUpdate}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="height" className="text-xs">
                              Yükseklik
                            </Label>
                            <Input
                              id="height"
                              type="number"
                              value={Math.round(selectedElementData.height)}
                              onChange={(e) =>
                                updateElement(selectedElement!, { height: Number.parseInt(e.target.value) })
                              }
                              onBlur={finalizeUpdate}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rotation">Döndürme ({Math.round(selectedElementData.rotation)}°)</Label>
                        <Slider
                          id="rotation"
                          min={0}
                          max={360}
                          step={1}
                          value={[selectedElementData.rotation]}
                          onValueChange={(value) => updateElement(selectedElement!, { rotation: value[0] })}
                          onValueCommit={finalizeUpdate}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Düzenlemek için bir element seçin.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Yazı Sekmesi */}
            <TabsContent value="typography">
              <Card>
                <CardHeader>
                  <CardTitle>Yazı</CardTitle>
                  <CardDescription>Yazı tipi ve stilini ayarlayın</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedElementData?.type === "text" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="font">Yazı Tipi</Label>
                        <Select
                          value={selectedElementData.fontFamily}
                          onValueChange={(value) => {
                            updateElement(selectedElement!, { fontFamily: value })
                            finalizeUpdate()
                          }}
                        >
                          <SelectTrigger id="font">
                            <SelectValue placeholder="Yazı tipi seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {fontFamilies.map((font) => (
                              <SelectItem key={font} value={font}>
                                {font}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fontSize">Yazı Boyutu ({selectedElementData.fontSize}px)</Label>
                        <Slider
                          id="fontSize"
                          min={8}
                          max={120}
                          step={1}
                          value={[selectedElementData.fontSize || 24]}
                          onValueChange={(value) => updateElement(selectedElement!, { fontSize: value[0] })}
                          onValueCommit={finalizeUpdate}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Yazı ayarları için bir metin elementi seçin.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medya Sekmesi */}
            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Medya</CardTitle>
                  <CardDescription>Görsel ve medya ekleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Yeni Medya Ekle</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center"
                        onClick={() => addElement("image")}
                      >
                        <ImageIcon className="h-6 w-6 mb-2" />
                        <span className="text-xs">Görsel</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center"
                        onClick={() => addElement("shape")}
                      >
                        <Square className="h-6 w-6 mb-2" />
                        <span className="text-xs">Şekil</span>
                      </Button>
                    </div>
                  </div>

                  {selectedElementData?.type === "image" && (
                    <div className="space-y-2 mt-4">
                      <Label>Görsel Ayarları</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <div
                          className="w-full h-32 bg-center bg-cover mb-2 rounded"
                          style={{ backgroundImage: `url(${selectedElementData.imageUrl})` }}
                        />
                        <Input
                          value={selectedElementData.imageUrl}
                          onChange={(e) => updateElement(selectedElement!, { imageUrl: e.target.value })}
                          onBlur={finalizeUpdate}
                          placeholder="https://example.com/image.jpg"
                          className="mb-2"
                        />
                        <Button variant="outline" size="sm">
                          Görsel Değiştir
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Katmanlar Sekmesi */}
            <TabsContent value="elements">
              <Card>
                <CardHeader>
                  <CardTitle>Katmanlar</CardTitle>
                  <CardDescription>Elementleri düzenleyin ve yönetin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Elementler</Label>
                    <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                      {elements
                        .sort((a, b) => b.zIndex - a.zIndex)
                        .map((element) => (
                          <div
                            key={element.id}
                            className={`p-2 flex items-center justify-between ${selectedElement === element.id ? "bg-muted" : ""}`}
                            onClick={() => selectElement(element.id)}
                          >
                            <div className="flex items-center">
                              {element.type === "text" && <TextIcon className="h-4 w-4 mr-2" />}
                              {element.type === "shape" && <Square className="h-4 w-4 mr-2" />}
                              {element.type === "image" && <ImageIcon className="h-4 w-4 mr-2" />}
                              {element.type === "background" && <Palette className="h-4 w-4 mr-2" />}
                              <span className="text-sm truncate max-w-[120px]">
                                {element.type === "text"
                                  ? element.content
                                  : element.type === "background"
                                    ? "Arka Plan"
                                    : `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} ${element.id.split("-")[1]}`}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleElementVisibility(element.id)
                                }}
                              >
                                <EyeOff className={`h-3 w-3 ${element.visible ? "opacity-30" : "opacity-100"}`} />
                              </Button>
                              {element.type !== "background" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      changeElementLayer(element.id, "up")
                                    }}
                                  >
                                    <ChevronUp className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      changeElementLayer(element.id, "down")
                                    }}
                                  >
                                    <ChevronDown className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      duplicateElement(element.id)
                                    }}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteElement(element.id)
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => addElement("text")}>
                      <TextIcon className="h-4 w-4 mr-2" />
                      Metin Ekle
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addElement("shape")}>
                      <Square className="h-4 w-4 mr-2" />
                      Şekil Ekle
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addElement("image")}>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Görsel Ekle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
