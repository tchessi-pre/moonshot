'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useArticleStore from '@/stores/articleStore';

const ArticleForm = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);
	const createArticle = useArticleStore((state) => state.createArticle);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Données de l'article à envoyer:", { title, content, image });

		try {
			const article = await createArticle({ title, content, image });
			toast.success('Article créé avec succès!');
			router.push('/articles');
		} catch (error) {
			console.error("Erreur lors de la création de l'article:", error);
			toast.error("Erreur lors de la création de l'article.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label className='block mb-2 font-bold'>Titre</label>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='w-full p-2 border rounded-lg'
					required
				/>
			</div>
			<div>
				<label className='block mb-2 font-bold'>Contenu</label>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className='w-full p-2 border rounded-lg'
					required
				></textarea>
			</div>
			<div>
				<label className='block mb-2 font-bold'>Image</label>
				<input
					type='file'
					onChange={(e) => setImage(e.target.files[0])}
					className='w-full'
				/>
			</div>
			<button
				type='submit'
				className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
			>
				Créer
			</button>
		</form>
	);
};

export default ArticleForm;
