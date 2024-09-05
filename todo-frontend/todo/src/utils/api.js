// src/utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://todo-list-api-jet.vercel.app/api', // Update with your backend URL
});

// Add token to request headers if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
