import axios from 'axios';
import router from '@/router';

console.log(process.env);

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
      Accept: 'application/json',
    },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (config.headers === undefined) {
    config.headers = { Authorization: `Bearer ${token}` };
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


 api.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response.status === 401) {
      router.push('/login');
    } else {
      console.log(error.reponse);
    }

    return Promise.reject(error);
  }
);

/*api.get('/sanctum/csrf-cookie'); */

export default api;
