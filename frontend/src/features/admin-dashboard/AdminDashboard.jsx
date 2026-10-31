import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { Table } from '../../shared/components/Table/Table';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { adminService } from './services/adminService';
import { STARTER_MOCKS } from '../../shared/models/types';
import { DollarSign, Repeat, Users, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';

export const AdminDashboard = ({ onOpenCreateModal }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    adminService.getDashboardSummary().then((res) => setSummary(res.metrics));
  }, []);

  const columns = [
    {
      header: 'Reference',
      accessor: 'subscription_number',
      render: (row) => (
        <span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 700, color: 'var(--color-primary)' }}>
          {row.subscription_number}
        </span>
      ),
    },
    { header: 'Customer', accessor: 'customer_name' },
    { header: 'Plan Tier', accessor: 'plan_name' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (row) => <strong>{row.amount}</strong>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Transforming Operations With"
        accentWord="Intelligent Digital Solutions"
        description="Centralized command center for Brightloop subscription metrics, revenue run-rates, and lifecycle orchestration."
        badge="Enterprise Control"
        actions={
          <>
            <Button variant="secondary" size="md">Export Data</Button>
            <Button variant="primary" size="md" withArrow onClick={onOpenCreateModal}>
              Start New Contract
            </Button>
          </>
        }
      />

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <Card variant="default">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Monthly Recurring Revenue</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {summary ? `$${summary.mrr?.toLocaleString()}` : '$48,250'}
              </div>
            </div>
            <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <DollarSign size={20} />
            </span>
          </div>
          <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
            ↑ +8.4% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>from last month</span>
          </div>
        </Card>

        {/* Featured Deep Navy Card from Reference */}
        <Card variant="navy" withArrow>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.825rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Annual Run Rate (ARR)</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                {summary ? `$${summary.arr?.toLocaleString()}` : '$579,000'}
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', marginTop: '0.85rem', lineHeight: 1.4 }}>
            Accelerating enterprise subscription velocity across all business units.
          </p>
        </Card>

        <Card variant="default">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Subscriptions</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {summary ? summary.active_subscriptions : '342'}
              </div>
            </div>
            <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-info-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-info)' }}>
              <Repeat size={20} />
            </span>
          </div>
          <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: 'var(--color-info)', fontWeight: 600 }}>
            98.8% retention rate
          </div>
        </Card>

        <Card variant="default">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Client Organizations</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {summary ? summary.active_customers : '289'}
              </div>
            </div>
            <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
              <Users size={20} />
            </span>
          </div>
          <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
            +18 added this quarter
          </div>
        </Card>
      </div>

      {/* Main Table & Architecture Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Recent Active <span style={{ color: 'var(--color-primary)' }}>Subscriptions</span>
            </h3>
            <Button variant="ghost" size="sm" withArrow>View All</Button>
          </div>
          <Table columns={columns} data={STARTER_MOCKS.subscriptions} />
        </div>

        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            4-Developer <span style={{ color: 'var(--color-primary)' }}>Module Map</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { dev: 'Dev 1 (Team Leader)', modules: 'Admin Dashboard, Customers, Analytics, Auth & DB Core' },
              { dev: 'Dev 2', modules: 'Product Catalog, Subscription Pricing Plans, Discounts' },
              { dev: 'Dev 3', modules: 'Sales Quotations Engine, Subscription Contracts Lifecycle' },
              { dev: 'Dev 4', modules: 'Invoices Generation, Billing Runs, Payment Gateway Integration' },
            ].map((d, i) => (
              <Card key={i} variant="interactive" style={{ padding: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{d.dev}</strong>
                  <ArrowUpRight size={16} color="var(--color-primary)" />
                </div>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  {d.modules}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
