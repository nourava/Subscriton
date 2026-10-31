import React from 'react';
import './StatusBadge.css';

export const StatusBadge = ({ status = 'ACTIVE', label }) => {
  const normalized = String(status).toUpperCase();

  const getVariant = (s) => {
    switch (s) {
      case 'ACTIVE':
      case 'PAID':
      case 'ACCEPTED':
      case 'COMPLETED':
        return 'success';
      case 'TRIALING':
      case 'PENDING':
      case 'OPEN':
      case 'SENT':
        return 'warning';
      case 'PAST_DUE':
      case 'FAILED':
      case 'REJECTED':
      case 'UNCOLLECTIBLE':
        return 'danger';
      case 'CANCELED':
      case 'VOID':
      case 'EXPIRED':
      case 'PAUSED':
        return 'neutral';
      default:
        return 'info';
    }
  };

  const variant = getVariant(normalized);

  return (
    <span className={`bl-badge bl-badge--${variant}`}>
      <span className="bl-badge__dot"></span>
      {label || normalized}
    </span>
  );
};
