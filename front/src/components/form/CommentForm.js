'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useCommentStore from '@/stores/commentStore';

const CommentForm = ({ articleId }) => {
	const [content, setContent] = useState('');
	const createComment = useCommentStore((state) => state.createComment);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createComment({ content, article: articleId });
			toast.success('Commentaire ajouté avec succès!');
			setContent('');
		} catch (error) {
			toast.error("Erreur lors de l'ajout du commentaire.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='mt-4 space-y-4'>
			<div>
				<label className='block mb-2 font-bold'>Commentaire</label>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className='w-full p-2 border rounded-lg'
					required
				></textarea>
			</div>
			<button
				type='submit'
				className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
			>
				Ajouter Commentaire
			</button>
		</form>
	);
};

export default CommentForm;
