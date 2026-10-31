import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { analyticsService } from './services/analyticsService';
import { BarChart3, TrendingUp, Users, DollarSign, Download } from 'lucide-react';

export const AnalyticsView = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    analyticsService.getMetrics().then(setMetrics);
  }, []);

  return (
    <div>
      <PageHeader
        title="Financial & Subscription Analytics"
        description="Comprehensive metrics covering cohort retention, churn rates, MRR velocity, and cash flow."
        badge="Dev 1 Module"
        actions={<Button variant="outline" icon={<Download size={16} />}>Export Financial Report</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <Card>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Average Revenue Per User (ARPU)</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-primary)' }}>$141.08</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Estimated Customer Lifetime Value</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--color-success)' }}>$3,850</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Monthly Logo Churn Rate</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--color-primary)' }}>1.2%</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Net Revenue Retention (NRR)</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--color-accent)' }}>118%</div>
        </Card>
      </div>

      <Card title="Revenue Growth Projections" subtitle="Orchestrated based on active contracts and planned renewals">
        <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', padding: '1.5rem 0 0.5rem' }}>
          {[
            { month: 'Oct', val: 60, amount: '$42k' },
            { month: 'Nov', val: 72, amount: '$45k' },
            { month: 'Dec', val: 80, amount: '$46k' },
            { month: 'Jan', val: 88, amount: '$47k' },
            { month: 'Feb', val: 95, amount: '$48.2k' },
            { month: 'Mar (Proj)', val: 100, amount: '$52k' },
          ].map((bar) => (
            <div key={bar.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>{bar.amount}</span>
              <div style={{
                width: '100%',
                maxWidth: '48px',
                height: `${bar.val}%`,
                background: 'linear-gradient(180deg, var(--color-primary), var(--color-accent))',
                borderRadius: '4px 4px 0 0',
                opacity: bar.month.includes('Proj') ? 0.6 : 1
              }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{bar.month}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
