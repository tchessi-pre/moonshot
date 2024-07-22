import axiosInstance from './axiosInstance';

export const fetchCurrentUser = async () => {
	try {
		const response = await axiosInstance.get('/users/me?populate=*');
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

		const formData = new FormData();
		Object.keys(userData).forEach((key) => {
			if (key === 'avatar' && userData[key] instanceof File) {
				formData.append('files.avatar', userData[key]);
			} else {
				formData.append(`data.${key}`, userData[key]);
			}
		});

		const response = await axiosInstance.put(`/users/${userId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
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
