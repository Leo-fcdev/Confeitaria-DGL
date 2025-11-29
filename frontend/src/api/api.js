import axios from 'axios';

//aponta para o Backend na porta 3001
const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

export default api;