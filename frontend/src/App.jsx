import React, { useState } from 'react';
import { AuthProvider, ROLES } from './core/auth/AuthContext';
import { ProtectedRoute } from './core/auth/ProtectedRoute';
import { Navbar } from './shared/components/Navbar/Navbar';
import { Sidebar } from './shared/components/Sidebar/Sidebar';
import { Footer } from './shared/components/Footer/Footer';
import { Modal } from './shared/components/Modal/Modal';
import { Input, Select } from './shared/components/Input/Input';
import { Button } from './shared/components/Button/Button';

// Views
import { AdminDashboard } from './features/admin-dashboard';
import { ProductsView } from './features/products';
import { PlansView } from './features/plans';
import { CustomersView } from './features/customers';
import { QuotationsView } from './features/quotations';
import { SubscriptionsView } from './features/subscriptions';
import { InvoicesView } from './features/invoices';
import { DiscountsView } from './features/discounts';
import { PaymentsView } from './features/payments';
import { AnalyticsView } from './features/analytics';
import { LoginView } from './features/auth/LoginView';
import { RegisterView } from './features/auth/RegisterView';

function AppContent() {
  const [currentView, setCurrentView] = useState('app'); // 'app', 'login', 'register'
  const [activeTab, setActiveTab] = useState('admin-dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    title: '',
    category: 'Subscription',
    amount: '',
  });

  const handleModalSubmit = (e) => {
    e.preventDefault();
    alert(`Created ${modalForm.category}: ${modalForm.title || 'Untitled'}`);
    setIsModalOpen(false);
    setModalForm({ title: '', category: 'Subscription', amount: '' });
  };

  if (currentView === 'login') {
    return (
      <LoginView
        onNavigateRegister={() => setCurrentView('register')}
        onLoginSuccess={() => setCurrentView('app')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterView
        onNavigateLogin={() => setCurrentView('login')}
        onRegisterSuccess={() => setCurrentView('app')}
      />
    );
  }

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'admin-dashboard':
        return (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STAFF]}>
            <AdminDashboard onOpenCreateModal={() => setIsModalOpen(true)} />
          </ProtectedRoute>
        );
      case 'products':
        return <ProductsView onOpenCreateModal={() => setIsModalOpen(true)} />;
      case 'plans':
        return <PlansView onOpenCreateModal={() => setIsModalOpen(true)} />;
      case 'customers':
        return (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STAFF]}>
            <CustomersView onOpenCreateModal={() => setIsModalOpen(true)} />
          </ProtectedRoute>
        );
      case 'quotations':
        return <QuotationsView onOpenCreateModal={() => setIsModalOpen(true)} />;
      case 'subscriptions':
        return <SubscriptionsView onOpenCreateModal={() => setIsModalOpen(true)} />;
      case 'invoices':
        return <InvoicesView onOpenCreateModal={() => setIsModalOpen(true)} />;
      case 'discounts':
        return (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STAFF]}>
            <DiscountsView onOpenCreateModal={() => setIsModalOpen(true)} />
          </ProtectedRoute>
        );
      case 'payments':
        return <PaymentsView onOpenCreateModal={() => setIsModalOpen(true)} />;
      case 'analytics':
        return (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AnalyticsView />
          </ProtectedRoute>
        );
      default:
        return <AdminDashboard onOpenCreateModal={() => setIsModalOpen(true)} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-app)' }}>
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenQuickAction={() => setIsModalOpen(true)}
      />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
        <main style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto', maxWidth: '1600px' }}>
          {renderActiveModule()}
        </main>
      </div>
      <Footer />

      {/* Shared Reusable Modal from Reference */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Operational Record"
        subtitle="Shared modal component available across all four developer modules."
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" withArrow onClick={handleModalSubmit}>
              Save & Activate
            </Button>
          </>
        }
      >
        <form onSubmit={handleModalSubmit}>
          <Select
            label="Module / Record Type"
            value={modalForm.category}
            onChange={(e) => setModalForm({ ...modalForm, category: e.target.value })}
            options={[
              { value: 'Subscription', label: 'Subscription Contract (Dev 3)' },
              { value: 'Product', label: 'Product Catalog Item (Dev 2)' },
              { value: 'Plan', label: 'Subscription Tier / Plan (Dev 2)' },
              { value: 'Quotation', label: 'Sales Quotation (Dev 3)' },
              { value: 'Invoice', label: 'Customer Invoice (Dev 4)' },
              { value: 'Discount', label: 'Promo Code / Discount (Dev 2)' },
            ]}
          />
          <Input
            label="Record Name / Reference"
            placeholder="e.g. Enterprise Tier Q1 or SUB-2026-X"
            value={modalForm.title}
            onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
            required
          />
          <Input
            label="Contract Amount / Price ($)"
            type="number"
            placeholder="499.00"
            value={modalForm.amount}
            onChange={(e) => setModalForm({ ...modalForm, amount: e.target.value })}
          />
        </form>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
