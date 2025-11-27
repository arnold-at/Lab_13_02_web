import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090'; // Cambiar a 9090

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;