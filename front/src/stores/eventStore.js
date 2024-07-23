// stores/eventStore.js
import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useEventStore = create((set) => ({
	events: [],
	fetchUserEvents: async (userId) => {
		try {
			const response = await axiosInstance.get(`/events?user=${userId}`);
			set({ events: response.data });
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
			set((state) => ({ events: [...state.events, response.data] }));
			return response.data;
		} catch (error) {
			console.error('Error creating event:', error);
			throw error;
		}
	},
}));
export default useEventStore;
