"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { visitorStats } from "@/lib/mock-data"
import { Plus, Users, Ticket, TrendingUp, CreditCard } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const ticketTypes = [
  { type: "Regular", price: 25000, description: "Tiket masuk umum" },
  { type: "Student", price: 15000, description: "Pelajar/Mahasiswa (dengan kartu)" },
  { type: "Group", price: 20000, description: "Rombongan (min. 20 orang)" },
  { type: "VIP", price: 75000, description: "Termasuk tur eksklusif" },
]

const recentTickets = [
  { id: "TKT001", date: "2024-02-15", type: "Regular", quantity: 4, total: 100000 },
  { id: "TKT002", date: "2024-02-15", type: "Student", quantity: 25, total: 375000 },
  { id: "TKT003", date: "2024-02-15", type: "VIP", quantity: 2, total: 150000 },
  { id: "TKT004", date: "2024-02-14", type: "Group", quantity: 30, total: 600000 },
  { id: "TKT005", date: "2024-02-14", type: "Regular", quantity: 6, total: 150000 },
]

export function VisitorsView() {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [selectedTicketType, setSelectedTicketType] = useState("")
  const [quantity, setQuantity] = useState(1)

  const totalVisitors = visitorStats.reduce((acc, v) => acc + v.visitors, 0)
  const totalRevenue = visitorStats.reduce((acc, v) => acc + v.revenue, 0)
  const avgVisitors = Math.round(totalVisitors / visitorStats.length)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const selectedPrice = ticketTypes.find((t) => t.type === selectedTicketType)?.price || 0

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pengunjung</p>
                <p className="text-xl font-bold text-foreground">{totalVisitors.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rata-rata/Bulan</p>
                <p className="text-xl font-bold text-foreground">{avgVisitors.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Ticket className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tiket Terjual Hari Ini</p>
                <p className="text-xl font-bold text-foreground">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendapatan</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Tren Pengunjung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke="#3ECFA0" fill="#3ECFA0" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Pendapatan Tiket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitorStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" tickFormatter={(value) => `${value / 1000000}jt`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="revenue" fill="#5B8DEF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Booking & Recent */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Ticket Types */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Jenis Tiket</CardTitle>
            <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Booking
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Booking Tiket</DialogTitle>
                  <DialogDescription>Pemesanan tiket untuk pengunjung museum.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Jenis Tiket</Label>
                    <Select value={selectedTicketType} onValueChange={setSelectedTicketType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis tiket" />
                      </SelectTrigger>
                      <SelectContent>
                        {ticketTypes.map((t) => (
                          <SelectItem key={t.type} value={t.type}>
                            {t.type} - {formatCurrency(t.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Jumlah</Label>
                    <Input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tanggal Kunjungan</Label>
                    <Input type="date" />
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedPrice * quantity)}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={() => setIsBookingDialogOpen(false)}>Konfirmasi</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {ticketTypes.map((ticket) => (
                <div key={ticket.type} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div>
                    <p className="font-medium text-foreground">{ticket.type}</p>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  </div>
                  <p className="font-bold text-primary">{formatCurrency(ticket.price)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tickets */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Transaksi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>ID Tiket</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                    <TableCell>{ticket.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{ticket.type}</Badge>
                    </TableCell>
                    <TableCell>{ticket.quantity}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(ticket.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
