import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { AdminMetricCard } from './components/AdminMetricCard';
import { adminService } from './services/adminService';
import { STARTER_MOCKS } from '../../shared/models/types';
import { DollarSign, Repeat, Users, Receipt, TrendingUp, AlertTriangle } from 'lucide-react';

export const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    adminService.getDashboardSummary().then((res) => setSummary(res.metrics));
  }, []);

  return (
    <div>
      <PageHeader
        title="Operations Control Hub"
        description="Centralized command center for Brightloop subscription metrics, revenue, and customer lifecycle."
        actions={
          <>
            <Button variant="outline" size="sm">Export Report</Button>
            <Button variant="primary" size="sm">Create Subscription</Button>
          </>
        }
      />

      {/* KPI Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <AdminMetricCard
          title="Monthly Recurring Revenue"
          value={summary ? `$${summary.mrr?.toLocaleString()}` : '$48,250'}
          change="+8.4%"
          icon={DollarSign}
        />
        <AdminMetricCard
          title="Active Subscriptions"
          value={summary ? summary.active_subscriptions : '342'}
          change="+12"
          icon={Repeat}
          color="var(--color-accent)"
        />
        <AdminMetricCard
          title="Active Customer Base"
          value={summary ? summary.active_customers : '289'}
          change="+5.1%"
          icon={Users}
          color="var(--color-info)"
        />
        <AdminMetricCard
          title="Annual Run Rate (ARR)"
          value={summary ? `$${summary.arr?.toLocaleString()}` : '$579,000'}
          change="+14.2%"
          icon={TrendingUp}
          color="var(--color-success)"
        />
      </div>

      {/* Operational Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card title="Recent Subscriptions Lifecycle" subtitle="Live subscription health across all customer accounts">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Reference</th>
                  <th style={{ padding: '0.75rem' }}>Customer</th>
                  <th style={{ padding: '0.75rem' }}>Plan</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Billing</th>
                </tr>
              </thead>
              <tbody>
                {STARTER_MOCKS.subscriptions.map((sub) => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-primary)' }}>{sub.subscription_number}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{sub.customer_name}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{sub.plan_name}</td>
                    <td style={{ padding: '0.75rem' }}><StatusBadge status={sub.status} /></td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{sub.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Module Status & Dev Ownership" subtitle="4-developer modular architecture foundation">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontSize: '0.85rem' }}>Dev 1 / Team Lead:</strong>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.775rem', marginTop: '0.2rem' }}>
                Admin Dashboard, Customers, Analytics, Core Architecture
              </div>
            </div>
            <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontSize: '0.85rem' }}>Dev 2:</strong>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.775rem', marginTop: '0.2rem' }}>
                Products Catalog, Subscription Plans, Discounts & Coupons
              </div>
            </div>
            <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontSize: '0.85rem' }}>Dev 3:</strong>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.775rem', marginTop: '0.2rem' }}>
                Quotations Engine, Subscription Lifecycle Management
              </div>
            </div>
            <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontSize: '0.85rem' }}>Dev 4:</strong>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.775rem', marginTop: '0.2rem' }}>
                Invoices Generation, Payments Processing & Reconciliation
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
