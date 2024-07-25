'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import useArticleStore from '@/stores/articleStore';

const ArticleList = () => {
	const { articles, fetchArticles } = useArticleStore();

	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	const getImageUrl = (image) => {
		const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
		if (image?.data && image.data.length > 0) {
			return `${BASE_URL}${image.data[0].attributes.url}`;
		}
		return '/assets/event-placeholder.png';
	};

	return (
		<div
			className='min-h-screen bg-center bg-cover'
			style={{ backgroundImage: 'url("/assets/bground.jpg")', backgroundAttachment: 'fixed' }}
		>
			<NavBar />
			<div className='container py-8 mx-auto'>
				<h2
					className='mb-6 text-2xl font-bold text-center text-white'
					style={{ marginTop: '50px' }}
				>
					Articles
				</h2>
				<div className='max-w-2xl mx-auto space-y-8'>
					{articles.map((article) => (
						<Link key={article.id} href={`/articles/${article.id}`}>
							<div className='p-4 mt-4 bg-white rounded-lg shadow-lg cursor-pointer'>
								<h3 className='mb-2 text-xl font-bold text-gray-900'>
									{article.attributes.title}
								</h3>
								{article.attributes.image && (
									<img
										src={getImageUrl(article.attributes.image)}
										alt={article.attributes.title}
										className='object-cover w-full h-64 mb-4 rounded-lg'
										style={{ objectFit: 'contain' }}
									/>
								)}
								<p className='text-gray-700'>
									{article.attributes.content
										? article.attributes.content.substring(0, 100)
										: 'Pas de contenu disponible'}
									...
								</p>
							</div>
						</Link>
					))}
				</div>
				<div className='flex justify-center mt-8'>
					<Link href='/articles/create'>
						<div className='inline-block px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600'>
							Créer un article
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ArticleList;
