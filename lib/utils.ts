import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Kullanıcı doğrulama yardımcı fonksiyonları
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  // En az 8 karakter, en az bir büyük harf, bir küçük harf ve bir rakam
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

// Para birimi formatı
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(amount)
}

// Tarih formatı
export function formatDate(date: Date): string {
  return new Intl.NumberFormat("tr-TR").format(date.getTime())
}

// Rastgele ID oluşturma
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Metin kısaltma
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Dosya boyutu formatı
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Renk değiştirme yardımcı fonksiyonu
export function setThemeColor(colorValue: string): void {
  document.documentElement.style.setProperty("--primary", colorValue)
}

// Tema değiştirme yardımcı fonksiyonu
export function applyTheme(theme: string): void {
  document.documentElement.setAttribute("data-theme", theme)
}
