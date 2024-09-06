import axios from 'axios';
import router from './router'; // Import your Vue router
import Cookies from 'js-cookie';
const api = axios.create({
  baseURL: 'http://localhost:3000', // Your backend API base URL
});

// Attach access token to each request
api.interceptors.request.use(config => {
    const accessToken = Cookies.get('accessToken');
     // Or cookies if you're using cookies
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle 401 Unauthorized and redirect to login page
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired, redirect to login page
      router.push('/signin');
    }
    return Promise.reject(error);
  }
);

export default api;
