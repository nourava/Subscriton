import { API_BASE_URL, API_ENDPOINTS } from '../../core/config/api.config';

/**
 * Standard API client for communication with Django REST Framework backend.
 */
export const apiClient = {
  /**
   * Universal fetch wrapper with authorization and JSON parsing.
   */
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('brightloop_token');
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(endpoint, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.detail || errorData.message || `HTTP error ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      // Handle 204 No Content
      if (response.status === 204) return null;

      return await response.json();
    } catch (err) {
      console.warn(`[apiClient] Request failed for ${endpoint}:`, err.message);
      throw err;
    }
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
  },

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },

  /**
   * Health check to test backend connection.
   */
  async checkBackendHealth() {
    try {
      const res = await this.get(API_ENDPOINTS.HEALTH);
      return { online: true, data: res };
    } catch (err) {
      return { online: false, error: err.message };
    }
  },
};
