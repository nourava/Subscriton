import React, { useState } from 'react';
import { AuthProvider, ROLES } from './core/auth/AuthContext';
import { ProtectedRoute } from './core/auth/ProtectedRoute';
import { Navbar } from './shared/components/Navbar/Navbar';
import { Sidebar } from './shared/components/Sidebar/Sidebar';

// Feature Views
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

function AppContent() {
  const [activeTab, setActiveTab] = useState('admin-dashboard');

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'admin-dashboard':
        return (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STAFF]}>
            <AdminDashboard />
          </ProtectedRoute>
        );
      case 'products':
        return <ProductsView />;
      case 'plans':
        return <PlansView />;
      case 'customers':
        return (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STAFF]}>
            <CustomersView />
          </ProtectedRoute>
        );
      case 'quotations':
        return <QuotationsView />;
      case 'subscriptions':
        return <SubscriptionsView />;
      case 'invoices':
        return <InvoicesView />;
      case 'discounts':
        return (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STAFF]}>
            <DiscountsView />
          </ProtectedRoute>
        );
      case 'payments':
        return <PaymentsView />;
      case 'analytics':
        return (
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AnalyticsView />
          </ProtectedRoute>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-app)' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
        <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', maxWidth: '1600px' }}>
          {renderActiveModule()}
        </main>
      </div>
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
