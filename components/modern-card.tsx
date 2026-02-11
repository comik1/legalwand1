import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ModernCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  trend: "up" | "down" | "neutral"
  gradient: string
}

export function ModernCard({ title, value, change, icon: Icon, trend, gradient }: ModernCardProps) {
  const trendColors = {
    up: "text-emerald-600",
    down: "text-red-500",
    neutral: "text-gray-500",
  }

  return (
    <Card className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-lg shadow-gray-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 border border-white/30
 hover:-translate-y-1">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`rounded-xl p-2.5 bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <p className={`text-sm font-medium ${trendColors[trend]}`}>{change}</p>
      </CardContent>
    </Card>
  )
}
