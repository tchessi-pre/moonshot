// stores/interestStore.js
import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useInterestStore = create((set) => ({
	allInterests: [],
	fetchInterests: async () => {
		try {
			const response = await axiosInstance.get('/interests');
			const interestsData = response.data.data.map(
				(item) => item.attributes.name
			);
			set({ allInterests: interestsData });
		} catch (error) {
			throw new Error("Erreur lors de la récupération des centres d'intérêt");
		}
	},
}));
export default useInterestStore;
