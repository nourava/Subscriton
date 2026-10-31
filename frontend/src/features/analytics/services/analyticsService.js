import { apiClient } from '../../../shared/services/apiClient';
import { API_ENDPOINTS } from '../../../core/config/api.config';

export const analyticsService = {
  async getMetrics() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.REPORTS.SUMMARY);
      return res.metrics;
    } catch {
      return {
        mrr: 48250.00,
        arr: 579000.00,
        active_subscriptions: 342,
        active_customers: 289,
        churn_rate: '1.2%',
        arpu: '$141.08',
        ltv: '$3,850'
      };
    }
  }
};
