import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token'); 
  const token = sessionStorage.getItem('token'); 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default api;
