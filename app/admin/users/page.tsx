"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  DownloadIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  UserIcon,
  MailIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Kullanıcı tipi
interface User {
  id: string
  name: string
  email: string
  package: "free" | "bronze" | "silver" | "gold"
  status: "active" | "inactive" | "suspended"
  registrationDate: string
  lastLogin: string
  balance: number
  instagram?: string
  phone?: string
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [packageFilter, setPackageFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    package: "free",
    phone: "",
  })
  const { toast } = useToast()

  // Demo kullanıcılar
  const [users, setUsers] = useState<User[]>(
    Array.from({ length: 20 }).map((_, i) => ({
      id: `user-${i + 1}`,
      name: `Kullanıcı ${i + 1}`,
      email: `kullanici${i + 1}@email.com`,
      package: i % 4 === 0 ? "free" : i % 4 === 1 ? "bronze" : i % 4 === 2 ? "silver" : "gold",
      status: i % 5 === 0 ? "suspended" : i % 7 === 0 ? "inactive" : "active",
      registrationDate: `${10 + i}/05/2025`,
      lastLogin: `${20 + (i % 10)}/05/2025`,
      balance: Math.floor(Math.random() * 1000),
      instagram: i % 3 === 0 ? `instagram_user${i}` : undefined,
      phone:
        i % 2 === 0
          ? `+90 5${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 1000)}${Math.floor(Math.random() * 1000)}`
          : undefined,
    })),
  )

  // Kullanıcı ekleme
  const addUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast({
        title: "Eksik bilgi",
        description: "Lütfen ad ve e-posta alanlarını doldurun",
        variant: "destructive",
      })
      return
    }

    const newUserObj: User = {
      id: `user-${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      package: newUser.package as "free" | "bronze" | "silver" | "gold",
      status: "active",
      registrationDate: new Date().toLocaleDateString(),
      lastLogin: new Date().toLocaleDateString(),
      balance: 0,
      phone: newUser.phone || undefined,
    }

    setUsers([newUserObj, ...users])
    setNewUser({
      name: "",
      email: "",
      package: "free",
      phone: "",
    })
    setIsAddUserOpen(false)

    toast({
      title: "Kullanıcı eklendi",
      description: "Yeni kullanıcı başarıyla eklendi",
    })
  }

  // Kullanıcı durumunu değiştirme
  const changeUserStatus = (userId: string, newStatus: "active" | "inactive" | "suspended") => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))

    toast({
      title: "Kullanıcı durumu güncellendi",
      description: `Kullanıcı durumu ${
        newStatus === "active" ? "aktif" : newStatus === "inactive" ? "pasif" : "askıya alınmış"
      } olarak güncellendi`,
    })
  }

  // Kullanıcı paketini değiştirme
  const changeUserPackage = (userId: string, newPackage: "free" | "bronze" | "silver" | "gold") => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, package: newPackage } : user)))

    toast({
      title: "Kullanıcı paketi güncellendi",
      description: `Kullanıcı paketi ${
        newPackage === "free"
          ? "Ücretsiz"
          : newPackage === "bronze"
            ? "Bronze"
            : newPackage === "silver"
              ? "Silver"
              : "Gold"
      } olarak güncellendi`,
    })
  }

  // Filtrelenmiş kullanıcılar
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.instagram && user.instagram.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.phone && user.phone.includes(searchQuery))

    const matchesPackage = packageFilter === "all" || user.package === packageFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesPackage && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kullanıcı Yönetimi</h1>
          <p className="text-muted-foreground">Tüm kullanıcıları görüntüleyin ve yönetin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Dışa Aktar
          </Button>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusIcon className="mr-2 h-4 w-4" />
                Kullanıcı Ekle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                <DialogDescription>
                  Sisteme yeni bir kullanıcı eklemek için aşağıdaki bilgileri doldurun.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input
                    id="name"
                    placeholder="Kullanıcının adı ve soyadı"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon (İsteğe Bağlı)</Label>
                  <Input
                    id="phone"
                    placeholder="+90 5XX XXX XX XX"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="package">Paket</Label>
                  <Select value={newUser.package} onValueChange={(value) => setNewUser({ ...newUser, package: value })}>
                    <SelectTrigger id="package">
                      <SelectValue placeholder="Paket seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Ücretsiz</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  İptal
                </Button>
                <Button onClick={addUser}>Kullanıcı Ekle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kullanıcılar</CardTitle>
          <CardDescription>Toplam {users.length} kullanıcı</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Kullanıcı ara..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={packageFilter} onValueChange={setPackageFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Paket" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Paketler</SelectItem>
                  <SelectItem value="free">Ücretsiz</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                  <SelectItem value="suspended">Askıya Alınmış</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kullanıcı</TableHead>
                  <TableHead>E-posta</TableHead>
                  <TableHead>Paket</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Kayıt Tarihi</TableHead>
                  <TableHead>Bakiye</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.slice(0, 10).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.package === "free" ? (
                        <Badge variant="outline">Ücretsiz</Badge>
                      ) : user.package === "bronze" ? (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        >
                          Bronze
                        </Badge>
                      ) : user.package === "silver" ? (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                        >
                          Silver
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                        >
                          Gold
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.status === "suspended" ? (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        >
                          Askıya Alınmış
                        </Badge>
                      ) : user.status === "inactive" ? (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                        >
                          Pasif
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        >
                          Aktif
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{user.registrationDate}</TableCell>
                    <TableCell>₺{user.balance.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">İşlemler</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <UserIcon className="mr-2 h-4 w-4" />
                            Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MailIcon className="mr-2 h-4 w-4" />
                            E-posta Gönder
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Paket Değiştir</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => changeUserPackage(user.id, "free")}>
                            Ücretsiz
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeUserPackage(user.id, "bronze")}>
                            Bronze
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeUserPackage(user.id, "silver")}>
                            Silver
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeUserPackage(user.id, "gold")}>Gold</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Durum Değiştir</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => changeUserStatus(user.id, "active")}>
                            <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                            Aktif Yap
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeUserStatus(user.id, "inactive")}>
                            <XCircleIcon className="mr-2 h-4 w-4 text-gray-500" />
                            Pasif Yap
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeUserStatus(user.id, "suspended")}>
                            <AlertCircleIcon className="mr-2 h-4 w-4 text-red-500" />
                            Askıya Al
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Toplam {users.length} kullanıcıdan {Math.min(filteredUsers.length, 10)} tanesi gösteriliyor
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Önceki
              </Button>
              <Button variant="outline" size="sm" className="bg-primary/10">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Sonraki
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
