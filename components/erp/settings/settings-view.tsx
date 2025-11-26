"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Bell, Lock, Globe, Palette, Database, Mail, Shield } from "lucide-react"

export function SettingsView() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    security: true,
    conservation: true,
    finance: false,
  })

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Umum</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifikasi</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Keamanan</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Sistem</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <div className="grid gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Informasi Museum</CardTitle>
                <CardDescription>Informasi dasar tentang museum Anda.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="museum-name">Nama Museum</Label>
                  <Input id="museum-name" defaultValue="Museum Nasional Indonesia" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea id="address" defaultValue="Jl. Medan Merdeka Barat No.12, Jakarta Pusat" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telepon</Label>
                    <Input id="phone" defaultValue="+62 21 3868172" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="info@museum.go.id" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="open-time">Jam Buka</Label>
                    <Input id="open-time" type="time" defaultValue="08:00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="close-time">Jam Tutup</Label>
                    <Input id="close-time" type="time" defaultValue="16:00" />
                  </div>
                </div>
                <Button className="w-fit">Simpan Perubahan</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Lokalisasi
                </CardTitle>
                <CardDescription>Pengaturan bahasa dan format regional.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Bahasa</Label>
                    <Select defaultValue="id">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Zona Waktu</Label>
                    <Select defaultValue="wib">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wib">WIB (UTC+7)</SelectItem>
                        <SelectItem value="wita">WITA (UTC+8)</SelectItem>
                        <SelectItem value="wit">WIT (UTC+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Format Mata Uang</Label>
                  <Select defaultValue="idr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idr">IDR - Rupiah Indonesia</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferensi Notifikasi
              </CardTitle>
              <CardDescription>Kelola bagaimana Anda menerima notifikasi.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Saluran Notifikasi</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">Terima notifikasi via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Push Notification</p>
                      <p className="text-sm text-muted-foreground">Notifikasi browser</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground">Jenis Notifikasi</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Keamanan</p>
                    <p className="text-sm text-muted-foreground">Alert keamanan dan akses</p>
                  </div>
                  <Switch
                    checked={notifications.security}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, security: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Konservasi</p>
                    <p className="text-sm text-muted-foreground">Jadwal dan tugas konservasi</p>
                  </div>
                  <Switch
                    checked={notifications.conservation}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, conservation: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Keuangan</p>
                    <p className="text-sm text-muted-foreground">Laporan dan transaksi</p>
                  </div>
                  <Switch
                    checked={notifications.finance}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, finance: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-6">
          <div className="grid gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Keamanan Akun
                </CardTitle>
                <CardDescription>Kelola keamanan akun Anda.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Password Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-fit">Ubah Password</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Two-Factor Authentication</CardTitle>
                <CardDescription>Tambahkan lapisan keamanan ekstra.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Aktifkan 2FA</p>
                    <p className="text-sm text-muted-foreground">Gunakan aplikasi authenticator</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="mt-6">
          <div className="grid gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database & Backup
                </CardTitle>
                <CardDescription>Kelola data dan backup sistem.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div>
                    <p className="font-medium text-foreground">Backup Terakhir</p>
                    <p className="text-sm text-muted-foreground">15 Februari 2024, 02:00 WIB</p>
                  </div>
                  <Button variant="outline">Backup Sekarang</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Auto Backup</p>
                    <p className="text-sm text-muted-foreground">Backup otomatis setiap hari</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Tampilan
                </CardTitle>
                <CardDescription>Kustomisasi tampilan aplikasi.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Tema</Label>
                  <Select defaultValue="dark">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Tampilan lebih ringkas</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
