import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BreadcrumbNav } from "./breadcrumb-nav" // Import BreadcrumbNav

export function DashboardHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumb Nav (moved from dashboard.tsx) */}
        <BreadcrumbNav />

        {/* Right side - only notifications remain */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
          >
            <Bell className="h-5 w-5" />
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-lg">
              3
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}
