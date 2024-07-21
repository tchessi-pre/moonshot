import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/api`,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const token = sessionStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.error('Request error: ', error);
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		// Gestion d'erreur centralisée pour les réponses
		if (error.response) {
			console.error('Response error: ', error.response.data);
		} else {
			console.error('Response error: ', error.message);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
