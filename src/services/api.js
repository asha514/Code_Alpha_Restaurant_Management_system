import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

// attach token if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('rms_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Dev: log requests and responses to help trace issues
if (import.meta.env.DEV) {
  api.interceptors.request.use(config => {
    try { console.debug('[api] request', config.method, config.url, config.data); } catch (e) {}
    return config;
  });
  api.interceptors.response.use(res => {
    try { console.debug('[api] response', res.config.url, res.status, res.data); } catch (e) {}
    return res;
  }, err => {
    try { console.debug('[api] response error', err.config?.url, err.response?.status, err.response?.data); } catch (e) {}
    return Promise.reject(err);
  });
}

export const auth = {
  login: (data) => api.post('/auth/login', data).then(r => r.data),
  register: (data) => api.post('/auth/register', data).then(r => r.data),
  profile: () => api.get('/auth/profile').then(r => r.data),
};

export const menu = {
  list: () => api.get('/menu').then(r => r.data),
  get: (id) => api.get(`/menu/${id}`).then(r => r.data),
};

export const orders = {
  list: () => api.get('/orders').then(r => r.data),
  get: (id) => api.get(`/orders/${id}`).then(r => r.data),
  create: (data) => api.post('/orders', data).then(r => r.data),
  update: (id, data) => api.put(`/orders/${id}`, data).then(r => r.data),
};

export const reservations = {
  list: () => api.get('/reservations').then(r => r.data),
  create: (data) => api.post('/reservations', data).then(r => r.data),
  update: (id, data) => api.put(`/reservations/${id}`, data).then(r => r.data),
};

export const tables = {
  list: () => api.get('/tables').then(r => r.data),
};

export const inventory = {
  list: () => api.get('/inventory').then(r => r.data),
};

export const notifications = {
  list: () => api.get('/notifications').then(r => r.data),
  create: (data) => api.post('/notifications', data).then(r => r.data),
  remove: (id) => api.delete(`/notifications/${id}`).then(r => r.data),
};

export const reviews = {
  list: () => api.get('/reviews').then(r => r.data),
  create: (data) => api.post('/reviews', data).then(r => r.data),
};

export const offers = {
  list: () => api.get('/offers').then(r => r.data),
  active: () => api.get('/offers/active').then(r => r.data),
  get: (id) => api.get(`/offers/${id}`).then(r => r.data),
  create: (data) => api.post('/offers', data).then(r => r.data),
  update: (id, data) => api.put(`/offers/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/offers/${id}`).then(r => r.data),
};

export const chefSpecials = {
  list: () => api.get('/chef-specials').then(r => r.data),
  today: () => api.get('/chef-specials/today').then(r => r.data),
  get: (id) => api.get(`/chef-specials/${id}`).then(r => r.data),
  create: (data) => api.post('/chef-specials', data).then(r => r.data),
  update: (id, data) => api.put(`/chef-specials/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/chef-specials/${id}`).then(r => r.data),
};

export const dashboard = {
  stats: () => api.get('/dashboard/stats').then(r => r.data),
  reports: () => api.get('/dashboard/reports').then(r => r.data),
};

export default api;
