import { useState, useCallback } from 'react';
import axiosInstance from '../services/axiosInstance'; // Assurez-vous que le chemin est correct

const useFetch = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchData = useCallback(async (url, options = {}) => {
		setLoading(true);
		setError(null);
		try {
			const response = await axiosInstance({
				url,
				...options,
			});
			setData(response.data);
		} catch (err) {
			setError(err.response ? err.response.data : err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	const reset = () => {
		setData(null);
		setError(null);
		setLoading(false);
	};

	return { data, error, loading, fetchData, reset };
};

export default useFetch;
