export type UserRole = "ADMIN" | "MANAGER" | "STAFF"

export type PaymentStatus =
  | "PENDING_VERIFICATION"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "EXECUTED"
  | "FAILED"

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED"

export type ActionType =
  | "INTENT_RECEIVED"
  | "ACCOUNT_VERIFIED"
  | "VERIFICATION_FAILED"
  | "POLICY_CHECKED"
  | "APPROVAL_REQUESTED"
  | "APPROVED"
  | "REJECTED"
  | "PAYMENT_EXECUTED"
  | "PAYMENT_FAILED"
  | "NOTIFICATION_SENT"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  manager?: { id: string; name: string } | null
  managerId?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface Payment {
  id: string
  userId: string
  user?: { name: string; email: string }
  amount: number
  currency: string
  recipientName: string
  recipientAccount: string
  recipientBankCode: string
  recipientBankName?: string | null
  purpose: string
  status: PaymentStatus
  monnifyRef?: string | null
  metadata?: Record<string, unknown> | null
  approval?: Approval | null
  auditLogs?: AuditLog[]
  createdAt: string
  updatedAt: string
}

export interface Approval {
  id: string
  paymentId: string
  payment?: Payment
  requestedBy: string
  requester?: { name: string; email: string }
  approverId: string
  approver?: { name: string; email: string }
  status: ApprovalStatus
  reason?: string | null
  respondedAt?: string | null
  createdAt: string
}

export interface AuditLog {
  id: string
  paymentId?: string | null
  payment?: Payment
  userId: string
  user?: { name: string; email: string }
  action: ActionType
  metadata?: Record<string, unknown> | null
  ipAddress?: string | null
  createdAt: string
}

export interface PaymentIntent {
  action: "pay" | "collect" | "schedule"
  amount: number
  currency: string
  recipientName: string
  recipientAccount?: string
  recipientBankCode?: string
  purpose: string
  urgency: "immediate" | "scheduled"
  confidence: number
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ApiError {
  statusCode: number
  message: string
  timestamp: string
  path: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    limit: number
    offset: number
  }
}
