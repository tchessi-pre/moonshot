// components/ArticleList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ArticleList = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const fetchArticles = async () => {
			const response = await axios.get('/api/articles');
			setArticles(response.data);
		};
		fetchArticles();
	}, []);

	return (
		<div>
			{articles.map((article) => (
				<div key={article.id}>
					<Link href={`/articles/${article.id}`}>
						<h2>{article.title}</h2>
					</Link>
					<p>{article.content}</p>
					<img src={article.image.url} alt={article.title} />
				</div>
			))}
		</div>
	);
};

export default ArticleList;
