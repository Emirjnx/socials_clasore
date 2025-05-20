"use client"

import { cn } from "@/lib/utils"
import {
  BarChart3Icon,
  CreditCardIcon,
  GaugeIcon,
  HashIcon,
  HelpCircleIcon,
  ImageIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminNavProps {
  className?: string
}

export function AdminNav({ className }: AdminNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Genel Bakış",
      href: "/admin",
      icon: GaugeIcon,
    },
    {
      title: "Kullanıcılar",
      href: "/admin/users",
      icon: UsersIcon,
    },
    {
      title: "Abonelikler",
      href: "/admin/subscriptions",
      icon: CreditCardIcon,
    },
    {
      title: "İstatistikler",
      href: "/admin/statistics",
      icon: BarChart3Icon,
    },
    {
      title: "Tasarım İstekleri",
      href: "/admin/design-requests",
      icon: ImageIcon,
    },
    {
      title: "Hashtag Yönetimi",
      href: "/admin/hashtags",
      icon: HashIcon,
    },
    {
      title: "Destek Talepleri",
      href: "/admin/support",
      icon: HelpCircleIcon,
    },
    {
      title: "Ayarlar",
      href: "/admin/settings",
      icon: SettingsIcon,
    },
  ]

  return (
    <nav className={cn("flex", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md",
            pathname === item.href
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent",
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
