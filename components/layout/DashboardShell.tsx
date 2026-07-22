"use client"

import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  )
}
