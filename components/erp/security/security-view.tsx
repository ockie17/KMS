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
import { securityLogs } from "@/lib/mock-data"
import { Plus, Shield, AlertTriangle, Camera, DoorOpen, Activity, Clock } from "lucide-react"

const cctvLocations = [
  { name: "Pintu Utama", status: "Online", recording: true },
  { name: "Galeri Utama", status: "Online", recording: true },
  { name: "Galeri Timur", status: "Online", recording: true },
  { name: "Galeri Barat", status: "Offline", recording: false },
  { name: "Ruang Konservasi", status: "Online", recording: true },
  { name: "Gudang", status: "Online", recording: true },
]

export function SecurityView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getSeverityBadge = (severity: string) => {
    const variants = {
      Low: "secondary",
      Medium: "default",
      High: "destructive",
      Critical: "destructive",
    } as const
    return <Badge variant={variants[severity as keyof typeof variants] || "secondary"}>{severity}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const config = {
      Access: { icon: DoorOpen, color: "text-chart-2" },
      Alert: { icon: AlertTriangle, color: "text-warning" },
      Incident: { icon: Shield, color: "text-destructive" },
      Audit: { icon: Activity, color: "text-primary" },
    }
    const { icon: Icon, color } = config[type as keyof typeof config] || { icon: Activity, color: "text-primary" }
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon className="h-4 w-4" />
        <span>{type}</span>
      </div>
    )
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const alertCount = securityLogs.filter((l) => l.type === "Alert" || l.type === "Incident").length
  const onlineCameras = cctvLocations.filter((c) => c.status === "Online").length

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status Keamanan</p>
                <p className="text-xl font-bold text-success">Aman</p>
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
                <p className="text-sm text-muted-foreground">Alert Hari Ini</p>
                <p className="text-xl font-bold text-foreground">{alertCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Camera className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CCTV Online</p>
                <p className="text-xl font-bold text-foreground">
                  {onlineCameras}/{cctvLocations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <DoorOpen className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Akses Hari Ini</p>
                <p className="text-xl font-bold text-foreground">
                  {securityLogs.filter((l) => l.type === "Access").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* CCTV Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Status CCTV</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {cctvLocations.map((cctv) => (
                <div key={cctv.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <Camera className={`h-5 w-5 ${cctv.status === "Online" ? "text-success" : "text-destructive"}`} />
                    <span className="font-medium text-foreground">{cctv.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {cctv.recording && (
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                        <span className="text-xs text-muted-foreground">REC</span>
                      </div>
                    )}
                    <Badge variant={cctv.status === "Online" ? "default" : "destructive"}>{cctv.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Log */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Log Keamanan</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Lapor Insiden
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Laporkan Insiden</DialogTitle>
                  <DialogDescription>Catat insiden keamanan baru.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Jenis</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Access">Akses</SelectItem>
                          <SelectItem value="Alert">Alert</SelectItem>
                          <SelectItem value="Incident">Insiden</SelectItem>
                          <SelectItem value="Audit">Audit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tingkat</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tingkat" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Lokasi</Label>
                    <Input placeholder="Lokasi kejadian" />
                  </div>
                  <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Textarea placeholder="Deskripsi insiden..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Laporkan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Waktu</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Tingkat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(log.type)}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{log.description}</TableCell>
                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
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
