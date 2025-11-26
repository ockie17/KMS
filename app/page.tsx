"use client"

import { useState } from "react"
import { Sidebar } from "@/components/erp/sidebar"
import { Header } from "@/components/erp/header"
import { DashboardView } from "@/components/erp/dashboard/dashboard-view"
import { CollectionsView } from "@/components/erp/collections/collections-view"
import { ExhibitionsView } from "@/components/erp/exhibitions/exhibitions-view"
import { VisitorsView } from "@/components/erp/visitors/visitors-view"
import { FinanceView } from "@/components/erp/finance/finance-view"
import { ProcurementView } from "@/components/erp/procurement/procurement-view"
import { ConservationView } from "@/components/erp/conservation/conservation-view"
import { HRView } from "@/components/erp/hr/hr-view"
import { ResearchView } from "@/components/erp/research/research-view"
import { SecurityView } from "@/components/erp/security/security-view"
import { AnalyticsView } from "@/components/erp/analytics/analytics-view"
import { SettingsView } from "@/components/erp/settings/settings-view"
import type { ModuleType } from "@/lib/types"

const moduleLabels: Record<ModuleType, string> = {
  dashboard: "Dashboard",
  collections: "Manajemen Koleksi",
  exhibitions: "Manajemen Pameran",
  visitors: "Pengunjung & Tiket",
  finance: "Keuangan",
  procurement: "Pengadaan",
  conservation: "Konservasi",
  hr: "Sumber Daya Manusia",
  research: "Penelitian",
  security: "Keamanan",
  analytics: "Analitik",
  settings: "Pengaturan",
}

export default function Page() {
  const [activeModule, setActiveModule] = useState<ModuleType>("dashboard")

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardView />
      case "collections":
        return <CollectionsView />
      case "exhibitions":
        return <ExhibitionsView />
      case "visitors":
        return <VisitorsView />
      case "finance":
        return <FinanceView />
      case "procurement":
        return <ProcurementView />
      case "conservation":
        return <ConservationView />
      case "hr":
        return <HRView />
      case "research":
        return <ResearchView />
      case "security":
        return <SecurityView />
      case "analytics":
        return <AnalyticsView />
      case "settings":
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={moduleLabels[activeModule]} />
        <main className="flex-1 overflow-auto p-6">{renderModule()}</main>
      </div>
    </div>
  )
}
