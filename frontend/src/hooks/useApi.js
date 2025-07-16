// src/hooks/useApi.js
// Example custom hook for API calls
import { useState } from 'react';
import api from '../services/api';

export default function useApi(endpoint, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(endpoint, options);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
}
