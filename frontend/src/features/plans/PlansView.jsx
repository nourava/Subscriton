import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../shared/components/PageHeader/PageHeader';
import { Card } from '../../shared/components/Card/Card';
import { Button } from '../../shared/components/Button/Button';
import { StatusBadge } from '../../shared/components/StatusBadge/StatusBadge';
import { planService } from './services/planService';
import { Layers, Plus, Check } from 'lucide-react';

export const PlansView = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    planService.list().then(setPlans);
  }, []);

  return (
    <div>
      <PageHeader
        title="Subscription Plans"
        description="Configure tier structures, billing cycles (Monthly/Yearly), and feature entitlements."
        badge="Dev 2 Module"
        actions={<Button variant="primary" icon={<Plus size={16} />}>Create Plan</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {plans.map((plan) => (
          <Card key={plan.id} title={plan.name} subtitle={plan.code}>
            <div style={{ margin: '1.25rem 0' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ${plan.price}
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/{plan.billing_interval?.toLowerCase()}</span>
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--color-info)', marginTop: '0.25rem' }}>
                {plan.trial_period_days}-day free trial included
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <StatusBadge status={plan.is_active ? 'ACTIVE' : 'VOID'} />
              <Button variant="outline" size="sm">Edit Plan</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
