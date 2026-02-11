"use client"

import { ChevronRight } from "lucide-react"
import { BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

interface BreadcrumbNavProps {
  items?: Array<{
    label: string
    href?: string
  }>
}

export function BreadcrumbNav({ items = [] }: BreadcrumbNavProps) {
  const pathname = usePathname()

  // Generate breadcrumbs dynamically from the current pathname
  const pathSegments = pathname.split("/").filter(Boolean)
  const dynamicItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/")
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    return { label, href }
  })

  const defaultItems = [{ label: "Home", href: "/" }, ...dynamicItems]

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      {defaultItems.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {index > 0 && (
            <BreadcrumbSeparator className="text-gray-300">
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
          )}
          {index === defaultItems.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <BreadcrumbLink href={item.href || "#"} className="text-gray-500 hover:text-blue-700 transition-colors">
              {item.label}
            </BreadcrumbLink>
          )}
        </div>
      ))}
    </nav>
  )
}
