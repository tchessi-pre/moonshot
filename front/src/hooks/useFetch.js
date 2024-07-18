// hooks/useFetch.js
import { useState, useCallback } from 'react';
import axiosInstance from '../services/axiosInstance'; // Assurez-vous que le chemin est correct

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (url, options) => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        url,
        ...options,
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData };
};

export default useFetch;
