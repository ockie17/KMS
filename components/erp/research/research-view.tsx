"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { researchProjects, collections } from "@/lib/mock-data"
import { Plus, BookOpen, FileText, Users, Calendar, Archive } from "lucide-react"

export function ResearchView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "default",
      Completed: "outline",
      "On Hold": "secondary",
    } as const
    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
  }

  const activeProjects = researchProjects.filter((p) => p.status === "Active").length
  const totalPublications = researchProjects.reduce((acc, p) => acc + p.publications, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Proyek</p>
                <p className="text-xl font-bold text-foreground">{researchProjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proyek Aktif</p>
                <p className="text-xl font-bold text-foreground">{activeProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Publikasi</p>
                <p className="text-xl font-bold text-foreground">{totalPublications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Peneliti</p>
                <p className="text-xl font-bold text-foreground">
                  {new Set(researchProjects.map((p) => p.researcher)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Proyek Penelitian</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Proyek Baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Proyek Penelitian</DialogTitle>
              <DialogDescription>Ajukan proyek penelitian baru.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Judul Penelitian</Label>
                <Input placeholder="Judul proyek" />
              </div>
              <div className="space-y-2">
                <Label>Peneliti</Label>
                <Input placeholder="Nama peneliti" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal Mulai</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Selesai (Estimasi)</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea placeholder="Deskripsi proyek penelitian..." />
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
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {researchProjects.map((project) => (
          <Card key={project.id} className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-foreground text-lg leading-tight">{project.title}</CardTitle>
                {getStatusBadge(project.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{project.researcher}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.startDate} - {project.endDate || "Berlangsung"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{project.publications} Publikasi</span>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Koleksi Terkait</p>
                  <div className="flex flex-wrap gap-1">
                    {project.collections.map((colId) => {
                      const col = collections.find((c) => c.id === colId)
                      return col ? (
                        <Badge key={colId} variant="secondary" className="text-xs">
                          <Archive className="h-3 w-3 mr-1" />
                          {col.name.slice(0, 15)}...
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-2 bg-transparent">
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
