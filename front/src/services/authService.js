import axiosInstance from './axiosInstance';

const saveAuthData = (jwt, userId) => {
	if (jwt && userId) {
		sessionStorage.setItem('token', jwt);
		sessionStorage.setItem('userId', userId);
	} else {
		throw new Error('Token ou UserID non trouvé');
	}
};

export const fetchLogin = async (email, password) => {
	try {
		const response = await axiosInstance.post('/auth/local', {
			identifier: email,
			password,
		});

		const { jwt, user } = response.data;

		// Vérifiez que jwt et user sont définis
		if (!jwt || !user) {
			throw new Error('Échec de la connexion, token ou utilisateur non trouvé');
		}

		// Enregistrez le token et l'ID utilisateur
		saveAuthData(jwt, user.id);

		return user;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message[0].messages[0].message ||
					'Erreur lors de la connexion'
			);
		} else {
			throw new Error('Erreur de connexion au serveur');
		}
	}
};

export const fetchRegister = async (userData) => {
	try {
		const response = await axiosInstance.post('/auth/local/register', {
			username: userData.username, // Strapi requiert un username
			email: userData.email,
			password: userData.password,
			firstName: userData.firstName,
			lastName: userData.lastName,
			localisation: userData.localisation,
		});

		const { jwt, user } = response.data;

		// Vérifiez que jwt et user sont définis
		if (!jwt || !user) {
			throw new Error(
				"Échec de l'inscription, token ou utilisateur non trouvé"
			);
		}

		// Enregistrez le token et l'ID utilisateur
		saveAuthData(jwt, user.id);

		return user;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message[0].messages[0].message ||
					"Erreur lors de l'inscription"
			);
		} else {
			throw new Error('Erreur de connexion au serveur');
		}
	}
};
