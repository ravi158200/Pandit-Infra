import axios from 'axios';

const configuredUrl = import.meta.env.VITE_API_URL || 'https://pandit-infra-backend.onrender.com/api';
const finalUrl = configuredUrl.endsWith('/api') ? configuredUrl : configuredUrl.replace(/\/$/, '') + '/api';

const API = axios.create({
  baseURL: finalUrl,
});

// Interceptor to inject JWT authentication token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pandit_infra_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept expired tokens (401) to auto-logout
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('pandit_infra_token');
      // If not already on the login page, redirect and reload to clear state
      if (window.location.pathname !== '/admin-login') {
        window.location.href = '/admin-login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
