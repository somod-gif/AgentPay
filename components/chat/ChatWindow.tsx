"use client"

import { useState, useRef, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import type { ChatMessage, Payment } from "@/types"
import { Send, Bot, User, Loader2, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react"

const suggestions = [
  "Pay Acme Supplies 250000 for delivery to GTB 0123456789",
  "Show my recent payments",
  "Check payment status",
]

function getStatusIcon(status: string) {
  switch (status) {
    case "PENDING_APPROVAL": return <Clock className="h-4 w-4 text-blue-500" />
    case "EXECUTED": return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "REJECTED": return <XCircle className="h-4 w-4 text-red-500" />
    case "FAILED": return <AlertCircle className="h-4 w-4 text-red-500" />
    default: return <Loader2 className="h-4 w-4 text-gray-400" />
  }
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI payment assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [loadingRecent, setLoadingRecent] = useState(false)
  const [recentPayments, setRecentPayments] = useState<Payment[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const loadRecentPayments = async () => {
    setLoadingRecent(true)
    try {
      const res = await api.get<{ data: Payment[]; meta: { total: number } }>("/payments?limit=5")
      setRecentPayments(res.data)
    } catch { /* ignore */ }
    setLoadingRecent(false)
  }

  useEffect(() => { loadRecentPayments() }, [])

  const sendMessage = async (content: string) => {
    if (!content.trim() || streaming) return

    setMessages((prev) => [...prev, { role: "user", content }])
    setInput("")
    setStreaming(true)

    const assistantMessage: ChatMessage = { role: "assistant", content: "" }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      await api.streamChat(
        "/ai/chat",
        { message: content, history: messages.slice(-10) },
        (text) => {
          setMessages((prev) => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            updated[updated.length - 1] = { ...last, content: last.content + text }
            return updated
          })
        },
        () => {
          setStreaming(false)
          loadRecentPayments()
        }
      )
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
      setStreaming(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex h-full gap-6">
      {/* Chat Area */}
      <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Bot className="h-5 w-5 text-indigo-600" />
            AI Assistant
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Bot className="h-4 w-4 text-indigo-600" />
                </div>
              )}
              <div className={`max-w-[75%] ${msg.role === "user" ? "order-1" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  {msg.content || (streaming && i === messages.length - 1 ? (
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
                    </span>
                  ) : null)}
                </div>
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-6 pb-3">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                >
                  {s.length > 40 ? s.slice(0, 40) + "..." : s}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="border-t border-gray-100 p-4">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={streaming}
            />
            <Button type="submit" size="icon" disabled={streaming || !input.trim()}>
              {streaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Recent Payments Sidebar */}
      <div className="hidden w-80 shrink-0 lg:block">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="font-semibold text-gray-900">Recent Payments</h3>
          </div>
          <div className="p-4 space-y-3">
            {loadingRecent ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            ) : recentPayments.length === 0 ? (
              <p className="text-center py-8 text-sm text-gray-400">No payments yet</p>
            ) : (
              recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm">{formatCurrency(payment.amount)}</p>
                    {getStatusIcon(payment.status)}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 truncate">{payment.recipientName}</p>
                  <p className="text-xs text-gray-400">{payment.purpose}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
