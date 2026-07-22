"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Shield,
  MessageSquare,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Bot,
  CheckCircle2,
  Clock,
  Users,
  Globe,
  Wallet,
  ArrowUpRight,
} from "lucide-react"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AgentPay</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              How It Works
            </a>
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />
          <div className="absolute top-0 right-0 -mr-80 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-80 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-sm">
                AI-Powered Financial Operating System
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Tell AgentPay what you need.
                <br />
                <span className="text-indigo-600">It understands, validates, approves, and pays.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                The AI-powered platform that lets businesses execute payments, manage approvals, and verify transactions using natural language. No more banking apps, OTPs, or spreadsheets.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <Button size="xl" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> No setup fees
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> Powered by Monnify
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> NDPR Compliant
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-gray-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "25min → 45sec", label: "Payment Execution Time" },
                { value: "8% → <1%", label: "Payment Error Rate" },
                { value: "4hrs → 10min", label: "Approval Response" },
                { value: "99.9%", label: "Platform Uptime" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="warning" className="mb-4">The Problem</Badge>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                AI can analyze, suggest, and recommend. But it can&apos;t move money.
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Businesses are stuck copying account numbers, opening banking apps, waiting for OTPs, chasing approvals, and reconciling receipts across spreadsheets. That&apos;s 5-10 hours a week of founder time wasted.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: "Manual & Slow",
                  desc: "Enter recipient details, verify bank names, wait for OTPs, navigate multiple banking apps for every single payment.",
                },
                {
                  icon: Users,
                  title: "Fragmented Approvals",
                  desc: "Payment requests scattered across WhatsApp, email, and phone calls. No structured approval workflow or audit trail.",
                },
                {
                  icon: BarChart3,
                  title: "No Visibility",
                  desc: "No real-time view of who paid what, when it was approved, or where money is going. Month-end reconciliation is a nightmare.",
                },
                {
                  icon: Shield,
                  title: "Trust & Control Gap",
                  desc: "Existing tools force a binary choice: fully manual (slow) or fully automated (risky). No middle ground with human oversight.",
                },
                {
                  icon: Globe,
                  title: "African Context Ignored",
                  desc: "Payment verification, approval hierarchies, and audit trails are necessities in Nigeria's high-trust business environment.",
                },
                {
                  icon: Zap,
                  title: "AI Can't Execute",
                  desc: "AI can draft emails and analyze reports, but hits a hard boundary when money needs to move. The gap between understanding and action costs businesses real time.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
                    <item.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-gray-50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="primary" className="mb-4">How It Works</Badge>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Three steps to move money with AI
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                From natural language to executed payment in under a minute.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Say What You Need",
                  desc: '"Pay Acme Supplies ₦250,000 for delivery to GTB 0123456789"',
                  color: "bg-indigo-600",
                  gradient: "from-indigo-50 to-white",
                },
                {
                  step: "02",
                  title: "AI Parses & Validates",
                  desc: "AgentPay extracts intent, verifies the account via Monnify, and checks your business policies — all automatically.",
                  color: "bg-indigo-500",
                  gradient: "from-indigo-50 to-white",
                },
                {
                  step: "03",
                  title: "Approved & Executed",
                  desc: "Auto-approved if under threshold, or routed to your manager for one-click approval. Payment executes within seconds.",
                  color: "bg-indigo-400",
                  gradient: "from-indigo-50 to-white",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="rounded-xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-lg">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.color} text-white text-lg font-bold`}>
                      {item.step}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-gray-600">{item.desc}</p>
                  </div>
                  {item.step !== "03" && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform translate-y-1/2">
                      <ChevronRight className="h-6 w-6 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="primary" className="mb-4">Features</Badge>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Everything you need to run your finances
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Built on Monnify&apos;s secure payment infrastructure, designed for African businesses.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: MessageSquare,
                  title: "Conversational Payments",
                  desc: "Pay suppliers, collect from customers, and schedule payments using natural language. No forms, no clicks.",
                },
                {
                  icon: Shield,
                  title: "Policy-Driven Control",
                  desc: "Set auto-approval limits, category restrictions, and approval routing. Automate routine payments, control large ones.",
                },
                {
                  icon: Bot,
                  title: "AI-Powered Parsing",
                  desc: "Our AI extracts payment intent from unstructured text — amount, recipient, bank, account number, and purpose.",
                },
                {
                  icon: CheckCircle2,
                  title: "Account Verification",
                  desc: "Every recipient account is verified via Monnify before disbursement. No more misdirected transfers.",
                },
                {
                  icon: Users,
                  title: "Approval Workflows",
                  desc: "Route payment requests to designated approvers. One-click approve or reject with reason. Escalation after 24h.",
                },
                {
                  icon: BarChart3,
                  title: "Complete Audit Trail",
                  desc: "Every action logged immutably. Full visibility into who initiated, approved, and executed each payment.",
                },
                {
                  icon: Globe,
                  title: "Multi-Channel Access",
                  desc: "Web dashboard, WhatsApp, and Telegram. Start on one channel, approve on another.",
                },
                {
                  icon: Wallet,
                  title: "Monnify-Native",
                  desc: "Leverage Monnify's disbursement, account verification, reserved accounts, and transaction splitting APIs.",
                },
                {
                  icon: Clock,
                  title: "Real-Time Notifications",
                  desc: "Instant payment confirmations, approval requests, and status updates via in-app, email, WhatsApp, and Telegram.",
                },
              ].map((feature) => (
                <div key={feature.title} className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Preview / Demo Section */}
        <section className="bg-gray-50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="primary" className="mb-4">WhatsApp Experience</Badge>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Pay from WhatsApp. No app download needed.
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Tolu types &ldquo;Pay Acme Supplies 250000&rdquo; on WhatsApp. AgentPay handles the rest &mdash; verify, approve, execute.
              </p>
            </div>
            <div className="mt-12 mx-auto max-w-md">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm shadow-sm max-w-[85%]">
                        Pay Acme Supplies 250000 to GTB 0123456789
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-sm bg-indigo-50 px-4 py-2.5 text-sm text-gray-700 max-w-[85%]">
                        <p className="font-medium text-indigo-700">🔍 Verifying account...</p>
                        <p className="mt-1">✅ Acme Supplies Limited (GTBank)</p>
                        <p className="mt-1">Amount: ₦250,000</p>
                        <p className="text-yellow-700">⏳ Requires manager approval</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-sm bg-green-50 px-4 py-2.5 text-sm text-gray-700 max-w-[85%]">
                        <p className="font-medium text-green-700">✅ Payment Executed!</p>
                        <p className="mt-1">Ref: MNFY|20260722...</p>
                        <p className="mt-1">₦250,000 → Acme Supplies Limited</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personas Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Built for every role in your business
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Whether you&apos;re a founder, CFO, or field manager &mdash; AgentPay adapts to how you work.
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Tolu",
                  role: "Founder, 15-person logistics company",
                  pain: "Spends Friday evenings paying 6-8 suppliers manually. Often makes errors copying account numbers.",
                  goal: "Automate routine payments, maintain control for large expenses.",
                  icon: Users,
                },
                {
                  name: "Chinedu",
                  role: "CFO, 50-person manufacturing firm",
                  pain: "Team sends payment requests via scattered WhatsApp. Hard to enforce spending policies.",
                  goal: "Enforce spending limits, receive structured approval requests, generate audit reports.",
                  icon: Shield,
                },
                {
                  name: "Amina",
                  role: "Operations Manager, agro-trading",
                  pain: "Frequently on the road. Needs to pay logistics partners quickly without laptop access.",
                  goal: "Initiate and track payments from mobile. Instant confirmations.",
                  icon: MessageSquare,
                },
              ].map((persona) => (
                <div key={persona.name} className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <persona.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{persona.name}</h3>
                      <p className="text-sm text-gray-500">{persona.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium text-red-600">Pain:</span> {persona.pain}</p>
                    <p><span className="font-medium text-green-600">Goal:</span> {persona.goal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-600 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to transform how your business moves money?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Join businesses using AgentPay to execute payments in seconds, not hours. Start free, no credit card required.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="xl" variant="secondary" className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-indigo-50">
                  Start Free Trial
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="xl" variant="ghost" className="w-full sm:w-auto text-white hover:text-white hover:bg-indigo-500">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                  <Wallet className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">AgentPay</span>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                AI-powered financial operating system for African businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><Link href="/features" className="hover:text-indigo-600">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-indigo-600">Pricing</Link></li>
                <li><a href="#how-it-works" className="hover:text-indigo-600">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><span className="hover:text-indigo-600 cursor-default">About</span></li>
                <li><span className="hover:text-indigo-600 cursor-default">Blog</span></li>
                <li><span className="hover:text-indigo-600 cursor-default">Contact</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><span className="hover:text-indigo-600 cursor-default">Privacy Policy</span></li>
                <li><span className="hover:text-indigo-600 cursor-default">Terms of Service</span></li>
                <li><span className="hover:text-indigo-600 cursor-default">NDPR Compliance</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AgentPay. All rights reserved. Powered by Monnify.
          </div>
        </div>
      </footer>
    </div>
  )
}
