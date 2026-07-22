"use client"

import { AuthGuard } from "@/components/layout/AuthGuard"
import { DashboardShell } from "@/components/layout/DashboardShell"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  )
}
