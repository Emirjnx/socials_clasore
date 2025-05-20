"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Settings } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

const themes = [
  {
    name: "Açık",
    value: "light",
  },
  {
    name: "Koyu",
    value: "dark",
  },
  {
    name: "Sistem",
    value: "system",
  },
]

const colors = [
  {
    name: "Mor",
    value: "252 94% 67%",
    class: "bg-[#7C3AED]",
  },
  {
    name: "Mavi",
    value: "221 83% 53%",
    class: "bg-[#2563EB]",
  },
  {
    name: "Yeşil",
    value: "152 76% 40%",
    class: "bg-[#10B981]",
  },
  {
    name: "Turuncu",
    value: "38 92% 50%",
    class: "bg-[#F59E0B]",
  },
  {
    name: "Kırmızı",
    value: "0 84% 60%",
    class: "bg-[#EF4444]",
  },
]

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  // Tema değişikliğini uygula
  useEffect(() => {
    setMounted(true)
  }, [])

  // Renk değişikliğini uygula
  const applyColor = (colorValue: string) => {
    document.documentElement.style.setProperty("--primary", colorValue)
    setSelectedColor(colorValue)
    toast({
      title: "Renk Şeması Değiştirildi",
      description: "Yeni renk şeması başarıyla uygulandı.",
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Tema Ayarları</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Görünüm Ayarları</SheetTitle>
          <SheetDescription>Tema ve renk ayarlarınızı özelleştirin.</SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tema</Label>
              <RadioGroup
                defaultValue={theme}
                onValueChange={(value) => {
                  setTheme(value)
                  toast({
                    title: "Tema Değiştirildi",
                    description: `Tema ${value === "light" ? "açık" : value === "dark" ? "koyu" : "sistem"} olarak ayarlandı.`,
                  })
                }}
              >
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((themeOption) => (
                    <div key={themeOption.value} className="flex flex-col items-center space-y-2">
                      <div
                        className={`h-16 w-full rounded-md border cursor-pointer ${
                          themeOption.value === "light"
                            ? "bg-white"
                            : themeOption.value === "dark"
                              ? "bg-gray-900"
                              : "bg-gradient-to-b from-white to-gray-900"
                        } ${theme === themeOption.value ? "ring-2 ring-primary" : ""}`}
                        onClick={() => setTheme(themeOption.value)}
                      ></div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={themeOption.value} id={`theme-${themeOption.value}`} />
                        <Label htmlFor={`theme-${themeOption.value}`}>{themeOption.name}</Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Renk Şeması</Label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <div
                    key={color.value}
                    className={`h-10 w-full rounded-md cursor-pointer ${color.class} ${
                      selectedColor === color.value ? "ring-2 ring-offset-2 ring-offset-background" : ""
                    }`}
                    onClick={() => applyColor(color.value)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
