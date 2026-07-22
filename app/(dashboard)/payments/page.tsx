"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { PaymentStatusBadge } from "@/components/payments/PaymentStatusBadge"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Payment } from "@/types"
import { CreditCard, Loader2, Search, ArrowRight } from "lucide-react"

export default function PaymentsListPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ limit: "50", offset: "0" })
        if (statusFilter) params.set("status", statusFilter)
        const res = await api.get<{ data: Payment[]; meta: { total: number } }>(
          `/payments?${params}`
        )
        setPayments(res.data)
      } catch { /* ignore */ }
      setLoading(false)
    }
    load()
  }, [statusFilter])

  const filtered = payments.filter((p) =>
    search
      ? p.recipientName.toLowerCase().includes(search.toLowerCase()) ||
        p.purpose.toLowerCase().includes(search.toLowerCase()) ||
        p.amount.toString().includes(search)
      : true
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500">View and manage all your payments</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search payments..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["", "PENDING_APPROVAL", "EXECUTED", "REJECTED", "FAILED"].map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(s)}
              >
                {s || "All"}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-gray-400">
              <CreditCard className="mb-3 h-12 w-12" />
              <p>No payments found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((payment) => (
                <Link
                  key={payment.id}
                  href={`/payments/${payment.id}`}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                      <CreditCard className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {formatCurrency(payment.amount)} — {payment.recipientName}
                      </p>
                      <p className="text-sm text-gray-500">{payment.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{formatDate(payment.createdAt)}</span>
                    <PaymentStatusBadge status={payment.status} />
                    <ArrowRight className="h-4 w-4 text-gray-300" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
