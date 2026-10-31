import React, { useState, useEffect } from 'react';
import { useAuth, ROLES } from '../../../core/auth/AuthContext';
import { apiClient } from '../../services/apiClient';
import { Activity, ShieldCheck, UserCheck, Users, RefreshCw } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const { user, currentRole, switchRole } = useAuth();
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true });

  const checkHealth = async () => {
    setBackendStatus((prev) => ({ ...prev, checking: true }));
    const status = await apiClient.checkBackendHealth();
    setBackendStatus({ online: status.online, checking: false, details: status.data });
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bl-navbar">
      <div className="bl-navbar__brand">
        <div className="bl-navbar__logo">BL</div>
        <div>
          <span className="bl-navbar__title">Brightloop</span>
          <span className="bl-navbar__tag">Subscription Engine</span>
        </div>
      </div>

      <div className="bl-navbar__actions">
        {/* Backend Connectivity Status Indicator */}
        <div className="bl-navbar__status" onClick={checkHealth} title="Click to test Django backend connectivity">
          <span
            className={`bl-navbar__status-indicator ${
              backendStatus.online ? 'bl-navbar__status-indicator--online' : 'bl-navbar__status-indicator--offline'
            }`}
          />
          <span className="bl-navbar__status-label">
            {backendStatus.checking
              ? 'Checking API...'
              : backendStatus.online
              ? 'API Online (Django 6.x)'
              : 'Backend Standby (Port 8000)'}
          </span>
          <RefreshCw size={13} className={`bl-navbar__status-refresh ${backendStatus.checking ? 'spin' : ''}`} />
        </div>

        {/* Role Switcher for Developers */}
        <div className="bl-navbar__role-selector">
          <span className="bl-navbar__role-label">Preview Role:</span>
          <div className="bl-navbar__role-pills">
            <button
              type="button"
              className={`bl-role-pill ${currentRole === ROLES.ADMIN ? 'bl-role-pill--active' : ''}`}
              onClick={() => switchRole(ROLES.ADMIN)}
              title="Admin role (full permissions)"
            >
              <ShieldCheck size={14} /> Admin
            </button>
            <button
              type="button"
              className={`bl-role-pill ${currentRole === ROLES.STAFF ? 'bl-role-pill--active' : ''}`}
              onClick={() => switchRole(ROLES.STAFF)}
              title="Staff role (operational access)"
            >
              <UserCheck size={14} /> Staff
            </button>
            <button
              type="button"
              className={`bl-role-pill ${currentRole === ROLES.CUSTOMER ? 'bl-role-pill--active' : ''}`}
              onClick={() => switchRole(ROLES.CUSTOMER)}
              title="Customer role (client portal view)"
            >
              <Users size={14} /> Customer
            </button>
          </div>
        </div>

        {/* Active User Avatar */}
        <div className="bl-navbar__user">
          <div className="bl-navbar__avatar">{user?.name ? user.name[0] : 'U'}</div>
          <div className="bl-navbar__user-details">
            <span className="bl-navbar__user-name">{user?.name}</span>
            <span className="bl-navbar__user-role">{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
