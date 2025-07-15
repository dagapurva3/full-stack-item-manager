import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const itemService = {
  // Get all items
  getAllItems: async () => {
    try {
      const response = await api.get('/items/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific item
  getItem: async (id) => {
    try {
      const response = await api.get(`/items/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new item
  createItem: async (itemData) => {
    try {
      const response = await api.post('/items/', itemData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update an item
  updateItem: async (id, itemData) => {
    try {
      const response = await api.patch(`/items/${id}/`, itemData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api; 