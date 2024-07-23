import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useEventStore = create((set) => ({
	events: [],
	fetchEvents: async () => {
		try {
			const response = await axiosInstance.get('/events?populate=*'); // Utilisez `populate` pour inclure l'image
			set({ events: response.data.data });
			console.log("🚀 ~ fetchEvents: ~ response:", response)
		} catch (error) {
			throw new Error(
				error.response?.data?.message ||
					'Erreur lors de la récupération des événements.'
			);
		}
	},
	createEvent: async (eventData) => {
		try {
			const response = await axiosInstance.post('/events', eventData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			set((state) => ({ events: [...state.events, response.data.data] }));
			return response.data.data;
		} catch (error) {
			console.error('Error creating event:', error);
			throw error;
		}
	},
}));

export default useEventStore;
