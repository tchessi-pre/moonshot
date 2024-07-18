// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/api`,
});

instance.interceptors.request.use(
	async function (request) {
		const token = sessionStorage.getItem('token');
		if (token) {
			request.headers.Authorization = `Bearer ${token}`;
		}
		return request;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	}
);

export default instance;
