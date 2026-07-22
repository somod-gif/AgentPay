"use client"

import type { AuditLog } from "@/types"
import { formatDate } from "@/lib/utils"
import {
  MessageSquare,
  CheckCircle2,
  Shield,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Send,
  AlertCircle,
  Bell,
  XCircle,
} from "lucide-react"

const actionIcons: Record<string, React.ReactNode> = {
  INTENT_RECEIVED: <MessageSquare className="h-4 w-4" />,
  ACCOUNT_VERIFIED: <CheckCircle2 className="h-4 w-4" />,
  VERIFICATION_FAILED: <XCircle className="h-4 w-4" />,
  POLICY_CHECKED: <Shield className="h-4 w-4" />,
  APPROVAL_REQUESTED: <Clock className="h-4 w-4" />,
  APPROVED: <ThumbsUp className="h-4 w-4" />,
  REJECTED: <ThumbsDown className="h-4 w-4" />,
  PAYMENT_EXECUTED: <Send className="h-4 w-4" />,
  PAYMENT_FAILED: <AlertCircle className="h-4 w-4" />,
  NOTIFICATION_SENT: <Bell className="h-4 w-4" />,
}

const actionColors: Record<string, string> = {
  INTENT_RECEIVED: "bg-gray-100 text-gray-600",
  ACCOUNT_VERIFIED: "bg-green-100 text-green-600",
  VERIFICATION_FAILED: "bg-red-100 text-red-600",
  POLICY_CHECKED: "bg-blue-100 text-blue-600",
  APPROVAL_REQUESTED: "bg-yellow-100 text-yellow-600",
  APPROVED: "bg-green-100 text-green-600",
  REJECTED: "bg-red-100 text-red-600",
  PAYMENT_EXECUTED: "bg-indigo-100 text-indigo-600",
  PAYMENT_FAILED: "bg-red-100 text-red-600",
  NOTIFICATION_SENT: "bg-purple-100 text-purple-600",
}

const actionLabels: Record<string, string> = {
  INTENT_RECEIVED: "Intent Received",
  ACCOUNT_VERIFIED: "Account Verified",
  VERIFICATION_FAILED: "Verification Failed",
  POLICY_CHECKED: "Policy Checked",
  APPROVAL_REQUESTED: "Approval Requested",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PAYMENT_EXECUTED: "Payment Executed",
  PAYMENT_FAILED: "Payment Failed",
  NOTIFICATION_SENT: "Notification Sent",
}

export function AuditTimeline({ logs }: { logs: AuditLog[] }) {
  return (
    <div className="relative space-y-0">
      {logs.map((log, i) => (
        <div key={log.id} className="flex gap-4 pb-8 relative">
          {/* Vertical line */}
          {i < logs.length - 1 && (
            <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gray-200" />
          )}

          {/* Icon */}
          <div
            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              actionColors[log.action] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {actionIcons[log.action] ?? <Clock className="h-4 w-4" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-gray-900">
                {actionLabels[log.action] ?? log.action}
              </p>
              <span className="shrink-0 text-xs text-gray-400">
                {formatDate(log.createdAt)}
              </span>
            </div>
            {log.user && (
              <p className="text-xs text-gray-500">by {log.user.name}</p>
            )}
            {log.metadata && (
              <pre className="mt-1 text-xs text-gray-400 truncate">
                {JSON.stringify(log.metadata)}
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
