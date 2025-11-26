"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { conservationRecords, collections } from "@/lib/mock-data"
import { Plus, Wrench, Thermometer, Droplets, Wind, AlertTriangle } from "lucide-react"

const environmentData = [
  { location: "Galeri Utama", temp: 22, humidity: 55, airQuality: "Baik" },
  { location: "Galeri Timur", temp: 23, humidity: 58, airQuality: "Baik" },
  { location: "Galeri Barat", temp: 21, humidity: 52, airQuality: "Baik" },
  { location: "Ruang Konservasi", temp: 20, humidity: 50, airQuality: "Sangat Baik" },
  { location: "Gudang", temp: 24, humidity: 60, airQuality: "Perlu Perhatian" },
]

export function ConservationView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const variants = {
      Scheduled: "secondary",
      "In Progress": "default",
      Completed: "outline",
    } as const
    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      Inspection: "bg-chart-2/20 text-chart-2",
      Treatment: "bg-warning/20 text-warning",
      Restoration: "bg-primary/20 text-primary",
    }
    return (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${colors[type as keyof typeof colors] || "bg-secondary"}`}
      >
        {type}
      </span>
    )
  }

  const getAirQualityBadge = (quality: string) => {
    const config = {
      "Sangat Baik": "default",
      Baik: "secondary",
      "Perlu Perhatian": "destructive",
    } as const
    return <Badge variant={config[quality as keyof typeof config] || "secondary"}>{quality}</Badge>
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tugas</p>
                <p className="text-xl font-bold text-foreground">{conservationRecords.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dalam Proses</p>
                <p className="text-xl font-bold text-foreground">
                  {conservationRecords.filter((r) => r.status === "In Progress").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Thermometer className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suhu Rata-rata</p>
                <p className="text-xl font-bold text-foreground">22°C</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Droplets className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kelembaban</p>
                <p className="text-xl font-bold text-foreground">55%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environment Monitoring */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Monitoring Lingkungan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {environmentData.map((env) => (
              <div key={env.location} className="p-4 rounded-lg bg-secondary">
                <p className="font-medium text-foreground mb-3">{env.location}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Thermometer className="h-4 w-4" />
                      <span className="text-sm">Suhu</span>
                    </div>
                    <span className="font-medium text-foreground">{env.temp}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Droplets className="h-4 w-4" />
                      <span className="text-sm">Kelembaban</span>
                    </div>
                    <span className="font-medium text-foreground">{env.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Wind className="h-4 w-4" />
                      <span className="text-sm">Udara</span>
                    </div>
                    {getAirQualityBadge(env.airQuality)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conservation Tasks */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Tugas Konservasi</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Tugas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Tugas Konservasi</DialogTitle>
                <DialogDescription>Jadwalkan tugas konservasi untuk koleksi.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Koleksi</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih koleksi" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Jenis</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inspection">Inspeksi</SelectItem>
                        <SelectItem value="Treatment">Perawatan</SelectItem>
                        <SelectItem value="Restoration">Restorasi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tanggal</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Teknisi</Label>
                  <Input placeholder="Nama teknisi" />
                </div>
                <div className="space-y-2">
                  <Label>Catatan</Label>
                  <Textarea placeholder="Catatan tugas..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>ID</TableHead>
                <TableHead>Koleksi</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Teknisi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Catatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conservationRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-mono text-sm">{record.id}</TableCell>
                  <TableCell className="font-medium">{record.collectionName}</TableCell>
                  <TableCell>{getTypeBadge(record.type)}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.technician}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
