'use client';

import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import VerticalMenu from '@/components/VerticalMenu';
import Pagination from '@/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cuisineEvents = [
	{
		image: '/assets/cuisine1.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Street food vietnamienne',
		description:
			'Découvrez les saveurs authentiques de la street food vietnamienne.',
		buttonText: 'Découvrir',
		participants: 15,
		verified: true,
	},
	{
		image: '/assets/cuisine2.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Les desserts Italiens',
		description: 'Savourez les délices sucrés de la tradition italienne.',
		buttonText: 'Découvrir',
		participants: 10,
		verified: true,
	},
	{
		image: '/assets/cuisine3.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Gastronomie Colombienne',
		description: 'Explorez les richesses culinaires de la Colombie.',
		buttonText: 'Découvrir',
		participants: 15,
		verified: true,
	},
	{
		image: '/assets/cuisine4.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Le poulet DG Camerounais',
		description:
			'Dégustez le fameux poulet DG, un plat emblématique du Cameroun.',
		buttonText: 'Découvrir',
		participants: 5,
		verified: true,
	},
	{
		image: '/assets/cuisine1.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Street food vietnamienne',
		description:
			'Découvrez les saveurs authentiques de la street food vietnamienne.',
		buttonText: 'Découvrir',
		participants: 25,
		verified: true,
	},
	{
		image: '/assets/cuisine2.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Les desserts Italiens',
		description: 'Savourez les délices sucrés de la tradition italienne.',
		buttonText: 'Découvrir',
		participants: 11,
		verified: true,
	},
	{
		image: '/assets/cuisine4.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Le poulet DG Camerounais',
		description:
			'Dégustez le fameux poulet DG, un plat emblématique du Cameroun.',
		buttonText: 'Découvrir',
		participants: 15,
		verified: true,
	},
	{
		image: '/assets/cuisine1.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Street food vietnamienne',
		description:
			'Découvrez les saveurs authentiques de la street food vietnamienne.',
		buttonText: 'Découvrir',
		participants: 15,
		verified: true,
	},
	{
		image: '/assets/cuisine2.png',
		title: 'CUISINE DU MONDE',
		subtitle: 'Les desserts Italiens',
		description: 'Savourez les délices sucrés de la tradition italienne.',
		buttonText: 'Découvrir',
		participants: 15,
		verified: true,
	},
];

const CuisinePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const itemsPerPage = 6; // Nombre d'éléments par page

	const handlePageChange = (pageNumber) => {
		setIsAnimating(true);
		setTimeout(() => {
			setCurrentPage(pageNumber);
			setIsAnimating(false);
		}, 500); // Durée de l'animation
	};

	// Calculer les éléments à afficher pour la page actuelle
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = cuisineEvents.slice(indexOfFirstItem, indexOfLastItem);

	// Calculer le nombre total de pages
	const totalPages = Math.ceil(cuisineEvents.length / itemsPerPage);

	return (
		<div
			className='min-h-screen bg-center bg-cover'
			style={{ backgroundImage: 'url("/assets/bground.jpg")' }}
		>
			<NavBar />
			<div className='container px-4 py-8 mx-auto'>
				<h1 className='mt-10 mb-8 font-bold text-center text-white uppercase md:text-4xl lg:text-4xl font-roboto-condensed'>
					DÉCOUVREZ LA CUISINE DU MONDE
				</h1>
				<div
					className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ${
						isAnimating ? 'opacity-0' : 'opacity-100'
					}`}
				>
					{currentItems.map((event, index) => (
						<div
							key={index}
							className='relative overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-lg group'
						>
							<img
								src={event.image}
								alt={event.title}
								className='object-cover w-full h-64 transition-opacity duration-300 rounded-t-lg md:h-48 lg:h-64 group-hover:opacity-0'
							/>
							<div className='absolute inset-0 flex flex-col justify-center p-4 transition duration-300 ease-in-out transform translate-y-full bg-white bg-opacity-80 group-hover:translate-y-0'>
								<h2 className='flex items-center text-xl font-bold text-black md:text-2xl'>
									{event.title}
									{event.verified && (
										<FontAwesomeIcon
											icon={faCheckCircle}
											className='ml-2 text-green-500'
											style={{ width: '1em', height: '1em' }}
										/>
									)}
								</h2>
								<p className='text-sm text-orange-600 md:text-lg'>
									{event.subtitle}
								</p>
								<p className='mt-2 text-sm text-gray-700'>
									{event.description}
								</p>
								<div className='mt-4'>
									<span className='px-2 py-1 text-xs text-white bg-blue-500 rounded'>
										{event.participants} participants
									</span>
								</div>
								<button className='mt-4 text-blue-500 hover:underline'>
									{event.buttonText}
								</button>
							</div>
						</div>
					))}
				</div>
				<div className='flex justify-center mt-8'>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
			<div className='absolute mt-4 bottom-40 left-24'>
				<VerticalMenu />
			</div>
		</div>
	);
};

export default CuisinePage;
