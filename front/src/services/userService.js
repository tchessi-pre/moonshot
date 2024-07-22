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
		console.log(`Sending update request for user ID: ${userId}`);
		const response = await axiosInstance.put(`/users/${userId}`, userData);
		return response.data;
	} catch (error) {
		console.error(
			'Error updating user:',
			error.response?.data || error.message
		);
		throw new Error(
			error.response?.data?.message ||
				'Erreur lors de la mise à jour des données utilisateur'
		);
	}
};
