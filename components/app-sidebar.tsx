"use client"

import {
  BarChart3,
  BookOpen,
  Bot,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Plug,
  Settings,
  Sparkles,
  User,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link" // Import Link
import { usePathname } from "next/navigation" // Import usePathname

// Define the type for menu and footer items
const menuItems: { title: string; url: string; icon: React.ElementType }[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "AI Contract Drafting", url: "/ai-contract-drafting", icon: FileText },
  { title: "AI Contract Review", url: "/ai-contract-review", icon: BookOpen },
  { title: "AI Clause Suggestions", url: "/ai-clause-suggestions", icon: Bot },
  { title: "Compliance Checklist", url: "/compliance-checklist", icon: BarChart3 },
  { title: "Contract Comparison", url: "/contract-comparison", icon: Plug },
  { title: "Client Management", url: "/clients", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
]

const footerItems: { title: string; url: string; icon: React.ElementType }[] = []

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col h-full shadow-md border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 via-indigo-800 to-indigo-900 shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              LegalWand
            </span>
            <span className="text-xs text-gray-500">Legal AI Platform</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.url}
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-100 cursor-pointer ${pathname === item.url
                    ? "bg-gradient-to-r from-blue-700 to-indigo-900 text-white shadow-sm"
                    : "text-gray-700"
                  }`}
              >
                <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>{item.title}</span>
                {pathname === item.url && (
                  <div className="absolute right-0  rounded-l-full bg-gradient-to-b from-blue-600 to-indigo-800"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        {footerItems.length > 0 && (
          <ul className="space-y-1 mb-2">
            {footerItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* User Profile Dropdown at the bottom of the sidebar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full h-10 gap-3 rounded-xl px-3 justify-start hover:bg-gray-100/80 transition-all duration-200 cursor-pointer"
            >
              <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                <AvatarImage src="/images/customer2.png" alt="User Profile" />
                <AvatarFallback className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white text-sm font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Senior Partner</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start" // Align to start to open rightwards from sidebar
            side="top" // Open above the trigger
            className="w-64 rounded-xl border-gray-200/50 bg-white/95 backdrop-blur-xl ml-2" // Adjust margin to align with sidebar
          >
            <DropdownMenuLabel className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/images/customer2.png" alt="User Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-xs text-gray-500">john@legalwand.com</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg">
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
