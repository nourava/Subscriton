import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { discountService } from './services/discountService';
import { TicketPercent, Plus } from 'lucide-react';

export const DiscountsView = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    discountService.list().then(setDiscounts);
  }, []);

  return (
    <div>
      <PageHeader
        title="Discounts & Coupons"
        description="Promotional codes, percentage discounts, and fixed credits."
        badge="Dev 2 Module"
        actions={<Button variant="primary" icon={<Plus size={16} />}>New Promo Code</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {discounts.map((d) => (
          <Card key={d.id} title={d.name} subtitle={d.discount_type}>
            <div style={{ margin: '1rem 0' }}>
              <div style={{ display: 'inline-block', padding: '0.4rem 0.85rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px dashed var(--color-primary)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-family-mono)', fontWeight: 700, color: 'var(--color-primary)' }}>
                {d.code}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.75rem', color: 'var(--text-primary)' }}>
                {d.value} OFF
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <StatusBadge status={d.is_active ? 'ACTIVE' : 'EXPIRED'} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.redeemed_count} redemptions</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
