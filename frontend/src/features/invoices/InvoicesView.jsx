import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { invoiceService } from './services/invoiceService';
import { Receipt, Plus, Download } from 'lucide-react';

export const InvoicesView = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    invoiceService.list().then(setInvoices);
  }, []);

  return (
    <div>
      <PageHeader
        title="Invoices & Billing"
        description="Automated invoice generation, tax calculations, and accounts receivable tracking."
        badge="Dev 4 Module"
        actions={<Button variant="primary" icon={<Plus size={16} />}>Generate Invoice</Button>}
      />

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Invoice #</th>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Amount</th>
                <th style={{ padding: '0.75rem' }}>Due Date</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-primary)' }}>{inv.invoice_number}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{inv.customer_name}</td>
                  <td style={{ padding: '0.75rem' }}><StatusBadge status={inv.status} /></td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{inv.amount}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{inv.due_date}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <Button variant="ghost" size="sm" icon={<Download size={14} />}>PDF</Button>
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
