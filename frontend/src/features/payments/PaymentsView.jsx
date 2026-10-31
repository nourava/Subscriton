import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { paymentService } from './services/paymentService';
import { CreditCard, RefreshCw } from 'lucide-react';

export const PaymentsView = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    paymentService.list().then(setPayments);
  }, []);

  return (
    <div>
      <PageHeader
        title="Payment Tracking & Gateway"
        description="Live transaction logs, gateway status (Stripe, ACH, Cards), and settlement records."
        badge="Dev 4 Module"
        actions={<Button variant="outline" icon={<RefreshCw size={16} />}>Sync Gateway</Button>}
      />

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Transaction ID</th>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Method</th>
                <th style={{ padding: '0.75rem' }}>Amount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Processed Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-primary)' }}>{p.transaction_id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{p.customer_name}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{p.method}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{p.amount}</td>
                  <td style={{ padding: '0.75rem' }}><StatusBadge status={p.status} /></td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
