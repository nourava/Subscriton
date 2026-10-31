import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { quotationService } from './services/quotationService';
import { FileSpreadsheet, Plus } from 'lucide-react';

export const QuotationsView = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    quotationService.list().then(setQuotations);
  }, []);

  return (
    <div>
      <PageHeader
        title="Quotations Engine"
        description="Generate, track, and convert sales quotes into active subscriptions."
        badge="Dev 3 Module"
        actions={<Button variant="primary" icon={<Plus size={16} />}>Create Quotation</Button>}
      />

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Quote #</th>
                <th style={{ padding: '0.75rem' }}>Client</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Total Amount</th>
                <th style={{ padding: '0.75rem' }}>Valid Until</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-primary)' }}>{q.reference_number}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{q.customer_name}</td>
                  <td style={{ padding: '0.75rem' }}><StatusBadge status={q.status} /></td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{q.total_amount}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{q.valid_until}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <Button variant="outline" size="sm">Manage</Button>
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
