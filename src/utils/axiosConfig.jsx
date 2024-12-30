// src/utils/axiosConfig.js
import axios from 'axios';

// Create a single Axios instance
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'financemanager-production-27ab.up.railway.app',
});

// Request interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthorized responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // if (
    //   error.response &&
    //   (error.response.status === 401 || error.response.status === 403)
    // ) {
    //   // Exclude login and register routes from triggering logout
    //   if (
    //     !originalRequest.url.includes('/user/login') &&
    //     !originalRequest.url.includes('/user/register')
    //   ) {
    //     // Optionally, redirect to login page or clear auth data
    //     localStorage.removeItem('authToken');
    //     window.location.href = '/login'; // Adjust according to your routing setup
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
