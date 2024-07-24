import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useRegistrationStore = create((set) => ({
	registrations: [],
	fetchRegistrations: async () => {
		try {
			const response = await axiosInstance.get('/registrations?populate=*');
			set({ registrations: response.data.data });
		} catch (error) {
			throw new Error(
				error.response?.data?.message ||
					'Erreur lors de la récupération des inscriptions.'
			);
		}
	},
	createRegistration: async (userId, eventId) => {
		try {
			// Vérifiez d'abord si l'utilisateur est déjà inscrit à cet événement
			const existingRegistrations = await axiosInstance.get('/registrations', {
				params: {
					filters: {
						user: userId,
						event: eventId,
					},
				},
			});

			if (existingRegistrations.data.data.length > 0) {
				throw new Error('Vous êtes déjà inscrit à cet événement.');
			}

			// Créez une nouvelle inscription si aucune inscription existante n'est trouvée
			const response = await axiosInstance.post('/registrations', {
				data: {
					user: userId,
					event: eventId,
				},
			});
			set((state) => ({
				registrations: [...state.registrations, response.data.data],
			}));
			return response.data.data;
		} catch (error) {
			throw new Error(
				error.response?.data?.message ||
					"Erreur lors de l'inscription à l'événement."
			);
		}
	},
}));

export default useRegistrationStore;
