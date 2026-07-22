"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Approval } from "@/types"
import { Loader2, CheckCircle2, XCircle, User, Clock, Wallet } from "lucide-react"

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectDialog, setRejectDialog] = useState<{ id: string } | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const loadApprovals = async () => {
    setLoading(true)
    try {
      const res = await api.get<{ data: Approval[] }>("/approvals/pending")
      setApprovals(res.data)
    } catch { /* ignore */ }
    setLoading(false)
  }

  useEffect(() => { loadApprovals() }, [])

  const handleApprove = async (id: string) => {
    setActionLoading(id)
    try {
      await api.post(`/approvals/${id}/approve`)
      setApprovals((prev) => prev.filter((a) => a.id !== id))
    } catch { /* ignore */ }
    setActionLoading(null)
  }

  const handleReject = async () => {
    if (!rejectDialog) return
    setActionLoading(rejectDialog.id)
    try {
      await api.post(`/approvals/${rejectDialog.id}/reject`, {
        reason: rejectReason,
      })
      setApprovals((prev) => prev.filter((a) => a.id !== rejectDialog.id))
      setRejectDialog(null)
      setRejectReason("")
    } catch { /* ignore */ }
    setActionLoading(null)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Approvals</h1>
        <p className="text-gray-500">Review and respond to payment approval requests</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : approvals.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-gray-400">
          <CheckCircle2 className="mb-3 h-12 w-12 text-green-400" />
          <p className="text-lg font-medium text-gray-600">All caught up!</p>
          <p className="text-sm">No pending approvals</p>
        </div>
      ) : (
        <div className="space-y-4">
          {approvals.map((approval) => {
            const p = approval.payment
            if (!p) return null

            return (
              <Card key={approval.id} className="border-l-4 border-l-amber-400">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
                          <Wallet className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {formatCurrency(p.amount)}
                          </p>
                          <p className="text-sm text-gray-500">to {p.recipientName}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{p.purpose}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          Requested by {approval.requester?.name ?? "Unknown"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDate(approval.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 sm:flex-col">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto"
                        onClick={() => handleApprove(approval.id)}
                        disabled={actionLoading === approval.id}
                      >
                        {actionLoading === approval.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                        )}
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                        onClick={() => setRejectDialog({ id: approval.id })}
                        disabled={actionLoading === approval.id}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <Dialog open={!!rejectDialog} onOpenChange={(open) => !open && setRejectDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this payment request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              placeholder="e.g., Budget exceeded for this month"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason || actionLoading === rejectDialog?.id}
            >
              {actionLoading === rejectDialog?.id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Reject Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
