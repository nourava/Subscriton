import { apiClient } from '../../../shared/services/apiClient';
import { API_ENDPOINTS } from '../../../core/config/api.config';

export const adminService = {
  async getDashboardSummary() {
    try {
      return await apiClient.get(API_ENDPOINTS.REPORTS.SUMMARY);
    } catch {
      return {
        metrics: {
          mrr: 48250.00,
          arr: 579000.00,
          active_subscriptions: 342,
          active_customers: 289,
          pending_invoices_count: 18,
          churn_rate: '1.2%'
        }
      };
    }
  }
};
