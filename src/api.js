import axios from 'axios';
const API = axios.create({
  baseURL: "https://shopkart-backend-42sv.onrender.com/api"
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const loginUser     = (data) => API.post('/auth/login', data);
export const registerUser  = (data) => API.post('/auth/register', data);
export const getMe         = ()     => API.get('/auth/me');

// Products
export const getProducts   = (params) => API.get('/products', { params });
export const getProduct    = (id)     => API.get(`/products/${id}`);

// Orders
export const placeOrder    = (data) => API.post('/orders', data);
export const getMyOrders   = ()     => API.get('/orders/my');

export default API;