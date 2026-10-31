import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { subscriptionService } from './services/subscriptionService';
import { Repeat, Plus } from 'lucide-react';

export const SubscriptionsView = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    subscriptionService.list().then(setSubscriptions);
  }, []);

  return (
    <div>
      <PageHeader
        title="Subscription Management"
        description="Monitor lifecycle transitions (Active, Trial, Past Due, Canceled) and renewals."
        badge="Dev 3 Module"
        actions={<Button variant="primary" icon={<Plus size={16} />}>New Subscription</Button>}
      />

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Subscription #</th>
                <th style={{ padding: '0.75rem' }}>Client</th>
                <th style={{ padding: '0.75rem' }}>Plan</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Renewal Date</th>
                <th style={{ padding: '0.75rem' }}>Amount</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-primary)' }}>{s.subscription_number}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{s.customer_name}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{s.plan_name}</td>
                  <td style={{ padding: '0.75rem' }}><StatusBadge status={s.status} /></td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{s.renew_date || s.current_period_end}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{s.amount}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <Button variant="ghost" size="sm">Lifecycle Actions</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
