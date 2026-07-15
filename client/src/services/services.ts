import axios from 'axios';
import api from './api';
import type {
  AuthResponse,
  Cart,
  Order,
  Product,
  ProductsResponse,
  User,
} from '../types';

export const authService = {
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>('/auth/register', { name, email, password }),

  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),

  getMe: () => api.get<User>('/auth/me'),
};

export const productService = {
  getProducts: (params?: {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
  }) => api.get<ProductsResponse>('/products', { params }),

  getProductById: (id: string) => api.get<Product>(`/products/${id}`),

  getCategories: () => api.get<string[]>('/products/categories/list'),
};

export const cartService = {
  getCart: () => api.get<Cart>('/cart'),

  addToCart: (productId: string, quantity = 1) =>
    api.post<Cart>('/cart', { productId, quantity }),

  updateCartItem: (itemId: string, quantity: number) =>
    api.patch<Cart>(`/cart/${itemId}`, { quantity }),

  removeCartItem: (itemId: string) => api.delete<Cart>(`/cart/${itemId}`),
};

export const orderService = {
  createOrder: () => api.post<Order>('/orders'),

  getOrders: () => api.get<Order[]>('/orders'),
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Something went wrong';
  }
  return 'Something went wrong';
};
