import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const generateConfirmationNumber = () => {
	return Math.floor(100000 + Math.random() * 900000); // Génère un numéro à 6 chiffres
};

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
			const confirmationNumber = generateConfirmationNumber();
			const response = await axiosInstance.post('/registrations', {
				data: {
					user: userId,
					event: eventId,
					confirmationNumber, // Inclure le numéro de confirmation
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
