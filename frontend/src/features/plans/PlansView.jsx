import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { planService } from './services/planService';
import { Check, Plus } from 'lucide-react';

export const PlansView = ({ onOpenCreateModal }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    planService.list().then(setPlans);
  }, []);

  return (
    <div>
      <PageHeader
        title="Subscription"
        accentWord="Plans & Pricing"
        description="Configure tier structures, recurring billing cycles (Monthly / Yearly), and feature entitlements."
        badge="Dev 2 Module"
        actions={
          <Button variant="primary" size="md" withArrow onClick={onOpenCreateModal}>
            Create New Plan
          </Button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {plans.map((plan, index) => {
          const isFeatured = index === 1; // Highlight Growth plan with Navy card
          return (
            <Card
              key={plan.id}
              variant={isFeatured ? 'navy' : 'interactive'}
              title={plan.name}
              subtitle={plan.code}
              withArrow
            >
              <div style={{ margin: '1.5rem 0' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  ${plan.price}
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: isFeatured ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}>
                    /{plan.billing_interval?.toLowerCase()}
                  </span>
                </div>
                <div style={{ fontSize: '0.825rem', fontWeight: 600, color: isFeatured ? '#93c5fd' : 'var(--color-primary)', marginTop: '0.5rem' }}>
                  {plan.trial_period_days}-day complimentary trial included
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '1.5rem 0', paddingTop: '1.25rem', borderTop: isFeatured ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border-subtle)' }}>
                {['Multi-currency billing', 'Custom webhooks & API access', 'Dedicated SLA & support'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <Check size={16} color={isFeatured ? '#93c5fd' : 'var(--color-primary)'} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <StatusBadge status={plan.is_active ? 'ACTIVE' : 'VOID'} />
                <Button variant={isFeatured ? 'secondary' : 'primary'} size="sm" withArrow>
                  Select Plan
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
