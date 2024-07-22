import axiosInstance from './axiosInstance';

export const fetchCurrentUser = async () => {
	try {
		const response = await axiosInstance.get('/users/me');
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message ||
				'Erreur lors de la récupération des données utilisateur'
		);
	}
};

export const updateCurrentUser = async (userData) => {
	try {
		const userId = userData.id;
		const response = await axiosInstance.put(`/users/${userId}`, userData);
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message ||
				'Erreur lors de la mise à jour des données utilisateur'
		);
	}
};
