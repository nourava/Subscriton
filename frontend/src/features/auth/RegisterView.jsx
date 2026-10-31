import React, { useState } from 'react';
import { Button } from '../../shared/components/Button/Button';
import { Input, Select } from '../../shared/components/Input/Input';
import { Footer } from '../../shared/components/Footer/Footer';
import { Mail, Lock, User, Building } from 'lucide-react';
import './AuthLayout.css';

export const RegisterView = ({ onNavigateLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'CUSTOMER',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegisterSuccess) onRegisterSuccess();
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
            Start Your <span style={{ color: 'var(--color-primary)' }}>Brightloop Journey</span>
          </h2>
          <p className="bl-auth-subtitle">
            Create an organization account to manage products, quotes, and subscriptions.
          </p>

          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Sarah Connor"
              icon={<User size={16} />}
              required
            />
            <Input
              label="Company / Organization"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Global Inc"
              icon={<Building size={16} />}
              required
            />
            <Input
              label="Work Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sarah@acme.com"
              icon={<Mail size={16} />}
              required
            />
            <Select
              label="Account Type"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: 'CUSTOMER', label: 'Customer / Client Portal' },
                { value: 'STAFF', label: 'Internal Staff Member' },
                { value: 'ADMIN', label: 'System Administrator' },
              ]}
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              icon={<Lock size={16} />}
              required
            />

            <Button type="submit" variant="primary" size="lg" withArrow style={{ width: '100%', marginTop: '0.75rem' }}>
              Create Brightloop Account
            </Button>
          </form>

          <div className="bl-auth-footer-links">
            Already registered?
            <span className="bl-auth-link" onClick={onNavigateLogin}>
              Sign in here
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
