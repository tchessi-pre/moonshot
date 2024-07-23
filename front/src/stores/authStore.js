import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useAuthStore = create((set) => ({
	token: null,
	userId: null,
	user: null,
	setAuthData: (jwt, userId, user) => set({ token: jwt, userId, user }),
	clearAuthData: () => set({ token: null, userId: null, user: null }),
	fetchLogin: async (email, password) => {
		try {
			const response = await axiosInstance.post('/auth/local', {
				identifier: email,
				password,
			});
			const { jwt, user } = response.data;
			if (!jwt || !user) {
				throw new Error(
					'Échec de la connexion, token ou utilisateur non trouvé'
				);
			}
			set({ token: jwt, userId: user.id, user });
			sessionStorage.setItem('token', jwt);
			sessionStorage.setItem('userId', user.id);
			return user;
		} catch (error) {
			throw new Error(
				error.response?.data?.message[0]?.messages[0]?.message ||
					'Erreur lors de la connexion'
			);
		}
	},
	fetchRegister: async (userData) => {
		try {
			const response = await axiosInstance.post('/auth/local/register', {
				username: userData.username,
				email: userData.email,
				password: userData.password,
				firstname: userData.firstName,
				lastname: userData.lastName,
				birthdate: userData.birthdate,
			});
			const { jwt, user } = response.data;
			if (!jwt || !user) {
				throw new Error(
					"Échec de l'inscription, token ou utilisateur non trouvé"
				);
			}
			set({ token: jwt, userId: user.id, user });
			sessionStorage.setItem('token', jwt);
			sessionStorage.setItem('userId', user.id);
			return user;
		} catch (error) {
			throw new Error(
				error.response?.data?.message[0]?.messages[0]?.message ||
					"Erreur lors de l'inscription"
			);
		}
	},
}));

export default useAuthStore;
