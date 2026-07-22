"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PaymentStatusBadge } from "@/components/payments/PaymentStatusBadge"
import { AuditTimeline } from "@/components/payments/AuditTimeline"
import { formatCurrency, formatDate, maskAccount } from "@/lib/utils"
import type { Payment } from "@/types"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function PaymentDetailPage() {
  const params = useParams()
  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.get<Payment>(`/payments/${params.id}`)
        setPayment(data)
      } catch { /* ignore */ }
      setLoading(false)
    }
    load()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Payment not found</p>
        <Link href="/payments">
          <Button variant="outline" className="mt-4">Back to Payments</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        href="/payments"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Payments
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payment Details</CardTitle>
              <PaymentStatusBadge status={payment.status} />
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {formatCurrency(payment.amount)}
                  </p>
                  <p className="text-xs text-gray-400">{payment.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">{payment.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Recipient</p>
                  <p className="mt-1 font-medium text-gray-900">{payment.recipientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bank Account</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {payment.recipientBankName ?? "Unknown Bank"}
                  </p>
                  <p className="text-sm text-gray-500">{maskAccount(payment.recipientAccount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="mt-1 text-gray-900">{formatDate(payment.createdAt)}</p>
                </div>
                {payment.monnifyRef && (
                  <div>
                    <p className="text-sm text-gray-500">Monnify Reference</p>
                    <p className="mt-1 font-mono text-sm text-gray-900">{payment.monnifyRef}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              {payment.auditLogs && payment.auditLogs.length > 0 ? (
                <AuditTimeline logs={payment.auditLogs} />
              ) : (
                <p className="text-sm text-gray-400">No audit logs available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {payment.approval && (
            <Card>
              <CardHeader>
                <CardTitle>Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge
                      variant={
                        payment.approval.status === "APPROVED" ? "success" :
                        payment.approval.status === "REJECTED" ? "danger" :
                        "warning"
                      }
                    >
                      {payment.approval.status}
                    </Badge>
                  </div>
                  {payment.approval.approver && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Approver</span>
                      <span className="text-sm font-medium text-gray-900">
                        {payment.approval.approver.name}
                      </span>
                    </div>
                  )}
                  {payment.approval.reason && (
                    <div>
                      <span className="text-sm text-gray-500">Reason</span>
                      <p className="mt-1 text-sm text-gray-900">{payment.approval.reason}</p>
                    </div>
                  )}
                  {payment.approval.respondedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Responded</span>
                      <span className="text-sm text-gray-900">
                        {formatDate(payment.approval.respondedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium text-gray-900">{formatCurrency(payment.amount)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status</span>
                  <PaymentStatusBadge status={payment.status} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Recipient</span>
                  <span className="font-medium text-gray-900">{payment.recipientName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
