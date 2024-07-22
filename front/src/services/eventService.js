// eventService.js
import axiosInstance from './axiosInstance';

// Fonction pour créer un événement
export const createEvent = async (eventData) => {
	try {
		console.log('Event data being sent:', eventData); 
		const response = await axiosInstance.post('/events', {
			data: eventData, 
		});
		return response.data;
	} catch (error) {
		console.error('Error creating event:', error);
		if (error.response) {
			throw new Error(
				error.response.data.message ||
					"Erreur lors de la création de l'événement."
			);
		} else {
			throw new Error('Erreur de connexion au serveur');
		}
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
