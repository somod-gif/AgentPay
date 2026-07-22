"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import {
  Wallet,
  LayoutDashboard,
  CreditCard,
  CheckSquare,
  Users,
  LogOut,
} from "lucide-react"

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["ADMIN", "MANAGER", "STAFF"] },
  { href: "/payments", label: "Payments", icon: CreditCard, roles: ["ADMIN", "MANAGER", "STAFF"] },
  { href: "/approvals", label: "Approvals", icon: CheckSquare, roles: ["ADMIN", "MANAGER"] },
  { href: "/users", label: "Users", icon: Users, roles: ["ADMIN"] },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <Link href="/" className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Wallet className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900">AgentPay</span>
      </Link>

      <nav className="flex-1 space-y-1 p-4">
        {links
          .filter((link) => link.roles.includes(user.role))
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
