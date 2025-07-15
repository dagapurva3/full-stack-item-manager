// src/services/itemApi.js
import api from './api';

export const fetchItems = () => api.get('/items/');
export const fetchItem = (id) => api.get(`/items/${id}/`);
export const createItem = (data) => api.post('/items/', data);
export const updateItem = (id, data) => api.patch(`/items/${id}/`, data);
export const deleteItem = (id) => api.delete(`/items/${id}/`);
// Add more item-related API calls as needed
