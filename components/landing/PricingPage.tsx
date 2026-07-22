"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Wallet } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small businesses just getting started with automated payments.",
    features: [
      "Up to 50 transactions/month",
      "Web dashboard access",
      "AI chat payment initiation",
      "Basic policy engine",
      "Standard audit trail",
      "Email notifications",
      "Community support",
    ],
    cta: "Start Free",
    href: "/register",
    popular: false,
  },
  {
    name: "Business",
    price: "₦49,999",
    period: "/month",
    description: "For growing businesses that need advanced controls and multi-channel access.",
    features: [
      "Up to 500 transactions/month",
      "Everything in Starter",
      "WhatsApp & Telegram integration",
      "Advanced policy rules",
      "Approval workflows",
      "Multi-channel notifications",
      "Priority support",
      "Export audit logs (CSV)",
    ],
    cta: "Start 14-Day Trial",
    href: "/register",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with high volume, custom needs, and dedicated support.",
    features: [
      "Unlimited transactions",
      "Everything in Business",
      "Reserved accounts",
      "Transaction splitting",
      "Sub-wallets",
      "Recurring payments",
      "ERP integrations (QuickBooks, Xero)",
      "Dedicated account manager",
      "99.9% SLA guarantee",
      "Custom contract & pricing",
    ],
    cta: "Contact Sales",
    href: "/register",
    popular: false,
  },
]

const faqs = [
  { q: "Is there a setup fee?", a: "No. AgentPay has no setup fees. You only pay for the plan that fits your needs." },
  { q: "What payment methods do you support?", a: "AgentPay uses Monnify infrastructure. We support bank transfers, USSD, and card payments." },
  { q: "Can I cancel anytime?", a: "Yes. All plans are month-to-month. Cancel anytime with no penalties." },
  { q: "What about transaction fees?", a: "Monnify's standard transaction fees apply to all disbursements. These are separate from AgentPay's platform fee." },
]

export function PricingPage() {
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
            <Link href="/features" className="text-sm font-medium text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/pricing" className="text-sm font-medium text-indigo-600">Pricing</Link>
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
              <Badge variant="primary" className="mb-4">Pricing</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Simple, transparent pricing
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Start free. Upgrade as you grow. No hidden fees, no surprises.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-8 ${
                    plan.popular
                      ? "border-indigo-200 bg-indigo-50 shadow-lg shadow-indigo-100"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="primary" className="px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="text-gray-500">{plan.period}</span>}
                    </div>
                  </div>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href={plan.href}>
                      <Button
                        variant={plan.popular ? "default" : "outline"}
                        size="lg"
                        className="w-full"
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-12 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="mt-2 text-gray-600">{faq.a}</p>
                </div>
              ))}
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
