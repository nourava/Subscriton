import React, { useState, useEffect } from 'react';
import { useAuth, ROLES } from '../../../core/auth/AuthContext';
import { apiClient } from '../../services/apiClient';
import { ShieldCheck, UserCheck, Users, RefreshCw, Plus } from 'lucide-react';
import { Button } from '../Button/Button';
import './Navbar.css';

export const Navbar = ({ onOpenQuickAction, currentView, onViewChange }) => {
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
      {/* Brand Wordmark inspired by reference logo */}
      <div className="bl-navbar__brand" onClick={() => onViewChange && onViewChange('app')}>
        <div className="bl-navbar__logo-badge">BL</div>
        <div className="bl-navbar__brand-text">
          <span className="bl-navbar__title">Bright<span className="bl-title-blue">loop</span></span>
          <span className="bl-navbar__tag">Subscription Engine</span>
        </div>
      </div>

      {/* Center Role Navigation Pill */}
      <div className="bl-navbar__center">
        <div className="bl-navbar__role-pills">
          <button
            type="button"
            className={`bl-role-pill ${currentRole === ROLES.ADMIN ? 'bl-role-pill--active' : ''}`}
            onClick={() => switchRole(ROLES.ADMIN)}
          >
            <ShieldCheck size={14} /> Admin
          </button>
          <button
            type="button"
            className={`bl-role-pill ${currentRole === ROLES.STAFF ? 'bl-role-pill--active' : ''}`}
            onClick={() => switchRole(ROLES.STAFF)}
          >
            <UserCheck size={14} /> Staff
          </button>
          <button
            type="button"
            className={`bl-role-pill ${currentRole === ROLES.CUSTOMER ? 'bl-role-pill--active' : ''}`}
            onClick={() => switchRole(ROLES.CUSTOMER)}
          >
            <Users size={14} /> Customer
          </button>
        </div>

        {/* View mode toggle (App vs Login/Register) */}
        <div className="bl-navbar__view-links">
          <button
            type="button"
            className={`bl-view-link ${currentView === 'app' ? 'bl-view-link--active' : ''}`}
            onClick={() => onViewChange && onViewChange('app')}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`bl-view-link ${currentView === 'login' ? 'bl-view-link--active' : ''}`}
            onClick={() => onViewChange && onViewChange('login')}
          >
            Login View
          </button>
          <button
            type="button"
            className={`bl-view-link ${currentView === 'register' ? 'bl-view-link--active' : ''}`}
            onClick={() => onViewChange && onViewChange('register')}
          >
            Register View
          </button>
        </div>
      </div>

      {/* Right Actions */}
      <div className="bl-navbar__actions">
        {/* Backend Connectivity Status */}
        <div className="bl-navbar__status" onClick={checkHealth} title="Click to test Django backend connectivity">
          <span
            className={`bl-navbar__status-dot ${
              backendStatus.online ? 'bl-navbar__status-dot--online' : 'bl-navbar__status-dot--offline'
            }`}
          />
          <span className="bl-navbar__status-label">
            {backendStatus.checking ? 'Connecting...' : backendStatus.online ? 'Django API Live' : 'Offline Mode'}
          </span>
          <RefreshCw size={12} className={`bl-navbar__status-refresh ${backendStatus.checking ? 'spin' : ''}`} />
        </div>

        {/* Signature Primary Button with Arrow from Reference */}
        <Button variant="primary" size="sm" withArrow onClick={onOpenQuickAction}>
          Create New
        </Button>

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
