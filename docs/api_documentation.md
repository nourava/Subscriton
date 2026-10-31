# Brightloop – REST API Documentation

## 1. Overview & Base URL
The backend API is implemented using **Django REST Framework (DRF)**.
- **Base URL (Local)**: `http://localhost:8000/api`
- **Default Content Type**: `application/json`
- **Authentication**: Bearer Token / Session Authentication

---

## 2. Role-Based Access Control (RBAC) Matrix

| Endpoint Group | Admin | Staff | Customer |
|---|:---:|:---:|:---:|
| **Health & Discovery** (`/api/health/`) | Read | Read | Read |
| **Auth / Profile** (`/api/auth/me/`) | Read/Write | Read/Write | Read/Write (Self) |
| **User Directory** (`/api/auth/users/`) | Full Access | Read/Update | Denied |
| **Products** (`/api/products/`) | Full Access | Full Access | Read-Only |
| **Plans** (`/api/plans/`) | Full Access | Full Access | Read-Only |
| **Quotations** (`/api/quotations/`) | Full Access | Full Access | Read/Accept Self |
| **Subscriptions** (`/api/subscriptions/`) | Full Access | Full Access | Read/Cancel Self |
| **Invoices** (`/api/invoices/`) | Full Access | Full Access | Read/Pay Self |
| **Discounts** (`/api/discounts/`) | Full Access | Read/Apply | Validate Code |
| **Payments** (`/api/payments/`) | Full Access | Read/Record | Pay/View Receipts |
| **Reports & Analytics** (`/api/reports/`) | Full Access | Operational | Denied |

---

## 3. Endpoints Catalog

### 3.1. System & Connectivity
#### `GET /api/health/`
Checks backend availability and returns the catalog of active endpoints.
- **Access**: Public
- **Sample Response**:
```json
{
  "status": "online",
  "service": "Brightloop Subscription Management API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth/",
    "products": "/api/products/",
    "plans": "/api/plans/",
    "quotations": "/api/quotations/",
    "subscriptions": "/api/subscriptions/",
    "invoices": "/api/invoices/",
    "discounts": "/api/discounts/",
    "payments": "/api/payments/",
    "reports": "/api/reports/",
    "health": "/api/health/"
  }
}
```

---

### 3.2. Accounts & Authentication
- `GET /api/auth/me/` – Get current authenticated user profile and assigned role.
- `GET /api/auth/users/` – List customer accounts and staff members (Admin/Staff only).
- `POST /api/auth/users/` – Register or onboard a new client organization.

---

### 3.3. Products & Subscription Plans
- `GET /api/products/` – List software products.
- `POST /api/products/` – Create a new product.
- `GET /api/plans/` – List subscription plans (filtering by billing interval, product).
- `POST /api/plans/` – Define a new subscription plan with prices and trial days.

---

### 3.4. Quotations
- `GET /api/quotations/` – List quotations.
- `POST /api/quotations/` – Generate a new quotation for a client.
- `GET /api/quotations/{id}/` – Retrieve quotation line items and status.
- `PATCH /api/quotations/{id}/` – Update quotation status (`SENT`, `ACCEPTED`, `REJECTED`).

---

### 3.5. Subscriptions
- `GET /api/subscriptions/` – List subscriptions.
- `POST /api/subscriptions/` – Create an active subscription tied to a customer and plan.
- `GET /api/subscriptions/{id}/` – Retrieve subscription details and renewal timeline.
- `PATCH /api/subscriptions/{id}/` – Pause, cancel, or renew a subscription contract.

---

### 3.6. Invoices & Billing
- `GET /api/invoices/` – List issued invoices.
- `POST /api/invoices/` – Generate invoice for a subscription period.
- `GET /api/invoices/{id}/` – View invoice breakdown with tax and discount.
- `POST /api/invoices/{id}/void/` – Void an invoice.

---

### 3.7. Discounts & Promo Codes
- `GET /api/discounts/` – List active and scheduled discount promotions.
- `POST /api/discounts/` – Create a discount or promotional code.

---

### 3.8. Payments
- `GET /api/payments/` – View transaction audit log.
- `POST /api/payments/` – Record a customer payment transaction.

---

### 3.9. Analytics & Operational Reports
- `GET /api/reports/summary/` – Retrieve high-level KPI dashboard metrics:
```json
{
  "metrics": {
    "mrr": 48250.00,
    "arr": 579000.00,
    "active_subscriptions": 342,
    "active_customers": 289,
    "pending_invoices_count": 18,
    "churn_rate": "1.2%"
  },
  "status": "success"
}
```
