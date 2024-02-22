import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
