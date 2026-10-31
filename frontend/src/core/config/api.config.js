/**
 * API configuration and centralized endpoint definitions.
 * Configured to seamlessly connect with Django REST Framework backend.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health/`,
  AUTH: {
    ME: `${API_BASE_URL}/auth/me/`,
    USERS: `${API_BASE_URL}/auth/users/`,
  },
  PRODUCTS: `${API_BASE_URL}/products/`,
  PLANS: `${API_BASE_URL}/plans/`,
  QUOTATIONS: `${API_BASE_URL}/quotations/`,
  SUBSCRIPTIONS: `${API_BASE_URL}/subscriptions/`,
  INVOICES: `${API_BASE_URL}/invoices/`,
  DISCOUNTS: `${API_BASE_URL}/discounts/`,
  PAYMENTS: `${API_BASE_URL}/payments/`,
  REPORTS: {
    SUMMARY: `${API_BASE_URL}/reports/summary/`,
  },
};
