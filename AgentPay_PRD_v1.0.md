# AgentPay — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** July 22, 2026  
**Status:** Draft — Core MVP  
**Author:** Product Team  
**Classification:** Internal — Confidential

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [Target Audience & Personas](#4-target-audience--personas)
5. [Product Goals & Success Metrics](#5-product-goals--success-metrics)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [System Architecture](#8-system-architecture)
9. [Data Model](#9-data-model)
10. [API Specification](#10-api-specification)
11. [User Flows & Journeys](#11-user-flows--journeys)
12. [Security & Compliance](#12-security--compliance)
13. [Integration Requirements](#13-integration-requirements)
14. [Roadmap & Milestones](#14-roadmap--milestones)
15. [Risks & Mitigation](#15-risks--mitigation)
16. [Appendix](#16-appendix)

---

## 1. Executive Summary

AgentPay is an AI-powered Financial Operating System that enables businesses to execute payments, manage approvals, and verify transactions using natural language. By combining autonomous AI agents with Monnify's payment infrastructure, AgentPay transforms AI from a passive advisor into an action-oriented financial operator — allowing business owners to pay suppliers, collect from customers, and manage cash flow through conversational interfaces (Web, WhatsApp, Telegram) while maintaining complete control via policy enforcement and human-in-the-loop approvals.

**Key Value Proposition:**
> *"Tell AgentPay what you need. It understands, validates, approves, and pays — while you focus on growing your business."*

---

## 2. Problem Statement

### 2.1 The Gap Between AI Understanding and Action
Artificial intelligence has transformed how businesses operate. AI can draft emails, analyze financial reports, generate invoices, and provide strategic recommendations. However, the moment a business needs to move money — pay a supplier, collect from a customer, schedule a recurring expense — AI hits a hard boundary. It can suggest what to do, but it cannot execute the transaction. The human operator is left manually copying account numbers, opening banking apps, waiting for OTPs, chasing managers for approvals, and reconciling receipts across spreadsheets.

### 2.2 The Manual Payment Burden
For small and medium businesses across Africa, payment operations consume 5–10 hours per week of founder and finance team time. This includes:
- Manually entering recipient account details
- Verifying bank names to prevent misdirected transfers
- Requesting approvals through fragmented channels (WhatsApp, email, phone calls)
- Waiting for OTPs and navigating multiple banking apps
- Screenshotting receipts and updating accounting records
- Reconciling payments against invoices at month-end

### 2.3 The Trust & Control Problem
Business owners are rightfully hesitant to automate financial transactions. Any payment system must balance autonomy with control: automating routine payments while ensuring large or unusual transactions receive human oversight. Existing tools force a binary choice — either fully manual (slow, error-prone) or fully automated (risky, opaque).

### 2.4 The African Context
In Nigeria and across Africa, businesses operate in a high-trust, relationship-driven environment where payment verification, approval hierarchies, and audit trails are not luxuries — they are necessities. The lack of integrated payment infrastructure that respects these workflows creates a persistent operational drag on business growth.

---

## 3. Solution Overview

AgentPay bridges the gap between conversational AI and real money movement. It is built on three pillars:

### 3.1 Conversational Payment Orchestration
Users interact with AgentPay through natural language across multiple channels (Web dashboard, WhatsApp, Telegram). A user can say:
- *"Pay Acme Supplies ₦250,000 for last month's delivery"*
- *"Schedule rent payment of ₦500,000 for the 1st of every month"*
- *"Collect ₦150,000 from Customer XYZ for Invoice #1024"*

The AI parses intent, extracts entities (amount, recipient, purpose), and initiates the appropriate financial workflow.

### 3.2 Policy-Driven Automation with Human Oversight
AgentPay enforces configurable business rules before executing any transaction:
- **Auto-approval limits:** Payments below a threshold execute automatically
- **Approval routing:** Payments above the threshold route to designated approvers
- **Category restrictions:** Block payments to prohibited categories
- **Recipient verification:** Verify bank account details via Monnify before disbursement

Humans remain in control. The AI handles the mechanical work; humans make the judgment calls.

### 3.3 Complete Audit & Transparency
Every action — from intent parsing to policy checking to payment execution — is logged in an immutable audit trail. Business owners and finance teams have complete visibility into who initiated what, when it was approved, and how money moved.

### 3.4 Monnify-Native Architecture
AgentPay is built on Monnify's payment infrastructure, leveraging:
- **Account Verification** (BVN, Account Name Enquiry)
- **Disbursements** (Single and bulk payouts)
- **Reserved Accounts** (Dedicated collection accounts)
- **Transaction Splitting** (Auto-distribute payments to multiple stakeholders)
- **Sub-Wallets** (Segregated balances for different purposes)
- **Recurring Payments** (Scheduled collections and disbursements)

---

## 4. Target Audience & Personas

### 4.1 Primary Persona: The Overloaded Founder (Tolu)
- **Demographics:** 32, founder of a 15-person logistics company in Lagos
- **Pain Points:** Spends Friday evenings paying 6–8 suppliers manually. Often makes errors copying account numbers. Has no visibility into who on her team is paying what.
- **Goals:** Automate routine payments, maintain approval control for large expenses, reduce time spent on banking apps to near zero.
- **Tech Comfort:** Uses WhatsApp constantly. Comfortable with web apps. Prefers typing to clicking through forms.

### 4.2 Secondary Persona: The Control-Oriented CFO (Chinedu)
- **Demographics:** 45, CFO at a 50-person manufacturing firm
- **Pain Points:** Team members send payment requests via scattered WhatsApp messages. Hard to enforce spending policies. Month-end reconciliation is a nightmare.
- **Goals:** Enforce spending limits by department. Receive structured approval requests with full context. Generate audit reports instantly.
- **Tech Comfort:** Uses Excel extensively. Wants dashboards and reports, not chatbots.

### 4.3 Tertiary Persona: The Field Operations Manager (Amina)
- **Demographics:** 29, operations manager at an agro-trading company
- **Pain Points:** Frequently on the road. Needs to pay logistics partners and field agents quickly. Often doesn't have laptop access.
- **Goals:** Initiate and track payments from mobile. Receive instant confirmation that payments went through.
- **Tech Comfort:** Heavy WhatsApp and Telegram user. Rarely uses desktop web.

### 4.4 Market Segments
1. **SMBs (5–50 employees):** Logistics, agriculture, manufacturing, retail
2. **Freelancer Collectives:** Design agencies, consulting firms
3. **Property Management:** Rent collection and vendor payments
4. **Schools & Hospitals:** Fee collection and supplier payments

---

## 5. Product Goals & Success Metrics

### 5.1 Product Goals (6-Month Horizon)

| Goal | Description | Priority |
|------|-------------|----------|
| PG-1 | Enable end-to-end payment execution via natural language | P0 |
| PG-2 | Achieve 99.9% uptime for core payment orchestration | P0 |
| PG-3 | Support multi-channel access (Web, WhatsApp, Telegram) | P1 |
| PG-4 | Process ₦100M in transaction volume within 6 months | P1 |
| PG-5 | Achieve <2% transaction failure rate | P1 |
| PG-6 | Expand to transaction splitting and sub-wallets | P2 |

### 5.2 Success Metrics (KPIs)

| Metric | Baseline | 3-Month Target | 6-Month Target |
|--------|----------|----------------|----------------|
| Time to execute payment | 25 min (manual) | 3 min | 45 sec |
| Payment error rate | 8% (manual) | 2% | <1% |
| Approval response time | 4 hours (WhatsApp/email) | 30 min | 10 min |
| Monthly Active Businesses | 0 | 50 | 200 |
| Transaction Volume (NGN) | 0 | ₦20M | ₦100M |
| User Retention (30-day) | N/A | 60% | 75% |
| Customer Support Tickets | N/A | <5% of transactions | <2% |

---

## 6. Functional Requirements

### 6.1 User Management & Authentication

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AUTH-01 | Users register with email, name, password, and role (ADMIN, MANAGER, STAFF) | P0 |
| FR-AUTH-02 | Users authenticate via JWT tokens (7-day expiry, refreshable) | P0 |
| FR-AUTH-03 | Role-based access control (RBAC) with guards on all endpoints | P0 |
| FR-AUTH-04 | Manager-subordinate relationships: each STAFF has a MANAGER for approval routing | P0 |
| FR-AUTH-05 | Users can link WhatsApp and Telegram accounts to their profile | P1 |
| FR-AUTH-06 | Passwords hashed with bcrypt (cost factor 12) | P0 |

### 6.2 AI Agent & Natural Language Processing

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AI-01 | Parse natural language payment intents into structured data (action, amount, recipient, purpose, urgency) | P0 |
| FR-AI-02 | Support three actions: PAY, COLLECT, SCHEDULE | P0 |
| FR-AI-03 | Extract bank account details from unstructured text (e.g., "Send to GTB 0123456789") | P1 |
| FR-AI-04 | Generate human-readable responses explaining payment status, policy blocks, and next steps | P0 |
| FR-AI-05 | Maintain conversation context across multi-turn interactions | P1 |
| FR-AI-06 | Stream AI responses via Server-Sent Events (SSE) for real-time chat feel | P1 |
| FR-AI-07 | Fallback to human support handoff when intent confidence is below 70% | P2 |

### 6.3 Payment Orchestration

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PAY-01 | Create payment record from parsed AI intent | P0 |
| FR-PAY-02 | Verify recipient bank account via Monnify Account Name Enquiry before execution | P0 |
| FR-PAY-03 | Support single disbursement via Monnify Disbursement API | P0 |
| FR-PAY-04 | Support reserved accounts for holding pending-approval funds | P1 |
| FR-PAY-05 | Support transaction splitting (distribute payment to multiple recipients) | P2 |
| FR-PAY-06 | Support recurring/scheduled payments | P2 |
| FR-PAY-07 | Track payment status lifecycle: PENDING_VERIFICATION → PENDING_APPROVAL → APPROVED → EXECUTED/FAILED | P0 |
| FR-PAY-08 | Auto-retry failed payments up to 3 times with exponential backoff | P1 |
| FR-PAY-09 | Generate payment receipts with Monnify transaction reference | P0 |

### 6.4 Policy Engine & Approvals

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-POL-01 | Configurable auto-approval threshold per organization (default ₦100,000) | P0 |
| FR-POL-02 | Approval required for payments exceeding threshold | P0 |
| FR-POL-03 | Block payments to prohibited categories/keywords | P1 |
| FR-POL-04 | Route approval requests to the initiator's designated manager | P0 |
| FR-POL-05 | Approvers receive notifications via in-app, email, WhatsApp, and Telegram | P0 |
| FR-POL-06 | One-click approve/reject with optional reason for rejection | P0 |
| FR-POL-07 | Approval requests expire after 24 hours if not responded to | P1 |
| FR-POL-08 | Escalation to admin if approver does not respond within 24 hours | P2 |

### 6.5 Audit & Reporting

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AUD-01 | Log every action with timestamp, user, action type, and metadata | P0 |
| FR-AUD-02 | Provide chronological audit trail per payment | P0 |
| FR-AUD-03 | Provide user activity dashboard | P1 |
| FR-AUD-04 | Export audit logs as CSV/PDF | P2 |
| FR-AUD-05 | Immutable audit records (no delete or modify operations) | P0 |

### 6.6 Multi-Channel Interface

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-UI-01 | Web dashboard for payment initiation, tracking, and management | P0 |
| FR-UI-02 | WhatsApp Business API integration for conversational payments | P1 |
| FR-UI-03 | Telegram Bot API integration for conversational payments | P1 |
| FR-UI-04 | Responsive web dashboard optimized for mobile | P0 |
| FR-UI-05 | Real-time notifications for payment status updates | P0 |

### 6.7 Notification System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-NOT-01 | Send payment confirmation to initiator upon execution | P0 |
| FR-NOT-02 | Send approval request to approver with payment context | P0 |
| FR-NOT-03 | Send rejection notification with reason to initiator | P0 |
| FR-NOT-04 | Send low-balance or policy-violation warnings | P2 |

---

## 7. Non-Functional Requirements

### 7.1 Performance

| ID | Requirement |
|----|-------------|
| NFR-PERF-01 | API response time < 200ms for 95th percentile of requests |
| NFR-PERF-02 | AI intent parsing < 3 seconds end-to-end |
| NFR-PERF-03 | Payment execution (approval to disbursement) < 10 seconds |
| NFR-PERF-04 | Support 100 concurrent users at launch, scale to 1,000 by month 6 |
| NFR-PERF-05 | Database queries optimized with proper indexing; N+1 queries eliminated |

### 7.2 Security

| ID | Requirement |
|----|-------------|
| NFR-SEC-01 | All API endpoints protected by JWT authentication |
| NFR-SEC-02 | Role-based access control enforced at controller and service levels |
| NFR-SEC-03 | Monnify API keys and secrets stored in environment variables, never in code |
| NFR-SEC-04 | All sensitive data encrypted at rest (AES-256) |
| NFR-SEC-05 | HTTPS/TLS 1.3 for all communications |
| NFR-SEC-06 | Rate limiting: 100 requests/minute per user, 10 payment intents/minute |
| NFR-SEC-07 | Input validation and sanitization on all endpoints |
| NFR-SEC-08 | IP logging for all audit events |

### 7.3 Reliability

| ID | Requirement |
|----|-------------|
| NFR-REL-01 | 99.9% uptime SLA for core payment APIs |
| NFR-REL-02 | Graceful degradation: if AI service is down, users can still use structured forms |
| NFR-REL-03 | Automatic retry with circuit breaker for Monnify API calls |
| NFR-REL-04 | Database backups every 6 hours, retained for 30 days |

### 7.4 Scalability

| ID | Requirement |
|----|-------------|
| NFR-SCL-01 | Stateless API design to support horizontal scaling |
| NFR-SCL-02 | Database connection pooling (max 20 connections per instance) |
| NFR-SCL-03 | Async processing for non-critical paths (notifications, audit logging) |
| NFR-SCL-04 | Migrate from SQLite to PostgreSQL when exceeding 50 active businesses |

### 7.5 Compliance

| ID | Requirement |
|----|-------------|
| NFR-COMP-01 | PCI-DSS awareness: never store full card numbers or PINs |
| NFR-COMP-02 | NDPR (Nigeria Data Protection Regulation) compliance for user data |
| NFR-COMP-03 | SOC 2 Type II readiness roadmap within 12 months |
| NFR-COMP-04 | Retain audit logs for minimum 7 years |

---

## 8. System Architecture

### 8.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Web App    │  │  WhatsApp   │  │  Telegram   │  │  Email/SMS  │ │
│  │  (React)    │  │  Business   │  │    Bot      │  │             │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────────────┘ │
└─────────┼────────────────┼────────────────┼────────────────────────┘
          │                │                │
          └────────────────┴────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │  (NestJS App)   │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
   │  Auth &     │    │  Payment    │    │   AI Agent  │
   │  User Mgmt  │    │  Engine     │    │   Service   │
   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Core Services │
                    │  ┌───────────┐  │
                    │  │  Policy   │  │
                    │  │  Engine   │  │
                    │  └───────────┘  │
                    │  ┌───────────┐  │
                    │  │  Approval │  │
                    │  │  Workflow │  │
                    │  └───────────┘  │
                    │  ┌───────────┐  │
                    │  │   Audit   │  │
                    │  │   Logger  │  │
                    │  └───────────┘  │
                    │  ┌───────────┐  │
                    │  │ Notification│ │
                    │  │  Service    │  │
                    │  └───────────┘  │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
   │   Monnify   │    │   Gemini    │    │  Database   │
   │   APIs      │    │   (Google)  │    │  (SQLite →  │
   │             │    │             │    │  PostgreSQL) │
   └─────────────┘    └─────────────┘    └─────────────┘
```

### 8.2 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Backend Framework | NestJS (TypeScript) | Enterprise-grade, modular, dependency injection, excellent for complex workflows |
| Database | SQLite (MVP) → PostgreSQL (Production) | Speed of setup for MVP, migration path for scale |
| ORM | Prisma | Type-safe queries, migrations, excellent DX |
| AI/LLM | Google Gemini 1.5 Flash via Vercel AI SDK | Cost-effective, fast, strong structured output (JSON mode), good for African context |
| Payment Gateway | Monnify | Native Nigerian payment infrastructure, comprehensive APIs |
| Authentication | JWT + Passport.js | Stateless, scalable, well-integrated with NestJS |
| Real-Time | Server-Sent Events (SSE) | For streaming AI responses without WebSocket complexity |
| WhatsApp | WhatsApp Business API / Twilio | Direct integration for conversational commerce |
| Telegram | node-telegram-bot-api | Lightweight, fast to implement |
| Validation | class-validator + class-transformer | DTO-first validation aligned with NestJS best practices |
| Containerization | Docker + Docker Compose | Consistent local development, easy deployment |

### 8.3 Module Structure

```
src/
├── main.ts                          # Application bootstrap
├── app.module.ts                    # Root module
├── config/
│   ├── monnify.config.ts            # Monnify credentials & endpoints
│   ├── gemini.config.ts             # AI SDK configuration
│   └── app.config.ts                # General app configuration
├── common/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── decorators/
│   │   ├── roles.decorator.ts
│   │   └── current-user.decorator.ts
│   ├── pipes/
│   │   └── validation.pipe.ts
│   └── filters/
│       └── http-exception.filter.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── dto/
│   │       ├── register.dto.ts
│   │       └── login.dto.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── users.controller.ts
│   │   └── dto/
│   ├── ai-agent/
│   │   ├── ai-agent.module.ts
│   │   ├── ai-agent.service.ts
│   │   ├── ai-agent.controller.ts
│   │   └── schemas/
│   │       └── payment-intent.schema.ts
│   ├── payments/
│   │   ├── payments.module.ts
│   │   ├── payments.service.ts
│   │   ├── payments.controller.ts
│   │   ├── monnify.service.ts
│   │   └── dto/
│   ├── policy/
│   │   ├── policy.module.ts
│   │   └── policy.service.ts
│   ├── approvals/
│   │   ├── approvals.module.ts
│   │   ├── approvals.service.ts
│   │   ├── approvals.controller.ts
│   │   └── dto/
│   ├── audit/
│   │   ├── audit.module.ts
│   │   ├── audit.service.ts
│   │   └── audit.controller.ts
│   ├── notifications/
│   │   ├── notifications.module.ts
│   │   ├── notifications.service.ts
│   │   └── channels/
│   │       ├── email.channel.ts
│   │       ├── whatsapp.channel.ts
│   │       └── telegram.channel.ts
│   ├── whatsapp/
│   │   ├── whatsapp.module.ts
│   │   ├── whatsapp.service.ts
│   │   └── whatsapp.controller.ts
│   └── telegram/
│       ├── telegram.module.ts
│       ├── telegram.service.ts
│       └── telegram.controller.ts
├── shared/
│   ├── interfaces/
│   │   ├── payment-intent.interface.ts
│   │   ├── policy-result.interface.ts
│   │   └── audit-action.interface.ts
│   ├── enums/
│   │   ├── user-role.enum.ts
│   │   ├── payment-status.enum.ts
│   │   └── approval-status.enum.ts
│   └── utils/
│       ├── generate-reference.util.ts
│       └── mask-account.util.ts
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

---

## 9. Data Model

### 9.1 Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │   Payment   │       │  Approval   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────│ userId (FK) │       │ id (PK)     │
│ email       │       │ amount      │◄──────│ paymentId   │
│ name        │       │ currency    │       │ requestedBy │
│ password    │       │ recipient.. │       │ approverId  │
│ role        │       │ recipient.. │       │ status      │
│ managerId   │◄──────│ recipient.. │       │ respondedAt │
│ createdAt   │       │ purpose     │       │ createdAt   │
│ updatedAt   │       │ status      │       └─────────────┘
└─────────────┘       │ monnifyRef  │
       │              │ metadata    │
       │              │ createdAt   │
       │              │ updatedAt   │
       │              └──────┬──────┘
       │                     │
       │              ┌──────▼──────┐
       │              │  AuditLog   │
       │              ├─────────────┤
       └─────────────►│ userId (FK) │
                      │ paymentId   │
                      │ action      │
                      │ metadata    │
                      │ ipAddress   │
                      │ createdAt   │
                      └─────────────┘
```

### 9.2 Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum UserRole {
  ADMIN
  MANAGER
  STAFF
}

enum PaymentStatus {
  PENDING_VERIFICATION
  PENDING_APPROVAL
  APPROVED
  REJECTED
  EXECUTED
  FAILED
}

enum ApprovalStatus {
  PENDING
  APPROVED
  REJECTED
}

enum ActionType {
  INTENT_RECEIVED
  ACCOUNT_VERIFIED
  VERIFICATION_FAILED
  POLICY_CHECKED
  APPROVAL_REQUESTED
  APPROVED
  REJECTED
  PAYMENT_EXECUTED
  PAYMENT_FAILED
  NOTIFICATION_SENT
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String
  password      String
  role          UserRole
  managerId     String?
  manager       User?     @relation("ManagerRelation", fields: [managerId], references: [id])
  subordinates  User[]    @relation("ManagerRelation")
  payments      Payment[]
  approvalsRequested Approval[] @relation("RequestedBy")
  approvalsToReview  Approval[] @relation("Approver")
  auditLogs     AuditLog[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Payment {
  id                String        @id @default(uuid())
  userId            String
  user              User          @relation(fields: [userId], references: [id])
  amount            Int
  currency          String        @default("NGN")
  recipientName     String
  recipientAccount  String
  recipientBankCode String
  recipientBankName String?
  purpose           String
  status            PaymentStatus @default(PENDING_VERIFICATION)
  monnifyRef        String?
  metadata          Json?
  approval          Approval?
  auditLogs         AuditLog[]
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
}

model Approval {
  id          String          @id @default(uuid())
  paymentId   String          @unique
  payment     Payment         @relation(fields: [paymentId], references: [id])
  requestedBy String
  requester   User            @relation("RequestedBy", fields: [requestedBy], references: [id])
  approverId  String
  approver    User            @relation("Approver", fields: [approverId], references: [id])
  status      ApprovalStatus  @default(PENDING)
  reason      String?
  respondedAt DateTime?
  createdAt   DateTime        @default(now())
}

model AuditLog {
  id        String   @id @default(uuid())
  paymentId String?
  payment   Payment? @relation(fields: [paymentId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  action    ActionType
  metadata  Json?
  ipAddress String?
  createdAt DateTime @default(now())
}
```

---

## 10. API Specification

### 10.1 Authentication Endpoints

#### POST /auth/register
Create a new user account.

**Request Body:**
```json
{
  "email": "tolu@company.ng",
  "name": "Tolu Adeyemi",
  "password": "securePassword123",
  "role": "STAFF",
  "managerId": "uuid-of-cfo"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "email": "tolu@company.ng",
  "name": "Tolu Adeyemi",
  "role": "STAFF",
  "accessToken": "jwt-token"
}
```

#### POST /auth/login
Authenticate and receive JWT.

**Request Body:**
```json
{
  "email": "tolu@company.ng",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "tolu@company.ng",
    "name": "Tolu Adeyemi",
    "role": "STAFF"
  }
}
```

#### GET /auth/me
Get current authenticated user.

**Headers:** `Authorization: Bearer <jwt-token>`

**Response (200):**
```json
{
  "id": "uuid",
  "email": "tolu@company.ng",
  "name": "Tolu Adeyemi",
  "role": "STAFF",
  "manager": {
    "id": "uuid",
    "name": "Chief Financial Officer"
  }
}
```

### 10.2 Payment Endpoints

#### POST /payments/intent
Create a payment from natural language.

**Headers:** `Authorization: Bearer <jwt-token>`

**Request Body:**
```json
{
  "message": "Pay Acme Supplies 250000 for last month's delivery to GTB 0123456789"
}
```

**Response (201):**
```json
{
  "id": "payment-uuid",
  "amount": 250000,
  "currency": "NGN",
  "recipientName": "Acme Supplies",
  "recipientAccount": "0123456789",
  "recipientBankCode": "058",
  "recipientBankName": "GTBank Plc",
  "purpose": "last month's delivery",
  "status": "PENDING_APPROVAL",
  "requiresApproval": true,
  "approvalId": "approval-uuid",
  "createdAt": "2026-07-22T10:30:00Z"
}
```

#### GET /payments
List payments for authenticated user.

**Headers:** `Authorization: Bearer <jwt-token>`

**Query Parameters:** `?status=PENDING_APPROVAL&limit=20&offset=0`

**Response (200):**
```json
{
  "data": [
    {
      "id": "payment-uuid",
      "amount": 250000,
      "recipientName": "Acme Supplies",
      "status": "PENDING_APPROVAL",
      "createdAt": "2026-07-22T10:30:00Z"
    }
  ],
  "meta": {
    "total": 15,
    "limit": 20,
    "offset": 0
  }
}
```

#### GET /payments/:id
Get payment details with audit trail.

**Response (200):**
```json
{
  "id": "payment-uuid",
  "amount": 250000,
  "status": "EXECUTED",
  "monnifyRef": "MNFY|20260722103000|00001",
  "approval": {
    "status": "APPROVED",
    "approver": { "name": "CFO" },
    "respondedAt": "2026-07-22T10:35:00Z"
  },
  "auditTrail": [
    {
      "action": "INTENT_RECEIVED",
      "createdAt": "2026-07-22T10:30:00Z"
    },
    {
      "action": "ACCOUNT_VERIFIED",
      "metadata": { "bankName": "GTBank Plc" },
      "createdAt": "2026-07-22T10:30:02Z"
    },
    {
      "action": "APPROVAL_REQUESTED",
      "createdAt": "2026-07-22T10:30:03Z"
    },
    {
      "action": "APPROVED",
      "createdAt": "2026-07-22T10:35:00Z"
    },
    {
      "action": "PAYMENT_EXECUTED",
      "metadata": { "monnifyRef": "MNFY|..." },
      "createdAt": "2026-07-22T10:35:05Z"
    }
  ]
}
```

### 10.3 Approval Endpoints

#### GET /approvals/pending
Get pending approvals for approver.

**Headers:** `Authorization: Bearer <jwt-token>` (must be MANAGER or ADMIN)

**Response (200):**
```json
{
  "data": [
    {
      "id": "approval-uuid",
      "payment": {
        "id": "payment-uuid",
        "amount": 250000,
        "recipientName": "Acme Supplies",
        "purpose": "last month's delivery",
        "requestedBy": { "name": "Tolu Adeyemi" }
      },
      "createdAt": "2026-07-22T10:30:00Z"
    }
  ]
}
```

#### POST /approvals/:id/approve
Approve a payment request.

**Headers:** `Authorization: Bearer <jwt-token>`

**Response (200):**
```json
{
  "id": "approval-uuid",
  "status": "APPROVED",
  "payment": {
    "id": "payment-uuid",
    "status": "EXECUTED",
    "monnifyRef": "MNFY|20260722103500|00001"
  }
}
```

#### POST /approvals/:id/reject
Reject a payment request.

**Request Body:**
```json
{
  "reason": "Budget exceeded for this month"
}
```

**Response (200):**
```json
{
  "id": "approval-uuid",
  "status": "REJECTED",
  "reason": "Budget exceeded for this month",
  "payment": {
    "id": "payment-uuid",
    "status": "REJECTED"
  }
}
```

### 10.4 AI Agent Endpoints

#### POST /ai/chat
Stream AI conversation.

**Headers:** `Authorization: Bearer <jwt-token>`
**Content-Type:** `text/event-stream`

**Request Body:**
```json
{
  "message": "I need to pay my supplier",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help you today?" }
  ]
}
```

**Response:** SSE stream of text chunks.

#### POST /ai/parse-intent
Parse natural language into structured payment intent.

**Request Body:**
```json
{
  "message": "Pay Acme Supplies 250000 for last month's delivery"
}
```

**Response (200):**
```json
{
  "action": "pay",
  "amount": 250000,
  "currency": "NGN",
  "recipientName": "Acme Supplies",
  "purpose": "last month's delivery",
  "urgency": "immediate",
  "confidence": 0.94
}
```

### 10.5 Audit Endpoints

#### GET /audit/payment/:paymentId
Get audit trail for a payment.

**Headers:** `Authorization: Bearer <jwt-token>`

**Response (200):**
```json
{
  "paymentId": "payment-uuid",
  "trail": [
    {
      "action": "INTENT_RECEIVED",
      "user": { "name": "Tolu Adeyemi" },
      "metadata": { "rawMessage": "Pay Acme Supplies..." },
      "createdAt": "2026-07-22T10:30:00Z"
    }
  ]
}
```

### 10.6 Webhook Endpoints

#### POST /webhooks/whatsapp
Receive WhatsApp webhook events.

**Request Body (Twilio format):**
```json
{
  "From": "whatsapp:+2348012345678",
  "Body": "Pay Acme Supplies 250000"
}
```

#### POST /webhooks/telegram
Receive Telegram webhook updates.

**Request Body:**
```json
{
  "update_id": 123456789,
  "message": {
    "chat": { "id": 123456789 },
    "text": "Pay Acme Supplies 250000"
  }
}
```

---

## 11. User Flows & Journeys

### 11.1 Core Payment Flow (Staff Initiates)

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌─────────────┐
│  Staff  │────►│  AI Agent │────►│   Policy    │────►│  Approval   │
│  Tolu   │     │  Parse   │     │   Engine    │     │  Required?  │
└─────────┘     └──────────┘     └─────────────┘     └──────┬──────┘
                                                           │
                    ┌────────────────────────────────────────┘
                    │ No (Auto-approve)
                    ▼
            ┌───────────────┐     ┌─────────────┐     ┌──────────┐
            │   Monnify     │────►│  Disburse   │────►│  Receipt │
            │   Verify      │     │   Execute   │     │  Confirm │
            │   Account     │     │             │     │          │
            └───────────────┘     └─────────────┘     └──────────┘
                    │
                    │ Yes (Approval needed)
                    ▼
            ┌───────────────┐     ┌─────────────┐     ┌──────────┐
            │  Notify CFO   │────►│  CFO Approves│────►│  Execute │
            │  (Multi-ch)   │     │  (One-click) │     │  Payment │
            └───────────────┘     └─────────────┘     └──────────┘
                                                           │
                                                           ▼
                                                    ┌──────────┐
                                                    │  Audit   │
                                                    │  Log All │
                                                    └──────────┘
```

### 11.2 Detailed Flow: Payment with Approval

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Tolu (STAFF) | Types in web chat: *"Pay Acme Supplies ₦250,000 for delivery to GTB 0123456789"* | AI parses intent: action=PAY, amount=250000, recipient=Acme Supplies, bank=GTB, account=0123456789 |
| 2 | System | Creates Payment record with status PENDING_VERIFICATION | Returns payment ID to Tolu |
| 3 | System | Calls Monnify Account Name Enquiry | Receives: "ACME SUPPLIES LIMITED" — account verified |
| 4 | System | Updates Payment status, logs audit: ACCOUNT_VERIFIED | — |
| 5 | System | Policy Engine checks: amount (250k) > threshold (100k) | Decision: requires approval |
| 6 | System | Creates Approval record, assigns to Tolu's manager (CFO) | Logs audit: APPROVAL_REQUESTED |
| 7 | System | Sends approval notification to CFO via in-app, email, WhatsApp, Telegram | CFO receives: "Tolu requests ₦250,000 to Acme Supplies. Approve?" |
| 8 | CFO (MANAGER) | Clicks "Approve" in web dashboard | System validates CFO is assigned approver |
| 9 | System | Updates Approval to APPROVED | Logs audit: APPROVED |
| 10 | System | Triggers PaymentService.executePayment() | Calls Monnify Disbursement API |
| 11 | Monnify | Processes transfer, returns transaction reference | System receives: MNFY\|20260722... |
| 12 | System | Updates Payment to EXECUTED, stores monnifyRef | Logs audit: PAYMENT_EXECUTED |
| 13 | System | Sends confirmation to Tolu: "Payment executed. Ref: MNFY\|..." | Tolu sees receipt in dashboard |

### 11.3 WhatsApp Conversation Flow

```
Tolu: Hi
AgentPay: Hello! I'm AgentPay, your financial assistant. How can I help you today?

Tolu: I need to pay my supplier
AgentPay: Sure! I'd be happy to help. Could you tell me:
1. The supplier's name
2. The amount
3. Their bank account details

Tolu: Pay Acme Supplies 250000 to GTB 0123456789
AgentPay: Got it. Let me verify the account details...

AgentPay: ✅ Account verified: ACME SUPPLIES LIMITED (GTBank)
Amount: ₦250,000
Purpose: supplier payment

This payment requires approval from your manager (CFO). I've sent the request. You'll be notified once it's approved.

[2 minutes later]

AgentPay: ✅ Your payment has been approved and executed!
Transaction Reference: MNFY|20260722103500|00001
Amount: ₦250,000
To: ACME SUPPLIES LIMITED
Status: Completed
```

### 11.4 Telegram Bot Flow

```
/start
AgentPay: Welcome to AgentPay! 💰
I'm your AI payment assistant. Send me a message like:
"Pay [name] [amount] to [bank] [account]"
Or type /help for more options.

Pay Acme Supplies 250000
AgentPay: 🔍 Verifying account...
✅ Verified: ACME SUPPLIES LIMITED
💵 Amount: ₦250,000
⚠️ This requires approval from CFO.

[Inline Keyboard: Approve | Reject]

[CFO clicks Approve]

AgentPay: ✅ Payment Executed!
Ref: MNFY|20260722103500|00001
```

---

## 12. Security & Compliance

### 12.1 Authentication & Authorization
- **JWT-based authentication** with 7-day access tokens
- **Role-based access control:** ADMIN (full access), MANAGER (approve + view team), STAFF (initiate + view own)
- **Resource-level authorization:** Users can only access their own payments unless they are the approver or admin
- **Manager-subordinate chain:** Approval routing follows organizational hierarchy

### 12.2 Data Protection
- **Passwords:** Hashed with bcrypt (cost factor 12)
- **Sensitive data:** Bank account numbers masked in logs and UI (show last 4 digits only)
- **API keys:** Stored in environment variables, never committed to version control
- **Audit logs:** Immutable, no update or delete operations permitted

### 12.3 Payment Security
- **Account verification:** All recipient accounts verified via Monnify before disbursement
- **Policy enforcement:** Hard limits on auto-approval amounts
- **Human-in-the-loop:** No payment above threshold executes without explicit approval
- **Idempotency:** All disbursement requests include unique reference to prevent double-payment

### 12.4 Compliance Roadmap

| Phase | Timeline | Compliance Target |
|-------|----------|-------------------|
| MVP | Launch | NDPR basic compliance, no card data storage |
| Phase 2 | Month 3 | PCI-DSS SAQ-A assessment |
| Phase 3 | Month 6 | SOC 2 Type I readiness |
| Phase 4 | Month 12 | SOC 2 Type II certification |

---

## 13. Integration Requirements

### 13.1 Monnify Integration

| API | Endpoint | Usage in AgentPay |
|-----|----------|---------------------|
| Authentication | POST /api/v1/auth/login | Obtain access token |
| Account Validation | GET /api/v1/disbursements/account/validate | Verify recipient bank details |
| Single Disbursement | POST /api/v2/disbursements/single | Execute approved payments |
| Transaction Status | GET /api/v2/transactions/{ref} | Poll for settlement confirmation |
| Reserved Accounts | POST /api/v2/bank-transfer/reserved-accounts | Create dedicated collection accounts |
| Transaction Splitting | POST /api/v2/transaction-split | Auto-split payments (Phase 2) |
| Sub-Wallets | POST /api/v1/disbursements/wallet | Segregated balances (Phase 2) |

**Error Handling:**
- Monnify API timeout: Retry 3x with exponential backoff (1s, 2s, 4s)
- Monnify auth failure: Refresh token and retry once
- Insufficient balance: Return clear error to user, do not retry

### 13.2 Google Gemini Integration

| Feature | API | Configuration |
|---------|-----|---------------|
| Intent Parsing | generateObject | Model: gemini-1.5-flash, temperature: 0.1, responseFormat: JSON |
| Conversational Chat | streamText | Model: gemini-1.5-flash, temperature: 0.7, system prompt defined |

**System Prompt:**
```
You are AgentPay, a professional financial AI assistant for African businesses. 
Your role is to help users execute payments, verify accounts, and manage approvals.
You operate with Monnify's secure payment infrastructure.
Be concise, professional, and context-aware. Always confirm amounts and recipient details before execution.
When you cannot fulfill a request, explain why and suggest alternatives.
```

### 13.3 WhatsApp Business API

| Feature | Implementation |
|---------|---------------|
| Message Sending | WhatsApp Business API (Meta) or Twilio WhatsApp |
| Webhook Reception | POST /webhooks/whatsapp |
| Message Types | Text, Interactive (buttons for approve/reject) |
| User Identification | Phone number linked to User profile |

### 13.4 Telegram Bot API

| Feature | Implementation |
|---------|---------------|
| Bot Initialization | node-telegram-bot-api with polling |
| Commands | /start, /help, /status |
| Interactive Elements | Inline keyboards for approvals |
| Webhook | POST /webhooks/telegram (production) |

---

## 14. Roadmap & Milestones

### Phase 1: MVP (Weeks 1–4)
**Goal:** Core payment orchestration via web dashboard

| Week | Deliverable |
|------|-------------|
| 1 | NestJS project setup, Prisma schema, Auth module, User management |
| 2 | Monnify integration, Account verification, Disbursement execution |
| 3 | AI Agent (intent parsing, chat), Policy engine, Approval workflow |
| 4 | Audit logging, Web dashboard, End-to-end testing, Documentation |

**MVP Success Criteria:**
- Staff can initiate payment via natural language
- Manager receives and approves via web
- Payment executes through Monnify Sandbox
- Complete audit trail visible

### Phase 2: Multi-Channel & Polish (Weeks 5–8)
**Goal:** WhatsApp and Telegram support, notification system

| Week | Deliverable |
|------|-------------|
| 5 | WhatsApp Business API integration |
| 6 | Telegram Bot integration |
| 7 | Notification service (email, push, in-app) |
| 8 | Payment receipts, dashboard analytics, bug fixes |

### Phase 3: Scale & Advanced Features (Months 3–6)
**Goal:** Production readiness, advanced payment features

| Month | Deliverable |
|-------|-------------|
| 3 | PostgreSQL migration, Docker production deployment, load testing |
| 4 | Recurring payments, scheduled disbursements |
| 5 | Transaction splitting, sub-wallets for budget management |
| 6 | ERP integrations (QuickBooks, Xero), bulk payment uploads |

---

## 15. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Monnify API downtime | Medium | High | Circuit breaker pattern, graceful degradation to manual mode, queue failed transactions for retry |
| AI intent parsing errors | Medium | High | Confidence threshold (70%), human confirmation for ambiguous intents, structured fallback forms |
| Approval delays bottleneck payments | Medium | Medium | Multi-channel notifications, escalation after 24h, configurable auto-approval limits |
| Security breach (API keys exposed) | Low | Critical | Environment variable management, secret rotation, audit logging of all API access |
| Regulatory changes (CBN policies) | Medium | High | Close relationship with Monnify compliance team, modular policy engine for quick rule updates |
| User adoption (preference for manual banking) | High | Medium | Progressive onboarding, WhatsApp-first approach (meets users where they are), clear value demonstration |
| Gemini API rate limits or cost | Medium | Low | Caching common intents, fallback to rule-based parsing for simple patterns, usage monitoring |
| Double-payment due to retry logic | Low | Critical | Idempotent disbursement references, transaction status checks before retry, audit trail review |

---

## 16. Appendix

### 16.1 Glossary

| Term | Definition |
|------|------------|
| **AgentPay** | The AI-powered financial operating system described in this document |
| **Monnify** | Payment gateway infrastructure providing disbursement, verification, and collection APIs |
| **Payment Intent** | Structured data extracted from natural language (action, amount, recipient, purpose) |
| **Approval Workflow** | Process by which payments above a threshold require explicit manager authorization |
| **Audit Trail** | Immutable chronological record of all actions taken on a payment |
| **Policy Engine** | Rule-based system that determines whether a payment can auto-execute or requires approval |
| **Human-in-the-Loop** | Design pattern where AI handles mechanical tasks but humans retain decision authority |
| **SSE** | Server-Sent Events, used for streaming AI responses in real-time |
| **Idempotency** | Property ensuring duplicate requests do not cause duplicate effects |

### 16.2 Environment Variables

```bash
# Database
DATABASE_URL="file:./dev.db"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"

# Monnify (Sandbox)
MONNIFY_BASE_URL="https://sandbox.monnify.com"
MONNIFY_API_KEY="your-monnify-api-key"
MONNIFY_SECRET_KEY="your-monnify-secret-key"
MONNIFY_CONTRACT_CODE="your-contract-code"

# AI
GEMINI_API_KEY="your-google-gemini-api-key"

# WhatsApp (Twilio or Meta)
WHATSAPP_TOKEN="your-whatsapp-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"

# Telegram
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"

# App
PORT=3000
NODE_ENV="development"
```

### 16.3 Monnify Sandbox Test Credentials

| Field | Value |
|-------|-------|
| Base URL | `https://sandbox.monnify.com` |
| API Key | Obtained from `app.monnify.com` developer dashboard |
| Secret Key | Obtained from `app.monnify.com` developer dashboard |
| Contract Code | Obtained from `app.monnify.com` developer dashboard |

### 16.4 Sample Test Data

**Test Bank Account (Monnify Sandbox):**
- Account Number: `0000000000` (varies by sandbox)
- Bank Code: `058` (GTBank)
- Expected Name: Test Account

**Test Users:**
| Name | Email | Role | Password |
|------|-------|------|----------|
| Tolu Adeyemi | tolu@agentpay.ng | STAFF | password123 |
| Chinedu Okoro | cfo@agentpay.ng | MANAGER | password123 |
| Admin User | admin@agentpay.ng | ADMIN | password123 |

### 16.5 Related Documents

- Technical Architecture Document (TAD)
- API Integration Guide (Monnify)
- AI Prompt Engineering Guide
- Security Runbook
- Deployment Playbook

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-22 | Product Team | Initial PRD for AgentPay MVP |

---

*End of Document*
