"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, PlusCircle, BarChart3, Target, Lightbulb, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Add Transaction",
      href: "/transactions/add",
      icon: PlusCircle,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart3,
    },
    {
      name: "Savings Goals",
      href: "/goals",
      icon: Target,
    },
    {
      name: "Tips",
      href: "/tips",
      icon: Lightbulb,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center mb-10 pl-2" onClick={() => isMobile && setIsOpen(false)}>
          <span className="font-bold text-xl">SmartBudget</span>
        </Link>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={() => {
            // Handle logout
            window.location.href = "/login"
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={toggleSidebar} />}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {sidebarContent}
        </div>
      </>
    )
  }

  return <div className={cn("w-64 border-r h-screen sticky top-0", className)}>{sidebarContent}</div>
}
