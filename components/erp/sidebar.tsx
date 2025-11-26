"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ModuleType } from "@/lib/types"
import {
  LayoutDashboard,
  Archive,
  ImageIcon,
  Wallet,
  ShoppingCart,
  Wrench,
  Users,
  UserCog,
  BookOpen,
  Shield,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react"

interface SidebarProps {
  activeModule: ModuleType
  onModuleChange: (module: ModuleType) => void
}

const menuItems = [
  { id: "dashboard" as ModuleType, label: "Dashboard", icon: LayoutDashboard },
  { id: "collections" as ModuleType, label: "Koleksi", icon: Archive },
  { id: "exhibitions" as ModuleType, label: "Pameran", icon: ImageIcon },
  { id: "visitors" as ModuleType, label: "Pengunjung", icon: Users },
  { id: "finance" as ModuleType, label: "Keuangan", icon: Wallet },
  { id: "procurement" as ModuleType, label: "Pengadaan", icon: ShoppingCart },
  { id: "conservation" as ModuleType, label: "Konservasi", icon: Wrench },
  { id: "hr" as ModuleType, label: "SDM", icon: UserCog },
  { id: "research" as ModuleType, label: "Penelitian", icon: BookOpen },
  { id: "security" as ModuleType, label: "Keamanan", icon: Shield },
  { id: "analytics" as ModuleType, label: "Analitik", icon: BarChart3 },
  { id: "settings" as ModuleType, label: "Pengaturan", icon: Settings },
]

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 p-4 border-b border-sidebar-border", collapsed && "justify-center")}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Building2 className="h-6 w-6 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground">Museum ERP</span>
            <span className="text-xs text-muted-foreground">Indonesia</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeModule === item.id
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "justify-start gap-3 h-10",
                  collapsed && "justify-center px-2",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
                onClick={() => onModuleChange(item.id)}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* User */}
      <div className={cn("border-t border-sidebar-border p-4", collapsed && "px-2")}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">A</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">Admin</span>
              <span className="text-xs text-muted-foreground">Administrator</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
