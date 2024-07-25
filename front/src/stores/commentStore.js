import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useCommentStore = create((set) => ({
	comments: [],
	fetchComments: async (articleId) => {
		try {
			const response = await axiosInstance.get(
				`/comments?filters[article]=${articleId}&populate=*`
			);
			set({ comments: response.data.data });
		} catch (error) {
			throw new Error(
				error.response?.data?.message ||
					'Erreur lors de la récupération des commentaires.'
			);
		}
	},
	createComment: async (commentData) => {
		try {
			const response = await axiosInstance.post('/comments', {
				data: commentData,
			});
			set((state) => ({
				comments: [...state.comments, response.data.data],
			}));
			return response.data.data;
		} catch (error) {
			throw new Error(
				error.response?.data?.message ||
					"Erreur lors de l'ajout du commentaire."
			);
		}
	},
}));

export default useCommentStore;
