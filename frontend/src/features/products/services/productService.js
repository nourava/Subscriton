import { apiClient } from '../../../shared/services/apiClient';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { STARTER_MOCKS } from '../../../shared/models/types';

export const productService = {
  async list() {
    try {
      const res = await apiClient.get(API_ENDPOINTS.PRODUCTS);
      return res.results || res;
    } catch {
      return STARTER_MOCKS.products;
    }
  }
};
