"use client"

import { cn } from "@/lib/utils"
import {
  BarChart3Icon,
  CalendarIcon,
  HashIcon as HashtagIcon,
  HomeIcon,
  ImageIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
  InstagramIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardNavProps {
  className?: string
}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Genel Bakış",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Analitik",
      href: "/dashboard/analytics",
      icon: BarChart3Icon,
    },
    {
      title: "İçerik Takvimi",
      href: "/dashboard/calendar",
      icon: CalendarIcon,
    },
    {
      title: "Tasarım İstekleri",
      href: "/dashboard/design-requests",
      icon: ImageIcon,
    },
    {
      title: "Hashtag Önerileri",
      href: "/dashboard/hashtags",
      icon: HashtagIcon,
    },
    {
      title: "Rakip Analizi",
      href: "/dashboard/competitors",
      icon: UsersIcon,
    },
    {
      title: "Bakiye",
      href: "/dashboard/balance",
      icon: WalletIcon,
    },
    {
      title: "Instagram Bağla",
      href: "/dashboard/connect",
      icon: InstagramIcon,
    },
    {
      title: "Ayarlar",
      href: "/dashboard/settings",
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
