import axios from 'axios';

// informando a porta que vai puxar 
const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

export default api;