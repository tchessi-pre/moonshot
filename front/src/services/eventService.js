// eventService.js
import axiosInstance from './axiosInstance';

// Fonction pour créer un événement
export const createEvent = async (eventData) => {
	try {
		const response = await axiosInstance.post('/events', eventData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error creating event:', error);
		throw error;
	}
};

// Fonction pour récupérer les événements liés à un utilisateur
export const fetchUserEvents = async (userId) => {
	try {
		const response = await axiosInstance.get(`/events?user=${userId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching events:', error);
		throw new Error(
			error.response?.data?.message ||
				'Erreur lors de la récupération des événements.'
		);
	}
};
