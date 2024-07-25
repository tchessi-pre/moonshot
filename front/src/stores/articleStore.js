import { create } from 'zustand';
import axiosInstance from '@/services/axiosInstance';

const useArticleStore = create((set) => ({
	articles: [],
	fetchArticles: async () => {
		try {
			const response = await axiosInstance.get('/articles?populate=*');
			set({ articles: response.data.data });
		} catch (error) {
			console.error('Erreur lors de la récupération des articles:', error);
			throw new Error(
				error.response?.data?.message ||
					'Erreur lors de la récupération des articles.'
			);
		}
	},
	createArticle: async (articleData) => {
		try {
			const formData = new FormData();
			formData.append(
				'data',
				JSON.stringify({
					title: articleData.title,
					content: articleData.content,
				})
			);
			if (articleData.image) {
				formData.append('files.image', articleData.image);
			}

			const response = await axiosInstance.post('/articles', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			set((state) => ({
				articles: [...state.articles, response.data.data],
			}));
			return response.data.data;
		} catch (error) {
			console.error(
				"Erreur lors de la création de l'article:",
				error.response?.data || error.message
			);
			throw new Error(
				error.response?.data?.message ||
					"Erreur lors de la création de l'article."
			);
		}
	},
}));

export default useArticleStore;
