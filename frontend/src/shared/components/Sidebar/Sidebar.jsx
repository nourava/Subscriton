import React from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  FileSpreadsheet,
  Repeat,
  Receipt,
  TicketPercent,
  CreditCard,
  BarChart3,
  Code2
} from 'lucide-react';
import './Sidebar.css';

export const NAVIGATION_ITEMS = [
  { id: 'admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard, owner: 'Dev 1 / Lead' },
  { id: 'products', label: 'Products', icon: Package, owner: 'Dev 2' },
  { id: 'plans', label: 'Plans', icon: Layers, owner: 'Dev 2' },
  { id: 'customers', label: 'Customers', icon: Users, owner: 'Dev 1 / Lead' },
  { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet, owner: 'Dev 3' },
  { id: 'subscriptions', label: 'Subscriptions', icon: Repeat, owner: 'Dev 3' },
  { id: 'invoices', label: 'Invoices', icon: Receipt, owner: 'Dev 4' },
  { id: 'discounts', label: 'Discounts', icon: TicketPercent, owner: 'Dev 2' },
  { id: 'payments', label: 'Payments', icon: CreditCard, owner: 'Dev 4' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, owner: 'Dev 1 / Lead' },
];

export const Sidebar = ({ activeTab, onSelectTab }) => {
  return (
    <aside className="bl-sidebar">
      <div className="bl-sidebar__section-title">SYSTEM MODULES</div>
      <nav className="bl-sidebar__nav">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`bl-sidebar__item ${isActive ? 'bl-sidebar__item--active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              <Icon size={18} className="bl-sidebar__icon" />
              <span className="bl-sidebar__label">{item.label}</span>
              <span className="bl-sidebar__owner">{item.owner}</span>
            </button>
          );
        })}
      </nav>

      <div className="bl-sidebar__footer">
        <div className="bl-sidebar__footer-card">
          <div className="bl-sidebar__footer-header">
            <Code2 size={16} />
            <span>Multi-Dev Team</span>
          </div>
          <p className="bl-sidebar__footer-text">
            4 independent developers working on 1 shared repository and PostgreSQL schema.
          </p>
        </div>
      </div>
    </aside>
  );
};
