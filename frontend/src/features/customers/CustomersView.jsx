import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { customerService } from './services/customerService';
import { Users, Plus, Mail } from 'lucide-react';

export const CustomersView = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    customerService.list().then(setCustomers);
  }, []);

  return (
    <div>
      <PageHeader
        title="Customer Management"
        description="Directory of client organizations, billing contacts, and subscription statuses."
        badge="Dev 1 Module"
        actions={<Button variant="primary" icon={<Plus size={16} />}>Add Customer</Button>}
      />

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Organization</th>
                <th style={{ padding: '0.75rem' }}>Contact</th>
                <th style={{ padding: '0.75rem' }}>Email</th>
                <th style={{ padding: '0.75rem' }}>Account Tier</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{c.name || c.company_name || c.username}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{c.contact || c.first_name || 'Primary Contact'}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Mail size={14} /> {c.email}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600 }}>
                      {c.tier || c.role || 'Client'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <Button variant="ghost" size="sm">View Profile</Button>
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
