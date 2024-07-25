'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import useArticleStore from '@/stores/articleStore';
import NavBar from '@/components/NavBar';

const ArticlesPage = () => {
	const { articles, fetchArticles } = useArticleStore();

	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	const getImageUrl = (image) => {
		const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
		if (image?.data && Array.isArray(image.data) && image.data.length > 0) {
			return `${BASE_URL}${image.data[0].attributes.url}`;
		}
		return '/assets/event-placeholder.png';
	};

	return (
		<div
			className='min-h-screen bg-center bg-cover'
			style={{ backgroundImage: 'url("/assets/bground.jpg")' }}
		>
			<NavBar />
			<div className='container py-8 mx-auto'>
				<h1 className='mb-8 text-3xl font-bold text-white'>Articles</h1>
				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{articles.map((article) => (
						<Link
							href={`/articles/${article.id}`}
							key={article.id}
							className='block p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-gray-100'
						>
							<div>
								<h2 className='mb-2 text-xl font-bold text-gray-900'>
									{article.attributes.title}
								</h2>
								{article.attributes.image && (
									<img
										src={getImageUrl(article.attributes.image)}
										alt={article.attributes.title}
										className='object-cover w-full h-40 mb-4 rounded-lg'
									/>
								)}
								<p className='text-gray-700'>
									{article.attributes.content
										? article.attributes.content.substring(0, 100)
										: 'Pas de contenu'}
									...
								</p>
							</div>
						</Link>
					))}
				</div>
				<Link href='/articles/create'>
					<div className='inline-block px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600'>
						Créer un article
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ArticlesPage;
