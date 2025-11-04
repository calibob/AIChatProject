import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.11.106:5000/api', // <-- ton IP locale
  timeout: 5000,
});

export default API;
