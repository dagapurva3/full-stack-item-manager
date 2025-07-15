import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all items
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/items/');
      setItems(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new item
  const createItem = async (itemData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/items/', itemData);
      setItems((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an item
  const updateItem = async (id, itemData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/items/${id}/`, itemData);
      setItems((prev) => prev.map((item) => (item.id === id ? response.data : item)));
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    setItems, // for manual updates if needed
  };
} 