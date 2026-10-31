import { apiClient } from '../../../shared/services/apiClient';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { STARTER_MOCKS } from '../../../shared/models/types';

export const invoiceService = {
  async list() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.INVOICES);
      return res.results || res;
    } catch {
      return STARTER_MOCKS.invoices;
    }
  }
};
