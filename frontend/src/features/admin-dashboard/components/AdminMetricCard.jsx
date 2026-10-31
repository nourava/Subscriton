import React from 'react';
import { Card } from '../../../shared/components/Card/Card';

export const AdminMetricCard = ({ title, value, change, icon: Icon, color = 'var(--color-primary)' }) => {
  return (
    <Card glass className="bl-metric-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-primary)' }}>
            {value}
          </div>
        </div>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-md)',
          background: `rgba(59, 130, 246, 0.1)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color
        }}>
          {Icon && <Icon size={22} />}
        </div>
      </div>
      {change && (
        <div style={{ marginTop: '0.85rem', fontSize: '0.775rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span>↑ {change}</span>
          <span style={{ color: 'var(--text-muted)' }}>vs previous month</span>
        </div>
      )}
    </Card>
  );
};
