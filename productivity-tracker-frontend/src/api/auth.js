import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const register = (data) => axios.post(`${API}/register`, data);
export const login = (data) => axios.post(`${API}/login`, data);

// Password reset functions
export const requestPasswordReset = (email) => 
  axios.post(`${API}/request-password-reset`, { email });

export const resetPassword = (token, newPassword) => 
  axios.post(`${API}/reset-password`, { token, newPassword });

// Error handling interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        error.response.data.error = 'Email ose fjalëkalimi i pasaktë';
      } else if (error.response.status === 400) {
        error.response.data.error = 'Të dhëna jo valide';
      } else if (error.response.status === 500) {
        error.response.data.error = 'Gabim serveri. Ju lutemi provoni përsëri.';
      }
    } else if (error.request) {
      error.response = { data: { error: 'Nuk u krye lidhja me serverin' } };
    } else {
      error.response = { data: { error: 'Gabim gjatë konfigurimit të kërkesës' } };
    }
    return Promise.reject(error);
  }
);