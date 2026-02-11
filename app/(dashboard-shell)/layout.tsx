import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Fixed Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header (now includes Breadcrumb) */}
        <DashboardHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 space-y-6">{children}</main>
      </div>
    </div>
  )
} 