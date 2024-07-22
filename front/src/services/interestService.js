import axiosInstance from './axiosInstance';

export const fetchInterests = async () => {
	try {
		const response = await axiosInstance.get('/interests');
		return response.data;
	} catch (error) {
		throw new Error("Erreur lors de la récupération des centres d'intérêt");
	}
};
