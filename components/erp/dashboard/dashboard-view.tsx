"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "../stat-card"
import {
  dashboardStats,
  visitorStats,
  collectionCategories,
  collections,
  exhibitions,
  conservationRecords,
} from "@/lib/mock-data"
import { Archive, ImageIcon, Users, Wallet } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"

const COLORS = ["#3ECFA0", "#5B8DEF", "#F5C542", "#E879F9", "#FB923C", "#6366F1"]

export function DashboardView() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Koleksi"
          value={dashboardStats.totalCollections.toLocaleString("id-ID")}
          change={dashboardStats.collectionsGrowth}
          icon={Archive}
        />
        <StatCard
          title="Pameran Aktif"
          value={dashboardStats.activeExhibitions}
          change={dashboardStats.exhibitionsGrowth}
          icon={ImageIcon}
        />
        <StatCard
          title="Pengunjung Bulan Ini"
          value={dashboardStats.monthlyVisitors.toLocaleString("id-ID")}
          change={dashboardStats.visitorsGrowth}
          icon={Users}
        />
        <StatCard
          title="Pendapatan"
          value={formatCurrency(dashboardStats.totalRevenue)}
          change={dashboardStats.revenueGrowth}
          icon={Wallet}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Visitor Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Statistik Pengunjung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitorStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="visitors" fill="#3ECFA0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Collection Categories */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Kategori Koleksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={collectionCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    labelLine={false}
                  >
                    {collectionCategories.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Pendapatan Bulanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorStats}>
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
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Pendapatan"
                  stroke="#3ECFA0"
                  strokeWidth={2}
                  dot={{ fill: "#3ECFA0" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Collections */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Koleksi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {collections.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Archive className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <Badge
                    variant={
                      item.condition === "Baik"
                        ? "default"
                        : item.condition === "Perlu Perawatan"
                          ? "secondary"
                          : "destructive"
                    }
                    className="shrink-0"
                  >
                    {item.condition}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Exhibitions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Pameran Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {exhibitions
                .filter((e) => e.status !== "Completed")
                .map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.curator}</p>
                    </div>
                    <Badge variant={item.status === "Ongoing" ? "default" : "secondary"}>{item.status}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Conservation Tasks */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Tugas Konservasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {conservationRecords.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{item.type.slice(0, 2)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.collectionName}</p>
                    <p className="text-xs text-muted-foreground">{item.technician}</p>
                  </div>
                  <Badge
                    variant={
                      item.status === "Completed" ? "default" : item.status === "In Progress" ? "secondary" : "outline"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
