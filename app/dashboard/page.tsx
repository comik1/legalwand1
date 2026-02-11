import { ModernCard } from "@/components/modern-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  FileText,
  TrendingUp,
  Users,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <>
      {/* Welcome Section with Illustration */}
      <div className="relative h-64 rounded-xl overflow-hidden shadow-lg shadow-gray-200/50">
        <Image
          src="/images/legal-meeting.png"
          fill
          alt="Legal professionals discussing documents"
          className="z-0 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-950/70 z-10"></div>
        <div className="relative z-20 flex flex-col justify-center h-full p-6 text-white">
          <h1 className="text-3xl font-bold">Welcome to LegalWand!</h1>
          <p className="mt-1 text-lg">Your comprehensive platform for legal AI solutions.</p>
          <Button className="mt-4 w-fit bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all duration-200">
            <Sparkles className="mr-2 h-4 w-4" />
            Explore AI Features
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ModernCard
          title="Total Contracts"
          value="1,234"
          change="+12% from last month"
          icon={FileText}
          trend="up"
          gradient="from-blue-500 to-cyan-500"
        />
        <ModernCard
          title="Active Cases"
          value="89"
          change="+5% from last month"
          icon={TrendingUp}
          trend="up"
          gradient="from-emerald-500 to-teal-500"
        />
        <ModernCard
          title="Team Members"
          value="24"
          change="+2 new this month"
          icon={Users}
          trend="up"
          gradient="from-blue-700 to-indigo-900"
        />
        <ModernCard
          title="Efficiency Score"
          value="94%"
          change="+3% from last month"
          icon={BarChart3}
          trend="up"
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Activity Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ✅ Recent Contracts - subtle gray border */}
        <Card className="border border-gray-200 bg-white/70 backdrop-blur-sm shadow-lg shadow-gray-200/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">Recent Contracts</CardTitle>
                <CardDescription className="text-gray-600">Latest contract activities and updates</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-800 hover:bg-blue-50">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Employment Agreement - Tech Corp",
                  status: "In Progress",
                  time: "2 hours ago",
                  color: "blue",
                },
                { title: "NDA - StartupXYZ", status: "Completed", time: "4 hours ago", color: "green" },
                {
                  title: "Service Agreement - ClientABC",
                  status: "Pending Review",
                  time: "6 hours ago",
                  color: "yellow",
                },
                { title: "Partnership Agreement - LegalTech", status: "Draft", time: "1 day ago", color: "purple" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-4 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50/80"
                >
                  <div
                    className={`h-3 w-3 rounded-full ${
                      item.color === "blue"
                        ? "bg-blue-500"
                        : item.color === "green"
                          ? "bg-emerald-500"
                          : item.color === "yellow"
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                    } shadow-lg`}
                  ></div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.status}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ✅ AI Assistant Activity - soft indigo border */}
        <Card className="border border-indigo-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 backdrop-blur-sm shadow-lg shadow-blue-200/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-700" />
                  AI Assistant Activity
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Recent AI-powered insights and recommendations
                </CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Contract risk analysis completed",
                  description: "3 potential issues identified in Tech Corp agreement",
                  icon: AlertCircle,
                  color: "text-orange-600",
                },
                {
                  title: "Template optimization suggested",
                  description: "AI recommends updates to Employment Agreement template",
                  icon: TrendingUp,
                  color: "text-blue-600",
                },
                {
                  title: "Compliance check passed",
                  description: "All documents meet current regulatory standards",
                  icon: CheckCircle2,
                  color: "text-emerald-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 rounded-xl p-4 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-white/80 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
} 