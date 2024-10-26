import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/refresh-token`);
        
        if (res.status === 200) {
          return api(originalRequest);
        }
      } catch (err) {
        console.error('No se pudo renovar el token de acceso:', err);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
