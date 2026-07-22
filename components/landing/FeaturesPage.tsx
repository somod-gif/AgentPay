"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Shield,
  Bot,
  CheckCircle2,
  Users,
  BarChart3,
  Globe,
  Wallet,
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
  Sliders,
  Network,
  FileText,
  Bell,
  Smartphone,
} from "lucide-react"

const features = [
  {
    category: "Conversational Payments",
    items: [
      {
        icon: MessageSquare,
        title: "Natural Language Interface",
        desc: "Pay suppliers, collect from customers, and schedule payments using everyday language. AgentPay extracts intent, amount, recipient, and purpose automatically.",
      },
      {
        icon: Bot,
        title: "AI Intent Parsing",
        desc: "Our AI understands unstructured text like 'Pay Acme Supplies ₦250,000 for delivery to GTB 0123456789' and converts it to structured payment data.",
      },
      {
        icon: Zap,
        title: "Real-Time Streaming",
        desc: "AI responses stream in real-time via Server-Sent Events. See AgentPay think through each step — verifying, checking policies, executing.",
      },
    ],
  },
  {
    category: "Policy Engine & Approvals",
    items: [
      {
        icon: Sliders,
        title: "Configurable Auto-Approval",
        desc: "Set auto-approval thresholds per organization. Payments below the limit execute automatically. Above the limit route to designated approvers.",
      },
      {
        icon: Shield,
        title: "Category Restrictions",
        desc: "Block payments to prohibited categories or keywords. Enforce spending policies automatically before any money moves.",
      },
      {
        icon: Users,
        title: "Approval Routing",
        desc: "Payment requests route to the initiator's manager automatically. One-click approve or reject with optional reason.",
      },
      {
        icon: Clock,
        title: "Smart Escalation",
        desc: "Approval requests expire after 24 hours. Escalate to admin if no response. Never let a payment get stuck waiting.",
      },
    ],
  },
  {
    category: "Payment Infrastructure",
    items: [
      {
        icon: CheckCircle2,
        title: "Account Verification",
        desc: "Every recipient account verified via Monnify Account Name Enquiry before any disbursement. Eliminate misdirected transfers.",
      },
      {
        icon: Wallet,
        title: "Monnify-Native",
        desc: "Built on Monnify's infrastructure — disbursements, reserved accounts, transaction splitting, sub-wallets. Full Nigerian payment coverage.",
      },
      {
        icon: Lock,
        title: "Secure Execution",
        desc: "Idempotent disbursement references prevent double-payment. Auto-retry with exponential backoff for transient failures.",
      },
    ],
  },
  {
    category: "Audit & Compliance",
    items: [
      {
        icon: BarChart3,
        title: "Immutable Audit Trail",
        desc: "Every action logged with timestamp, user, action type, and metadata. No delete or modify operations on audit records.",
      },
      {
        icon: FileText,
        title: "Payment Timeline",
        desc: "Complete chronological history per payment — from intent received through account verification, policy check, approval, and execution.",
      },
      {
        icon: Network,
        title: "Role-Based Access",
        desc: "Granular permissions: ADMIN (full access), MANAGER (approve + view team), STAFF (initiate + view own). Enforced at every level.",
      },
    ],
  },
  {
    category: "Multi-Channel Access",
    items: [
      {
        icon: Globe,
        title: "Web Dashboard",
        desc: "Full-featured web dashboard for payment initiation, tracking, approvals, and reporting. Optimized for desktop and mobile.",
      },
      {
        icon: MessageSquare,
        title: "WhatsApp Integration",
        desc: "Initiate and approve payments directly from WhatsApp. Perfect for founders and field teams who live on WhatsApp.",
      },
      {
        icon: Smartphone,
        title: "Telegram Bot",
        desc: "Telegram bot for conversational payments with inline keyboard approvals. Multi-channel, unified experience.",
      },
    ],
  },
  {
    category: "Notifications",
    items: [
      {
        icon: Bell,
        title: "Real-Time Alerts",
        desc: "Get instant notifications when payments are initiated, approved, executed, or rejected. Via in-app, email, WhatsApp, and Telegram.",
      },
      {
        icon: Sparkles,
        title: "Payment Receipts",
        desc: "Automated payment receipts with Monnify transaction reference. Shareable and downloadable for your records.",
      },
    ],
  },
]

export function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AgentPay</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/features" className="text-sm font-medium text-indigo-600">Features</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="primary" className="mb-4">Features</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Everything you need to run your finances
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                From conversational payments to immutable audit trails — AgentPay gives you complete control over your business finances.
              </p>
            </div>

            {features.map((group) => (
              <div key={group.category} className="mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">{group.category}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((feature) => (
                    <div key={feature.title} className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                        <feature.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h3 className="mt-4 font-semibold text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-indigo-600 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to get started?</h2>
            <p className="mt-4 text-lg text-indigo-100">Start your free trial today. No credit card required.</p>
            <div className="mt-8">
              <Link href="/register">
                <Button size="xl" variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-400 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} AgentPay. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
