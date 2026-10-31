/**
 * Shared entity models and status definitions for Brightloop.
 * Standardizes schema across the 4 developers' frontend features.
 */

export const SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  TRIALING: 'TRIALING',
  PAST_DUE: 'PAST_DUE',
  CANCELED: 'CANCELED',
  PAUSED: 'PAUSED',
};

export const InvoiceStatus = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  PAID: 'PAID',
  VOID: 'VOID',
  UNCOLLECTIBLE: 'UNCOLLECTIBLE',
};

export const QuotationStatus = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
};

export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
};

export const DiscountType = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
};

export const BillingInterval = {
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY',
};

/**
 * Starter mock data providing fallback context and instant visual preview.
 */
export const STARTER_MOCKS = {
  products: [
    { id: 1, name: 'Brightloop Core Suite', sku: 'BL-CORE-01', is_active: true, variants_count: 3 },
    { id: 2, name: 'Advanced Billing Addon', sku: 'BL-ADDON-BILLING', is_active: true, variants_count: 2 },
    { id: 3, name: 'Multi-Tenant Gateway', sku: 'BL-GATEWAY-MT', is_active: false, variants_count: 1 },
  ],
  plans: [
    { id: 1, name: 'Starter Tier', code: 'PLAN-STARTER', price: '49.00', currency: 'USD', billing_interval: 'MONTHLY', trial_period_days: 14, is_active: true },
    { id: 2, name: 'Growth Tier', code: 'PLAN-GROWTH', price: '149.00', currency: 'USD', billing_interval: 'MONTHLY', trial_period_days: 14, is_active: true },
    { id: 3, name: 'Enterprise Tier', code: 'PLAN-ENTERPRISE', price: '499.00', currency: 'USD', billing_interval: 'YEARLY', trial_period_days: 30, is_active: true },
  ],
  subscriptions: [
    { id: 1, subscription_number: 'SUB-2026-001', customer_name: 'Acme Corporation', plan_name: 'Enterprise Tier', status: 'ACTIVE', start_date: '2026-01-15', renew_date: '2027-01-15', amount: '$499.00/yr' },
    { id: 2, subscription_number: 'SUB-2026-002', customer_name: 'Zenith Global', plan_name: 'Growth Tier', status: 'ACTIVE', start_date: '2026-02-01', renew_date: '2026-03-01', amount: '$149.00/mo' },
    { id: 3, subscription_number: 'SUB-2026-003', customer_name: 'Apex Studios', plan_name: 'Starter Tier', status: 'TRIALING', start_date: '2026-02-10', renew_date: '2026-02-24', amount: '$49.00/mo' },
    { id: 4, subscription_number: 'SUB-2026-004', customer_name: 'Hyperion Labs', plan_name: 'Growth Tier', status: 'PAST_DUE', start_date: '2025-11-20', renew_date: '2026-02-20', amount: '$149.00/mo' },
  ],
  customers: [
    { id: 1, username: 'acme_billing', name: 'Acme Corporation', contact: 'John Doe', email: 'john@acmecorp.com', tier: 'Enterprise', active_subs: 1 },
    { id: 2, username: 'zenith_ops', name: 'Zenith Global', contact: 'Alice Chen', email: 'alice@zenith.com', tier: 'Growth', active_subs: 2 },
    { id: 3, username: 'apex_studios', name: 'Apex Studios', contact: 'Marcus Vance', email: 'marcus@apex.io', tier: 'Starter', active_subs: 1 },
  ],
  quotations: [
    { id: 1, reference_number: 'QT-2026-089', customer_name: 'Quantum Dynamics', status: 'SENT', total_amount: '$1,850.00', valid_until: '2026-03-15' },
    { id: 2, reference_number: 'QT-2026-090', customer_name: 'Nexus Robotics', status: 'ACCEPTED', total_amount: '$5,400.00', valid_until: '2026-03-01' },
    { id: 3, reference_number: 'QT-2026-091', customer_name: 'Oasis Tech', status: 'DRAFT', total_amount: '$950.00', valid_until: '2026-03-30' },
  ],
  invoices: [
    { id: 1, invoice_number: 'INV-2026-104', customer_name: 'Acme Corporation', status: 'PAID', amount: '$499.00', due_date: '2026-01-20', paid_at: '2026-01-18' },
    { id: 2, invoice_number: 'INV-2026-105', customer_name: 'Zenith Global', status: 'PAID', amount: '$149.00', due_date: '2026-02-05', paid_at: '2026-02-04' },
    { id: 3, invoice_number: 'INV-2026-106', customer_name: 'Hyperion Labs', status: 'OPEN', amount: '$149.00', due_date: '2026-02-25', paid_at: null },
  ],
  discounts: [
    { id: 1, code: 'LAUNCH2026', name: 'Q1 Launch Promotion', discount_type: 'PERCENTAGE', value: '20%', redeemed_count: 42, is_active: true },
    { id: 2, code: 'STARTUP50', name: 'Startup Accelerator Credit', discount_type: 'FIXED_AMOUNT', value: '$50.00', redeemed_count: 15, is_active: true },
    { id: 3, code: 'EARLYBIRD', name: 'Early Adopter Special', discount_type: 'PERCENTAGE', value: '15%', redeemed_count: 89, is_active: false },
  ],
  payments: [
    { id: 1, transaction_id: 'TXN-9021-99A', customer_name: 'Acme Corporation', amount: '$499.00', method: 'STRIPE', status: 'COMPLETED', date: '2026-01-18' },
    { id: 2, transaction_id: 'TXN-9022-12B', customer_name: 'Zenith Global', amount: '$149.00', method: 'CREDIT_CARD', status: 'COMPLETED', date: '2026-02-04' },
    { id: 3, transaction_id: 'TXN-9023-45C', customer_name: 'Hyperion Labs', amount: '$149.00', method: 'STRIPE', status: 'FAILED', date: '2026-02-21' },
  ],
};
