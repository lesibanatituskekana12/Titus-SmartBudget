import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { UserNav } from "@/components/user-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center justify-end space-x-4">
            <UserNav />
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
