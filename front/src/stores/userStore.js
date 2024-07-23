// stores/userStore.js
import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useUserStore = create((set) => ({
	currentUser: null,
	fetchCurrentUser: async () => {
		try {
			const response = await axiosInstance.get('/users/me?populate=*');
			set({ currentUser: response.data });
			return response.data;
		} catch (error) {
			throw new Error(
				error.response?.data?.message ||
					'Erreur lors de la récupération des données utilisateur'
			);
		}
	},
	updateCurrentUser: async (userData) => {
		try {
			const userId = userData.id;
			const formData = new FormData();
			Object.keys(userData).forEach((key) => {
				if (key === 'avatar' && userData[key] instanceof File) {
					formData.append('files.avatar', userData[key]);
				} else if (key === 'interests') {
					formData.append(`data.${key}`, JSON.stringify(userData[key]));
				} else {
					formData.append(`data.${key}`, userData[key]);
				}
			});
			const response = await axiosInstance.put(`/users/${userId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			set({ currentUser: response.data });
			return response.data;
		} catch (error) {
			throw new Error(
				error.response?.data?.message ||
					'Erreur lors de la mise à jour des données utilisateur'
			);
		}
	},
}));
export default useUserStore;
