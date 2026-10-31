import React from 'react';
import { useAuth, ROLES } from '../../../core/auth/AuthContext';
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
  Code2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import './Sidebar.css';

export const ADMIN_NAV = [
  { id: 'admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard, owner: 'Dev 1 / Lead' },
  { id: 'products', label: 'Products', icon: Package, owner: 'Dev 2' },
  { id: 'plans', label: 'Plans', icon: Layers, owner: 'Dev 2' },
  { id: 'customers', label: 'Customers', icon: Users, owner: 'Dev 1' },
  { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet, owner: 'Dev 3' },
  { id: 'subscriptions', label: 'Subscriptions', icon: Repeat, owner: 'Dev 3' },
  { id: 'invoices', label: 'Invoices', icon: Receipt, owner: 'Dev 4' },
  { id: 'discounts', label: 'Discounts', icon: TicketPercent, owner: 'Dev 2' },
  { id: 'payments', label: 'Payments', icon: CreditCard, owner: 'Dev 4' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, owner: 'Dev 1' },
];

export const STAFF_NAV = [
  { id: 'admin-dashboard', label: 'Operations Hub', icon: LayoutDashboard },
  { id: 'products', label: 'Product Catalog', icon: Package },
  { id: 'plans', label: 'Subscription Plans', icon: Layers },
  { id: 'customers', label: 'Customer Directory', icon: Users },
  { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet },
  { id: 'subscriptions', label: 'Subscriptions', icon: Repeat },
  { id: 'invoices', label: 'Invoices & Billing', icon: Receipt },
  { id: 'payments', label: 'Payments Tracking', icon: CreditCard },
];

export const CUSTOMER_NAV = [
  { id: 'subscriptions', label: 'My Subscriptions', icon: Repeat },
  { id: 'plans', label: 'Browse Plans & Upgrade', icon: Layers },
  { id: 'invoices', label: 'Invoices & Receipts', icon: Receipt },
  { id: 'payments', label: 'Billing & Payments', icon: CreditCard },
  { id: 'quotations', label: 'My Quotations', icon: FileSpreadsheet },
];

export const Sidebar = ({ activeTab, onSelectTab }) => {
  const { currentRole } = useAuth();

  let navItems = ADMIN_NAV;
  let layoutTitle = "ADMINISTRATION";

  if (currentRole === ROLES.STAFF) {
    navItems = STAFF_NAV;
    layoutTitle = "STAFF OPERATIONS";
  } else if (currentRole === ROLES.CUSTOMER) {
    navItems = CUSTOMER_NAV;
    layoutTitle = "CUSTOMER PORTAL";
  }

  return (
    <aside className="bl-sidebar">
      <div className="bl-sidebar__header">
        <span className="bl-sidebar__role-tag">{layoutTitle}</span>
      </div>

      <nav className="bl-sidebar__nav">
        {navItems.map((item) => {
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
              {item.owner && <span className="bl-sidebar__owner">{item.owner}</span>}
              <ArrowRight size={14} className="bl-sidebar__hover-arrow" />
            </button>
          );
        })}
      </nav>

      {/* Featured Micro-Card in Sidebar (Inspired by reference deep navy card) */}
      <div className="bl-sidebar__promo">
        <div className="bl-sidebar__promo-card">
          <div className="bl-sidebar__promo-badge">Design System</div>
          <h4 className="bl-sidebar__promo-title">NorthSee Visual Identity</h4>
          <p className="bl-sidebar__promo-desc">
            Electric Cobalt buttons, deep navy cards, and pill components shared across all 4 developers.
          </p>
        </div>
      </div>
    </aside>
  );
};
