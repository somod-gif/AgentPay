# AgentPay — Frontend Integration Guide

**Backend API:** `http://localhost:5000/api`

## Auth Flow

### Login → Store JWT

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "tolu@agentpay.ng",
  "password": "password123"
}

Response 200:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "tolu@agentpay.ng",
    "name": "Tolu Adeyemi",
    "role": "STAFF"
  }
}
```

Store `accessToken` in localStorage/memory. Send as `Authorization: Bearer <token>` on all subsequent requests.

### Get Current User

```
GET /api/auth/me
Authorization: Bearer <token>

Response 200:
{
  "id": "uuid",
  "email": "tolu@agentpay.ng",
  "name": "Tolu Adeyemi",
  "role": "STAFF",
  "manager": { "id": "uuid", "name": "Chinedu Okoro" }
}
```

### Register

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@company.ng",
  "name": "Full Name",
  "password": "securePassword123",
  "role": "STAFF",
  "managerId": "uuid-of-manager"  // optional
}
```

## Roles & Permissions

| Role | Permissions |
|------|-------------|
| **ADMIN** | Full access — all endpoints, user management |
| **MANAGER** | Can approve/reject payments, view team payments |
| **STAFF** | Can initiate payments, view own payments only |

The `role` comes from `GET /auth/me`.

## UI Pages & Their API Calls

### 1. Login Page (`/login`)

- `POST /api/auth/login` — authenticate
- On success → redirect to dashboard based on role

### 2. Dashboard / Chat Page (`/`)

**Send message to AI:**
```
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Pay Acme Supplies 250000 for delivery",
  "history": []  // optional, array of {role, content}
}
```
**Response:** SSE stream — read as `text/event-stream`:
```
data: {"text": "I'll help you pay Acme Supplies..."}
data: {"text": " Let me verify the account..."}
data: [DONE]
```

**Parse intent (alternative to chat):**
```
POST /api/ai/parse-intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Pay Acme Supplies 250000 for last month's delivery to GTB 0123456789"
}

Response 200:
{
  "action": "pay",
  "amount": 250000,
  "currency": "NGN",
  "recipientName": "Acme Supplies",
  "recipientAccount": "0123456789",
  "recipientBankCode": "058",
  "purpose": "last month's delivery",
  "urgency": "immediate",
  "confidence": 0.94
}
```

### 3. Submit Payment (from chat or form)

```
POST /api/payments/intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Pay Acme Supplies 250000 for delivery to GTB 0123456789"
}

Response 201:
{
  "id": "payment-uuid",
  "amount": 250000,
  "currency": "NGN",
  "recipientName": "Acme Supplies",
  "recipientAccount": "0123456789",
  "recipientBankCode": "058",
  "recipientBankName": "GTBank Plc",
  "purpose": "delivery",
  "status": "PENDING_APPROVAL",   // or APPROVED/EXECUTED if within auto-limit
  "approval": { ... },
  "auditLogs": [ ... ]
}
```

**Payment Statuses:**
| Status | Meaning |
|--------|---------|
| `PENDING_VERIFICATION` | Verifying bank account |
| `PENDING_APPROVAL` | Waiting for manager to approve |
| `APPROVED` | Approved, about to execute |
| `EXECUTED` | Payment completed successfully |
| `REJECTED` | Rejected by policy or approver |
| `FAILED` | Monnify disbursement failed |

**UI Feedback per Status:**
- `PENDING_APPROVAL` → Show "⏳ Awaiting manager approval"
- `EXECUTED` → Show "✅ Payment sent! Ref: MNFY|..."
- `REJECTED` → Show "❌ Payment rejected" + reason
- `FAILED` → Show "⚠️ Payment failed, contact support"

### 4. Payments List Page (`/payments`)

```
GET /api/payments?status=PENDING_APPROVAL&limit=20&offset=0
Authorization: Bearer <token>

Response 200:
{
  "data": [{
    "id": "uuid",
    "amount": 250000,
    "recipientName": "Acme Supplies",
    "status": "PENDING_APPROVAL",
    "createdAt": "2026-07-22T10:30:00Z"
  }],
  "meta": { "total": 15, "limit": 20, "offset": 0 }
}
```

### 5. Payment Detail Page (`/payments/:id`)

```
GET /api/payments/:id
Authorization: Bearer <token>

Response 200: (see full response below)
```

Full response includes:
- Payment details (amount, recipient, bank, status)
- `approval` object (who approved/rejected, when)
- `auditLogs` array — complete chronological history

