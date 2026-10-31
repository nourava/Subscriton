import React, { useState } from 'react';
import { useAuth, ROLES } from '../../core/auth/AuthContext';
import { Button } from '../../shared/components/Button/Button';
import { Input } from '../../shared/components/Input/Input';
import { Footer } from '../../shared/components/Footer/Footer';
import { Mail, Lock, ShieldCheck, UserCheck, Users } from 'lucide-react';
import './AuthLayout.css';

export const LoginView = ({ onNavigateRegister, onLoginSuccess }) => {
  const { switchRole } = useAuth();
  const [email, setEmail] = useState('admin@brightloop.io');
  const [password, setPassword] = useState('demo-password');

  const handleDemoSelect = (role, demoEmail) => {
    switchRole(role);
    setEmail(demoEmail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="bl-auth-page">
      <div className="bl-auth-container">
        <div className="bl-auth-card">
          <div className="bl-auth-logo-row">
            <div className="bl-auth-badge">BL</div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              Bright<span style={{ color: 'var(--color-primary)' }}>loop</span>
            </span>
          </div>

          <h2 className="bl-auth-title">
            Transforming Operations With <span style={{ color: 'var(--color-primary)' }}>Intelligent Billing</span>
          </h2>
          <p className="bl-auth-subtitle">
            Sign in to access your dashboard, invoices, and subscription plans.
          </p>

          {/* Instant Quick-Fill for Developers / Team Members */}
          <div className="bl-auth-demo-box">
            <span className="bl-auth-demo-label">⚡ Team Dev Quick-Fill</span>
            <div className="bl-auth-demo-btns">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleDemoSelect(ROLES.ADMIN, 'admin@brightloop.io')}
                icon={<ShieldCheck size={14} />}
              >
                Admin
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleDemoSelect(ROLES.STAFF, 'alex@brightloop.io')}
                icon={<UserCheck size={14} />}
              >
                Staff
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleDemoSelect(ROLES.CUSTOMER, 'billing@acmecorp.com')}
                icon={<Users size={14} />}
              >
                Customer
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              icon={<Mail size={16} />}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock size={16} />}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.825rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input type="checkbox" defaultChecked /> Remember session
              </label>
              <span className="bl-auth-link">Forgot password?</span>
            </div>

            <Button type="submit" variant="primary" size="lg" withArrow style={{ width: '100%' }}>
              Sign In to Brightloop
            </Button>
          </form>

          <div className="bl-auth-footer-links">
            Don't have an account?
            <span className="bl-auth-link" onClick={onNavigateRegister}>
              Create an account
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
