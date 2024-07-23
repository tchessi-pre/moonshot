import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useEventStore = create((set) => ({
	events: [],
	fetchEvents: async () => {
		try {
			const response = await axiosInstance.get('/events?populate=*');
			set({ events: response.data.data });
		} catch (error) {
			throw new Error(
				error.response?.data?.message ||
					'Erreur lors de la récupération des événements.'
			);
		}
	},
	filterEventsByCategory: (category) => {
		set((state) => ({
			events: state.events.filter(
				(event) =>
					event.attributes.category.toLowerCase() === category.toLowerCase()
			),
		}));
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