**Render the audit trail as a timeline:**
```json
"auditLogs": [
  { "action": "INTENT_RECEIVED", "user": { "name": "Tolu Adeyemi" }, "createdAt": "..." },
  { "action": "ACCOUNT_VERIFIED", "metadata": { "bankName": "GTBank Plc" }, "createdAt": "..." },
  { "action": "POLICY_CHECKED", "metadata": { "requiresApproval": true }, "createdAt": "..." },
  { "action": "APPROVAL_REQUESTED", "metadata": { "approverId": "..." }, "createdAt": "..." },
  { "action": "APPROVED", "user": { "name": "Chinedu Okoro" }, "createdAt": "..." },
  { "action": "PAYMENT_EXECUTED", "metadata": { "monnifyRef": "MNFY|..." }, "createdAt": "..." }
]
```

### 6. Approvals Page (`/approvals`) — MANAGER/ADMIN only

```
GET /api/approvals/pending
Authorization: Bearer <token>   // must be MANAGER or ADMIN role

Response 200:
{
  "data": [{
    "id": "approval-uuid",
    "payment": {
      "id": "payment-uuid",
      "amount": 250000,
      "recipientName": "Acme Supplies",
      "purpose": "delivery",
      "user": { "name": "Tolu Adeyemi" }
    },
    "createdAt": "2026-07-22T10:30:00Z"
  }]
}
```

**Approve:**
```
POST /api/approvals/:id/approve
Authorization: Bearer <token>

Response 200:
{
  "id": "approval-uuid",
  "status": "APPROVED",
  "payment": {
    "id": "payment-uuid",
    "status": "EXECUTED",       // auto-executed after approve
    "monnifyRef": "MNFY|..."
  }
}
```

**Reject:**
```
POST /api/approvals/:id/reject
Authorization: Bearer <token>
Content-Type: application/json

{ "reason": "Budget exceeded for this month" }

Response 200:
{
  "id": "approval-uuid",
  "status": "REJECTED",
  "reason": "Budget exceeded for this month",
  "payment": { "id": "payment-uuid", "status": "REJECTED" }
}
```

### 7. Audit Page (`/audit/:paymentId`)

```
GET /api/audit/payment/:paymentId
Authorization: Bearer <token>

Response 200:
{
  "paymentId": "uuid",
  "trail": [
    { "action": "INTENT_RECEIVED", "user": { "name": "Tolu" }, "createdAt": "..." },
    ...
  ]
}
```

### 8. Users Management (`/users`) — ADMIN only

```
GET /api/users          // list all
GET /api/users/:id      // get one
POST /api/users         // create
PATCH /api/users/:id    // update
```

### 9. Health Check (no auth)

```
GET /api/health
Response: { "status": "ok", "service": "AgentPay", "version": "1.0.0" }
```

---

## Important Rules for Frontend

1. **Bank codes for the account verification:**
   - `058` = GTBank/GTB
   - `044` = Access Bank
   - `011` = First Bank
   - Pass bank code + account number when available from AI parsing

2. **Amounts are in kobo (lowest denomination):**
   - ₦250,000 = `250000`
   - Display with `₦${(amount).toLocaleString()}`

3. **Error responses follow this format:**
   ```json
   {
     "statusCode": 400,
     "message": "Account verification failed: ...",
     "timestamp": "2026-07-22T10:30:00Z",
     "path": "/api/payments/intent"
   }
   ```

4. **Auto-approval threshold:** Payments ≤ ₦100,000 auto-execute. Payments > ₦100,000 require manager approval.

5. **SSE for chat:** Use `EventSource` or `fetch` with streaming to consume `POST /api/ai/chat`.

6. **JWT expiry:** 7 days. On 401, redirect to login.

---

## Suggested Pages / Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/login` | LoginPage | None | Email + password |
| `/` | DashboardPage | JWT | AI chat + recent payments |
| `/payments` | PaymentsList | JWT | All user's payments |
| `/payments/:id` | PaymentDetail | JWT | Detail + audit timeline |
| `/approvals` | ApprovalsList | MANAGER/ADMIN | Pending approvals |
| `/users` | UsersList | ADMIN | User management |

---

## Test Credentials

| Name | Email | Role | Password |
|------|-------|------|----------|
| Tolu Adeyemi | `tolu@agentpay.ng` | STAFF | `password123` |
| Chinedu Okoro | `cfo@agentpay.ng` | MANAGER | `password123` |
| Admin User | `admin@agentpay.ng` | ADMIN | `password123` |

Tolu's manager is Chinedu (CFO). This means approval requests from Tolu go to Chinedu.
