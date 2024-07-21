import axiosInstance from './axiosInstance';

export const fetchLogin = async (email, password) => {
	try {
		const response = await axiosInstance.post('/login', {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message || 'Erreur lors de la connexion'
			);
		} else {
			throw new Error('Erreur de connexion au serveur');
		}
	}
};

export const fetchRegister = async (userData) => {
	try {
		const response = await axiosInstance.post('/register', userData);
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message || "Erreur lors de l'inscription"
			);
		} else {
			throw new Error('Erreur de connexion au serveur');
		}
	}
};
