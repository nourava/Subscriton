# Brightloop – Project Notes & Multi-Developer Guidelines

## 1. Development Team Architecture (4 Developers)

The codebase is organized into isolated, cohesive modules to prevent merge conflicts and ensure clear ownership across four developers:

### Developer 1 (Team Leader)
- **Backend Responsibilities**:
  - `config/` (Project settings, global middlewares, Postgres configuration)
  - `accounts/` (Custom User model, authentication, RBAC)
  - `reports/` (Analytics engine, metrics calculations)
- **Frontend Responsibilities**:
  - `src/core/` (Auth context, protected routes, base API config)
  - `src/shared/` (Layout: Navbar, Sidebar, design tokens, apiClient)
  - `src/features/admin-dashboard/` & `src/features/analytics/` & `src/features/customers/`

### Developer 2
- **Backend Responsibilities**:
  - `products/` (Product catalog, variants)
  - `plans/` (Pricing tiers, intervals, entitlements)
  - `discounts/` (Coupons, percentage/fixed discounts)
- **Frontend Responsibilities**:
  - `src/features/products/`
  - `src/features/plans/`
  - `src/features/discounts/`

### Developer 3
- **Backend Responsibilities**:
  - `quotations/` (Quotation generation, line items, status flow)
  - `subscriptions/` (Contract lifecycle, auto-renewal, cancellations)
- **Frontend Responsibilities**:
  - `src/features/quotations/`
  - `src/features/subscriptions/`

### Developer 4
- **Backend Responsibilities**:
  - `invoices/` (Invoice generation, tax handling, PDF/records)
  - `payments/` (Payment gateways, receipts, transaction ledger)
- **Frontend Responsibilities**:
  - `src/features/invoices/`
  - `src/features/payments/`

---

## 2. Git & GitHub Branching Strategy

1. **Main Branch (`main`)**:
   - Production-ready, stable codebase.
   - Protected branch requiring PR approval.
2. **Development Branch (`develop`)**:
   - Integration branch for all four developers.
3. **Feature Branches**:
   - Branch naming convention:
     - `feature/dev1-admin-analytics`
     - `feature/dev2-products-plans`
     - `feature/dev3-quotes-subscriptions`
     - `feature/dev4-invoices-payments`
4. **Commit Conventions**:
   - Standard semantic commits:
     - `feat(plans): add monthly/yearly interval validator`
     - `fix(invoices): round tax calculation to 2 decimals`
     - `docs(api): update quotation status transitions`

---

## 3. Database Migration Policy

- **One Source of Truth**: All models run on PostgreSQL (with automatic development fallback to SQLite for quick offline testing).
- Never modify applied migration files directly. Generate new migrations with:
  ```bash
  python manage.py makemigrations <app_name>
  python manage.py migrate
  ```
- Before pushing to GitHub, ensure all migrations are generated and tested against the schema.
