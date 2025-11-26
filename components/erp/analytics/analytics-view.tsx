"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { visitorStats, collectionCategories, dashboardStats } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Users, Archive, Wallet, ImageIcon } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts"

const COLORS = ["#3ECFA0", "#5B8DEF", "#F5C542", "#E879F9", "#FB923C", "#6366F1"]

const performanceData = [
  { metric: "Pengunjung", value: 85 },
  { metric: "Pendapatan", value: 78 },
  { metric: "Koleksi", value: 92 },
  { metric: "Pameran", value: 70 },
  { metric: "Konservasi", value: 88 },
  { metric: "Keamanan", value: 95 },
]

const monthlyComparison = [
  { month: "Jan", current: 12500, previous: 10200 },
  { month: "Feb", current: 14200, previous: 11800 },
  { month: "Mar", current: 15800, previous: 13500 },
  { month: "Apr", current: 13400, previous: 12100 },
  { month: "Mei", current: 16200, previous: 14800 },
  { month: "Jun", current: 15420, previous: 13900 },
]

export function AnalyticsView() {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Dashboard Analitik</h2>
        <Select defaultValue="6m">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Hari Terakhir</SelectItem>
            <SelectItem value="1m">1 Bulan Terakhir</SelectItem>
            <SelectItem value="3m">3 Bulan Terakhir</SelectItem>
            <SelectItem value="6m">6 Bulan Terakhir</SelectItem>
            <SelectItem value="1y">1 Tahun Terakhir</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pengunjung</p>
                <p className="text-2xl font-bold text-foreground">
                  {dashboardStats.monthlyVisitors.toLocaleString("id-ID")}
                </p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{dashboardStats.visitorsGrowth}%</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Koleksi</p>
                <p className="text-2xl font-bold text-foreground">
                  {dashboardStats.totalCollections.toLocaleString("id-ID")}
                </p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{dashboardStats.collectionsGrowth}%</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Archive className="h-6 w-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendapatan</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(dashboardStats.totalRevenue)}</p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{dashboardStats.revenueGrowth}%</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pameran Aktif</p>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.activeExhibitions}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingDown className="h-4 w-4" />
                  <span>{dashboardStats.exhibitionsGrowth}%</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Visitor Comparison */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Perbandingan Pengunjung (YoY)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparison}>
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
                  <Bar dataKey="previous" name="Tahun Lalu" fill="#5B8DEF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="current" name="Tahun Ini" fill="#3ECFA0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Tren Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorStats}>
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
                  <Area type="monotone" dataKey="revenue" stroke="#3ECFA0" fill="#3ECFA0" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Collection Categories */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Distribusi Koleksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={collectionCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="count"
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
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {collectionCategories.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Radar */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Performa Museum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="metric" stroke="#888" />
                  <Radar name="Performa" dataKey="value" stroke="#3ECFA0" fill="#3ECFA0" fillOpacity={0.3} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Visitor Flow */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Alur Pengunjung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorStats}>
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
                  <Line type="monotone" dataKey="visitors" stroke="#5B8DEF" strokeWidth={2} dot={{ fill: "#5B8DEF" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
