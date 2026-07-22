import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `₦${(amount).toLocaleString()}`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function maskAccount(account: string): string {
  if (account.length <= 4) return account
  return `****${account.slice(-4)}`
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    PENDING_VERIFICATION: "bg-yellow-100 text-yellow-800",
    PENDING_APPROVAL: "bg-blue-100 text-blue-800",
    APPROVED: "bg-indigo-100 text-indigo-800",
    EXECUTED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    FAILED: "bg-red-100 text-red-800",
  }
  return map[status] ?? "bg-gray-100 text-gray-800"
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    PENDING_VERIFICATION: "Verifying",
    PENDING_APPROVAL: "Awaiting Approval",
    APPROVED: "Approved",
    EXECUTED: "Completed",
    REJECTED: "Rejected",
    FAILED: "Failed",
  }
  return map[status] ?? status
}
