import React from 'react';
import { useAuth } from './useAuth';

export const ProtectedRoute = ({ allowedRoles = [], fallback = null, children }) => {
  const { user, hasRole } = useAuth();

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Authentication Required</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Please log in to access this section.</p>
      </div>
    );
  }

  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return fallback || (
      <div style={{
        padding: '2.5rem',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        textAlign: 'center'
      }}>
        <h3 style={{ color: 'var(--color-danger)', marginBottom: '0.5rem' }}>Access Restricted</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          This feature requires <strong>{allowedRoles.join(' or ')}</strong> privileges.
          Your active role is <strong>{user.role}</strong>. Use the role switcher in the header to preview this view.
        </p>
      </div>
    );
  }

  return children;
};
