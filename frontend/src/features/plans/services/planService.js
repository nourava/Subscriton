import { apiClient } from '../../../shared/services/apiClient';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { STARTER_MOCKS } from '../../../shared/models/types';

export const planService = {
  async list() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.PLANS);
      return res.results || res;
    } catch {
      return STARTER_MOCKS.plans;
    }
  }
};
