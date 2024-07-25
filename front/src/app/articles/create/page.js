'use client';

import React from 'react';
import NavBar from '@/components/NavBar';
import ArticleForm from '@/components/form/ArticleForm';

const CreateArticlePage = () => {
	return (
		<div
			className='min-h-screen bg-center bg-cover'
			style={{ backgroundImage: 'url("/assets/bground.jpg")' }}
		>
			<NavBar />
			<div className='container py-8 mx-auto'>
				<h2 className='mb-6 text-2xl font-bold text-center text-white'>
					Créer un Article
				</h2>
				<div className='max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg'>
					<ArticleForm />
				</div>
			</div>
		</div>
	);
};

export default CreateArticlePage;
