import axios from 'axios';
import { endpoints } from './endpoint';
  const api = axios.create({
    baseURL: endpoints.baseURL,
  });

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

api.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return {
    code: "500",
    data: [],
    message: "Server Error",
  };
});

export default api;