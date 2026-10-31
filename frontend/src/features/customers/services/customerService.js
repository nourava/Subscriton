import { apiClient } from '../../../shared/services/apiClient';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { STARTER_MOCKS } from '../../../shared/models/types';

export const customerService = {
  async list() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.AUTH.USERS);
      return res.results || res;
    } catch {
      return STARTER_MOCKS.customers;
    }
  }
};
